import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import OrganizationOnboardingForm from "./OnboardingForm";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import { Scale } from "@mui/icons-material";

const styles = (theme) => ({
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    minWidth: "80%",
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
  cardTop: {
    paddingTop: "0.5vh !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function FormSection(props) {
  const { classes } = props;
  const { setMetadata } = useOnboardingFormData();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const metadataFromUrl = {
      userId: urlParams.get("userId") || getRandomInt(100),
      workflowId: urlParams.get("workflowId"),
      runtimeId: urlParams.get("runtimeId"),
      returnUrl: urlParams.get("returnUrl"),
      env: urlParams.get("env"),
    };
    setMetadata(metadataFromUrl);
    localStorage.setItem(
      "userMetaData",
      JSON.stringify({
        userId: metadataFromUrl.userId,
        workflowId: metadataFromUrl.workflowId,
        runtimeId: metadataFromUrl.runtimeId,
        env: metadataFromUrl.env,
        postOnboardingReturnUrl: metadataFromUrl.returnUrl,
      })
    );
  }, []);

  return (
    <div className={classNames(classes.cardTop)}>
      <div className={classNames("container-fluid", classes.container)}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            maxWidth: '1000px',
          }}
        >
          <OrganizationOnboardingForm />
        </Box>
      </div>
    </div>
  );
}

FormSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(FormSection);
