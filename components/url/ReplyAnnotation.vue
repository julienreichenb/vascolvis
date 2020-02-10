<template>
  <v-timeline-item
    :icon="getIcon.icon"
    :icon-color="getIcon.color"
    color="white"
  >
    <AnnotationCard :annotation="replyAnnotation" :is-user="isUser" />
  </v-timeline-item>
</template>
<script>
import AnnotationCard from './AnnotationCard'
export default {
  components: {
    AnnotationCard
  },
  props: {
    replyAnnotation: { type: Object, required: true },
    // eslint-disable-next-line vue/require-prop-types
    idUser: { required: true },
    // eslint-disable-next-line vue/require-prop-types
    idOwner: { required: true }
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
    this.$nextTick(() => {
      this.isUser = this.replyAnnotation.user
        ? this.idUser === this.replyAnnotation.user.id
        : false
      this.isGraphOwner = this.replyAnnotation.user
        ? this.idOwner === this.replyAnnotation.user.id
        : false
    })
  }
}
</script>
