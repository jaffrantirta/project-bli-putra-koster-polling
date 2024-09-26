"use client";
import { QuestionnaireContext } from "@/context/QuestionnaireContext";
import React, { useContext, useEffect } from "react";
import { LoaderIcon } from "react-hot-toast";

export default function Table() {
  const { questionnaire } = useContext(QuestionnaireContext);

  if (questionnaire.loading) return <LoaderIcon />;
  if (!questionnaire || questionnaire.data === null) {
    return <div>Data not found</div>;
  }

  return (
    <table className="table-auto border-collapse w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 font-bold">Pilihan</th>
          <th className="px-4 py-2 font-bold">kabupaten</th>
          {/* <th className="px-4 py-2 font-bold">Kelurahan/Desa</th> */}
        </tr>
      </thead>
      <tbody>
        {questionnaire.data.map((data: any) => (
          <tr key={data.id} className="odd:bg-white even:bg-gray-50">
            <td className="px-4 py-2 border-t border-b border-gray-300">
              {data.answer}
            </td>
            <td className="px-4 py-2 border-t border-b border-gray-300">
              {data.kabupaten}
            </td>
            {/* <td className="px-4 py-2 border-t border-b border-gray-300">
              {data.kelurahan}
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
