<template v-slot:extension>
  <v-btn
    :disabled="drawer"
    @click="openDrawer()"
    color="blue lighten-2"
    small
    left
    fab
  >
    <v-icon>mdi-arrow-collapse-right</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    drawer: {
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
