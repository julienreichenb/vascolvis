<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm10 elevation-6>
        <v-toolbar class="indigo darken-3">
          <v-toolbar-title
            v-text="this.$t('index.welcome')"
            class="white--text"
          >
          </v-toolbar-title>
          <v-tabs
            slot="extension"
            :grow="true"
            centered
            slider-color="white"
            color="white"
          >
            <v-tab> {{ $t('index.login.header') }} </v-tab>
            <v-tab-item>
              <Login
                :username-rules="usernameRules"
                :password-rules="passwordRules"
                :email-rules="emailRules"
              />
            </v-tab-item>
            <v-tab> {{ $t('index.register.header') }} </v-tab>
            <v-tab-item>
              <Register
                :username-rules="usernameRules"
                :password-rules="passwordRules"
                :email-rules="emailRules"
              />
            </v-tab-item>
          </v-tabs>
        </v-toolbar>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Login from '~/components/login/Login'
import Register from '~/components/login/Register'
export default {
  head() {
    return {
      title: this.$t('title.index'),
      meta: [
        {
          hid: 'index'
        }
      ]
    }
  },
  components: {
    Login,
    Register
  },
  data() {
    return {
      usernameRules: [(v) => !!v || this.$t('index.error.username_required')],
      emailRules: [
        (v) => !!v || this.$t('index.error.email_required'),
        (v) =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || this.$t('index.error.email_invalid')
      ],
      passwordRules: [
        (v) => !!v || this.$t('index.error.password_required'),
        (v) =>
          /^[a-zA-Z0-9]{4,20}$/.test(v) ||
          this.$t('index.error.password_invalid')
      ]
    }
  },
  mounted() {
    if (localStorage.getItem('usertoken') !== null) {
      this.$router.push(this.localePath({ name: 'import' }))
    }
  }
}
</script>
<style>
.apierror {
  color: lightcoral;
  text-align: center;
}
</style>
