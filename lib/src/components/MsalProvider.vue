<script setup lang="ts">
import type { AccountInfo, Configuration, EventMessage } from "@azure/msal-browser";
import { onBeforeUnmount, onMounted, provide } from "vue";
import { EventType, PublicClientApplication } from "@azure/msal-browser";

defineOptions({
  name: "MsalProvider",
  inheritAttrs: false,
});

const props = defineProps<{
  configuration: Configuration;
}>();

const emit = defineEmits<{
  (e: "initialized", msal: PublicClientApplication): void;
  (e: "accountChanged", account: AccountInfo | null): void;
  (e: "accountsChanged", accounts: AccountInfo[]): void;
  (e: "tokenChanged", token: string): void;
  (e: "dispose"): void;
  (e: "message", message: EventMessage): void;
}>();

const msal = new PublicClientApplication(props.configuration);
let callbackId: string | null = null;

provide("msal", msal);

onMounted(async () => {
  msal.enableAccountStorageEvents();
  callbackId = msal.addEventCallback((message) => {
    if (message.eventType === EventType.ACTIVE_ACCOUNT_CHANGED) {
      emit("accountChanged", msal.getActiveAccount());
    }
    else if (message.eventType === EventType.ACCOUNT_ADDED || message.eventType === EventType.ACCOUNT_REMOVED) {
      const accounts = msal.getAllAccounts();
      emit("accountsChanged", Array.isArray(accounts) ? accounts : []);
    }
    else if (message.eventType === EventType.ACQUIRE_TOKEN_BY_CODE_SUCCESS || message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
      if (message.payload != null && typeof message.payload === "object" && "accessToken" in message.payload) {
        emit("tokenChanged", message.payload.accessToken ?? "");
      }
    }
    else if (message.eventType === EventType.INITIALIZE_END) {
      emit("initialized", msal);
      emit("accountChanged", msal.getActiveAccount());
      emit("accountsChanged", msal.getAllAccounts() ?? []);
    }

    emit("message", message);
  });

  await msal.initialize();
  const redirected = await msal.handleRedirectPromise();

  if (redirected != null) {
    msal.setActiveAccount(redirected.account);
  }
});

onBeforeUnmount(() => {
  msal.disableAccountStorageEvents();

  if (callbackId) {
    msal.removeEventCallback(callbackId);
  }

  emit("dispose");
});
</script>

<template>
  <slot />
</template>
