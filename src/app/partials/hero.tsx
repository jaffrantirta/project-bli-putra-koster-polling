import { Image } from "@nextui-org/react";
import React from "react";

export default function Hero() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen bg-primary text-white">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="text-3xl mx-10 font-bold text-center">Tokoh Dewata</h2>
        <p className="text-lg mx-10 text-center font-bold">
          {` Media digital berbasis Informasi terdepan. Memberikan informasi Real dan Terpercaya, Media Informasi anak muda yang cerdas dan berinovatif.`}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <div className="self-center">
          <Image
            alt="tokoh dewata"
            src="/logokj.png"
            className="rounded-3xl mx-auto w-1/2 md:w-3/4 shadow-lg aspect-square object-cover"
          />
        </div>
      </div>
    </div>
  );
}
