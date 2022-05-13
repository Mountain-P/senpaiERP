<template>
  <v-container fluid>
    <div class="dashboard-page">
      <v-row>
        <v-col lg="12" sm="12" md="12" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>快速功能</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-row no-gutters class="justify-space-between pb-3">
                <v-col cols="3">
                  <v-btn depressed color="primary"> 快速記帳 </v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed color="primary"> 專案管理 </v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed color="primary"> 會計報表 </v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn depressed color="primary"> ?? </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="6" sm="12" md="12" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>目前執行專案</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-list-item-group
                v-model="nowProjectCard.selected"
                color="primary"
              >
                <v-list-item v-for="(item, i) in nowProjectCard.items" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col lg="6" sm="12" md="12" cols="12">
          <v-card class="mx-1 mb-1">
            <v-card-title class="pa-6 pb-3">
              <p>注意事項</p>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text class="pa-6 pt-0">
              <v-list-item-group v-model="noticeCard.selected" color="primary">
                <v-list-item v-for="(item, i) in noticeCard.items" :key="i">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "dashBoardView",
  components: {},
  data() {
    return {
      nowProjectCard: {
        selected: 1,
        items: [
          { text: "Real-Time", icon: "mdi-clock" },
          { text: "Audience", icon: "mdi-account" },
          { text: "Conversions", icon: "mdi-flag" },
        ],
      },
      noticeCard: {
        selected: 1,
        items: [
          { text: "Real-Time", icon: "mdi-clock" },
          { text: "Audience", icon: "mdi-account" },
          { text: "Conversions", icon: "mdi-flag" },
        ],
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss"></style>
