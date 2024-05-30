<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { MsalProvider } from "@datyin/msal-vue";
import type { AccountInfo } from "@azure/msal-browser";
import SplashScreen from "./components/SplashScreen.vue";
import { useUserStore } from "./stores/user.ts";
import { msalConfig } from "./configs/msal.ts";

const user = useUserStore();
const loading = ref(true);

function handleAccountChanged(account: AccountInfo | null) {
  user.update(account);
}
</script>

<template>
  <MsalProvider
    :configuration="msalConfig"
    @initialized="() => loading = false"
    @account-changed="handleAccountChanged"
    @accounts-changed="(accounts) => console.debug('Accounts changed:', accounts)"
    @token-changed="(token) => console.debug('Token changed:', token)"
    @message="(message) => console.debug('Message:', message)"
    @dispose="() => console.debug('Disposed')"
  >
    <SplashScreen v-if="loading" />
    <RouterView v-else />
  </MsalProvider>
</template>
