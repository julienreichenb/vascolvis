<template>
  <div>
    <br />
    <v-card-title v-text="$t('settings.account.title')"></v-card-title>
    <v-card-text>
      <p
        v-html="
          user.defaultpublic
            ? $t('settings.account.public')
            : $t('settings.account.private')
        "
      ></p>
      <v-switch
        v-model="form.defaultpublic"
        :label="
          form.defaultpublic
            ? $t('settings.account.switch_public')
            : $t('settings.account.switch_private')
        "
        color="blue"
      ></v-switch>
      <v-btn @click="save()" outlined large color="green"
        ><v-icon>mdi-content-save-outline</v-icon>
        {{ $t('settings.save') }}</v-btn
      >
    </v-card-text>
    <br />
    <hr />
    <v-card-title v-text="$t('settings.account.title2')"></v-card-title>
    <v-card-text>
      <p>
        <v-icon color="red">mdi-alert-outline</v-icon>
        {{ $t('settings.account.delete_title') }}
      </p>
      <v-btn @click="deleteDialog = true" outlined large color="red">{{
        $t('settings.account.delete_button')
      }}</v-btn>
    </v-card-text>
    <DeleteAccountDialog
      :dialog="deleteDialog"
      :user="user"
      :password-rules="passwordRules"
      @close="deleteDialog = false"
    ></DeleteAccountDialog>
  </div>
</template>
<script>
import DeleteAccountDialog from './DeleteAccountDialog'
import axios from '~/plugins/axios'
export default {
  components: {
    DeleteAccountDialog
  },
  props: {
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
      deleteDialog: false,
      form: {
        defaultpublic: null
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.form.defaultpublic = this.user.defaultpublic
    },
    async save() {
      await axios
        .put(`/users`, {
          id: this.user.id,
          defaultpublic: this.form.defaultpublic
        })
        .then((res) => {
          this.$emit('refresh', res)
          this.$toast.success(this.$t('settings.toast_saved'))
        })
    }
  }
}
</script>
