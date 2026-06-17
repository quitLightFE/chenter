export const mapTask = task => ({
  id: task.id,
  title: task.title,
  description: task.description,
  created: task.created,
  htmlStarter: task.htmlStarter,
  cssStarter: task.cssStarter,
  jsStarter: task.jsStarter,
  course: task?.expand?.course
});
  //difficulty: task.difficulty,