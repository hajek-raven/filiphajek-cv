import type { Metadata } from "next";
import { LangSetter } from "@/app/_components/lang-setter";
import { getCvData } from "@/lib/i18n/cv-data";

const { meta } = getCvData("en");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LangSetter lang="en" />
      {children}
    </>
  );
}
