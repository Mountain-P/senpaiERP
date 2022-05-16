<template>
  <v-card>
    <v-card-text>
      <div class="text-center mb-4">
        <img src="../assets/senpai_logo.png" />
        <v-divider></v-divider>
        <p class="h2">學長映像管理系統</p>
      </div>
      <v-form>
        <v-col>
          <v-text-field
            v-model="loginForm.username"
            value=""
            label="帳號"
            hint="請輸入帳號"
            required
          ></v-text-field>
          <v-text-field
            v-model="loginForm.password"
            type="password"
            label="密碼"
            hint="請輸入密碼"
            required
          ></v-text-field>
        </v-col>
        <v-col class="text-center">
          <v-btn
            class="text-capitalize"
            large
            :disabled="
              loginForm.username.length === 0 || loginForm.password.length === 0
            "
            color="primary"
            @click="login"
          >
            登入</v-btn
          >
        </v-col>
      </v-form>

      <div class="primary--text">
        <a href="https://senpai.tw/" class="text-decoration-none">學長映像</a>
        © 2022
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        passowrd: "",
      },
    };
  },
  methods: {
    login() {
      window.localStorage.setItem("authenticated", true);
      this.$router.push("/dashboard");
    },
  },
  created() {
    if (window.localStorage.getItem("authenticated") === "true") {
      this.$router.push("/dashboard");
    }
  },
};
</script>
<style lang="scss"></style>
