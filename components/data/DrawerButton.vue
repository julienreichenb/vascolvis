<template v-slot:extension>
  <v-btn
    id="btn-drawer"
    :disabled="drawer"
    :style="right ? 'right: 0; float: right' : 'left: 0; float: left'"
    @click="openDrawer()"
    color="blue lighten-2"
    small
    left
    fab
  >
    <v-icon>{{
      pointLeft ? 'mdi-arrow-collapse-left' : 'mdi-arrow-collapse-right'
    }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true
    },
    right: {
      type: Boolean,
      default: false
    },
    pointLeft: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openDrawer() {
      this.$emit('open')
    }
  }
}
</script>
<style scoped>
#btn-drawer {
  position: sticky;
  top: 15%;
  margin-top: -1em;
}
</style>
