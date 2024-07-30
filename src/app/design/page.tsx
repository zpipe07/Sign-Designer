import { Metadata } from "next"
import { Container } from "@mui/material"

import { SignDesigner } from "@/src/components/SignDesigner"
import { SignDetails } from "@/src/components/SignDetails"
import { SignDesignerSearchParams } from "@/src/components/SignDesignerSearchParams"
import { FAQsSection } from "@/src/components/FAQsSection"

export const metadata: Metadata = {
  title: "SignGenie - Create your custom sign",
  description:
    "Create a sign with your own text, shape, color, and more.",
}

export default function Page() {
  return (
    <>
      <Container>
        <SignDesignerSearchParams>
          <SignDesigner />
        </SignDesignerSearchParams>

        <SignDetails />
      </Container>

      <FAQsSection />
    </>
  )
}
