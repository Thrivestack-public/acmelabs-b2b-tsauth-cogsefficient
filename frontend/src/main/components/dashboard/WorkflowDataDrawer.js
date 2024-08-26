import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import CloseIcon from "@mui/icons-material/Close";
import { JSONTree } from "react-json-tree";

const drawerWidth = 240;

const styles = {
  toolbar: {
    minWidth: drawerWidth,
  },
};

function DataDrawer(props) {
  const { classes, onClose, open, title, data } = props;
  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="Close DataDrawer"
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <Box p="20px" minWidth={["200px", "400px"]}>
        <Typography variant="body1">Data :</Typography>

        {data ? (
          <JSONTree
            hideRoot
            data={data}
            shouldExpandNodeInitially={() => true}
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            No Data Available
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}

DataDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(DataDrawer);
