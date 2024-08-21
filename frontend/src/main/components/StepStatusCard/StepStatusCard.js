import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Button } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import WorkflowDataDrawer from "../dashboard/WorkflowDataDrawer";

const styles = (theme) => ({
  statusCard: {
    width: "100%",
    // maxWidth: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 16px",
    // margin: "12px 24px",
  },
});

function StepStatusCard(props) {
  const {
    classes,
    label,
    status,
    isShowButtonVisible,
    data,
    text,
    onDrawerOpen,
    isStatusVisible = false,
  } = props;

  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openDrawer = () => {
    if (onDrawerOpen) onDrawerOpen();
    setIsSideDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsSideDrawerOpen(false);
  };

  return (
    <Box
      className={classes.statusCard}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"}>
        <Box className="" display={"flex"} alignItems={"center"}>
          {status === "done" ? (
            <img
              src="/images/logged_in/checkImage.png"
              height={40}
              width={40}
              alt={"check"}
            />
          ) : (
            <img
              src="/images/logged_in/pendingImage.png"
              height={40}
              width={40}
              alt={"pending"}
            />
          )}
          <Box
            className=""
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            px={2}
            textAlign={"left"}
          >
            <Typography fontWeight={500} fontSize={"20px"}>
              {label}
            </Typography>
            {isStatusVisible ? (
              <Typography fontSize={"14px"} my={1} fontWeight={500}>
                {status}
              </Typography>
            ) : null}
            <Typography fontSize={"14px"} textAlign={"justify"}>
              {text}
            </Typography>
          </Box>
        </Box>
      </Box>
      {isShowButtonVisible ? (
        <Box>
          <Button
            onClick={openDrawer}
            color="success"
            size="small"
            variant="outlined"
            style={{ whiteSpace: "nowrap" }}
          >
            Show Data
          </Button>
          <WorkflowDataDrawer
            title={label}
            data={data}
            open={isSideDrawerOpen}
            onClose={closeDrawer}
          />
        </Box>
      ) : null}
    </Box>
  );
}

StepStatusCard.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  isShowButtonVisible: PropTypes.bool,
  isStatusVisible: PropTypes.bool,
  data: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onDrawerOpen: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(StepStatusCard);
