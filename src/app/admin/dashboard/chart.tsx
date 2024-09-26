"use client";

import { QuestionnaireContext } from "@/context/QuestionnaireContext";
import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Button } from "@nextui-org/react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Questionnaire {
  answer: string;
}

export default function Chart() {
  const { questionnaire, fetch } = useContext(QuestionnaireContext);
  const [kab, setKab] = useState("");
  const [kg, setKG] = useState<number>(0);
  const [mp, setMP] = useState<number>(0);

  useEffect(() => {
    fetch(kab);
    if (questionnaire && questionnaire.data !== null) {
      sorting(questionnaire.data);
    }
  }, [questionnaire, kab]);

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
    <>
      <div className="md:p-6 bg-white rounded-3xl shadow-lg mx-auto">
        <div className="text-3xl font-bold text-primary mb-4 text-center">
          Polling Results {kab}
        </div>
        <div className="flex justify-center object-center items-center">
          <Doughnut className="w-full" data={data} />
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
              Mulia - PAS
            </div>
            <div className="text-5xl font-bold text-gray-800">{mp}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <Button onClick={() => setKab("")}>Semua</Button>
        <Button onClick={() => setKab("KAB. BADUNG")}>KAB. BADUNG</Button>
        <Button onClick={() => setKab("KAB. TABANAN")}>KAB. TABANAN</Button>
        <Button onClick={() => setKab("KAB. JEMBRANA")}>KAB. JEMBRANA</Button>
        <Button onClick={() => setKab("KAB. BULELENG")}>KAB. BULELENG</Button>
        <Button onClick={() => setKab("KAB. BANGLI")}>KAB. BANGLI</Button>
        <Button onClick={() => setKab("KAB. GIANYAR")}>KAB. GIANYAR</Button>
        <Button onClick={() => setKab("KAB. KELUNGKUNG")}>
          KAB. KELUNGKUNG
        </Button>
        <Button onClick={() => setKab("KAB. KARANGASEM")}>
          KAB. KARANGASEM
        </Button>
        <Button onClick={() => setKab("KOTA DENPASAR")}>KOTA DENPASAR</Button>
      </div>
    </>
  );
}
