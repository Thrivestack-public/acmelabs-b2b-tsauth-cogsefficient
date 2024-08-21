import React, { Fragment } from "react";
import TenantRequestsList from "./TenantRequestsList";
import WorkflowStatusArea from "../../../main/components/dashboard/WorkflowStatusArea";
import { Typography } from "@mui/material";

function TenantDashboard(props) {
  return (
    <Fragment>
      <TenantRequestsList />

      {/* <Typography
        fontSize={["16px", "20px"]}
        fontWeight={500}
        my={2}
        mt={10}
        textAlign={"center"}
      >
        Workflow Data
      </Typography>
      <WorkflowStatusArea /> */}
    </Fragment>
  );
}

TenantDashboard.propTypes = {};

export default TenantDashboard;
