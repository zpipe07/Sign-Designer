import IconButton from "@mui/material/IconButton"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

type Props = {
  orders: any[]
}

export const OrdersView: React.FC<Props> = ({ orders }) => {
  console.log({ orders })
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map(({ id, date_created, status }) => {
            return (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{date_created}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="expand row"
                    // size="small"
                    // onClick={() => setOpen(!open)}
                  >
                    {false ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
