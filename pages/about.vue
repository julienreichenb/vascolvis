<template>
  <div>
    <v-toolbar class="indigo darken-3">
      <v-toolbar-title class="white--text" v-text="this.$t('about.header')">
      </v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-text class="pt-4">
        <div>
          <h4>{{ $t('about.title_1') }}</h4>
          <p>
            {{ $t('about.p_1') }}
          </p>
          <h4>{{ $t('about.title_2') }}</h4>
          <p>
            {{ $t('about.p_2') }}
          </p>
          <h4>{{ $t('about.title_3') }}</h4>
          <p>
            {{ $t('about.p_3') }}
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: this.$t('title.about'),
      meta: [
        {
          hid: 'about'
        }
      ]
    }
  }
}
</script>
