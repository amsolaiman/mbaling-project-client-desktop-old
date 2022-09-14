<template>
  <q-layout view="hHh lpR fFf" class="defaultfont-light bg-primary text-white">
    <q-page class="row items-center justify-evenly">
      <q-card flat class="bg-transparent text-center" style="width: 12rem">
        <!-- LOGO PICTURE -->
        <q-img src="~assets/mbaling-logo-vertical.svg" style="width: 6rem" />

        <!-- USERNAME & PASSWORD INPUT -->
        <div class="q-mt-xl">
          <q-input
            v-model="username"
            dark
            dense
            color="white"
            input-class="text-center"
            type="text"
            placeholder="username"
            @keyup.enter="loginUser()"
          />
          <q-input
            v-model="password"
            dark
            dense
            color="white"
            input-class="text-center"
            type="password"
            placeholder="password"
            @keyup.enter="loginUser()"
          />

          <!-- LOG-IN BUTTON -->
          <q-btn
            :ripple="false"
            unelevated
            rounded
            dense
            no-caps
            label="log-in"
            color="white"
            class="q-mt-md text-red text-bold"
            style="height: 1.5rem; width: 6rem; font-size: smaller"
            @click="loginUser()"
          />
        </div>
      </q-card>
    </q-page>
  </q-layout>
</template>

<script lang="ts">
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";


@Options({
  methods: {
    ...mapActions('auth', ['login', 'authUser']),
  },
  computed: {
    ...mapState('auth', ['currentUser']),
  },
})

export default class LoginForm extends Vue {
  login!: (auth: { userName: string; password: string }) => Promise<AUser>;
  currentUser!: AUser;

  username = '';
  password = '';

  async loginUser() {
    try {
      await this.login({
        userName: this.username,
        password: this.password,
      });
      if (this.currentUser.type == 'admin') {
        await this.$router.replace('/logs');
        this.$q.notify({
          position: 'top',
          color: "secondary",
          textColor: "primary",
          type: 'positive',
          classes: "defaultfont",
          message: 'You are logged in ' + this.currentUser.fName,
        });
      }
    } catch (error) {
     this.$q.notify({
        message: "Incorrect username or password.",
        color: "secondary",
        textColor: "primary",
        position: "top",
        classes: "defaultfont",
      });
    }
  }
  // async loginUser() {
  //   if (this.username == "user" && this.password == "password") {
  //     await this.$router.replace("/logs");
  //   } else {
  //     this.$q.notify({
  //       message: "Incorrect username or password.",
  //       color: "secondary",
  //       textColor: "primary",
  //       position: "top",
  //       classes: "defaultfont",
  //     });
  //   }
  // }
}
</script>
