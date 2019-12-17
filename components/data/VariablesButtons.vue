<template>
  <v-layout align-center justify-space-around>
    <v-btn v-if="panel" @click="all" text icon color="white">
      <v-icon>mdi-eye</v-icon><v-icon>mdi-arrow-down</v-icon>
    </v-btn>
    <v-btn v-else @click="none" text icon color="red">
      <v-icon>mdi-eye-off</v-icon><v-icon>mdi-arrow-up</v-icon>
    </v-btn>
    <v-btn
      :disabled="totalVariable < 1"
      @click="reset"
      icon
      x-large
      color="red lighten-1"
      ><v-icon>mdi-delete-sweep</v-icon></v-btn
    >
  </v-layout>
</template>
<script>
export default {
  props: {
    panel: {
      type: Boolean,
      default: true
    },
    totalVariable: {
      type: Number,
      default: 0
    }
  },
  methods: {
    all() {
      this.$emit('all')
    },
    none() {
      this.$emit('none')
    },
    reset() {
      this.$emit('resetvariables')
    }
  }
}
</script>
