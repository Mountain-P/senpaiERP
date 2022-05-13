<template>
  <v-app-bar flat dark fixed app class="test">
    <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
    <v-toolbar-title>My awesome App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon @click="goToLogin()">
      Login
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>

</template>

<script>
import { bus } from "../main";

export default {
  name: "NavBar",
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", view: "/" },
        { title: "About", icon: "mdi-help-box", view: "/about" }
      ],
      right: null
    };
  },
  methods: {
    toggleSidebar() {
      bus.$emit("toggleIt");
    },
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>


<style>
.test {
  background: #00c5fb;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#00c5fb),
    to(#0253cc)
  );
  background: linear-gradient(90deg, #00c5fb 0, #0253cc);
}
</style>

