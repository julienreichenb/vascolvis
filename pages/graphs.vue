<template>
  <div v-if="dataset">
    <h1>{{ dataset.name }}</h1>
    <h2>{{ JSON.parse(dataset.data) }}</h2>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      dataset: null,
      variables: [],
      allData: []
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push({ name: 'index' })
    }
    this.getDataSet()
  },
  methods: {
    async getDataSet() {
      await this.$axios
        .get('/datasets/single/?id=' + this.$route.params.idset)
        .then((res) => {
          this.dataset = res.data
        })
    }
  }
}
</script>
