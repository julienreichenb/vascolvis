<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          label="Rechercher..."
          single-line
          hide-details
        ></v-text-field>
        <v-checkbox
          v-if="type === 'charts'"
          v-model="onlyMine"
          flat
          label="Mes graphs uniquement"
          color="blue lighten-2"
        ></v-checkbox>
      </v-card-title>
      <v-card-subtitle
        v-if="type === 'charts' || type === 'datasets'"
        class="mt-1"
      >
        <div class="help">
          <v-icon small color="blue">mdi-help-circle-outline</v-icon> Vous
          pouvez éditer le nom de vos
          <strong>{{
            type === 'charts' ? 'graphiques' : 'jeux de données'
          }}</strong>
          en cliquant sur le champ, puis en sauvegardant.
        </div>
      </v-card-subtitle>
      <v-data-table
        :headers="headers"
        :items="filterGraphs"
        item-key="name"
        :search="search"
        :footer-props="{
          'items-per-page-options': [5]
        }"
        items-per-page="5"
      >
        <template v-slot:item.name="props">
          <v-edit-dialog :return-value.sync="props.item.name">
            {{ props.item.name }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.name"
                single-line
                :rules="[max40chars]"
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.id_user="{ item }">
          <span>{{ getUsername(item) }}</span>
        </template>
        <template v-slot:item.url="{ item }">
          <a @click="goToItem(item)">{{ item.url }}</a>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="goToItem(item)">
            mdi-eye-outline
          </v-icon>
          <v-icon
            v-if="user.id === item.id_user"
            color="green lighten-1"
            @click="editItem(item)"
          >
            mdi-content-save-outline
          </v-icon>
          <v-icon
            v-if="user.id === item.id_user"
            color="red"
            @click="deleteItem(item)"
          >
            mdi-trash-can-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    user: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    headers: {
      type: Array,
      default: null
    },
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      max40chars: (v) => v.length <= 40 || 'Nom trop long',
      onlyMine: false,
      usernames: [],
      search: ''
    }
  },
  computed: {
    filterGraphs() {
      if (this.onlyMine) {
        return this.data.filter((entry) => entry.id_user === this.user.id)
      } else {
        return this.data
      }
    }
  },
  async created() {
    for (let i = 0; i < this.data.length; i++) {
      await axios.get(`/users?id=${this.data[i].id_user}`).then((res) => {
        if (this.usernames.filter((u) => u.id === res.data.id).length < 1) {
          this.usernames.push({ id: res.data.id, username: res.data.username })
        }
      })
    }
  },
  methods: {
    getUsername(item) {
      const id = item.id_user
      for (let i = 0; i < this.usernames.length; i++) {
        if (this.usernames[i].id === id) {
          return this.usernames[i].username
        }
      }
    },
    /*
     ** Buttons methods
     */
    goToItem(item) {
      switch (this.type) {
        case 'datasets':
          this.$router.push({
            name: 'graphs',
            params: { idset: item.id }
          })
          break
        case 'charts':
          this.$router.push({
            name: 'analyze',
            params: { idgraph: item.id }
          })
          break
        case 'annotations':
          break
        default:
          break
      }
    },
    async editItem(item) {
      await axios
        .put(`/${this.type}?id=${item.id}&name=${item.name}`)
        .then((res) => {
          this.$toast.success(item.name + ' a été renommé avec succès.')
        })
    },
    async deleteItem(item) {
      await axios.delete(`/${this.type}?id=${item.id}`).then((res) => {
        this.$toast.success(item.name + ' supprimé avec succès.')
        this.$emit('refresh')
      })
    }
  }
}
</script>
<style>
.help {
  font-size: smaller;
  color: lightgray;
}
</style>
