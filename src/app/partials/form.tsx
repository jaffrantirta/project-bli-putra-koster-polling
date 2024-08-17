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
import kecamatanData from "@/helpers/regional/kecamatan/5101.json";
import { useForm } from "@/helpers/form";
import { Regional } from "@/interfaces/regionalInterface";
import { QuestionnaireContext } from "@/context/QuestionnaireContext";

export default function Form() {
  const { store } = useContext(QuestionnaireContext);
  const { values, setValue, reset } = useForm({
    mau_seperti_apa_2024: "",
    kecamatan: "",
    kelurahan: "",
  });

  const [kelurahan, setKelurahan] = useState<Regional[]>([]);
  const [showField, setShowField] = useState<boolean>();
  const [kecamatanId, setKecamatanId] = useState<string>(""); // Separate state for kecamatanId
  const [kelurahanId, setKelurahanId] = useState<string>(""); // Separate state for kelurahanId

  // Function to handle the submission of the form
  const submit = async () => {
    await store(values);
    reset();
    setShowField(false);
    setKelurahan([]);
    setKecamatanId("");
    setKelurahanId("");
  };

  console.log(showField);

  // Function to load kelurahan data based on the selected kecamatan ID
  const loadKelurahan = async (kecamatanId: string) => {
    try {
      const kelurahanData = await import(
        `@/helpers/regional/kelurahan/${kecamatanId}.json`
      );

      if (Array.isArray(kelurahanData.default)) {
        setKelurahan(kelurahanData.default);
      } else {
        console.error(`Expected an array but got:`, kelurahanData.default);
        setKelurahan([]);
      }
    } catch (error) {
      console.error(`Error loading kelurahan for ${kecamatanId}:`, error);
      setKelurahan([]);
    }
  };

  // Function to handle changes in kecamatan selection
  const handleKecamatanChange = (kecamatanId: string) => {
    const selectedKecamatan = kecamatanData.find(
      (kec) => kec.id === kecamatanId
    );

    if (selectedKecamatan) {
      setValue("kecamatan", selectedKecamatan.nama);
      setKecamatanId(kecamatanId);
      setKelurahanId(""); // Clear the previously selected kelurahan
      setValue("kelurahan", ""); // Clear kelurahan name in the form values
      loadKelurahan(kecamatanId);
    } else {
      setValue("kecamatan", "");
      setKecamatanId("");
      setKelurahan([]);
    }
  };

  // Function to handle changes in kelurahan selection
  const handleKelurahanChange = (kelurahanId: string) => {
    const selectedKelurahan = kelurahan.find((kel) => kel.id === kelurahanId);

    if (selectedKelurahan) {
      setValue("kelurahan", selectedKelurahan.nama);
      setKelurahanId(kelurahanId);
    } else {
      setValue("kelurahan", "");
      setKelurahanId("");
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
              <p>
                Suarakan hati kalian wahai tokoh dan putra Jembrana, 2024 mau
                seperti apa?
              </p>
              <Button
                onClick={() => {
                  setValue("mau_seperti_apa_2024", "Lanjutkan");
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
                  setValue("mau_seperti_apa_2024", "");
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
                value={values.mau_seperti_apa_2024}
                onValueChange={(e) => setValue("mau_seperti_apa_2024", e)}
              />
            </div>
            {/* Kecamatan Selector */}
            <div>
              <Autocomplete
                defaultItems={kecamatanData}
                label="Kecamatan"
                className="w-full"
                selectedKey={kecamatanId}
                onSelectionChange={(value) =>
                  handleKecamatanChange(value?.toString() || "")
                }
              >
                {(kec) => (
                  <AutocompleteItem key={kec.id} value={kec.id}>
                    {kec.nama}
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            {/* Kelurahan Selector */}
            {kecamatanId && (
              <div>
                <Autocomplete
                  defaultItems={kelurahan}
                  label="Kelurahan/Desa"
                  className="w-full"
                  selectedKey={kelurahanId}
                  onSelectionChange={(value) =>
                    handleKelurahanChange(value?.toString() || "")
                  }
                  isDisabled={!kecamatanId}
                >
                  {(kel) => (
                    <AutocompleteItem key={kel.id} value={kel.id}>
                      {kel.nama}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <Button onClick={() => submit()}>Submit</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
