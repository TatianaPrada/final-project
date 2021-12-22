import React, { useState, useEffect } from "react";
import "./My Profile.css";
import { Person } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { editProfile } from "./../../services/user";
import MenuItem from '@mui/material/MenuItem';
import {uploadImage} from '../../services/uploadImage.js'
import {Avatar, Alert} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';


const theme = createTheme({
  palette: {
    primary: {
      main: "#0e2b60",
      light: "#43538e",
      dark: "#000036",
    },
    secondary: {
      main: "#c8534c",
    },
  },
});

const MyProfile = (props) => {
  
  const {_id, name, lastName, lastName2, dateOfBirth, identityCard, legalGender, phoneNumber, photo } = props.user
  
  const [error, setError] = useState(null)
  const [message, setMessage] = useState("")
  const [loadingImage, setLoadingImage] = useState(false)
  const [status, setStatus] = useState(null)
  const {setUser} = props

  const [form, setForm] = useState({
    _id: _id,
    name: name,
    lastName: lastName,
    lastName2: lastName2,
    dateOfBirth: dateOfBirth,
    identityCard: identityCard,
    legalGender: legalGender,
    phoneNumber: phoneNumber,
    photo: photo
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target
    return setForm({ ...form, [name]: value })
  }

  const handleSubmission = (event) => {
    event.preventDefault();
    editProfile(form)
    .then((res) => {
      if (!res.status) {
        return setError(res.errorMessage)
      }
      setMessage("Your profile was updated succesfully")
      setUser(res.data.user)
      setStatus(res.status);
    });
  }

  const handleFileUpload = (event) => {
    setLoadingImage(true)
    const uploadData = new FormData()
    uploadData.append('imageData', event.target.files[0])
    uploadImage(uploadData)
        .then(res => {
            setLoadingImage(false)
            setForm({ ...form, photo: res.data.cloudinary_url })
        })
        .catch(err => console.log(err))
}

  return (
    
    <ThemeProvider theme={theme}>
      <div className="MyProfile">
        <section>
          <p className="title">My Profile</p>
        </section>
        <section className="generalInfo">
          <div className="divInfo">
            <Person
              sx={{ color: "#43538e", fontSize: 40, textAlign: "center" }}
            />
            <p className="formTitle">General information</p>
            <span>Fill in your personal data</span>
          </div>
          <div className="divForm">
            <Box
              sx={{
                width: 250,
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              autoComplete="off"
            >
              <form onSubmit={handleSubmission}>
              <input className="hidden" value={_id} onChange={handleInputChange}></input>
                <Avatar
                  alt="Remy Sharp"
                  src={photo}
                  sx={{ width: 78, height: 78}}
                  variant="rounded"
                />
                <label>Name:</label>
                <TextField
                  className="input"
                  id="input-name"
                  type="text"
                  name="name"
                  size="small"
                  value={form.name || ""}
                  onChange={handleInputChange}
                />
                <label>Last name:</label>
                <TextField
                  className="input"
                  id="input-lastName"
                  type="text"
                  name="lastName"
                  size="small"
                  value={form.lastName || ""}
                  onChange={handleInputChange}
                />
                <label>Second last name:</label>
                <TextField
                  className="input"
                  id="input-lastName2"
                  type="text"
                  name="lastName2"
                  size="small"
                  value={form.lastName2 || ""}
                  onChange={handleInputChange}
                />
                <label>Date of birth:</label>
                <TextField
                  className="input"
                  id="input-dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  size="small"
                  value={form.dateOfBirth || ""}
                  onChange={handleInputChange}
                />
                <label>Identification number:</label>
                <TextField
                  className="input"
                  id="input-identification"
                  variant="outlined"
                  type="text"
                  name="identityCard"
                  size="small"
                  value={form.identityCard || ""}
                  onChange={handleInputChange}
                />
                <label>Legal Gender:</label>
                <TextField
                  className="input"
                  id="input-legalGender"
                  type="text"
                  name="legalGender"
                  size="small"
                  select
                  value={form.legalGender || ""}
                  onChange={handleInputChange}
                >
                <MenuItem value={"Female"} >
                  Female
                </MenuItem>
                <MenuItem  value={"Male"} >
                  Male
                </MenuItem>
                <MenuItem value={"Other"} >
                  Other
                </MenuItem>
                </TextField>
                <label>Phone number:</label>
                <TextField
                  className="input"
                  id="input-phoneNumber"
                  variant="outlined"
                  type="text"
                  name="phoneNumber"
                  size="small"
                  value={form.phoneNumber || ""}
                  onChange={handleInputChange}
                />
                <FormControl>
                <label>Profile photo:</label>
                <TextField
                type= "file"
                id="photo"
                onChange={handleFileUpload}
                />
                </FormControl>

                <Button 
                  disabled={loadingImage} 
                  variant="outlined"
                  color="primary"
                  className="button_submit"
                  type="submit" >
                  {loadingImage ? 'Loading...' : 'Submit'}
                </Button>
              </form>
              {status === true &&
                <Alert severity="success">
                  Profile updated!
                </Alert> 
              }
              {status === false &&
                <Alert severity="error">
                      {error}
                </Alert>
              }
            </Box>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
};

export default MyProfile