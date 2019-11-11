<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-btn icon @click.stop="goHome()">
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-toolbar-title @click.stop="goHome()" v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="goToPanel()">
        <v-icon>mdi-solar-panel</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn icon @click.stop="goToAbout()">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
      <v-btn icon @click.stop="logout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app class="footer-margin">
      <v-layout justify-space-between align-center>
        <a href="https://hes-so.ch" target="_blank">
          <img
            src="../static/hessologo.png"
            alt=""
            style="height: 50px; width: auto;"
          />
        </a>
        <span>VASCO &copy; 2019</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'VASCO'
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('usertoken')
      this.$router.push({ name: 'index' })
    },
    goToAbout() {
      this.$router.push({ name: 'about' })
    },
    goHome() {
      try {
        if (localStorage.getItem('usertoken') !== null) {
          this.$router.push({ name: 'import' })
        } else {
          this.$router.push({ name: 'index' })
        }
      } catch {
        this.$router.push({ name: 'index' })
      }
    },
    goToPanel() {
      this.$router.push({ name: 'panel' })
    }
  }
}
</script>

<style>
.footer-margin {
  padding: 1em 3em 0.5em 3em;
}
</style>
