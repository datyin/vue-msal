# Microsoft Authentication Library for Vue (msal-vue)

## Installation

The MSAL Vue package is available on NPM.

```sh
# pnpm
pnpm add @datyin/msal-vue @azure/msal-browser vue

# yarn
yarn add @datyin/msal-vue @azure/msal-browser vue

# or npm
npm install @datyin/msal-vue @azure/msal-browser vue
```

## Usage

```vue
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
```

### MsalProvider

Props:

- `configuration`: MSAL configuration object

Events:

- `initialized`: Emitted when MSAL is initialized
- `account-changed`: Emitted when the signed-in account changes
- `accounts-changed`: Emitted when the list of signed-in accounts changes
- `token-changed`: Emitted when the access token changes
- `message`: Emitted when a event message is received from MSAL
- `dispose`: Emitted before the component is destroyed

Provider:

- `msal`: MSAL instance (You can use inject method to access it in child components or use useMsal composable function)

### useMsal

useMsal is a composable function that provides access to the MSAL instance. It can be used in vue components or other typescript/javascript files.

```typescript
import { useMSAL } from "@datyin/msal-vue";

export function login() {
  const msal = useMSAL();

  if (msal) {
    msal.loginRedirect({
      scopes: [
        "user.read",
      ],
    });
  }
}

export function logout() {
  const msal = useMSAL();

  if (msal) {
    msal.logoutRedirect();
  }
}

```

## Samples

See [Sample](../sample/README.md) for a complete example.
