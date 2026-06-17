"use client";

import Header from "@/components/dashboard/Header";
import { useState, useEffect } from "react";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useUser } from "@/hooks/useUser";
import Loader from "@/components/Loader";
import { redirect } from "next/navigation";

export default function layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { mode, toggleTheme } = useThemeMode();
  const user = useUser();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleButtonAction = () => redirect("/tasks");

  const handleLogout = () => {
    pb.authStore.clear();
    redirect("/login");
  };

  if (!mounted) {
    return <Loader />;
  }

  if (!user) {
    redirect("/login");
  }
  return (
    <>
      <Header
        mode={mode}
        toggleTheme={toggleTheme}
        user={user}
        onLogout={handleLogout}
        buttonAction={handleButtonAction}
        position={"static"}
        navbar={false}
      />
      {children}
    </>
  );
}
