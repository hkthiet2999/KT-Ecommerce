import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '14 tháng 7, 2021', 'Elvis Presley', 'Đà nẵng, VN', 'VISA ⠀•••• 3719', 312.440),
  createData(1, '14 tháng 7, 2021', 'Paul McCartney', 'Nha Trang, VN', 'VISA ⠀•••• 2574', 866.990),
  createData(2, '14 tháng 7, 2021', 'Tom Scholz', 'Quảng Châu, Trung Quốc', 'ACB ⠀•••• 1253', 100.800),

  createData(3, '14 tháng 7, 2021', 'Michael Jackson', 'London, Mỹ', 'VISA ⠀•••• 5919', 654.390),
  createData(4, '14 tháng 7, 2021', 'Bruce Springsteen', 'TP.HCM, VN', 'VCB ⠀•••• 2000' , 212.790),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Danh sách đơn hàng</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ngày đặt</TableCell>
            <TableCell>Tên khách hàng</TableCell>
            <TableCell>Vận chuyển đến</TableCell>
            <TableCell>Phương thức thanh toán</TableCell>
            <TableCell align="right">Tổng tiền</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
            Xem thêm
        </Link>
      </div>
    </React.Fragment>
  );
}