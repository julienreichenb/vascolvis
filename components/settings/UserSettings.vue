<template>
  <div>
    <br />
    <v-card-title v-text="$t('settings.user.title')"></v-card-title>
    <v-form v-model="valid">
      <v-card-text>
        <v-row>
          <v-text-field
            v-model="form.email"
            :label="$t('settings.user.email')"
            :rules="emailRules"
            class="col-md-7 col-xs-12"
            required
          ></v-text-field>
          <v-text-field
            v-model="form.username"
            :label="$t('settings.user.username')"
            :rules="usernameRules"
            class="col-md-7 col-xs-12"
            required
          ></v-text-field>
        </v-row>
        <v-btn v-if="valid" @click="saveUser()" outlined large color="green">{{
          $t('settings.save')
        }}</v-btn>
      </v-card-text>
    </v-form>
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
        username: '',
        email: ''
      },
      valid: false,
      usernameRules: [(v) => !!v || this.$t('index.error.username_required')],
      emailRules: [
        (v) => !!v || this.$t('index.error.email_required'),
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || this.$t('index.error.email_invalid')
      ]
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.form.username = this.user.username
      this.form.email = this.user.email
    },
    async saveUser() {
      await axios
        .put(`/users`, {
          id: this.user.id,
          username: this.form.username,
          email: this.form.email
        })
        .then((res) => {
          this.$emit('refresh', res)
          this.$toast.success(this.$t('settings.toast_saved'))
        })
    }
  }
}
</script>
