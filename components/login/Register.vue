<template>
  <div @keydown.enter="createAccount">
    <v-card>
      <v-card-title v-text="this.$t('index.register.label')"> </v-card-title>
      <v-card-text class="pt-4">
        <div>
          <v-form ref="form" v-model="valid">
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
                v-if="valid"
                @click="createAccount()"
                color="white"
                depressed
                outlined
                ><v-icon>mdi-login</v-icon>
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
  </div>
</template>
<script>
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
      checkPassword: null,
      valid: false,
      isWrong: false,
      errorReg: '',
      checkPasswordRules: [
        (v) =>
          (this.password === this.checkPassword && !!v) ||
          this.$t('index.error.not_corresponding')
      ]
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
    }
  }
}
</script>
