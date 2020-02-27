<template>
  <div class="blue">
    <v-btn @click="closeDrawer" text width="100%">
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
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeDrawer() {
      this.$emit('close')
    }
  }
}
</script>
