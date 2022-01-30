<script setup lang="ts">
import { addExtensionMethods } from '@sentry/tracing';
import { onMounted, ref } from 'vue';
import axios from 'axios';

interface dataType {
  word: string;
  definition: string;
  pronunciation: string;
}

const data = ref<dataType | null>(null);

function throwError() {
  throw new Error('Error ahaaha');
}

async function fetchApi() {
  axios.get('https://random-words-api.vercel.app/wor')
  .catch((err) => {
    console.error('Something wrong with the api')
    throw new Error(err)
  })
  .then((res) => {
    if (res.status === 200) {
      data.value = res.data[0];
    }
  });
}
</script>

<template>
  <button @click="throwError">Throw error</button>
  <button @click="fetchApi">{{data? 'Get a new one' : 'Get word of the day'}}</button>
  <div>
    <p>{{ data ? '' : '😢 Nothing here at the moment' }}</p>
    <p v-if="data">
    <div>
      Word of the day:
      <span style="font-weight: bold">{{ data ? data.word : '' }}</span>
    </div>
    <div>
      Definition:
      <span style="font-weight: bold">{{ data ? data.definition : '' }}</span>
    </div>
    <div>
      Pronunciation:
      <span style="font-weight: bold">{{ data ? data.pronunciation : '' }}</span>
    </div>
    </p>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
