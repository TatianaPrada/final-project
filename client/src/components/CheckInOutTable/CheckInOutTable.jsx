import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const CheckInOutTable = (props) => {
  const [rows, setRows] = useState([]);

  function formatTime(minutes){
    if(!minutes) return "-";

    if(minutes<60){
      return `${minutes} minute${minutes>1 ? "s":""}`;
    }
    const hours = Math.floor(minutes/60);
    const mins =(minutes%60);

    return `${hours} hour${hours>1 ? "s":""} and ${mins} minute${minutes>1 ? "s":""}`;
  }

  useEffect(() => {
    const rows = props.clockList.map((clock) => {
      return {
        id: clock._id,
        startDate: new Date(clock.startDate).toLocaleString("es-ES",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}),
        endDate:clock.endDate ? new Date(clock.endDate).toLocaleString("es-ES",{year:"numeric",month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}) : "In progress",
        workingHours:formatTime(clock.workingHours)
      };
    });

    setRows(rows);
  }, [props.clockList]);

  const columns = [
    { field: "startDate", headerName: "Clock In", width: 200 },
    { field: "endDate", headerName: "Clock Out", width: 200 },
    { field: "workingHours", headerName: "Hours", width: 200 },
  ];

  return (
    <Box sx={{  minwidth: 601, maxWidth: 601, bgcolor: '#f5f5f5' }}>
      <DataGrid
        autoHeight
        disableColumnMenu
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </Box>
  );
};

export default CheckInOutTable;
