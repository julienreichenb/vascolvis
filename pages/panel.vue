<template>
  <div v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex sm12 xl10 elevation-6>
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
                  :names="names"
                  :urls="urls"
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
import axios from '~/plugins/axios'
import PanelTable from '~/components/panel/PanelTable'
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
      names: [],
      urls: [],
      menus: [
        {
          id: 'datasets',
          icon: 'mdi-database',
          headers: [
            { text: this.$t('panel.table.name'), value: 'name' },
            { text: this.$t('panel.table.size'), value: 'size' },
            {
              text: this.$t('panel.table.workspace'),
              value: 'workspaces',
              sortable: false
            },
            {
              text: this.$t('panel.table.graph'),
              value: 'graphs',
              sortable: false
            },
            {
              text: this.$t('panel.table.date'),
              value: 'updatedAt',
              sortable: true
            },
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
          icon: 'mdi-chart-scatter-plot',
          headers: [
            { text: '', value: 'public', sortable: false },
            { text: this.$t('panel.table.name'), value: 'name' },
            { text: this.$t('panel.table.url'), value: 'url', sortable: false },
            { text: this.$t('panel.table.user'), value: 'id_user' },
            {
              text: this.$t('panel.table.annotation'),
              value: 'annotations',
              sortable: false
            },
            {
              text: this.$t('panel.table.date'),
              value: 'updatedAt',
              sortable: true
            },
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
          headers: [
            { text: 'id', value: 'id', sortable: true },
            {
              text: this.$t('panel.table.graph_name'),
              value: 'id_chart',
              sortable: true
            },
            {
              text: this.$t('panel.table.date'),
              value: 'updatedAt',
              sortable: true
            },
            {
              text: this.$t('panel.table.actions'),
              value: 'actions',
              sortable: false
            }
          ],
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
      this.getDatasets(false)
      this.getCharts(false)
      this.getAnnotations(false)
    },
    async getUserProfile() {
      await axios
        .get(`/profiles?id=${this.user.id}`)
        .then((res) => {
          this.user.profile = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
        })
    },
    async getDatasets(reload) {
      await axios
        .get(`/datasets/user/?id_user=${this.user.id}`)
        .then((res) => {
          this.menus[0].data = res.data
          if (reload) {
            this.$forceUpdate()
          }
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    async getCharts(reload) {
      await axios
        .get(`/charts/all`)
        .then((res) => {
          this.menus[1].data = res.data
          for (let i = 0; i < res.data.length; i++) {
            const id = res.data[i].id_user
            this.getName(id)
          }
          if (reload) {
            this.$forceUpdate()
          }
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    async getName(id) {
      await axios
        .get(`/users/names/?id=${id}`)
        .then((res) => {
          this.names.push(res.data)
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    async getAnnotations(reload) {
      await axios
        .get(`/annotations/user?id_user=${this.user.id}`)
        .then((res) => {
          this.menus[2].data = res.data
          for (let i = 0; i < res.data.length; i++) {
            const id = res.data[i].id_chart
            this.getUrl(id)
          }
          if (reload) {
            this.$forceUpdate()
          }
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    async getUrl(id) {
      await axios
        .get(`/charts/url?id=${id}`)
        .then((res) => {
          this.urls.push(res.data)
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    refresh(type) {
      switch (type) {
        case 'datasets':
          this.getDatasets(true)
          break
        case 'charts':
          this.getCharts(true)
          break
        case 'annotations':
          this.getAnnotations(true)
          break
      }
    }
  }
}
</script>
