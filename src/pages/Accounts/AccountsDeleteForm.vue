<template>
  <q-page class="row items-center justify-evenly">

    <q-card class="bg-white accountcreate-card" style="width: 35rem; height: 25rem">
      <div class="absolute-center">
    <q-card-section class="q-py-xs row items-center justify-evenly">
        <q-icon size="5rem" name="delete" color="primary" />
      </q-card-section>

      <q-card-section>
        <div class="q-gutter-y-sm column flex flex-center">
        <q-input dense filled placeholder="Username" style="width: 25rem; font-size: smaller" />
        <q-input dense filled  placeholder="E-mail" style="width: 25rem; font-size: smaller" />
        <q-input dense filled placeholder="Password" type="password" style="width: 25rem; font-size: smaller" />
        </div>
        <div class="flex flex-center">
          <q-btn
            :ripple="false"
            unelevated
            rounded
            dense
            no-caps
            class="text-white q-mt-md"
            style="height: 1.5rem; width: 6rem; font-size: smaller"
            color="primary"
            label="delete"
            @click="deleteAccount"
          />
        </div>

      </q-card-section>
      </div>
        </q-card>
  </q-page>
</template>

<script lang="ts">

import { Options, Vue } from "vue-class-component";
import { mapState, mapActions, mapGetters } from "vuex";
import { AccountStateInterface } from "src/store/Records/state";
import { UserDto } from "src/services/rest-api";

@Options({
  methods: {
    ...mapActions("account", ["getAllUser", "editAccount", "deleteAccount"]),
    ...mapActions("auth", ["authUser"]),
  },
  computed: {
    ...mapState("account", ["allAccount"]),
    ...mapGetters("account", ["landlordAccount"]),
    ...mapState("auth", ["currentUser"]),
  },
})

export default class AccountsDeleteForm extends Vue{
  getAllUser!: () => Promise<void>;
  authUser!: () => Promise<void>;
  editAccount!: (payload: UserDto) => Promise<void>;
  deleteAccount!: (payload: any) => Promise<void>;

  // allStudentRecords!: AccountStateInterface[];
  // deleteStudent!:(student:AccountStateInterface) => Promise<void>;

  // //Functions for deletingStudentAccount

  // defaultStudent: AccountStateInterface = {
  //   allAccount: []
  // };

  // currentStudent = {...this.defaultStudent}

  async deleteUser(){
    await this.deleteAccount(4)
    this.$q.notify({
      type: "positive",
      message: "Success",
  });
  }
}




// import { ref } from "vue";

// export default {
//   setup() {
//     return {
//       username: ref(""),
//       email: ref(""),
//       password: ref(""),
//     };
//   },
// };
</script>
