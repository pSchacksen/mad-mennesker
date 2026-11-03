import type { Metadata } from "next";
import { DesignLab } from "./DesignLab";

export const metadata: Metadata = {
  title: "Design Lab · Mad & Mennesker (internt)",
  robots: { index: false, follow: false },
};

export default function DesignLabPage() {
  return <DesignLab />;
}
