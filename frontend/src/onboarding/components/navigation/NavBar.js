import React, { memo } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography } from "@mui/material";
import withStyles from "@mui/styles/withStyles";

const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  brandText: {
    color: "black",
    fontWeight: 600,
    fontSize: "16px",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
});

function NavBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.iconWrapper}>
            <img src="/acme_labs.png" alt="icon" height={30} width={180} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
