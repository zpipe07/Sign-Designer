import { StatusSelector } from "@/src/components/Orders/StatusSelector"
import { FormProvider } from "react-hook-form"

export const OrdersFiltersForm: React.FC = () => {
  return (
    // <FormProvider>
    //   <form>
    <StatusSelector />
    //   </form>
    // </FormProvider>
  )
}
