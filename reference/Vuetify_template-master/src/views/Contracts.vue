<template>
  <div>
    <v-container fluid class="grey lighten-5 mb-6 fluid container-height" :class="$vuetify.breakpoint.smAndDown ? 'px-3' : 'px-6' ">
      <h3 class="mt-4 mb-4">Συμβόλαια</h3>

      <v-row justify="center" align="center">
        <v-col cols="3" class="">
          <v-select dense filled item-text="name" item-value="value" v-model="insurance" :items="insurances" label="Ασφ.Εταιρία" @change="filterContract()">
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense filled item-text="name" item-value="value" v-model="insurance" :items="insurances" label="Κλάδος Ασφάλισης" @change="filterContract()">
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense filled item-text="name" item-value="value" v-model="insurance" :items="insurances" label="Τύπος Συμβολαίου" @change="filterContract()">
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-select dense filled item-text="name" item-value="value" v-model="insurance" :items="insurances" label="Broker">
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field filled v-model="search" append-icon="mdi-magnify" label="Κωδ. Συμβολαίου" single-line></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field filled v-model="search" append-icon="mdi-magnify" label="ΑΦΜ" single-line></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field filled v-model="search" append-icon="mdi-magnify" label="Επωνυμία πελάτη" single-line></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select dense filled item-text="name" item-value="value" v-model="status" :items="statuses" label="Κατάσταση">
          </v-select>
        </v-col>

      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <!-- <v-text-field outlined dense v-model="search" append-icon="mdi-magnify" label="Αναζήτηση" single-line></v-text-field> -->
            </v-card-title>
            <v-data-table :items-per-page="5" :headers="headers" :items="contracts" :search="search" class="mb-10">
              <template v-slot:item.status="{ item }">
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status }}
                </v-chip>
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
      filters: {
        insurance: [],
        typeinsurance: []
      },
      insurance: "",
      insurances: [
        { name: "AIG", value: "AIG" },
        { name: "Interamerican", value: "Interamerican" }
      ],
      statuses: [
        { name: "Completed", value: "completed" },
        { name: "Incompleted", value: "incompleted" }
      ],
      status: "",

      dialog: false,
      search: "",
      headers: [
        {
          text: "Κωδ. Συμβ.",
          align: "start",
          filterable: true,
          value: "name"
        },
        {
          text: "ΑΦΜ",
          value: "afm"
        },
        {
          text: "Επών.Πελάτη",
          value: "client"
        },
        {
          text: "Ασφαλιστική",
          value: "insurance"
        },
        {
          text: "Κλάδος Ασφ.",
          value: "typeinsurance"
        },
        {
          text: "Τύπος Συμβ.",
          value: "type"
        },
        {
          text: "Ημ/νία Έναρξης",
          value: "startdate"
        },
        {
          text: "Ημ/νία Λήξης",
          value: "enddate"
        },
        {
          text: "Broker",
          value: "broker"
        },
        {
          text: "Κατάσταση",
          value: "status"
        },
        { text: "Actions", value: "actions", sortable: false }
      ],
      contractsOriginal: [],
      contracts: []
    };
  },
  computed: {},
  mounted() {
    this.getContracts();
  },
  methods: {
    filterContract() {
      let filtered = this.contractsOriginal.filter(
        val => val.insurance == this.insurance
      );
      console.log(filtered);
      setTimeout(() => {
        this.contracts = filtered;
      }, 1000);
    },

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
    getContracts() {
      this.contractsOriginal = [
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
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
          url: "http://localhost:8080/mypdf.pdf"
        }
      ];

      setTimeout(() => {
        this.contracts = this.contractsOriginal;
      }, 1000);
    }
  }
};
</script>

<style>
.container-height {
  height: 100%;
}
</style>
