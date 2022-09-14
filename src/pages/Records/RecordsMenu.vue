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
        to="/records/student"
      >
        <q-icon size="5rem" class="mbi-account" />
        <span class="q-mt-sm defaultfont-semibold" style="font-size: small">
          Student
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
        to="/records/landlord"
      >
        <q-icon size="5rem" class="mbi-home" />
        <span class="q-mt-sm defaultfont-semibold" style="font-size: small">
          Landlord
        </span>
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class RecordsMenu extends Vue {}
</script>
