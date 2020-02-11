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
                  <v-toolbar-title v-text="chart.name" class="white--text" />
                </v-layout>
                <SocialSharing v-if="chart" :chart="chart" />
              </v-layout>
            </v-toolbar>
            <v-card-text>
              <v-layout justify-space-between>
                <div v-if="currentUser && currentUser.profile !== undefined">
                  <h2>
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
              <v-btn
                @click="toggleAnnotation(0, true)"
                color="white"
                class="mb-2"
                depressed
                outlined
                >{{ $t('url.add_annot') }}</v-btn
              >
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
    this.displayGraph()
    await this.getAnnotations()
    this.$root.$on('highlight', (id) => {
      this.highlightChart(id)
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
    setTimeout(() => {}, 1000)
  },
  methods: {
    displayGraph() {
      this.json.height = '400'
      this.json.width = 'container'
      window.vegaEmbed('#vis', this.json, { renderer: 'svg' }).then((view) => {
        const headers = Object.keys(this.json.data.values[0])
        for (let i = 0; i < headers.length; i++) {
          this.colvisSpecs.natures[0].annotable.title.push(headers[i])
        }
        this.$nextTick(() => {
          this.$colvis.initialize({ specs: this.colvisSpecs })
        })
      })
    },
    toggleAnnotation(idRoot, scrollTop) {
      this.currentRoot = idRoot
      if (scrollTop) {
        window.scrollTo(0, 0)
      }
      this.annotating = !this.annotating
    },
    highlightChart(annotation) {
      window.scrollTo(0, 0)
      this.displayHighlight(JSON.parse(annotation.data).dataUnits)
    },
    displayHighlight(points) {},
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
