<template>
  <div class="container mx-auto">
    <p class="text-2xl py-8">D3 Playground</p>
    <button
      class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4"
      @click="applyScript(playgroundCode)"
    >
      Run
    </button>
    <div class="flex flex-row">
      <div class="basis-1/2">
        <MonacoEditor
          theme="nightOwl"
          :options="options"
          language="javascript"
          :height="900"
          v-model:value="playgroundCode"
        />
      </div>
      <div
        class="basis-1/2 border rounded-md shadow ml-4 p-8"
      >
        <div id="d3-customized-content">
        <component :is="'script'">
          {{ playgroundCode }}
        </component>
        </div>
      </div>
    </div>
  </div>
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
const applyScript = (scriptCode : string) : void => {
  console.log(scriptCode);
  const result = eval(scriptCode);
  console.log(result);
};
</script>

<style scoped></style>
