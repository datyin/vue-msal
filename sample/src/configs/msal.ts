import type { Configuration } from "@azure/msal-browser";
import { BrowserCacheLocation } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    authority: import.meta.env.VITE_AUTHORITY,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
  },
  system: {
    allowNativeBroker: false,
  },
};
