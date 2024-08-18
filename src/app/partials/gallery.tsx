import { Image } from "@nextui-org/react";
import React from "react";

export default function Gallery() {
  return (
    <section id="gallery" className="grid grid-cols-2 md:grid-cols-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="m-1">
          <Image
            className="w-full hover:scale-105 transition-all duration-500 aspect-video md:aspect-square object-cover"
            isBlurred
            src={`/gallery/jb${i + 1}.png`}
            alt={`tokoh dewata Image ${i + 1}`}
          />
        </div>
      ))}
    </section>
  );
}
