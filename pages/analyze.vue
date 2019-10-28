<template>
  <div v-if="chart">
    <h1>Hello world</h1>
    <h2>{{ chart.name }}</h2>
    <h3>Now we need ColVis plugin...</h3>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      json: '',
      chart: null
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
        })
    }
  }
}
</script>
