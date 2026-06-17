import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PeopleIcon from "@mui/icons-material/People";

export const DRAWER_WIDTH = 280;

export const navigationItems = [
  { label: "Обзор", icon: "Dashboard", href: "/dashboard" },
  { label: "Курсы", icon: "School", href: "/courses" },
  { label: "Задания", icon: "Assignment", href: "/tasks" },
  { label: "Студенты", icon: "People", href: "/students" }
];

export const iconMap = {
  Dashboard: <DashboardIcon />,
  School: <SchoolIcon />,
  Assignment: <AssignmentIcon />,
  People: <PeopleIcon />
};
