<template>
  <div v-if="chart">
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
                  <span v-else>Public</span>
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
                  <span v-else>Privé</span>
                </div>
                <div />
                <div class="url pr-2 pl-2 pt-2 pb-2">
                  {{ chart.url }}
                  <v-btn
                    v-clipboard:copy="getFullUrl()"
                    v-clipboard:success="showCopySuccess"
                    x-small
                    class="ml-2 indigo text--black"
                    >Copier</v-btn
                  >
                </div>
              </v-layout>
            </v-toolbar>
            <v-card-subtitle>
              <v-btn
                color="white indigo--text"
                depressed
                @click="annotating = !annotating"
                >Ajouter une annotation</v-btn
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
  data() {
    return {
      init: false,
      json: null,
      chart: null,
      annotations: [],
      annotating: false,
      isMyChart: true,
      elements: []
    }
  },
  asyncData({ params }) {
    return axios.get(`/charts/?url=${params.url}`).then((res) => {
      return { chart: res.data, json: JSON.parse(res.data.data) }
    })
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
      this.isMyChart = this.chart.id_user === this.user.id
      if (!this.isMyChart && !this.chart.public) {
        this.$router.push({ name: 'import' })
      }
    } catch {
      this.$router.push({ name: 'index' })
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
            ? (msg = 'Le graphique est maintenant public.')
            : (msg = 'Le graphique est maintenant privé.')
          this.$toast.success(msg)
        })
    },
    getFullUrl() {
      return 'localhost:3000/graph/' + this.chart.url
    },
    showCopySuccess() {
      this.$toast.show('Copié !')
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
  width: 55px;
  text-align: center;
}

.private {
  font-weight: bold;
  color: darkred;
  background-color: white;
  border: 2px lightcoral solid;
  border-radius: 5px;
  width: 55px;
  text-align: center;
}

.url {
  color: royalblue;
  background-color: white;
  border: 1px black solid;
  border-radius: 10px;
}

.resize-graph {
  width: 100%;
  overflow: auto;
}
</style>
