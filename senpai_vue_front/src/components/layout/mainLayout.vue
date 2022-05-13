<template>
  <v-app class="pa-6">
    <Sidebar />
    <Header />
    <v-main class="content">
      <router-view />
      <!-- <Footer /> -->
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
// import Footer from "@/components/Footer/Footer";
export default {
  name: "mainLayout",
  components: { Header, Sidebar },
};
</script>

<style lang="scss">
.v-main__wrap {
  padding: 70px 0px 0px 0px;
}
.v-navigation-drawer {
  padding: 70px 0px 0px 0px;
}
.content {
  background-color: #f6f7ff;
}
</style>
