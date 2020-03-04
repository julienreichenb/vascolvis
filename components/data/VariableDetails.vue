<template>
  <v-tooltip :color="variable.color" bottom>
    <template v-slot:activator="{ on }">
      <v-expansion-panel-header v-on="on" disable-icon-rotate>
        <v-icon slot="actions" :color="variable.color">{{
          variable.icon
        }}</v-icon>
        {{
          variable.name.length > 17
            ? variable.name.substring(0, 15) + '...'
            : variable.name
        }}
        <v-icon v-if="variable.warn" color="red lighten-1"
          >mdi-alert-outline</v-icon
        >
      </v-expansion-panel-header>
      <v-expansion-panel-content class="mt-4">
        <v-select
          v-model="variable.type"
          :items="types"
          @change="(selected) => changeType(variable.id, selected)"
          :item-text="types.text"
          :item-value="types.value"
          label="Type"
          dense
        >
        </v-select>
        <v-select
          v-if="variable.type === 'temporal'"
          v-model="variable.timeUnit"
          :items="timeUnits"
          @change="() => changeTimeUnit(variable.id)"
          :item-text="timeUnits.text"
          :item-value="timeUnits.value"
          :label="$t('graphs.timeunitlabel')"
          dense
        >
        </v-select>
        <v-tooltip v-if="variable.type === 'temporal'" bottom>
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <v-layout justify-space-around>
                <v-switch
                  @change="() => changeTimeFormat(variable.id)"
                  :color="variable.color"
                  class="caption"
                />
                <span class="caption pt-5">{{
                  $t('graphs.timeformatLabel')
                }}</span>
              </v-layout>
            </div>
          </template>
          <span>{{ $t('graphs.timeformatTooltip') }}</span>
        </v-tooltip>
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
    </template>
    <span class="variable-tooltip">{{ variable.name }}</span>
  </v-tooltip>
</template>
<script>
export default {
  props: {
    variable: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      types: [
        { text: '', value: 'quantitative' },
        { text: '', value: 'nominal' },
        { text: '', value: 'temporal' }
      ],
      timeUnits: [
        { base: 'year', value: 'year', text: '' },
        { base: 'yearquarter', value: 'yearquarter', text: '' },
        { base: 'yearmonth', value: 'yearmonth', text: '' },
        { base: 'day', value: 'day', text: '' },
        { base: 'hours', value: 'hours', text: '' },
        { base: 'hoursminutes', value: 'hoursminutes', text: '' },
        {
          base: 'hoursminutesseconds',
          value: 'hoursminutesseconds',
          text: ''
        }
      ]
    }
  },
  created() {
    for (let i = 0; i < this.types.length; i++) {
      this.types[i].text = this.$t('graphs.type.' + this.types[i].value)
    }
    for (let i = 0; i < this.timeUnits.length; i++) {
      this.timeUnits[i].text = this.$t(
        'graphs.timeunits.' + this.timeUnits[i].base
      )
    }
  },
  methods: {
    changeType(id, selected) {
      this.$emit('change-type', id, selected)
      this.$forceUpdate()
    },
    changeTimeUnit(id, selected) {
      this.$emit('change-time', id, selected)
      this.$forceUpdate()
    },
    changeTimeFormat(id, selected) {
      this.$emit('swap-timeformat', id, selected)
      this.$forceUpdate()
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

.v-tooltip__content {
  border: 1px solid white !important;
  opacity: 1 !important;
}
</style>
