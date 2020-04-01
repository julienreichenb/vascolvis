<template>
  <v-container fluid fill-height>
    <v-toolbar class="indigo darken-3">
      <v-toolbar-title v-text="this.$t('about.header')" class="white--text">
      </v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-card-text class="pt-4">
        <div>
          <p>
            {{ $t('about.p_1') }}
          </p>
          <p>
            {{ $t('about.demo') }} :
            <a href="https://youtu.be/zleGh2nN4qg"
              >https://youtu.be/zleGh2nN4qg</a
            >
          </p>
          <h4>{{ $t('about.title_2') }}</h4>
          <p v-html="$t('about.p_2')" />
          <h4>{{ $t('about.title_3') }}</h4>
          <p>
            {{ $t('about.p_3') }}
          </p>
          <h4>{{ $t('about.title_4') }}</h4>
          <p v-html="$t('about.p_4')" />
        </div>
      </v-card-text>
    </v-card>
  </v-container>
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
<style scoped>
h1,
h2,
h3,
h4 {
  color: white;
}
h4 {
  font-size: 1.2em;
  padding: 0.5em 0;
}
</style>
