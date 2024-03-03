import Image from "next/image";
import { NextUIProvider } from "@nextui-org/react";
import Homepage from "./components/Home";
import Layout from "./components/Layout";
export default function Home() {

  return (
    <NextUIProvider>
      <Layout><Homepage /></Layout>
    </NextUIProvider>
  );

}
