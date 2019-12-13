<template>
  <div v-show="currentUser">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex elevation-6>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-toolbar-title>{{
                profile.publicname ? profile.publicname : currentUser.username
              }}</v-toolbar-title>
            </v-toolbar>
            <v-card-title>{{ $t('user.title') }}</v-card-title>
            <v-card-text>
              <div v-if="profile.url">
                <span>{{ $t('user.website') }}</span>
                <a
                  :href="'http://' + profile.url"
                  class="link"
                  target="_blank"
                  >{{ profile.url }}</a
                >
              </div>
              <div>
                <div v-if="profile.bio" class="highlight">
                  {{ profile.bio }}
                </div>
                <span v-else class="no">{{
                  (profile.publicname
                    ? profile.publicname
                    : currentUser.username) +
                    ' ' +
                    $t('user.no_bio')
                }}</span>
              </div>
            </v-card-text>
            <v-card-title>{{ $t('user.title2') }}</v-card-title>
            <v-card-text>
              <div v-if="graphs.length > 0">
                <v-data-table
                  :headers="headers"
                  :items="graphs"
                  :footer-props="{
                    'items-per-page-options': [parseInt('5', 10)]
                  }"
                  :items-per-page="parseInt('5', 10)"
                  item-key="id"
                >
                  <template v-slot:item.url="{ item }">
                    <a @click="goToGraph(item)" class="link">{{ item.url }}</a>
                  </template>
                </v-data-table>
              </div>
              <div v-else class="no">
                {{
                  (profile.publicname
                    ? profile.publicname
                    : currentUser.username) +
                    ' ' +
                    $t('user.no_graphs')
                }}
              </div>
            </v-card-text>
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
      title:
        this.$t('title.user') +
        (this.profile.publicname
          ? this.profile.publicname
          : this.currentUser.username)
    }
  },
  data() {
    return {
      profile: {},
      graphs: [{}],
      headers: [
        { text: this.$t('panel.table.name'), value: 'name' },
        { text: this.$t('panel.table.url'), value: 'url', sortable: false }
      ]
    }
  },
  asyncData({ params, error }) {
    return axios
      .get(`/users/?id=${params.id}`)
      .then((res) => {
        return { currentUser: res.data }
      })
      .catch((e) => {
        error({ statusCode: 402, title: 'no_user', message: 'not_found' })
      })
  },
  created() {
    this.getUserProfile()
    this.getUserCharts()
  },
  methods: {
    async getUserProfile() {
      await axios
        .get(`/profiles/?id=${this.currentUser.id}`)
        .then((res) => {
          this.profile = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    async getUserCharts() {
      await axios
        .get(`/charts/user?id_user=${this.currentUser.id}`)
        .then((res) => {
          this.graphs = res.data.filter((g) => g.public === 1)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    goToGraph(item) {
      this.$router.push({
        name: `graph-url___${this.$i18n.locale}`,
        params: { url: item.url }
      })
    }
  }
}
</script>

<style scoped>
.highlight {
  padding: 1em;
  margin-top: 1em;
  color: white;
  font-size: 1.2em;
  font-style: italic;
  border: 1px solid white;
  border-radius: 5px;
}
.no {
  color: white;
  font-style: italic;
}
.link {
  color: cornflowerblue !important;
}
</style>
