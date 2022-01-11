import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

const TimeOffTable = ({ events, isLoading }) => {


  return (

    isLoading ? <CircularProgress/>

    :
 
    <TableContainer sx={{ minWidth: 350, maxWidth:"74vw"}} component={Paper}>
      <Table sx={{ minWidth: 350, maxWidth:"74vw", bgcolor: '#f5f5f5' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Status</b></TableCell>
            <TableCell align="center"><b>Start Date</b></TableCell>
            <TableCell align="center"><b>End Date</b></TableCell>
            <TableCell align="center"><b>Type</b></TableCell>
            <TableCell align="center"><b>Summary</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  
          {events && events.map((events) => (
            <TableRow
              key={events._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{events.status}</TableCell>
              <TableCell align="center">
                {new Date(events.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                {new Date(events.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="center"> {events.type}</TableCell>
              <TableCell align="center">{events.summary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeOffTable;
