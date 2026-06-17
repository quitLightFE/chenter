// export const studentStats = [
//   { id: 1, title: "Мои курсы", value: "3", change: "+1 новый курс", type: "courses" },
//   { id: 2, title: "Выполнено заданий", value: "24", change: "+5 за неделю", type: "completed" },
//   { id: 3, title: "На проверке", value: "2", change: "Ожидают проверки", type: "pending" },
//   { id: 4, title: "Средний балл", value: "4.8", change: "+0.2 за месяц", type: "score" },
// ];
export const studentStats = [
  { id: 1, title: "Мои курсы", value: "3", change: null, type: "courses" },
  { id: 2, title: "Выполнено заданий", value: "24", change: null, type: "completed" },
  { id: 3, title: "На проверке", value: "2", change: null, type: "pending" },
  { id: 4, title: "Средний балл", value: "4.8", change: null, type: "score" },
];

export const myCourses = [
  { id: "1", title: "JavaScript Basics", progress: 78, lessonsCompleted: 14, totalLessons: 18, nextLesson: "Цикл for" },
  { id: "2", title: "React Fundamentals", progress: 45, lessonsCompleted: 9, totalLessons: 20, nextLesson: "useState" },
  { id: "3", title: "HTML & CSS", progress: 100, lessonsCompleted: 12, totalLessons: 12, nextLesson: null },
];

export const recentTasks = [
  { id: "1", title: "Практика по циклам while", course: "JavaScript Basics", status: "approved", score: 5, submittedAt: "2026-06-08" },
  { id: "2", title: "FizzBuzz", course: "JavaScript Basics", status: "pending", score: null, submittedAt: "2026-06-09" },
  { id: "3", title: "Карточка профиля", course: "HTML & CSS", status: "approved", score: 4, submittedAt: "2026-06-07" },
];

export const upcomingTasks = [
  { id: "1", title: "Массивы", course: "JavaScript Basics", dueDate: "2026-06-12" },
  { id: "2", title: "useEffect", course: "React Fundamentals", dueDate: "2026-06-14" },
];

export const activity = [
  { id: "1", text: 'Задание "FizzBuzz" отправлено на проверку', date: "2 часа назад" },
  { id: "2", text: 'Получена оценка 5 за "Практика по циклам while"', date: "1 день назад" },
  { id: "3", text: 'Завершен урок "Функции"', date: "2 дня назад" },
];

export const achievements = [
  { id: "1", title: "Первые шаги", description: "Завершить первый урок", unlocked: true },
  { id: "2", title: "10 заданий", description: "Сдать 10 заданий", unlocked: true },
  { id: "3", title: "Отличник", description: "Получить 5 оценок подряд", unlocked: false },
];
