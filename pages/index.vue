<template>
  <div @keydown.enter="attemptLogin">
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
                <v-card>
                  <v-card-title v-text="this.$t('index.login.label')">
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <div>
                      <v-form ref="form" v-model="validLog">
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
                            v-if="validLog"
                            @click="attemptLogin()"
                            color="white"
                            depressed
                            outlined
                          >
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
              </v-tab-item>
              <v-tab> {{ $t('index.register.header') }} </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-title v-text="this.$t('index.register.label')">
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <div>
                      <v-form ref="form" v-model="validReg">
                        <v-text-field
                          v-model="username"
                          :label="this.$t('index.register.username')"
                          :rules="usernameRules"
                          @change="isWrong = false"
                          required
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="email"
                          :label="this.$t('index.register.email')"
                          :rules="emailRules"
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
                        <v-text-field
                          v-model="checkPassword"
                          :label="this.$t('index.register.repeat')"
                          :rules="checkPasswordRules"
                          @change="isWrong = false"
                          required
                          type="password"
                        ></v-text-field>
                        <br />
                        <v-layout justify-space-between>
                          <v-btn
                            v-if="validReg"
                            @click="createAccount()"
                            color="white"
                            depressed
                            outlined
                          >
                            {{ $t('index.register.button') }}
                          </v-btn>
                        </v-layout>
                        <div v-if="isWrong">
                          <br />
                          <h4 class="apierror">{{ errorReg }}</h4>
                        </div>
                      </v-form>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
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
      ],
      checkPasswordRules: [
        (v) =>
          (this.password === this.checkPassword && !!v) ||
          this.$t('index.error.not_corresponding')
      ],
      validLog: false,
      validReg: false,
      username: null,
      email: null,
      password: null,
      checkPassword: null,
      errorLog: '',
      errorReg: '',
      isWrong: false
    }
  },
  mounted() {
    if (localStorage.getItem('usertoken') !== null) {
      this.$router.push(this.localePath({ name: 'import' }))
    }
  },
  methods: {
    createAccount() {
      this.$axios
        .post('/users/register', {
          username: this.username,
          password: this.password,
          email: this.email
        })
        .then((res) => {
          localStorage.setItem('usertoken', res.data)
          this.$router.push(this.localePath({ name: 'import' }))
        })
        .catch((error) => {
          this.isWrong = true
          this.errorReg = this.$t('index.error.' + error.response.data.error)
        })
    },
    attemptLogin() {
      this.$axios
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
<style>
.apierror {
  color: lightcoral;
  text-align: center;
}
</style>
