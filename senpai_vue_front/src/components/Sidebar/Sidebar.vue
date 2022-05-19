<template>
  <v-navigation-drawer
    app
    clipped
    v-model="DRAWER_STATE"
    :mini-variant="!DRAWER_STATE"
    :width="sidebarWidth"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :temporary="$vuetify.breakpoint.smAndDown"
    :mini-variant-width="sidebarMinWidth"
    :class="{ 'drawer-mini': !DRAWER_STATE }"
  >
    <v-list>
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="item.heading" align="center">
          <v-col cols="6" class="py-5">
            <span
              style="padding-left: 32px"
              class="text-body-1 subheader"
              :class="item.heading && DRAWER_STATE ? 'show ' : 'hide'"
            >
              {{ item.heading }}
            </span>
          </v-col>
          <v-col cols="6" class="text-center"> </v-col>
        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-1"
        ></v-divider>
        <v-list-group
          color="primary"
          v-else-if="item.children"
          :key="item.title"
          v-model="item.model"
          append-icon=""
        >
          <template v-slot:prependIcon>
            <v-icon size="28">{{ item.icon }}</v-icon>
          </template>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            :to="child.link"
            link
          >
            <v-list-item-action v-if="child.icon">
              <v-icon size="">{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ child.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          color="primary"
          v-else
          :key="item.text"
          :href="item.href ? item.href : null"
          :to="item.link === '#' ? null : item.link"
          link
          style=""
        >
          <v-list-item-action>
            <v-icon size="28" :color="item.color ? item.color : ''">{{
              item.icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text" link>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    source: String,
  },
  data() {
    return {
      items: [
        { title: "儀錶板", icon: "mdi-home", link: "/dashboard" },
        { divider: true },
        {
          title: "會計功能",
          icon: "mdi-account-cash",
          link: "/accounting",
          children: [
            {
              title: "記帳列表",
              icon: "mdi-cash-fast",
              link: "/accounting/tables",
            },
            {
              title: "帳戶管理",
              icon: "mdi-cash-fast",
              link: "/accounting/accounts",
            },
            {
              title: "分類管理",
              icon: "mdi-cash-fast",
              link: "/accounting/categorys",
            },

            {
              title: "財務報表",
              icon: "mdi-note-text",
              link: "/accounting/charts",
            },
          ],
        },
        { divider: true },
        {
          title: "專案管理",
          icon: "mdi-newspaper-variant-outline",
          link: "/projectManage",
          children: [
            {
              title: "專案列表",
              icon: "mdi-playlist-edit",
              link: "/projectManage/tables",
            },
            {
              title: "專案報表",
              icon: "mdi-note-text",
              link: "/projectManage/charts",
            },
          ],
        },
        { divider: true },
        {
          title: "員工管理",
          icon: "mdi-account",
          link: "/employeeManage",
          children: [
            {
              title: "員工列表",
              icon: "mdi-format-list-bulleted",
              link: "/employeeManage/tables",
            },
            {
              title: "PT員工列表",
              icon: "mdi-format-list-bulleted-type",
              link: "/employeeManage/PTTables",
            },
            {
              title: "薪資管理",
              icon: "mdi-account-cash",
              link: "/employeeManage/salary",
            },
            {
              title: "出班記錄",
              icon: "mdi-account-hard-hat",
              link: "/employeeManage/shift",
            },
            {
              title: "薪資報表",
              icon: "mdi-note-text",
              link: "/employeeManage/charts",
            },
          ],
        },
        { divider: true },
        {
          title: "器材管理",
          icon: "mdi-hammer-screwdriver",
          link: "/equipmentManage",
          children: [
            {
              title: "器材列表",
              icon: "mdi-format-list-bulleted",
              link: "/equipmentManage/tables",
            },
            {
              title: "器材使用紀錄",
              icon: "mdi-clipboard-text-clock",
              link: "/equipmentManage/usage",
            },
            {
              title: "器材行事曆",
              icon: "mdi-calendar",
              link: "/equipmentManage/calendar",
            },
          ],
        },
        { divider: true },
        {
          title: "客戶管理",
          icon: "mdi-hammer-screwdriver",
          link: "/clientManage",
          children: [
            {
              title: "客戶列表",
              icon: "mdi-format-list-bulleted",
              link: "/clientManage/tables",
            },
          ],
        },
        { divider: true },
        { title: "行事曆", icon: "mdi-calendar", link: "/calendar" },
      ],
      sidebarWidth: 240,
      sidebarMinWidth: 96,
    };
  },
  computed: {
    ...mapState(["drawer"]),
    DRAWER_STATE: {
      get() {
        return this.drawer;
      },
      set(newValue) {
        if (newValue === this.drawer) return;
        this.TOGGLE_DRAWER();
      },
    },
  },
  methods: {
    ...mapActions(["TOGGLE_DRAWER"]),
  },
};
</script>

<style lang="scss" scoped>
.v-list-item {
  // padding-left: 30px;
}
.v-list-group__header {
  font-size: 1.5rem;
}
.v-list-item-child {
  font-size: 1rem;
}
.nav a {
  font-weight: unset;
}
</style>
