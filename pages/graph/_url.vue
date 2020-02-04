<template>
  <div v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-layout justify-space-between align-center>
                <v-toolbar-title v-text="chart.name" class="white--text">
                </v-toolbar-title>
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
              </v-layout>
            </v-card-text>
            <v-card-text>
              <v-btn
                @click="toggleAnnotation()"
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <ColInputMain
      :annotating="annotating"
      :offsetTop="-65"
      @close="toggleAnnotation()"
      @submittingAnnotation="submitAnnotation"
    />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import SocialSharing from '~/components/url/SocialSharing'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: this.$t('title.url'),
      meta: [
        {
          hid: 'url'
        }
      ]
    }
  },
  components: {
    SocialSharing
  },
  data() {
    return {
      init: false,
      show: false,
      json: null,
      chart: null,
      currentUser: {},
      annotations: [],
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
      },
      CircularJSON: require('circular-json')
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
  mounted() {
    this.displayGraph()
    this.getAnnotations()
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
        this.$colvis.initialize({ specs: this.colvisSpecs })
      })
    },
    toggleAnnotation() {
      this.annotating = !this.annotating
    },
    submitAnnotation(annotation) {
      this.saveAnnotation(annotation)
      this.toggleAnnotation()
    },
    async getUser() {
      await axios.get(`/users/?id=${this.chart.id_user}`).then((res) => {
        this.currentUser = res.data
      })
    },
    async getAnnotations() {
      await axios
        .get(`/annotations/chart?id_chart=${this.chart.id}`)
        .then((res) => {
          this.annotations = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
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
    async saveAnnotation(annotation) {
      await axios
        .post(`/annotations/`, {
          data: annotation,
          id_chart: this.chart.id,
          id_user: this.user.id
        })
        .then((res) => {
          this.$toast.success(this.$t('url.toast_annot_success'))
          this.annotations.push(res.data)
        })
        .catch((error) => {
          this.$toast.error(this.$t('url.toast_annot_error'))
          // eslint-disable-next-line
          console.log(error)
        })
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
</style>
