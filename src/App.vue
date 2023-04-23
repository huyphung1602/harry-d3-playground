<template>
  <div class="px-16 md:px-12 sm:px-8 md:py-10 h-screen">
    <p class="text-2xl py-4">Huy Phung's D3 Playground</p>
    <div class="flex">
      <button
        class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4 mr-4"
        @click="switchToCodeEditor('javascript')"
      >
        JS
      </button>
      <button
        class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4 mr-4"
        @click="switchToCodeEditor('html')"
      >
        HTML
      </button>
      <button
        class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4"
        @click="applyScript(monacoScript, monacoHtml)"
      >
        Run
      </button>
    </div>
    <div class="flex justify-between h-3/4 mb-8">
      <div class="flex-auto w-32">
        <MonacoEditor
          v-if="editorType === 'javascript'"
          theme="nightOwl"
          :options="options"
          language="javascript"
          v-model:value="monacoScript"
        />
        <MonacoEditor
          v-else
          theme="nightOwl"
          :options="options"
          language="html"
          v-model:value="monacoHtml"
        />
      </div>
      <div class="flex-none w-12"></div>
      <div
        class="box-content flex-auto w-32 border rounded-md shadow p-8"
      >
        <D3Result :user-script="userScript" :user-html="userHtml" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import D3Result from './components/D3Result.vue';
import MonacoEditor from './components/MonacoEditor.vue';
import { ref } from 'vue';

const options = {
  colorDecorators: true,
  lineHeight: 24,
  tabSize: 2,
  automaticLayout: 20,
};
const editorType = ref('javascript');
const monacoHtml = ref('<div></div>');
const monacoScript = ref('const d3Content = d3.select(\'.d3-content\');');
const userScript = ref('const d3Content = d3.select(\'.d3-content\');');
const userHtml = ref('<div></div>');
const switchToCodeEditor = (newEditorType : string) : void => {
  editorType.value = newEditorType;
}
const applyScript = (scriptCode : string, htmlCode : string) : void => {
  userScript.value = scriptCode;
  userHtml.value = htmlCode;
};
</script>

<style scoped></style>
