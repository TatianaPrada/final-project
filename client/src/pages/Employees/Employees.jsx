import React, { useEffect, useState } from "react";
import "./Employees.css";
import ModalCompany from "./../../components/ModalCompany/ModalCompany";
import { getMyCompany, getEmployees } from "../../services/company";
import NewEmployee from "./../../components/NewEmployee/NewEmployee";
import EmployeesTable from "../../components/EmployeesTable/EmployeesTable";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Employees = (props) => {
  const [company, setCompany] = useState(props.user.companies);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const fetchCompany = () => {
    getMyCompany(props.user._id)
      .then((response) => {
        setCompany(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchEmployees = () => {
    getEmployees(props.user.companies[0])
      .then((response) => {
        console.log(response.data);
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyCompany(props.user._id)
      .then((response) => {
        setCompany(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    getEmployees(company[0])
      .then((response) => {
        setEmployees(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Employees">
      <h1>Employees</h1>
      {!company?.length && (
        <ModalCompany
          user={props.user}
          onSubmitSuccess={fetchCompany}
          getMyEmployees={fetchEmployees}
        />
      )}
      {company?.length && company.map((company) => (
        <div key={company._id}>
          <h2> <CorporateFareIcon sx={{color: "black"}}/> Company: {company.name}</h2>
          <h4> <SubtitlesIcon sx={{color: "black"}}/> Fiscal Code : {company.fiscalCode}</h4>
          <h4> <AlternateEmailIcon sx={{color: "black"}}/>  Company Email: {company.email}</h4>
          <NewEmployee
            user={props.user}
            company={company}
            onSubmitSuccess={fetchEmployees}
          />
        </div>
      ))}
      
      <EmployeesTable
        company={company}
        employees={employees}
        fetchEmployees={fetchEmployees}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Employees;
