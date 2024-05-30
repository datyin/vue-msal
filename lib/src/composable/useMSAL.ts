import { inject } from "vue";
import type { PublicClientApplication } from "@azure/msal-browser";

export function useMSAL() {
  const msal = inject<PublicClientApplication>("msal");
  return msal;
}
