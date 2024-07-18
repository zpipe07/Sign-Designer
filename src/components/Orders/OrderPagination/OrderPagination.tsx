import { useSearchParams } from "next/navigation"
import { Typography } from "@mui/material"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

import { useGetOrderCount } from "@/src/hooks/queries/useGetOrderCount"

type Props = {
  page: number
  setPage: (page: number) => void
}

export const OrderPagination: React.FC<Props> = ({
  page,
  setPage,
}) => {
  const searchParams = useSearchParams()
  const statusId = searchParams.get("status_id")

  const { data, isLoading } = useGetOrderCount({ statusId })

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  if (isLoading) {
    return (
      <Stack marginTop={2}>
        <Pagination count={1} color="primary" page={page} />
      </Stack>
    )
  }

  return (
    <>
      <Stack marginTop={2}>
        <Pagination
          count={data.pages}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </Stack>

      <Typography marginTop={1} marginBottom={1}>
        Total orders: {data.count}
      </Typography>
    </>
  )
}
