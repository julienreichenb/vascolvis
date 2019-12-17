<template>
  <div v-if="totalVariable > 0" class="mb-4">
    <v-dialog v-model="dialog" width="50%">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" small outlined color="green lighten-1">
          {{ $t('graphs.saveWs') }}
        </v-btn>
      </template>
      <v-card class="grey darken-2">
        <v-card-title>{{ $t('graphs.choose_ws_name') }}</v-card-title>
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
              @click="save"
              color="green lighten-1"
              outlined
              >{{ $t('graphs.save') }}</v-btn
            >
            <v-btn @click="close" color="white" outlined>{{
              $t('graphs.cancel')
            }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    totalVariable: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      newWs: '',
      newWsRules: [(v) => !!v || this.$t('graphs.ws_name_required')],
      validWs: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    save() {
      this.$emit('save', this.newWs)
    }
  }
}
</script>
