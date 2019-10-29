<template>
  <div>
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="pt-5 blue darken-3">
            <v-toolbar-title class="white--text">
              <h3>Bienvenue sur Vasco</h3>
            </v-toolbar-title>
            <v-tabs
              slot="extension"
              centered
              :grow="true"
              slider-color="white"
              color="white"
            >
              <v-tab> Se connecter </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-title v-text="`Saisissez vos informations.`">
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <div>
                      <v-form ref="form" v-model="validLog">
                        <v-text-field
                          v-model="username"
                          label="Entrez votre nom d'utilisateur"
                          :rules="usernameRules"
                          required
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="password"
                          label="Entrez votre mot de passe"
                          :rules="passwordRules"
                          required
                          type="password"
                        ></v-text-field>
                        <br />
                        <v-layout justify-space-between>
                          <v-btn
                            v-if="validLog"
                            color="white indigo--text"
                            depressed
                            @click="attemptLogin()"
                          >
                            Continuer
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
              <v-tab> S'enregistrer </v-tab>
              <v-tab-item>
                <v-card>
                  <v-card-title
                    v-text="`Choisissez un identifiant et un mot de passe.`"
                  >
                  </v-card-title>
                  <v-card-text class="pt-4">
                    <div>
                      <v-form ref="form" v-model="validReg">
                        <v-text-field
                          v-model="username"
                          label="Entrez votre nom d'utilisateur"
                          :rules="usernameRules"
                          required
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="password"
                          label="Entrez votre mot de passe"
                          :rules="passwordRules"
                          required
                          type="password"
                        ></v-text-field>
                        <br />
                        <v-text-field
                          v-model="checkPassword"
                          label="Confirmez votre mot de passe"
                          :rules="checkPasswordRules"
                          required
                          type="password"
                        ></v-text-field>
                        <br />
                        <v-layout justify-space-between>
                          <v-btn
                            v-if="validReg"
                            color="white indigo--text"
                            depressed
                            @click="createAccount()"
                          >
                            Créer le compte
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
    <ColInputMain></ColInputMain>
  </div>
</template>
<script>
export default {
  data() {
    return {
      usernameRules: [
        (v) => !!v || `Nom d'utilisateur requis`,
        (v) =>
          /^[a-zA-Z0-9]{4,20}$/.test(v) ||
          `Le nom d'utilisateur est trop court ou contient des caractères interdits`
      ],
      passwordRules: [
        (v) => !!v || 'Mot de passe requis',
        (v) =>
          /^[a-zA-Z0-9]{4,20}$/.test(v) ||
          `Le mot de passe est trop court ou contient des caractères interdits`
      ],
      checkPasswordRules: [
        (v) =>
          (this.password === this.checkPassword && !!v) ||
          'Les mots de passe ne correspondent pas'
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
      this.$router.push({ name: 'import' })
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
          this.$router.push({ name: 'import' })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.$router.push({ name: 'index' })
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
          this.$router.push({ name: 'import' })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.$router.push({ name: 'index' })
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
