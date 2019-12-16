<template>
  <div v-if="dataset" v-show="show">
    <v-container fluid fill-height>
      <v-layout flex align-center justify-space-around>
        <v-navigation-drawer
          v-model="drawer.variables"
          hide-overlay
          absolute
          dense
          color="grey darken-2"
        >
          <div class="blue">
            <v-btn
              @click="drawer.variables = !drawer.variables"
              width="100%"
              text
            >
              {{ $t('graphs.hide') }}
            </v-btn>
          </div>
          <v-layout align-center justify-space-around>
            <v-btn v-if="panelClosed" @click="all()" text icon color="white">
              <v-icon>mdi-eye</v-icon><v-icon>mdi-arrow-down</v-icon>
            </v-btn>
            <v-btn v-else @click="none()" text icon color="red">
              <v-icon>mdi-eye-off</v-icon><v-icon>mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn
              :disabled="countVariables < 1"
              @click="resetVariableSelection"
              icon
              x-large
              color="red lighten-1"
              ><v-icon>mdi-delete-sweep</v-icon></v-btn
            >
          </v-layout>
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
                <v-expansion-panel-header disable-icon-rotate>
                  <v-icon slot="actions" :color="variable.color">{{
                    variable.icon
                  }}</v-icon>
                  {{ variable.name }}
                  <v-icon v-if="variable.warn" color="red lighten-1"
                    >mdi-alert-outline</v-icon
                  >
                </v-expansion-panel-header>
                <v-expansion-panel-content class="mt-4">
                  <v-select
                    v-model="variable.type"
                    :items="types"
                    @change="
                      (selected) =>
                        attributeSingleVariableType(variable.id, selected)
                    "
                    label="Type"
                    item-value="types"
                    dense
                  ></v-select>
                  <v-layout justify-space-around align-center>
                    <div :id="'sparkline-' + variable.id"></div>
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
        <v-navigation-drawer
          v-model="drawer.workspaces"
          absolute
          right
          color="grey darken-2"
        >
          <div class="blue">
            <v-btn
              @click="drawer.workspaces = !drawer.workspaces"
              width="100%"
              text
            >
              {{ $t('graphs.hide') }}
            </v-btn>
          </div>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <strong> {{ $t('graphs.ws') }}</strong></v-list-item-title
              >
              <v-list-item-subtitle
                v-if="workspaces.length === 0"
                class="mt-4"
                >{{ $t('graphs.no_ws') }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-expansion-panels dense multiple accordion focusable>
            <v-expansion-panel v-for="item in workspaces" :key="item.id">
              <v-expansion-panel-header>
                {{ item.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content class="mt-4">
                <div v-for="id in item.variables" :key="id">
                  <v-chip
                    :color="variables[id].color"
                    style="font-size: 0.7em;"
                  >
                    <v-icon color="white" small left>{{
                      variables[id].icon
                    }}</v-icon>
                    {{ variables[id].name }}
                  </v-chip>
                </div>
                <v-btn
                  @click="loadWs(item.id)"
                  class="mt-1"
                  small
                  outlined
                  color="blue lighten-1"
                  >{{ $t('graphs.loadWs') }}</v-btn
                >
                <v-btn
                  @click="deleteWs(item.id)"
                  class="mt-1"
                  small
                  outlined
                  color="red"
                  >{{ $t('graphs.deleteWs') }}</v-btn
                >
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-navigation-drawer>
        <v-flex lg12 xl9 elevation-6>
          <draggable
            v-model="droppedVars"
            :options="{ group: 'vars' }"
            @change="resolveDraggedVariable"
            draggable="false"
          >
            <v-card :class="isMoving ? 'highlight' : ''" class="mx-auto">
              <v-card-title>
                <v-layout justify-space-between>
                  <h2>{{ dataset.name }}</h2>
                  <v-dialog v-model="dialog" width="85%">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        x-large
                        icon
                        color="blue text--white"
                        dark
                      >
                        <v-icon>mdi-help-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title
                        class="headline indigo darken-3 mb-3"
                        primary-title
                      >
                        {{ $t('graphs.info.title') }}
                      </v-card-title>
                      <v-card-text>
                        <h2>{{ $t('graphs.info.typeselection_title') }}</h2>
                        <p>
                          {{ $t('graphs.info.typeselection') }}
                          <v-icon color="red">mdi-alert-outline</v-icon>
                          {{ $t('graphs.info.typeselection2') }}
                        </p>
                        <h2>{{ $t('graphs.info.combination_title') }}</h2>
                        <h3>{{ $t('graphs.info.single_title') }}</h3>
                        <p v-html="this.$t('graphs.info.single')"></p>
                        <h3>
                          <v-icon :color="colors[1]" large>mdi-numeric</v-icon>
                          -
                          {{ $t('graphs.info.quant_title') }}
                        </h3>
                        <p>
                          <span v-html="this.$t('graphs.info.quant')"></span>
                          <v-icon :color="colors[1]">mdi-numeric</v-icon>
                          <span v-html="this.$t('graphs.info.quant2')"></span>
                        </p>
                        <h3>
                          <v-icon :color="colors[0]" large
                            >mdi-alphabetical</v-icon
                          >
                          -
                          {{ $t('graphs.info.nom_title') }}
                        </h3>
                        <p>
                          <span v-html="this.$t('graphs.info.nom')"></span>
                          <v-icon :color="colors[0]">mdi-alphabetical</v-icon>
                          <span v-html="this.$t('graphs.info.nom2')"></span>
                        </p>
                        <h3>
                          <v-icon :color="colors[2]" large>mdi-timer</v-icon>
                          -
                          {{ $t('graphs.info.temp_title') }}
                        </h3>
                        <p>
                          <span v-html="this.$t('graphs.info.temp')"></span>
                          <v-icon :color="colors[2]">mdi-timer</v-icon>
                          <span v-html="this.$t('graphs.info.temp2')"></span>
                        </p>
                        <h2>{{ $t('graphs.info.yourturn') }}</h2>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false" color="green" outlined>
                          {{ $t('graphs.info.understood') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-layout>
              </v-card-title>
              <v-card-subtitle style="padding-bottom: 0">
                <v-layout justify-space-between>
                  <v-btn
                    :disabled="drawer.variables"
                    @click="drawer.variables = !drawer.variables"
                    outlined
                  >
                    <v-icon>mdi-arrow-collapse-right</v-icon> Variables
                  </v-btn>
                  <v-btn
                    :disabled="drawer.workspaces"
                    @click="drawer.workspaces = !drawer.workspaces"
                    icon
                  >
                    <v-icon>mdi-arrow-collapse-left</v-icon>
                  </v-btn>
                </v-layout>
              </v-card-subtitle>
              <v-card-text style="padding-top: 0;">
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
                    src="~/static/demo.gif"
                    alt=""
                    width="100%"
                    style="border: 1px solid white"
                  />
                </div>
              </v-card-text>
              <v-card-title class="pt-1 pb-0">
                <div
                  v-for="variable in variables"
                  :key="variable.id"
                  class="text-center"
                >
                  <v-chip v-if="variable.isUsed" :color="variable.color">
                    <v-icon :color="'white'" left>{{ variable.icon }}</v-icon>
                    {{ variable.name
                    }}<v-icon
                      :color="'white'"
                      @click="
                        variable.isUsed = false
                        computeBigGraphs()
                      "
                      right
                      >mdi-close-circle-outline</v-icon
                    >
                  </v-chip>
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
                  <div v-if="countVariables > 0" class="mb-4">
                    <v-dialog v-model="wsDialog" width="50%">
                      <template v-slot:activator="{ on }">
                        <v-btn v-on="on" small outlined color="green lighten-1">
                          {{ $t('graphs.saveWs') }}
                        </v-btn>
                      </template>
                      <v-card class="grey darken-2">
                        <v-card-title>{{
                          $t('graphs.choose_ws_name')
                        }}</v-card-title>
                        <v-form v-model="validWs">
                          <v-card-text>
                            <v-text-field
                              v-model="newWs"
                              :rules="newWsRules"
                              :placeholder="$t('graphs.new_ws')"
                              autofocus
                              required
                            ></v-text-field>
                          </v-card-text>
                          <v-card-actions>
                            <v-btn
                              v-if="validWs"
                              @click="saveWs"
                              color="green lighten-1"
                              outlined
                              >{{ $t('graphs.save') }}</v-btn
                            >
                            <v-btn
                              @click="wsDialog = false"
                              color="white"
                              outlined
                              >{{ $t('graphs.cancel') }}</v-btn
                            >
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </v-dialog>
                  </div>
                  <hr />
                  <div v-if="graphs.length > 0" class="help mb-2 mt-4">
                    <v-icon color="yellow"
                      >mdi-checkbox-marked-circle-outline</v-icon
                    >
                    {{ $t('graphs.help') }}
                  </div>
                  <v-col v-for="graph in graphs" :key="graph.id" :cols="12">
                    <v-card class="grey darken-2">
                      <v-layout justify-space-between>
                        <v-card-title
                          :id="'title-' + graph.id"
                          v-text="graph.title"
                          contenteditable
                        ></v-card-title>
                        <div>
                          <v-btn
                            @click="swapAxis(graph)"
                            class="mt-4"
                            color="blue lighten-1"
                            outlined
                            depressed
                          >
                            {{ $t('graphs.switch_button') }}
                          </v-btn>
                          <v-btn
                            @click="saveGraph(graph)"
                            class="mt-4 mr-4"
                            color="green"
                            outlined
                            depressed
                          >
                            {{ $t('graphs.save') }}
                          </v-btn>
                        </div>
                      </v-layout>
                      <v-card-text>
                        <v-layout
                          flex
                          align-center
                          justify-space-around
                          class="graph-wrapper"
                        >
                          <div
                            :id="'vis-' + graph.id"
                            class="resize-graph"
                          ></div>
                        </v-layout>
                      </v-card-text>
                    </v-card>
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
import jwtDecode from 'jwt-decode'
import draggable from 'vuedraggable'
import axios from '~/plugins/axios'
export default {
  head() {
    return {
      title: this.$t('title.graphs'),
      meta: [
        {
          hid: 'graphs'
        }
      ]
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      show: false,
      drawer: {
        variables: true,
        workspaces: false
      },
      dialog: false,
      wsDialog: false,
      newWsRules: [(v) => !!v || this.$t('graphs.ws_name_required')],
      validWs: false,
      dataset: null,
      json: null,
      variables: [],
      workspaces: [],
      newWs: '',
      droppedVars: [],
      graphs: [],
      isMoving: false,
      draggedId: null,
      /*
       *  UTILS
       */
      types: ['quantitative', 'nominal', 'temporal'],
      /* From Tableau 10 */
      colors: [
        '#4E79A7',
        '#E15759',
        '#59A14F',
        '#EDC948',
        '#76B7B2',
        '#F28E2B',
        '#B07AA1',
        '#9C755F',
        '#BAB0AC',
        '#FF9DA7'
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
      .get(`/datasets/single/?id=${params.id}`)
      .then((res) => {
        return { dataset: res.data, json: JSON.parse(res.data.data) }
      })
      .catch((e) => {
        error({ statusCode: 402, title: 'no_data', message: 'not_found' })
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
    if (this.dataset.id_user !== this.user.id && this.dataset.id !== 1) {
      this.$router.push(this.localePath({ name: 'index' }))
    } else {
      this.show = true
      this.none()
    }
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
      this.fetchWorkspaces()
    },
    /* VARIABLES */
    attributeVariablesTypes() {
      for (let i = 0; i < this.variables.length; i++) {
        this.attributeSingleVariableType(i, null)
      }
    },
    attributeSingleVariableType(i, type) {
      if (type === null) {
        const variableToCheck = this.json[0][this.variables[i].name]
        if (!isNaN(variableToCheck)) {
          // The value is a number
          this.setDimension(i, 'quantitative')
        } else if (this.isDate(i)) {
          this.setDimension(i, 'temporal')
        } else {
          this.setDimension(i, 'nominal')
        }
      } else {
        this.setDimension(i, type)
        this.computeSparkline(i)
        this.renderSingleSparkline(i)
        this.$forceUpdate()
        this.computeBigGraphs()
      }
    },
    setDimension(i, type) {
      // Set dimension for each variable
      this.variables[i].type = type
      this.variables[i].isUsed = false
      this.variables[i].warn = false
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
          this.variables[i].warn = !this.isDate(i)
          break
      }
      this.computeSparklines()
    },
    resolveDraggedVariable() {
      const id = this.droppedVars[0].id
      this.variables[id].isUsed = true
      this.droppedVars = []
      this.computeBigGraphs()
    },
    resetVariableSelection() {
      this.graphs = []
      for (let i = 0; i < this.variables.length; i++) {
        this.variables[i].isUsed = false
      }
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
      this.graphs.push(firstGraph)
      const combinationVariables = this.getCombinations()
      for (let i = 0; i < combinationVariables.length; i++) {
        const tempGraph = {}
        tempGraph.id = i + 1
        tempGraph.title = this.getTitle(variables, combinationVariables[i])
        tempGraph.data = this.getGraph(variables, combinationVariables[i])
        this.graphs.push(tempGraph)
      }
    },
    /* Graph computation helpers */
    fillGraphsArray(variables) {
      // Reset graphs
      this.graphs = []
      const length = variables.length
      if (length > 0) {
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
    swapAxis(graph) {
      const id = graph.id
      const data = graph.data
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
              type: selectedVars[0].type
            }
            encoding.y = {
              aggregate: 'count',
              type: 'quantitative'
            }
            break
          case 'temporal':
            encoding.x = {
              timeUnit: 'year',
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
              bin: true,
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
        if (selectedQuant) {
          switch (selectedQuant.length) {
            case 0:
              break
            case 1:
              encoding.x = {
                field: selectedQuant[0].name,
                type: selectedQuant[0].type
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
              break
            default:
              break
          }
        }
        if (selectedNom) {
          switch (selectedNom.length) {
            case 0:
              break
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
        if (selectedTemp) {
          switch (selectedTemp.length) {
            case 0:
              break
            case 1:
              encoding.x = {
                field: selectedTemp[0].name,
                type: selectedTemp[0].type,
                timeUnit: 'year'
              }
              if (selectedQuant[1] !== undefined) {
                this.variables[selectedQuant[1].id].isUsed = false
                this.computeBigGraphs()
              }
              break
            default:
              break
          }
        }
      }
      return encoding
    },

    getEncoding(selectedVars, combinationVar) {
      const encoding = {}
      const selectedQuant = this.filterVariableTypes(selectedVars, null)[0]
      const selectedNom = this.filterVariableTypes(selectedVars, null)[1]
      const selectedTemp = this.filterVariableTypes(selectedVars, null)[2]
      if (selectedQuant) {
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
            break
        }
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
      if (selectedTemp) {
        switch (selectedTemp.length) {
          case 0:
            break
          case 1:
            encoding.x = {
              field: selectedTemp[0].name,
              type: selectedTemp[0].type,
              timeUnit: 'year'
            }
            if (selectedQuant[1] !== undefined) {
              this.variables[selectedQuant[1].id].isUsed = false
              this.computeBigGraphs()
            }
            break
          default:
            break
        }
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
            timeUnit: 'year',
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
          type: selectedVar.length === 1 ? 'bar' : 'point'
        },
        encoding
      }
      return graph
    },
    getGraph(variables, combinationVar) {
      const data = this.getData(variables, combinationVar)
      const encoding = this.getEncoding(variables, combinationVar)
      const graph = {
        $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
        data: {
          values: data
        },
        width: 'container',
        mark: { type: 'point', tooltip: true },
        encoding
      }
      return graph
    },
    /* Saving + Routing */
    async saveGraph(graph) {
      await axios
        .post('/charts/save', {
          name: document.getElementById('title-' + graph.id).innerHTML,
          data: graph.data,
          public: this.user.defaultpublic,
          id_dataset: this.dataset.id,
          id_user: this.user.id
        })
        .then((res) => {
          // Trick to wait the new chart creation, otherwise the 'graph/url' cannot fetch it (null object)
          this.getNewChart(res.data.id)
        })
    },
    async getNewChart(id) {
      await axios.get(`/charts/id?id=${id}`).then((res) => {
        this.$router.push({
          name: `graph-url___${this.$i18n.locale}`,
          params: { url: res.data.url }
        })
      })
    },
    /* Utils */
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
    /* Workspaces Logic */
    async fetchWorkspaces() {
      await axios
        .get(
          `/workspaces/dataset/?id_user=${this.user.id}&id_dataset=${this.dataset.id}`
        )
        .then((res) => {
          this.workspaces = res.data
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    async saveWs() {
      const variables = this.variables.filter((v) => v.isUsed === true)
      const varId = []
      for (let i = 0; i < variables.length; i++) {
        varId.push(variables[i].id)
      }
      await axios
        .post(`/workspaces/save`, {
          name: this.newWs,
          id_user: this.user.id,
          id_dataset: this.dataset.id,
          variables: varId
        })
        .then(() => {
          this.fetchWorkspaces()
          this.$toast.success(this.$t('graphs.toast_saved'))
          this.wsDialog = false
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    async deleteWs(id) {
      await axios
        .delete(`/workspaces/?id=${id}`)
        .then(() => {
          this.$toast.success(this.$t('graphs.toast_deleted'))
          this.fetchWorkspaces()
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
        })
    },
    loadWs(id) {
      const ws = this.workspaces.filter((w) => w.id === id)[0]
      this.resetVariableSelection()
      for (let i = 0; i < ws.variables.length; i++) {
        this.variables[ws.variables[i]].isUsed = true
      }
      this.computeBigGraphs()
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
  height: auto;
  max-height: 800px;
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
