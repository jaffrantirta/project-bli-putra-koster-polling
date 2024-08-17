"use client";
import PrivateRoute from "@/auth/private";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <div className="flex">
        <div className="w-full">{children}</div>
      </div>
    </PrivateRoute>
  );
}
