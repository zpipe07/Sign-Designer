import {
  Box,
  Container,
  Divider,
  List,
  Typography,
} from "@mui/material"

import { FAQItem } from "@/src/components/FAQsSection/FAQItem"

const FAQS = [
  {
    question: "What are your signs made of?",
    answer:
      "Our signs are made of King ColorCore®. This is a high-density polyethylene sheet that is perfect for outdoor use. It is waterproof, UV-resistant, and will not rot or splinter.",
  },
  {
    question: "Do your signs include a warranty?",
    answer: "Yes! We offer a lifetime warranty on all of our signs.",
  },
  {
    question: "How long will it take for my order to arrive?",
    answer:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam iure labore cum ratione laborum aspernatur fuga inventore, voluptates aliquam id quisquam, ad ipsum doloremque quam eius consequuntur itaque earum iusto!",
  },
  {
    question: "How do I hang my sign?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto deserunt alias veniam eos, aperiam quo iusto placeat sint velit laudantium hic amet? Et cumque sapiente, ex ad voluptates unde quasi est velit at incidunt labore provident, possimus illum facilis! Nostrum!",
  },
]

export const FAQsSection: React.FC = () => {
  return (
    <Box component="section" py={4}>
      <Container>
        <Typography
          variant="h3"
          component="h1"
          marginBottom={2}
          textAlign="center"
        >
          FAQs
        </Typography>

        <List disablePadding>
          {FAQS.map((faq, index) => {
            return (
              <>
                <FAQItem faq={faq} key={faq.question} />

                {index < FAQS.length - 1 && <Divider />}
              </>
            )
          })}
        </List>
      </Container>
    </Box>
  )
}
