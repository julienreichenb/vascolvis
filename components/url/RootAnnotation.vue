<template>
  <v-timeline dense>
    <v-timeline-item>
      <span slot="opposite"
        ><a @click="$emit('profile', rootAnnotation.user.id)">{{
          rootAnnotation.user.username
        }}</a></span
      >
      <v-card class="elevation-2">
        <v-card-title class="headline"
          ><a @click="$emit('highlight', rootAnnotation.id)"
            >TITRE ANNOT ROOT</a
          ></v-card-title
        >
        <v-card-text>
          Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola
          imperdiet nec ut, sed euismod convenire principes at. Est et nobis
          iisque percipit, an vim zril disputando voluptatibus, vix an salutandi
          sententiae.
        </v-card-text>
      </v-card>
    </v-timeline-item>
    <ReplyAnnotation
      v-for="annotation in rootAnnotation.replies"
      :key="annotation.id"
      :reply-annotation="annotation"
    />
    <v-timeline-item hide-dot>
      <v-btn
        @click="$emit('toggle', rootAnnotation.id)"
        color="green"
        depressed
      >
        <v-icon>
          mdi-plus-circle-outline
        </v-icon>
        {{ $t('url.reply_annot') }}
      </v-btn>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
import ReplyAnnotation from './ReplyAnnotation'
export default {
  components: {
    ReplyAnnotation
  },
  props: {
    rootAnnotation: { type: Object, required: true }
  }
}
</script>
