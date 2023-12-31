<script setup>
import { ref } from 'vue';

const username = ref('');
</script>

<template>
  <main>
    <h3>Introduce tu nombre de usuario</h3>
    <input placeholder="username" v-model="username" />
    <p>{{ username }}</p>
  </main>
</template>
