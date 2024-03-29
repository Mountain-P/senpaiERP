<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="2">
        <v-card class="mx-auto" max-width="300" tile>
          <v-list flat>
            <v-subheader>員工清單</v-subheader>
            <v-list-item-group v-model="employeeSel" color="primary">
              <v-list-item v-for="(item, i) in employeeList" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col col="12" sm="12" md="10">
        <v-data-table :headers="headers" :items="contents" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>出班紀錄</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <!-- 新增/編輯 對話視窗 -->
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="openDialogButton">
                  <v-btn color="primary" dark class="mb-2" v-bind="openDialogButton.attrs" v-on="openDialogButton.on">
                    新增排班
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="editedItem.workDate" label="出班日期"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field v-model="editedItem.project" label="專案"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="12" md="6">
                          <v-text-field v-model="editedItem.name" label="人員姓名"></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="12" md="12">
                          <v-text-field v-model="editedItem.workContent" label="工作內容"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field v-model="editedItem.workSalary" label="預定工資"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field v-model="editedItem.workLocation" label="集合地點"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field v-model="editedItem.workTime" label="集合時間"></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
                    <v-btn color="blue darken-1" text @click="save"> 儲存 </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 新增/編輯 對話視窗 -->
              <!-- 刪除 對話視窗 -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">確定要刪除此項目?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">確定</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- 刪除 對話視窗 -->
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatetimePicker from "@/components/DateTimePicker/DateTimePicker.vue";
export default {
  name: "EmployeeManageTables",
  data() {
    return {
      employeeSel: null,
      employeeList: [{ text: "讀取中" }],
      dialog: false,
      dialogDelete: false,
      datePicker: false,
      headers: [
        { text: "員工名稱", value: "name" },
        { text: "專案", value: "project" },
        { text: "工作內容", value: "workContent" },
        { text: "時間", value: "time" },
      ],
      contents: [],
      editedIndex: -1,
      editedItem: {
        workDate: null,
        project: "",
        employeeId: "",
        workContent: "",
        workSalary: "",
        workLocation: "",
        workTime: "",

      },
      defaultItem: {
        workDate: null,
        project: "",
        employeeId: "",
        workContent: "",
        workSalary: "",
        workLocation: "",
        workTime: "",
      },
    };
  },
  components: { DatetimePicker },
  methods: {
    //初始化表格 Pull data from API
    initialize() {
      this.contents = [];
    },
    //編輯按鈕動作
    editItem(item) {
      this.editedIndex = this.contents.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    //刪除按鈕動作
    deleteItem(item) {
      this.editedIndex = this.contents.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    //確認刪除按鈕動作
    deleteItemConfirm() {
      this.contents.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    //關閉新增/編輯對話視窗動作
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    //關閉刪除對話視窗動作
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    //儲存按鈕動作
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.contents[this.editedIndex], this.editedItem);
      } else {
        this.contents.push(this.editedItem);
      }
      console.log(this.editedItem);
      this.close();
    },
    //轉換支出收入數值to文字
    incomeOutcometoText(incomeOutcome) {
      if (incomeOutcome) {
        return "支出";
      } else {
        return "收入";
      }
    },
  },
  computed: {
    //結合
    formTitle() {
      return this.editedIndex === -1 ? "新增排班" : "編輯排班";
    },
  },
  watch: {
    //監看 新增/編輯 對話視窗是否有被關閉
    dialog(val) {
      val || this.close();
    },
    //監看刪除對話視窗是否有被關閉
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    //當本頁面加載 執行初始化
    this.initialize();
  },
};
</script>
<style lang="scss">
</style>
