<script setup lang="ts">
import { ref } from "vue";
import { useMSAL } from "@datyin/msal-vue";

const msal = useMSAL();
const busy = ref(false);

async function handleLogin() {
  busy.value = true;

  if (msal) {
    await msal.loginRedirect({
      scopes: ["user.read"],
    });
  }

  busy.value = false;
}
</script>

<template>
  <button type="button" @click="handleLogin">
    Login
  </button>
</template>
