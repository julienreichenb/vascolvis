<template>
  <v-dialog v-model="dialog" width="50%">
    <v-card class="grey darken-2">
      <v-card-title>{{
        $t('graphs.deleteWs') + ' ' + (workspace ? workspace.name : '')
      }}</v-card-title>
      <v-card-text>
        {{ $t('graphs.deleteWs_confirm') }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteWs()" color="red lighten-1" outlined
          ><v-icon>mdi-delete-outline</v-icon> {{ $t('graphs.delete') }}</v-btn
        >
        <v-btn @click="close" color="white" outlined>{{
          $t('graphs.cancel')
        }}</v-btn>
      </v-card-actions>
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
    workspace: {
      type: Object,
      default: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    deleteWs() {
      this.$emit('delete', this.workspace.id)
      this.close()
    }
  }
}
</script>
