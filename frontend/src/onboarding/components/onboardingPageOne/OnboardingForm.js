import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";

const styles = (theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 400,
    marginLeft: "1vw",
  },
  buttonMarginBottom: {
    marginBottom: theme.spacing(3),
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
        <TextField
          label="Organization Name"
          name="orgName"
          value={formData.orgName}
          onChange={handleInputChange}
          error={!!errors.orgName}
          helperText={errors.orgName}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Organization Type *</InputLabel>
          <Select
            label="Organization Type"
            name="orgType"
            value={formData.orgType}
            onChange={handleInputChange}
            error={!!errors.orgType}
            fullWidth
          >
            <MenuItem value="Business Organization">
              Business Organization
            </MenuItem>
            <MenuItem value="Educational Institution">
              Educational Institution
            </MenuItem>
            <MenuItem value="Nonprofit Organization">
              Nonprofit Organization
            </MenuItem>
            <MenuItem value="Government Organization">
              Government Organization
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Industry *</InputLabel>
          <Select
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            error={!!errors.industry}
            fullWidth
          >
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
        <Box width="100%" display="flex" justifyContent="flex-start">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            loading={loading}
            className={classes.buttonMarginBottom}
          >
            Next
          </Button>
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
