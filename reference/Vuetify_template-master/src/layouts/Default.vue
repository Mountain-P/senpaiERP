<template>
  <div>
    <nav-bar/>
    <v-container fluid class="pt-0 pb-0">
      <v-row>
        <v-col cols="12" class="pa-0 pt-0">
          <slot />
        </v-col>
      </v-row>
    </v-container>
    <side-bar/>
    <!-- <footer-bar/> -->
  </div>
</template>

<script>
import NavBar from "../components/NavBar";
// import FooterBar from "../components/FooterBar";
import SideBar from "../components/SideBar";

export default {
  name: "Default",
  components: {
    NavBar,
    // FooterBar,
    SideBar
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
.navbar {
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}
</style>

