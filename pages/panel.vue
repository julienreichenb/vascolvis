<template>
  <div v-if="init">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="pt-5 blue darken-3">
            <v-toolbar-title class="white--text">
              <h3>Bienvenue sur votre panel, {{ user.username }}</h3>
            </v-toolbar-title>
            <v-tabs
              slot="extension"
              centered
              :grow="true"
              slider-color="white"
              color="white"
            >
              <v-tab v-for="menu in menus" :key="menu.id">
                <v-container fill-height>
                  <v-layout align-center justify-space-around>
                    <span>
                      {{ menu.label }}
                    </span>
                    <v-icon color="blue lighten-2">{{ menu.icon }}</v-icon>
                  </v-layout>
                </v-container>
              </v-tab>
              <v-tab-item v-for="menu in menus" :key="menu.id">
                <PanelTable
                  v-if="menu.data.length > 0"
                  :user="user"
                  :type="menu.id"
                  :headers="menu.headers"
                  :data="menu.data"
                  @refresh="refresh(menu.id)"
                ></PanelTable>
                <v-card v-else>
                  <v-card-title>Aucune donnée disponible.</v-card-title>
                  <v-card-text v-if="menu.id === 'datasets'">
                    <v-btn
                      color="white indigo--text"
                      depressed
                      @click="goToImport()"
                    >
                      Importer un jeu de données
                    </v-btn>
                  </v-card-text>
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
  components: {
    PanelTable
  },
  data() {
    return {
      init: false,
      user: Object,
      menus: [
        {
          id: 'datasets',
          label: 'Sets de données',
          icon: 'mdi-database',
          headers: [
            { text: 'Nom', value: 'name', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false }
          ],
          data: []
        },
        {
          id: 'charts',
          label: 'Graphiques',
          icon: 'mdi-chart-pie',
          headers: [
            { text: 'Nom', value: 'name', sortable: false },
            { text: 'Utilisateur', value: 'id_user' },
            { text: 'Actions', value: 'actions', sortable: false }
          ],
          data: []
        },
        {
          id: 'annotations',
          label: 'Annotations',
          icon: 'mdi-note-text-outline',
          headers: [],
          data: []
        },
        {
          id: 'comments',
          label: 'Commentaires',
          icon: 'mdi-comment-processing-outline',
          headers: [],
          data: []
        }
      ]
    }
  },
  asyncData() {},
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
      this.fetchAllData()
      this.init = true
    } catch {
      this.$router.push({ name: 'index' })
    }
  },

  methods: {
    goToImport() {
      this.$router.push({ name: 'import' })
    },
    // Fetch data for the current user
    fetchAllData() {
      this.getDatasets()
      this.getCharts()
      // this.getAnnotations()
      // this.getComments()
    },
    async getDatasets() {
      await axios.get(`/datasets/user/?id_user=${this.user.id}`).then((res) => {
        this.menus[0].data = res.data
      })
    },
    async getCharts() {
      await axios.get(`/charts`).then((res) => {
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

<style></style>
