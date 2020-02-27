<template v-slot:extension>
  <v-btn
    :disabled="drawer"
    :style="right ? 'right: 0; float: right' : 'left: 0; float: left'"
    @click="openDrawer()"
    style="position: absolute; height: 100%; border-radius: 0; margin-top: -1em;"
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
