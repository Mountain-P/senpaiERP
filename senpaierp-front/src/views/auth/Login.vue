<template>
  <v-form ref="form" @submit.prevent="validate">
    <v-text-field
      label="帳號"
      prepend-icon="mdi-account"
      v-model="form.username"
      required
      :error-messages="errorMessages.email"
    ></v-text-field>

    <v-text-field
      label="密碼"
      prepend-icon="mdi-lock"
      type="password"
      v-model="form.password"
      required
    ></v-text-field>

    <div class="text-center">
      <v-btn :loading="loading" color="primary" large type="submit" text rounded
        >登入</v-btn
      >
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      errorMessages: {},
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async validate() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        await this.login(this.form);
        this.loading = false;
      }
    },
  },
};
</script>
