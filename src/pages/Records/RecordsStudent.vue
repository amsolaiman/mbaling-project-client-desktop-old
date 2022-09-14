<template>
  <q-layout view="hHh Lpr lff" container style="height: 48rem">
    <div class="row">
      <div class="col-10">
        <q-scroll-area style="height: 48rem;">
          <div>
            <div class="q-my-sm">
            <div class="row">
              <q-page-sticky expand position="top">

                <div
                  class="col"
                >
                  <p class="q-mt-md q-ml-md defaultfont" style="font-size: x-large;">Student's Records</p>
                </div>
                <div class="col">
                  <q-select
                  label="Filter by College:"
                  class="q-pb-xs q-mr-xl"
                  dense
                  v-model="search"
                  :options="collegeChoices"
                  clearable
                  >
                  </q-select>
                </div>
                <div class="col">
                   <div class="float-right">
                    <q-icon name="print" size="2rem" color="grey-7" @click="exportTable()" />
                    </div>
                </div>
    <!--  -->
                <div class="col" style="max-width: 16rem; background-color: aqua;"></div>
              </q-page-sticky>
            </div>
            </div>
            <q-separator class="q-mt-xl"/>

            <q-table
              class="cursor-pointer q-data-table"
              :rows="studentAccount"
              :columns="columns"
              row-key="number"
              :rows-per-page-options="[0]"
              :separator="separator"
              :filter="search"
              dense
              hide-bottom
            >

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                    @click="onTableRowClick(props.row)"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                  <q-td colspan="100%">
                    <div class="text-left">
                      This is expand slot for row above: {{ props.row.name }}.
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-scroll-area>
      </div>

      <div class="col-2">
        <div>
          <div
            v-if="displayInfo"
            class="q-mt-md flex-center text-center text-primary"
          >
            <div class="column">
              <div class="col">
                <q-avatar
                  class="q-mt-sm q-ma-md"
                  size="8rem"
                  color="primary"
                  text-color="secondary"
                >
                  <q-img
                    v-if="currentStudent.prfphoto"
                    class="avatar q-pt-none q-mt-none"
                    :src="`http://localhost:3000/prfmedia/${currentStudent.prfphoto}`"
                  />
                  <img
                    v-if="!currentStudent.prfphoto"
                    class="avatar q-pt-none q-mt-none"
                    src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                  />
                </q-avatar>
                <div class="info-username defaultfont">
                  <p>@{{ currentStudent.username }}</p>
                  <span class="defaultfont-bold info-fullname text-uppercase">
                    {{ currentStudent.fName }} {{ currentStudent.mName }}
                    {{ currentStudent.lName }}
                  </span>
                  <p class="info-other defaultfont" style="font-size: x-small">
                    {{ currentStudent.username }} <br />
                    {{ currentStudent.degree }}, {{ currentStudent.yearAdmit }}
                    <br />
                    {{ currentStudent.department }} <br />
                    {{ currentStudent.college }}
                  </p>
                  <p class="defaultfont" style="font-size: x-small">
                    {{ currentStudent.email }} <br />
                    {{ currentStudent.contact }} <br />
                    {{ currentStudent.birthdate }} <br />
                    {{ currentStudent.address1 }}, {{ currentStudent.address2 }}
                    <br />
                    {{ currentStudent.address3 }}, {{ currentStudent.address4 }}
                    <br />
                    {{ currentStudent.housingunit }}
                  </p>
                </div>
              </div>
              <div class="col">
                <q-icon
                  class="q-mt-xl bi-trash"
                  size="2rem"
                  @click="onDeleteStudent()"
                />
                <!-- <q-btn
            rounded
            dense
            style="font-size: small"
            class="q-ma-lg defaultfont"
            label="Delete Account"
            @click="onDeleteStudent() "
            /> -->
              </div>
            </div>
          </div>
          <q-page v-else class="row items-center justify-evenly">
            <q-img
              src="~assets/mbaling-logo-red.svg"
              style="max-width: 10rem"
            />
          </q-page>
          <q-dialog v-model="deleteStudentDialog" persistent>
            <!-- Confirm Delete -->
            <q-card class="flex flex-center" style="width: 30rem">
              <div class="row">
                <div @submit="delAccount(currentStudent.id)">
                  <q-card-section>
                    <div
                      class="column flex flex-center text-primary defaultfont"
                    >
                      <div class="col">
                        <q-icon size="3rem" class="q-my-md bi-trash" />
                      </div>
                      <div class="col">
                        <p style="font-size: small">
                          Please type "Confirm" to delete Account
                        </p>
                      </div>
                    </div>
                    <q-input
                      hint="Note: Accounts that is deleted will never retrieve"
                      dense
                      filled
                      v-model="confirmDeleteAccount"
                      style="width: 25rem; font-size: smaller"
                    />
                  </q-card-section>
                  <div class="flex flex-center defaultfont">
                    <q-btn
                      :ripple="false"
                      unelevated
                      rounded
                      dense
                      no-caps
                      outline
                      class="text-#BE282D q-ma-md"
                      style="height: 1.5rem; width: 6rem; font-size: smaller"
                      color="primary"
                      label="cancel"
                      v-close-popup
                    />
                    <q-btn
                      class="text-white q-my-md"
                      align="center"
                      :ripple="false"
                      unelevated
                      rounded
                      dense
                      no-caps
                      style="height: 1.5rem; width: 6rem; font-size: smaller"
                      color="primary"
                      label="delete"
                      type="submit"
                      @click="delAccount(currentStudent.id)"
                      v-close-popup
                    />
                  </div>
                </div>
              </div>
            </q-card>
            <!--  -->
          </q-dialog>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters, mapState, Payload } from "vuex";
import { UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Users } from "src/store/Records/state";
import { exportFile } from 'quasar';

@Options({
  methods: {
    ...mapActions("account", ["getAllUser", "deleteAccount"]),
  },
  computed: {
    ...mapState("account", ["allAccount"]),
    ...mapGetters("account", ["studentAccount"]),
  },
})
export default class RecordsStudent extends Vue {
  deleteAccount!: (id: UserDto) => Promise<void>;
  getAllUser!: () => Promise<void>;
  studentAccount!: UserDto[];

  displayInfo = false;
  separator = "cell";
  allAccount!: Users[];
  currentUser!: Users;
  filter = "";
  search = "";
  id = 0;

  onTableRowClick(data: Users) {
    this.currentStudent = data;
    this.displayInfo = true;
  }

  defaultStudent: Users = {
    fName: "",
    lName: "",
    type: "student",
    email: "",
    birthdate: "",
    degree: "",
    department: "",
    college: "All",
    contact: "",
    gender: "",
    year: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    housingunit: "",
    status: "active",
  };

  currentStudent = { ...this.defaultStudent };

  async mounted() {
    await this.getAllUser();
    console.log(this.studentAccount);
  }

  // Delete Student Account

  async resetConfirm() {
    this.confirmDeleteAccount = "";
  }
  confirmDeleteAccount = "";

  async delAccount(val: any) {
    if (
      this.confirmDeleteAccount == "confirm" ||
      this.confirmDeleteAccount == "Confirm"
    ) {
      await this.deleteAccount(val);
      this.$q.notify({
        type: "positive",
        caption: "Successfully Deleted ",
        message: "Successfully",
        position: "bottom",
        color: "secondary",
        textColor: "primary",
        classes: "defaultfont",
      });
      this.resetConfirm();
      console.log("delete Here");
    } else {
      this.$q.notify({
        type: "warning",
        caption: 'Please type "Confirm" to delete',
        message: "Delete Failed",
        position: "bottom",
        color: "primary",
        textColor: "secondary",
        classes: "defaultfont",
      });
      console.log("delete failed!");
    }
  }

  deleteStudentDialog = false;

  async onDeleteStudent() {
    this.deleteStudentDialog = true;
  }

// Filter Choices
  collegeChoices = [
    "College of Business Administration and Accountancy",
    "College of Information and Computing Sciences",
    "King Faisal Center for Islamic, Arabic and Asian Studies",
  ];

  // collegeChoices = [
  //   {
  //     label: "College of Business Administration and Accountancy",
  //     value: "CBAA",
  //   },
  //   {
  //     label: "College of Information and Computing Sciences",
  //     value: "CICS"
  //   },
  //   {
  //     label: "King Faisal Center for Islamic, Arabic and Asian Studies",
  //     value: "KFCIAAS"
  //   },
  // ];

  columns = [
    // {
    //   name: "id",
    //   required: true,
    //   label: "STUDENT ID",
    //   align: "center",
    //   field: "id",
    //   sortable: true,
    // },
    {
      name: "studentId",
      align: "center",
      label: "STUDENT ID",
      field: "studentId",
    },
    {
      name: "username",
      align: "center",
      label: "USERNAME",
      field: "username",
    },
    {
      name: "lName",
      align: "center",
      label: "LASTNAME",
      field: "lName",
      sortable: true,
    },
    {
      name: "fName",
      align: "center",
      label: "FIRSTNAME",
      field: "fName",
    },
    {
      name: "mName",
      align: "center",
      label: "MIDDLENAME",
      field: "mName",
    },
    {
      name: "gender",
      align: "center",
      label: "GENDER",
      field: "gender",
    },
    {
      name: "degree",
      align: "center",
      label: "DEGREE",
      field: "degree",
    },
    {
      name: "department",
      align: "center",
      label: "DEPARTMENT",
      field: "department",
    },
    {
      name: "college",
      align: "center",
      label: "COLLEGE",
      field: "college",
    },
    // {
    //   name: "yearAdmit",
    //   align: "center",
    //   label: "YEAR ADMIT",
    //   field: "yearAdmit",
    // },
    {
      name: "address1",
      align: "center",
      label: "STREET",
      field: "address1",
    },
    {
      name: "address2",
      align: "center",
      label: "BARANGAY",
      field: "address2",
    },
    {
      name: "address3",
      align: "center",
      label: "MUNICIPALITY",
      field: "address3",
    },
    {
      name: "address4",
      align: "center",
      label: "PROVINCE",
      field: "address4",
    },
    {
      name: "housingunit",
      align: "center",
      label: "HOUSING UNIT",
      field: (row: UserDto) => row.housing?.name,
    },
    {
      name: "email",
      align: "center",
      label: "EMAIL",
      field: "email",
    },
    {
      name: "contact",
      align: "center",
      label: "CONTACT NO.",
      field: "contact",
    },
    {
      name: "birthdate",
      align: "center",
      label: "BIRTHDATE",
      field: "birthdate",
    },
  ];

  wrapCsvValue(
    val: string,
    formatFn?: (v: string, r: any) => string,
    row?: any
  ) {
    let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

    formatted =
      formatted === void 0 || formatted === null ? '' : String(formatted);

    formatted = formatted.split('"').join('""');
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`;
  }

  exportTable() {
    // naive encoding to csv format
    const header = [
      this.wrapCsvValue('Username'),
      this.wrapCsvValue('Firstname'),
      this.wrapCsvValue('Lastname'),
      this.wrapCsvValue('Middlename'),
      this.wrapCsvValue('Gender'),
      this.wrapCsvValue('Degree'),
      this.wrapCsvValue('Department'),
      this.wrapCsvValue('College'),
      this.wrapCsvValue('Street'),
      this.wrapCsvValue('Barangay'),
      this.wrapCsvValue('Municipality'),
      this.wrapCsvValue('Province'),
      this.wrapCsvValue('Housingname'),
      this.wrapCsvValue('Email'),
      this.wrapCsvValue('Contact'),
      this.wrapCsvValue('Birthdate'),
    ];
    const rows = [header.join(',')].concat(
      this.studentAccount.map((c) =>
        [
          this.wrapCsvValue(String(c.username)),
          this.wrapCsvValue(String(c.fName)),
          this.wrapCsvValue(String(c.lName)),
          this.wrapCsvValue(String(c.mName)|| 'blank'),
          this.wrapCsvValue(String(c.gender) || 'None'),
          this.wrapCsvValue(String(c.degree)),
          this.wrapCsvValue(String(c.department)),
          this.wrapCsvValue(String(c.college)),
          this.wrapCsvValue(String(c.address1) || 'None'),
          this.wrapCsvValue(String(c.address2) || 'None'),
          this.wrapCsvValue(String(c.address3) || 'None'),
          this.wrapCsvValue(String(c.address4) || 'None'),
          this.wrapCsvValue(String(c.housing?.name) || 'None'),
          this.wrapCsvValue(String(c.email)),
          this.wrapCsvValue(String(c.contact) || 'None'),
          this.wrapCsvValue(String(c.birthdate) || 'None'),
        ].join(',')
      )
    );

    const status = exportFile(
      'Student-record-export.csv',
      rows.join('\r\n'),
      'text/csv'
    );

    if (status !== true) {
      this.$q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning',
      });
    }
  }
}


</script>
<style>
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50% !important;
  border: 2px solid rgb(190, 40, 45) !important;
}
.q-data-table td {
  text-align: left;
}
</style>

