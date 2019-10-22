<template>
  <div>
    <h1>Bienvenue, {{ user.username }}</h1>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      user: null,
      file: null,
      chart: null
    }
  },
  created() {
    this.user = jwtDecode(localStorage.getItem('usertoken'))
    // eslint-disable-next-line
    console.log(this.user)
  },
  methods: {
    submit() {}
  }
}
</script>
