<template>
  <v-chip v-if="variable.isUsed" :color="variable.color">
    <v-icon :color="'white'" left>{{ variable.icon }}</v-icon>
    {{ variable.name
    }}<v-icon
      :color="'white'"
      @click="
        variable.isUsed = false
        compute()
      "
      right
      >mdi-close-circle-outline</v-icon
    >
  </v-chip>
</template>
<script>
export default {
  props: {
    variable: {
      type: Object,
      default: null
    }
  },
  methods: {
    compute() {
      this.$emit('compute')
    }
  }
}
</script>
