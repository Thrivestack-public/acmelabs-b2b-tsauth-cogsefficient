import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  Box,
  Typography,
  Snackbar,
  Alert,
  InputLabel
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";

const styles = (theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
    padding: theme.spacing(4),
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    margin: "0 auto",
    alignItems: "center",
    width: "100%", 
    maxWidth: "600px",
    minWidth: "600px",
  },
  placeholder: {
    color: theme.palette.text.disabled, 
  },
  inputFieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", 
    width: "100%",
  },
  inputField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  selectField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  label: {
    marginBottom: theme.spacing(1), 
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
  const { formData, setFormData, setCurrentPage, setPageStepCounter } = useOnboardingFormData();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleNavigation = () => {
    history.push("/onboarding/pageTwo");
  };

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
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
      console.log(formData);
      setCurrentPage(2);
      setPageStepCounter(2);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.formContainer}>
        {/* Organization Name Field */}
        <Box className={classes.inputFieldContainer}>
          <Typography variant="subtitle1" className={classes.label}>
            Organization name*
          </Typography>
          <TextField
            name="orgName"
            value={formData.orgName}
            onChange={handleInputChange}
            error={!!errors.orgName}
            helperText={errors.orgName}
            required
            fullWidth
            className={classes.inputField}
            label="Enter"
            sx={{
              '& legend': { display: 'none' },
              '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.1s ease-in" }
            }}
          />
        </Box>

        {/* Organization Type Field */}
        <Box className={classes.inputFieldContainer}>
          <Typography variant="subtitle1" className={classes.label}>
            Organization type*
          </Typography>
          <FormControl fullWidth className={classes.selectField} error={!!errors.orgType}>
            <Select
              name="orgType"
              value={formData.orgType}
              onChange={handleInputChange}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                <div style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Select</div>
              </MenuItem>
              <MenuItem value="Business Organization">Business Organization</MenuItem>
              <MenuItem value="Educational Institution">Educational Institution</MenuItem>
              <MenuItem value="Nonprofit Organization">Nonprofit Organization</MenuItem>
              <MenuItem value="Government Organization">Government Organization</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Industry Field */}
        <Box className={classes.inputFieldContainer}>
          <Typography variant="subtitle1" className={classes.label}>
            Industry*
          </Typography>
          <FormControl fullWidth className={classes.selectField}>
            <Select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              error={!!errors.industry}
              fullWidth
              displayEmpty
            >
              <MenuItem value="" disabled>
                <div style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Select</div>
              </MenuItem>
              <MenuItem value="Cloud Computing">Cloud Computing</MenuItem>
              <MenuItem value="Data Analytics">
                Data Analytics and Business Intelligence
              </MenuItem>
              <MenuItem value="Financial Technology">
                Financial Technology
              </MenuItem>
              <MenuItem value="Healthcare IT">Healthcare IT</MenuItem>
              <MenuItem value="Education Technology (EdTech)">
                Education Technology (EdTech)
              </MenuItem>
              <MenuItem value="Artificial Intelligence">
                Artificial Intelligence
              </MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
       
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
          Next step
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
