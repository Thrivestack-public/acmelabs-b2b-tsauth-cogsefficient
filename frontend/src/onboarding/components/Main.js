import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AOS from "aos/dist/aos";
import withStyles from "@mui/styles/withStyles";
import "aos/dist/aos.css";
import CookieRulesDialog from "./cookies/CookieRulesDialog";
import CookieConsent from "./cookies/CookieConsent";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import { OnboardingFormDataContextProvider } from "./onboardingFormDataContext/onboardingFormDataContext";

AOS.init({ once: true });

const styles = (theme) => ({
  wrapper: {
    backgroundColor: theme.palette.common.white,
    overflowX: "hidden",
  },
});

function Main(props) {
  const { classes, isFinalPage } = props;
  const [selectedTab, setSelectedTab] = useState(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isCookieRulesDialogOpen, setIsCookieRulesDialogOpen] = useState(false);
  console.log(isFinalPage);

  const selectHome = useCallback(() => {
    smoothScrollTop();
    document.title = "Acme Labs";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const handleCookieRulesDialogOpen = useCallback(() => {
    setIsCookieRulesDialogOpen(true);
  }, [setIsCookieRulesDialogOpen]);

  const handleCookieRulesDialogClose = useCallback(() => {
    setIsCookieRulesDialogOpen(false);
  }, [setIsCookieRulesDialogOpen]);
  console.log("Selected Tab", selectedTab);
  console.log("Selected home", selectHome);

  return (
    <div className={classes.wrapper}>
      <OnboardingFormDataContextProvider>
        {!isCookieRulesDialogOpen && (
          <CookieConsent
            handleCookieRulesDialogOpen={handleCookieRulesDialogOpen}
          />
        )}
        <CookieRulesDialog
          open={isCookieRulesDialogOpen}
          onClose={handleCookieRulesDialogClose}
        />
        {/* <NavBar
          selectedTab={selectedTab}
          selectTab={setSelectedTab}
          mobileDrawerOpen={isMobileDrawerOpen}
          handleMobileDrawerOpen={handleMobileDrawerOpen}
          handleMobileDrawerClose={handleMobileDrawerClose}
        /> */}
        <Routing selectHome={selectHome} />
      </OnboardingFormDataContextProvider>
    </div>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
