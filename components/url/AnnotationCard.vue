<template>
  <v-card
    @click="$root.$emit('highlight', annotation)"
    class="elevation-2 grey darken-3"
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
        <h3>
          {{ JSON.parse(annotation.data).rawAnnotation.meaning }}
        </h3>
        <v-btn
          v-if="annotation.user.id === idUser"
          @click="deleteAnnotation(annotation.id)"
          icon
          small
          color="white"
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
      <div class="user-date col-12" style="text-align: right">
        <a
          @click="
            annotation.user ? $root.$emit('profile', annotation.user.id) : ''
          "
          >{{ annotation.user ? username : $t('panel.deleted_account') }}</a
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
import axios from '~/plugins/axios'
export default {
  props: {
    annotation: { type: Object, required: true },
    // eslint-disable-next-line vue/require-prop-types
    idUser: { required: true },
    // eslint-disable-next-line vue/require-prop-types
    idOwner: { required: true },
    idHighlight: { type: Number, required: false, default: null }
  },
  data() {
    return {
      isUser: false,
      username: ''
    }
  },
  computed: {
    isHighlighted() {
      if (this.idHighlight) {
        return this.idHighlight === this.annotation.id
      }
      return false
    }
  },
  mounted() {
    this.isUser =
      this.user && this.rootAnnotation.user
        ? this.user.id === this.rootAnnotation.user.id
        : false
    this.getUsername()
  },
  methods: {
    timeConverter(timestamp) {
      const a = new Date(timestamp)
      const year = a.getFullYear()
      const month = a.getMonth() + 1
      const date = a.getDate()
      return date + '.' + month + '.' + year
    },
    deleteAnnotation(id) {
      axios
        .delete(`/annotations?id=${id}`)
        .then(() => {
          this.$toast.success(this.$t('url.toast_annot_delete'))
          this.$root.$emit('deleted')
        })
        .catch(() => {
          this.$toast.error(this.$t('url.toast_annot_error'))
        })
    },
    async getUsername() {
      await axios
        .get(`/users/names?id=${this.idUser}`)
        .then((res) => {
          this.username = res.data.publicname
            ? res.data.publicname
            : res.data.username
        })
        .catch((error) => {
          console.log(error)
          this.username = ''
        })
    }
  }
}
</script>
<style scoped>
.user-date {
  font-size: 1em;
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
