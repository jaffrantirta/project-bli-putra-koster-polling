import Navbar_ from "@/components/navbar";
import Form from "./partials/form";
import Hero from "./partials/hero";
import Gallery from "./partials/gallery";
import Footer from "@/components/footer";
import QuestionnaireProvider from "@/context/QuestionnaireContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar_ />
      <Hero />
      <QuestionnaireProvider>
        <Form />
      </QuestionnaireProvider>
      <Gallery />
      <Footer />
    </main>
  );
}
