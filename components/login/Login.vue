<template>
  <div @keydown.enter="attemptLogin">
    <v-card>
      <v-card-title v-text="this.$t('index.login.label') + '.'"> </v-card-title>
      <v-card-text class="pt-4">
        <div>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="username"
              :label="this.$t('index.username')"
              :rules="usernameRules"
              @change="isWrong = false"
              required
            ></v-text-field>
            <br />
            <v-text-field
              v-model="password"
              :label="this.$t('index.password')"
              :rules="passwordRules"
              @change="isWrong = false"
              required
              type="password"
            ></v-text-field>
            <br />
            <v-layout justify-space-between>
              <v-btn
                v-if="valid"
                @click="attemptLogin()"
                color="white"
                depressed
                outlined
                ><v-icon>mdi-login</v-icon>
                {{ $t('index.login.button') }}
              </v-btn>
            </v-layout>
            <div v-if="isWrong">
              <br />
              <h4 class="apierror">{{ errorLog }}</h4>
            </div>
          </v-form>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
  props: {
    usernameRules: {
      type: Array,
      default: null
    },
    passwordRules: {
      type: Array,
      default: null
    },
    emailRules: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      username: null,
      email: null,
      password: null,
      valid: false,
      isWrong: false,
      errorLog: ''
    }
  },
  methods: {
    attemptLogin() {
      axios
        .post('/users/login', {
          username: this.username,
          password: this.password
        })
        .then((res) => {
          localStorage.setItem('usertoken', res.data)
          this.$router.push(this.localePath({ name: 'import' }))
        })
        .catch((error) => {
          this.isWrong = true
          this.errorLog = this.$t('index.error.' + error.response.data.error)
        })
    }
  }
}
</script>
