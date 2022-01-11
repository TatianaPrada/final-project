import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { CheckInButton } from "../../components/CheckInButton/CheckInButton";
import CheckInOutTable from "../../components/CheckInOutTable/CheckInOutTable";
import CheckOutButton from "../../components/CheckOutButton/CheckOutButton";
import { getAllMyClocks, getMyCheckIn } from "../../services/checkInOut";
import "./ClockIn.css";
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

const ClockIn = () => {
  const [currentClock, setCurrentClock] = useState(null);
  const [allClocks,setAllClocks] = useState([]);
  const [status, setStatus] = useState(null);
  const [refresh, setRefresh] = useState(null);

  function timer() {
    setTimeout(() => setStatus(null), 2000);
  }

  useEffect(() => {
    getMyCheckIn().then((res) => {
      setCurrentClock(res.data);
      setStatus(res.status);
      setRefresh(null);
      timer();
    });
  }, [refresh]);

  useEffect(() =>{
    getAllMyClocks().then((res) => {
      setAllClocks(res.data);
    })
  },[refresh]);

  return (
    <div className="clockIn">
      <h1>Clock in</h1>
      <h3><QueryBuilderIcon sx={{color: "black"}}/> Record your work start and end time</h3>
      {currentClock && (
        <>
          <CheckOutButton clockId={currentClock._id} setRefresh={setRefresh} />
          <><b>Clock In:</b> {new Date(currentClock.startDate).toLocaleString()}</>
        </>
      )}
      {!currentClock && <CheckInButton setRefresh={setRefresh} />}

      {status === false && <Alert severity="error">There was an error</Alert>}
      <CheckInOutTable clockList={allClocks} />
    </div>
  );
};

export default ClockIn;
