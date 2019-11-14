<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ $t('error.' + pageNotFound) }}
    </h1>
    <div v-else>
      <h1>
        {{ $t('error.' + otherError) }}
      </h1>
      <p>
        {{ $t('error.' + errorMessage) }}
      </p>
    </div>
    <div v-for="link in links" :key="link">
      <NuxtLink :to="`/${link}`">
        {{ $t('error.link.' + link) }}
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? this.pageNotFound
        : this.$t('error.' + this.otherError)
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404',
      otherError: 'default_title',
      errorMessage: 'default_message',
      links: ['panel']
    }
  },
  mounted() {
    if (this.error.title) {
      this.otherError = this.error.title
      this.links = ['import', 'panel']
    }
    this.errorMessage = this.error.message
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
