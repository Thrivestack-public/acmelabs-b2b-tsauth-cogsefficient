import React, { memo } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from "@mui/styles/withStyles";
import "aos/dist/aos.css";
import UserManager from "./UserManagerContainer";


AOS.init({ once: true });

const styles = (theme) => ({
    wrapper: {
        backgroundColor: theme.palette.common.white,
        overflowX: "hidden",
    },
});

function Main(props) {
    const { classes, isFinalPage } = props;
    console.log(isFinalPage);




    return (
        <div className={classes.wrapper}>

            <UserManager />

        </div>
    );
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
