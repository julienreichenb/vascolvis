<template>
  <div>
    <v-btn
      v-clipboard:copy="url"
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
  head() {
    return {
      title: this.$t('title.url') + ' ' + this.chart.name,
      meta: [
        {
          'og:title': this.$t('url.fb_body')
        }
      ]
    }
  },
  props: {
    chart: { type: Object, required: true }
  },
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    this.url = window.location.href
  },
  methods: {
    shareByMail() {
      window.open(
        `mailto:test@example.com?subject=${this.$t('url.mail_subject') +
          this.chart.name}&body=${this.$t('url.mail_body') + this.url}`
      )
    },
    shareOnFacebook() {
      const facebookWindow = window.open(
        'https://www.facebook.com/sharer/sharer.php?u=' +
          this.url +
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
        'https://twitter.com/share?url=' +
          this.url +
          '&text=' +
          this.$t('url.twitter_body'),
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
