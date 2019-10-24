<template>
  <div v-if="dataset">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-space-around>
        <v-navigation-drawer
          class="grey darken-2"
          absolute
          dense
          permanent
          floating
          stateless
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
                    <v-switch
                      v-model="variable.isUsed"
                      flat
                      :label="'Utiliser'"
                      :color="variableType.color + ' lighten-2'"
                    ></v-switch>
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
                    <div v-if="variable" :id="'smallvis-' + variable.id"></div>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
        <v-flex xs12 sm10 elevation-6>
          <div id="vis"></div>
          <v-card class="mx-auto" outlined>
            <v-card-title
              ><h2>{{ dataset.name }}</h2></v-card-title
            >
            <v-card-subtitle class="pt-1"
              ><h3>Graphiques générés</h3></v-card-subtitle
            >
            <v-container fluid>
              <v-row dense>
                <v-col v-for="graph in graphs" :key="graph.title" :cols="12">
                  <v-card>
                    <v-card-title v-text="graph.title"></v-card-title>
                    <div :id="'vis-' + graph.id"></div>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="saveGraph(graph)">
                        <v-icon>mdi-content-save</v-icon>
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
      testgraph: {
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
        mark: 'bar',
        encoding: {
          x: { field: 'a', type: 'ordinal' },
          y: { field: 'b', type: 'quantitative' }
        }
      },
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
      graphs: []
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
  mounted() {
    this.sampleGraph()
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
            const variable = { id: i, name: names[i], isUsed: false }
            this.variables.push(variable)
          }
          this.attributeVariablesTypes()
          this.computeGraphs()
        })
    },
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
    sampleGraph() {
      const graph = {
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
        mark: 'bar',
        encoding: {
          x: { field: 'a', type: 'ordinal' },
          y: { field: 'b', type: 'quantitative' }
        }
      }
      console.log(graph)
      window.vegaEmbed('#vis', graph)
    },
    computeGraphs() {
      // this.computeSmallGraphs()
      // Default (no variable selected)
      // Custom (variable-dependant)
    },
    /*
    computeSmallGraphs() {
      for (const variable in this.variables) {
        this.computeSingleSmallGraph(variable)
      }
    },
    computeSingleSmallGraph(variable) {
      const variableData = [
        { a: 'C', b: 2 },
        { a: 'C', b: 7 },
        { a: 'C', b: 4 },
        { a: 'D', b: 1 },
        { a: 'D', b: 2 },
        { a: 'D', b: 6 },
        { a: 'E', b: 8 },
        { a: 'E', b: 4 },
        { a: 'E', b: 7 }
      ]
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        data: variableData,
        width: 50,
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
      const opt = { actions: false }
      vegaEmbed('#smallvis-' + variable.id, graph, opt)
    },
    */
    getSmallEncoding(variable) {
      if (variable.type === 'quantitative') {
        return {
          bin: true,
          x: { field: variable.name, type: variable.type },
          y: { aggregate: 'count', type: 'quantitative' }
        }
      } else {
        return {
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
    },
    saveGraph(graph) {
      // Save the selected graph
      // Redirect to Annotation page
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
</style>
