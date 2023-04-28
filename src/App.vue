<template>
  <div class="px-16 md:px-12 sm:px-8 md:py-10 h-screen">
    <p class="text-2xl pt-4">D3 Playground</p>
    <p class="text-xl pt-1 pb-2">Made by huy.phung@holistics.io</p>
    <div class="flex justify-between">
      <div>
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
      </div>
      <div>
        <button
          class="bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4 mr-4"
          @click="applyScript(monacoScript, monacoHtml)"
        >
          Run
        </button>
        <button
          id="dropdownButton"
          class="inline-flex items-center bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-md font-semibold text-white my-4"
          type="button"
        >
          Select Preset
          <svg
            class="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <!-- Dropdown menu -->
        <div id="dropdownMenu" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
            <li v-for="preset in presets">
              <a
                @click.prevent="applyPreset(preset)"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {{ preset.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
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
        <D3Result :user-script="userScript" :user-html="userHtml" :last-run="currentTime"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import D3Result from './components/D3Result.vue';
import MonacoEditor from './components/MonacoEditor.vue';
import { onMounted, ref } from 'vue';
import type { DropdownOptions, DropdownInterface } from "flowbite";
import { Dropdown } from "flowbite";
import { Preset } from './types/preset';
import { presets } from './presets/index';

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
const currentTime = ref(Date.now());
const switchToCodeEditor = (newEditorType : string) : void => {
  editorType.value = newEditorType;
}
const applyScript = (scriptCode : string, htmlCode : string) : void => {
  userScript.value = scriptCode;
  userHtml.value = htmlCode;
  currentTime.value = Date.now();
};


const dropdown = ref<DropdownInterface>();
// options with default values
const dropDownOptions : DropdownOptions = {
  placement: 'bottom',
  triggerType: 'click',
  offsetSkidding: 0,
  offsetDistance: 10,
  delay: 300,
  onHide: () => {
    // console.log('dropdown has been hidden');
  },
  onShow: () => {
    // console.log('dropdown has been shown');
  },
  onToggle: () => {
    // console.log('dropdown has been toggled');
  }
};
const applyPreset = (preset : Preset) : void => {
  monacoScript.value = preset.script;
  monacoHtml.value = preset.html;
  if (dropdown.value) {
    dropdown.value.hide();
  }
}
onMounted(() => {
  // set the dropdown menu element
  const $targetEl : (HTMLElement | null) = document.getElementById('dropdownMenu');
  // set the element that trigger the dropdown menu on click
  const $triggerEl : (HTMLElement | null) = document.getElementById('dropdownButton');
  dropdown.value = new Dropdown($targetEl, $triggerEl, dropDownOptions);
})
</script>

<style scoped></style>
