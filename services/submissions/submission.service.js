// import pb from "@/lib/pocketbase";

// export async function getSubmission(taskId, studentId) {
//   return await pb
//     .collection("submissions")
//     .getFirstListItem(
//       `task="${taskId}" && student="${studentId}"`
//     );
// }

// export async function createSubmission(data) {
//   return await pb.collection("submissions").create(data);
// }

// export async function updateSubmission(id, data) {
//   return await pb.collection("submissions").update(id, data);
// }
// src/services/submission.service.js
import pb from "@/lib/pocketbase";

export const submissionService = {
  // Получить submission студента по задаче
  getSubmission: async (taskId, studentId) => {
    try {
      return await pb
        .collection("submissions")
        .getFirstListItem(
          pb.filter("task = {:taskId} && student = {:studentId}", {
            taskId,
            studentId
          })
        );
    } catch (err) {
      if (err.status === 404) return null;
      throw err;
    }
  },

  // Создать или обновить submission
  upsertSubmission: async data => {
    const { id, task, student, htmlCode, cssCode, jsCode, status } = data;

    const payload = {
      task,
      student,
      htmlCode,
      cssCode,
      jsCode,
      status: status || "draft",
      lastSavedAt: new Date().toISOString()
    };

    if (id) {
      // Обновление
      return await pb.collection("submissions").update(id, payload);
    } else {
      // Создание
      return await pb.collection("submissions").create(payload);
    }
  },

  // Отправить на проверку
  submitForReview: async submissionId => {
    return await pb.collection("submissions").update(submissionId, {
      status: "submitted",
      submittedAt: new Date().toISOString()
    });
  },

  // Получить все submissions для задачи (для учителя)
  getTaskSubmissions: async taskId => {
    return await pb.collection("submissions").getFullList({
      filter: `task="${taskId}"`,
      expand: "student"
    });
  }
};
