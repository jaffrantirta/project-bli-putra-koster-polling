"use client";

import { QuestionnaireContext } from "@/context/QuestionnaireContext";
import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Questionnaire {
  answer: string;
}

export default function Chart() {
  const { questionnaire, fetch } = useContext(QuestionnaireContext);
  const [kg, setKG] = useState<number>(0);
  const [mp, setMP] = useState<number>(0);

  useEffect(() => {
    fetch();
    if (questionnaire && questionnaire.data !== null) {
      sorting(questionnaire.data);
    }
  }, [questionnaire]);

  const sorting = (data: Questionnaire[]) => {
    let kgCount = 0;
    let mpCount = 0;
    data.forEach((element) => {
      if (element.answer === "Koster - Giri") {
        kgCount++;
      } else if (element.answer === "Mulia - PAS") {
        mpCount++;
      }
    });

    setKG(kgCount);
    setMP(mpCount);
  };

  const data = {
    labels: ["Koster - Giri", "Mulia - PAS"],
    datasets: [
      {
        data: [kg, mp],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="md:p-6 bg-white rounded-3xl shadow-lg mx-auto">
      <div className="text-3xl font-bold text-primary mb-4 text-center">
        Polling Results
      </div>
      <div className="flex justify-center">
        <div className="w-full">
          <Doughnut data={data} />
        </div>
      </div>
      <div className="mt-8 flex gap-5 flex-col md:flex-row justify-around items-center">
        <div className="text-center md:mb-0 mb-8">
          <div className="text-2xl font-semibold text-primary">
            Koster - Giri
          </div>
          <div className="text-5xl font-bold text-gray-800">{kg}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-primary">Mulia - PAS</div>
          <div className="text-5xl font-bold text-gray-800">{mp}</div>
        </div>
      </div>
    </div>
  );
}
