import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  hotspot: {
    position: "absolute",
    ...theme.typography.button, // or use your desired styling
  },
  animatedPing: {
    position: "absolute",
    display: "inline-flex",
    height: "100%",
    width: "100%",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main, // Replace with your color
    opacity: 0.75,
    animation: `$ping 2s ${theme.transitions.easing.easeInOut} infinite`,
  },
  hotspotInner: {
    position: "relative",
    display: "inline-flex",
    borderRadius: "50%",
    height: "24px",
    width: "24px",
    backgroundColor: theme.palette.secondary.main, // Replace with your color
    border: `2px solid ${theme.palette.common.white}`,
    color: theme.palette.common.white,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: "14px", // Customize the font size
    fontWeight: "bold", // Customize the font weight
  },
  "@keyframes ping": {
    "0%": {
      transform: "scale(0.5)",
      opacity: 0.5,
    },
    "50%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(0.5)",
      opacity: 0.5,
    },
  },
}));

function Hotspot(props) {
  const classes = useStyles();

  return (
    <div className={classes.hotspot}>
      <span className={classes.animatedPing}></span>
      <span className={classes.hotspotInner}>
        <Box className={classes.label}>{props.label || ""}</Box>
      </span>
    </div>
  );
}

Hotspot.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Hotspot;
