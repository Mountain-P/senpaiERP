<template>
  <v-container>
    <v-data-table :headers="headers" :items="contents" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>專案列表</v-toolbar-title>
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
                新增專案
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
                        :value="statustoText(editedItem.status)"
                        disabled
                        label="狀態"
                      ></v-text-field
                    ></v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.serialNum"
                        disabled
                        label="序號(自動產生)"
                      ></v-text-field
                    ></v-col>

                    <v-col cols="12" sm="12" md="12">
                      <datetime-picker
                        label="選擇開始日期時間"
                        v-model="editedItem.datetime"
                      >
                      </datetime-picker>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="專案名稱"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="editedItem.client"
                        label="客戶名稱"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.discroption"
                        label="描述"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-checkbox
                        v-model="editedItem.quotationFilePath"
                        label="報價單"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-checkbox
                        v-model="editedItem.contract"
                        label="合約"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.receivable"
                        label="應收款項"
                      ></v-text-field>
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
          <!-- 專案動作 視窗 -->
          <v-dialog v-model="dialogAction" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">專案動作</v-card-title>
              <v-card-text>
                <p class="text-left">更改專案狀態</p>
                <v-btn-toggle v-model="editedItem.status" borderless>
                  <v-btn :value="0">
                    <span class="hidden-sm-and-down">報價</span>

                    <v-icon right> mdi-cash-100 </v-icon>
                  </v-btn>
                  <v-btn :value="1">
                    <span class="hidden-sm-and-down">執行中</span>

                    <v-icon right> mdi-camera </v-icon>
                  </v-btn>
                  <v-btn :value="2">
                    <span class="hidden-sm-and-down">結案</span>
                    <v-icon right> mdi-package-variant-closed </v-icon>
                  </v-btn>
                  <v-btn :value="3">
                    <span class="hidden-sm-and-down">未執行</span>
                    <v-icon right> mdi-close-box </v-icon>
                  </v-btn>
                </v-btn-toggle>
                <v-divider></v-divider>
                <p class="text-left">付款紀錄</p>
                <v-data-table
                  :headers="paymentHeader"
                  :items="editedItem.paymentArray"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
                <br />
                <!-- 新增付款紀錄視窗 -->
                <v-dialog v-model="dialogPay" max-width="500px">
                  <template v-slot:activator="openPayDialogButton">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="openPayDialogButton.attrs"
                      v-on="openPayDialogButton.on"
                    >
                      新增付款紀錄
                    </v-btn>
                  </template>
                  <v-card>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <p class="text-left">付款方式</p>
                          <v-btn-toggle v-model="editedPayItem.payType">
                            <v-btn value="現金"> 現金 </v-btn>
                            <v-btn value="匯款"> 匯款 </v-btn>
                          </v-btn-toggle>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedPayItem.payAmount"
                            label="付款金額"
                          ></v-text-field
                        ></v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="editedPayItem.payAccount"
                            label="付款帳戶"
                          ></v-text-field
                        ></v-col>
                      </v-row>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closePay"
                          >取消</v-btn
                        >
                        <v-btn color="blue darken-1" text @click="savePay"
                          >確定</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-container>
                  </v-card>
                </v-dialog>
                <!-- 新增付款紀錄視窗 -->
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAction"
                  >取消</v-btn
                >
                <v-btn color="blue darken-1" text @click="save">確定</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- 專案動作 視窗 -->
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-btn elevation="2" @click="actionItem(item)">功能選單</v-btn>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ statustoText(item.status) }}
      </template>
      <template v-slot:[`item.quotation`]="{ item }">
        {{ turefalsetoText(item.quotation) }}
      </template>
      <template v-slot:[`item.contract`]="{ item }">
        {{ turefalsetoText(item.contract) }}
      </template>
      <template v-slot:[`item.datetime`]="{ item }">
        {{ item.datetime | moment("YYYY-MM-DD") }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import DatetimePicker from "@/components/DateTimePicker/DateTimePicker.vue";

export default {
  name: "projectManageTables",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogAction: false,
      dialogPay: false,
      headers: [
        { text: "狀態", value: "status" }, //0提案 1執行 2結案 3未執行
        { text: "序號", value: "serialNum" },
        { text: "日期", value: "datetime" },
        { text: "專案名稱", value: "name" },
        { text: "客戶名稱", value: "client" },
        { text: "報價單", value: "quotation" },
        { text: "合約", value: "contract" },
        { text: "應收款項", value: "receivable" },
        { text: "功能", value: "action" },
        { text: "動作", value: "actions" },
      ],
      paymentHeader: [
        { text: "匯款方式", value: "payType" },
        { text: "匯款金額", value: "payAmount" },
        { text: "匯款帳號", value: "payAccount" },
      ],
      contents: [],
      editedIndex: -1,
      editedItem: {
        stauts: "",
        serialNum: "",
        datetime: "",
        name: "",
        client: "",
        discription: "",
        quotation: "",
        contract: "",
        receivable: "",
        paymentArray: [],
      },
      defaultItem: {
        stauts: "",
        serialNum: "",
        datetime: "",
        name: "",
        client: "",
        discription: "",
        quotation: "",
        contract: "",
        receivable: "",
        paymentArray: [], //[payAmount:0,payType:(匯款,現金),payAccount:id,accountingId:id]
      },
      editedPayItem: {
        payAmount: null,
        payType: "(匯款,現金)",
        payAccount: null,
        accountingId: null,
      },
      defaultPayItem: {
        payAmount: null,
        payType: "(匯款,現金)",
        payAccount: null,
        accountingId: null,
      },
    };
  },
  components: { DatetimePicker },
  methods: {
    //初始化表格 Pull data from API
    initialize() {
      this.contents = [
        {
          status: 0,
          serialNum: "1",
          datetime: new Date(),
          name: "專案名稱",
          client: "客戶名稱",
          discription: "描述",
          quotation: false,
          contract: false,
          receivable: 0,
          paymentArray: [],
        },
      ];
    },
    //功能選單動作
    actionItem(item) {
      this.editedIndex = this.contents.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogAction = true;
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
    //關閉刪除動作視窗動作
    closeAction() {
      this.dialogAction = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    //關閉刪除新增付款紀錄視窗動作
    closePay() {
      this.dialogPay = false;
      this.$nextTick(() => {
        this.editedPayItem = Object.assign({}, this.defaultPayItem);
      });
    },
    //儲存按鈕動作
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.contents[this.editedIndex], this.editedItem);
      } else {
        this.contents.push(this.editedItem);
      }
      this.close();
      this.closeAction();
    },
    //儲存新增付款紀錄按鈕
    savePay() {
      this.contents[this.editedIndex].paymentArray.push(this.editedPayItem);
      this.closePay();
    },
    //轉換支出收入數值to文字
    statustoText(status) {
      if (status == 0) {
        return "報價";
      } else if (status == 1) {
        return "執行中";
      } else if (status == 2) {
        return "結案";
      } else if (status == 3) {
        return "未執行";
      }
    },
    turefalsetoText(value) {
      if (value) {
        return "已完成";
      } else {
        return "尚未完成";
      }
    },
  },
  computed: {
    //結合
    formTitle() {
      return this.editedIndex === -1 ? "新增記帳" : "編輯記帳";
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
    dialogAction(val) {
      val || this.closeAction();
    },
    dialogPay(val) {
      val || this.closePay();
    },
  },
  created() {
    //當本頁面加載 執行初始化
    this.initialize();
  },
};
</script>
<style lang="scss"></style>
