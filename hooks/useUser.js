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
