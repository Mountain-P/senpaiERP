<template>
  <v-container>
    <v-data-table :headers="headers" :items="contents" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>帳戶列表</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- 新增/編輯 對話視窗 -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="openDialogButton">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="openDialogButton.attrs"
                v-on="openDialogButton.on"
              >
                新增帳戶
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="帳戶名稱"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.accountNumber"
                        label="帳戶號碼"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.description"
                        label="備註"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.type"
                        label="帳戶類型"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        v-model="editedItem.balence"
                        label="帳戶餘額"
                        disabled
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >取消</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >確定</v-btn
                >
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
  </v-container>
</template>

<script>
import DatetimePicker from "@/components/DateTimePicker/DateTimePicker.vue";
export default {
  name: "accountTables",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "帳戶名稱", value: "name" },
        { text: "帳戶號碼", value: "accountNumber" },
        { text: "帳戶備註", value: "description" },
        { text: "帳戶類型", value: "type" }, //資產 or 負債
        { text: "目前餘額", value: "balence" },
      ],
      contents: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        accountNumber: "",
        description: "",
        type: "",
        balence: "",
      },
      defaultItem: {
        name: "",
        accountNumber: "",
        description: "",
        type: "",
        balence: "",
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
      return this.editedIndex === -1 ? "新增帳戶" : "編輯帳戶";
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
<style lang="scss"></style>
