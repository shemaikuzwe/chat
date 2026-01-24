"use client";
import { useTheme } from "next-themes";
import { useState } from "react";

import { Switch } from "../ui/switch";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(theme === "dark");
  function toggleMode() {
    setTheme(theme === "dark" ? "light" : "dark");
    setChecked(!checked);
    return;
  }
  return (
    <div className="flex gap-2">
      <Switch onClick={toggleMode} checked={checked} className=" bg-foreground" />
    </div>
  );
}
