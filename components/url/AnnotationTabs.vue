<template>
  <div v-if="loaded">
    <v-tabs
      slot="extension"
      style="padding: 0 0.5em"
      slider-color="white"
      color="blue"
    >
      <v-tab v-for="rootAnnotation in annotations" :key="rootAnnotation.id">
        {{ JSON.parse(rootAnnotation.data).rawAnnotation.meaning }} ({{
          rootAnnotation.replies.length
        }}
        {{
          rootAnnotation.replies.length > 1
            ? $t('url.answers')
            : $t('url.answer')
        }})
      </v-tab>
      <v-tab-item
        v-for="rootAnnotation in annotations"
        :key="rootAnnotation.id"
      >
        <RootAnnotation
          :root-annotation="rootAnnotation"
          :user="user"
          :graph-owner="graphOwner"
        />
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import RootAnnotation from './RootAnnotation'
export default {
  components: {
    RootAnnotation
  },
  props: {
    annotations: { type: Array, required: true },
    loaded: { type: Boolean, default: false },
    user: { type: Object, required: true },
    graphOwner: { type: Object, required: true }
  }
}
</script>
<style>
.v-timeline-item__dot {
  background: cornflowerblue !important;
}
.v-timeline::before {
  background: cornflowerblue !important;
}
</style>
