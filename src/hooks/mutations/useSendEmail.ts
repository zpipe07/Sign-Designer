import {
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query"

import { FormData } from "@/src/components/ContactUsForm"

export const useSendEmail = (options?: UseMutationOptions) => {
  const sendEmail = async (data: FormData) => {
    const res = await fetch("/api/v1/email", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const { email } = await res.json()

    return email
  }

  const onSuccess = (data: any) => {
    if (options?.onSuccess) {
      options.onSuccess(data, undefined, undefined)
    }
  }

  return useMutation({ mutationFn: sendEmail, onSuccess })
}
