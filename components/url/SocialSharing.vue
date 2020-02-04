<template>
  <div>
    <v-btn
      v-clipboard:copy="getFullUrl()"
      v-clipboard:success="showCopySuccess"
      small
      icon
      depressed
      class="share ml-2 white indigo--text"
      ><v-icon color="black">mdi-link-variant</v-icon></v-btn
    >
    <v-btn
      @click="shareByMail()"
      small
      icon
      depressed
      class="share ml-2 white indigo--text"
      ><v-icon>mdi-email-outline</v-icon></v-btn
    >
    <v-btn
      @click="shareOnFacebook()"
      small
      icon
      depressed
      class="share ml-2 white indigo--text"
      ><v-icon color="#4267B2">mdi-facebook</v-icon></v-btn
    >
    <v-btn
      @click="shareOnTwitter()"
      small
      icon
      depressed
      class="share ml-2 white indigo--text"
      ><v-icon color="#55ACEE">mdi-twitter</v-icon></v-btn
    >
  </div>
</template>
<script>
export default {
  props: {
    chart: { type: Object, required: true }
  },
  methods: {
    getFullUrl() {
      return 'http://localhost:3000/graph/' + this.chart.url
    },
    shareByMail() {
      window.open(
        `mailto:test@example.com?subject=${this.$t('url.mail_subject') +
          this.chart.name}&body=${this.$t('url.mail_body') + this.getFullUrl()}`
      )
    },
    shareOnFacebook() {
      const facebookWindow = window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' + this.getFullUrl(),
        'facebook-popup',
        'height=350,width=600'
      )
      if (facebookWindow.focus) {
        facebookWindow.focus()
      }
      return false
    },
    shareOnTwitter() {
      const twitterWindow = window.open(
        'https://twitter.com/share?url=' + this.getFullUrl(),
        'twitter-popup',
        'height=350,width=600'
      )
      if (twitterWindow.focus) {
        twitterWindow.focus()
      }
      return false
    },
    showCopySuccess() {
      this.$toast.info(this.$t('url.copied'), { position: 'top-right' })
    }
  }
}
</script>
