<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn @click.stop="goHome()" icon>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-toolbar-title @click.stop="goHome()" v-text="title" />
      <v-spacer />
      <v-btn @click.stop="goToPanel()" outlined>
        {{ $t('layout.atelier') }}
      </v-btn>
      <v-spacer />
      <v-btn @click.stop="goToSettings()" icon>
        <v-icon>mdi-cogs</v-icon>
      </v-btn>
      <v-btn @click.stop="goToAbout()" icon>
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-btn @click.stop="logout()" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content v-scroll>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app class="footer-margin">
      <v-layout justify-space-between align-center>
        <a href="https://hes-so.ch" target="_blank">
          <img
            src="~/static/hessologo.png"
            alt="HES-SO Valais/Wallis"
            style="height: 50px; width: auto;"
          />
        </a>
        <div class="pl-3 pr-3">
          <span class="rcso"
            ><a
              href="https://www.hes-so.ch/fr/economie-services-10.html"
              target="_blank"
              >{{ $t('layout.rcso') }}</a
            >
          </span>
        </div>
        <span>{{ title }} &copy; {{ new Date().getFullYear() }}</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      title: 'VASCO'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usertoken')
      this.$router.push(this.localePath({ name: 'index' }))
    },
    goToAbout() {
      this.$router.push(this.localePath({ name: 'about' }))
    },
    goHome() {
      try {
        if (localStorage.getItem('usertoken') !== null) {
          this.$router.push(this.localePath({ name: 'import' }))
        } else {
          this.$router.push(this.localePath({ name: 'index' }))
        }
      } catch {
        this.$router.push(this.localePath({ name: 'index' }))
      }
    },
    goToPanel() {
      this.$router.push(this.localePath({ name: 'panel' }))
    },
    goToSettings() {
      this.$router.push(this.localePath({ name: 'settings' }))
    }
  }
}
</script>

<style>
.v-application {
  font-family: 'Montserrat', sans-serif;
}

.v-application button {
  letter-spacing: normal;
  font-weight: 900;
}

.footer-margin {
  padding: 1em 3em 0.5em 3em;
}

.rcso {
  font-size: 0.8em;
}
</style>
