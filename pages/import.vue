<template>
  <div>
    <v-container fluid fill-height>
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 elevation-6>
          <v-toolbar class="indigo darken-3">
            <v-toolbar-title
              v-text="this.$t('import.own.header')"
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
              <v-tab> {{ $t('import.own.label') }} </v-tab>
              <v-tab-item>
                <ImportOwn :user="user"></ImportOwn>
              </v-tab-item>
              <v-tab> {{ $t('import.howitworks.header') }} </v-tab>
              <v-tab-item>
                <ImportInfo></ImportInfo>
              </v-tab-item>
              <v-tab> {{ $t('import.sample.header') }} </v-tab>
              <v-tab-item>
                <ImportSample @generate="generateSampleGraph"></ImportSample>
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
import ImportOwn from '~/components/import/ImportOwn'
import ImportInfo from '~/components/import/ImportInfo'
import ImportSample from '~/components/import/ImportSample'
export default {
  head() {
    return {
      title: this.$t('title.import'),
      meta: [
        {
          hid: 'import'
        }
      ]
    }
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  components: {
    ImportOwn,
    ImportInfo,
    ImportSample
  },
  data() {
    return {
      user: null,
      sampleDataSet: null
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push(this.localePath({ name: 'index' }))
    }
  },
  methods: {
    generateSampleGraph() {
      this.$router.push({
        name: `data-id___${this.$i18n.locale}`,
        params: { id: 1 }
      })
    }
  }
}
</script>

<style scoped>
b {
  color: white;
}
</style>
