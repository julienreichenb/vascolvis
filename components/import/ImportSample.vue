<template>
  <v-card>
    <v-card-title v-text="this.$t('import.sample.label')"> </v-card-title>
    <v-card-text>
      <p>
        {{ $t('import.sample.text') }}
      </p>
      <v-layout justify-space-between>
        <v-btn @click="generate()" large outlined color="white" depressed>
          <v-icon>mdi-scatter-plot-outline</v-icon>
          {{ $t('import.sample.button') }}
        </v-btn>
        <v-btn
          @click="goToAnnotSample()"
          large
          outlined
          color="white"
          depressed
        >
          <v-icon>mdi-note-text-outline</v-icon>
          {{ $t('import.sample.buttonannot') }}
        </v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  methods: {
    generate() {
      this.$router.push({
        name: `data-id___${this.$i18n.locale}`,
        params: { id: 1 }
      })
    },
    goToAnnotSample() {
      this.$router.push({
        name: `graph-url___${this.$i18n.locale}`,
        params: { url: 'SAMPLEANNOT' }
      })
    }
  }
}
</script>
