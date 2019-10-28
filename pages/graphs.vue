<template>
  <div v-if="dataset">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-space-around>
        <v-navigation-drawer
          class="grey darken-2"
          absolute
          dense
          permanent
          clipped
        >
          <v-list>
            <v-list-group
              v-for="variableType in variablesTypes"
              :key="variableType.name"
              v-model="variableType.active"
              :prepend-icon="variableType.icon"
              :color="variableType.color"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title
                    v-text="variableType.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-expansion-panels multiple accordion>
                <v-expansion-panel
                  v-for="variable in variableType.items"
                  :key="variable.id"
                >
                  <v-expansion-panel-header>
                    {{ variable.name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-layout justify-space-around align-center>
                      <v-checkbox
                        v-model="variable.isUsed"
                        flat
                        :label="'Utiliser'"
                        :color="variableType.color + ' lighten-2'"
                        @change="computeBigGraphs"
                      ></v-checkbox>
                    </v-layout>
                    <v-layout
                      v-if="variableType.name === 'Quantitatif'"
                      class="small"
                      justify-space-around
                    >
                      <span
                        >MAX : <span>{{ variable.max }}</span></span
                      >
                      <span
                        >MIN : <span>{{ variable.min }}</span></span
                      >
                      <span
                        >AVG : <span>{{ variable.mean.toFixed(2) }}</span></span
                      >
                    </v-layout>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
        <v-flex xs12 sm10 elevation-6>
          <v-card class="mx-auto" outlined>
            <v-card-title
              ><h2>{{ dataset.name }}</h2></v-card-title
            >
            <v-card-subtitle class="pt-1"
              ><h3>Graphiques générés</h3></v-card-subtitle
            >
            <v-card-text>
              <div class="help">
                <v-icon color="blue" small>mdi-help-circle-outline</v-icon>
                La sélection d'<strong>une seule</strong> variable générera
                toutes les combinaisons possibles avec les autres.
              </div>
              <div class="help">
                <v-icon color="blue" small>mdi-help-circle-outline</v-icon>
                Vous pouvez cliquer sur le titre des graphiques pour les
                modifier.
              </div>
              <div v-if="graphs.length > 0" class="mt-3">
                <v-btn color="indigo darken-2" @click="displayGraphs"
                  ><v-icon>mdi-eye</v-icon></v-btn
                >
                <v-btn color="red darken-1" @click="resetVariableSelection"
                  ><v-icon>mdi-delete-sweep</v-icon></v-btn
                >
              </div>
              <div v-else class="mt-3">
                Sélectionnez une ou plusieurs variables dans le panel à gauche.
              </div>
            </v-card-text>
            <v-container fluid>
              <v-row dense>
                <v-col v-for="graph in graphs" :key="graph.title" :cols="12">
                  <v-card v-show="display" class="grey darken-2">
                    <v-card-title v-text="graph.title"></v-card-title>
                    <v-layout flex align-center justify-space-around>
                      <div
                        :id="'vis-' + graph.title"
                        class="resize-graph"
                      ></div>
                    </v-layout>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue lighten-2"
                        large
                        @click="saveGraph(graph)"
                      >
                        <v-icon>mdi-content-save</v-icon>
                        Enregistrer
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      dataset: null,
      json: null,
      variables: [],
      variablesTypes: [
        {
          name: 'Quantitatif',
          icon: 'mdi-numeric',
          color: 'red',
          desc: 'fournissent des données comparables sur « qui » et «combien »',
          items: []
        },
        {
          name: 'Qualitatif',
          icon: 'mdi-alphabetical',
          color: 'blue',
          desc: 'représentent des catégories sans classement intrinsèque',
          items: []
        },
        {
          name: 'Temporel',
          icon: 'mdi-timer',
          color: 'yellow',
          desc: 'représentent un temps donné, date ou heure',
          items: []
        }
      ],
      graphs: [],
      display: false,
      // DATE FILTER
      FREQUENT_DATE_LABELS: [
        'year',
        'date',
        'datetime',
        'period',
        'periode',
        'année',
        'années',
        'annee',
        'annees'
      ],
      // TESTING
      testdata: {
        values: [
          { a: 'A', b: 28 },
          { a: 'B', b: 55 },
          { a: 'C', b: 43 },
          { a: 'D', b: 91 },
          { a: 'E', b: 81 },
          { a: 'F', b: 53 },
          { a: 'G', b: 19 },
          { a: 'H', b: 87 },
          { a: 'I', b: 52 }
        ]
      },
      testgraph: {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
        description: 'A simple bar chart with embedded data.',
        data: {
          values: [
            { a: 'A', b: 28 },
            { a: 'B', b: 55 },
            { a: 'C', b: 43 },
            { a: 'D', b: 91 },
            { a: 'E', b: 81 },
            { a: 'F', b: 53 },
            { a: 'G', b: 19 },
            { a: 'H', b: 87 },
            { a: 'I', b: 52 }
          ]
        },
        width: 140,
        height: 60,
        mark: 'bar',
        encoding: {
          x: { field: 'a', type: 'ordinal' },
          y: { field: 'b', type: 'quantitative' }
        }
      }
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push({ name: 'index' })
    }
    this.getDataSet()
  },
  methods: {
    async getDataSet() {
      await this.$axios
        .get('/datasets/single/?id=' + this.$route.params.idset)
        .then((res) => {
          this.dataset = res.data
          this.json = JSON.parse(this.dataset.data)
          const names = Object.keys(this.json[0])
          for (let i = 0; i < names.length; i++) {
            const variable = {
              id: i,
              name: names[i],
              isUsed: false
            }
            this.variables.push(variable)
          }
          this.attributeVariablesTypes()
        })
    },
    // INIT
    attributeVariablesTypes() {
      for (let i = 0; i < this.variables.length; i++) {
        const variableToCheck = this.json[0][this.variables[i].name]
        if (!isNaN(variableToCheck)) {
          // The value is a number
          this.setDimension(i, 'quantitative')
        } else if (this.isDate(i)) {
          this.setDimension(i, 'temporal')
        } else {
          this.setDimension(i, 'nominal')
        }
      }
    },
    setDimension(i, type) {
      // Set dimension for each variable
      this.variables[i].type = type
      switch (type) {
        case 'quantitative':
          this.variables[i].max = this.getMaxValue(this.variables[i])
          this.variables[i].min = this.getMinValue(this.variables[i])
          this.variables[i].mean = this.getMeanValue(this.variables[i])
          this.variablesTypes[0].items.push(this.variables[i])
          break
        case 'nominal':
          this.variablesTypes[1].items.push(this.variables[i])
          break
        default:
          this.variablesTypes[2].items.push(this.variables[i])
          break
      }
    },
    // GRAPH GENERATION
    computeBigGraphs() {
      const variables = this.fetchUsedVariables()
      this.fillGraphsArray(variables)
    },
    displayGraphs() {
      this.display = true
      for (let i = 0; i < this.graphs.length; i++) {
        window.vegaEmbed('#vis-' + this.graphs[i].title, this.graphs[i].data)
      }
    },
    resetVariableSelection() {
      this.graphs = []
      for (let i = 0; i < this.variablesTypes.length; i++) {
        for (let j = 0; j < this.variablesTypes[i].items.length; j++)
          this.variablesTypes[i].items[j].isUsed = false
      }
    },
    // UTILS
    fillGraphsArray(variables) {
      // Reset graphs
      this.graphs = []
      this.display = false
      const length = variables.length
      if (length > 0) {
        this.getGraphs(variables)
      }
    },
    getGraphs(variables) {
      const length = variables.length
      if (length === 1) {
        const onlyVar = variables[0]
        const combinationVariables = this.getCombinations(onlyVar)
        for (let i = 0; i < combinationVariables.length; i++) {
          const tempGraph = {}
          tempGraph.title = this.getTitle(onlyVar, combinationVariables[i])
          tempGraph.data = this.getGraph(onlyVar, combinationVariables[i])
          this.graphs.push(tempGraph)
        }
      } else {
        // TODO : Manage multiple variable selection
      }
    },
    getTitle(selectedVar, combinationVar) {
      return (
        this.cleanTitle(selectedVar.name) +
        '-' +
        this.cleanTitle(combinationVar.name)
      )
    },
    getData(selectedVar, combinationVar) {
      const data = []
      for (let i = 0; i < this.json.length; i++) {
        const entry = {}
        entry[selectedVar.name] = this.json[i][selectedVar.name]
        entry[combinationVar.name] = this.json[i][combinationVar.name]
        data.push(entry)
      }
      return data
    },
    getGraph(selectedVar, combinationVar) {
      const data = this.getData(selectedVar, combinationVar)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        description: 'A simple bar chart with embedded data.',
        data: {
          values: data
        },
        width: {
          step: 20
        },
        mark: 'point',
        encoding: {
          x: { field: selectedVar.name, type: selectedVar.type },
          y: { field: combinationVar.name, type: combinationVar.type }
        }
      }
      return graph
    },
    getCombinations(variable) {
      const unusedVariables = []
      for (let i = 0; i < this.variables.length; i++) {
        if (this.variables[i] !== variable)
          unusedVariables.push(this.variables[i])
      }
      return unusedVariables
    },
    async saveGraph(graph) {
      await this.$axios
        .post('/charts/save', {
          name: graph.title,
          data: graph.data,
          id_dataset: this.dataset.id,
          id_user: this.user.id
        })
        .then((res) => {
          this.chart = res.data
          this.$router.push({
            name: 'analyze',
            params: { idgraph: res.data.id }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.hasError = true
          this.error = error.response.data.error
        })
    },
    fetchUsedVariables() {
      const usedVariables = []
      for (let i = 0; i < this.variables.length; i++) {
        if (this.variables[i].isUsed) usedVariables.push(this.variables[i])
      }
      return usedVariables
    },
    isDate(i) {
      // TODO : Optimize the date detection
      const variableLabel = this.variables[i].name.toLowerCase()
      const variableValue = this.json[0][this.variables[i].name]
      // Check recurrent time labels
      for (const LABEL in this.FREQUENT_DATE_LABELS) {
        if (variableLabel === LABEL) return true
      }
      // Check the value itself
      // If the string contains usual spliters at least 3 times, it might be a date
      const partsDash = variableValue.split('-')
      const partsDot = variableValue.split('.')
      const partsSlash = variableValue.split('/')
      return (
        partsDash.length > 2 || partsDot.length > 2 || partsSlash.length > 2
      )
    },
    cleanTitle(string) {
      string = string.replace('"', '')
      string = string.replace(/\s/g, '')
      return string
    },
    getMaxValue(variable) {
      const col = []
      for (let i = 0; i < this.json.length; i++) {
        col.push(Number(this.json[i][variable.name]))
      }
      return Math.max(...col)
    },
    getMinValue(variable) {
      const col = []
      for (let i = 0; i < this.json.length; i++) {
        col.push(Number(this.json[i][variable.name]))
      }
      return Math.min(...col)
    },
    getMeanValue(variable) {
      let sum = 0.0
      for (let i = 0; i < this.json.length; i++) {
        sum += Number(this.json[i][variable.name])
      }
      return sum / this.json.length
    }
  },
  // NOT USED / TESTING METHODS
  sampleGraph() {
    // eslint-disable-next-line
    window.vegaEmbed('#vis', this.testgraph)
  },
  computeSmallGraphs() {
    for (const v in this.variables) {
      this.computeSingleSmallGraph(v)
    }
  },
  computeSingleSmallGraph(variable) {
    // const data = this.getSmallData(variable)
    const data = this.getSmallData(variable)
    const encoding = this.getSmallEncoding(variable)
    const graph = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      data,
      width: 60,
      height: 50,
      config: {
        axis: { labels: 0, grid: 0, ticks: 0, title: 0, domain: 0 },
        view: {
          stroke: 'transparent'
        }
      },
      mark: {
        type: 'bar'
      },
      encoding
    }
    const opt = { actions: false }
    window.vegaEmbed('#smallvis-' + variable.id, graph, opt)
  },
  getSmallData(variable) {
    const data = []
    for (let i = 0; i < this.json.length; i++) {
      data.push(this.json[i][variable.name])
    }
    return data
  },
  getSmallEncoding(variable) {
    let singleSpec
    if (variable.type === 'quantitative')
      singleSpec = {
        encoding: {
          x: {
            field: variable.name,
            type: variable.type
          },
          y: {
            aggregate: 'count',
            type: 'quantitative'
          }
        }
      }
    else if (variable.type === 'temporal')
      singleSpec = {
        encoding: {
          x: {
            timeUnit: 'year',
            field: variable.name,
            type: variable.type
          },
          y: {
            aggregate: 'count',
            type: 'quantitative'
          }
        }
      }
    return singleSpec
  }
}
</script>

<style scoped>
.small {
  font-size: smaller;
  color: lightgray;
}
.small > span {
  color: dodgerblue;
}

.small > span > span {
  color: white;
}

.help {
  font-size: smaller;
  color: lightgray;
}

.resize-graph {
  overflow: auto;
  height: 300px;
  text-align: center;
}
</style>
