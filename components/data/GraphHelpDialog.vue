<template>
  <v-dialog v-model="dialog" width="85%">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" x-large icon color="white" dark>
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline indigo darken-3 mb-3" primary-title>
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
          <v-icon :color="colors[0]" large>mdi-numeric</v-icon>
          -
          {{ $t('graphs.info.quant_title') }}
        </h3>
        <p>
          <span v-html="this.$t('graphs.info.quant')"></span>
          <v-icon :color="colors[0]">mdi-numeric</v-icon>
          <span v-html="this.$t('graphs.info.quant2')"></span>
          <v-btn color="red lighten-1" outlined depressed x-small
            ><v-icon x-small>mdi-autorenew</v-icon>
            {{ $t('graphs.switch_button') }} </v-btn
          >.
        </p>
        <h3>
          <v-icon :color="colors[1]" large>mdi-alphabetical</v-icon>
          -
          {{ $t('graphs.info.nom_title') }}
        </h3>
        <p>
          <span v-html="this.$t('graphs.info.nom')"></span>
          <v-icon :color="colors[1]">mdi-alphabetical</v-icon>
          <span v-html="this.$t('graphs.info.nom2')"></span
          ><v-btn color="blue lighten-1" outlined depressed x-small
            ><v-icon x-small>mdi-invert-colors</v-icon>
            {{ $t('graphs.switch_colorshape') }} </v-btn
          >.
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
        <h2>{{ $t('graphs.info.workspaces_title') }}</h2>
        <span v-html="this.$t('graphs.info.workspaces')"></span>
        <v-icon color="green lighten-2">mdi-bookmark-plus-outline</v-icon>
        <span v-html="this.$t('graphs.info.workspaces2')"></span>
        <v-icon color="red lighten-1">mdi-delete-circle-outline</v-icon>
        <span v-html="this.$t('graphs.info.workspaces3')"></span>
        <v-icon color="white">mdi-broom</v-icon>
        <span v-html="this.$t('graphs.info.workspaces4')"></span>
        <h2 class="mt-6">{{ $t('graphs.info.yourturn') }}</h2>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    colors: {
      type: Array,
      default: null
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
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
p {
  color: lightgrey;
}
</style>
