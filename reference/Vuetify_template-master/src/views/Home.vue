<template>
  <div>
    <v-container fluid class="grey lighten-5 mb-6 fluid container-height" :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'px-6' ">
      <h3 class="mt-4 ">Dashboard</h3>
      <v-row justify="center " align="center " class="mb-8 mt-8 ">
        <v-col cols="12 " xs="12 " sm="3 " class=" ">
          <v-card class="widget-card " height="108 ">
            <div class="widget-left ">
              <div class="card-body ">
                <v-avatar tile>
                  <img alt="user " src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg ">
                </v-avatar>
              </div>
            </div>
            <div class="widget-right ">
              <div class="card-body ">
                <h2 class="body-num ">166</h2>
                <span class="body-text ">Projects</span>
              </div>

            </div>
          </v-card>

        </v-col>
        <v-col cols="12 " xs="12 " sm="3 " class=" ">
          <v-card class="widget-card " height="108 ">
            <div class="widget-left ">
              <div class="card-body ">
                <v-avatar tile>
                  <img alt="user " src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg ">
                </v-avatar>
              </div>
            </div>
            <div class="widget-right ">
              <div class="card-body ">
                <h2 class="body-num ">166</h2>
                <span class="body-text ">Clients</span>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12 " xs="12 " sm="3 " class=" ">
          <v-card class="widget-card " height="108 ">
            <div class="widget-left ">
              <div class="card-body ">
                <v-avatar tile>
                  <img alt="user " src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg ">
                </v-avatar>
              </div>
            </div>
            <div class="widget-right ">
              <div class="card-body ">
                <h2 class="body-num ">166</h2>
                <span class="body-text ">Employees</span>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12 " xs="12 " sm="3 " class=" ">
          <v-card class="widget-card " height="108 ">
            <div class="widget-left ">
              <div class="card-body ">
                <v-avatar tile>
                  <img alt="user " src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg ">
                </v-avatar>
              </div>
            </div>
            <div class="widget-right ">
              <div class="card-body ">
                <h2 class="body-num ">166</h2>
                <span class="body-text ">Tasks</span>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center " align="center " class="mb-8 mt-8 ">
        <v-col cols="12 " xs="12 " sm="4" class=" ">
          <v-card class="mx-auto" height="400" max-width="350">
            111111
          </v-card>
        </v-col>
        <v-col cols="12 " xs="12 " sm="4" class=" ">
          <v-card class="mx-auto" height="400" max-width="350">
            111111
          </v-card>
        </v-col>
        <v-col cols="12 " xs="12 " sm="4" class=" ">
          <v-card class="mx-auto" height="400" max-width="350">
            111111
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.widget-card {
  border: 1px solid #ededed;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
  border-radius: 0.25rem;
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center; /* Align Items Vertically */
  justify-content: space-between; /* Align Items Horizontally */
  background-color: #ffff;
  padding: 10px;
}

.card-body {
  margin: 0 5px;
  padding: 0 5px;
  /* font-size: 30px; */
  color: #000;
  /* line-height: 36px; */
}

.body-num {
  font-size: 30px;
  line-height: 36px;
}

.body-text {
  font-size: 16px;
  line-height: 30px;
}

.container-height {
  height: 100vh !important;
}
</style>
