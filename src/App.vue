<template>
  <div class="px-16 md:px-12 sm:px-8 md:py-10 h-screen">
    <p class="text-2xl py-4">D3 Playground</p>
    <button
      class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4"
      @click="applyScript(playgroundCode)"
    >
      Run
    </button>
    <div class="flex justify-between h-3/4 mb-8">
      <div class="flex-auto w-32">
        <MonacoEditor
          theme="nightOwl"
          :options="options"
          language="javascript"
          v-model:value="playgroundCode"
        />
      </div>
      <div class="flex-none w-12"></div>
      <div
        class="flex-auto w-32 border rounded-md shadow p-8"
      >
        <D3Result :user-script="userScript" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MonacoEditor from 'monaco-editor-vue3';
import * as monaco from 'monaco-editor';
import D3Result from './components/D3Result.vue';
import nightOwl from 'monaco-themes/themes/Night Owl.json';
import { ref } from 'vue'

monaco.editor.defineTheme('nightOwl', nightOwl as monaco.editor.IStandaloneThemeData );
const options = {
  colorDecorators: true,
  lineHeight: 24,
  tabSize: 2,
  automaticLayout: 20,
};
const playgroundCode = ref('');
const userScript = ref('');
const applyScript = (scriptCode : string) : void => {
  userScript.value = scriptCode;
};
</script>

<style scoped></style>
