<template>
  <q-layout view="lHr Lpr lFr" class="defaultfont">
    <q-header elevated class="q-px-md bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-img
            src="~assets/mbaling-logo-horizontal.svg"
            style="max-width: 10rem"
          />
          <div class="float-right defaultfont-semibold">
            {{ currentUser.fName }} {{ currentUser.lName }}
          </div>
        </q-toolbar-title>
        <!-- <q-btn
          icon="bi-list"
          :ripple="false"
          dense
          flat
          size="md"
          class="q-mt-none"
          @click="toggleRightDrawer"
        /> -->
        <q-btn-dropdown flat dropdown-icon="bi-list">
          <div style="height: 17rem; width: 20rem">
          <div class="flex-center text-center text-primary">
            <q-avatar class="q-ma-md" size="5rem">
              <!-- <q-img
              :src="`http://localhost:3000/media/${currentUser.prfphoto}`"
            /> -->
              <q-img
                v-if="currentUser.prfphoto"
                class="avatar q-pt-none q-mt-none"
                :src="`http://localhost:3000/prfmedia/${currentUser.prfphoto}`"
              />
              <img
                v-if="!currentUser.prfphoto"
                class="avatar q-pt-none q-mt-none"
                src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
              />
            </q-avatar>

            <div class="q-mx-lg">
              <p style="font-size: small">@{{ currentUser.username }}</p>
              <span
                class="defaultfont-bold text-uppercase"
                style="font-size: medium"
              >
                {{ currentUser.fName }} {{ currentUser.lName }}
              </span>
              <!-- <div>
              <p style="font-size: smaller; line-height: 0.85rem">
                {{ currentUser.position }} <br />
                {{ currentUser.office }}
              </p>
            </div> -->
            </div>
          </div>

          <!-- Edit Profile -->
          <div class="q-mt-md flex flex-center">
            <div class="column">
              <div class="col">
                <q-btn
                  label="edit"
                  :ripple="false"
                  unelevated
                  rounded
                  dense
                  no-caps
                  color="primary"
                  text-color="white"
                  style="height: 1.5rem; width: 5rem; font-size: smaller"
                  @click="onShowDialog(currentUser)"
                />
              </div>
              <!-- Logout Button -->
              <div class="col">
                <q-btn
                  icon="bi-box-arrow-right"
                  label="Logout"
                  :ripple="false"
                  dense
                  flat
                  size="sm"
                  color="primary"
                  class="q-my-sm"
                  @click="() => $router.replace('/')"
                />
              </div>
            </div>
          </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>

      <q-btn-group flat spread style="height: 2rem; width: 25rem">
        <q-btn
          icon="bi-search"
          label="Search"
          :ripple="false"
          size="sm"
          to="/logs"
        />
        <q-btn
          icon="bi-book"
          label="Records"
          :ripple="false"
          size="sm"
          to="/records"
        />
        <q-btn
          icon="bi-person"
          label="Accounts"
          :ripple="false"
          size="sm"
          to="/accounts/create"
        />
      </q-btn-group>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" overlay elevated side="right">
      <q-list>
        <q-btn
          icon="bi-arrow-right-short"
          :ripple="false"
          dense
          flat
          size="lg"
          color="primary"
          class="q-ma-sm absolute-top-right"
          @click="toggleRightDrawer"
        />

        <q-dialog v-model="Dialog" persistent>
          <q-card style="width: 40rem">
            <q-card-section>
              <div class="flex flex-center">
                <q-avatar class="q-my-md" size="8rem">
                  <!-- <q-img :src="`http://localhost:3000/media/${currentUser.prfphoto}`" /> -->
                  <q-img
                    v-if="inputAccount.prfphoto"
                    class="avatar q-pt-none q-mt-none"
                    :src="`http://localhost:3000/prfmedia/${inputAccount.prfphoto}`"
                  />
                  <img
                    v-if="!inputAccount.prfphoto"
                    class="avatar q-pt-none q-mt-none"
                    src="https://i.postimg.cc/FzcjmLj3/LOGO.jpg"
                  />
                </q-avatar>
                <div class="q-mt-sm q-px-xl">
                  <q-file
                    outlined
                    label="Upload Image"
                    accept=".jpg, image/*"
                    v-model="imageAttachement"
                  >
                  </q-file>
                </div>
              </div>
            </q-card-section>

            <div class="q-gutter-y-sm column flex flex-center">
              <q-input
                dense
                filled
                v-model="inputAccount.fName"
                stack-label
                label="FirstName:"
                placeholder="Firstname"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Input your FirstName',
                ]"
                hide-bottom-space
              />
              <q-input
                dense
                filled
                v-model="inputAccount.lName"
                stack-label
                label="LastName:"
                placeholder="LastName"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Input your FirstName',
                ]"
                hide-bottom-space
              />
              <q-input
                dense
                filled
                v-model="inputAccount.mName"
                stack-label
                label="MiddleName:"
                placeholder="MiddleName"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Input your FirstName',
                ]"
                hide-bottom-space
              />
              <q-input
                dense
                filled
                v-model="inputAccount.username"
                stack-label
                label="UserName:"
                placeholder="UserName"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Input your FirstName',
                ]"
                hide-bottom-space
              />
              <div class="flex flex-center defaultfont">
                <q-btn
                  :ripple="false"
                  unelevated
                  dense
                  no-caps
                  class="text-#BE282D"
                  style="height: 2rem; width: 25rem; font-size: smaller"
                  color="grey-3"
                  text-color="primary"
                  label="change password"
                  @click="onEditPassword()"
                />
              </div>

              <!-- <q-select
                class="q-mt-xs"
                v-model="inputAccount.position"
                :options="Position"
                dense
                filled
                label="Position:"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Choose Your College',
                ]"
                hide-bottom-space
              />
              <q-select
                class="q-mt-xs"
                v-model="inputAccount.office"
                :options="Office"
                dense
                filled
                label="Office:"
                style="width: 25rem; font-size: smaller"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Please Choose Your College',
                ]"
                hide-bottom-space
              /> -->
            </div>

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
                label="save"
                @click="onSaveAdminAccount()"
              />
            </div>
          </q-card>
        </q-dialog>

        <q-dialog v-model="secondDialog">
          <q-card
            class="defaultfont flex flex-center"
            style="height: 18rem; width: 25rem"
          >
            <div class="column">
              <div class="col flex flex-center q-mb-md">
                <q-icon size="3rem" name="lock" color="primary" />
              </div>
              <!-- <div class="col q-mb-md flex flex-center">
              change password
            </div> -->
              <div class="col q-ma-xs">
                <q-input
                  label="Current Password"
                  v-model="password.oldPassword"
                  filled
                  dense
                  style="width: 20rem; font-size: smaller"
                  :type="showPwd1 ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Input your old password',
                  ]"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPwd1 ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
                      class="cursor-pointer"
                      @click="showPwd1 = !showPwd1"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col q-ma-xs">
                <q-input
                  label="New Password"
                  v-model="password.newPassword"
                  filled
                  dense
                  style="width: 20rem; font-size: smaller"
                  :type="showPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Input your new password',
                  ]"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
                      class="cursor-pointer"
                      @click="showPwd = !showPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col q-ma-xs">
                <q-input
                  label="Confirm Password"
                  v-model="confirmpassword"
                  filled
                  dense
                  style="width: 20rem; font-size: smaller"
                  :type="showPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Input your confirm password',
                  ]"
                  hide-bottom-space
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
                      class="cursor-pointer"
                      @click="showPwd = !showPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col flex flex-center">
                <q-btn
                  class="text-white q-mt-md"
                  align="center"
                  :ripple="false"
                  unelevated
                  rounded
                  dense
                  no-caps
                  style="height: 1.5rem; width: 6rem; font-size: smaller"
                  color="primary"
                  label="save"
                  @click="onSavePassword()"
                />
              </div>
            </div>
          </q-card>
        </q-dialog>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {
  MediaDto,
  PrfMediaDto,
  UserDto,
  ChangePasswordDto,
} from "src/services/rest-api";
import { mbalingApiService } from "src/services/mbaling-api.service";
import { AUser } from "src/store/auth/state";
import { Options, Vue } from "vue-class-component";
import { mapActions, mapState } from "vuex";

@Options({
  methods: {
    ...mapActions("auth", ["authUser", "changePassword"]),
    ...mapActions("account", ["editAccount", "getAllUser"]),
    ...mapActions("media", ["uploadMedia"]),
  },
  computed: {
    ...mapState("auth", ["currentUser"]),
  },
})
export default class MainLayout extends Vue {
  editAccount!: (payload: UserDto) => Promise<void>;
  uploadMedia!: (payload: File) => Promise<PrfMediaDto>;
  authUser!: () => Promise<void>;
  currentUser!: any;

  imageAttachement: File = new File([], "Pick a Profile Picture");
  rightDrawerOpen = false;
  isPwd = true;
  editAdminProfile = false;

  async mounted() {
    await this.authUser();
  }

  async toggleRightDrawer() {
    this.rightDrawerOpen = !this.rightDrawerOpen;
  }

  inputAccount: any = {
    prfphoto: 0,
    fName: "",
    lName: "",
    mName: "",
    username: "",
    password: "",
    position: "",
    office: "",
  };

  // Edit Profile
  Dialog = false;

  async onShowDialog(val: AUser) {
    this.Dialog = true;
    this.inputAccount = { ...val };
  }

  async onSaveAdminAccount() {
    this.Dialog = false;
    this.$q
      .dialog({
        title: "Confirm Edit",
        message: "Are you sure you want to save this changes?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        try {
          if (this.imageAttachement.size > 0) {
            console.log("1 Upload Image");
            const media = await this.uploadMedia(this.imageAttachement as File);
            console.log("2 Upload Image");
            await this.editAccount({
              ...this.inputAccount,
              prfphoto: media.id,
            });
          } else if (this.imageAttachement.size <= 0) {
            await this.editAccount({ ...this.inputAccount });
          }
          this.$q.notify({
            position: "bottom",
            color: "secondary",
            textColor: "primary",
            type: "positive",
            classes: "defaultfont",
            message: "Successfully Updated!",
          });
          // window.location.reload();
        } catch (error) {
          this.$q.notify({
            type: "negative",
            message: "Unsuccessfully Update",
          });
        }
      });
  }

  // Edit Password
  secondDialog = false;
  changePassword!: (changePassword: ChangePasswordDto) => Promise<void>;
  password: ChangePasswordDto = {
    oldPassword: "",
    newPassword: "",
  };

  confirmpassword = "";
  showPwd = true;
  showPwd1 = true;

  async resetModel() {
    this.password = {
      oldPassword: "",
      newPassword: "",
    };
    this.confirmpassword = "";
  }

  async onEditPassword() {
    this.secondDialog = true;
    this.resetModel();
  }

  async onSavePassword() {
    this.secondDialog = false;
    this.$q
      .dialog({
        title: "Confirm Password Edit",
        message: "Are you sure you want to save this changes?",
        cancel: true,
        persistent: true,
        class: "defaultfont",
      })
      .onOk(async () => {
        try {
          if (this.password.newPassword != this.confirmpassword) {
            this.$q.notify({
              type: "negative",
              message: "Passwords not match!",
            });
            return;
          }
          await mbalingApiService.changePassword(this.password);
          this.$q.notify({
            type: "positive",
            color: "secondary",
            textColor: "primary",
            message: "Change password successfully",
          });
        } catch (error: any) {
          this.$q.notify({
            type: "negative",
            message: "Invalid current password",
          });
        }
      });
  }

  Position = ["Assistant Director", "Secretary", "Officer"];
  Office = ["Housing Management Division"];
}
</script>

