import QuestionnaireProvider from "@/context/QuestionnaireContext";
import React from "react";
import Chart from "./chart";
import Table from "../user/table";

export default function Dashboard() {
  return (
    <div className="p-4">
      <QuestionnaireProvider>
        <div className="flex flex-col gap-3">
          <Chart />
          <Table />
        </div>
      </QuestionnaireProvider>
    </div>
  );
}
