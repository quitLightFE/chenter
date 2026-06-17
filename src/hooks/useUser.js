"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, refreshCurrentUser } from "@/services";

export const useUser = () => {
  // Инициализируем стейт сразу данными из кэша (синхронно),
  // чтобы при первом рендере user не был равен null
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    async function syncUser() {
      try {
        // Делаем фоновый запрос на сервер за свежими данными
        const freshUser = await refreshCurrentUser();
        if (freshUser) {
          setUser(freshUser);
        }
      } catch (error) {
        console.error("Не удалось синхронизировать пользователя:", error);
      }
    }

    syncUser();
  }, []);

  return user;
};

/*
"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();

    setUser(currentUser);
  }, []);

  return user;
};
*/