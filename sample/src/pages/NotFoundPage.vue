<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  Not Found

  <button type="button" @click="router.replace({ name: 'HomePage' })">
    Go Home
  </button>
</template>
