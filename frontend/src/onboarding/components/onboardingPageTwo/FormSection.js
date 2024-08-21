import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Typography, Card, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import OrganizationOnboardingForm from "./OnboardingForm";
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
    width:"150%",
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
    paddingLeft:'1vw'
  },
  stepText: {
    fontWeight: 500,
    fontSize: "16px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  statusCard: {
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 16px",
    margin: "24px",
  },
  cardTop: {
    paddingTop: "67px !important"
  },
  cardWidth: {
    width:"50vw",
  }
});

function FormSection(props) {
  const { classes, theme } = props;

  return (
    <div className={classes.cardTop}>
      <div className={classNames("container-fluid", classes.container)}>
        <Box display="flex" paddingLeft="1vw" className="row">

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
                {textConstants.ONBOARDIG_PAGE_ONE_STEP_ONE_TITLE}
              </Typography>
              <Card
                className={[classes.card, classes.cardWidth]}
                data-aos-delay="200"
                data-aos="zoom-in"
              >
                <Box mt={2}>
                  <OrganizationOnboardingForm />
                </Box>
              </Card>
            </Box>
          </Box>
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
