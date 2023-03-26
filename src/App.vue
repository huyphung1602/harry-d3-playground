<template>
  <h3>D3 Playground</h3>
  <MonacoEditor
    theme="vs"
    :options="options"
    language="javascript"
    :width="800"
    :height="600"
    v-model:value="playgroundCode"
  ></MonacoEditor>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import { ref, onMounted } from 'vue'

const options = {
  colorDecorators: true,
  lineHeight: 24,
  tabSize: 2,
};
const playgroundCode = ref('');
</script>

<style scoped></style>
