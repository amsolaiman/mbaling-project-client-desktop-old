<template>
  <q-page class="row justify-evenly">
    <q-card class="q-my-lg accountcreate-card" style="width: 35rem">
      <q-tabs
        v-model="tab"
        dense
        indicator-color="primary"
        active-color="primary"
        narrow-indicator
      >
        <q-tab name="student" label="student" :ripple="false" />
        <q-tab name="landlord" label="Landlord" :ripple="false" />
      </q-tabs>

      <q-separator></q-separator>
      <!-- Student -->
      <q-tab-panels v-model="tab">
        <q-tab-panel class="q-pa-none q-pt-md" name="student">
          <q-card-section class="q-py-xs row items-center justify-evenly">
            <q-icon class="mbi-account" size="4rem" color="primary" />
          </q-card-section>
          <q-form @submit="createStudent()" @reset="resetModel()" greedy>
          <q-card-section>
            <div class="q-gutter-y-sm column flex flex-center">
              <q-input
                dense
                filled
                v-model="inputStudent.studentId"
                placeholder="Student ID"
                style="width: 25rem; font-size: smaller"
                mask="#########"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your StudentID']"
                hide-bottom-space
              />
              <q-input
                dense
                filled
                v-model="inputStudent.fName"
                placeholder="Firstname"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your FirstName']"
                hide-bottom-space
              />

              <q-input
                dense
                filled
                v-model="inputStudent.lName"
                placeholder="Lastname"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your LastName']"
                hide-bottom-space
              />

              <q-input
                dense
                filled
                v-model="inputStudent.username"
                placeholder="Username"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your Username']"
                hide-bottom-space
              />
              <q-input
                dense
                filled
                v-model="inputStudent.password"
                placeholder="Password"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your Password']"
                hide-bottom-space
                :type="isPwd ? 'password' : 'text'"
              >
              <template v-slot:append>
                   <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility '"
                        class="cursor-pointer"
                       @click="isPwd = !isPwd"
                   />
                </template>
              </q-input>
              <q-input
                dense
                filled
                v-model="inputStudent.email"
                placeholder="E-mail"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your Email']"
                hide-bottom-space
                type="email"
              />

              <div style="max-width: 25rem">
                <q-expansion-item
                  header-class="bg-grey-3 text-grey-7"
                  dense
                  label="Course:"
                  style="width: 25rem; font-size: smaller"
                >
                  <q-card>
                    <q-card-section class="q-py-xs">
                      <q-select
                        class="q-mt-xs"
                        v-model="inputStudent.college"
                        :options="College"
                        dense
                        filled
                        label="College:"
                        style="width: 24rem; font-size: smaller"
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || 'Please Choose Your College']"
                        hide-bottom-space
                      />
                      <q-select
                        class="q-mt-xs"
                        :v-model="
                          inputStudent.college ==
                            'College of Business Administration and Accountancy' ||
                          'College of Information Technology' ||
                          'King Faisal Center for Islamic, Arabic and Asian Studies'
                            ? selectedDepartment()
                            : selectedDepartment
                        "
                        v-model="inputStudent.department"
                        :options="Department"
                        dense
                        filled
                        label="Department:"
                        style="width: 24rem; font-size: smaller"
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || 'Please Choose Your Department']"
                        hide-bottom-space
                      />
                      <q-select
                        class="q-mt-xs"
                        :v-model="
                          inputStudent.college ==
                            'College of Business Administration and Accountancy' ||
                          'College of Information Technology' ||
                          'King Faisal Center for Islamic, Arabic and Asian Studies'
                            ? selectedDegree()
                            : selectedDegree
                        "
                        v-model="inputStudent.degree"
                        :options="Degree"
                        dense
                        filled
                        label="Degree:"
                        style="width: 24rem; font-size: smaller"
                        lazy-rules
                        :rules="[(val) => (val && val.length > 0) || 'Please Choose Your Degree']"
                        hide-bottom-space
                      />

                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div>

              <!-- <div style="max-width: 25rem">
                <q-expansion-item
                  header-class="bg-grey-3 text-grey-7"
                  dense
                  label="Address:"
                  style="width: 25rem; font-size: smaller"
                >
                  <q-card-section class="q-py-xs">
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputStudent.address4"
                      label="Province:"
                      style="width: 24rem; font-size: smaller"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please Input your Province']"
                      hide-bottom-space
                    />
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputStudent.address3"
                      label="Municipality:"
                      style="width: 24rem; font-size: smaller"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please Input your Municipality']"
                      hide-bottom-space
                    />
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputStudent.address2"
                      label="Barangay:"
                      style="width: 24rem; font-size: smaller"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please Input your Barangay']"
                      hide-bottom-space
                    />
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputStudent.address1"
                      label="Street:"
                      style="width: 24rem; font-size: smaller"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || 'Please Input your Street']"
                      hide-bottom-space
                    />
                  </q-card-section>
                </q-expansion-item>
              </div> -->
            </div>
            <div class="flex flex-center">
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
                label="reset"
                type="reset"
              />
              <q-btn
                :ripple="false"
                unelevated
                rounded
                dense
                no-caps
                class="text-white q-ma-md"
                style="height: 1.5rem; width: 6rem; font-size: smaller"
                color="primary"
                label="create"
                type="submit"
              />
            </div>
          </q-card-section>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>

      <!-- Landlord -->
      <q-tab-panels v-model="tab">
        <q-tab-panel class="q-pa-none q-pt-md" name="landlord">
          <q-card-section class="q-py-xs row items-center justify-evenly">
            <q-icon class="mbi-home" size="4rem" color="primary" />
          </q-card-section>
          <q-form @submit="createLandlord()" @reset="resetModel()" greedy>
          <q-card-section>
            <div class="q-gutter-y-sm column flex flex-center">
              <q-input
                dense
                filled
                v-model="inputLandlord.fName"
                placeholder="Firstname"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your FirstName']"
                hide-bottom-space
              />

              <q-input
                dense
                filled
                v-model="inputLandlord.lName"
                placeholder="Lastname"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your LastName']"
                hide-bottom-space
              />

              <q-input
                dense
                filled
                v-model="inputLandlord.username"
                placeholder="Username"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your Username']"
                hide-bottom-space
              />

              <q-input
                dense
                filled
                v-model="inputLandlord.password"
                placeholder="Password"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your Password']"
                hide-bottom-space
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                   <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility '"
                        class="cursor-pointer"
                       @click="isPwd = !isPwd"
                   />
                </template>
              </q-input>

              <q-input
                dense
                filled
                type="email"
                v-model="inputLandlord.email"
                placeholder="E-mail"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please Input your Email']"
                hide-bottom-space
              />

              <!-- <div style="max-width: 25rem">
                <q-expansion-item
                  header-class="bg-grey-3 text-grey-7"
                  dense
                  label="Address:"
                  style="width: 25rem; font-size: smaller"
                >
                  <q-card>
                    <q-card-section class="q-py-xs">
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputLandlord.address4"
                      label="Province:"
                      style="width: 24rem; font-size: smaller"

                    />
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputLandlord.address3"
                      label="Municipality:"
                      style="width: 24rem; font-size: smaller"

                    />
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputLandlord.address2"
                      label="Barangay:"
                      style="width: 24rem; font-size: smaller"

                    />
                    <q-input
                      class="q-mt-xs"
                      dense
                      filled
                      v-model="inputLandlord.address1"
                      label="Street:"
                      style="width: 24rem; font-size: smaller"

                    />
                  </q-card-section>
                  </q-card>
                </q-expansion-item>
              </div> -->
            </div>
            <div class="flex flex-center">
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
                label="reset"
                type="reset"
              />
              <q-btn
                :ripple="false"
                unelevated
                rounded
                dense
                no-caps
                class="text-white q-ma-md"
                style="height: 1.5rem; width: 6rem; font-size: smaller"
                color="primary"
                label="create"
                type="submit"
              />
            </div>
          </q-card-section>
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapState, mapActions } from "vuex";
import { UserDto } from "src/services/rest-api";

@Options({
  computed: {
    ...mapState("account", ["allAccount"]),
  },
  methods: {
    ...mapActions("account", [
      "addAccount",
      "editAccount",
      "deleteAccount",
      "getAllUser",
    ]),
  },
})
export default class AccountsCreateForm extends Vue {
  addAccount!: (payload: any) => Promise<void>;
  editAccount!: (payload: any) => Promise<void>;
  deleteAccount!: (payload: any) => Promise<void>;
  getAllUser!: () => Promise<void>;
  allAccount!: UserDto[];
  isPwd = true;
  addNewAccount = false;
  tab = "student";
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
      this.inputStudent.college ==
      "College of Business Administration and Accountancy"
    ) {
      return (this.Department = [
        "Department of Economic",
        "Department of Marketing",
        "Department of Management",
        "Department of Accounting",
      ]);
    } else if (
      this.inputStudent.college ==
      "College of Information and Computing Sciences"
    ) {
      return (this.Department = [
        "Department of Information Sciences",
        "Department of Computing Sciences",
      ]);
    } else if (
      this.inputStudent.college ==
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
      this.inputStudent.college ==
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
      this.inputStudent.college ==
      "College of Information and Computing Sciences"
    ) {
      return (this.Degree = [
        "Bachelor of Science in Computer Science",
        "Bachelor of Science in Entertaiment and Multimedia Computing",
        "Bachelor of Science in Information System",
        "Bachelor of Science in information Technology (Database)",
        "Bachelor of Science in information Technology (Networking)",
      ]);
    } else if (
      this.inputStudent.college ==
      "King Faisal Center for Islamic, Arabic and Asian Studies"
    ) {
      return (this.Degree = [
        "Bachelor of Arts in Islamic Studies (Shari'ah)",
        "Bachelor of Science in Teaching Arabic",
        "Bachelor of Science in International Relations",
      ]);
    }
  }

  //Functions for adding newStudentsAccount

  inputStudent: any = {
    studentId: "",
    fName: "",
    lName: "",
    type: "student",
    status: "",
    username: "",
    password: "",
    birthdate: "",
    degree: "",
    department: "",
    college: "",
    contact: "",
    gender: "",
    year: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    chatLink: "",
    mapLink: "",
    prfphoto: 0,
    housingID: null
  };

  inputLandlord: any = {
    studentId: 231,
    fName: "",
    lName: "",
    type: "landlord",
    status: "",
    username: "",
    password: "",
    birthdate: "",
    degree: "",
    department: "",
    college: "",
    contact: "",
    gender: "",
    year: "",
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    chatLink: "",
    mapLink: "",
    prfphoto: 0,
    housingID: null
  };

  async resetModel() {
    this.inputStudent = {
      fName: "",
      lName: "",
      type: "student",
      status: "",
      username: "",
      password: "",
      birthdate: "",
      degree: "",
      department: "",
      college: "",
      contact: "",
      gender: "",
      year: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      chatLink: "",
      mapLink: "",
    };
    // window.location.reload();
    this.inputLandlord = {
      fName: "",
      lName: "",
      type: "landlord",
      status: "",
      username: "",
      password: "",
      birthdate: "",
      degree: "",
      department: "",
      college: "",
      contact: "",
      gender: "",
      year: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      chatLink: "",
      mapLink: "",
    };
    // window.location.reload();
  }

  async createStudent() {
    try {
   await this.addAccount(this.inputStudent);
    this.addNewAccount = false;
     this.$q.notify({
          position: 'bottom',
          color: "secondary",
          textColor: "primary",
          type: 'positive',
          classes: "defaultfont",
          message: 'Student Created',
        });
        this.resetmodelStudent();
        // window.location.reload();
        } catch (error) {
          this.$q.notify({
          position: 'bottom',
          color: "primary",
          textColor: "secondary",
          type: 'negative',
          classes: "defaultfont",
          message: 'Username is already exist!',
        });
        }
  }

  async createLandlord() {
    try {
    await this.addAccount({...this.inputLandlord, studentId:0, housingID: null});

    this.$q.notify({
          position: 'bottom',
          color: "secondary",
          textColor: "primary",
          type: 'positive',
          classes: "defaultfont",
          message: 'Landlord Created',
        });
        // this.resetmodelLandlord();
  } catch (error) {
          this.$q.notify({
          position: 'bottom',
          color: "primary",
          textColor: "secondary",
          type: 'negative',
          classes: "defaultfont",
          message: 'Username is already exist!',
        });
        }
  }

  async resetmodelLandlord(){
    this.inputLandlord = {
      fName: "",
      lName: "",
      type: "landlord",
      status: "",
      username: "",
      password: "",
      birthdate: "",
      degree: "",
      department: "",
      college: "",
      contact: "",
      gender: "",
      year: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      chatLink: "",
      mapLink: "",
    };
  }
  async resetmodelStudent(){
    this.inputLandlord = {
      fName: "",
      lName: "",
      type: "landlord",
      status: "",
      username: "",
      password: "",
      birthdate: "",
      degree: "",
      department: "",
      college: "",
      contact: "",
      gender: "",
      year: "",
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      chatLink: "",
      mapLink: "",
    };
  }
}
</script>
<style>
.accountcreate-card {
  border-radius: 0px 0px 0px 0px !important;
}
</style>
