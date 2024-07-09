import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

type Props = {
  page: number
  setPage: (page: number) => void
  pages: number
}

export const OrderPagination: React.FC<Props> = ({
  page,
  setPage,
  pages,
}) => {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  return (
    <Stack>
      <Pagination
        count={pages}
        color="primary"
        page={page}
        onChange={handlePageChange}
      />
    </Stack>
  )
}
