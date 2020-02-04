<template>
  <v-timeline-item>
    <span slot="opposite"
      ><a @click="$emit('profile', replyAnnotation.user.id)">{{
        replyAnnotation.user.username
      }}</a></span
    >
    <v-card class="elevation-2">
      <v-card-title v-scroll class="headline"
        ><a @click="$emit('highlight', replyAnnotation.id)"
          >TITRE ANNOT REPLY</a
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
</template>
<script>
export default {
  props: {
    replyAnnotation: { type: Object, required: true }
  }
}
</script>
