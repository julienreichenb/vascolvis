<template v-slot:extension>
  <v-btn
    id="btn-drawer"
    :disabled="drawer"
    :style="right ? 'right: 0; float: right' : 'left: 0; float: left'"
    @click="openDrawer()"
    :small="small"
    color="blue lighten-2"
    left
    fab
  >
    <v-icon>{{ pointLeft ? icon + ' mdi-flip-h' : icon }}</v-icon>
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
    },
    icon: {
      type: String,
      default: 'mdi-arrow-collapse-right'
    },
    small: {
      type: Boolean,
      default: true
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
}
</style>
