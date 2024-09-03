import React, { Fragment } from 'react';
import { Grid, Box } from '@mui/material';
import OnboardingPageOne from '../onboardingPageOne/OnboardingPageOne';
import OnboardingPageTwo from '../onboardingPageTwo/OnboardingPageTwo';
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import WorkFlowHeading from '../workFlowHeading/workFlowHeading';
import WorkFlowStepper from '../workFlowStepper/workFlowStepper';
import Conclusion from '../conclusion/conclusion';
import "./boardingSection.css";
function boardingSection() {
  const { currentPage } = useOnboardingFormData();
  const { setReturnUrl, setRuntimeId, setWorkflowId } = useOnboardingFormData();

  const params = new URLSearchParams(window.location.search);
  const runtimeIdParam = params.get('runtimeId');
  const workflowIdParam = params.get('workflowId');
  const returnUrlParam = params.get('returnUrl');

  if (runtimeIdParam) {
    setRuntimeId(runtimeIdParam);
  }

  if (workflowIdParam) {
    setWorkflowId(workflowIdParam);
  }
  if (returnUrlParam) {
    const domainIndex = returnUrlParam.indexOf('://') + '://'.length;
    const path = returnUrlParam.substring(domainIndex);
    setReturnUrl(returnUrlParam);
  }
  return (
    <Fragment>
      <Box sx={{ flexGrow: 1, height: '100vh' }}>
        <Grid container spacing={0} className='mainGrid-body'>
          <Grid item xs={5.0} className='leftGrid-body'>
            <Box>
              <WorkFlowHeading />
              <WorkFlowStepper />
            </Box>
          </Grid>
          <Grid item xs={6.5} className='rightGrid-body'>
            <Box>
              {currentPage === 1 && <OnboardingPageOne />}
              {currentPage === 2 && <OnboardingPageTwo />}
            </Box>
            {currentPage === 3 && <Conclusion />}
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};


boardingSection.propTypes = {};

export default boardingSection;