"use client";
import { use } from "react";
import EditorLayout from "@/components/editor/EditorLayout";
import { useTask } from "@/hooks/useTask";
import Loader from "@/components/Loader";

export default function TaskPage({ params }) {
  const { id: taskId } = use(params);
  const { task, loading, error } = useTask(taskId);

  if (loading) return <Loader text="Загрузка задания..." />;
  if (error) return <div>Error loading task</div>;

  return <EditorLayout task={task} taskId={taskId} />;
}

// "use client";
// import pb from "@/lib/pocketbase";
// import { Editor } from "@monaco-editor/react";
// import {
//   AppBar,
//   Button,
//   CssBaseline,
//   IconButton,
//   Paper,
//   Tab,
//   Tabs,
//   Toolbar,
//   Typography,
//   useMediaQuery,
//   Box
// } from "@mui/material";
// import { Menu, Preview, Code, Save } from "@mui/icons-material";
// import { emmetCSS, emmetHTML, emmetJSX } from "emmet-monaco-es";
// import React, { useEffect, useMemo, useState } from "react";

// export default function TaskPage({ params }) {
//   const { id: TaskID } = React.use(params);
//   const isMobile = useMediaQuery("(max-width: 900px)");

//   const [htmlCode, setHtmlCode] = useState("<html></html>");
//   const [cssCode, setCssCode] = useState("body {}");
//   const [jsCode, setJsCode] = useState("// js");

//   const [tab, setTab] = useState(0);
//   const [showPreview, setShowPreview] = useState(!isMobile); // на мобильных по умолчанию скрываем превью

//   // Загрузка стартовых кодов
//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         const data = await pb.collection("tasks").getOne(TaskID);
//         setHtmlCode(data.htmlStarter ?? "");
//         setCssCode(data.cssStarter ?? "");
//         setJsCode(data.jsStarter ?? "");
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchTask();
//   }, [TaskID]);

//   const srcDoc = useMemo(() => {
//     return `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Preview</title>
//         <style>${cssCode}</style>
//       </head>
//       <body>
//         ${htmlCode}
//         <script>${jsCode}</script>
//       </body>
//       </html>
//     `;
//   }, [htmlCode, cssCode, jsCode]);

//   const openPreviewWindow = () => {
//     const newWindow = window.open();
//     newWindow.document.write(srcDoc);
//     newWindow.document.close();
//   };

//   const tabsConfig = [
//     {
//       language: "html",
//       value: htmlCode,
//       setValue: setHtmlCode,
//       onMount: (e, m) => emmetHTML(m)
//     },
//     {
//       language: "css",
//       value: cssCode,
//       setValue: setCssCode,
//       onMount: (e, m) => emmetCSS(m)
//     },
//     {
//       language: "javascript",
//       value: jsCode,
//       setValue: setJsCode,
//       onMount: (e, m) => emmetJSX(m)
//     }
//   ];

//   const currentTab = tabsConfig[tab];

//   return (
//     <>
//       <CssBaseline />
//       <Box
//         sx={{
//           height: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           bgcolor: "#1e1e1e"
//         }}
//       >
//         {/* AppBar */}
//         <AppBar
//           position="static"
//           sx={{ bgcolor: "#252526", borderBottom: "1px solid #333" }}
//         >
//           <Toolbar sx={{ justifyContent: "space-between" }}>
//             <Typography variant="h6">Code Editor</Typography>

//             <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<Save />}
//                 onClick={() => {
//                   /* save logic */
//                 }}
//               >
//                 Save
//               </Button>

//               <Button
//                 variant="outlined"
//                 color="inherit"
//                 startIcon={<Preview />}
//                 onClick={openPreviewWindow}
//               >
//                 New Window
//               </Button>

//               {isMobile && (
//                 <IconButton
//                   color="inherit"
//                   onClick={() => setShowPreview(!showPreview)}
//                 >
//                   {showPreview ? <Code /> : <Preview />}
//                 </IconButton>
//               )}
//             </Box>
//           </Toolbar>
//         </AppBar>

//         {/* Tabs */}
//         <Tabs
//           value={tab}
//           onChange={(e, newValue) => setTab(newValue)}
//           variant="fullWidth"
//           sx={{ bgcolor: "#2d2d2d", borderBottom: "1px solid #333" }}
//         >
//           <Tab label="index.html" sx={{
//           	color: '#ffffff',
//           }}/>
//           <Tab label="style.css" sx={{
//           	color: '#ffffff',
//           }}/>
//           <Tab label="script.js" sx={{
//           	color: '#ffffff',
//           }} />
//         </Tabs>

//         {/* Main Content */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             overflow: "hidden"
//           }}
//         >
//           {/* Editor Section */}
//           <Box
//             sx={{
//               flex: isMobile && !showPreview ? 1 : isMobile ? 0.5 : 1,
//               display: showPreview && isMobile ? "none" : "flex",
//               flexDirection: "column",
//               minHeight: isMobile ? "50vh" : "auto"
//             }}
//           >
//             <Editor
//               height="100%"
//               language={currentTab.language}
//               theme="vs-dark"
//               value={currentTab.value}
//               onChange={v => currentTab.setValue(v || "")}
//               onMount={currentTab.onMount}
//               options={{
//                 fontSize: isMobile ? 15 : 16,
//                 minimap: { enabled: false },
//                 wordWrap: "on",
//                 scrollBeyondLastLine: false,
//                 automaticLayout: true,
//                 tabSize: 2
//               }}
//             />
//           </Box>

//           {/* Preview Section */}
//           <Paper
//             elevation={0}
//             sx={{
//               flex: isMobile && showPreview ? 1 : isMobile ? 0.5 : 1,
//               display: isMobile && !showPreview ? "none" : "block",
//               bgcolor: "#ffffff",
//               borderLeft: isMobile ? "none" : "1px solid #333",
//               overflow: "hidden"
//             }}
//           >
//             <iframe
//               srcDoc={srcDoc}
//               style={{ border: "none", width: "100%", height: "100%" }}
//               title="preview"
//               sandbox="allow-scripts allow-modals allow-popups"
//             />
//           </Paper>
//         </Box>
//       </Box>
//     </>
//   );
// }
