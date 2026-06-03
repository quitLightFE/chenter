export const mapTask = task => ({
  id: task.id,
  title: task.title,
  description: task.description,
  //difficulty: task.difficulty,
  created: task.created,
  htmlStarter: task.htmlStarter,
  cssStarter: task.cssStarter,
  jsStarter: task.jsStarter,
});