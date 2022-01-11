import React, { useState } from "react";
import "./My Profile.css";
import { Person } from "@mui/icons-material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { editProfile } from "./../../services/user";
import MenuItem from '@mui/material/MenuItem';
import {uploadImage} from '../../services/uploadImage.js'
import {Avatar, Alert} from '@mui/material';
import FormControl from '@mui/material/FormControl';

const MyProfile = (props) => {
  
  const {_id, name, lastName, lastName2, dateOfBirth, identityCard, legalGender, phoneNumber, photo } = props.user
  
  const [error, setError] = useState(null)
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
      event.preventDefault();
      console.log(  res.data.user)
      setUser(res.data.user)
      setStatus(true);
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
    
      <div className="MyProfile">
        <section>
          <h1 className="title">My Profile</h1>
        </section>
        <section className="generalInfo">
          <div className="divInfo">
            <Person
              sx={{ color:'#db86d7', fontSize: 40, textAlign: "center" }}
            />
            <h4 className="formTitle">General information</h4>
            <span>Fill in your personal data</span>
          </div>
          <div className="divForm">
            <Box 
              sx={{
                width: 250,
                "& .MuiTextField-root": { m: 1, width: "25ch"}
              }}
              autoComplete="off"
            >
              <form onSubmit={handleSubmission}>
              <input className="hidden" value={_id} onChange={handleInputChange}></input>
                <Avatar className="photoBox"
                  alt="Remy Sharp"
                  src={photo}
                  sx={{ width: 80, height: 78}}
                  variant="rounded"
                />
                <label>Name:</label>
                <TextField
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
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
                  color="secondary"
                  disabled={loadingImage} 
                  variant="outlined"
                  className="button_submit"
                  type="submit" >
                  {loadingImage ? 'Loading...' : 'Submit'}
                </Button>
              </form>
              {status === true &&
                <Alert severity="success">
                Your profile was changed succesfully
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
  );
};

export default MyProfile