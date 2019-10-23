<template>
  <div v-if="dataset">
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-navigation-drawer
          class="grey darken-2"
          absolute
          permanent
          floating
          stateless
        >
          <v-list class="pa-2">
            <v-list-group
              v-for="item in variablesTypes"
              :key="item.name"
              v-model="item.active"
              :prepend-icon="item.icon"
              :color="item.color"
              no-action
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item v-for="subItem in item.items" :key="subItem">
                <v-list-item-content>
                  <v-list-item-title v-text="subItem"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
        <v-flex xs12 sm10 elevation-6>
          <h1>{{ dataset.name }}</h1>
          <h6 v-for="variable in variables" :key="variable">{{ variable }}</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            rutrum, tellus id lacinia facilisis, nunc dolor cursus urna, vitae
            elementum nunc elit id diam. Duis tempor est mi, in porttitor dui
            maximus non. Suspendisse metus risus, varius sed efficitur et,
            tempor quis ex. In in dui nisi. Mauris lobortis tristique fringilla.
            Quisque gravida felis ut mauris pretium, vel hendrerit turpis
            varius. Ut lectus quam, elementum quis odio ullamcorper, venenatis
            sodales odio. Mauris vestibulum est sit amet metus interdum
            venenatis. Proin sed mattis lectus. Morbi ullamcorper rhoncus diam
            eu iaculis. Nulla sed suscipit est. Sed lacinia tortor a leo pretium
            maximus. Curabitur pharetra nisl sit amet justo aliquam, id dapibus
            est congue. Morbi placerat mauris vitae mi placerat posuere.
            Praesent sed fermentum orci. Vestibulum aliquet egestas mauris.
            Quisque id mauris nec odio maximus pretium. Fusce tempor pretium
            ullamcorper. Morbi semper accumsan aliquam. Nunc nec velit
            scelerisque, interdum metus eget, dictum libero. Suspendisse a
            ornare dui. Curabitur luctus elit eu nulla facilisis, id molestie
            nulla eleifend. Aliquam erat volutpat. Cras viverra blandit elit, a
            porta quam hendrerit in. Etiam malesuada nisi a ante mollis, id
            iaculis felis lacinia. Curabitur gravida metus turpis, ac faucibus
            quam varius sit amet. Sed nisi urna, vulputate nec orci ut, pretium
            commodo ligula. Nam non convallis orci, eget auctor massa. Curabitur
            urna eros, auctor nec dignissim at, sollicitudin ac sem. Quisque ac
            nisi at mi ultrices venenatis. Proin a justo interdum, facilisis sem
            quis, hendrerit elit. Donec tristique, ante id scelerisque euismod,
            nibh ligula dictum tellus, sed placerat ipsum libero eu nibh. Nulla
            quam ipsum, rhoncus sed convallis vel, tristique vitae neque. Morbi
            gravida sodales eros eu eleifend. Nunc dapibus, metus in ultrices
            imperdiet, ante ante condimentum neque, vel faucibus est nulla a
            dui. Curabitur non mauris eget sapien mattis iaculis aliquet vel
            mauris. Sed non dapibus urna. In sed augue nisi. Nam feugiat, massa
            ac tincidunt pellentesque, est enim varius metus, id sollicitudin
            magna nisl non dui. Nam tincidunt urna eu mi laoreet, eget suscipit
            erat congue. Sed volutpat ut lacus in iaculis. Aenean non lacus ac
            massa faucibus eleifend at eu tellus. Aenean leo mauris, dapibus eu
            vestibulum tincidunt, commodo eget elit. Ut facilisis finibus
            sapien, eget molestie nisl posuere sit amet. Aenean hendrerit ligula
            massa, nec vehicula leo aliquet vitae. Morbi eget pulvinar justo.
            Curabitur convallis cursus mattis. Ut interdum porta tellus non
            tincidunt. Aenean volutpat venenatis semper. Etiam accumsan luctus
            mauris malesuada fermentum. Pellentesque nec placerat purus, et
            malesuada nulla. Nulla fringilla, mauris vel feugiat vestibulum,
            dolor nunc facilisis turpis, quis condimentum massa lacus et massa.
            Maecenas et porttitor augue. Maecenas eget eros dolor.
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import jwtDecode from 'jwt-decode'
export default {
  data() {
    return {
      dataset: null,
      json: null,
      variables: [],
      variablesTypes: [
        {
          name: 'Quantitatif',
          icon: 'mdi-numeric',
          color: 'red',
          desc: 'fournissent des données comparables sur « qui » et «combien »',
          items: []
        },
        {
          name: 'Qualitative',
          icon: 'mdi-alphabetical',
          color: 'blue',
          desc: 'représentent des catégories sans classement intrinsèque',
          items: []
        },
        {
          name: 'Temporel',
          icon: 'mdi-timer',
          color: 'yellow',
          desc: 'représentent un temps donné, date ou heure',
          items: []
        }
      ]
    }
  },
  created() {
    try {
      this.user = jwtDecode(localStorage.getItem('usertoken'))
    } catch {
      this.$router.push({ name: 'index' })
    }
    this.getDataSet()
  },
  methods: {
    async getDataSet() {
      await this.$axios
        .get('/datasets/single/?id=' + this.$route.params.idset)
        .then((res) => {
          this.dataset = res.data
          this.json = JSON.parse(this.dataset.data)
          this.variables = Object.keys(this.json[0])
          this.attributeVariablesTypes()
        })
    },
    attributeVariablesTypes() {
      for (let i = 0; i < this.variables.length; i++) {
        const random = Math.floor(Math.random() * 3)
        this.variablesTypes[random].items.push(this.variables[i])
      }
    }
  }
}
</script>
