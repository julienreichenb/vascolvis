<template>
  <div>
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="pt-5 blue darken-3">
            <v-toolbar-title class="white--text">
              <h3>Sélectionnez des données à importer</h3>
            </v-toolbar-title>
            <v-tabs
              slot="extension"
              centered
              :grow="true"
              slider-color="white"
              color="white"
            >
              <v-tab> Vos données </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-text class="pt-4">
                    <div class="help">
                      <v-icon color="blue" small
                        >mdi-help-circle-outline</v-icon
                      >
                      Pour convertir vos fichiers en .csv,
                      <a
                        href="https://www.aconvert.com/document/xls-to-csv/"
                        target="_blank"
                        >cliquez ici</a
                      >
                    </div>
                    <div class="help">
                      <v-icon color="red" small>mdi-alert-outline</v-icon>
                      Votre fichier doit contenir des entêtes
                    </div>
                    <div class="form-group">
                      <div class="col-sm-9">
                        <v-file-input
                          v-model="file"
                          type="file"
                          accept=".csv"
                          show-size
                          outlined
                          color="blue"
                          prepend-icon="mdi-upload"
                          label="Parcourir..."
                          class="form-control"
                          @change="loadCSV()"
                        />
                        <v-layout justify-space-between>
                          <v-btn
                            v-if="json"
                            large
                            color="indigo darken-2"
                            @click="saveDataset()"
                          >
                            <v-icon>mdi-chart-bar</v-icon> Générer les
                            graphiques
                          </v-btn>
                          <v-switch
                            v-if="file"
                            v-model="preview"
                            label="Voir l'aperçu"
                            color="blue"
                          ></v-switch>
                        </v-layout>
                      </div>
                    </div>
                    <div v-if="hasError">
                      <br />
                      <h4 class="apierror">{{ error }}</h4>
                    </div>
                    <table v-if="parse_csv && preview">
                      <thead>
                        <tr>
                          <th
                            v-for="key in parse_header"
                            :key="key"
                            :class="{ active: sortKey === key }"
                            @click="sortBy(key)"
                          >
                            {{ key | capitalize }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="csv in parse_csv" :key="csv">
                          <td v-for="key in parse_header" :key="key">
                            {{ csv[key] }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab> Exemple </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-title
                    v-text="`Essayez avec notre échantillon de données`"
                  >
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur posuere tellus sed blandit lobortis. Ut non eros
                      mattis dolor fermentum malesuada sit amet sit amet nisl.
                      Quisque lorem felis, ultrices in lectus eu, mollis
                      fermentum lorem. Pellentesque tincidunt erat lectus, a
                      faucibus dolor finibus in. Cras hendrerit, leo sit amet
                      commodo auctor, dolor purus facilisis justo, vitae
                      vehicula elit odio id ex. Aliquam malesuada dui at lorem
                      interdum, at dapibus massa vehicula. Sed sodales ut ipsum
                      quis commodo. Integer in quam a eros porttitor eleifend
                      nec eget ex. Sed eget condimentum est, id egestas nisi.
                      Duis rhoncus arcu at bibendum facilisis. Phasellus tempor
                      finibus tincidunt. Mauris at egestas lectus. Ut rutrum
                      pharetra lorem, varius malesuada mi posuere id. Sed
                      rhoncus luctus dui, quis vestibulum risus finibus a.
                      Aenean in velit massa. Etiam congue urna sit amet
                      tristique commodo.
                    </p>
                    <v-layout justify-space-between>
                      <v-btn
                        large
                        color="indigo darken-2"
                        @click="generateSampleGraph()"
                      >
                        <v-icon>mdi-chart-bar</v-icon> Générer les graphiques
                      </v-btn>
                    </v-layout>
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
export default {
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  data() {
    return {
      sampleDataSet: null,
      showSampleTable: false,
      file: null,
      json: null,
      dataset: null,
      chart: null,
      preview: false,
      error: '',
      hasError: false,
      parse_header: [],
      parse_csv: [],
      sortOrders: {},
      sortKey: ''
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push({ name: 'index' })
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    csvJSON(csv) {
      const self = this
      const lines = csv.split('\n')
      const result = []
      const headers = lines[0].split(',')
      self.parse_header = lines[0].split(',')
      lines[0].split(',').forEach(function(key) {
        self.sortOrders[key] = 1
      })

      lines.map(function(line, indexLine) {
        if (indexLine < 1) return // Jump header line

        const obj = {}
        const currentline = line.split(',')

        headers.map(function(header, indexHeader) {
          obj[header] = currentline[indexHeader]
        })

        result.push(obj)
      })

      result.pop() // remove the last item because undefined values
      this.json = result
      return result // JavaScript object
    },
    loadCSV() {
      this.hasError = false
      if (this.file) {
        const self = this
        if (window.FileReader) {
          const reader = new FileReader()
          reader.readAsText(this.file)
          // Handle errors load
          reader.onload = function(event) {
            const csv = event.target.result
            self.parse_csv = self.csvJSON(csv)
          }
          reader.onerror = function(evt) {
            if (evt.target.error.name === 'NotReadableError') {
              alert('Cannot read file !')
            }
          }
        } else {
          alert('FileReader are not supported in this browser.')
        }
      } else {
        this.parse_csv = []
        this.json = null
        this.preview = false
      }
    },
    async saveDataset() {
      await this.$axios
        .post('/datasets/save', {
          name: this.file.name,
          data: this.json,
          id_user: this.user.id
        })
        .then((res) => {
          this.dataset = res.data
          this.$router.push({
            name: 'graphs',
            params: { idset: res.data.id }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.hasError = true
          this.error = error.response.data.error
        })
    },
    generateSampleGraph() {
      this.$router.push({
        name: 'graphs',
        params: { idset: 1 }
      })
    }
  }
}
</script>
<style scoped>
.help {
  font-size: smaller;
  color: lightgray;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 100px;
  overflow-y: scroll;
}
td,
th {
  border: 1px solid white;
  text-align: left;
  padding: 8px;
  font-size: smaller;
}

tr:nth-child(even) {
  background-color: #1565c0;
  color: whitesmoke;
}

.apierror {
  color: lightcoral;
  text-align: center;
}
</style>
