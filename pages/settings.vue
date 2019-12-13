<template>
  <div v-show="show">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="indigo darken-3">
            <v-toolbar-title
              v-text="this.$t('settings.header')"
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
              <v-tab v-for="menu in menus" :key="menu.id">
                <v-container fill-height>
                  <v-layout align-center justify-space-around>
                    <span>
                      {{ $t('settings.tabs.' + menu.id) }}
                    </span>
                    <v-icon color="blue lighten-2">{{ menu.icon }}</v-icon>
                  </v-layout>
                </v-container>
              </v-tab>
              <v-tab-item v-for="menu in menus" :key="menu.id">
                <div v-if="menu.id === 'user'">
                  <br />
                  <v-card-title
                    v-text="$t('settings.user.title')"
                  ></v-card-title>
                  <v-form v-model="validReg.user">
                    <v-card-text>
                      <v-row>
                        <v-text-field
                          v-model="form.user.email"
                          :label="$t('settings.user.email')"
                          :rules="emailRules"
                          class="col-md-7 col-xs-12"
                          required
                        ></v-text-field>
                        <v-text-field
                          v-model="form.user.username"
                          :label="$t('settings.user.username')"
                          :rules="usernameRules"
                          class="col-md-7 col-xs-12"
                          required
                        ></v-text-field>
                      </v-row>
                      <v-btn
                        v-if="validReg.user"
                        @click="saveUser()"
                        outlined
                        large
                        color="green"
                        >{{ $t('settings.save') }}</v-btn
                      >
                    </v-card-text>
                  </v-form>
                </div>
                <div v-if="menu.id === 'profile'">
                  <br />
                  <v-card-title
                    v-text="$t('settings.profile.title')"
                  ></v-card-title>
                  <v-card-text>
                    <v-btn
                      @click="goToProfile()"
                      outlined
                      color="blue lighten-1"
                      class="mb-3"
                      >{{ $t('settings.profile.seemine') }}</v-btn
                    >
                    <v-form
                      v-model="validReg.profile"
                      enctype="multipart/form-data"
                    >
                      <v-layout>
                        <div class="col-md-7 col-xs-12">
                          <v-text-field
                            v-model="form.profile.publicname"
                            :label="$t('settings.profile.publicname')"
                            :placeholder="user.username"
                          ></v-text-field>
                          <v-textarea
                            v-model="form.profile.bio"
                            :label="$t('settings.profile.bio')"
                            :placeholder="
                              $t('settings.profile.bio_placeholder')
                            "
                          ></v-textarea>
                          <v-text-field
                            v-model="form.profile.url"
                            :label="$t('settings.profile.url')"
                            :placeholder="
                              $t('settings.profile.url_placeholder')
                            "
                            :rules="urlRules"
                          ></v-text-field>
                        </div>
                      </v-layout>
                      <v-btn
                        v-if="validReg.profile"
                        @click="saveProfile()"
                        outlined
                        large
                        color="green"
                        >{{ $t('settings.save') }}</v-btn
                      >
                    </v-form>
                  </v-card-text>
                </div>
                <div v-if="menu.id === 'password'">
                  <br />
                  <v-card-title
                    v-text="$t('settings.password.title')"
                  ></v-card-title>
                  <v-form v-model="validReg.psw">
                    <v-card-text>
                      <v-row>
                        <v-text-field
                          v-model="form.password.oldpsw"
                          :label="$t('settings.password.oldpsw')"
                          :rules="passwordRules"
                          :type="showpsw.oldpsw ? 'text' : 'password'"
                          :append-icon="
                            showpsw.oldpsw ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append="
                            () => (showpsw.oldpsw = !showpsw.oldpsw)
                          "
                          class="col-md-7 col-xs-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="form.password.newpsw"
                          :label="$t('settings.password.newpsw')"
                          :rules="passwordRules"
                          :type="showpsw.newpsw ? 'text' : 'password'"
                          :append-icon="
                            showpsw.newpsw ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append="
                            () => (showpsw.newpsw = !showpsw.newpsw)
                          "
                          class="col-md-7 col-xs-12"
                        ></v-text-field>
                        <v-text-field
                          v-model="form.password.confirmpsw"
                          :label="$t('settings.password.confirmpsw')"
                          :rules="checkPasswordRules"
                          :type="showpsw.confirmpsw ? 'text' : 'password'"
                          :append-icon="
                            showpsw.confirmpsw ? 'mdi-eye-off' : 'mdi-eye'
                          "
                          @click:append="
                            () => (showpsw.confirmpsw = !showpsw.confirmpsw)
                          "
                          class="col-md-7 col-xs-12"
                        ></v-text-field>
                      </v-row>
                      <v-btn
                        v-if="validReg.psw"
                        @click="savePassword()"
                        outlined
                        large
                        color="green"
                        >{{ $t('settings.save') }}</v-btn
                      >
                    </v-card-text>
                  </v-form>
                </div>
                <div v-if="menu.id === 'account'">
                  <br />
                  <v-card-title
                    v-text="$t('settings.account.title')"
                  ></v-card-title>
                  <v-card-text>
                    <p
                      v-html="
                        user.defaultpublic
                          ? $t('settings.account.public')
                          : $t('settings.account.private')
                      "
                    ></p>
                    <v-switch
                      v-model="form.account.defaultpublic"
                      :label="
                        form.account.defaultpublic
                          ? $t('settings.account.switch_public')
                          : $t('settings.account.switch_private')
                      "
                      color="blue"
                    ></v-switch>
                    <v-btn
                      @click="saveAccount()"
                      outlined
                      large
                      color="green"
                      >{{ $t('settings.save') }}</v-btn
                    >
                  </v-card-text>
                  <br />
                  <hr />
                  <v-card-title
                    v-text="$t('settings.account.title2')"
                  ></v-card-title>
                  <v-card-text>
                    <p>
                      <v-icon color="red">mdi-alert-outline</v-icon>
                      {{ $t('settings.account.delete_title') }}
                    </p>
                    <v-btn
                      @click="deleteDialog = true"
                      outlined
                      large
                      color="red"
                      >{{ $t('settings.account.delete_button') }}</v-btn
                    >
                  </v-card-text>
                </div>
              </v-tab-item>
            </v-tabs>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- DELETE ACCOUNT DIALOG -->
    <v-dialog v-model="deleteDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">{{
          $t('settings.account.delete')
        }}</v-card-title>
        <v-form v-model="validReg.delete">
          <v-card-text>
            <p v-html="$t('settings.account.delete_disclaimer')"></p>
            <v-text-field
              v-model="form.account.password"
              :label="$t('settings.account.password')"
              :rules="passwordRules"
              :type="showpsw.deletepsw ? 'text' : 'password'"
              :append-icon="showpsw.deletepsw ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (showpsw.deletepsw = !showpsw.deletepsw)"
              class="col-12"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              @click="deleteDialog = false"
              color="grey lighten-3"
              outlined
            >
              {{ $t('settings.account.delete_cancel') }}
            </v-btn>
            <v-btn
              v-if="validReg.delete"
              @click="deleteAccount()"
              color="red darken-2"
              outlined
            >
              {{ $t('settings.account.delete_ok') }}
            </v-btn>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
export default {
  head() {
    return {
      title: this.$t('title.settings'),
      meta: [
        {
          hid: 'settings'
        }
      ]
    }
  },
  data() {
    return {
      show: false,
      deleteDialog: false,
      showpsw: {
        oldpsw: false,
        newpsw: false,
        confirmpsw: false,
        deletepsw: false
      },
      validReg: {
        user: false,
        profile: false,
        psw: false,
        account: false,
        delete: false
      },
      user: Object,
      menus: [
        {
          id: 'user',
          icon: 'mdi-account'
        },
        {
          id: 'profile',
          icon: 'mdi-account-badge-horizontal-outline'
        },
        {
          id: 'password',
          icon: 'mdi-security'
        },
        {
          id: 'account',
          icon: 'mdi-cogs'
        }
      ],
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
          (this.form.password.newpsw === this.form.password.confirmpsw &&
            !!v) ||
          this.$t('index.error.not_corresponding')
      ],
      urlRules: [
        (v) =>
          /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi.test(
            v
          ) ||
          v === '' ||
          v === null ||
          this.$t('settings.profile.url_error')
      ],
      form: {
        user: {
          email: null,
          username: null
        },
        profile: {
          publicname: null,
          bio: null,
          url: null
        },
        password: {
          oldpsw: null,
          newpsw: null,
          confirmpsw: null
        },
        account: {
          defaultpublic: null,
          password: null
        }
      }
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
      this.init()
      this.show = true
    } catch {
      this.$router.push(this.localePath({ name: 'index' }))
    }
  },
  methods: {
    init() {
      this.getUserProfile()
      this.form.user.username = this.user.username
      this.form.user.email = this.user.email
      this.form.account.defaultpublic = this.user.defaultpublic
    },
    async saveUser() {
      await axios
        .put(`/users`, {
          id: this.user.id,
          username: this.form.user.username,
          email: this.form.user.email
        })
        .then((res) => {
          this.refreshUserToken(res)
          this.$toast.success(this.$t('settings.toast_saved'))
        })
    },
    async saveProfile() {
      await axios
        .put(`/profiles`, {
          id: this.user.id,
          publicname: this.form.profile.publicname,
          bio: this.form.profile.bio,
          url: this.form.profile.url
        })
        .then((res) => {
          this.$toast.success(this.$t('settings.toast_saved'))
          this.getUserProfile()
        })
    },
    async savePassword() {
      await axios
        .put(`/users`, {
          id: this.user.id,
          oldpassword: this.form.password.oldpsw,
          newpassword: this.form.password.newpsw
        })
        .then((res) => {
          this.refreshUserToken(res)
          this.$toast.success(this.$t('settings.toast_saved'))
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
          this.resetPasswordForm()
          this.$toast.error(this.$t('settings.toast_error'))
        })
    },
    async saveAccount() {
      await axios
        .put(`/users`, {
          id: this.user.id,
          defaultpublic: this.form.account.defaultpublic
        })
        .then((res) => {
          this.refreshUserToken(res)
          this.$toast.success(this.$t('settings.toast_saved'))
        })
    },
    async deleteAccount() {
      if (this.form.account.password === this.user.password) {
        await axios
          .delete(`/users?id=${this.user.id}`)
          .then((res) => {
            localStorage.removeItem('usertoken')
            this.$router.push(this.localePath({ name: 'index' }))
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error)
            this.$toast.error(this.$t('settings.account.toast_error'))
          })
        this.deleteDialog = false
      } else {
        this.$toast.error(this.$t('settings.account.toast_error'))
      }
    },
    async getUserProfile() {
      await axios
        .get(`/profiles?id=${this.user.id}`)
        .then((res) => {
          this.user.profile = res.data
          this.form.profile.publicname = this.user.profile.publicname
          this.form.profile.bio = this.user.profile.bio
          this.form.profile.url = this.user.profile.url
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.user.profile = null
          this.form.profile.publicname = ''
          this.form.profile.bio = ''
          this.form.profile.url = ''
        })
    },
    resetPasswordForm() {
      this.form.password.oldpsw = null
      this.form.password.newpsw = null
      this.form.password.confirmpsw = null
    },
    refreshUserToken(res) {
      localStorage.setItem('usertoken', res.data)
      this.user = jwtDecode(localStorage.getItem('usertoken'))
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
