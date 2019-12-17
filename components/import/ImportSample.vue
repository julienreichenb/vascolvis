<template>
  <v-card>
    <v-card-title v-text="this.$t('import.sample.label')"> </v-card-title>
    <v-card-text>
      <p>
        {{ $t('import.sample.text') }}
      </p>
      <v-layout justify-space-between>
        <v-btn @click="generate()" large outlined color="white" depressed>
          {{ $t('import.sample.button') }}
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  methods: {
    generate() {
      this.$emit('generate')
    }
  }
}
</script>
