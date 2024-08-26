import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import useWidth from "../../../shared/functions/useWidth";
import WorkflowStatusCard from "./WorkflowStatusCard";
import calculateSpacing from "./calculateSpacing";
import StepStatusCard from "../StepStatusCard/StepStatusCard";
import { signupStepsData } from "../../../textConstants";

function WorkflowStatusArea(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [userData, setUserData] = useState({});
  const [userOnboardingData, setUserOnboardingData] = useState({});

  const getUserData = async () => {
    let data = localStorage.getItem("onboardingData");
    data = JSON.parse(data);
    if (data) {
      setUserOnboardingData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const data = signupStepsData.map((step) => {
    return {
      ...step,
      status: "done",
      data: {},
    };
  });

  return (
    <div>
      <div className="container-fluid">
        <Box mb={4} textAlign={"center"}>
          {/* <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
          <Typography
            fontSize={["20px", "28px", "36px"]}
            fontWeight={600}
            mb={2}
          >
            Welcome to Acme Labs Application
          </Typography>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            This is the application dashboard page of the Acme Labs - designed to
            illustrate the seamless integration of <br /> ThriveStack's
            workflows with your own application.
          </Typography>
          <Box mt={4} maxWidth={"600px"} marginX={"auto"}>
            <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
              Once the end user arrives on this page, all the necessary steps
              will have been executed, and we will have gathered and stored the
              data throughout the entire process, allowing you to access and
              view it.
            </Typography>
          </Box> */}

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            mt={2}
          >
            <Grid container spacing={calculateSpacing(width, theme)}>
              {data.map((element) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                  }
                  key={element.headline}
                  alignContent={"center"}
                  justifyItems={"center"}
                >
                  <StepStatusCard
                    label={element.step}
                    status={element.status}
                    isShowButtonVisible
                    data={element.data}
                    text={element.text}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box className="container-fluid" display={"none"}>
          <Grid container spacing={calculateSpacing(width, theme)}>
            {data.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                }
                key={element.headline}
              >
                <WorkflowStatusCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.step}
                  text={element.text}
                  status={element.status}
                  data={element.data}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

WorkflowStatusArea.propTypes = {};

export default withTheme(WorkflowStatusArea);
