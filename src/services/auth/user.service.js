import pb from "@/lib/pocketbase";
import { getPbImage } from "@/utils/getPbImage";

export const getCurrentUser = () => {
  // В PocketBase v0.23+ для auth-коллекций используется .record или .identity в зависимости от контекста,
  // но в самом authStore объект хранится в .record
  const user = pb.authStore.record;

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: getPbImage(user, user.avatar),
    thumb: getPbImage(user, user.avatar, { thumb: "100x100" })
  };
};

export const refreshCurrentUser = async () => {
  try {
    // Если токена нет, просто выходим, не ломая сессию
    if (!pb.authStore.isValid || !pb.authStore.token) {
      return null;
    }

    // Делаем запрос к серверу
    const authData = await pb
      .collection("users")
      .authRefresh({ requestKey: null });

    // ВАЖНО: В PocketBase v0.23+ результат authRefresh возвращает record ИЛИ identity.
    // Делаем универсальную проверку, чтобы точно достать объект пользователя:
    const updatedUser =
      authData.record || authData.identity || pb.authStore.record;

    if (!updatedUser) return null;

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      avatar: getPbImage(updatedUser, updatedUser.avatar),
      thumb: getPbImage(updatedUser, updatedUser.avatar, { thumb: "100x100" })
    };
  } catch (error) {
    // Логируем ошибку для отладки, но НЕ вызываем pb.authStore.clear(),
    // чтобы не разлогинивать пользователя при временных сбоях сети или сервера
    console.error("Ошибка при фоновом обновлении пользователя:", error);

    // Возвращаем текущего закэшированного пользователя из authStore,
    // чтобы приложение продолжило работать в штатном режиме
    return getCurrentUser();
  }
};
