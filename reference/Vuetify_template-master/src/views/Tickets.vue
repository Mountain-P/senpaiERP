<template>
  <div>
    <v-container
      fluid
      class="grey lighten-5 mb-6 fluid container-height"
      :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'px-6'"
    >
      <h3 class="mt-4">Tickets</h3>

      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :items-per-page="5"
              :headers="headers"
              :items="contracts"
              :search="search"
              class="mb-10"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status }}
                </v-chip>
              </template>
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        large
                        rounded
                        color="#fe7b5f"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon left dark>
                          mdi-plus
                        </v-icon>
                        Add New
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">Form Test Title</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6">
                              <div>Label 1</div>
                              <v-text-field
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <div>Label 2</div>
                              <v-text-field
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <div>Label 1</div>
                              <v-text-field
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                              <div>Label 2</div>
                              <v-text-field
                                outlined
                                dense
                                required
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <div>Label 3</div>
                              <v-text-field
                                outlined
                                dense
                                type="password"
                                required
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="#fe7b5f" dark @click="dialog = false">
                          Close
                        </v-btn>
                        <v-btn color="#fe7b5f" dark @click="dialog = false">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark icon v-bind="attrs" v-on="on">
                      <v-icon color="#000">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-icon small left class="mr-2">
                        mdi-pencil
                      </v-icon>
                      <a :href="item.url" target="_blank">Εμφάνιση</a>
                    </v-list-item>
                    <v-list-item>
                      <v-icon small left>
                        mdi-delete
                      </v-icon>
                      <a :href="item.url" download="mypdf">Κατέβασμα</a>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Contracts",
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        {
          text: "Κωδ. Συμβ.",
          align: "start",
          filterable: true,
          value: "name",
        },
        {
          text: "ΑΦΜ",
          value: "afm",
        },
        {
          text: "Επών.Πελάτη",
          value: "client",
        },
        {
          text: "Ασφαλιστική",
          value: "insurance",
        },
        {
          text: "Κλάδος Ασφ.",
          value: "typeinsurance",
        },
        {
          text: "Τύπος Συμβ.",
          value: "type",
        },
        {
          text: "Ημ/νία Έναρξης",
          value: "startdate",
        },
        {
          text: "Ημ/νία Λήξης",
          value: "enddate",
        },
        {
          text: "Broker",
          value: "broker",
        },
        {
          text: "Κατάσταση",
          value: "status",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      contracts: [
        {
          name: "AIG-0001",
          afm: 10562732,
          client: "Trystan Davey",
          insurance: "Interamerican",
          typeinsurance: "Υγεία",
          type: "Νέο Συμβόλαιο",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "active",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0002",
          afm: 1056222222,
          client: "Britney Rankin",
          insurance: "Interamerican",
          typeinsurance: "Υγεία",
          type: "Νέο Συμβόλαιο",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "active",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0003",
          afm: 10563333,
          client: "Juanita Richards",
          insurance: "Interamerican",
          typeinsurance: "Υγεία",
          type: "Νέο Συμβόλαιο",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "inactive",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0004",
          afm: 10562732,
          client: "Harvey Conley",
          insurance: "Interamerican",
          typeinsurance: "Αυτοκίνητο",
          type: "Νέο Συμβόλαιο",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "completed",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0005",
          afm: 10562732,
          client: "Niamh Hawes",
          insurance: "Interamerican",
          typeinsurance: "Αυτοκίνητο",
          type: "Νέο Συμβόλαιο",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "completed",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0006",
          afm: 10562732,
          client: "Leilani Sullivan",
          insurance: "Interamerican",
          typeinsurance: "Αυτοκίνητο",
          type: "Νέο Συμβόλαιο",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "incompleted",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0007",
          afm: 10562732,
          client: "Johnny Vega",
          insurance: "AIG",
          typeinsurance: "Αυτοκίνητο",
          type: "Πρόσθετη Πράξη",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "completed",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0008",
          afm: 10562732,
          client: "Fathima Couch",
          insurance: "AIG",
          typeinsurance: "Περιουσία",
          type: "Πρόσθετη Πράξη",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "completed",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0009",
          afm: 10562732,
          client: "Tarik Haney",
          insurance: "AIG",
          typeinsurance: "Περιουσία",
          type: "Πρόσθετη Πράξη",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "completed",
          url: "http://localhost:8080/mypdf.pdf",
        },
        {
          name: "AIG-0010",
          afm: 10562732,
          client: "Abi Casey",
          insurance: "AIG",
          typeinsurance: "Περιουσία",
          type: "Πρόσθετη Πράξη",
          startdate: "1/12/2020",
          enddate: "8/11/2020",
          broker: "Broker",
          status: "completed",
          url: "http://localhost:8080/mypdf.pdf",
        },
      ],
    };
  },
  methods: {
    getColor(status) {
      if (status == "completed") return "green";
      else if (status == "inactive") return "orange";
      else return "red";
    },
    showContract(item) {
      console.log("show");
      console.log(item);
    },
    downloadContract(item) {
      console.log("download");
      console.log(item);
      <a href="link-to.pdf" target="_blank">
        Download
      </a>;
    },
  },
};
</script>

<style>
.container-height {
  height: 100%;
}
</style>
