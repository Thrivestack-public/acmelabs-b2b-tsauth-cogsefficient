import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Typography, Card, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import OrganizationOnboardingForm from "./OnboardingForm";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import {
  textConstants
} from "../../../textConstants";

const styles = (theme) => ({
  card: {
    boxShadow: theme.shadows[4],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minWidth: "60%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
  },
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
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  cardTop: {
    paddingTop: "67px !important"
  },
  formTitle: {
    fontWeight: 400,
    fontSize: "24px",
    textAlign: "left",
    marginBottom: "12px",
    paddingLeft:'1vw'
  },
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function FormSection(props) {
  const { classes } = props;
  const { setMetadata } = useOnboardingFormData();

  useEffect(() => {
    // Check if metadata is in the URL
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
        <Box display="flex" justifyContent="space-evenly" className="row">

          <Box
            display="flex"
            justifyContent="space-between"
            gap={"20px"}
            width={"full"}
          > 
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              width="100%"
            >
              
              <Typography
                variant="p"
                fontWeight={500}
                paddingBottom={"4vh"}
                paddingTop={"0vh"}
                fontSize={["12px", "14px", "x-large"]}
              >
                {textConstants.ONBOARDIG_PAGE_ONE_STEP_ONE_TITLE}<br />
              </Typography>
           <Typography>
           <span style={{color:'#FF26DC'}}>End user</span> {textConstants.ONBOARDING_PAGE_ONE_STEP_SUB_TITLE} <span style={{color:'#FF26DC'}}>indicative</span> {textConstants.ONBOARDING_PAGE_ONE_STEP_SUB_TITLE2}
           <span style={{color:'#FF26DC'}}>indicative</span> your onboarding experience.
           </Typography>
              <Card
                className={classes.card}
                data-aos-delay="200"
                data-aos="zoom-in"
              >
              <Box mt={4} maxWidth={"600px"} margin={"auto"}>
                <Typography className={classes.formTitle}>
                  Onboarding - step 1
                </Typography>
                <Typography
                  fontWeight={300}
                  Width={"400px"}
                  fontSize={["10px", "12px", "14px"]}
                  marginBottom={"16px"}
                  padding={"0px 16px"}
                >
                  {textConstants.ONBOARDING_PAGE_ONE_STEP_ONE_HEADING} <span style={{fontWeight: 500 , fontSize:'medium'}}>ThriveStack PLG Analytics &gt; Activation reports.</span>
                </Typography>
                <Box mt={4} />
                <OrganizationOnboardingForm />
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </div>
    </div >
  );
}

FormSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(FormSection);
