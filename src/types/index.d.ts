import { Environment } from "monaco-editor";

export {};

declare global {
  interface Window {
    MonacoEnvironment?: Environment | undefined;
  }
}
