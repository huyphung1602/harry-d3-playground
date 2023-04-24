import { createApp } from 'vue';
import './style.css';
import 'flowbite';
import App from './App.vue';

import 'monaco-editor/esm/vs/editor/standalone/browser/accessibilityHelp/accessibilityHelp';
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard';
// import * as monaco from 'monaco-editor'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
export { editor };

// https://vitejs.dev/guide/features.html#web-workers
import monacoJsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import monacoCssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import monacoHtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import monacoTsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import monacoEditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

// const isDev = import.meta.env.MODE === 'development';
const isDev = false;
self.MonacoEnvironment = {
  getWorker: function (workerId, label) {
    console.debug(`* lazy imported Monaco Editor worker id '${workerId}', label '${label}'`)
    const getWorkerModule = (moduleUrl: string, label: string) => {
      return new Worker(new URL('/node_modules/monaco-editor/esm/vs/' + moduleUrl + '.js?worker', import.meta.url), {
        name: label,
        type: 'module'
      })
    }
    switch (label) {
      case 'json':
        return isDev ? getWorkerModule('language/json/json.worker', label) : new monacoJsonWorker()
      case 'css':
      case 'scss':
      case 'less':
        return isDev ? getWorkerModule('language/css/css.worker', label) : new monacoCssWorker()
      case 'html':
      case 'handlebars':
      case 'razor':
        return isDev ? getWorkerModule('language/html/html.worker', label) : new monacoHtmlWorker()
      case 'typescript':
      case 'javascript':
        return isDev ? getWorkerModule('language/typescript/ts.worker', label) : new monacoTsWorker()
      default:
        return isDev ? getWorkerModule('editor/editor.worker', label) : new monacoEditorWorker()
    }
  }
}

createApp(App).mount('#app');
