<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          :label="this.$t('panel.table.search')"
          single-line
          hide-details
        ></v-text-field>
        <v-checkbox
          v-if="type === 'charts'"
          v-model="onlyMine"
          :label="this.$t('panel.table.mine_only')"
          flat
          color="blue lighten-2"
        ></v-checkbox>
      </v-card-title>
      <v-card-subtitle
        v-if="type === 'charts' || type === 'datasets'"
        class="mt-1"
      >
      </v-card-subtitle>
      <v-data-table
        :headers="headers"
        :items="filterGraphs"
        :search="search"
        :footer-props="{
          'items-per-page-options': [parseInt('5', 10)]
        }"
        :items-per-page="parseInt('5', 10)"
        item-key="id"
      >
        <template v-slot:item.id_user="{ item }">
          <span
            ><a
              :class="isDeleted(item) ? 'deleted' : 'link'"
              @click="goToProfile(item)"
              >{{ getUsername(item) }}</a
            ></span
          >
        </template>
        <template v-slot:item.public="{ item }">
          <v-icon
            v-if="isOwner(item)"
            :color="item.public === 1 ? 'green lighten-1' : 'red lighten-1'"
            @click="item.public ? updateChart(item, 0) : updateChart(item, 1)"
            small
            >{{ setVisibilityIcon(item) }}</v-icon
          >
        </template>
        <template v-slot:item.url="{ item }">
          <span>
            <a @click="goToItem(item)" class="link">{{ item.url }}</a>
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon @click="goToItem(item)">
            mdi-eye-outline
          </v-icon>
          <v-icon
            v-if="isOwner(item)"
            @click="toggleDeleteDialog(item)"
            color="red"
          >
            mdi-trash-can-outline
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline"
          >{{ $t('panel.table.delete') }} {{ selected.name }} ?</v-card-title
        >
        <v-card-text>
          {{ $t('panel.table.delete_disclaimer') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="deleteDialog = false" color="grey lighten-3" outlined>
            {{ $t('panel.table.delete_cancel') }}
          </v-btn>
          <v-btn @click="deleteItem()" color="red darken-2" outlined>
            {{ $t('panel.table.delete_ok') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
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
    },
    names: {
      optional: true,
      type: Array,
      default: null
    }
  },
  data() {
    return {
      onlyMine: false,
      deleteDialog: false,
      selected: { name: '' },
      search: ''
    }
  },
  computed: {
    filterGraphs() {
      if (this.onlyMine) {
        return this.data.filter((entry) => entry.id_user === this.user.id)
      } else {
        return this.data.filter(
          (entry) => entry.public === 1 || entry.id_user === this.user.id
        )
      }
    }
  },
  methods: {
    getUsername(item) {
      const id = item.id_user
      for (let i = 0; i < this.names.length; i++) {
        if (this.names[i].id === id) {
          return this.names[i].publicname
            ? this.names[i].publicname
            : this.names[i].username
        }
      }
      return this.$t('panel.deleted_account')
    },
    setVisibilityIcon(item) {
      return item.public === 1
        ? 'mdi-lock-open-variant-outline'
        : 'mdi-lock-outline'
    },
    /*
     ** Buttons methods
     */
    goToItem(item) {
      switch (this.type) {
        case 'datasets':
          this.$router.push({
            name: `data-id___${this.$i18n.locale}`,
            params: { id: item.id }
          })
          break
        case 'charts':
          this.$router.push({
            name: `graph-url___${this.$i18n.locale}`,
            params: { url: item.url }
          })
          break
        case 'annotations':
          break
        default:
          break
      }
    },
    goToProfile(item) {
      if (!this.isDeleted(item)) {
        const id = item.id_user
        this.$router.push({
          name: `user-id___${this.$i18n.locale}`,
          params: { id }
        })
      }
    },
    isOwner(item) {
      return item.id_user === this.user.id
    },
    isDeleted(item) {
      return this.getUsername(item) === this.$t('panel.deleted_account')
    },
    toggleDeleteDialog(item) {
      this.deleteDialog = true
      this.selected = item
    },
    async deleteItem() {
      const item = this.selected
      this.deleteDialog = false
      await axios.delete(`/${this.type}?id=${item.id}`).then((res) => {
        this.$toast.success(item.name + this.$t('panel.table.toast_deleted'))
        this.$emit('refresh')
      })
    },
    async updateChart(item, bool) {
      await axios
        .put(`/charts?id=${item.id}&public=${bool}`)
        .then((res) => {
          this.data.filter((i) => i.id === item.id)[0].public = res.data.public
          let msg = ''
          bool === 1
            ? (msg = this.$t('url.msg_public'))
            : (msg = this.$t('url.msg_private'))
          this.$toast.success(msg)
        })
        .catch((err) => {
          alert(err)
        })
    }
  }
}
</script>
<style scoped>
.link {
  color: cornflowerblue !important;
}
.deleted {
  color: lightgray !important;
  font-style: italic;
}
</style>
