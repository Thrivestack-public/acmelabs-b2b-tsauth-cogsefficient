import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField, Button, Box,
  Snackbar,
  Alert,
  Typography,
  Grid
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import { textConstants } from "../../../textConstants";
import CopyTextField from "./CopyTextField";
const styles = (theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    padding: theme.spacing(6),
    paddingTop: theme.spacing(6), //  top padding
    paddingBottom: theme.spacing(1),
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    maxWidth: "1000px",
    backgroundColor: "#ffffff",
    margin: "0 auto",
    alignItems: "center",
    width: "100%", 
    maxWidth: "800px",
    minWidth: "600px",
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0),
    alignItems: "left",
    justifyContent: "left",
    textAlign: "left",
    maxWidth: 800,
    paddingTop: "0%",
  },
  formTitle: {
    fontWeight: 600,
    fontSize: "24px",
    textAlign: "left",
    marginBottom: "12px",
  },
  button: {
    backgroundColor: "#5D2A6D",
    color: "#fff",
    padding: theme.spacing(1.5, 3),
    fontSize: "16px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#482073",
    },
    "&:disabled": {
      backgroundColor: "#9a82bd",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: theme.spacing(2),
  },
});

const OrganizationOnboardingForm = (props) => {
  const { classes } = props;
  const { formData, setFormData, resetForm, onboardingMetaData, setPageStepCounter, setStepCompleted } =
    useOnboardingFormData();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.orgName) {
      newErrors.orgName = "Organization name is required";
    }
    if (!formData.orgType) {
      newErrors.orgType = "Organization type is required";
    }
    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      try {
        const data = {
          ...formData,
          ...onboardingMetaData,
        };
        await localStorage.setItem("onboardingData", JSON.stringify(data));
        console.log("Data submitted successfully");

        resetForm();
        setShowSuccessMessage(true);
        setPageStepCounter(2);

        localStorage.removeItem("userMetaData");
      } catch (error) {
        console.error("An error occurred", error);
        setErrorMessage("An error occurred", error);
        setShowErrorMessage(true);
      }
    } else {
      console.error("An error occurred");
      setErrorMessage("An error occurred");
      setShowErrorMessage(true);
    }
    setLoading(false);
  };

  if (showSuccessMessage) {
    setPageStepCounter(3);
    setStepCompleted(5);
    return (
      <Grid>
        <Box className={classes.successContainer}>
          <Typography
            fontSize={["20px", "24px", "32px"]}
            fontWeight={400}
            marginBottom={"1vh"}
          >
            Onboarding complete.
          </Typography>
          <Typography
            fontSize={["12px", "15px", "17px"]}
            fontWeight={400}
            marginBottom={'5vh'}
          >
            {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_TITLE}
          </Typography>


          <Typography
            variant="p"
            fontSize={["12px", "15px", "17px"]}
            fontWeight={400}
          >
            {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_DESC_TWO}
          </Typography>

          <Typography variant="p" fontSize={["12px", "15px", "17px"]}>
            {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_RETURN_URL}
          </Typography>

          <Box marginTop={"2vh"} marginBottom={"5vh"}>

            <CopyTextField text={onboardingMetaData.returnUrl + "&workflowId=" + onboardingMetaData.workflowId + "&runtimeId=" +
              onboardingMetaData.runtimeId} />
          </Box>

        </Box>
        <Box
          sx={{ 
            display: 'flex',     
            justifyContent: 'left',  
            alignItems: 'center',      
            width: '100%',           
          }}
        >
          <a sx={{ 
            marginTop: "5vh",
            display: 'flex',
            alignItems: 'center'
           }}
            href={onboardingMetaData.returnUrl +
              "&workflowId=" +
              onboardingMetaData.workflowId +
              "&runtimeId=" +
              onboardingMetaData.runtimeId}
          >
            <Button variant="contained" 
              sx={{
                 textTransform: 'none', 
                  padding: '12px 24px',  
                  fontSize: '1.1rem',   
                  minWidth: '160px',          
                  minHeight: '50px',          
                }}
            >
              {textConstants.ONBOARDING_PAGE_TWO_RETURN_BTN_TEXT}
            </Button>
          </a>
        </Box>
      </Grid>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.formContainer}>
        <TextField
          label="Website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Contact Person's Name"
          name="contactName"
          value={formData.contactName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Contact Person's Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
        />

        
        {loading && <p>Wait, you will be redirected soon.</p>}
        <Box height={40} />
        {/* Snackbar for success message */}
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={3000}
          fullWidth
          onClose={handleCloseSuccessMessage}
        >
          <Alert
            onClose={handleCloseSuccessMessage}
            severity="success"
            sx={{ width: "100%" }}
          >
            Form submitted successfully!
          </Alert>
        </Snackbar>

        {/* Snackbar for error message */}
        <Snackbar
          open={showErrorMessage}
          autoHideDuration={3000}
          onClose={handleCloseErrorMessage}
        >
          <Alert
            onClose={handleCloseErrorMessage}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className={classes.button}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

OrganizationOnboardingForm.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  onboardingMetaData: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(
  OrganizationOnboardingForm
);
