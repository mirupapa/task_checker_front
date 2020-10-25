import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { TaskInfo } from '../Main'

const useStyles = makeStyles({
  container: {
    width: '80%',
    height: '80%',
  },
  table: {
    minWidth: 650,
  },
})

const SimpleTable: React.FunctionComponent<TaskInfo> = ({
  columns,
  records,
}) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((item) => {
              return <TableCell key={item.field}>{item.title}</TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SimpleTable
