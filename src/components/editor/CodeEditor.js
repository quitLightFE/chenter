// import { Editor } from "@monaco-editor/react";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

import dynamic from "next/dynamic";

// Загрузит редактор только тогда, когда он появится на клиенте
const Editor = dynamic(
  () => import("@monaco-editor/react").then(mod => mod.Editor),
  {
    ssr: false, // Отключаем рендеринг на сервере, так как Monaco нужен window
    loading: () => <p>Загрузка редактора кода...</p>
  }
);

const tabsConfig = [
  { language: "html", emmet: emmetHTML },
  { language: "css", emmet: emmetCSS },
  { language: "javascript", emmet: emmetJSX }
];

export default function CodeEditor({
  tab,
  htmlCode,
  cssCode,
  jsCode,
  setHtmlCode,
  setCssCode,
  setJsCode
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
      onChange={v => setValue(v || "")}
      onMount={(_, monaco) => current.emmet(monaco, [current.language])}
      options={{
        fontSize: 16,
        minimap: { enabled: false },
        wordWrap: "on",
        automaticLayout: true,
        tabSize: 2,
        scrollBeyondLastLine: false
      }}
    />
  );
}
