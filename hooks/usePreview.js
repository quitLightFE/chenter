// import { useMemo } from "react";

// export function usePreview(
//   htmlCode,
//   cssCode,
//   jsCode
// ) {
//   return useMemo(() => {
//     return `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>${cssCode}</style>
//       </head>
//       <body>
//         ${htmlCode}
//         <script>${jsCode}<\/script>
//       </body>
//       </html>
//     `;
//   }, [htmlCode, cssCode, jsCode]);
// }

// import { useMemo, useState } from "react";

// export function usePreview(task, submission) {
// 	console.error(submission);
//   const [htmlCode, setHtmlCode] = useState(submission?.htmlCode || task?.htmlStarter || "<h1>Hello World</h1>");
//   const [cssCode, setCssCode] = useState(submission?.cssCode || task?.cssStarter || "body { font-family: sans-serif; }");
//   const [jsCode, setJsCode] = useState(submission?.jsCode ||task?.jsStarter || "// Write your JavaScript here");

//   const srcDoc = useMemo(() => `
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Preview</title>
//       <style>${cssCode}</style>
//     </head>
//     <body>
//       ${htmlCode}
//       <script>${jsCode}</script>
//     </body>
//     </html>
//   `, [htmlCode, cssCode, jsCode]);

//   return {
//     htmlCode, setHtmlCode,
//     cssCode, setCssCode,
//     jsCode, setJsCode,
//     srcDoc,
//   };
// }



import { useState, useEffect, useMemo } from "react";

export function usePreview(task, submission) {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  // Приоритет: submission → task.starter → default
  useEffect(() => {
    if (submission?.htmlCode !== undefined) {
      setHtmlCode(submission.htmlCode);
    } else if (task?.htmlStarter) {
      setHtmlCode(task.htmlStarter);
    } else {
      setHtmlCode("<h1>Hello World</h1>");
    }
  }, [submission?.htmlCode, task?.htmlStarter]);

  useEffect(() => {
    if (submission?.cssCode !== undefined) {
      setCssCode(submission.cssCode);
    } else if (task?.cssStarter) {
      setCssCode(task.cssStarter);
    } else {
      setCssCode("body { font-family: sans-serif; }");
    }
  }, [submission?.cssCode, task?.cssStarter]);

  useEffect(() => {
    if (submission?.jsCode !== undefined) {
      setJsCode(submission.jsCode);
    } else if (task?.jsStarter) {
      setJsCode(task.jsStarter);
    } else {
      setJsCode("// Write your JavaScript here");
    }
  }, [submission?.jsCode, task?.jsStarter]);

  const srcDoc = useMemo(() => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Preview</title>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
      <script>${jsCode}</script>
    </body>
    </html>
  `, [htmlCode, cssCode, jsCode]);

  return {
    htmlCode,
    setHtmlCode,
    cssCode,
    setCssCode,
    jsCode,
    setJsCode,
    srcDoc,
  };
}