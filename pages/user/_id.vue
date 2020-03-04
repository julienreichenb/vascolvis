<template>
  <div v-if="init">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex>
        <v-flex elevation-6>
          <v-card>
            <v-toolbar class="indigo darken-3">
              <v-layout>
                <v-toolbar-title>
                  <v-tooltip v-if="isAdmin(currentUser)" color="green" bottom>
                    <template v-slot:activator="{ on }">
                      <v-icon v-on="on" class="mr-3 pb-1"
                        >mdi-account-tie-outline</v-icon
                      >
                    </template>
                    <span>{{ $t('user.isAdmin') }}</span>
                  </v-tooltip>
                  {{
                    currentUser.profile.publicname
                      ? currentUser.profile.publicname
                      : currentUser.username
                  }}</v-toolbar-title
                >
              </v-layout>
              <v-btn
                v-if="user.id === currentUser.id"
                @click="goToSettings()"
                outlined
                large
                color="blue lighten-3"
                ><v-icon>mdi-file-document-edit-outline</v-icon
                >{{ $t('user.edit_profile') }}</v-btn
              >
            </v-toolbar>
            <v-card-title>{{ $t('user.title') }}</v-card-title>
            <v-card-text>
              <div v-if="currentUser.profile.url">
                <span>{{ $t('user.website') }}</span>
                <a
                  :href="'https://www.' + cleanedUrl(currentUser.profile.url)"
                  class="link"
                  target="_blank"
                  >{{ currentUser.profile.url }}</a
                >
              </div>
              <div>
                <div
                  v-if="currentUser.profile.bio"
                  v-html="currentUser.profile.bio"
                  class="highlight"
                />
                <span
                  v-else
                  v-html="
                    (currentUser.profile.publicname
                      ? currentUser.profile.publicname
                      : currentUser.username) +
                      ' ' +
                      $t('user.no_bio')
                  "
                  class="no"
                />
              </div>
            </v-card-text>
            <v-card-title>{{ $t('user.title2') }}</v-card-title>
            <v-card-text>
              <div v-if="graphs.length > 0 && graphs">
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
                  (currentUser.profile.publicname
                    ? currentUser.profile.publicname
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
import jwtDecode from 'jwt-decode'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title:
        this.$t('title.user') +
        (this.currentUser.profile.publicname
          ? this.currentUser.profile.publicname
          : this.currentUser.username)
    }
  },
  data() {
    return {
      init: false,
      graphs: [],
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
        return {
          currentUser: res.data
        }
      })
      .catch((e) => {
        error({ statusCode: 402, title: 'no_user', message: 'not_found' })
      })
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push(this.localePath({ name: 'index' }))
    }
    this.getUserCharts()
  },
  mounted() {
    this.init = true
  },
  methods: {
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
    },
    goToSettings() {
      this.$router.push(this.localePath({ name: 'settings' }))
    },
    cleanedUrl(url) {
      url = url.replace('https', '')
      url = url.replace('http', '')
      url = url.replace('://', '')
      url = url.replace('www.', '')
      return url
    },
    isAdmin(user) {
      return user.isAdmin
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

.v-tooltip__content {
  border: 1px solid white !important;
  opacity: 1 !important;
}
</style>
