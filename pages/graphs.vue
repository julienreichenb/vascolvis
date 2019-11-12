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
          <v-layout align-center justify-space-around>
            <v-btn v-if="panelClosed" text icon color="white" @click="all()">
              <v-icon>mdi-eye</v-icon><v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn v-else text icon color="red" @click="none()">
              <v-icon>mdi-eye-off</v-icon><v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn
              :disabled="countVariables < 1"
              icon
              x-large
              color="red lighten-1"
              @click="resetVariableSelection"
              ><v-icon>mdi-delete-sweep</v-icon></v-btn
            >
          </v-layout>
          <v-expansion-panels v-model="panel" multiple accordion focusable>
            <draggable
              v-model="variables"
              :group="{ name: 'vars', pull: 'clone', put: false }"
              :sort="false"
              style="width: 100%"
              @start="isMoving = true"
              @end="isMoving = false"
            >
              <v-expansion-panel
                v-for="variable in variables"
                :key="variable.id"
                @click="panelClosed = false"
              >
                <v-expansion-panel-header disable-icon-rotate>
                  <v-icon slot="actions" :color="variable.color">{{
                    variable.icon
                  }}</v-icon>
                  {{ variable.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content class="mt-4">
                  <v-layout justify-space-around align-center>
                    <div :id="'sparkle-' + variable.id"></div>
                  </v-layout>
                  <v-layout
                    v-if="variable.type === 'quantitative'"
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
                  <v-layout
                    v-if="variable.type === 'nominal'"
                    class="small"
                    justify-space-around
                  >
                    <span
                      >MODE :
                      <span v-if="variable.mode">{{
                        variable.mode.value + ' - ' + variable.mode.number
                      }}</span>
                      <span v-else>Non-pertinent</span></span
                    >
                  </v-layout>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </draggable>
          </v-expansion-panels>
        </v-navigation-drawer>
        <v-flex xs12 sm10 elevation-6>
          <draggable
            v-model="droppedVars"
            draggable="false"
            :options="{ group: 'vars' }"
            @change="resolveDraggedVariable"
          >
            <v-card class="mx-auto" :class="isMoving ? 'highlight' : ''">
              <v-card-title
                ><h2>{{ dataset.name }}</h2></v-card-title
              >
              <v-card-text>
                <div class="help">
                  <v-icon color="blue" small>mdi-help-circle-outline</v-icon>
                  {{ $t('graphs.help') }}
                </div>
                <div v-if="countVariables > 2" class="mt-3">
                  <v-icon color="red">mdi-alert-outline</v-icon>
                  {{ $t('graphs.warn') }}
                </div>
                <div v-if="countVariables < 1" class="mt-3">
                  <h3>
                    {{ $t('graphs.tip_1') }}
                    <span class="emphaze">{{ $t('graphs.tip_2') }}</span
                    >{{ $t('graphs.tip_3')
                    }}<span class="emphaze">{{ $t('graphs.tip_4') }}</span
                    >{{ $t('graphs.tip_5') }}
                  </h3>
                  <img
                    class="mt-3"
                    src="../static/demo.gif"
                    alt=""
                    width="100%"
                    style="border: 1px solid white"
                  />
                </div>
              </v-card-text>
              <v-card-title class="pt-1">
                <div
                  v-for="variable in variables"
                  :key="variable.id"
                  class="text-center"
                >
                  <v-chip v-if="variable.isUsed" :color="variable.color">
                    <v-icon left :color="'white'">{{ variable.icon }}</v-icon>
                    {{ variable.name
                    }}<v-icon
                      right
                      :color="'white'"
                      @click="
                        variable.isUsed = false
                        computeBigGraphs()
                      "
                      >mdi-close-circle-outline</v-icon
                    >
                  </v-chip>
                </div></v-card-title
              >
              <v-container fluid>
                <v-row dense>
                  <v-col v-for="graph in graphs" :key="graph.title" :cols="12">
                    <v-card class="grey darken-2">
                      <v-layout justify-space-between>
                        <v-card-title
                          :id="'title-' + graph.title"
                          contenteditable
                          v-text="graph.title"
                        ></v-card-title>
                        <v-btn
                          style="margin: 1em 1em 0 0"
                          color="green"
                          large
                          depressed
                          @click="saveGraph(graph)"
                        >
                          <v-icon>mdi-content-save</v-icon>
                          {{ $t('graphs.save') }}
                        </v-btn>
                      </v-layout>
                      <v-card-text>
                        <v-layout
                          flex
                          align-center
                          justify-space-around
                          class="graph-wrapper"
                        >
                          <div
                            :id="'vis-' + graph.title"
                            class="resize-graph"
                          ></div>
                        </v-layout>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
import draggable from 'vuedraggable'
import axios from '~/plugins/axios'
export default {
  components: {
    draggable
  },
  data() {
    return {
      dataset: null,
      json: null,
      variables: [],
      droppedVars: [],
      graphs: [],
      isMoving: false,
      draggedId: null,
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
      // PANEL MANAGEMENT
      panel: [],
      panelClosed: false
    }
  },
  computed: {
    countVariables() {
      let count = 0
      for (let i = 0; i < this.variables.length; i++) {
        if (this.variables[i].isUsed) {
          count++
        }
      }
      return count
    }
  },
  watch: {
    graphs(newValue) {
      if (newValue.length > 0) {
        this.renderGraphs()
      }
    }
  },
  asyncData({ params }) {
    return axios.get(`/datasets/single/?id=${params.idset}`).then((res) => {
      return { dataset: res.data, json: JSON.parse(res.data.data) }
    })
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push(this.localePath({ name: 'index' }))
    }
    this.init()
    this.all()
    this.renderSparklines()
  },
  mounted() {
    this.none()
  },
  methods: {
    // INIT
    init() {
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
    },
    // VARIABLES COMPUTATION
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
      this.variables[i].isUsed = false
      switch (type) {
        case 'quantitative':
          this.variables[i].color = '#e41a1c'
          this.variables[i].icon = 'mdi-numeric'
          this.variables[i].max = this.getMaxValue(this.variables[i])
          this.variables[i].min = this.getMinValue(this.variables[i])
          this.variables[i].mean = this.getMeanValue(this.variables[i])
          break
        case 'nominal':
          this.variables[i].color = '#377eb8'
          this.variables[i].icon = 'mdi-alphabetical'
          this.variables[i].mode = this.getMode(this.variables[i])
          break
        default:
          this.variables[i].color = '#4daf4a'
          this.variables[i].icon = 'mdi-timer'
          break
      }
      this.computeSparkles()
    },
    resolveDraggedVariable() {
      const id = this.droppedVars[0].id
      this.variables[id].isUsed = true
      this.droppedVars = []
      this.computeBigGraphs()
    },
    // GRAPH GENERATION
    renderGraphs() {
      this.$nextTick(() => {
        for (let i = 0; i < this.graphs.length; i++) {
          window.vegaEmbed('#vis-' + this.graphs[i].title, this.graphs[i].data)
        }
      })
    },
    renderSparklines() {
      this.$nextTick(() => {
        for (let i = 0; i < this.variables.length; i++) {
          window.vegaEmbed(
            '#sparkle-' + this.variables[i].id,
            this.variables[i].data,
            { actions: false }
          )
        }
      })
    },
    computeBigGraphs() {
      const variables = this.fetchUsedVariables()
      this.fillGraphsArray(variables)
    },
    computeSparkles() {
      for (let i = 0; i < this.variables.length; i++) {
        this.computeSparkle(i)
      }
    },
    computeSparkle(id) {
      const encoding = this.getSparkleEncoding(id)
      if (encoding !== null) {
        const data = this.getSparkleData(id)
        const graph = {
          $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
          data: {
            values: data
          },
          width: 60,
          height: 60,
          config: {
            axis: { labels: 0, grid: 0, ticks: 0, title: 0, domain: 0 },
            view: {
              stroke: 'transparent'
            },
            background: 'transparent'
          },
          mark: {
            type: 'bar'
          },
          encoding
        }
        this.variables[id].data = graph
      }
    },
    resetVariableSelection() {
      this.graphs = []
      for (let i = 0; i < this.variables.length; i++) {
        this.variables[i].isUsed = false
      }
    },
    // UTILS
    fillGraphsArray(variables) {
      // Reset graphs
      this.graphs = []
      const length = variables.length
      if (length > 0) {
        this.getGraphs(variables)
      }
    },
    getGraphs(variables) {
      const length = variables.length
      // ONLY ONE VARIABLE SELECTED
      if (length === 1) {
        const onlyVar = variables[0]
        if (onlyVar.type === 'quantitative' || onlyVar.type === 'temporal') {
          const soloGraph = {}
          soloGraph.title = onlyVar.name
          soloGraph.data = this.getSoloGraph(onlyVar)
          this.graphs.push(soloGraph)
        }
        const combinationVariables = this.getCombinations(onlyVar)
        for (let i = 0; i < combinationVariables.length; i++) {
          const tempGraph = {}
          tempGraph.title = this.getSingleTitle(
            onlyVar,
            combinationVariables[i]
          )
          tempGraph.data = this.getSingleGraph(onlyVar, combinationVariables[i])
          this.graphs.push(tempGraph)
        }
        // TWO VARIABLES SELECTED
      } else if (length === 2) {
        const duoGraph = {}
        duoGraph.title = this.getSingleTitle(variables[0], variables[1])
        duoGraph.data = this.getSingleGraph(variables[0], variables[1])
        this.graphs.push(duoGraph)
        const combinationVariables = this.getCombinations(variables)
        for (let i = 0; i < combinationVariables.length; i++) {
          if (combinationVariables[i].type === 'quantitative') {
            const tempGraph = {}
            tempGraph.title = this.getMultipleTitle(
              variables,
              combinationVariables[i]
            )
            tempGraph.data = this.getMultipleGraph(
              variables,
              combinationVariables[i]
            )
            this.graphs.push(tempGraph)
          }
        }
        // MORE THAN TWO VARIABLES SELECTED
      } else {
      }
    },
    getCombinations() {
      const unusedVariables = []
      for (let i = 0; i < this.variables.length; i++) {
        if (!this.variables[i].isUsed) {
          unusedVariables.push(this.variables[i])
        }
      }
      return unusedVariables
    },
    getSparkleData(id) {
      const data = []
      for (let i = 0; i < this.json.length; i++) {
        const entry = {}
        entry[this.variables[id].name] = this.json[i][this.variables[id].name]
        data.push(entry)
      }
      return data
    },
    getSparkleEncoding(id) {
      const type = this.variables[id].type
      if (type === 'quantitative') {
        return {
          x: {
            field: this.variables[id].name,
            type: this.variables[id].type
          },
          y: {
            aggregate: 'count',
            type: 'quantitative'
          },
          color: { value: this.variables[id].color }
        }
      } else if (type === 'temporal') {
        return {
          x: {
            timeUnit: 'year',
            field: this.variables[id].name,
            type: this.variables[id].type
          },
          y: {
            aggregate: 'count',
            type: 'quantitative'
          },
          color: { value: this.variables[id].color }
        }
      } else {
        return null
      }
    },
    getSingleTitle(selectedVar, combinationVar) {
      return (
        this.cleanTitle(selectedVar.name) +
        '-' +
        this.cleanTitle(combinationVar.name)
      )
    },
    getMultipleTitle(selectedVars, combinationVar) {
      let title = this.cleanTitle(selectedVars[0].name)
      for (let i = 1; i < selectedVars.length; i++) {
        title = title + '-' + this.cleanTitle(selectedVars[i].name)
      }
      title = title + '-' + this.cleanTitle(combinationVar.name)
      return title
    },
    getSingleData(selectedVar, combinationVar) {
      const data = []
      for (let i = 0; i < this.json.length; i++) {
        const entry = {}
        entry[selectedVar.name] = this.json[i][selectedVar.name]
        entry[combinationVar.name] = this.json[i][combinationVar.name]
        data.push(entry)
      }
      return data
    },
    getMultipleData(selectedVars, combinationVar) {
      const data = []
      for (let i = 0; i < this.json.length; i++) {
        const entry = {}
        entry[selectedVars[0].name] = this.json[i][selectedVars[0].name]
        entry[selectedVars[1].name] = this.json[i][selectedVars[1].name]
        entry[combinationVar.name] = this.json[i][combinationVar.name]
        data.push(entry)
      }
      return data
    },
    getSoloGraph(selectedVar) {
      const data = this.getSparkleData(selectedVar.id)
      const encoding = this.getSparkleEncoding(selectedVar.id)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: data
        },
        width: 'container',
        mark: {
          type: 'bar',
          tooltip: true
        },
        encoding
      }
      return graph
    },
    getSingleGraph(selectedVar, combinationVar) {
      const data = this.getSingleData(selectedVar, combinationVar)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        data: {
          values: data
        },
        width: 'container',
        layer: [
          {
            mark: { type: 'point', tooltip: true },
            encoding: {
              x: { field: selectedVar.name, type: selectedVar.type },
              y: { field: combinationVar.name, type: combinationVar.type }
            }
          },
          {
            mark: { type: 'rule', tooltip: true },
            encoding: {
              y: {
                field: combinationVar.name,
                type: combinationVar.type,
                aggregate: 'mean'
              },
              color: { value: combinationVar.color }
            }
          }
        ]
      }
      return graph
    },
    getMultipleGraph(selectedVars, combinationVar) {
      const data = this.getMultipleData(selectedVars, combinationVar)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        data: {
          values: data
        },
        width: 'container',
        mark: { type: 'point', tooltip: true },
        encoding: {
          x: { field: selectedVars[0].name, type: selectedVars[0].type },
          y: { field: selectedVars[1].name, type: selectedVars[1].type },
          size: { field: combinationVar.name, type: combinationVar.type }
        }
      }
      return graph
    },
    async saveGraph(graph) {
      await axios
        .post('/charts/save', {
          name: document.getElementById('title-' + graph.title).innerHTML,
          data: graph.data,
          id_dataset: this.dataset.id,
          id_user: this.user.id
        })
        .then((res) => {
          // Trick to wait the new chart creation, otherwise the 'graph/url' cannot fetch it (null object)
          this.getNewChart(res.data.id)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.hasError = true
          this.error = error.response.data.error
        })
    },
    async getNewChart(id) {
      await axios.get(`/charts/id?id=${id}`).then((res) => {
        this.$router.push(
          this.localePath({
            name: 'graph-url',
            params: { url: res.data.url }
          })
        )
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
    getMode(variable) {
      const values = []
      const counters = []
      values[0] = this.json[0][variable.name]
      counters[0] = 1
      for (let i = 1; i < this.json.length; i++) {
        const value = this.json[i][variable.name]
        let isInArray = false
        for (let j = 0; j < values.length; j++) {
          if (value === values[j]) {
            counters[j]++
            isInArray = true
          }
        }
        if (!isInArray) {
          values.push(value)
          counters.push(1)
        }
      }
      const mode = {
        value: values[0],
        number: counters[0]
      }
      for (let k = 0; k < values.length; k++) {
        if (values[k] > mode.value) {
          mode.value = values[k]
          mode.number = counters[k]
        }
      }
      return mode
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
    },
    // Panel controls
    all() {
      this.panelClosed = false
      this.panel = [...Array(this.variables.length).keys()].map((k, i) => i)
    },
    none() {
      this.panelClosed = true
      this.panel = []
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

.help {
  font-size: smaller;
  color: lightgray;
}

.emphaze {
  font-weight: bold;
  color: dodgerblue;
}

.highlight {
  border: 3px dashed dodgerblue;
}

.ghost {
  opacity: 0;
}

.graph-wrapper {
  width: 100%;
  height: 350px;
  overflow: auto;
}

.resize-graph {
  width: 100%;
}

.v-chip {
  margin: 4px;
  float: left;
}
</style>
