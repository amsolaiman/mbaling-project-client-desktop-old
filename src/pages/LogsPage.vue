<template>
  <div class="row">
    <div class="col-3">
      <q-page>
        <div class="q-mt-lg flex flex-center">
          <!-- SEARCH INPUT FIELD -->

          <q-form @submit="searchAction()">
            <q-input
              v-model="search"
              filled
              outlined
              dense
              clearable
              placeholder="Search for users"
              class="searchinput"
              style="width: 20rem"
              @clear="clearSearch()"
            >
              <template v-slot:prepend>
                <q-btn flat round size="sm">
                  <q-icon name="bi-search" type="submit" size="xs" />
                </q-btn>
              </template>
            </q-input>
          </q-form>
          <q-separator class="q-mt-sm" color="grey" style="width: 20rem" />
        </div>

        <!-- DISPLAY SEARCH -->

        <q-scroll-area style="height: 35rem; width: 23rem">
          <q-list v-for="(result, index) in searchResultUser" :key="index">
            <div v-if="result.type == 'student' || result.type == 'landlord'">
              <q-item
                clickable
                dense
                class="q-pt-md q-my-sm row items-center"
                style="height: 3rem"
                @click="onShowClick(result)"
              >
                <q-item-section class="q-pb-md" avatar>
                  <q-avatar size="lg">
                    <q-img
                      v-if="result.prfphoto"
                      class="avatar q-pt-none q-mt-none"
                      :src="`http://localhost:3000/prfmedia/${result.prfphoto}`"
                    />
                    <img
                      v-if="!result.prfphoto"
                      class="avatar q-pt-none q-mt-none"
                      src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                    />
                  </q-avatar>
                </q-item-section>
                <div class="col">
                  <q-item-section>
                    <q-item-label
                      lines="1"
                      class="defaultfont-semibold"
                      style="font-size: medium"
                    >
                      {{ result.lName }} {{ result.fName }}
                    </q-item-label>
                    <q-item-label lines="1" style="font-size: small">
                      <p>@{{ result.username }}</p>
                    </q-item-label>
                  </q-item-section>
                </div>
                <div
                  class="col-3 defaultfont-light q-mb-md text-grey-7"
                  style="font-size: smaller"
                >
                  {{ result.type }}
                </div>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
      </q-page>
      <!-- -------------------------------------- -->
    </div>
    <q-separator vertical color="grey" />
    <div class="col-8" style="background-color: #f0f0f0cc; width: 71rem">
      <!-- STUDENT SHOW INFO -->

      <q-page v-if="this.currentInfo.type == 'student' && displayInfo">
        <div class="q-ma-xl row items-start">
          <div class="col">
            <div class="flex flex-center">
              <q-avatar size="12rem" color="primary" text-color="secondary">
                <q-img
                  v-if="currentInfo.prfphoto"
                  class="avatar q-pt-none q-mt-none"
                  :src="`http://localhost:3000/prfmedia/${currentInfo.prfphoto}`"
                />
                <img
                  v-if="!currentInfo.prfphoto"
                  class="avatar q-pt-none q-mt-none"
                  src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                />
              </q-avatar>
            </div>
            <div class="defaultfont">
              <q-input
                v-model="currentInfo.email"
                readonly
                disable
                dense
                stack-label
                label="Email"
                style="width: 20rem"
              />

              <q-input
                v-model="currentInfo.contact"
                readonly
                disable
                dense
                stack-label
                label="Mobile Number"
                style="width: 20rem"
              />
              <q-input
                v-model="currentInfo.gender"
                readonly
                disable
                dense
                stack-label
                label="Gender"
                style="width: 20rem"
              />
              <q-input
                v-model="currentInfo.birthdate"
                readonly
                disable
                dense
                stack-label
                label="Date of Birth"
                style="width: 20rem"
              />
            </div>
          </div>
          <div class="col">
            <span>@{{ currentInfo.username }} </span>
            <q-input
              v-model="currentInfo.fName"
              readonly
              disable
              stack-label
              label="First Name"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.mName"
              readonly
              disable
              stack-label
              label="Middle Name"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.lName"
              readonly
              disable
              stack-label
              label="Last Name"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address1"
              readonly
              disable
              dense
              stack-label
              label="Street"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address2"
              readonly
              disable
              dense
              stack-label
              label="Barangay"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address3"
              readonly
              disable
              dense
              stack-label
              label="Municipality"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address4"
              readonly
              disable
              dense
              stack-label
              label="Province"
              style="width: 20rem"
            />
          </div>
          <div class="col"></div>
        </div>
        <div class="row q-ma-xl">
          <!-- Edit Student Info -->
          <div class="col q-mr-lg" v-if="editStudentCourse">
            Student Course
            <q-btn
              class="float-right"
              label="save"
              :ripple="false"
              unelevated
              rounded
              dense
              no-caps
              color="primary"
              style="
                color: white;
                height: 1.5rem;
                width: 5rem;
                font-size: smaller;
              "
              @click="onSaveEditStudent()"
            />
            <q-select
              class="q-mt-xs"
              v-model="currentInfo.college"
              :options="College"
              dense
              label="College:"
              style="width: 41rem; font-size: smaller"
            />
            <q-select
              class="q-mt-xs"
              :v-model="
                currentInfo.college ==
                  'College of Business Administration and Accountancy' ||
                'College of Information Technology' ||
                'King Faisal Center for Islamic, Arabic and Asian Studies'
                  ? selectedDepartment()
                  : selectedDepartment
              "
              v-model="currentInfo.department"
              :options="Department"
              dense
              label="Department:"
              style="width: 41rem; font-size: smaller"
            />
            <q-select
              class="q-mt-xs"
              :v-model="
                currentInfo.college ==
                  'College of Business Administration and Accountancy' ||
                'College of Information Technology' ||
                'King Faisal Center for Islamic, Arabic and Asian Studies'
                  ? selectedDegree()
                  : selectedDegree
              "
              v-model="currentInfo.degree"
              :options="Degree"
              dense
              label="Degree:"
              style="width: 41rem; font-size: smaller"
            />
          </div>

          <div class="col q-mr-lg" v-else>
            Student Course
            <q-btn
              class="float-right"
              label="edit"
              :ripple="false"
              unelevated
              rounded
              dense
              no-caps
              outline
              style="
                color: #be282d;
                height: 1.5rem;
                width: 5rem;
                font-size: smaller;
              "
              @click="OpenEditStudent()"
            />
            <q-input
              v-model="currentInfo.college"
              readonly
              disable
              dense
              stack-label
              label="College"
              style="width: 41rem"
            />
            <q-input
              v-model="currentInfo.department"
              readonly
              disable
              dense
              stack-label
              label="Department"
              style="width: 41rem"
            />
            <q-input
              v-model="currentInfo.degree"
              readonly
              disable
              dense
              stack-label
              label="Degree"
              style="width: 41rem"
            />
          </div>
          <div class="col-4"></div>
        </div>
      </q-page>

      <!-- LANDLORD SHOW INFO -->

      <q-page v-else-if="this.currentInfo.type == 'landlord' && displayInfo">
        <div class="q-ma-xl row items-start">
          <div class="col">
            <div class="flex flex-center">
              <q-avatar size="12rem" color="primary" text-color="secondary">
                <q-img
                  v-if="currentInfo.prfphoto"
                  class="avatar q-pt-none q-mt-none"
                  :src="`http://localhost:3000/prfmedia/${currentInfo.prfphoto}`"
                />
                <img
                  v-if="!currentInfo.prfphoto"
                  class="avatar q-pt-none q-mt-none"
                  src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                />
              </q-avatar>
            </div>
            <div class="defaultfont">
              <q-input
                v-model="currentInfo.email"
                readonly
                disable
                dense
                stack-label
                label="E-mail"
                style="width: 20rem"
              />
              <q-input
                v-model="currentInfo.contact"
                readonly
                disable
                dense
                stack-label
                label="Mobile Number"
                style="width: 20rem"
              />
              <q-input
                v-model="currentInfo.gender"
                readonly
                disable
                dense
                stack-label
                label="Gender"
                style="width: 20rem"
              />
              <q-input
                v-model="currentInfo.birthdate"
                readonly
                disable
                dense
                stack-label
                label="Date of Birth"
                style="width: 20rem"
              />
            </div>
          </div>
          <div class="col">
            <span> @{{ currentInfo.username }} </span>
            <q-input
              v-model="currentInfo.fName"
              readonly
              disable
              label="First Name"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.mName"
              readonly
              disable
              label="Middle Name"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.lName"
              readonly
              disable
              label="Last Name"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address1"
              readonly
              disable
              dense
              stack-label
              label="Street"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address2"
              readonly
              disable
              dense
              stack-label
              label="Barangay"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address3"
              readonly
              disable
              dense
              stack-label
              label="Municipality"
              style="width: 20rem"
            />
            <q-input
              v-model="currentInfo.address4"
              readonly
              disable
              dense
              stack-label
              label="Province"
              style="width: 20rem"
            />
          </div>
          <!-- List of Boarders -->
          <div class="col">
            <span class="defaultfont-bold" style="font-size: large">
              {{currentInfo.housing?.name}}</span
            ><br />

            <div class="row">
              <div class="col">
              <div class="defaultfont text-grey-6" style="font-size: small">
                List of Boarders:
              </div>
              </div>
              <div class="col">
                <div class="q-mr-xl defaultfont float-right" style="font-size: medium">
                  {{this.data.length + this.nonAccountdata.length}}
                </div>
              </div>
            </div>
            <q-scroll-area style="height: 30rem; width: 20rem">
              <div>
                <q-list class="q-mb-xs" v-for="result in getAcceptedAccount" :key="result">
                  <q-card flat v-if="currentInfo.id == result.landlord?.id">
                    <div class="row flex flex-center">
                      <div class="col-2">
                        <q-avatar class="q-ml-sm" size="2rem">
                          <q-img
                                v-if="result.student?.prfphoto"
                                :src="`http://localhost:3000/prfmedia/${result.student?.prfphoto}`"
                              />
                              <q-img
                                v-else
                                src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                              />
                        </q-avatar>
                      </div>
                      <div class="col">
                        <div class="q-mt-sm defaultfont float-left" style="height: 3rem">
                          {{result.student?.fName}} {{result.student?.lName}}
                          <div class="q-ma-none q-mr-md" style="font-size: x-small">
                          {{result.student?.degree}}
                        </div>
                        </div>
                      </div>
                    </div>
                  </q-card>
                </q-list>
              </div>
              <div class="q-my-sm defaultfont text-grey-6" style="font-size: small">
              List of Boarders (Non Account):
              </div>
              <div>
                <q-list class="q-mb-xs" v-for="result in allNonAccount" :key="result">
                  <q-card flat v-if="currentInfo.id == result.landlord?.id">
                    <div class="row flex flex-center">
                      <div class="col-2">
                        <q-avatar class="q-ml-sm" size="2rem">
                          <q-img src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg" />
                        </q-avatar>
                      </div>
                      <div class="col">
                        <div v-if="(result.degree != '')" class="q-mt-sm defaultfont float-left" style="height: 3rem">
                          {{result.fName}} {{result.lName}}
                          <div class="q-ma-none q-mr-md" style="font-size: x-small">
                          {{result.degree}}
                        </div>
                        </div>
                        <div v-if="(result.degree == '')" class="flex flex-center defaultfont float-left" style="height: 3rem">
                          {{result.fName}} {{result.lName}}
                        </div>
                      </div>
                    </div>
                  </q-card>
                </q-list>
              </div>
            </q-scroll-area>
          </div>
        </div>
      </q-page>

      <!-- RED LOGO BACKGROUND -->

      <q-page v-else class="row items-center justify-evenly">
        <q-img src="~assets/mbaling-logo-red.svg" style="max-width: 15rem" />
      </q-page>
    </div>
  </div>
</template>

<script lang="ts">
import { ApplicationDto, NonAccountDto, UserDto } from "src/services/rest-api";
import { AUser } from "src/store/auth/state";
import { Users } from "src/store/Records/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapGetters, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("account", ["getAllUser", "editAccount"]),
    ...mapActions("auth", ["authUser"]),
    ...mapActions("application", ["getAllApplication", "updateApplication"]),
    ...mapActions("nonaccount", ["createNonAccount", "getAllNonAccount", "deleteNonAccount"])
  },
  computed: {
    ...mapState("account", ["allAccount"]),
    ...mapGetters("account", ["landlordAccount"]),
    ...mapGetters("application", ["getAcceptedAccount"]),
    ...mapState("nonaccount", ["allNonAccount"]),
    ...mapState("auth", ["currentUser"]),
  },
})
export default class LogsPage extends Vue {
  getAllNonAccount!: () => Promise<void>;
  getAllApplication!: () => Promise<void>;
  getAllUser!: () => Promise<void>;
  authUser!: () => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;

  allNonAccount!: NonAccountDto[]
  applications!: ApplicationDto[];
  getAcceptedAccount!: ApplicationDto[];
  allAccount!: Users[];
  currentUser!: Users;
  data: any = [];
  nonAccountdata: any = [];

  search = "";
  displayInfo = false;

  columns = [
     {
      name: "name",
      label: "Name:",
      align: "left",
      field: (row: ApplicationDto) =>
        row.student?.fName + " " + row.student?.lName,
    },
  ];
  nonAccountColumns = [
     {
      name: "name",
      label: "Name:",
      align: "left",
      field: (row: NonAccountDto) =>
        row.fName + " " + row.lName,
    },
  ];

  async mounted() {
    await this.authUser();
    await this.getAllUser();
    this.getAllApplication();
    this.getAllNonAccount();

  }

  currentInfo: any = {
    fName: "",
    lName: "",
    type: "",
    email: "",
    birthdate: "",
    degree: "",
    department: "",
    college: "",
    contact: "",
    gender: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    status: "active",
    year: "",
  };

  onShowClick(res: any) {
    this.displayInfo = true;
    this.currentInfo = res;
    this.data = this.getAcceptedAccount.filter((i) => this.currentInfo.id == i.landlord?.id)
    this.nonAccountdata = this.allNonAccount.filter(
      (i) =>this.currentInfo.id == i.landlord?.id
    );
    console.log(this.currentInfo.id)
    console.log(this.data + " ID HERE")
  }

  // Edit Function for Student Courses
  editStudentCourse = false;

  async onSaveEditStudent() {
    await this.editAccount(this.currentInfo);
    this.editStudentCourse = false;
    this.$q.notify({
      position: "bottom",
      color: "secondary",
      textColor: "primary",
      type: "positive",
      classes: "defaultfont",
      message: "Account Updated",
    });
  }
  async OpenEditStudent() {
    this.editStudentCourse = true;
    this.currentInfo = { ...this.currentInfo };
  }

  // Search Funtion

  searchResultUser: Users[] = [];

  searchAction() {
    const resultUsers = this.allAccount.filter(
      (user) =>
        user.fName.toLowerCase().includes(this.search.toLowerCase()) ||
        user.lName.toLowerCase().includes(this.search.toLowerCase())
    );
    console.log(resultUsers);
    this.searchResultUser = resultUsers;
  }

  clearSearch() {
    this.search = "";
  }

  Department: any[] = [];
  Degree: any[] = [];

  //Courses Choices
  College = [
    "College of Business Administration and Accountancy",
    "College of Information and Computing Sciences",
    "King Faisal Center for Islamic, Arabic and Asian Studies",
  ];

  selectedDepartment() {
    if (
      this.currentInfo.college ==
      "College of Business Administration and Accountancy"
    ) {
      return (this.Department = [
        "Department of Economic",
        "Department of Marketing",
        "Department of Management",
        "Department of Accounting",
      ]);
    } else if (
      this.currentInfo.college ==
      "College of Information and Computing Sciences"
    ) {
      return (this.Department = [
        "Department of Information Sciences",
        "Department of Computing Sciences",
      ]);
    } else if (
      this.currentInfo.college ==
      "King Faisal Center for Islamic, Arabic and Asian Studies"
    ) {
      return (this.Department = [
        "Department of International Relations",
        "Department of Islamic Studies",
        "Department of Teaching Arabic",
      ]);
    }
  }

  selectedDegree() {
    if (
      this.currentInfo.college ==
      "College of Business Administration and Accountancy"
    ) {
      return (this.Degree = [
        "Accountancy",
        "Business Economics",
        "BSBA Entrepreneurial Marketing",
        "BSBA Management",
        "BSBA Human Resource Management",
        "BSBA Marketing Management",
        "BSBA Entrepreneurship",
      ]);
    } else if (
      this.currentInfo.college ==
      "College of Information and Computing Sciences"
    ) {
      return (this.Degree = [
        "Bachelor of Science in Computer Science",
        "Bachelor of Science in Entertaiment and Multiprfmedia Computing",
        "Bachelor of Science in Information System",
        "Bachelor of Science in information Technology (Database)",
        "Bachelor of Science in information Technology (Networking)",
      ]);
    } else if (
      this.currentInfo.college ==
      "King Faisal Center for Islamic, Arabic and Asian Studies"
    ) {
      return (this.Degree = [
        "Bachelor of Arts in Islamic Studies (Shari'ah)",
        "Bachelor of Science in Teaching Arabic",
        "Bachelor of Science in International Relations",
      ]);
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
</style>




