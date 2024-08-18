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
  const [ka, setKA] = useState<number>(0);
  const [mm, setMM] = useState<number>(0);
  const [sm, setSM] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      await fetch();

      if (questionnaire && questionnaire.data !== null) {
        sorting(questionnaire.data);
      }
    }
    fetchData();
  }, [questionnaire]);

  const sorting = (data: Questionnaire[]) => {
    let kgCount = 0;
    let kaCount = 0;
    let mmCount = 0;
    let smCount = 0;

    data.forEach((element) => {
      if (element.answer === "Koster - Ace") {
        kaCount++;
      } else if (element.answer === "Koster - Giri") {
        kgCount++;
      } else if (element.answer === "Mantra - Mulia") {
        mmCount++;
      } else if (element.answer === "Suradnyana - Mulia") {
        smCount++;
      }
    });

    setKA(kaCount);
    setKG(kgCount);
    setMM(mmCount);
    setSM(smCount);
  };

  const data = {
    labels: [
      "Koster - Giri",
      "Koster - Ace",
      "Mantra - Mulia",
      "Suradnyana - Mulia",
    ],
    datasets: [
      {
        data: [kg, ka, mm, sm],
        backgroundColor: ["#FF6384", "#36A2EB", "#817217", "#891891"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#817217", "#891891"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg max-w-4xl mx-auto">
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
          <div className="text-2xl font-semibold text-primary">
            Koster - Ace
          </div>
          <div className="text-5xl font-bold text-gray-800">{ka}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-semibold text-primary">
            Mantra - Mulia
          </div>
          <div className="text-5xl font-bold text-gray-800">{mm}</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-semibold text-primary">
            Suradnyana - Mulia
          </div>
          <div className="text-5xl font-bold text-gray-800">{sm}</div>
        </div>
      </div>
    </div>
  );
}
