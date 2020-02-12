<template>
  <div>
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
  </div>
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
        { text: '', value: 'year' },
        { text: '', value: 'yearquarter' },
        { text: '', value: 'yearmonth' },
        { text: '', value: 'day' },
        { text: '', value: 'hours' }
      ]
    }
  },
  created() {
    for (let i = 0; i < this.types.length; i++) {
      this.types[i].text = this.$t('graphs.type.' + this.types[i].value)
    }
    for (let i = 0; i < this.timeUnits.length; i++) {
      this.timeUnits[i].text = this.$t(
        'graphs.timeunits.' + this.timeUnits[i].value
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
