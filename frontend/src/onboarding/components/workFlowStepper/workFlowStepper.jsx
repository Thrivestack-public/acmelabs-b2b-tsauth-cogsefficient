import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';
import { textConstants } from "../../../textConstants";
import { Grid } from '@mui/material';
import { ArcherContainer, ArcherElement } from "react-archer";
import { jwtDecode } from 'jwt-decode';
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import JsonViewerModal from './modalComponent';
import PreviewModal from './previewModalComponent';
import { fetchData as fetchTenantData, fetchValidateAuth, getEnrichmentData } from '../../../Api/viewSharedData';
import { useLocation } from 'react-router-dom';
import './workFlowStepper.css';



function workFlowStepper(props) {
  const stepId = "";
  const location = useLocation();
  const currentPath = location.pathname;
  const isFirstPage = currentPath.endsWith("/tell-us-about-you");
  const isFinalPage = currentPath.endsWith("/final");
  const queryParams = new URLSearchParams(location.search);
  const workflowRuntimeId = queryParams.get('runtimeId') || localStorage.getItem("workflowRuntimeId");
  const authOTP = queryParams.get('authOTP');
  console.log("workflowRuntimeId", workflowRuntimeId);

  if (workflowRuntimeId && workflowRuntimeId !== "") {
    localStorage.setItem("workflowRuntimeId", workflowRuntimeId)
  }

  const { pageStepCounter, stepCompleted, setCurrentPage, setPageStepCounter, setStepCompleted, setUserEmail } = useOnboardingFormData();
  if (isFinalPage) {
    setCurrentPage(3);
    setStepCompleted(11);
    setPageStepCounter(4);
  }

  const [modalDataArr, setModalDataArr] = useState([{
    JsonData: {},
    JsonLabel: ""
  }]);

  // const baseJsonData = { "progress": "loading data.." }
  // const [modalJsonLabel, setModalJsonLabel] = useState('Authenticated UserData');
  // const [modalJsonData, setModalJsonData] = useState(baseJsonData);
  const steps = [
    {
      label: 'Authenticate',
      description: ``,
    },
    {
      label: 'Enrich Users and Accounts',
      description:
        '',
    },
    {
      label: 'Check Waitlist',
      description: ``,
    },
    {
      label: 'Onboarding Redirect',
      description: ''
    },
    {
      label: 'Apply Pricing Plan',
      description: ''
    },
    {
      label: 'Provision tenant Request',
      description: ''
    },
    {
      label: 'Store Leads',
      description: ''
    },
    {
      label: 'Send End user Welcome Email',
      description: ''
    },


  ]
  var rStepIndex = 0;
  var lStepIndex = steps.length - 1;

  // labels of arrow
  const viewSharedData = (updateJsonData, leftDistance, activeOnStep) => (
    <div
      className={stepCompleted < activeOnStep ? 'disabled' : ''}
      style={{
        color: "blue",
        fontSize: "12px",
        position: "relative",
        top: '-1.3em',
        textDecoration: 'underline',
        textAlign: "center",
        width: "9em",
        cursor: stepCompleted < activeOnStep ? 'not-allowed' : 'pointer',
        left: `${leftDistance}%`,
      }}
      onClick={stepCompleted < activeOnStep ? null : updateJsonData}
    >
      View Shared Data
    </div>
  );

  const acknowledgeData = (
    <div
      style={{
        color: "black",
        fontSize: "12px",
        marginTop: "5px",

      }}
    >
      Acknowledge
    </div>
  );

  const redirectData = (
    <div
      style={{
        fontSize: "12px",
        padding: "3%, 5%",
        textAlign: "center",
        backgroundColor: "#F8FAFC",
        position: "relative",
        left: '65%'
      }}
    >
      Redirect
    </div>
  );

  // arrows
  let leftToRightArrowRelation = {
    targetId: "id_of_target",
    sourceId: "id_of_source",
    top: "0px",
    targetAnchor: "left",
    sourceAnchor: "right",
    style: {
      lineStyle: 'straight',
      marginLeft: "10px"
    },
    label: null,
    className: 'arrow-class',
  }
  let rightToLeftArrowRelation = {
    ...leftToRightArrowRelation, targetAnchor: "right", sourceAnchor: "left"
  };

  const leftToRightArrowRelations = {

    'srcLeftStep1': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep1',
      label: viewSharedData(() => getEnrichedData("firstAuthenticationData"), 15, 3)
    },

    'srcLeftStep3': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep2',
      label: viewSharedData(() => getAuthenticationData("firstAuthenticationData"), 30, 3)
    },
    'srcLeftStep5': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep4',
      label: viewSharedData(getTenantData, 15, 5),
    },
    'srcLeftStep10': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep5',
      label: <div>{viewSharedData(() => getAuthenticationData("lastAuthenticationData"), 65, 10)} {redirectData}</div>
    }
  }

  const rightToLeftArrowRelations = {
    'srcRightStep3': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep3',
      label: <div><div style={{ display: 'inline-block', width: '100%' }}> </div> {acknowledgeData}</div>
    },
    'srcRightStep4': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep5',
      label: <div><div style={{ display: 'inline-block', width: '100%' }}> </div> {acknowledgeData}</div>
    },
  }

  const [activeStep, setActiveStep] = useState(0);

  const step_default_img = "/steps_default.png";
  const step_in_progress_img = "/step_in_progress.png";
  const step_complete_img = "/step_complete.png";


  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);
  const closePrevModel = () => setIsPrevModalOpen(false);
  const [modalInfo, setModalInfo] = useState(true);


  useEffect(async () => {
    if (isFirstPage) {
      const authApiResponse = await fetchValidateAuth(authOTP);
      const authApiResponseJson = authApiResponse.token ? jwtDecode(authApiResponse.token) : { "error": "No token found" };
      localStorage.setItem("firstAuthenticationData", JSON.stringify(authApiResponseJson));
    }
    if (isFinalPage) {
      const authApiResponse = await fetchValidateAuth(authOTP);
      const authApiResponseJson = authApiResponse.token ? jwtDecode(authApiResponse.token) : { "error": "No token found" };
      const emailId = authApiResponseJson.emailId;
      setUserEmail(emailId);
      localStorage.setItem("lastAuthenticationData", JSON.stringify(authApiResponseJson));
    }

  }, []);

  useEffect(async () => {
    const tenantApiResponse = await fetchTenantData(workflowRuntimeId, 'tenant_creation');
    localStorage.setItem("tenantData", JSON.stringify(tenantApiResponse));
  }, []);

  async function getTenantData() {

    // setModalJsonData(baseJsonData)
    // setModalJsonLabel("Tenant Data");
    setModalInfo(true);
    setIsModalOpen(true);
    const apiResponse = JSON.parse(localStorage.getItem("tenantData"));
    // console.log("tenantData", apiResponse);
    // setModalJsonData(apiResponse);

    setModalDataArr([{
      JsonData: apiResponse,
      JsonLabel: "Tenant Data"
    }])

  }

  // validateAuth
  async function getAuthenticationData(storageKey) {
    // setModalJsonData(baseJsonData)
    // setModalJsonLabel("Authenticated User Data");
    setModalInfo(false)
    setIsModalOpen(true);
    const apiResponse = JSON.parse(localStorage.getItem(storageKey));
    console.log("authenticationData", apiResponse);
    // setModalJsonData(apiResponse);

    setModalDataArr([{
      JsonData: apiResponse,
      JsonLabel: "Authenticated User Data"
    }])

    
  }

  const [userData, setUserData] = useState()
  const [companyData, setCompanyData] = useState({})


  async function getEnrichedData(storageKey) {
    setIsModalOpen(true);
    setModalInfo(false)

    setModalDataArr([{
      JsonData: userData,
      JsonLabel: "User Enrichment Data"
    },
    {
      JsonData: companyData,
      JsonLabel: "Company Enrichment Data"
    }])
  }

  

  

  useEffect(()=>{
    async function saveEnrichmentData() {
      const data = await getEnrichmentData()
      const EnrichJson = {"product_id":"f01334c6-f726-11ee-bd2a-e60358d08e04","email_id":"akgupta317@gmail.com","user_enrichment_data":"{\"enrichment_first_name\":\"ankit\",\"enrichment_last_name\":\"gupta\",\"enrichment_full_name\":\"ankit gupta\",\"enrichment_avatar\":\"\",\"enrichment_email_provider\":\"\",\"enrichment_city\":\"\",\"enrichment_country\":\"india\",\"enrichment_country_code\":\"\",\"enrichment_employment_domain\":\"\",\"enrichment_employment_name\":\"\",\"enrichment_employment_role\":\"\",\"enrichment_employment_seniority\":\"\",\"enrichment_employment_sub_role\":\"\",\"enrichment_employment_title\":\"\",\"enrichment_facebook_handle\":\"\",\"enrichment_github_handle\":\"\",\"enrichment_linkedin_handle\":\"\",\"enrichment_location\":\"\",\"enrichment_phone\":[],\"enrichment_state\":\"bombay, maharashtra, india\",\"enrichment_state_code\":\"\",\"enrichment_time_zone\":\"\",\"enrichment_twitter_handle\":\"\",\"enrichment_inactive_at\":\"\",\"enrichment_active_at\":\"\"}","company_enrichment_data":"{\"enrichment_name\":\"\",\"enrichment_legal_name\":\"\",\"enrichment_domain\":\"\",\"enrichment_domain_aliases\":null,\"enrichment_phone_numbers\":null,\"enrichment_email_addresses\":null,\"enrichment_sector\":\"\",\"enrichment_industry_group\":\"\",\"enrichment_industry\":\"\",\"enrichment_sub_industry\":\"\",\"enrichment_tags\":null,\"enrichment_description\":\"\",\"enrichment_founder_year\":0,\"enrichment_location\":\"\",\"enrichment_time_zone\":\"\",\"enrichment_street_number\":\"\",\"enrichment_street_name\":\"\",\"enrichment_street_address\":\"\",\"enrichment_city\":\"\",\"enrichment_postal_code\":\"\",\"enrichment_state\":\"\",\"enrichment_state_code\":\"\",\"enrichment_country\":\"\",\"enrichment_country_code\":\"\",\"enrichment_logo\":\"\",\"enrichment_linkedin_handle\":\"\",\"enrichment_facebook_handle\":\"\",\"enrichment_twitter_handle\":\"\",\"enrichment_crunchbase_handle\":\"\",\"enrichment_email_provider\":\"\",\"enrichment_type\":\"\",\"enrichment_phone\":\"\",\"enrichment_traffic_rank\":\"\",\"enrichment_employees\":0,\"enrichment_employees_range\":\"\",\"enrichment_market_cap\":\"\",\"enrichment_raised\":\"\",\"enrichment_annual_revenue\":\"\",\"enrichment_tech\":\"\",\"enrichment_tech_categories\":null}"}
      setUserData(JSON.parse(EnrichJson["user_enrichment_data"]))
      setCompanyData(JSON.parse(EnrichJson["company_enrichment_data"]))
      console.log("Real DATA",data)
      
      // setUserData(JSON.parse(data["user_enrichment_data"]))
      // setCompanyData(JSON.parse(data["company_enrichment_data"]))
    }

    saveEnrichmentData()
  },[])


  return (
    <ArcherContainer strokeColor="#ccc" strokeWidth={1.5} svgContainerStyle={{ zIndex: 1, marginLeft: "7px" }}>
      <JsonViewerModal isOpen={isModalOpen} onClose={closeModal} jsonData={modalDataArr} modalInfo={modalInfo}/>

      <Grid container columns={{ md: 12 }} spacing={2} sx={{ marginTop: '2vh', paddingLeft: '1.5vw' }}>

        <Grid md="5">
          <Card style={{ position: 'relative' }}>
            <Typography
              variant="p"
              fontWeight={500}
              paddingBottom={"1vh"}
              paddingTop={"2vh"} justifyContent={'center'} display={"flex"}
              backgroundColor="#F8FAFC"
              fontSize={["12px", "14px", "16px"]}
            >
              <img src="/thrive.png"></img>
            </Typography>
            <Typography
              variant="p"
              fontWeight={500}
              justifyContent={'center'} display={"flex"}
              fontSize={["8px", "10px", "12px"]}
            >
              {textConstants.WORKFLOW_STEPPER_SUBTITLE}
            </Typography>

            <CardContent>

              <Box sx={{ maxWidth: 400 }}>
                <Stepper orientation="vertical">
                  {steps.map((step, index) => (
                    <>
                      <Step key={step.label} sx={{ color: 'green' }} index={index > 4 ? index - 5 : index}
                        completed={index < stepCompleted} active={index === activeStep}>
                        <StepLabel
                          StepIconProps={{
                            classes: {
                              root: 'StepperIcon',
                              completed: 'StepperIconCompleted',
                            }
                          }}
                        >
                          {step.label}
                          <img src="/Vector.png" className='infoImageIcon'>
                          </img>
                          <ArcherElement id={`srcLeftStep${index}`} relations={leftToRightArrowRelations[`srcLeftStep${index}`] ? [leftToRightArrowRelations[`srcLeftStep${index}`]] : []}>
                            <div className='leftSideDiv srcDiv'></div>
                          </ArcherElement>
                          <ArcherElement id={`dstLeftStep${index}`}>
                            <div className='leftSideDiv dstDiv'></div>
                          </ArcherElement>
                        </StepLabel>
                      </Step>
                      {index == 4 && <div style={{ height: '107px' }}>
                        <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                      </div>}
                    </>
                  ))}
                  <div style={{ height: '8px', position: 'relative', display: 'inline-block' }}>
                    <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Step
                      completed={isFinalPage}
                      index={0}
                    >
                      <StepLabel
                        onClick={() => { setIsPrevModalOpen(true) }}
                        StepIconProps={{
                          classes: {
                            root: 'StepperIcon',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                      >
                        <span style={{ color: isFinalPage ? 'blue' : '#00000099', fontWeight: 400, fontSize: '0.875rem' }} className="stepper-link" >Notify end users</span>
                        <img src="/Vector.png" className='infoImageIcon'>
                        </img>
                        <ArcherElement id={`srcLeftStep${++lStepIndex}`} relations={leftToRightArrowRelations[`srcLeftStep${lStepIndex}`] ? [leftToRightArrowRelations[`srcLeftStep${lStepIndex}`]] : []}>
                          <div className='leftSideDiv srcDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`dstLeftStep${lStepIndex}`}>
                          <div className='leftSideDiv dstDiv'></div>
                        </ArcherElement>
                      </StepLabel>
                    </Step>
                    <div style={{ height: '8px', position: 'relative', display: 'inline-block' }}>
                      <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                    </div>
                    <Step
                      completed={isFinalPage}
                      index={0}
                    >
                      <StepLabel style={{ color: 'blue' }}
                        StepIconProps={{
                          classes: {
                            root: 'StepperIcon',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                        completed={true}
                        index={0}
                        onClick={() => { setIsPrevModalOpen(true) }}
                      >
                        <span className="stepper-link" style={{ color: isFinalPage ? 'blue' : '#00000099', fontWeight: 400, fontSize: '0.875rem' }}>Notify Acme GTM team</span>
                        <img src="/Vector.png" className='infoImageIcon'>
                        </img>
                        <ArcherElement id={`srcLeftStep${++lStepIndex}`} relations={leftToRightArrowRelations[`srcLeftStep${lStepIndex}`] ? [leftToRightArrowRelations[`srcLeftStep${lStepIndex}`]] : []}>
                          <div className='leftSideDiv srcDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`dstLeftStep${lStepIndex}`}>
                          <div className='leftSideDiv dstDiv'></div>
                        </ArcherElement>
                      </StepLabel>
                      <PreviewModal isOpen={isPrevModalOpen} onClose={closePrevModel} />
                    </Step>
                    <div style={{ height: '8px', position: 'relative', display: 'inline-block' }}>
                      <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                    </div>
                    <Step completed={isFinalPage} index={0}>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            root: 'StepperIcon',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                        completed={isFinalPage}
                      >
                        Redirect
                        <img src="/Vector.png" className='infoImageIcon'>
                        </img>
                        <ArcherElement id={`srcLeftStep${++lStepIndex}`} relations={leftToRightArrowRelations[`srcLeftStep${lStepIndex}`] ? [leftToRightArrowRelations[`srcLeftStep${lStepIndex}`]] : []}>
                          <div className='leftSideDiv srcDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`dstLeftStep${lStepIndex}`}>
                          <div className='leftSideDiv dstDiv'></div>
                        </ArcherElement>
                      </StepLabel>
                    </Step>
                    <Step completed={isFinalPage}>
                      <StepLabel
                        icon={
                          <img src={isFinalPage ? '/unlock.png' : '/lock.png'} style={{ marginLeft: '7px', fontSize: 'small', height: '1vw', padding: '0% 1%', marginTop: '-1%' }}></img>
                        }
                        completed={true}
                        index={0}
                      >
                        PLG CRM and Analytics unlocked <br />
                        {isFinalPage && <span className="stepper-link" style={{ color: isFinalPage ? 'blue' : 'black' }}>Link to these pages</span>}
                      </StepLabel>
                    </Step>
                  </div>
                </Stepper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid md="3">
        </Grid>
        <Grid md="4">
          <Paper elevation={3} style={{ maxWidth: '600px', margin: 'auto', position: 'relative' }}>
            <Typography
              variant="p"
              fontWeight={500}
              paddingBottom={"1vh"}
              paddingTop={"2vh"} justifyContent={'center'} display={"flex"}
              backgroundColor="#F8FAFC"
              fontSize={["12px", "14px", "14px"]}> <img src="/acme.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img> {textConstants.WORKFLOW_STEPPER_TITLE_TWO}</Typography>
            <Stepper activeStep={activeStep} orientation="vertical" style={{ paddingBottom: '27px', marginTop: '1vw' }} sx={{ color: '#334155' }}>
              <div className={'default-box'}>
                <ArcherElement id={`dstRightStep${rStepIndex}`}>
                  <div className='rightSideDiv dstDiv'></div>
                </ArcherElement>
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155', marginBottom: '0vw' } }}
                    icon={<img src="/account_circle.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>End User</StepLabel>
                </Step>
                <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                  <div className='rightSideDiv srcDiv'></div>
                </ArcherElement>
              </div>

              <div className='default-box' style={{ height: '50px' }}>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>


              <div className={`default-box ${(pageStepCounter == 0) ? 'arrow-box' : 'color-box'}`} id="enrichment-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src={(pageStepCounter > 0) ? step_complete_img : (pageStepCounter == 0 ? step_in_progress_img : step_default_img)} style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img></>}>Enrichment </StepLabel>
                </Step>
              </div>


              <div className='default-box'>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>


              <div className={`default-box ${(pageStepCounter == 1 || pageStepCounter == 2) ? 'arrow-box' : 'color-box'}`} id="onboarding-box">
                <span style={{ fontSize: '16px', fontWeight: '400', color: '#cfad56' }}>Onboarding</span>
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155', borderColor: 'transparent' } }}
                    icon={
                      <>
                        <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                          <div className='rightSideDiv dstDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                          <div className='rightSideDiv srcDiv'></div>
                        </ArcherElement>
                        <img
                          src={pageStepCounter > 1 ? step_complete_img : (pageStepCounter == 1 ? step_in_progress_img : step_default_img)}
                          style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}
                          className='infoImageIcon'></img>
                      </>
                    }>Step 1</StepLabel>

                </Step>
                <Step>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={
                      <>
                        <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                          <div className='rightSideDiv dstDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                          <div className='rightSideDiv srcDiv'></div>
                        </ArcherElement>
                        <img src={pageStepCounter > 2 ? step_complete_img : (pageStepCounter == 2 ? step_in_progress_img : step_default_img)}
                          style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>
                      </>
                    }>Step 2</StepLabel>
                </Step>
              </div>
              <div className='default-box'>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>

              <div className='default-box color-box info-box' >
                Starting workspace creation
              </div>
              <div className='default-box'>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className={`default-box ${(pageStepCounter == 4) ? 'arrow-box' : 'color-box'}`} id="provision-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src={(pageStepCounter == 5) ? step_complete_img : (pageStepCounter == 4 ? step_in_progress_img : step_default_img)} style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img></>}>Provision tenant </StepLabel>
                </Step>
              </div>
              <div className='default-box'>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className='default-box color-box info-box' >
                Workspace creation ended
              </div>
              <div className='default-box' style={{ height: '175px' }}>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className={`default-box ${(pageStepCounter >= 5) ? 'arrow-box' : 'color-box'}`} id="home-box">
                <Step sx={{ color: 'green' }} index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src="/home.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img></>} >Product Home  </StepLabel>
                </Step>
              </div>
            </Stepper>
          </Paper>
        </Grid>

      </Grid>
    </ArcherContainer>

  )
}

export default workFlowStepper