<template>
  <v-card
    @click="$root.$emit('highlight', annotation)"
    class="elevation-2 grey darken-2"
  >
    <v-card-title
      :class="isHighlighted ? 'blue' : 'indigo'"
      :style="
        isHighlighted
          ? 'border: 1px solid white !important; border-bottom: none'
          : ''
      "
      class="headline"
    >
      <v-layout justify-space-between>
        <h6>
          {{ JSON.parse(annotation.data).rawAnnotation.meaning }}
        </h6>
        <v-btn
          v-if="
            annotation.user
              ? annotation.user.id === idUser
              : isAdmin(user)
              ? true
              : false
          "
          @click="$root.$emit('attemptdeletion', annotation.id)"
          icon
          small
          color="red"
        >
          <v-icon>
            mdi-delete-circle-outline
          </v-icon>
        </v-btn>
      </v-layout>
    </v-card-title>
    <v-card-text
      :style="isHighlighted ? 'border: 1px solid white; border-top: none;' : ''"
      class="pt-2 white--text"
    >
      {{ JSON.parse(annotation.data).rawAnnotation.text }}
      <div class="user-date col-12">
        <a
          @click="
            annotation.user ? $root.$emit('profile', annotation.user.id) : ''
          "
          >{{
            annotation.user
              ? annotation.user.username
              : $t('panel.deleted_account')
          }}</a
        >
        <p>
          {{ $t('url.posted_at') }}
          {{ timeConverter(JSON.parse(annotation.data).meta.timestamp) }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    annotation: { type: Object, required: true },
    user: { type: Object, required: true },
    // eslint-disable-next-line vue/require-prop-types
    idUser: { required: true },
    // eslint-disable-next-line vue/require-prop-types
    idOwner: { required: true },
    idHighlight: { type: Number, required: false, default: null }
  },
  computed: {
    isHighlighted() {
      if (this.idHighlight) {
        return this.idHighlight === this.annotation.id
      }
      return false
    }
  },
  methods: {
    timeConverter(timestamp) {
      const a = new Date(timestamp)
      const year = a.getFullYear()
      const month = a.getMonth() + 1
      const date = a.getDate()
      return date + '.' + month + '.' + year
    },
    isAdmin(user) {
      return user.isAdmin
    }
  }
}
</script>
<style scoped>
.user-date {
  font-size: 1em;
  text-align: right;
}
.user-date p {
  margin: 0.3em;
  line-height: 0.5em;
  font-style: italic;
  font-size: 0.9em;
}
.user-date a {
  color: dodgerblue;
}
</style>
