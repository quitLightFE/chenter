// "use client";

// import {
//   Box,
//   Container,
//   IconButton,
//   Typography,
//   Grid,
//   useTheme
// } from "@mui/material";

// import { features } from "../data/features";

// export default function FeaturesSection() {
//   const theme = useTheme();

//   return (
//     <Container maxWidth="lg" sx={{ py: 10 }}>
//       <Typography
//         variant="h4"
//         align="center"
//         fontWeight={700}
//         // mb={1}
//         sx={{ mb: 1 }}
//       >
//         Возможности платформы
//       </Typography>

//       <Typography
//         align="center"
//         color="text.secondary"
//         // mb={6}
//         sx={{
//           mb: 6
//         }}
//       >
//         Всё необходимое для обучения собрано в одном месте
//       </Typography>

//       <Grid container spacing={4}>
//         {features.map(({ icon: Icon, title, desc }, index) => (
//           <Grid
//             size={{
//               xs: 12,
//               sm: 6,
//               md: 4
//             }}
//             key={index}
//           >
//             <Box
//               sx={{
//                 height: "100%",
//                 p: 4,
//                 borderRadius: 4,
//                 border: "1px solid",
//                 borderColor: "divider",
//                 backgroundColor: "background.paper",

//                 transition: ".25s",

//                 "&:hover": {
//                   transform: "translateY(-6px)",

//                   boxShadow: theme.shadows[8]
//                 }
//               }}
//             >
//               <IconButton color="primary" sx={{ bgcolor: "primary.light", px:1, py:1 }}>
//                 <Icon
//                   sx={{
//                     fontSize: 40,
//                     color: "#ffffff",
//                     // mb: 2
//                   }}
//                 />
//               </IconButton>

//               <Typography variant="h6" fontWeight={600} mb={1}>
//                 {title}
//               </Typography>

//               <Typography color="text.secondary">{desc}</Typography>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// }


// import React from 'react';
// import CodeIcon from '@mui/icons-material/Code';
// import SpeedIcon from '@mui/icons-material/Speed';
// import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import SchoolIcon from '@mui/icons-material/School';
// import GroupsIcon from '@mui/icons-material/Groups';

// // Массив данных из предыдущего ответа
// const features = [
//   {
//     icon: <CodeIcon style={{ color: '#fff', fontSize: '20px' }} />,
//     title: "Интерактивный редактор кода",
//     desc: "Пишите, тестируйте и запускайте код прямо в браузере с подсветкой синтаксиса и живым предпросмотром.",
//     iconBg: '#1E75FF' // Синий
//   },
//   {
//     icon: <SpeedIcon style={{ color: '#fff', fontSize: '20px' }} />,
//     title: "Мгновенная обратная связь",
//     desc: "Получайте моментальный отзыв о вашем коде с помощью автоматических тестов и подробных объяснений.",
//     iconBg: '#9D1EFF' // Фиолетовый
//   },
//   {
//     icon: <ElectricBoltIcon style={{ color: '#fff', fontSize: '20px' }} />,
//     title: "Учитесь быстрее",
//     desc: "Структурированная учебная программа, созданная для развития реальных навыков через практические занятия.",
//     iconBg: '#FF1E9D' // Розовый
//   },
//   {
//     icon: <TrendingUpIcon style={{ color: '#fff', fontSize: '20px' }} />,
//     title: "Отслеживание прогресса",
//     desc: "Следите за процессом обучения с помощью детальных отчетов о прогрессе и достижений.",
//     iconBg: '#10B981' // Зеленый
//   },
//   {
//     icon: <SchoolIcon style={{ color: '#fff', fontSize: '20px' }} />,
//     title: "Экспертное обучение",
//     desc: "Учитесь у профессионалов индустрии с многолетним опытом преподавания программирования.",
//     iconBg: '#4F46E5' // Сине-фиолетовый
//   },
//   {
//     icon: <GroupsIcon style={{ color: '#fff', fontSize: '20px' }} />,
//     title: "Сообщество",
//     desc: "Общайтесь с другими студентами, задавайте вопросы и делитесь своими проектами.",
//     iconBg: '#06B6D4' // Голубой
//   }
// ];

// export default function FeaturesSection() {
//   // Стили вынесены в объект для чистоты JSX-разметки
//   const styles = {
//     container: {
//       backgroundColor: '#0A0E1A', // Очень темный фон контейнера
//       padding: '60px 40px',
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     grid: {
//       display: 'grid',
//       // Автоматическая адаптивность: 3 колонки на ПК, переход в 1-2 на маленьких экранах
//       gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//       gap: '30px',
//       maxWidth: '1200px',
//       width: '100%'
//     },
//     card: {
//       backgroundColor: '#151D30', // Темно-серый/синий фон карточки
//       borderRadius: '16px',
//       padding: '40px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'flex-start',
//       boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
//     },
//     iconWrapper: (bgColor) => ({
//       backgroundColor: bgColor,
//       width: '44px',
//       height: '44px',
//       borderRadius: '8px',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: '24px'
//     }),
//     title: {
//       color: '#FFFFFF',
//       fontSize: '22px',
//       fontWeight: '600',
//       margin: '0 0 14px 0',
//       fontFamily: 'system-ui, sans-serif'
//     },
//     desc: {
//       color: '#8A99AD', // Приглушенный цвет текста
//       fontSize: '15px',
//       lineHeight: '1.6',
//       margin: 0,
//       fontFamily: 'system-ui, sans-serif'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.grid}>
//         {features.map((item, index) => (
//           <div key={index} style={styles.card}>
//             {/* Круглая/квадратная подложка для иконки с динамическим цветом */}
//             <div style={styles.iconWrapper(item.iconBg)}>
//               {item.icon}
//             </div>
//             <h3 style={styles.title}>{item.title}</h3>
//             <p style={styles.desc}>{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


'use client';

import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';

import CodeIcon from '@mui/icons-material/Code';
import SpeedIcon from '@mui/icons-material/Speed';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

import { features } from '../data/features';

export default function FeaturesSection() {
  return (
    <Box
      sx={{
        // backgroundColor: '#0A0E1A',
        backgroundColor: 'background.paper',
        py: { xs: 8, md: 12 },
        // minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {features.map((item, index) => (
            <Grid size={{xs:12, sm:6, md:4}} key={index}>
              <Card
                sx={{
                  height: '100%',
                  //backgroundColor: '#151D30',
                  backgroundColor: 'background.dark',
                  borderRadius: '16px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  {/* Иконка */}
                  <Box
                    sx={{
                      backgroundColor: item.iconBg,
                      width: 44,
                      height: 44,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* Заголовок */}
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      mb: 2,
                      fontSize: '22px',
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Описание */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#8A99AD',
                      lineHeight: 1.7,
                      fontSize: '15px',
                    }}
                  >
                    {item.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}