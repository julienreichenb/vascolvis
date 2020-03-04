<template>
  <v-timeline align-top dense>
    <v-timeline-item
      :icon="getIcon.icon"
      :icon-color="getIcon.color"
      color="white"
      large
    >
      <AnnotationCard
        :annotation="rootAnnotation"
        :user="user"
        :id-user="user.id"
        :id-owner="graphOwner.id"
        :id-highlight="idHighlight"
      />
    </v-timeline-item>
    <ReplyAnnotation
      v-for="annotation in rootAnnotation.replies"
      :key="annotation.id"
      :reply-annotation="annotation"
      :user="user"
      :id-user="user ? user.id : 0"
      :id-owner="user ? graphOwner.id : 0"
      :id-highlight="idHighlight"
    />
    <v-timeline-item hide-dot>
      <v-btn
        @click="$root.$emit('toggle', rootAnnotation.id, true)"
        color="green lighten-2"
        depressed
        outlined
      >
        <v-icon class="mr-1">
          mdi-plus-circle-outline
        </v-icon>
        {{ $t('url.reply_annot') }}
      </v-btn>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
import ReplyAnnotation from './ReplyAnnotation'
import AnnotationCard from './AnnotationCard'
export default {
  components: {
    ReplyAnnotation,
    AnnotationCard
  },
  props: {
    rootAnnotation: { type: Object, required: true },
    user: { type: Object, default: null },
    graphOwner: { type: Object, default: null },
    idHighlight: { type: Number, required: false, default: null }
  },
  data() {
    return {
      isUser: false,
      isGraphOwner: false
    }
  },
  computed: {
    getIcon() {
      if (this.isGraphOwner) {
        return { icon: 'mdi-crown', color: 'orange darken-3' }
      }
      if (this.isUser) {
        return { icon: 'mdi-account', color: 'grey darken-3' }
      }
      return { icon: '', color: '' }
    }
  },
  mounted() {
    this.isUser =
      this.user && this.rootAnnotation.user
        ? this.user.id === this.rootAnnotation.user.id
        : false
    this.isGraphOwner =
      this.graphOwner && this.rootAnnotation.user
        ? this.graphOwner.id === this.rootAnnotation.user.id
        : false
  }
}
</script>
