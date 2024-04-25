import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
const SendFeedback = ({ authUser, role, token }) => {

  const [features, setFeatures] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [experiencedIssues, setExperiencedIssues] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [state, setState] = useState({
    searchingBooks: false,
    updatingProgress: false,
    viewingBooks: false,
  });

  const [importanceState, setImportance] = useState(1);
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const sendFeedback = () => {
    axios.post("http://localhost:8083/feedbacks/addFeedback",
      { uid: authUser.uid, degree_imp: importanceState, issue: issueDescription, new_feature: features, problems_pw: experiencedIssues, issue_type1: searchingBooks, issue_type2: updatingProgress, issue_type3: viewingBooks },
      config)
      .then((result) => {
        console.log(result);
        console.log("Result body is", result.data);
        console.log("Result status is", result.status);

        // Mesaj confirmare
        setOpenSuccess(true);

        // Resetare campuri
        setFeatures("");
        setExperiencedIssues(false);
        setIssueDescription("");
        setState(false, false, false);
      })
      .catch(error => {
        if (error.response)
          console.log("Error is", error.response.data);
      });
  };

  const importanceOptions = [
    { value: 5, label: 'Highly Important' },
    { value: 4, label: 'Important' },
    { value: 3, label: 'Moderate' },
    { value: 2, label: 'Low' },
    { value: 1, label: 'Minimal' },
  ];

  const { searchingBooks, updatingProgress, viewingBooks } = state;

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="App">
      <Navbar firstNav={{ to: "/", label: "My Books" }}
        secondNav={{ to: "/settings", label: "Settings" }}
        thirdNav={{ to: "/feedback", label: "Feedback" }}
        authUser={authUser}
        searchBarEnabled={role === 'READER'} />
      <div>
        <Box sx={{ paddingX: 2, margin: '8 auto', maxWidth: 740, marginLeft: 20, marginTop: 2 }}>

          <Paper variant="elevation" square={false} sx={{ backgroundColor: '#eeeeee', padding: 2, textAlign: 'left', borderRadius: 2 }}>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '125%' }}>
              Thank you for taking part!
            </Typography>

            <Typography variant="body1">
              Please complete this document to help us improve future sessions.
            </Typography>
          </Paper>

          <Collapse in={openSuccess}>
            <Alert severity="success" sx={{ marginTop: 2 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenSuccess(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }>
              Feedback sent successfully!
            </Alert>
          </Collapse>

          <Typography variant="body1" style={{ fontWeight: 'bold', margin: 10 }}>
            1. What other features would you like this app to have?
          </Typography>

          <TextField id="outlined-controlled"
            fullWidth
            multiline
            rows={3}
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            variant="outlined"
            style={{ backgroundColor: '#F6F8FA' }}
          />

          <Typography variant="body1" style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 10, }}>
            2. What services do you think need improvement?
          </Typography>
          <FormControl component="fieldset" variant="standard" sx={{ paddingLeft: 1.5 }}>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox checked={searchingBooks} onChange={handleChange} name="searchingBooks" />
                }
                label="Searching Books"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={updatingProgress} onChange={handleChange} name="updatingProgress" />
                }
                label="Updating Progress"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={viewingBooks} onChange={handleChange} name="viewingBooks" />
                }
                label="Viewing Book Details and Reviews"
              />
            </FormGroup>
          </FormControl>

          <Typography variant="body1" style={{ fontWeight: 'bold', marginLeft: 10, marginTop: 10, }}>
            3. Have you experienced any issues with the app in the past week?
          </Typography>
          <FormControl>
            <RadioGroup
              row
              name="controlled-radio-buttons-group"
              value={experiencedIssues}
              style={{ marginLeft: 10 }}
              onChange={(e) => setExperiencedIssues(e.target.value)}
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          <Typography variant="body1" style={{ fontWeight: 'bold', margin: 10 }}>
            4. Can you describe the issues you experienced regarding the app?
          </Typography>
          <TextField id="outlined-controlled"
            fullWidth
            multiline
            rows={3}
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            variant="outlined"
            style={{ backgroundColor: '#F6F8FA' }}
          />

          <Typography variant="body1" style={{ fontWeight: 'bold', margin: 10 }}>
            5. Please specifiy how important the issues and suggestions given are for your experience.
          </Typography>
          <TextField
            select
            defaultValue={importanceState}
            onChange={(e) => setImportance(e.target.value)}
            InputProps={{
              style: {
                borderRadius: 20,
                backgroundColor: '#EEEEEE',
                width: '20em',
                height: '2em'
              }
            }}
          >
            {importanceOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5, marginBottom: 10, borderRadius: 5 }}>
            <Button variant="contained" style={{ backgroundColor: '#60A494', textTransform: 'none', borderRadius: 8 }} onClick={sendFeedback}>
              Send Feedback
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default SendFeedback;