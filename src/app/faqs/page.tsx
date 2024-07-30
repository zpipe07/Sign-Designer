import { Metadata } from "next"

import { FAQsSection } from "@/src/components/FAQsSection"

export const metadata: Metadata = {
  title: "SignGenie - FAQs",
  description:
    "See our most frequently asked questions about our custom signs.",
}

export default function Page() {
  return <FAQsSection />
}
