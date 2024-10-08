"use client";

import React, { useContext, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Input,
} from "@nextui-org/react";
import kabupaten from "@/helpers/regional/kabupaten/51.json";
import { useForm } from "@/helpers/form";
import { QuestionnaireContext } from "@/context/QuestionnaireContext";
import Chart from "../admin/dashboard/chart";

export default function Form() {
  const { store } = useContext(QuestionnaireContext);
  const { values, setValue, reset } = useForm({
    answer: "",
    kabupaten: "",
  });
  const [showResult, setShowResult] = useState(false);
  const [kabupatenId, setKabupatenId] = useState<string>(""); // Separate state for kabupatenId

  // Function to handle the submission of the form
  const submit = async () => {
    await store(values);
    reset();
    setKabupatenId("");
    setShowResult(true);
  };

  // Function to handle changes in kabupaten selection
  const handlekabupatenChange = (kabupatenId: string) => {
    const selectedkabupaten = kabupaten.find((kab) => kab.id === kabupatenId);

    if (selectedkabupaten) {
      setValue("kabupaten", selectedkabupaten.nama);
      setKabupatenId(kabupatenId);
    } else {
      setValue("kabupaten", "");
      setKabupatenId("");
    }
  };

  return (
    <section
      id="questionnaire"
      className="bg-gradient-to-b from-primary w-full h-fit py-10"
    >
      <Card className="w-fit mx-5 md:mx-auto">
        <CardHeader className="text-center font-bold text-xl">
          {showResult
            ? ""
            : "Pilihan Gubernur - Wakil Gubernur Bali Favorit kamu di 2024?"}
        </CardHeader>
        <CardBody>
          {showResult ? (
            <div className="text-center">
              <p className="font-bold text-2xl">Selamat</p>
              <p className="text-lg">
                Anda telah mengisi kuesioner. Terima kasih telah berpartisipasi
                dalam survey ini.
              </p>
              <Chart />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <p>Pilih favoritmu!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Image
                    className="w-full md:w-32 aspect-video object-cover"
                    alt="koster - giri"
                    src="/candidates/1.png"
                  />
                  <Button
                    onClick={() => {
                      setValue("answer", "Koster - Giri");
                    }}
                    variant="bordered"
                    color={
                      values.answer === undefined
                        ? "default"
                        : values.answer == "Koster - Giri"
                        ? "primary"
                        : "default"
                    }
                    type="button"
                  >
                    Koster - Giri
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Image
                    className="w-full md:w-32 aspect-video object-cover"
                    alt="Mulia - PAS"
                    src="/candidates/2.png"
                  />
                  <Button
                    onClick={() => {
                      setValue("answer", "Mulia - PAS");
                    }}
                    variant="bordered"
                    color={
                      values.answer === undefined
                        ? "default"
                        : values.answer == "Mulia - Pas"
                        ? "primary"
                        : "default"
                    }
                    type="button"
                  >
                    Mulia - PAS
                  </Button>
                </div>
              </div>

              {/* kabupaten Selector */}
              {
                <div>
                  <Autocomplete
                    defaultItems={kabupaten}
                    label="Kabupaten"
                    className="w-full"
                    selectedKey={kabupatenId}
                    onSelectionChange={(value) =>
                      handlekabupatenChange(value?.toString() || "")
                    }
                  >
                    {(kab) => (
                      <AutocompleteItem key={kab.id} value={kab.id}>
                        {kab.nama}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </div>
              }
            </div>
          )}
        </CardBody>
        {!showResult && (
          <CardFooter>
            <Button onClick={() => submit()}>Submit</Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
}
