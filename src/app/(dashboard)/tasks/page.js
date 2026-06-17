"use client";
import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";

import Link from "next/link";

import CodeIcon from "@mui/icons-material/Code";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTasks } from "@/hooks/useTasks";
// Пример данных, пропущенных через ваш маппер mapTask
const mockTasks = [
  {
    id: "1",
    title: "Валидация формы регистрации",
    description:
      "Реализуйте клиентскую валидацию полей email, password и phone с выводом ошибок.",
    created: "2026-06-01",
    htmlStarter: true,
    cssStarter: true,
    jsStarter: true,
  },
  {
    id: "2",
    title: 'Адаптивное меню "Гамбургер"',
    description:
      "Создайте меню, которое скрывается на десктопах и превращается в кнопку-иконку на мобильных устройствах.",
    created: "2026-06-03",
    htmlStarter: true,
    cssStarter: true,
    jsStarter: false,
  },
  {
    id: "3",
    title: "Компонент Слайдера (Карусель)",
    description:
      'Разработайте карусель картинок с кнопками "Вперед/Назад" и автоматическим переключением.',
    created: "2026-06-05",
    htmlStarter: true,
    cssStarter: false,
    jsStarter: true,
  },
];

export default function TasksPage() {
  // Форматирование даты
  const { tasks, loading, error } = useTasks();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <Box
    // sx={{ p: 3 }}
    >
      {/* Заголовок секции */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Доступные задания
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Выбирайте задачу, изучайте стартовый код и приступайте к решению.
        </Typography>
      </Box>

      {/* Сетка карточек */}
      <Grid container spacing={3}>
        {(tasks ?? mockTasks).map((task) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.light",
                borderRadius: 3,
                boxShadow: (theme) => theme.shadows[2],
                transition:
                  "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  //boxShadow: theme => theme.shadows[4]
                  border: "0.5px solid",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                {/* Верхняя панель: Дата и Технологии */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    <AccessTimeIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption">
                      {formatDate(task.created)}
                    </Typography>
                  </Box>

                  {/* Теги стартового кода (индикаторы технологий) */}
                  {/* <Box sx={{ display: "flex", gap: 0.5 }}>
                    {task.htmlStarter && (
                      <Chip
                        label="HTML"
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ fontSize: "10px", height: 20 }}
                      />
                    )}
                    {task.cssStarter && (
                      <Chip
                        label="CSS"
                        size="small"
                        variant="outlined"
                        color="secondary"
                        sx={{ fontSize: "10px", height: 20 }}
                      />
                    )}
                    {task.jsStarter && (
                      <Chip
                        label="JS"
                        size="small"
                        variant="outlined"
                        color="warning"
                        sx={{ fontSize: "10px", height: 20 }}
                      />
                    )}
                  </Box> */}
                  <Box>
                    <Chip component={Link}  href={`/courses/${task.course.id}`} label={task.course.title} />
                  </Box>
                </Box>

                {/* Название и описание */}
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ mb: 1.5, fontWeight: 600, lineHeight: 1.3 }}
                >
                  {task.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {task.description}
                </Typography>
              </CardContent>

              {/* Кнопки действия */}
              <CardActions
                sx={{ p: 2, pt: 0, justifyContent: "space-between" }}
              >
                <Tooltip title="Посмотреть стартовый код">
                  <IconButton color="action" size="small">
                    <CodeIcon />
                  </IconButton>
                </Tooltip>

                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  href={`/tasks/${task.id}`}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Начать
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// "use client";
// import pb from "@/lib/pocketbase";
// import { Box, Button, Typography } from "@mui/material";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useTasks } from "@/hooks/useTasks";

// export default function Tasks() {
//   const { tasks, loading, error } = useTasks();

//   return (
//     <Box>
//       {tasks.map(task => (
//         <Box key={task.id}>
//           <Typography>{task.title}</Typography>
//           <Typography>{task.description}</Typography>
//           <Button
//             variant="contained"
//             component={Link}
//             href={`/tasks/${task.id}`}
//             sx={{ m: 1 }}
//           >
//             Начать
//           </Button>
//         </Box>
//       ))}
//     </Box>
//   );
// }
