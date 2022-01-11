import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { deleteEmployee } from "./../../services/company";
import { useState } from "react";

const EmployeesTable = ({
  company,
  employees,
  fetchEmployees
}) => {
  const [, setError] = useState(null);
  const [, setMessage] = useState("");


  const handleDelete = (employeeId) => {
    deleteEmployee(company[0]._id, employeeId).then((res) => {
      if (!res.status) {
        return setError(res.errorMessage);
      }
      fetchEmployees()
      setMessage("Employee deleted succesfully");
      console.log(res);
    });
  };

  return (
    <TableContainer component={Paper} sx={{ m: 1, minWidth: 260, maxWidth: 700, bgcolor: '#f5f5f5' }}>
      <Table sx={{ minWidth: 260, maxWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Photo</b>
            </TableCell>
            <TableCell align="center">
              <b>First Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Last Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Job Title</b>
            </TableCell>
            <TableCell align="center">
              <b>Hire Date</b>
            </TableCell>
            <TableCell align="center">
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees?.map((employee) => (
            <TableRow
              key={employee._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">
                {" "}
                <Avatar alt="employee avatar" src={employee.photo} />
              </TableCell>
              <TableCell align="center">{employee.name}</TableCell>
              <TableCell align="center">{employee.lastName}</TableCell>
              <TableCell align="center"> {employee.jobTitle}</TableCell>
              <TableCell align="center">
                {new Date(employee.hiringDate).toLocaleDateString()}
              </TableCell>
              <TableCell align="center">
                {" "}
                <Button
                  color="secondary"
                  variant="outlined"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
