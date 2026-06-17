"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import EditorLayout from "@/components/editor/EditorLayout";
import { useTask } from "@/hooks/useTask";
import Loader from "@/components/Loader";

export default function TaskPage({ params }) {
  const { id: taskId } = use(params);
  const { task, loading, error } = useTask(taskId);

  if (loading) return <Loader text="Загрузка задания..." />;
  if (error) return notFound();

  return <EditorLayout task={task} taskId={taskId} />;
}
