<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="headline">{{
        $t('settings.account.delete')
      }}</v-card-title>
      <v-form v-model="valid">
        <v-card-text>
          <p v-html="$t('settings.account.delete_disclaimer')"></p>
          <v-text-field
            v-model="form.password"
            :label="$t('settings.account.password')"
            :rules="passwordRules"
            :type="showpsw ? 'text' : 'password'"
            :append-icon="showpsw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (showpsw = !showpsw)"
            class="col-12"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn @click="close" color="grey lighten-3" outlined>
            {{ $t('settings.account.delete_cancel') }}
          </v-btn>
          <v-btn
            v-if="valid"
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
</template>
<script>
import axios from '~/plugins/axios'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: null
    },
    passwordRules: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      valid: false,
      showpsw: false,
      form: {
        password: ''
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async deleteAccount() {
      await axios
        .delete(`/users?id=${this.user.id}&password=${this.form.password}`)
        .then(() => {
          localStorage.removeItem('usertoken')
          this.$router.push(this.localePath({ name: 'index' }))
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.form.password = ''
          this.$toast.error(this.$t('settings.account.toast_error'))
        })
    }
  }
}
</script>
