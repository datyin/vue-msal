import { defineStore } from "pinia";
import { ref } from "vue";
import type { AccountInfo } from "@azure/msal-browser";

export const useUserStore = defineStore("user", () => {
  const info = ref<AccountInfo | null>(null);

  function update(user: AccountInfo | null) {
    info.value = user;
  }

  return {
    info,
    update,
  };
});
