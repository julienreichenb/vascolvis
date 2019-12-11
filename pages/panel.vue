<template>
  <div v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="indigo darken-3">
            <v-toolbar-title
              v-text="this.$t('panel.header') + ' ' + user.username"
              class="white--text"
            >
            </v-toolbar-title>
            <v-tabs
              slot="extension"
              :grow="true"
              centered
              slider-color="white"
              color="white"
            >
              <v-tab v-for="menu in menus" :key="menu.id">
                <v-container fill-height>
                  <v-layout align-center justify-space-around>
                    <span>
                      {{ $t('panel.tabs.' + menu.id) }}
                    </span>
                    <v-icon color="blue lighten-2">{{ menu.icon }}</v-icon>
                  </v-layout>
                </v-container>
              </v-tab>
              <v-tab-item v-for="menu in menus" :key="menu.id">
                <v-card-text v-if="menu.id === 'datasets'">
                  <br />
                  <v-btn @click="goToImport()" color="white" outlined depressed>
                    {{ $t('panel.dataset_button') }}
                  </v-btn>
                </v-card-text>
                <PanelTable
                  v-if="menu.data.length > 0"
                  :user="user"
                  :type="menu.id"
                  :headers="menu.headers"
                  :data="menu.data"
                  @refresh="refresh(menu.id)"
                >
                </PanelTable>
                <v-card v-else>
                  <v-card-title>{{ $t('panel.no_data') }}</v-card-title>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import PanelTable from '../components/PanelTable'
export default {
  head() {
    return {
      title: this.$t('title.panel'),
      meta: [
        {
          hid: 'panel'
        }
      ]
    }
  },
  components: {
    PanelTable
  },
  data() {
    return {
      show: false,
      user: Object,
      menus: [
        {
          id: 'datasets',
          icon: 'mdi-database',
          headers: [
            { text: this.$t('panel.table.name'), value: 'name' },
            { text: this.$t('panel.table.size'), value: 'size' },
            {
              text: this.$t('panel.table.actions'),
              value: 'actions',
              sortable: false
            }
          ],
          data: []
        },
        {
          id: 'charts',
          icon: 'mdi-chart-pie',
          headers: [
            { text: '', value: 'public' },
            { text: this.$t('panel.table.name'), value: 'name' },
            { text: this.$t('panel.table.url'), value: 'url', sortable: false },
            { text: this.$t('panel.table.user'), value: 'id_user' },
            {
              text: this.$t('panel.table.actions'),
              value: 'actions',
              sortable: false
            }
          ],
          data: []
        },
        {
          id: 'annotations',
          icon: 'mdi-note-text-outline',
          headers: [],
          data: []
        },
        {
          id: 'comments',
          icon: 'mdi-comment-processing-outline',
          headers: [],
          data: []
        }
      ]
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
      this.fetchAllData()
      this.show = true
    } catch {
      this.$router.push(this.localePath({ name: 'index' }))
    }
  },
  methods: {
    goToImport() {
      this.$router.push(this.localePath({ name: 'import' }))
    },
    // Fetch data for the current user
    fetchAllData() {
      this.getDatasets()
      this.getCharts()
      this.getAnnotations()
      this.getComments()
    },
    async getUserProfile() {
      await axios
        .get(`/profiles?id=${this.user.id}`)
        .then((res) => {
          this.user.profile = res.data
        })
        .catch((error) => {
          alert(error)
        })
    },
    async getDatasets() {
      await axios.get(`/datasets/user/?id_user=${this.user.id}`).then((res) => {
        this.menus[0].data = res.data
      })
    },
    async getCharts() {
      await axios.get(`/charts/all`).then((res) => {
        this.menus[1].data = res.data
      })
    },
    async getAnnotations() {
      await axios
        .get(`/annotations/user/?id_user=${this.user.id}`)
        .then((res) => {
          this.menu[2].data = res.data
        })
    },
    async getComments() {
      await axios.get(`/comments/user/?id_user=${this.user.id}`).then((res) => {
        this.menu[3].data = res.data
      })
    },
    refresh(type) {
      switch (type) {
        case 'datasets':
          this.getDatasets()
          break
        case 'charts':
          this.getCharts()
          break
        case 'annotations':
          this.getAnnotations()
          break
        default:
          this.getComments()
      }
    }
  }
}
</script>
