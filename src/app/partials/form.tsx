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

export default function Form() {
  const { store } = useContext(QuestionnaireContext);
  const { values, setValue, reset } = useForm({
    answer: "",
    kabupaten: "",
  });
  const [showField, setShowField] = useState<boolean>();
  const [kabupatenId, setKabupatenId] = useState<string>(""); // Separate state for kabupatenId

  // Function to handle the submission of the form
  const submit = async () => {
    await store(values);
    reset();
    setShowField(false);
    setKabupatenId("");
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
          Yuk isi kuesioner ini dulu
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <p>2024 pilih siapa?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Image
                  className="w-full md:w-32 aspect-video object-cover"
                  alt="koster - giri"
                  src="/candidates/koster - giri.png"
                />
                <Button
                  onClick={() => {
                    setValue("answer", "Koster - Giri");
                    setShowField(false);
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
                  alt="Koster - Ace"
                  src="/candidates/koster - ace.png"
                />
                <Button
                  onClick={() => {
                    setValue("answer", "Koster - Ace");
                    setShowField(false);
                  }}
                  variant="bordered"
                  color={
                    values.answer === undefined
                      ? "default"
                      : values.answer == "Koster - Ace"
                      ? "primary"
                      : "default"
                  }
                  type="button"
                >
                  Koster - Ace
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Image
                  className="w-full md:w-32 aspect-video object-cover"
                  alt="Mantra - Mulia"
                  src="/candidates/mantra - mulia.png"
                />
                <Button
                  onClick={() => {
                    setValue("answer", "Mantra - Mulia");
                    setShowField(false);
                  }}
                  variant="bordered"
                  color={
                    values.answer === undefined
                      ? "default"
                      : values.answer == "Mantra - Mulia"
                      ? "primary"
                      : "default"
                  }
                  type="button"
                >
                  Mantra - Mulia
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Image
                  className="w-full md:w-32 aspect-video object-cover"
                  alt="Suradnyana - Mulia"
                  src="/candidates/suradnyana - mulia.png"
                />
                <Button
                  onClick={() => {
                    setValue("answer", "Suradnyana - Mulia");
                    setShowField(false);
                  }}
                  variant="bordered"
                  color={
                    values.answer === undefined
                      ? "default"
                      : values.answer == "Suradnyana - Mulia"
                      ? "primary"
                      : "default"
                  }
                  type="button"
                >
                  Suradnyana - Mulia
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
        </CardBody>
        <CardFooter>
          <Button onClick={() => submit()}>Submit</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
