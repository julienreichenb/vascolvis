<template>
  <v-chip v-if="variable.isUsed" color="white" outlined>
    <v-icon :color="variable.color" left>{{ variable.icon }}</v-icon>
    <span style="color: white">{{ variable.name }}</span
    ><v-icon
      :color="'white'"
      @click="
        variable.isUsed = false
        compute()
      "
      small
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
