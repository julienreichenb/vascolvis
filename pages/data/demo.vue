<template>
  <div v-if="dataset" v-show="show">
    <DrawerButton :drawer="drawer.variables" @open="drawer.variables = true" />
    <v-container fluid fill-height>
      <v-layout flex align-center justify-space-around>
        <v-navigation-drawer
          v-model="drawer.variables"
          hide-overlay
          absolute
          dense
          color="grey darken-2"
        >
          <DrawerHideButton
            :drawer="drawer.variables"
            @close="drawer.variables = false"
          />
          <VariablesButtons
            :panel="panelClosed"
            :total-variable="countVariables"
            @all="all()"
            @none="none()"
            @resetvariables="resetVariableSelection"
          />
          <v-expansion-panels v-model="panel" multiple accordion focusable>
            <draggable
              v-model="variables"
              :group="{ name: 'vars', pull: 'clone', put: false }"
              :sort="false"
              @start="isMoving = true"
              @end="isMoving = false"
              style="width: 100%"
            >
              <v-expansion-panel
                v-for="variable in variables"
                :key="variable.id"
                @click="panelClosed = false"
              >
                <VariableDetails
                  :variable="variable"
                  @change-type="attributeSingleVariableType"
                  @change-time="changeTimeUnit"
                  @swap-timeformat="changeTimeFormat"
                />
              </v-expansion-panel>
            </draggable>
          </v-expansion-panels>
        </v-navigation-drawer>
        <v-flex lg12 xl10 elevation-6>
          <draggable
            v-model="droppedVars"
            :options="{ group: 'vars' }"
            @change="resolveDraggedVariable"
            draggable="false"
          >
            <v-card :class="isMoving ? 'highlight' : ''" class="mx-auto">
              <v-toolbar color="indigo darken-3">
                <template v-slot:extension>
                  <v-tabs
                    slot="extension"
                    v-model="currentTab"
                    slider-color="white"
                    color="white"
                    background-color="blue darken-3"
                  >
                    <v-tab
                      @click="loadWs(item.id)"
                      v-for="item in workspaces"
                      :key="item.id"
                    >
                      {{ item.name }}
                      <v-icon
                        @click="toggleDeleteDialog(item)"
                        color="red lighten-1"
                        right
                        >mdi-delete-circle-outline</v-icon
                      >
                    </v-tab>
                    <v-tab
                      v-if="countVariables > 0"
                      @click="createWsDialog = true"
                    >
                      <v-icon color="green lighten-2"
                        >mdi-bookmark-plus-outline</v-icon
                      >
                    </v-tab>
                    <v-tab
                      v-if="countVariables > 0"
                      @click="resetVariableSelection"
                    >
                      <v-icon color="white">mdi-broom</v-icon>
                    </v-tab>
                  </v-tabs>
                </template>
                <v-layout justify-space-between>
                  <h1 v-text="dataset.name" class="white--text" />
                  <GraphHelpDialog
                    :dialog="dialog"
                    :colors="variableColors"
                    @close="dialog = false"
                  />
                </v-layout>
              </v-toolbar>
              <v-card-text style="padding-top: 0;">
                <GraphTips v-if="countVariables < 1" />
              </v-card-text>
              <v-card-title class="pt-1 pb-0">
                <div
                  v-for="variable in variables"
                  :key="variable.id"
                  class="text-center"
                >
                  <VariableChips
                    :variable="variable"
                    @compute="
                      computeBigGraphs()
                      resetActiveTab()
                    "
                  />
                </div>
              </v-card-title>
              <v-card-text v-if="graphs.length < 1 && countVariables > 1">
                <div>
                  <v-icon color="red">mdi-alert-outline</v-icon>
                  {{ $t('graphs.warn') }}
                </div>
              </v-card-text>
              <v-container fluid>
                <div>
                  <hr />
                  <div v-if="graphs.length > 0" class="help mb-2 mt-4">
                    <v-icon color="yellow"
                      >mdi-checkbox-marked-circle-outline</v-icon
                    >
                    {{ $t('graphs.help') }}
                  </div>
                  <v-col v-for="graph in graphs" :key="graph.id" :cols="12">
                    <GeneratedGraph
                      :graph="graph"
                      @save="saveGraph"
                      @swap="swapAxis"
                      @colorshape="swapColorAndShape"
                    />
                  </v-col>
                </div>
              </v-container>
            </v-card>
          </draggable>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import VariablesButtons from '~/components/data/VariablesButtons'
import VariableDetails from '~/components/data/VariableDetails'
import VariableChips from '~/components/data/VariableChips'
import DrawerButton from '~/components/data/DrawerButton'
import DrawerHideButton from '~/components/data/DrawerHideButton'
import GraphHelpDialog from '~/components/data/GraphHelpDialog'
import GraphTips from '~/components/data/GraphTips'
import GeneratedGraph from '~/components/data/GeneratedGraph'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: this.dataset.name,
      meta: [
        {
          hid: 'graphs'
        }
      ]
    }
  },
  components: {
    draggable,
    VariablesButtons,
    VariableDetails,
    VariableChips,
    DrawerButton,
    DrawerHideButton,
    GraphHelpDialog,
    GraphTips,
    GeneratedGraph
  },
  data() {
    return {
      show: false,
      drawer: {
        variables: true,
        workspaces: false
      },
      dialog: false,
      createWsDialog: false,
      deleteWsDialog: false,
      dataset: null,
      json: null,
      variables: [],
      workspaces: [],
      selectedWs: null,
      currentTab: 0,
      droppedVars: [],
      graphs: [],
      isMoving: false,
      draggedId: null,
      variableColors: ['#e41a1c', '#377eb8', '#4daf4a'],
      /* From Tableau 20 */
      colors: [
        '#4E79A7',
        '#E15759',
        '#F28E2B',
        '#499894',
        '#FABFD2',
        '#79706E',
        '#A0CBE8',
        '#B6992D',
        '#FF9D9A',
        '#D37295',
        '#FFBE7D',
        '#BAB0AC',
        '#9D7660',
        '#86BCB6',
        '#F1CE63',
        '#D7B5A6'
      ],
      /* DATE FILTER */
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
      /* PANEL MANAGEMENT */
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
  asyncData({ params, error }) {
    return axios
      .get(`/datasets/single/?id=1`)
      .then((res) => {
        return { dataset: res.data, json: JSON.parse(res.data.data) }
      })
      .catch((e) => {
        error({ statusCode: 402, title: 'no_data', message: 'not_found' })
      })
  },
  created() {
    this.init()
    this.all()
    this.renderSparklines()
  },
  mounted() {
    this.show = true
    this.none()
  },
  methods: {
    /* INIT */
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
    /* VARIABLES */
    attributeVariablesTypes() {
      for (let i = 0; i < this.variables.length; i++) {
        this.attributeSingleVariableType(i, null)
      }
    },
    attributeSingleVariableType(id, selected) {
      if (selected === null) {
        const variableToCheck = this.json[0][this.variables[id].name]
        if (!isNaN(variableToCheck)) {
          // The value is a number
          this.setDimension(id, 'quantitative')
        } else if (this.isDate(id)) {
          this.setDimension(id, 'temporal')
        } else {
          this.setDimension(id, 'nominal')
        }
      } else {
        this.setDimension(id, selected)
        this.computeSparkline(id)
        this.renderSingleSparkline(id)
        this.$forceUpdate()
        this.computeBigGraphs()
      }
    },
    changeTimeUnit(id) {
      this.variables[id].isUsed = false
      this.variables[id].warn = false
      this.computeSparkline(id)
      this.renderSingleSparkline(id)
      this.computeBigGraphs()
      this.$forceUpdate()
    },
    changeTimeFormat(id) {
      this.variables[id].isUsed = false
      const key = Object.keys(this.variables[id].data.data.values[0])[0]
      for (let i = 0; i < this.variables[id].data.data.values.length; i++) {
        const value = Object.values(this.variables[id].data.data.values[i])[0]
        const separator = this.getSeparator(value)
        if (separator) {
          const first = value
            .substring(0, value.indexOf(separator))
            .replace(separator, '')
          const second = value.substring(first.length, 5).replace(separator, '')
          const rest = value
            .substring(first.length + second.length + 2, value.length)
            .replace(separator, '')
          this.json[i][key] = second + separator + first + separator + rest
        }
      }
      this.computeSparkline(id)
      this.renderSingleSparkline(id)
      this.computeBigGraphs()
      this.$forceUpdate()
    },
    setDimension(i, type) {
      // Set dimension for each variable
      this.variables[i].type = type
      this.variables[i].isUsed = false
      this.variables[i].warn = false
      switch (type) {
        case 'quantitative':
          this.variables[i].color = this.variableColors[0]
          this.variables[i].icon = 'mdi-numeric'
          this.variables[i].max = this.getMaxValue(this.variables[i])
          this.variables[i].min = this.getMinValue(this.variables[i])
          this.variables[i].mean = this.getMeanValue(this.variables[i])
          break
        case 'nominal':
          this.variables[i].color = this.variableColors[1]
          this.variables[i].icon = 'mdi-alphabetical'
          this.variables[i].mode = this.getMode(this.variables[i])
          break
        default:
          this.variables[i].color = this.variableColors[2]
          this.variables[i].icon = 'mdi-timer'
          this.variables[i].warn = !this.isDate(i)
          this.variables[i].timeUnit = 'year'
          break
      }
      this.computeSparklines()
    },
    resolveDraggedVariable() {
      const id = this.droppedVars[0].id
      this.variables[id].isUsed = true
      this.droppedVars = []
      this.resetActiveTab()
      this.computeBigGraphs()
    },
    resetVariableSelection() {
      this.graphs = []
      for (let i = 0; i < this.variables.length; i++) {
        this.variables[i].isUsed = false
      }
      this.resetActiveTab()
    },
    /* GRAPHS */
    /* Display */
    renderGraphs() {
      this.$nextTick(() => {
        for (let i = 0; i < this.graphs.length; i++) {
          this.renderSingleGraph(i)
        }
      })
    },
    renderSparklines() {
      this.$nextTick(() => {
        for (let i = 0; i < this.variables.length; i++) {
          this.renderSingleSparkline(i)
        }
      })
    },
    renderSingleGraph(i) {
      window.vegaEmbed('#vis-' + this.graphs[i].id, this.graphs[i].data)
    },
    renderSingleSparkline(i) {
      window.vegaEmbed(
        '#sparkline-' + this.variables[i].id,
        this.variables[i].data,
        { actions: false }
      )
    },
    /* The core methods */
    computeBigGraphs() {
      const variables = this.fetchUsedVariables()
      this.fillGraphsArray(variables)
    },
    computeSparklines() {
      for (let i = 0; i < this.variables.length; i++) {
        this.computeSparkline(i)
      }
    },
    computeSparkline(id) {
      this.variables[id].data = []
      const encoding = this.getSparklineEncoding(id)
      if (encoding !== null) {
        const data = this.getSparklineData(id)
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
    getGraphs(variables) {
      variables.sort((a, b) => a.type.localeCompare(b.type))
      const firstGraph = {}
      firstGraph.id = 0
      firstGraph.title = this.getTitle(variables, null)
      firstGraph.data = this.getFirstGraph(variables)
      if (firstGraph.data.encoding) {
        this.graphs.push(firstGraph)
      }
      const combinationVariables = this.getCombinations()
      let id = this.graphs.length > 0 ? 1 : 0
      for (let i = 0; i < combinationVariables.length; i++) {
        const tempGraph = {}
        tempGraph.id = id
        tempGraph.title = this.getTitle(variables, combinationVariables[i])
        tempGraph.data = this.getGraph(variables, combinationVariables[i])
        if (tempGraph.data.encoding) {
          id++
          this.graphs.push(tempGraph)
        }
      }
    },
    /* Graph computation helpers */
    fillGraphsArray(variables) {
      // Reset graphs
      this.graphs = []
      if (variables.length > 0) {
        this.getGraphs(variables)
      }
    },
    getCombinations() {
      const unusedVariables = []
      for (let i = 0; i < this.variables.length; i++) {
        if (
          !this.variables[i].isUsed &&
          this.variables[i].type === 'quantitative'
        ) {
          unusedVariables.push(this.variables[i])
        }
      }
      return unusedVariables
    },
    swapAxis(id) {
      const data = this.graphs[id].data
      let tempX = {}
      if (data.layer) {
        tempX = data.layer[0].encoding.x
        data.layer[0].encoding.x = data.layer[0].encoding.y
        data.layer[0].encoding.y = tempX
      } else {
        tempX = data.encoding.x
        data.encoding.x = data.encoding.y
        data.encoding.y = tempX
      }
      this.graphs[id].data = data
      this.renderSingleGraph(id)
    },
    swapColorAndShape(id) {
      const tempColor = this.graphs[id].data.encoding.color
      delete tempColor.scale
      const tempShape = this.graphs[id].data.encoding.shape

      this.graphs[id].data.encoding.shape = tempColor
      this.graphs[id].data.encoding.color = tempShape
      this.graphs[id].data.encoding.color.scale = { range: this.colors }

      this.renderSingleGraph(id)
    },
    isAnArray(v) {
      if (!v.length) {
        return [v]
      } else {
        return v
      }
    },
    filterVariableTypes(var1, var2) {
      let allVar = []
      var1 = this.isAnArray(var1)
      if (var2) {
        var2 = this.isAnArray(var2)
        allVar = var1.concat(var2).sort((a, b) => a.type.localeCompare(b.type))
      } else {
        allVar = var1
      }
      const quant = allVar.filter((v) => v.type === 'quantitative')
      const nom = allVar.filter((v) => v.type === 'nominal')
      const temp = allVar.filter((v) => v.type === 'temporal')
      return [quant, nom, temp]
    },
    /* Title generator */
    getTitle(variables, combinationVar) {
      const allVar = this.filterVariableTypes(variables, combinationVar)
      const nomVar = allVar[1]
      const nonNomVar = allVar[0].concat(allVar[2])
      let title = ''
      try {
        title = this.cleanTitle(nonNomVar[0].name)
      } catch {
        return this.cleanTitle(nomVar[0].name)
      }
      for (let i = 1; i < nonNomVar.length; i++) {
        title += ', ' + this.cleanTitle(nonNomVar[i].name)
      }
      if (nomVar && nomVar.length > 0) {
        title += ' by ' + this.cleanTitle(nomVar[0].name)
        for (let j = 1; j < nomVar.length; j++) {
          title += ' and ' + this.cleanTitle(nomVar[j].name)
        }
      }
      return title
    },
    /* Data generator */
    getData(selectedVars, combinationVar) {
      if (!selectedVars.length) {
        selectedVars = [selectedVars]
      }
      const data = []
      for (let i = 0; i < this.json.length; i++) {
        const entry = {}
        for (let j = 0; j < selectedVars.length; j++) {
          entry[selectedVars[j].name] = this.json[i][selectedVars[j].name]
        }
        if (combinationVar) {
          entry[combinationVar.name] = this.json[i][combinationVar.name]
        }
        data.push(entry)
      }
      return data
    },
    getFirstEncoding(selectedVars) {
      const encoding = {}
      if (selectedVars.length === 1) {
        switch (selectedVars[0].type) {
          case 'quantitative':
            encoding.x = {
              field: selectedVars[0].name,
              type: selectedVars[0].type,
              bin: true
            }
            encoding.y = {
              aggregate: 'count',
              type: 'quantitative'
            }
            break
          case 'temporal':
            encoding.x = {
              timeUnit: selectedVars[0].timeUnit,
              field: selectedVars[0].name,
              type: selectedVars[0].type
            }
            encoding.y = {
              aggregate: 'count',
              type: 'quantitative'
            }
            break
          case 'nominal':
            encoding.x = {
              field: selectedVars[0].name,
              type: 'ordinal'
            }
            encoding.y = {
              aggregate: 'count',
              type: 'quantitative'
            }
            break
        }
      } else {
        const selectedQuant = this.filterVariableTypes(selectedVars, null)[0]
        const selectedNom = this.filterVariableTypes(selectedVars, null)[1]
        const selectedTemp = this.filterVariableTypes(selectedVars, null)[2]
        if (selectedQuant.length === 1) {
          encoding.x = {
            field: selectedQuant[0].name,
            type: selectedQuant[0].type
          }
          if (selectedNom.length >= 1) {
            encoding.x.bin = true
            encoding.y = {
              aggregate: 'count',
              type: 'quantitative'
            }
            encoding.color = {
              field: selectedNom[0].name,
              type: selectedNom[0].type,
              scale: { range: this.colors }
            }
          }
          if (selectedNom.length === 2) {
            encoding.shape = {
              field: selectedNom[1].name,
              type: selectedNom[1].type
            }
          }
          if (selectedTemp.length === 1) {
            encoding.y = encoding.x
            encoding.x = {
              field: selectedTemp[0].name,
              type: selectedTemp[0].type,
              timeUnit: selectedTemp[0].timeUnit
            }
            if (selectedNom.length >= 1) {
              encoding.color = {
                field: selectedNom[0].name,
                type: selectedNom[0].type,
                scale: { range: this.colors }
              }
            }
            if (selectedNom.length === 2) {
              encoding.shape = {
                field: selectedNom[1].name,
                type: selectedNom[1].type
              }
            }
          }
        } else if (selectedQuant.length > 1) {
          encoding.x = {
            field: selectedQuant[0].name,
            type: selectedQuant[0].type
          }
          encoding.y = {
            field: selectedQuant[1].name,
            type: selectedQuant[1].type
          }
          if (selectedQuant.length === 3) {
            encoding.size = {
              field: selectedQuant[2].name,
              type: selectedQuant[2].type
            }
          }
          if (selectedNom.length >= 1) {
            encoding.color = {
              field: selectedNom[0].name,
              type: selectedNom[0].type,
              scale: { range: this.colors }
            }
          }
          if (selectedNom.length === 2) {
            encoding.shape = {
              field: selectedNom[1].name,
              type: selectedNom[1].type
            }
          }
          if (selectedTemp.length === 1) {
            encoding.y = encoding.x
            encoding.x = {
              field: selectedTemp[0].name,
              type: selectedTemp[0].type,
              timeUnit: selectedTemp[0].timeUnit
            }
            this.variables[selectedQuant[1].id].isUsed = false
          }
        } else if (selectedTemp.length > 0 && selectedQuant.length < 1) {
          encoding.x = {
            field: selectedTemp[0].name,
            type: selectedTemp[0].type,
            timeUnit: selectedTemp[0].timeUnit
          }
          encoding.y = {
            aggregate: 'count',
            type: 'quantitative'
          }
          encoding.color = {
            field: selectedNom[0].name,
            type: selectedNom[0].type,
            scale: { range: this.colors }
          }
          if (selectedNom.length === 2) {
            encoding.shape = {
              field: selectedNom[1].name,
              type: selectedNom[1].type
            }
          }
        } else {
          return null
        }
      }
      return encoding
    },
    getEncoding(selectedVars, combinationVar) {
      const encoding = {}
      const selectedQuant = this.filterVariableTypes(selectedVars, null)[0]
      const selectedNom = this.filterVariableTypes(selectedVars, null)[1]
      const selectedTemp = this.filterVariableTypes(selectedVars, null)[2]
      if (selectedQuant.length > 0) {
        switch (selectedQuant.length) {
          case 0:
            encoding.x = {
              field: combinationVar.name,
              type: combinationVar.type
            }
            break
          case 1:
            encoding.x = {
              field: selectedQuant[0].name,
              type: selectedQuant[0].type
            }
            encoding.y = {
              field: combinationVar.name,
              type: combinationVar.type
            }
            break
          case 2:
            encoding.x = {
              field: selectedQuant[0].name,
              type: selectedQuant[0].type
            }
            encoding.y = {
              field: selectedQuant[1].name,
              type: selectedQuant[1].type
            }
            if (combinationVar) {
              encoding.size = {
                field: combinationVar.name,
                type: combinationVar.type
              }
            }
            break
          default:
            return null
        }
        if (selectedNom) {
          switch (selectedNom.length) {
            case 1:
              encoding.color = {
                field: selectedNom[0].name,
                type: selectedNom[0].type,
                scale: { range: this.colors }
              }
              break
            case 2:
              encoding.color = {
                field: selectedNom[0].name,
                type: selectedNom[0].type,
                scale: { range: this.colors }
              }
              encoding.shape = {
                field: selectedNom[1].name,
                type: selectedNom[1].type
              }
              break
            default:
              break
          }
        }
        if (selectedTemp.length) {
          encoding.x = {
            field: selectedTemp[0].name,
            type: selectedTemp[0].type,
            timeUnit: selectedTemp[0].timeUnit
          }
          if (selectedQuant[0] !== undefined || selectedQuant[0]) {
            encoding.y = {
              field: selectedQuant[0].name,
              type: selectedQuant[0].type
            }
            if (combinationVar) {
              encoding.size = {
                field: combinationVar.name,
                type: combinationVar.type
              }
            }
            if (selectedQuant[1] !== undefined) {
              this.variables[selectedQuant[1].id].isUsed = false
              this.computeBigGraphs()
            }
          }
        }
      } else {
        return null
      }
      return encoding
    },
    getSparklineData(id) {
      const data = []
      for (let i = 0; i < this.json.length; i++) {
        const entry = {}
        entry[this.variables[id].name] = this.json[i][this.variables[id].name]
        data.push(entry)
      }
      return data
    },
    getSparklineEncoding(id) {
      const type = this.variables[id].type
      if (type === 'quantitative') {
        return {
          x: {
            field: this.variables[id].name,
            type
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
            timeUnit: this.variables[id].timeUnit,
            field: this.variables[id].name,
            type
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
    /* Graph generator */
    getFirstGraph(selectedVar) {
      const data = this.getData(selectedVar)
      const encoding = this.getFirstEncoding(selectedVar)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: data
        },
        width: 'container',
        mark: {
          type: this.getGraphMark(selectedVar, null),
          tooltip: true
        },
        encoding
      }
      return graph
    },
    getGraph(variables, combinationVar) {
      const data = this.getData(variables, combinationVar)
      const encoding = this.getEncoding(variables, combinationVar)
      const graphMark = this.getGraphMark(variables, combinationVar)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        data: {
          values: data
        },
        width: 'container',
        mark: {
          type: graphMark,
          tooltip: true
        },
        encoding
      }
      if (graphMark === 'circle') {
        graph.mark.opacity = 0.6
        graph.mark.stroke = 'black'
        graph.mark.strokeWidth = 1
      }
      return graph
    },
    /* Utils */
    getGraphMark(selected, combination) {
      const nbQuant = this.filterVariableTypes(selected, combination)[0].length
      const nbNom = this.filterVariableTypes(selected, combination)[1].length
      const nbTemp = this.filterVariableTypes(selected, combination)[2].length
      if (nbQuant === 1 && nbNom === 0 && nbTemp === 0) {
        return 'bar'
      }
      if (nbQuant === 1 && nbNom === 1 && nbTemp === 1) {
        return 'bar'
      }
      if (nbQuant === 0 && nbNom === 1 && nbTemp === 0) {
        return 'bar'
      }
      if (nbQuant === 0 && nbNom === 0 && nbTemp > 0) {
        return 'bar'
      }
      if (nbQuant === 1 && nbNom === 0 && nbTemp > 0) {
        return 'bar'
      }
      if (nbQuant === 1 && nbNom >= 1 && nbTemp === 0) {
        return 'bar'
      }
      if (nbQuant === 0 && nbNom >= 1 && nbTemp === 1) {
        return 'bar'
      }
      if (nbQuant === 0 && nbNom > 0 && nbTemp > 0) {
        return 'circle'
      }
      if (nbQuant >= 1 && nbNom === 1 && nbTemp > 0) {
        return 'circle'
      }
      if (nbQuant >= 1 && nbNom === 0 && nbTemp > 0) {
        return 'circle'
      }
      return 'point'
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
      try {
        // Check the value itself
        // If the string contains usual spliters at least 3 times, it might be a date
        const partsDash = variableValue.split('-')
        const partsDot = variableValue.split('.')
        const partsSlash = variableValue.split('/')
        return (
          partsDash.length > 2 || partsDot.length > 2 || partsSlash.length > 2
        )
      } catch (e) {
        // eslint-disable-next-line
        console.log(e)
        return false
      }
    },
    getSeparator(value) {
      return value.includes('.')
        ? '.'
        : value.includes('/')
        ? '/'
        : value.includes('-')
        ? '-'
        : null
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
        if (counters[k] > mode.number) {
          mode.value = values[k]
          mode.number = counters[k]
        }
      }
      const percentage = (mode.number * 100) / this.json.length
      if (percentage < 5 && !isNaN(mode.value)) {
        this.variables[variable.id].warn = true
      }
      return mode
    },
    getMaxValue(variable) {
      const col = []
      for (let i = 0; i < this.json.length; i++) {
        col.push(
          this.json[i][variable.name] !== undefined
            ? Number(this.json[i][variable.name])
            : 0
        )
      }
      const max = Math.max(...col)
      if (isNaN(max)) {
        variable.warn = true
      }
      return max
    },
    getMinValue(variable) {
      const col = []
      for (let i = 0; i < this.json.length; i++) {
        col.push(
          this.json[i][variable.name] !== undefined
            ? Number(this.json[i][variable.name])
            : 0
        )
      }
      const min = Math.min(...col)
      if (isNaN(min)) {
        variable.warn = true
      }
      return min
    },
    getMeanValue(variable) {
      let sum = 0.0
      for (let i = 0; i < this.json.length; i++) {
        sum +=
          this.json[i][variable.name] !== undefined
            ? Number(this.json[i][variable.name])
            : 0
      }
      const mean = sum / this.json.length
      if (isNaN(mean)) {
        variable.warn = true
      }
      return mean
    },
    // Panel controls
    all() {
      this.panelClosed = false
      this.panel = [...Array(this.variables.length).keys()].map((k, i) => i)
    },
    none() {
      this.panelClosed = true
      this.panel = []
    },
    resetActiveTab() {
      this.currentTab = 0
    }
  }
}
</script>

<style scoped>
h2,
h3 {
  color: white;
  margin-bottom: 0.5em;
}

.help {
  color: lightgray;
}

.highlight {
  border: 3px dashed dodgerblue;
}

.ghost {
  opacity: 0;
}

.v-chip {
  margin: 4px;
  float: left;
}
</style>
