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
                <UserSettings
                  v-if="menu.id === 'user'"
                  :user="user"
                  @refresh="refreshUserToken"
                >
                </UserSettings>
                <ProfileSettings
                  v-if="menu.id === 'profile'"
                  :user="user"
                  @profile="getUserProfile"
                >
                </ProfileSettings>
                <PasswordSettings
                  v-if="menu.id === 'password'"
                  :user="user"
                  :passwordRules="passwordRules"
                  @refresh="refreshUserToken"
                >
                </PasswordSettings>
                <AccountSettings
                  v-if="menu.id === 'account'"
                  :user="user"
                  :passwordRules="passwordRules"
                  @refresh="refreshUserToken"
                >
                </AccountSettings>
              </v-tab-item>
            </v-tabs>
          </v-toolbar>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import UserSettings from '~/components/settings/UserSettings'
import ProfileSettings from '~/components/settings/ProfileSettings'
import PasswordSettings from '~/components/settings/PasswordSettings'
import AccountSettings from '~/components/settings/AccountSettings'
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
  components: {
    UserSettings,
    ProfileSettings,
    PasswordSettings,
    AccountSettings
  },
  data() {
    return {
      show: false,
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
      passwordRules: [
        (v) => !!v || this.$t('index.error.password_required'),
        (v) =>
          /^[a-zA-Z0-9]{4,20}$/.test(v) ||
          this.$t('index.error.password_invalid')
      ]
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
    },
    async getUserProfile() {
      await axios
        .get(`/profiles?id=${this.user.id}`)
        .then((res) => {
          this.user.profile = res.data
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.user.profile = null
        })
    },
    refreshUserToken(res) {
      localStorage.setItem('usertoken', res.data)
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    }
  }
}
</script>
