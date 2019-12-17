<template>
  <div>
    <br />
    <v-card-title v-text="$t('settings.password.title')"></v-card-title>
    <v-form v-model="valid">
      <v-card-text>
        <v-row>
          <v-text-field
            v-model="form.oldpsw"
            :label="$t('settings.password.oldpsw')"
            :rules="passwordRules"
            :type="showpsw.oldpsw ? 'text' : 'password'"
            :append-icon="showpsw.oldpsw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (showpsw.oldpsw = !showpsw.oldpsw)"
            class="col-md-7 col-xs-12"
          ></v-text-field>
          <v-text-field
            v-model="form.newpsw"
            :label="$t('settings.password.newpsw')"
            :rules="passwordRules"
            :type="showpsw.newpsw ? 'text' : 'password'"
            :append-icon="showpsw.newpsw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (showpsw.newpsw = !showpsw.newpsw)"
            class="col-md-7 col-xs-12"
          ></v-text-field>
          <v-text-field
            v-model="form.confirmpsw"
            :label="$t('settings.password.confirmpsw')"
            :rules="checkPasswordRules"
            :type="showpsw.confirmpsw ? 'text' : 'password'"
            :append-icon="showpsw.confirmpsw ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (showpsw.confirmpsw = !showpsw.confirmpsw)"
            class="col-md-7 col-xs-12"
          ></v-text-field>
        </v-row>
        <v-btn v-if="valid" @click="savePassword()" outlined large color="green"
          ><v-icon>mdi-content-save-outline</v-icon>
          {{ $t('settings.save') }}</v-btn
        >
      </v-card-text>
    </v-form>
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
    passwordRules: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      form: {
        oldpsw: null,
        newpsw: null,
        confirmpsw: null
      },
      showpsw: {
        oldpsw: false,
        newpsw: false,
        confirmpsw: false
      },
      valid: false,
      checkPasswordRules: [
        (v) =>
          (this.form.newpsw === this.form.confirmpsw && !!v) ||
          this.$t('index.error.not_corresponding')
      ]
    }
  },
  methods: {
    resetPasswordForm() {
      this.form.oldpsw = ''
      this.form.newpsw = ''
      this.form.confirmpsw = ''
    },
    async savePassword() {
      await axios
        .put(`/users`, {
          id: this.user.id,
          oldpassword: this.form.oldpsw,
          newpassword: this.form.newpsw
        })
        .then((res) => {
          this.$emit('refresh', res)
          this.$toast.success(this.$t('settings.toast_saved'))
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
          this.resetPasswordForm()
          this.$toast.error(this.$t('settings.toast_error'))
        })
    }
  }
}
</script>
