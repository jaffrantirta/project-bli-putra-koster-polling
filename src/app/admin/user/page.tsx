import React from "react";
import Table from "./table";
import QuestionnaireProvider from "@/context/QuestionnaireContext";

export default function User() {
  return (
    <div className="p-4">
      <h1>User</h1>
      <QuestionnaireProvider>
        <Table />
      </QuestionnaireProvider>
    </div>
  );
}
