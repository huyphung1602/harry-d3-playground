<template>
  <h3>D3 Playground</h3>
  <MonacoEditor
    theme="nightOwl"
    :options="options"
    language="javascript"
    :width="800"
    :height="600"
    v-model:value="playgroundCode"
  ></MonacoEditor>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import * as monaco from 'monaco-editor';
import nightOwl from 'monaco-themes/themes/Night Owl.json';
import { ref, onMounted } from 'vue'

monaco.editor.defineTheme('nightOwl', nightOwl as monaco.editor.IStandaloneThemeData );
const options = {
  colorDecorators: true,
  lineHeight: 24,
  tabSize: 2,
};
const playgroundCode = ref('');
</script>

<style scoped></style>
