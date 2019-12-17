<template>
  <div class="blue">
    <v-btn @click="closeDrawer" width="100%" text>
      {{ $t('graphs.hide') }}
    </v-btn>
  </div>
</template>
<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('close')
    }
  }
}
</script>
