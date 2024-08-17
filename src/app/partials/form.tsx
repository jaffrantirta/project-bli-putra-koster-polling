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
              <p>Lanjutkan Pak Yan Koster?</p>
              <Button
                onClick={() => {
                  setValue("answer", "Lanjutkan");
                  setShowField(false);
                }}
                variant="bordered"
                color={
                  showField === undefined
                    ? "default"
                    : !showField
                    ? "primary"
                    : "default"
                }
                type="button"
              >
                Lanjutkan
              </Button>
              <Button
                onClick={() => {
                  setValue("answer", "");
                  setShowField(true);
                }}
                variant="bordered"
                color={showField ? "primary" : "default"}
                type="button"
              >
                Perubahan
              </Button>
              <Input
                className={showField ? "block" : "hidden"}
                label="Perubahan seperti apa?"
                value={values.answer}
                onValueChange={(e) => setValue("answer", e)}
              />
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
