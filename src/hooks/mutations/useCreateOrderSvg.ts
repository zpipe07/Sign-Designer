import { useMutation } from "@tanstack/react-query"

export const useCreateOrderSvg = () => {
  const createOrderSvg = async (body: any) => {
    const res = await fetch(`/api/v1/admin/svg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
    const svg = await res.text()
    return svg
  }

  return useMutation({ mutationFn: createOrderSvg })
}
