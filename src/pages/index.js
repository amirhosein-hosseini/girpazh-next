import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import HomePage from "@/components/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <HomePage />
  );
}
