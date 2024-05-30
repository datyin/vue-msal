<script setup lang="ts">
import { useUserStore } from "~/stores/user.ts";
import { login, logout } from "~/services/user.ts";

const user = useUserStore();
</script>

<template>
  HomePage

  <button v-if="user.info == null" type="button" @click="login">
    Login
  </button>

  <button v-else type="button" @click="logout">
    Logout
  </button>

  <pre>
    <code>
      {{ JSON.stringify(user.info, null, 2) }}
    </code>
  </pre>
</template>
