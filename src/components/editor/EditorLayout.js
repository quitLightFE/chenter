"use client";

import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import dynamic from "next/dynamic";

import EditorToolbar from "@/components/editor/EditorToolbar";
import EditorTabs from "@/components/editor/EditorTabs";
import CodeEditor from "@/components/editor/CodeEditor";
import PreviewFrame from "@/components/editor/PreviewFrame";

import { usePreview } from "@/hooks/usePreview";
import { useSubmission } from "@/hooks/useSubmission";
import { getCurrentUser } from "@/services";

// Динамически импортируем Split только на клиенте (SSR: false)
const Split = dynamic(() => import("react-split"), { ssr: false });

export default function EditorLayout({ task, taskId }) {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const [tab, setTab] = useState(0);
  const [showPreview, setShowPreview] = useState(!isMobile);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Получаем/сохраняем submission
  const { id } = getCurrentUser();
  const { submission, saveSubmission, submitForReview, saving } = useSubmission(
    taskId,
    id,
  );

  const {
    htmlCode,
    cssCode,
    jsCode,
    setHtmlCode,
    setCssCode,
    setJsCode,
    srcDoc,
  } = usePreview(task, submission);

  const handleSave = async () => {
    try {
      await saveSubmission(htmlCode, cssCode, jsCode);
      setSnackbarOpen(true);
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

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#1e1e1e",
          overflow: "hidden",
        }}
      >
        <EditorToolbar
          onSave={handleSave}
          onSubmit={handleSubmit}
          onOpenPreview={() => {
            const win = window.open();
            win?.document.write(srcDoc);
            win?.document.close();
          }}
          isMobile={isMobile}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          saving={saving}
        />

        <EditorTabs tab={tab} setTab={setTab} />

        {/* Основная рабочая область */}
        <Box sx={{ flex: 1, overflow: "hidden",
          "& .gutter.gutter-horizontal": {
                  backgroundColor: "#2d2d2d",
                  cursor: "col-resize",
                  transition: "background-color 0.2s",
                },

                "& .gutter.gutter-horizontal:hover": {
                  backgroundColor: "#007acc" /* Подсветка при наведении */,
                },
         }}>
          {isMobile ? (
            // Мобильная версия — переключение между редактором и превью
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!showPreview ? (
                <Box sx={{ flex: 1 }}>
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
              ) : (
                <PreviewFrame
                  srcDoc={srcDoc}
                  isMobile={isMobile}
                  showPreview={showPreview}
                />
              )}
            </Box>
          ) : (
            // Десктопная версия — с использованием react-split без SSR
            <Split
              sizes={[50, 50]}
              minSize={300}
              gutterSize={8}
              direction="horizontal"
              style={{ display: "flex", height: "100%", width: "100%" }}
            >
              {/* Левая панель: Редактор */}
              <Box sx={{ height: "100%", overflow: "hidden",
               }}>
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

              {/* Правая панель: Превью */}
              <Box sx={{ height: "100%" }}>
                <PreviewFrame
                  srcDoc={srcDoc}
                  isMobile={isMobile}
                  showPreview={true}
                />
              </Box>
            </Split>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Уведомление исчезнет само через 3 секунды
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: isMobile ? "bottom" : "top",
          horizontal: isMobile ? "center" : "right",
        }} // Появится снизу справа
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Прогресс успешно сохранен!
        </Alert>
      </Snackbar>
    </>
  );
}
