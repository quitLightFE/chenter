import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function EditorTabs({ tab, setTab }) {
  return (
    <Tabs
      value={tab}
      onChange={(e, newValue) => setTab(newValue)}
      variant="fullWidth"
      //#2d2d2d
      sx={{ bgcolor: "background.paper", borderBottom: "1px solid #333" }}
    >
      <Tab label="index.html" sx={{color: "text.primary"}} />
      <Tab label="style.css" sx={{color: "text.primary"}} />
      <Tab label="script.js" sx={{color: "text.primary"}}  />
    </Tabs>
  );
}