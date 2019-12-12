<template>
  <div v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex :sm9="annotating" xs12 elevation-6>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-layout justify-space-between align-center>
                <v-toolbar-title v-text="chart.name" class="white--text">
                </v-toolbar-title>
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
                    @click="shareByMail()"
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    ><v-icon>mdi-email-outline</v-icon></v-btn
                  >
                  <v-btn
                    @click="shareOnFacebook()"
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    ><v-icon color="#4267B2">mdi-facebook</v-icon></v-btn
                  >
                  <v-btn
                    @click="shareOnTwitter()"
                    small
                    icon
                    depressed
                    class="share ml-2 white indigo--text"
                    ><v-icon color="#55ACEE">mdi-twitter</v-icon></v-btn
                  >
                </div>
              </v-layout>
            </v-toolbar>
            <v-card-text>
              <v-layout justify-space-between>
                <div v-if="currentUser">
                  <h2>
                    {{ $t('url.graph_of')
                    }}<a @click="goToProfile(profile.id_user)">{{
                      profile.publicname
                        ? profile.publicname
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
                @click="annotating = !annotating"
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
      :elements="elements"
      :annotating="annotating"
      :init="init"
      :offset-top="-64"
      @close="annotating = false"
      @submittingAnnotation="alertAnnotation"
      vis="#vis"
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
      currentUser: {},
      profile: {},
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
    this.element = this.$getDataFromContainer
  },
  methods: {
    displayGraph() {
      this.json.height = '400'
      this.json.width = 'container'
      window.vegaEmbed('#vis', this.json)
    },
    alertAnnotation(annotation) {
      this.annotations.push(annotation)
    },
    async getUser() {
      await axios.get(`/users/?id=${this.chart.id_user}`).then((res) => {
        this.currentUser = res.data
        this.getUserProfile()
      })
    },
    async getUserProfile() {
      await axios
        .get(`/profiles/?id=${this.currentUser.id}`)
        .then((res) => {
          this.profile = res.data
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
</style>
