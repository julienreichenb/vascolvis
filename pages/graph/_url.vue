<template>
  <div v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-layout justify-space-between align-center>
                <v-layout row align-baseline>
                  <div v-if="isMyChart">
                    <div v-if="chart.public">
                      <v-btn @click="updateChart(0)" icon color="green">
                        <v-icon>mdi-lock-open-variant</v-icon>
                      </v-btn>
                    </div>
                    <div v-else>
                      <v-btn @click="updateChart(1)" icon color="red">
                        <v-icon>mdi-lock</v-icon>
                      </v-btn>
                    </div>
                    <div />
                  </div>
                  <v-toolbar-title
                    v-text="chart.name"
                    class="white--text ml-3"
                  />
                </v-layout>
                <SocialSharing v-if="chart" :chart="chart" />
              </v-layout>
            </v-toolbar>
            <v-card-text>
              <v-layout justify-space-between>
                <div>
                  <h2 v-if="currentUser && currentUser.profile !== undefined">
                    {{ $t('url.graph_of')
                    }}<a @click="goToProfile(currentUser.profile.id_user)">{{
                      currentUser.profile.publicname
                        ? currentUser.profile.publicname
                        : currentUser.username
                    }}</a>
                  </h2>
                </div>
                <AnnotationHelpDialog />
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-layout class="mb-2">
                <v-btn
                  @click="toggleAnnotation(0, true)"
                  color="white"
                  depressed
                  outlined
                >
                  <v-icon class="mr-1"> mdi-plus-circle-outline </v-icon>
                  {{ $t('url.add_annot') }}</v-btn
                >
                <v-btn
                  v-if="annotHighlighted"
                  @click="resetHighlights"
                  class="ml-2"
                  color="yellow darken-2"
                  depressed
                  outlined
                >
                  <v-icon>mdi-broom</v-icon> {{ $t('url.clean_annot') }}
                </v-btn>
              </v-layout>
              <div id="vis-container" style="width: 100%; text-align: center;">
                <div id="vis" class="resize-graph"></div>
              </div>
            </v-card-text>
            <AnnotationTabs
              ref="annotations"
              :annotations="rootAnnotations"
              :loaded="annotLoaded"
              :user="user"
              :graph-owner="currentUser"
              :id-highlight="annotHighlighted ? annotHighlighted.id : null"
            >
            </AnnotationTabs>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <ColInputMain
      :annotating="annotating"
      @close="toggleAnnotation(0, false)"
      @submittingAnnotation="submitAnnotation"
    />
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
import SocialSharing from '~/components/url/SocialSharing'
import AnnotationTabs from '~/components/url/AnnotationTabs'
import AnnotationHelpDialog from '~/components/url/AnnotationHelpDialog'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: this.$t('title.url') + ' "' + this.chart.name + '"',
      meta: [
        {
          hid: 'url'
        }
      ]
    }
  },
  components: {
    SocialSharing,
    AnnotationTabs,
    AnnotationHelpDialog
  },
  data() {
    return {
      init: false,
      show: false,
      annotLoaded: false,
      json: null,
      chart: null,
      currentUser: {},
      currentRoot: 0,
      rootAnnotations: [],
      annotating: false,
      isMyChart: true,
      elements: [],
      annotHighlighted: null,
      originGraphDomColors: [],
      graphClass: '',
      colvisSpecs: {
        visualization: {
          container: '#vis'
        },
        natures: [
          {
            id: 'number',
            annotable: {
              selector: 'path',
              filter: 'annotable',
              title: []
            }
          },
          {
            id: 'position',
            annotable: false
          }
        ],
        combinations: [
          {
            first: 'number',
            second: 'position',
            products: [
              {
                id: 'sequence',
                type: 'Number',
                rangeType: 'linear',
                range: [1, 10]
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    pluginIsLoaded() {
      return !(
        document.getElementsByClassName('col-input-selector')[0].style
          .height === '0px'
      )
    }
  },
  asyncData({ params, error }) {
    return axios
      .get(`/charts/?url=${params.url}`)
      .then((res) => {
        return { chart: res.data, json: JSON.parse(res.data.data) }
      })
      .catch((e) => {
        error({ statusCode: 402, title: 'no_data', message: 'not_found' })
      })
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
      this.getUser()
      this.isMyChart = this.chart.id_user === this.user.id
      if (!this.isMyChart && !this.chart.public) {
        this.$router.push(this.localePath({ name: 'import' }))
      } else {
        this.show = true
      }
    } catch {
      this.$router.push(this.localePath({ name: 'index' }))
    }
    this.init = true
  },
  async mounted() {
    await this.displayGraph()
    await this.getAnnotations()
    this.getOriginalDomGraph()
    this.$root.$on('highlight', (annotation) => {
      this.highlightChart(annotation)
    })
    this.$root.$on('deleted', () => {
      this.refreshAnnotations()
    })
    this.$root.$on('toggle', (id, top) => {
      this.toggleAnnotation(id, top)
    })
    this.$root.$on('profile', (id) => {
      this.goToProfile(id)
    })
    // Workaround the plugin loading
    if (!this.pluginIsLoaded) {
      this.$router.go()
    }
  },
  methods: {
    displayGraph() {
      this.json.height = '400'
      this.json.width = 'container'
      window.vegaEmbed('#vis', this.json, { renderer: 'svg' }).then((view) => {
        const headers = Object.keys(this.json.data.values[0])
        this.fillNatures(headers)
        this.$colvis.initialize({ specs: this.colvisSpecs })
      })
    },
    fillNatures(headers) {
      if (!this.isBinned()) {
        if (this.isUsingDate()) {
          this.computeDateHeaders(headers)
        } else {
          for (let i = 0; i < headers.length; i++) {
            this.colvisSpecs.natures[0].annotable.title.push(headers[i])
          }
        }
      } else {
        this.computeBinnedHeaders(headers)
      }
    },
    computeDateHeaders(headers) {
      const tempVar = this.isUsingDate()
      for (let i = 0; i < headers.length; i++) {
        if (tempVar.field === headers[i]) {
          this.colvisSpecs.natures[0].annotable.title.push(
            tempVar.timeUnit + '_' + tempVar.field
          )
          this.colvisSpecs.natures[0].annotable.title.push(
            tempVar.timeUnit + '_' + tempVar.field + '_end'
          )
        } else {
          this.colvisSpecs.natures[0].annotable.title.push(headers[i])
        }
      }
    },
    computeBinnedHeaders(headers) {
      const binnedVar = this.isBinned()
      for (let i = 0; i < headers.length; i++) {
        if (binnedVar.field === headers[i]) {
          this.colvisSpecs.natures[0].annotable.title.push(
            'bin_maxbins_10_' + binnedVar.field
          )
          this.colvisSpecs.natures[0].annotable.title.push(
            'bin_maxbins_10_' + binnedVar.field + '_end'
          )
        } else {
          this.colvisSpecs.natures[0].annotable.title.push(headers[i])
        }
      }
    },
    isUsingDate() {
      if (this.json.encoding.x.type === 'temporal') {
        return {
          field: this.json.encoding.x.field,
          type: this.json.encoding.x.type,
          timeUnit: this.json.encoding.x.timeUnit
        }
      } else if (this.json.encoding.y.type === 'temporal') {
        return {
          field: this.json.encoding.y.field,
          type: this.json.encoding.y.type,
          timeUnit: this.json.encoding.y.timeUnit
        }
      }
      return false
    },
    isBinned() {
      if (this.json.encoding.x.bin) {
        return {
          field: this.json.encoding.x.field,
          type: this.json.encoding.x.type
        }
      } else if (this.json.encoding.y.bin) {
        return {
          field: this.json.encoding.y.field,
          type: this.json.encoding.y.type
        }
      }
      return false
    },
    toggleAnnotation(idRoot, scrollTop) {
      this.resetHighlights()
      this.currentRoot = idRoot
      if (scrollTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      this.annotating = !this.annotating
    },
    async highlightChart(annotation) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.resetHighlights()
      this.annotHighlighted = annotation
      await this.displayHighlight(
        this.$colvis.getAnnotationDataBinders(JSON.parse(annotation.data)),
        this.$colvis.getAnnotationDataBinders(
          JSON.parse(annotation.data),
          'complement'
        )
      )
    },
    displayHighlight(subjects, complements) {
      this.greyNotSelectedObjects()
      for (let i = 0; i < subjects.length; i++) {
        subjects[i].domElement.style.fill = 'rgba(255, 0, 0, 0.3)'
        subjects[i].domElement.style.stroke = 'rgba(255, 0, 0, 0.8)'
      }
      for (let i = 0; i < complements.length; i++) {
        complements[i].domElement.style.fill = 'rgba(0, 255, 0, 0.3)'
        complements[i].domElement.style.stroke = 'rgba(0, 255, 0, 0.8)'
      }
    },
    greyNotSelectedObjects() {
      for (let i = 0; i < this.originGraphDomColors.length; i++) {
        // eslint-disable-next-line standard/computed-property-even-spacing
        document.getElementsByClassName(this.graphClass)[0].children[
          i
        ].style.fill = 'rgba(100, 100, 100, 0.3)'
        // eslint-disable-next-line standard/computed-property-even-spacing
        document.getElementsByClassName(this.graphClass)[0].children[
          i
        ].style.stroke = 'rgba(100, 100, 100, 0.8)'
      }
    },
    resetHighlights() {
      this.annotHighlighted = null
      for (let i = 0; i < this.originGraphDomColors.length; i++) {
        // eslint-disable-next-line standard/computed-property-even-spacing
        document.getElementsByClassName(this.graphClass)[0].children[
          i
        ].style.fill = this.originGraphDomColors[i].fill
        // eslint-disable-next-line standard/computed-property-even-spacing
        document.getElementsByClassName(this.graphClass)[0].children[
          i
        ].style.stroke = this.originGraphDomColors[i].stroke
      }
    },
    async getUser() {
      await axios.get(`/users/?id=${this.chart.id_user}`).then((res) => {
        this.currentUser = res.data
      })
    },
    async getAnnotations() {
      await this.getRootAnnotations()
      await this.getReplyAnnotations()
      this.annotLoaded = true
    },
    async getRootAnnotations() {
      await axios
        .get(`/annotations/roots?id_chart=${this.chart.id}`)
        .then((res) => {
          this.rootAnnotations = res.data
          this.getReplyAnnotations()
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    getOriginalDomGraph() {
      this.graphClass =
        document.getElementsByClassName('mark-rect role-mark marks')[0] !==
        undefined
          ? 'mark-rect role-mark marks'
          : 'mark-symbol role-mark marks'
      const domLength = document.getElementsByClassName(this.graphClass)[0]
        .children.length
      for (let i = 0; i < domLength; i++) {
        this.originGraphDomColors.push({
          fill: document.getElementsByClassName(this.graphClass)[0].children[i]
            .style.fill,
          // eslint-disable-next-line standard/computed-property-even-spacing
          stroke: document.getElementsByClassName(this.graphClass)[0].children[
            i
          ].style.stroke
        })
      }
    },
    async getReplyAnnotations() {
      for (let i = 0; i < this.rootAnnotations.length; i++) {
        await axios
          .get(`/annotations/replies?parent=${this.rootAnnotations[i].id}`)
          .then((res) => {
            this.rootAnnotations[i].replies = res.data.sort((a, b) => {
              return (
                new Date(JSON.parse(a.data).meta.timestamp) -
                new Date(JSON.parse(b.data).meta.timestamp)
              )
            })
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error)
          })
      }
    },
    async updateChart(bool) {
      await axios
        .put(`/charts?id=${this.chart.id}&public=${bool}`)
        .then((res) => {
          this.chart = res.data
          let msg = ''
          bool === 1
            ? (msg = this.$t('url.msg_public'))
            : (msg = this.$t('url.msg_private'))
          this.$toast.success(msg)
        })
    },
    submitAnnotation(annotation) {
      annotation.parent_annotation = this.currentRoot
      this.saveAnnotation(annotation)
      this.toggleAnnotation(0, false)
    },
    async saveAnnotation(annotation) {
      await axios
        .post(`/annotations/`, {
          data: annotation,
          id_chart: this.chart.id,
          id_user: this.user.id,
          parent_annotation: annotation.parent_annotation
        })
        .then((res) => {
          this.$toast.success(this.$t('url.toast_annot_success'))
          this.refreshAnnotations()
        })
        .catch((error) => {
          this.$toast.error(this.$t('url.toast_annot_error'))
          // eslint-disable-next-line
          console.log(error)
        })
    },
    async refreshAnnotations() {
      this.annotLoaded = false
      await this.getAnnotations()
      this.resetHighlights()
    },
    goToProfile(id) {
      this.$router.push({
        name: `user-id___${this.$i18n.locale}`,
        params: { id }
      })
    }
  }
}
</script>

<style>
.resize-graph {
  width: 100%;
  overflow: auto;
}
.share:hover {
  top: -1px;
}

#vis details {
  display: none;
}

header.toolbar {
  justify-content: space-around !important;
}

.col-input-overlay__drawer {
  background: #212121 !important;
}

.col-input-overlay__drawer textarea {
  color: #212121 !important;
}

.stepper__step__head {
  background: #283593;
}

.verb.selected {
  background: #1565c0 !important;
  border-color: #f5f5f5 !important;
}

.container {
  max-width: 95% !important;
}
nav {
  border: 1px solid white !important;
  border-radius: 0 !important;
}
nav > header {
  background: darkblue !important;
}

nav ul.list,
nav input {
  color: #666666;
}
</style>
