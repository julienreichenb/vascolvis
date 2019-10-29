<template>
  <div v-if="chart">
    <h1>Hello world</h1>
    <h2>{{ chart.name }}</h2>
    <h3>Now we need ColVis plugin...</h3>
    <v-btn
      color="white indigo--text"
      depressed
      @click="annotating = !annotating"
      >Annotate</v-btn
    >
    <v-layout flex align-center justify-space-around>
      <div id="vis" class="resize-graph"></div>
    </v-layout>
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
import axios from 'axios'
export default {
  data() {
    return {
      init: false,
      json: null,
      chart: null,
      annotations: [],
      annotating: false,
      elements: []
    }
  },
  asyncData({ params }) {
    return axios.get(`/charts/id/?id=${params.idgraph}`).then((res) => {
      return { chart: res.data, json: JSON.parse(res.data.data) }
    })
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push({ name: 'index' })
    }
    this.displayGraph()
    this.init = true
  },
  mounted() {
    this.element = this.$getDataFromContainer
  },
  methods: {
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
