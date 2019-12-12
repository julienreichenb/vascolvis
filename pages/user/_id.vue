<template>
  <div v-show="profile">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex elevation-6>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-toolbar-title>{{ profile.publicname }}</v-toolbar-title>
            </v-toolbar>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: this.$t('title.user')
    }
  },
  data() {},
  asyncData({ params, error }) {
    return axios
      .get(`/profiles/?id=${params.id}`)
      .then((res) => {
        return { profile: res.data }
      })
      .catch((e) => {
        error({ statusCode: 402, title: 'no_user', message: 'not_found' })
      })
  }
}
</script>
