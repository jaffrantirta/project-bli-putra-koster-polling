import { Image } from "@nextui-org/react";
import React from "react";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen bg-primary bg-[url('/bg.png')]">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="text-3xl mx-10 font-bold text-center">
          Kabupaten Jembrana
        </h2>
        <p className="text-lg mx-10 text-center">
          {`Kabupaten Jembrana adalah salah satu dari sembilan kabupaten dan kota
          di Provinsi Bali, Indonesia. Kabupaten ini terletak di ujung barat
          pulau Bali, membentang dari barat ke timur pada 8°09'30" - 8°28'02" LS
          dan 114°25'53" - 114°56'38" BT. Luas wilayah Jembrana 841.800 Km² atau
          14,96% dari luas wilayah pulau Bali`}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="self-center">
          <Image
            alt="Kondisi Jembrana"
            src="/gallery/jb6.png"
            className="rounded-3xl mx-auto w-1/2 md:w-3/4 shadow-lg aspect-square object-cover"
          />
        </div>
      </div>
    </div>
  );
}
