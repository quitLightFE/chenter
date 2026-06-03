import pb from "@/lib/pocketbase";
import { getPbImage, getPbImageThumb } from "@/utils/getPbImage";

export const getCurrentUser = () => {
  // Получаем объект пользователя (в PocketBase v0.23+ это .record)
  const user = pb.authStore.record;

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    // Извлекаем кастомные поля напрямую, как свойства объекта
    name: user.name,
    role: user.role,
    avatar: getPbImage(user, user.avatar),
    thumb: getPbImageThumb(user, user.avatar)
  };
};
