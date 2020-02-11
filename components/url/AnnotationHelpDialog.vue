<template>
  <v-dialog width="85%">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" x-large icon color="white" dark>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline indigo darken-3 mb-3" primary-title>
        {{ $t('url.info.title') }}
      </v-card-title>
      <v-card-text>
        <p>
          {{ $t('url.info.intro') }}
          <v-btn depressed outlined x-small color="white">{{
            $t('url.add_annot')
          }}</v-btn>
          {{ $t('url.info.intro_2') }}
          <v-btn color="green lighten-2" depressed outlined x-small>
            <v-icon x-small>
              mdi-plus-circle-outline
            </v-icon>
            {{ $t('url.reply_annot') }}
          </v-btn>
          {{ $t('url.info.intro_3') }}
        </p>
        <h2>{{ $t('url.info.module_title') }}</h2>
        <p v-html="$t('url.info.module')" />
        <h2>{{ $t('url.info.annotations_title') }}</h2>
        <p v-html="$t('url.info.annotations')" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {}
</script>
<style scoped>
h2,
h3 {
  color: white;
  margin-bottom: 0.5em;
}
p {
  color: lightgrey;
}
</style>
