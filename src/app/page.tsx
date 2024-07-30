import { Metadata } from "next"

import { FeaturedSigns } from "@/src/components/FeaturedSigns"
import { HeroCarousel } from "@/src/components/HeroCarousel"
import { InfoSection } from "@/src/components/InfoSection"
import { FAQsSection } from "@/src/components/FAQsSection"

export const metadata: Metadata = {
  title: "SignGenie - Welcome",
  description:
    "SignGenie allows you to create custom signs for your home or business. Get started today!",
}

export default function Home() {
  return (
    <>
      <HeroCarousel />

      <InfoSection />

      <FeaturedSigns />

      <FAQsSection />
    </>
  )
}
