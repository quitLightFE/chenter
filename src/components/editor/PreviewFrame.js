import { Paper } from "@mui/material";

export default function PreviewFrame({ srcDoc, isMobile, showPreview }) {
  if (isMobile && !showPreview) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        // Заставляем компонент занимать абсолютно всё пространство родителя
        width: "100%",
        height: "100%",
        bgcolor: "#ffffff",
        borderLeft: isMobile ? "none" : "1px solid #333",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <iframe
        srcDoc={srcDoc}
        style={{ border: "none", width: "100%", height: "100%" }}
        title="preview"
        sandbox="allow-scripts"
      />
    </Paper>
  );
}
