<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <q-btn
        :ripple="false"
        unelevated
        rounded
        stack
        padding="5rem"
        color="primary"
        class="q-mx-xl"
        to="/accounts/create"
      >
        <q-icon size="5rem" class="bi-pencil-square" />
        <span class="q-mt-sm defaultfont-semibold" style="font-size: small">
          Create
        </span>
      </q-btn>

      <q-btn
        :ripple="false"
        unelevated
        rounded
        stack
        padding="5rem"
        color="primary"
        class="q-mx-xl"
        to="/accounts/delete"
      >
        <q-icon size="5rem" class="bi-trash" />
        <span class="q-mt-sm defaultfont-semibold" style="font-size: small">
          Delete
        </span>
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class AccountsMenu extends Vue{}

</script>
