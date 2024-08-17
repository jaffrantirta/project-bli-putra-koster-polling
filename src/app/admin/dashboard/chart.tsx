"use client";

import { QuestionnaireContext } from "@/context/QuestionnaireContext";
import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Questionnaire {
  mau_seperti_apa_2024: string;
}

export default function Chart() {
  const { questionnaire, fetch } = useContext(QuestionnaireContext);
  const [perubahan, setPerubahan] = useState<number>(0);
  const [lanjutkan, setLanjutkan] = useState<number>(0);

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
    let perubahanCount = 0;
    let lanjutkanCount = 0;

    data.forEach((element) => {
      if (element.mau_seperti_apa_2024 === "Lanjutkan") {
        lanjutkanCount++;
      } else {
        perubahanCount++;
      }
    });

    setLanjutkan(lanjutkanCount);
    setPerubahan(perubahanCount);
  };

  const data = {
    labels: ["Perubahan", "Lanjutkan"],
    datasets: [
      {
        data: [perubahan, lanjutkan],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-3xl shadow-lg max-w-4xl mx-auto">
      <div className="text-3xl font-bold text-primary mb-4 text-center">
        Polling Results
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2">
          <Doughnut data={data} />
        </div>
      </div>
      <div className="mt-8 flex flex-col md:flex-row justify-around items-center">
        <div className="text-center md:mb-0 mb-8">
          <div className="text-2xl font-semibold text-primary">Perubahan</div>
          <div className="text-5xl font-bold text-gray-800">{perubahan}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-primary">Lanjutkan</div>
          <div className="text-5xl font-bold text-gray-800">{lanjutkan}</div>
        </div>
      </div>
    </div>
  );
}
