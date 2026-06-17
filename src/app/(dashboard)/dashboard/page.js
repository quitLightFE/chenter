"use client";

import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";

import {
  School,
  CheckCircle,
  AccessTime,
  Star,
  Assignment,
  Notifications,
  EmojiEvents,
} from "@mui/icons-material";

// Импорт мок-данных
import {
  studentStats,
  myCourses,
  upcomingTasks,
  activity,
  achievements,
} from "./mockData";

import { useUser } from "@/hooks/useUser";

// Маппинг иконок для статус-карточек
const statIcons = {
  courses: <School color="primary" />,
  completed: <CheckCircle color="success" />,
  pending: <AccessTime color="warning" />,
  score: <Star color="secondary" />,
};

export default function StudentDashboard() {
  // Имя вытаскиваем статично, в будущем тут будет pb.authStore.model.username
  const user = useUser();
  const username = user?.name ?? "username";

  return (
    <Box
    // sx={{ p: { xs: 2, md: 4 }, maxWidth: 1440, margin: "0 auto" }}
    >
      {/* Приветствие */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Добро пожаловать, {username} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Рад тебя видеть! Вот твои успехи на сегодня.
        </Typography>
      </Box>

      {/* Блок 1: 4 Карточки Статистики */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {studentStats.map((stat) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            sx={{ justifyContent: "center" }}
            key={stat.id}
          >
            <Card
              variant="outlined"
              sx={{ height: "100%", bgcolor: "background.paper" }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ mt: 0.5 }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "action.hover",
                    borderRadius: 2,
                    display: "flex",
                  }}
                >
                  {statIcons[stat.type]}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Блок 2: Основной контент */}
      <Grid container spacing={3}>
        {/* Левая колонка: Мои курсы (Занимает больше места на десктопе) */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            variant="outlined"
            sx={{ p: 3, height: "100%", bgcolor: "background.paper" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <School sx={{ mr: 1, color: "primary.main" }} />
              <Typography variant="h6" fontWeight="bold">
                Мои курсы
              </Typography>
            </Box>

            <List disablePadding>
              {myCourses.map((course, index) => (
                <Box
                  key={course.id}
                  sx={{ mb: index !== myCourses.length - 1 ? 3 : 0 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="medium">
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {course.progress}%
                    </Typography>
                  </Box>

                  {/* Прогресс-бар */}
                  <LinearProgress
                    variant="determinate"
                    value={course.progress}
                    sx={{ height: 8, borderRadius: 4, mb: 1.5 }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Уроки: {course.lessonsCompleted} из {course.totalLessons}
                    </Typography>
                    {course.nextLesson && (
                      <Typography
                        variant="caption"
                        color="text.primary"
                        fontWeight="medium"
                      >
                        Далее:{" "}
                        <span style={{ opacity: 0.8 }}>
                          {course.nextLesson}
                        </span>
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Правая колонка: Ближайшие задания */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper
            variant="outlined"
            sx={{ p: 3, height: "100%", bgcolor: "background.paper" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Assignment sx={{ mr: 1, color: "warning.main" }} />
              <Typography variant="h6" fontWeight="bold">
                Ближайшие задания
              </Typography>
            </Box>

            <List disablePadding>
              {upcomingTasks.map((task) => (
                <ListItem
                  key={task.id}
                  disableGutters
                  sx={{
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    "&:last-child": { borderBottom: 0 },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "medium" }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={task.course}
                  />
                  <Chip
                    label={`До ${task.dueDate}`}
                    size="small"
                    color="error"
                    variant="outlined"
                    sx={{ fontSize: "0.75rem" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Блок 3: Активность */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.paper" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Notifications sx={{ mr: 1, color: "info.main" }} />
              <Typography variant="h6" fontWeight="bold">
                Последняя активность
              </Typography>
            </Box>

            <List disablePadding>
              {activity.map((act) => (
                <ListItem key={act.id} disableGutters>
                  <ListItemText
                    primary={
                      <Typography variant="body2">{act.text}</Typography>
                    }
                    secondary={
                      <Typography variant="caption">{act.date}</Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Блок 4: Достижения */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper variant="outlined" sx={{ p: 3, bgcolor: "background.paper" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmojiEvents sx={{ mr: 1, color: "secondary.main" }} />
              <Typography variant="h6" fontWeight="bold">
                Достижения
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {achievements.map((ach) => (
                <Grid size={{ xs: 12, sm: 6 }} key={ach.id}>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: "background.paper",
                      opacity: ach.unlocked ? 1 : 0.5,
                      borderStyle: ach.unlocked ? "solid" : "dashed",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <EmojiEvents
                          color={ach.unlocked ? "secondary" : "disabled"}
                          fontSize="small"
                        />
                        <Typography variant="subtitle2" fontWeight="bold">
                          {ach.title}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {ach.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
