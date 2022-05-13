<template>
  <v-app>
    <v-container fluid fill-height id="login-page">
      <v-layout align-center justify-center>
        <v-flex :style="{ 'max-width': '400px' }">
          <v-card>
            <v-card-text>
              <div class="text-center mb-4">
                <img src="../..//assets/senpai_logo.png" />
                <v-divider></v-divider>
                <p class="h2">學長映像管理系統</p>
              </div>
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
#login-page {
  background-color: #d0d6b6d0;
}
</style>
