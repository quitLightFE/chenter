// imoort {createSubmission} from "@/servces"
// export function useSubmission(taskId) {
//   const [submission, setSubmission] = useState(null);

//   async function load() {
//     try {
//       const data = await getSubmission(
//         taskId,
//         pb.authStore.model.id
//       );

//       setSubmission(data);

//       return data;
//     } catch {
//       return null;
//     }
//   }

//   async function save(payload) {
//     if (submission) {
//       return updateSubmission(
//         submission.id,
//         payload
//       );
//     }

//     const created =
//       await createSubmission(payload);

//     setSubmission(created);

//     return created;
//   }

//   return {
//     submission,
//     load,
//     save
//   };
// }

// src/hooks/useSubmission.js

/*
import { useState, useEffect, useCallback } from "react";
import { submissionService } from "@/services";

export function useSubmission(taskId, studentId) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка существующей submission
  const loadSubmission = useCallback(async () => {
    if (!taskId || !studentId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const existing = await submissionService.getSubmission(taskId, studentId);
      setSubmission(existing);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [taskId, studentId]);

  useEffect(() => {
    loadSubmission();
  }, [loadSubmission]);

  // Сохранение (draft)
  const saveSubmission = useCallback(async (htmlCode, cssCode, jsCode) => {
    if (!taskId || !studentId) return;

    setSaving(true);
    try {
      const data = {
        id: submission?.id,
        task: taskId,
        student: studentId,
        htmlCode,
        cssCode,
        jsCode,
        status: "draft",
      };

      const updated = await submissionService.upsertSubmission(data);
      setSubmission(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [submission, taskId, studentId]);

  // Отправить на проверку
  const submitForReview = useCallback(async () => {
    if (!submission?.id) return;
    
    setSaving(true);
    try {
      const updated = await submissionService.submitForReview(submission.id);
      setSubmission(updated);
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, [submission]);

  return {
    submission,
    loading,
    saving,
    error,
    saveSubmission,
    submitForReview,
    refetch: loadSubmission,
  };
}

*/

import { useState, useEffect, useCallback, useRef } from "react";
import { submissionService } from "@/services";

export function useSubmission(taskId, studentId) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // useRef хранит актуальный ID без вызова лишних перерендеров useCallback
  const submissionIdRef = useRef(null);
  useEffect(() => {
    submissionIdRef.current = submission?.id || null;
  }, [submission?.id]);

  // Загрузка существующей submission с флагом отмены
  const loadSubmission = useCallback(async (activeSignal = { isCurrent: true }) => {
    if (!taskId || !studentId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const existing = await submissionService.getSubmission(taskId, studentId);
      
      if (activeSignal.isCurrent) {
        setSubmission(existing);
      }
    } catch (err) {
      // Игнорируем автоотмену PocketBase
      if (err.isAbort || err.status === 0) return;

      if (activeSignal.isCurrent) {
        console.error(err);
        setError(err.message || "Failed to load submission");
      }
    } finally {
      if (activeSignal.isCurrent) {
        setLoading(false);
      }
    }
  }, [taskId, studentId]);

  // Следим за жизненным циклом эффекта
  useEffect(() => {
    const activeSignal = { isCurrent: true };
    loadSubmission(activeSignal);

    return () => {
      activeSignal.isCurrent = false;
    };
  }, [loadSubmission]);

  // Сохранение (draft) — теперь функция стабильна и не пересоздается при изменении submission
  const saveSubmission = useCallback(async (htmlCode, cssCode, jsCode) => {
    if (!taskId || !studentId) return;

    setSaving(true);
    setError(null);
    try {
      const data = {
        id: submissionIdRef.current, // Берем актуальный id из ref
        task: taskId,
        student: studentId,
        htmlCode,
        cssCode,
        jsCode,
        status: "draft",
      };

      const updated = await submissionService.upsertSubmission(data);
      setSubmission(updated);
      return updated;
    } catch (err) {
      setError(err.message || "Failed to save draft");
      throw err;
    } finally {
      setSaving(false);
    }
  }, [taskId, studentId]); // Убрали submission из зависимостей

  // Отправить на проверку
  const submitForReview = useCallback(async () => {
    const currentId = submissionIdRef.current;
    if (!currentId) return;
    
    setSaving(true);
    setError(null);
    try {
      const updated = await submissionService.submitForReview(currentId);
      setSubmission(updated);
      return updated;
    } catch (err) {
      setError(err.message || "Failed to submit for review");
      throw err;
    } finally {
      setSaving(false);
    }
  }, []); // Убрали submission из зависимостей

  const handleRefetch = useCallback(() => loadSubmission(), [loadSubmission]);

  return {
    submission,
    loading,
    saving,
    error,
    saveSubmission,
    submitForReview,
    refetch: handleRefetch,
  };
}
