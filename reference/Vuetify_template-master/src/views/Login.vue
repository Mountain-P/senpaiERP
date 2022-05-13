<template>
  <v-app id="login" class="secondary">
    <v-main>
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <v-card class="elevation-1 pa-7">
            <v-card-text>
              <div class="text-center">
                <h1 class="primary--text">Login Form</h1>
              </div>
            </v-card-text>
            <v-btn @click="goToHome()">Back to home</v-btn>
          </v-card>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    }
  }
};
</script>
