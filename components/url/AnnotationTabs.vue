<template>
  <div v-if="loaded">
    <v-navigation-drawer
      v-model="drawer"
      right
      hide-overlay
      absolute
      dense
      color="grey darken-2"
      width="600"
    >
      <DrawerHideButton
        :drawer="drawer"
        :show-icon="true"
        @close="$emit('close')"
      />
      <v-expansion-panels
        v-model="panel"
        accordion
        focusable
        style="width: 100%"
      >
        <v-expansion-panel
          v-for="rootAnnotation in annotations"
          :key="rootAnnotation.id"
        >
          <v-expansion-panel-header disable-icon-rotate>
            {{ $t('url.by') }}
            {{
              rootAnnotation.user
                ? rootAnnotation.user.username
                : $t('panel.deleted_account')
            }}
            {{
              '(' +
                rootAnnotation.replies.length +
                ' ' +
                (rootAnnotation.replies.length > 1
                  ? $t('url.answers')
                  : $t('url.answer')) +
                ')'
            }}
            <v-icon
              slot="actions"
              :color="
                graphOwner && rootAnnotation.user
                  ? graphOwner.id === rootAnnotation.user.id
                    ? 'amber'
                    : user.id === rootAnnotation.user.id
                    ? 'blue'
                    : ''
                  : ''
              "
              >{{
                graphOwner && rootAnnotation.user
                  ? graphOwner.id === rootAnnotation.user.id
                    ? 'mdi-crown-outline'
                    : user.id === rootAnnotation.user.id
                    ? 'mdi-account-outline'
                    : ''
                  : ''
              }}</v-icon
            >
          </v-expansion-panel-header>
          <v-expansion-panel-content class="mt-4">
            <RootAnnotation
              :root-annotation="rootAnnotation"
              :user="user"
              :graph-owner="graphOwner"
              :id-highlight="idHighlight"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>
  </div>
</template>
<script>
import RootAnnotation from './RootAnnotation'
import DrawerHideButton from '~/components/data/DrawerHideButton'
export default {
  components: { RootAnnotation, DrawerHideButton },
  props: {
    drawer: { type: Boolean, default: false },
    annotations: { type: Array, required: true },
    loaded: { type: Boolean, default: false },
    user: { type: Object, required: true },
    graphOwner: { type: Object, required: true },
    idHighlight: { type: Number, required: false, default: null }
  },
  data() {
    return {
      panel: []
    }
  },
  mounted() {
    this.panel = [...Array(this.annotations.length).keys()].map((k, i) => i)
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
