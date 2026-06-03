// import { getTaskById } from "@/services";

// export function useTask(taskId) {
//   const [task, setTask] = useState(null);

//   useEffect(() => {
//     load();
//   }, [taskId]);

//   async function load() {
//     const data = await getTaskById(taskId);
//     setTask(data);
//   }

//   return {
//     task
//   };
// }

// import { useEffect, useState } from "react";
// import { getTaskById } from "@/services";

// export function useTask(taskId) {
//   const [task, setTask] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTask = async () => {
//       try {
//         setLoading(true);
//         const data = await getTaskById(taskId);
//         setTask(data);
//         console.log("tasks: , ", data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (taskId) fetchTask();
//   }, [taskId]);

//   return { task, loading, error };
// }

// src/hooks/useTask.js
// "use client"
import { useEffect, useState, useCallback } from "react";
import { getTaskById } from "@/services";

export function useTask(taskId) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /*const fetchTask = useCallback(async () => {
    if (!taskId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getTaskById(taskId);
      //console.error(data);
      setTask(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load task");
    } finally {
      setLoading(false);
    }
  }, [taskId]);*/

  //useEffect(() => {
  //  fetchTask();
  //}, [fetchTask]);
useEffect(() => {
  let isCurrent = true;
  if (!taskId) return;

  const load = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(taskId);
      if (isCurrent) setTask(data);
    } catch (err) {
      if (err.isAbort || err.status === 0) return;
      if (isCurrent) setError(err.message);
    } finally {
      if (isCurrent) setLoading(false);
    }
  };

  load();
  return () => { isCurrent = false; };
}, [taskId]); // Зависимостью выступает только сам taskId

  return { task, loading, error };
}