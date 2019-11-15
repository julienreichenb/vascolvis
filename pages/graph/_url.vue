<template>
  <div v-if="chart" v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex xs12 sm12 elevation-6>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-layout justify-space-between align-center>
                <v-toolbar-title class="white--text">
                  <h3>
                    {{ chart.name }}
                  </h3>
                </v-toolbar-title>
                <div v-if="chart.public" class="public">
                  <v-btn
                    v-if="isMyChart"
                    icon
                    color="green"
                    @click="updateChart(0)"
                  >
                    <v-icon>mdi-lock-open-variant</v-icon>
                  </v-btn>
                  <span v-else>{{ $t('url.public') }}</span>
                </div>
                <div v-else class="private">
                  <v-btn
                    v-if="isMyChart"
                    icon
                    color="red"
                    @click="updateChart(1)"
                  >
                    <v-icon>mdi-lock</v-icon>
                  </v-btn>
                  <span v-else>{{ $t('url.private') }}</span>
                </div>
                <div />
                <div>
                  <v-btn
                    v-clipboard:copy="getFullUrl()"
                    v-clipboard:success="showCopySuccess"
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    ><v-icon color="black">mdi-link-variant</v-icon></v-btn
                  >
                  <v-btn
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    @click="shareByMail()"
                    ><v-icon>mdi-email-outline</v-icon></v-btn
                  >
                  <v-btn
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    @click="shareOnFacebook()"
                    ><v-icon color="#4267B2">mdi-facebook</v-icon></v-btn
                  >
                  <v-btn
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    @click="shareOnTwitter()"
                    ><v-icon color="#55ACEE">mdi-twitter</v-icon></v-btn
                  >
                </div>
              </v-layout>
            </v-toolbar>
            <v-card-subtitle>
              <v-btn
                color="white indigo--text"
                depressed
                @click="annotating = !annotating"
                >{{ $t('url.add_annot') }}</v-btn
              >
            </v-card-subtitle>
            <v-card-text>
              <div style="width: 100%">
                <div id="vis" class="resize-graph"></div>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <ColInputMain
      vis="#vis"
      :elements="elements"
      :annotating="annotating"
      :init="init"
      :offset-top="-64"
      @close="annotating = false"
      @submittingAnnotation="alertAnnotation"
    />
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
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
  data() {
    return {
      init: false,
      show: false,
      json: null,
      chart: null,
      annotations: [],
      annotating: false,
      isMyChart: true,
      elements: []
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
    this.element = this.$getDataFromContainer
  },
  methods: {
    displayGraph() {
      this.json.height = '300'
      window.vegaEmbed('#vis', this.json)
    },
    alertAnnotation(annotation) {
      this.annotations.push(annotation)
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
    getFullUrl() {
      return 'http://localhost:3000/graph/' + this.chart.url
    },
    shareByMail() {
      window.open(
        `mailto:test@example.com?subject=${this.$t('url.mail_subject') +
          this.chart.name}&body=${this.$t('url.mail_body') + this.getFullUrl()}`
      )
    },
    shareOnFacebook() {
      const facebookWindow = window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + this.getFullUrl(),
        'facebook-popup',
        'height=350,width=600'
      )
      if (facebookWindow.focus) {
        facebookWindow.focus()
      }
      return false
    },
    shareOnTwitter() {
      const twitterWindow = window.open(
        'https://twitter.com/share?url=' + this.getFullUrl(),
        'twitter-popup',
        'height=350,width=600'
      )
      if (twitterWindow.focus) {
        twitterWindow.focus()
      }
      return false
    },
    showCopySuccess() {
      this.$toast.info(this.$t('url.copied'), { position: 'top-right' })
    }
  }
}
</script>

<style>
.public {
  font-weight: bold;
  color: darkgreen;
  background-color: white;
  border: 2px lightgreen solid;
  border-radius: 5px;
  width: 60px;
  text-align: center;
}

.private {
  font-weight: bold;
  color: darkred;
  background-color: white;
  border: 2px lightcoral solid;
  border-radius: 5px;
  width: 60px;
  text-align: center;
}

.resize-graph {
  width: 100%;
  overflow: auto;
}

.share:hover {
  top: -1px;
}
</style>
