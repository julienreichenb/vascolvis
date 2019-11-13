<template>
  <div @keydown.enter="attemptLogin">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="indigo darken-3">
            <v-toolbar-title
              class="white--text"
              v-text="this.$t('index.welcome')"
            >
            </v-toolbar-title>
            <v-tabs
              slot="extension"
              centered
              :grow="true"
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
                          required
                          @change="isWrong = false"
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="password"
                          :label="this.$t('index.password')"
                          :rules="passwordRules"
                          required
                          type="password"
                          @change="isWrong = false"
                        ></v-text-field>
                        <br />
                        <v-layout justify-space-between>
                          <v-btn
                            v-if="validLog"
                            color="white indigo--text"
                            depressed
                            @click="attemptLogin()"
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
                          :label="this.$t('index.username')"
                          :rules="usernameRules"
                          required
                          @change="isWrong = false"
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="password"
                          :label="this.$t('index.password')"
                          :rules="passwordRules"
                          required
                          type="password"
                          @change="isWrong = false"
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="checkPassword"
                          :label="this.$t('index.register.repeat')"
                          :rules="checkPasswordRules"
                          required
                          type="password"
                          @change="isWrong = false"
                        ></v-text-field>
                        <br />
                        <v-layout justify-space-between>
                          <v-btn
                            v-if="validReg"
                            color="white indigo--text"
                            depressed
                            @click="createAccount()"
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
      usernameRules: [
        (v) => !!v || this.$t('index.error.username_required'),
        (v) =>
          /^[a-zA-Z0-9]{4,20}$/.test(v) ||
          this.$t('index.error.username_invalid')
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
          password: this.password
        })
        .then((res) => {
          localStorage.setItem('usertoken', res.data)
          this.$router.push(this.localePath({ name: 'import' }))
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.isWrong = true
          this.errorReg = error.response.data.error
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
          // eslint-disable-next-line
          console.log(error)
          this.isWrong = true
          this.errorLog = error.response.data.error
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
