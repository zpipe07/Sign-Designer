import { Divider, List } from "@mui/material"

import { FAQItem } from "@/src/components/FAQsSection/FAQItem"

const FAQS = [
  {
    question: "What are your signs made of?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam ea ipsum, impedit dolore eos debitis. Ipsa in commodi quas odio.",
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
  )
}
