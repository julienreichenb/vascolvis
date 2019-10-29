<template>
  <div v-if="chart">
    <h1>Hello world</h1>
    <h2>{{ chart.name }}</h2>
    <h3>Now we need ColVis plugin...</h3>
    <v-btn @click="displayGraph">Annotate</v-btn>
    <v-layout flex align-center justify-space-around>
      <div id="vis" class="resize-graph"></div>
    </v-layout>
    <!--
    <ColInputMain
      vis="#vis"
      :elements="elements"
      :annotating="annotating"
      :init="init"
      :offset-top="-64"
      @close="annotating = false"
      @submittingAnnotation="alertAnnotation"
    />
    -->
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      loaded: false,
      json: null,
      chart: null,
      annotations: [],
      annotating: false
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push({ name: 'index' })
    }
    this.getChart()
  },
  methods: {
    async getChart() {
      await this.$axios
        .get('/charts/id/?id=' + this.$route.params.idgraph)
        .then((res) => {
          this.chart = res.data
          this.json = JSON.parse(this.chart.data)
          this.loaded = true
        })
    },
    displayGraph() {
      window.vegaEmbed('#vis', this.json)
    },
    alertAnnotation(annotation) {
      this.annotations.push(annotation)
    }
  }
}
</script>

<style>
.resize-graph {
  overflow: auto;
  height: 300px;
  text-align: center;
}
</style>
