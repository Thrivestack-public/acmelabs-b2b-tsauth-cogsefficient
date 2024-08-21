import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Button } from "@mui/material";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
  statusCard: {
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 16px",
    margin: "12px 24px",
  },
});

function StepStatusCard(props) {
  const { classes, label, status, isShowButtonVisible } = props;
  return (
    <Box
      className={classes.statusCard}
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"}>
        <Box className="" display={"flex"} alignItems={"center"} gap="8px">
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
          >
            <Typography fontWeight={500} fontSize={"20px"}>
              {label}
            </Typography>
            <Typography fontSize={"14px"}>{status}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

StepStatusCard.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  isShowButtonVisible: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(StepStatusCard);
