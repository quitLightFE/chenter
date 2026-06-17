import pb from "@/lib/pocketbase";
import { mapTask } from "./tasks.mapper";

export const getTasks = async () => {
  const tasks = await pb.collection("tasks").getFullList({
    sort: "-created",
    expand: "course"
  });

  return tasks.map(mapTask);
};

export const getTaskById = async id => {
  const task = await pb.collection("tasks").getOne(id);

  return mapTask(task);
};
