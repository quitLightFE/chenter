import { AppBar, Toolbar, Typography, Button, IconButton, Box } from "@mui/material";
import { Save, Preview, Code } from "@mui/icons-material";

export default function EditorToolbar({
  onSave,
  onOpenPreview,
  isMobile,
  showPreview,
  setShowPreview,
}) {
  return (
    <AppBar position="static" sx={{ bgcolor: "background.default", borderBottom: "1px solid #333" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{color:"text.primary"}}>Code Editor</Typography>

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            startIcon={<Save />}
            onClick={onSave}
          >
            Save
          </Button>

          <Button
            variant="outlined"
            sx={{color:"text.primary", borderColor: 'text.primary'}}
            startIcon={<Preview />}
            onClick={onOpenPreview}
          >
            New Tab
          </Button>

          {isMobile && (
            <IconButton color="text.primary" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? <Code /> : <Preview />}
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}