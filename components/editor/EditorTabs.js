import { Tabs, Tab } from "@mui/material";

export default function EditorTabs({ tab, setTab }) {
  return (
    <Tabs
      value={tab}
      onChange={(e, newValue) => setTab(newValue)}
      variant="fullWidth"
      sx={{ bgcolor: "#2d2d2d", borderBottom: "1px solid #333" }}
    >
      <Tab label="index.html" sx={{color: "#ffffff"}} />
      <Tab label="style.css" sx={{color: "#ffffff"}} />
      <Tab label="script.js" sx={{color: "#ffffff"}}  />
    </Tabs>
  );
}