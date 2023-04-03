<template>
  <div class="monaco-editor-vue3" :style="style"></div>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, StyleValue, ref } from 'vue';
import * as monaco from 'monaco-editor';
import nightOwl from 'monaco-themes/themes/Night Owl.json';

export default defineComponent({
  name: 'MonacoEditor',
  props: {
    width: { type: [String, Number], default: '100%' },
    height: { type: [String, Number], default: '100%' },
    original: { String, default: '' },
    value: { String, default: '' },
    language: { type: String, default: 'javascript' },
    theme: { type: String, default: 'vs' },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  emits: ['editorWillMount', 'editorDidMount', 'change', 'update:value'],
  setup(props) {
    const { width, height } = toRefs(props)
    const style = computed(() => {
      const fixedWidth = width.value.toString().includes('%')
        ? width.value
        : `${width.value}px`
      const fixedHeight = height.value.toString().includes('%')
        ? height.value
        : `${height.value}px`
      return {
        width: fixedWidth,
        height: fixedHeight,
        'text-align': 'left',
      } as StyleValue
    })
    const editor = null as unknown as monaco.editor.IStandaloneCodeEditor;
    return {
      style,
      editor,
    }
  },
  mounted() {
    this.initMonaco()
  },
  beforeDestroy() {
    this.editor && this.editor.dispose()
  },
  methods: {
    initMonaco() {
      this.$emit('editorWillMount', monaco)
      monaco.editor.defineTheme('nightOwl', nightOwl as monaco.editor.IStandaloneThemeData );
      const { value, language, theme, options } = this
      this.editor = monaco.editor.create(this.$el, {
        value: value,
        language: language,
        theme: theme,
        ...options,
      });
      const editor = this._getEditor();
      // @event `change`
      editor &&
        editor.onDidChangeModelContent((event) => {
          const value = editor.getValue()
          if (this.value !== value) {
            this.$emit('change', value, event)
            this.$emit('update:value', value)
          }
        });
      this.$emit('editorDidMount', this.editor);
    },
    _setValue(value: string) {
      let editor = this._getEditor()
      if (editor) return editor.setValue(value)
    },
    _getValue() {
      let editor = this._getEditor()
      if (!editor) return ''
      return editor.getValue()
    },
    _getEditor() {
      if (!this.editor) return null
      return this.editor
    },
    _setOriginal() {
      const original = this.editor.getModel() as monaco.editor.ITextModel;
      original.setValue(this.original)
    },
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.editor.updateOptions(options)
      },
    },
    value() {
      this.value !== this._getValue() && this._setValue(this.value)
    },
    original() {
      this._setOriginal()
    },
    language() {
      if (!this.editor) return
      monaco.editor.setModelLanguage(this.editor.getModel() as monaco.editor.ITextModel, this.language);
    },
    theme() {
      monaco.editor.setTheme(this.theme)
    },
  },
})
</script>
