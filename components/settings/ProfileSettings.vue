<template>
  <div>
    <br />
    <v-card-title v-text="$t('settings.profile.title')"></v-card-title>
    <v-card-text>
      <v-btn
        @click="goToProfile()"
        outlined
        color="blue lighten-1"
        class="mb-5"
        >{{ $t('settings.profile.seemine') }}</v-btn
      >
      <v-form v-model="valid" class="mt-2" enctype="multipart/form-data">
        <v-layout>
          <div class="col-md-7 col-xs-12">
            <v-text-field
              v-model="form.publicname"
              :label="$t('settings.profile.publicname')"
              :placeholder="user.username"
              class="mb-3"
            ></v-text-field>
            <v-textarea
              v-model="form.bio"
              :label="$t('settings.profile.bio')"
              :placeholder="$t('settings.profile.bio_placeholder')"
              class="mb-3"
            ></v-textarea>
            <v-text-field
              v-model="form.url"
              :label="$t('settings.profile.url')"
              :placeholder="$t('settings.profile.url_placeholder')"
              :rules="urlRules"
            ></v-text-field>
          </div>
        </v-layout>
        <v-btn
          v-if="valid"
          @click="saveProfile()"
          outlined
          large
          color="green"
          >{{ $t('settings.save') }}</v-btn
        >
      </v-form>
    </v-card-text>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        publicname: null,
        bio: null,
        url: null
      },
      valid: false,
      urlRules: [
        (v) =>
          /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
            v
          ) ||
          v === '' ||
          v === null ||
          this.$t('settings.profile.url_error')
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.form.publicname = this.user.profile.publicname
      this.form.bio = this.user.profile.bio
      this.form.url = this.user.profile.url
    },
    async saveProfile() {
      await axios
        .put(`/profiles`, {
          id: this.user.id,
          publicname: this.form.publicname,
          bio: this.form.bio,
          url: this.form.url
        })
        .then(() => {
          this.$toast.success(this.$t('settings.toast_saved'))
          this.$emit('profile')
        })
    },
    goToProfile() {
      this.$router.push({
        name: `user-id___${this.$i18n.locale}`,
        params: { id: this.user.id }
      })
    }
  }
}
</script>
