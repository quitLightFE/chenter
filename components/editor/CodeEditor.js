import { Editor } from "@monaco-editor/react";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

const tabsConfig = [
  { language: "html", emmet: emmetHTML },
  { language: "css", emmet: emmetCSS },
  { language: "javascript", emmet: emmetJSX },
];

export default function CodeEditor({
  tab,
  htmlCode,
  cssCode,
  jsCode,
  setHtmlCode,
  setCssCode,
  setJsCode,
}) {
  const current = tabsConfig[tab];
  const value = [htmlCode, cssCode, jsCode][tab];
  const setValue = [setHtmlCode, setCssCode, setJsCode][tab];

  return (
    <Editor
      height="100%"
      language={current.language}
      theme="vs-dark"
      value={value}
      onChange={(v) => setValue(v || "")}
      onMount={(_, monaco) => current.emmet(monaco, [current.language])}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
        tabSize: 2,
        scrollBeyondLastLine: false,
      }}
    />
  );
}