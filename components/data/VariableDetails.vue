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
      types: ['quantitative', 'nominal', 'temporal']
    }
  },
  methods: {
    changeType(id, selected) {
      this.$emit('change-type', id, selected)
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
