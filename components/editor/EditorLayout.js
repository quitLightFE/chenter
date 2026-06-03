"use client";
import React, { useState } from "react";
import { Box, CssBaseline, useMediaQuery, Alert } from "@mui/material";
import EditorToolbar from "./EditorToolbar";
import EditorTabs from "./EditorTabs";
import CodeEditor from "./CodeEditor";
import PreviewFrame from "./PreviewFrame";
import { usePreview } from "@/hooks/usePreview";
import { useSubmission } from "@/hooks/useSubmission";
import { useTask } from "@/hooks/useTask";
import { getCurrentUser } from "@/services";

export default function EditorLayout({task, taskId }) {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const [tab, setTab] = useState(0);
  const [showPreview, setShowPreview] = useState(!isMobile);

  // Получаем задачу
  //const { task, loading: taskLoading } = useTask(taskId);

  // Получаем/сохраняем submission (нужен studentId)
  const { id } = getCurrentUser();
  const { submission, saveSubmission, submitForReview, saving } = useSubmission(
    taskId,
    id
  );

  const {
    htmlCode,
    cssCode,
    jsCode,
    setHtmlCode,
    setCssCode,
    setJsCode,
    srcDoc
  } = usePreview(task, submission); // передаём submission для начальных значений

  const handleSave = async () => {
    try {
      await saveSubmission(htmlCode, cssCode, jsCode);
      // Можно добавить toast уведомление
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleSubmit = async () => {
    if (!submission) return;
    try {
      await submitForReview();
      alert("Задание отправлено на проверку!");
    } catch (err) {
      alert("Ошибка при отправке");
    }
  };

  //if (taskLoading) return <Box sx={{ p: 4 }}>Загрузка задания...</Box>;

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#1e1e1e"
        }}
      >
        <EditorToolbar
          onSave={handleSave}
          onSubmit={handleSubmit}
          onOpenPreview={() => {
            const win = window.open();
            win.document.write(srcDoc);
            win.document.close();
          }}
          isMobile={isMobile}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          saving={saving}
        />

        <EditorTabs tab={tab} setTab={setTab} />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              flex: isMobile && !showPreview ? 1 : isMobile ? 0.5 : 1,
              display: isMobile && showPreview ? "none" : "flex"
            }}
          >
            <CodeEditor
              tab={tab}
              htmlCode={htmlCode}
              cssCode={cssCode}
              jsCode={jsCode}
              setHtmlCode={setHtmlCode}
              setCssCode={setCssCode}
              setJsCode={setJsCode}
              key={tab}
            />
          </Box>

          <PreviewFrame
            srcDoc={srcDoc}
            isMobile={isMobile}
            showPreview={showPreview}
          />
        </Box>
      </Box>
    </>
  );
}
