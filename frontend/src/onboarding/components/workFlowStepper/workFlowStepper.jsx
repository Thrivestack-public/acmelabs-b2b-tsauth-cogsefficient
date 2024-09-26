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

  if (workflowRuntimeId && workflowRuntimeId !== "") {
    localStorage.setItem("workflowRuntimeId", workflowRuntimeId)
  }

  const { pageStepCounter, stepCompleted, setCurrentPage, setPageStepCounter, setStepCompleted, setUserEmail } = useOnboardingFormData();
  if (isFinalPage) {
    setCurrentPage(3);
    setStepCompleted(11);
    setPageStepCounter(6);
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
      label: 'Authenticate User',
      description: ``,
      pStep: 0
    },
    {
      label: 'Enrich Users and Accounts',
      description: '',
      pStep: 1
    },
    {
      label: 'Prevent Abuse',
      description: ``,
      pStep: 2
    },
    {
      label: 'Check Waitlist',
      description: ``,
      pStep: 3
    },
    {
      label: 'Initiate Onboarding',
      description: '',
      pStep: 4
    },
    {
      label: 'Apply Pricing Plan',
      description: '',
      pStep: 5
    },
    {
      label: 'Initiate Create/Join tenant',
      subLabel: '',
      description: '',
      pStep: 5
    },
    {
      label: 'Acknowledge Tenant',
      subLabel: 'Provision',
      description: '',
      pStep: 5
    },
    {
      label: 'Store Leads',
      subLabel: '(Built in CRM + Bring Your Own CRM)',
      description: '',
      pStep: 5
    },


  ]
  var rStepIndex = 0;
  var lStepIndex = steps.length - 1;

  // labels of arrow
  const viewSharedData = (updateJsonData, leftDistance, activeOnStep, label) => (
    <div
      className={stepCompleted < activeOnStep ? 'disabled' : ''}
      style={{
        color: "blue",
        fontSize: "13px",
        position: "relative",
        top: '30%',
        left: `${leftDistance}%`,
        textDecoration: 'underline',
        textAlign: "center",
        width: "9em",
        cursor: stepCompleted < activeOnStep ? 'not-allowed' : 'pointer',
        backgroundColor: '#F8FAFC',
        backgroundSize: 'auto 100%',
        borderRadius: '8px',
      }}
      onClick={stepCompleted < activeOnStep ? null : updateJsonData}
    >
      {label}
    </div>
  );

  const acknowledgeData = (
    <div
      style={{
        color: "black",
        fontSize: "12px",
        marginTop: "5px",
        backgroundColor: '#F8FAFC',
        padding: '0px 5px 0px 0px',
        marginLeft: '30px',
      }}
    >
      Acknowledge
    </div>
  );

  const redirectToTS = (
    <div
      style={{
        color: "black",
        fontSize: "12px",
        marginTop: "5px",
        marginLeft: '50px',
        backgroundColor: '#F8FAFC',
      }}
    >
      Redirect
    </div>
  );

  // arrows
  let leftToRightArrowRelation = {
    targetId: "id_of_target",
    sourceId: "id_of_source",
    targetAnchor: "left",
    sourceAnchor: "right",
    style: {
      lineStyle: 'straight',
      marginLeft: "25px",
      marginRight: "25px",
    },
    label: null,
    className: 'arrow-class',
  }
  let rightToLeftArrowRelation = {
    ...leftToRightArrowRelation, targetAnchor: "right", sourceAnchor: "left",
    style: {
      lineStyle: 'straight',
      marginLeft: "2px",
    },
  };

  const leftToRightArrowRelations = {

    'srcLeftStep1': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep1',
      label: viewSharedData(getEnrichedData, 5, 3, "View Enriched Data")
    },

    'srcLeftStep24': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep2',
      label: viewSharedData(() => getAuthenticationData("firstAuthenticationData"), 5, 3, "View Authenticated Data")
    },
    'srcLeftStep6': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep8',
      label: viewSharedData(getTenantData, 2, 5, "Tenant Data"),
    },
    'srcLeftStep11': {
      ...leftToRightArrowRelation,
      targetId: 'dstRightStep10',
      label: <div>{viewSharedData(() => getRedirectData("lastAuthenticationData"), 65, 10, "End user data")}</div>
    }
  }

  const rightToLeftArrowRelations = {
    'srcRightStep3': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep34',
      style: {
        lineStyle: 'straight',
        marginLeft: "2px",
        strokeDasharray: "5,5"
      },
    },
    'srcRightStep5': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep44',
      style: {
        lineStyle: 'straight',
        marginLeft: "2px",
        strokeDasharray: "5,5"
      },
    },
    'srcRightStep6': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep54',
      label: <div>{redirectToTS}</div>,
      style: {
        lineStyle: 'straight',
      },
    },
    'srcRightStep7': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep64',
      style: {
        lineStyle: 'straight',
        marginLeft: "2px",
        strokeDasharray: "5,5"
      },
    },
    'srcRightStep9': {
      ...rightToLeftArrowRelation,
      targetId: 'dstLeftStep7',
      label: <div>{acknowledgeData}</div>,
    },
  };

  const [activeStep, setActiveStep] = useState(0);

  const step_default_img = "/steps_default.png";
  const step_in_progress_img = "/step_in_progress.png";
  const step_complete_img = "/step_complete.png";


  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);
  const closePrevModel = () => setIsPrevModalOpen(false);
  const [modalInfo, setModalInfo] = useState('')
  const [modalDesc, setModalDesc] = useState('')
  const [modalLink, setModalLink] = useState('')


  useEffect(() => {
    const fetchData = async () => {
      if (isFirstPage) {
        if (authOTP) {
          const authApiResponse = await fetchValidateAuth(authOTP);
          const authApiResponseJson = authApiResponse.token ? jwtDecode(authApiResponse.token) : { "error": "No token found" };
          localStorage.setItem("firstAuthenticationData", JSON.stringify(authApiResponseJson));
        }
      }

      if (isFinalPage) {
        if (authOTP) {
          const authApiResponse = await fetchValidateAuth(authOTP);
          const authApiResponseJson = authApiResponse.token ? jwtDecode(authApiResponse.token) : { "error": "No token found" };
          const emailId = authApiResponseJson.emailId;
          setUserEmail(emailId);
          localStorage.setItem("lastAuthenticationData", JSON.stringify(authApiResponseJson));
        }
      }
      const tenantApiResponse = await fetchTenantData(workflowRuntimeId, 'tenant_creation');
      localStorage.setItem("tenantData", JSON.stringify(tenantApiResponse));
    };

    fetchData();
  }, []);


  useEffect(async () => {

  }, []);

  async function getTenantData() {
    setModalDesc('SHARED_DATA_MODAL_DESC_TENANT')
    setModalInfo('SHARED_DATA_MODAL_INFO_TENANT');
    setIsModalOpen(true);
    setModalLink('TENANT_DOCS_LINK')
    const apiResponse = JSON.parse(localStorage.getItem("tenantData"));

    setModalDataArr([{
      JsonData: apiResponse,
      JsonLabel: "Tenant Data"
    }])

  }

  // validateAuth
  async function getAuthenticationData(storageKey) {
    try {
      console.log("getAuthenticated_invoked storageKey :", storageKey)
      setModalInfo('SHARED_DATA_MODAL_INFO_ONBOARDING_REDIRECT')
      setIsModalOpen(true);
      setModalDesc('SHARED_DATA_MODAL_DESC_ONBOARDING_REDIRECT')
      setModalLink('ONBOARDING_DOCS_LINK')
      let apiResponse = {};
      const ls = localStorage.getItem(storageKey)
      console.log("LocalStorage Auth DATA: ", ls)
      if (ls) {
        apiResponse = JSON.parse(ls)
      }

      setModalDataArr([{
        JsonData: apiResponse,
        JsonLabel: "Authenticated User Data"
      }])

    } catch (error) {
      console.log("error in getAuthenticationData", error)
      setModalDataArr([{
        JsonData: {},
        JsonLabel: "Authenticated User Data"
      }])
    }
  }



  async function getRedirectData(storageKey) {
    // setModalJsonData(baseJsonData)
    setModalInfo('SHARED_DATA_MODAL_INFO_REDIRECT')
    setIsModalOpen(true);
    setModalDesc('SHARED_DATA_MODAL_DESC_REDIRECT')
    setModalLink('REDIRECT_DOCS_LINK')
    const apiResponse = JSON.parse(localStorage.getItem(storageKey));

    setModalDataArr([{
      JsonData: apiResponse,
      JsonLabel: "Authenticated User Data"
    }])
  }

  const [userData, setUserData] = useState()
  const [companyData, setCompanyData] = useState({})

  const [] = useState()


  async function getEnrichedData() {
    setIsModalOpen(true);
    setModalInfo('MODAL_DEFAULT_INFO')
    setModalDesc('SHARED_DATA_MODAL_DESC')
    setModalLink('ENRICHMENT_DOCS_LINK')

    setModalDataArr([{
      JsonData: userData,
      JsonLabel: "User Enrichment Data"
    },
    {
      JsonData: companyData,
      JsonLabel: "Company Enrichment Data"
    }])
  }

  useEffect(() => {
    async function fetchAndSaveEnrichmentData() {
      try {
        const data = await getEnrichmentData();
        if (data) {
          const jsonData = JSON.parse(data);
          if (jsonData) {
            if (jsonData.user_enrichment_data) {
              setUserData(JSON.parse(jsonData.user_enrichment_data));
            }
            if (jsonData.company_enrichment_data) {
              setCompanyData(JSON.parse(jsonData.company_enrichment_data));
            }
          }
        }
      } catch (error) {
        console.error("Error processing enrichment data", error);
      }
    }
    fetchAndSaveEnrichmentData();
  }, []);





  const [modalUser, setModalUser] = useState('');

  const openModal = (user) => {
    setModalUser(user);
    setIsPrevModalOpen(true);
  };


  useEffect(() => {
    const currentStepElement = document.getElementById(`step-${pageStepCounter}`);
    if (currentStepElement && pageStepCounter != 1 && pageStepCounter != 6) {
      currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [pageStepCounter]);

  return (
    <ArcherContainer strokeColor="#ccc" strokeWidth={1.5} svgContainerStyle={{ zIndex: 1, marginLeft: "7px" }}>
      <JsonViewerModal isOpen={isModalOpen} onClose={closeModal} jsonData={modalDataArr} modalInfo={modalInfo} modalDesc={modalDesc} modalLink={modalLink} />

      <Grid container columns={{ md: 12 }} spacing={2} sx={{ marginTop: '5vh', paddingLeft: '1.5vw' }}>

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
                      <Step key={step.label}
                        id={`step-${step.pStep}`}
                        sx={{ color: 'green' }}
                        index={step.pStep}
                        completed={index < stepCompleted}
                        active={index === activeStep}>
                        <StepLabel
                          StepIconProps={{
                            classes: {
                              root: 'StepperIcon',
                              completed: (step.pStep < pageStepCounter + 3) ? 'StepperIconCompleted' : 'StepperIconInProgress',
                            }
                          }}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            '& .MuiStepLabel-label': {
                              fontSize: '14px !important',
                              fontWeight: 'bold !important',
                              color: '#000000 !important'
                            }
                          }}

                        >
                          {step.label}

                          <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '2px' }} />

                          {/* Branch 4 the Onboarding step */}
                          {step.label === "Initiate Onboarding" ? (
                            <div style={{ position: 'relative' }}>
                              {/* First Branch */}
                              <div style={{ marginLeft: '12px', marginTop: '4px', borderLeft: '1px solid #00000040', height: '0.5vh', position: 'relative' }}></div>
                              <StepLabel
                                StepIconProps={{
                                  classes: {
                                    root: 'StepperIcon',
                                    completed: (pageStepCounter === 1) ? 'StepperIconInProgress' : 'StepperIconCompleted',
                                  }
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span
                                    className="stepper"
                                    style={{ color: '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                                  >
                                    Redirect Onboarding
                                  </span>
                                  <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '8px' }} />
                                  <ArcherElement id={`srcLeftStep2${index}`} relations={leftToRightArrowRelations[`srcLeftStep2${index}`] ? [leftToRightArrowRelations[`srcLeftStep2${index}`]] : []}>
                                    <div className='leftSideDiv srcDiv'></div>
                                  </ArcherElement>
                                  <ArcherElement id={`dstLeftStep2${index}`}>
                                    <div className='leftSideDiv dstDiv'></div>
                                  </ArcherElement>
                                </div>
                              </StepLabel>

                              {/* Second Branch */}
                              <div style={{ marginLeft: '12px', borderLeft: '1px solid #00000040', height: '0.8vh', position: 'relative' }}></div>
                              <StepLabel
                                StepIconProps={{
                                  classes: {
                                    root: 'StepperIcon',
                                    completed: (pageStepCounter === 1) ? 'StepperIconInProgress' : 'StepperIconCompleted',
                                  }
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span
                                    className="stepper"
                                    style={{ color: '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                                  >
                                    Receive Telemetry
                                  </span>
                                  <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '8px' }} />
                                  <ArcherElement id={`srcLeftStep3${index}`} relations={leftToRightArrowRelations[`srcLeftStep3${index}`] ? [leftToRightArrowRelations[`srcLeftStep3${index}`]] : []}>
                                    <div className='leftSideDiv srcDiv'></div>
                                  </ArcherElement>
                                  <ArcherElement id={`dstLeftStep3${index}`}>
                                    <div className='leftSideDiv dstDiv'></div>
                                  </ArcherElement>
                                </div>
                              </StepLabel>

                              {/* Third Branch */}
                              <div style={{ marginLeft: '12px', borderLeft: '1px solid #00000040', height: '5.5vh', position: 'relative' }}></div>
                              <StepLabel
                                StepIconProps={{
                                  classes: {
                                    root: 'StepperIcon',
                                    completed: (pageStepCounter <= 2) ? 'StepperIconInProgress' : 'StepperIconCompleted',
                                  }
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span
                                    className="stepper"
                                    style={{ color: '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                                  >
                                    Receive Telemetry
                                  </span>
                                  <img src="/Vector.png" className="infoImageIcon" style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                                  <ArcherElement id={`srcLeftStep4${index}`} relations={leftToRightArrowRelations[`srcLeftStep4${index}`] ? [leftToRightArrowRelations[`srcLeftStep4${index}`]] : []}>
                                    <div className='leftSideDiv srcDiv'></div>
                                  </ArcherElement>
                                  <ArcherElement id={`dstLeftStep4${index}`}>
                                    <div className='leftSideDiv dstDiv'></div>
                                  </ArcherElement>
                                </div>
                              </StepLabel>


                              {/* Forth Branch */}
                              <div style={{ marginLeft: '12px', borderLeft: '1px solid #00000040', height: '1.5vh', position: 'relative' }}></div>
                              <StepLabel
                                StepIconProps={{
                                  classes: {
                                    root: 'StepperIcon',
                                    completed: (pageStepCounter <= 3) ? 'StepperIconInProgress' : 'StepperIconCompleted',
                                  }
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span
                                    className="stepper"
                                    style={{ color: '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                                  >
                                    Back to TS
                                  </span>
                                  <img src="/Vector.png" className="infoImageIcon" style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                                  <ArcherElement id={`srcLeftStep5${index}`} relations={leftToRightArrowRelations[`srcLeftStep5${index}`] ? [leftToRightArrowRelations[`srcLeftStep5${index}`]] : []}>
                                    <div className='leftSideDiv srcDiv'></div>
                                  </ArcherElement>
                                  <ArcherElement id={`dstLeftStep5${index}`}>
                                    <div className='leftSideDiv dstDiv'></div>
                                  </ArcherElement>
                                </div>
                              </StepLabel>


                              {/* Fifth Branch */}
                              <div style={{ marginLeft: '12px', borderLeft: '1px solid #00000040', height: '2.7vh', position: 'relative' }}></div>
                              <StepLabel
                                StepIconProps={{
                                  classes: {
                                    root: 'StepperIcon',
                                    completed: (pageStepCounter <= 3) ? 'StepperIconInProgress' : 'StepperIconCompleted',
                                  }
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <span
                                    className="stepper"
                                    style={{ color: '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                                  >
                                    Receive Telemetry
                                  </span>
                                  <img src="/Vector.png" className="infoImageIcon" style={{ marginLeft: '4px', verticalAlign: 'top' }} />
                                  <ArcherElement id={`srcLeftStep6${index}`} relations={leftToRightArrowRelations[`srcLeftStep6${index}`] ? [leftToRightArrowRelations[`srcLeftStep6${index}`]] : []}>
                                    <div className='leftSideDiv srcDiv'></div>
                                  </ArcherElement>
                                  <ArcherElement id={`dstLeftStep6${index}`}>
                                    <div className='leftSideDiv dstDiv'></div>
                                  </ArcherElement>
                                </div>
                              </StepLabel>


                            </div>
                          ) : (
                            <>
                              <ArcherElement id={`srcLeftStep${index}`} relations={leftToRightArrowRelations[`srcLeftStep${index}`] ? [leftToRightArrowRelations[`srcLeftStep${index}`]] : []}>
                                <div className='leftSideDiv srcDiv'></div>
                              </ArcherElement>
                              <ArcherElement id={`dstLeftStep${index}`}>
                                <div className='leftSideDiv dstDiv'></div>
                              </ArcherElement><br></br>
                            </>
                          )}



                          <div className="subLabel" style={{ fontSize: '14px', marginTop: '4px' }}>
                            {step.subLabel}
                          </div>
                        </StepLabel>
                      </Step>
                      {index == 4 ? (
                        <div style={{ height: '6.5vh' }}>
                          <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                        </div>
                      ) : index == 6 ? (<div style={{ height: '4vh' }}>
                        <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                      </div>) : (
                        <div style={{ height: '4vh' }}>
                          <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
                        </div>
                      )}
                    </>
                  ))}



                  <div style={{ height: '50px', position: 'relative', display: 'inline-block' }}>
                    <StepConnector classes={{ line: 'full-lines' }} style={{ height: '30vh' }} />
                  </div>


                  <div style={{ position: 'relative' }}>
                    <Step completed={isFinalPage} index={0}>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            root: 'StepperIcon',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '14px !important' }}>
                            Notify
                          </span>
                        </div>

                        <div style={{ marginLeft: '12px', marginTop: '4px', borderLeft: '1px solid #00000040', height: '17px', position: 'relative' }}></div>

                        <StepLabel
                          StepIconProps={{
                            classes: {
                              root: 'StepperIcon',
                              completed: 'StepperIconCompleted',
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0px' }}> {/* Adjusted margin */}
                            <span
                              className="stepper-link"
                              style={{ color: isFinalPage ? 'blue' : '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                              onClick={() => { openModal('notify') }}
                            >
                              Notify end users
                            </span>
                            <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '8px' }} />
                            <ArcherElement id={`srcLeftStep${++lStepIndex}`} relations={leftToRightArrowRelations[`srcLeftStep${lStepIndex}`] ? [leftToRightArrowRelations[`srcLeftStep${lStepIndex}`]] : []}>
                              <div className='leftSideDiv srcDiv'></div>
                            </ArcherElement>
                            <ArcherElement id={`dstLeftStep${lStepIndex}`}>
                              <div className='leftSideDiv dstDiv'></div>
                            </ArcherElement>
                          </div>
                        </StepLabel>

                        <div style={{ marginLeft: '12px', borderLeft: '1px solid #00000040', height: '17px', position: 'relative' }}></div>


                        <StepLabel
                          StepIconProps={{
                            classes: {
                              root: 'StepperIcon',
                              completed: 'StepperIconCompleted',
                            }
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span
                              className="stepper-link"
                              style={{ color: isFinalPage ? 'blue' : '#000000', fontWeight: 400, fontSize: '0.875rem' }}
                              onClick={() => { openModal('gtm') }}
                            >
                              Notify Acme GTM Team
                            </span>
                            <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '8px' }} />
                            <ArcherElement id={`srcLeftStep${++lStepIndex}`} relations={leftToRightArrowRelations[`srcLeftStep${lStepIndex}`] ? [leftToRightArrowRelations[`srcLeftStep${lStepIndex}`]] : []}>
                              <div className='leftSideDiv srcDiv'></div>
                            </ArcherElement>
                            <ArcherElement id={`dstLeftStep${lStepIndex}`}>
                              <div className='leftSideDiv dstDiv'></div>
                            </ArcherElement>
                          </div>
                        </StepLabel>

                        <PreviewModal isOpen={isPrevModalOpen && modalUser === 'notify'} onClose={closePrevModel} user="notify" />
                        <PreviewModal isOpen={isPrevModalOpen && modalUser === 'gtm'} onClose={closePrevModel} user="gtm" />

                      </StepLabel>
                    </Step>






                    <div style={{ height: '11vh', position: 'relative', display: 'inline-block' }}>
                      <StepConnector classes={{ root: 'line-parent-3', line: 'full-lines' }} />
                    </div>





                    <Step completed={isFinalPage} index={0} id='step-6'>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            root: 'StepperIcon',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                        sx={{
                          '& .MuiStepLabel-label': {
                            fontSize: '14px !important',
                            fontWeight: 'bold !important',
                            color: '#000000 !important'
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


                    <div style={{ height: '30px', position: 'relative', display: 'inline-block' }}>
                      <StepConnector classes={{ line: 'full-lines' }} style={{ height: '4vh' }} />
                    </div>


                    <Step completed={isFinalPage} index={0}>
                      <StepLabel
                        StepIconProps={{
                          classes: {
                            root: 'StepperIcon',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ color: 'black', fontWeight: 500, fontSize: '1rem' }}>
                            Features Unlocked
                          </span>
                        </div>

                        <div style={{ marginLeft: '12px', marginTop: '4px', borderLeft: '1px solid #00000040', height: '17px', position: 'relative' }}></div>

                        <StepLabel
                          icon={
                            <img src={isFinalPage ? '/unlock.png' : '/lock.png'} style={{ marginLeft: '7px', fontSize: 'small', height: '1vw', padding: '0% 1%', marginTop: '-1%' }}></img>
                          }
                        >
                          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0px' }}>
                            <span className="stepper-link" style={{ color: isFinalPage ? 'blue' : '#000000', fontWeight: 400, fontSize: '0.875rem' }}>
                              Go to PLG CRM

                            </span>
                            <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '8px' }} />
                          </div>
                        </StepLabel>

                        <div style={{ marginLeft: '12px', borderLeft: '1px solid #00000040', height: '17px', position: 'relative' }}></div>


                        <StepLabel
                          icon={
                            <img src={isFinalPage ? '/unlock.png' : '/lock.png'} style={{ marginLeft: '7px', fontSize: 'small', height: '1vw', padding: '0% 1%', marginTop: '-1%' }}></img>
                          }
                        >
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className="stepper-link" style={{ color: isFinalPage ? 'blue' : '#000000', fontWeight: 400, fontSize: '0.875rem' }}>
                              Go to Analytics
                            </span>
                            <img src="/Vector.png" className='infoImageIcon' style={{ marginLeft: '8px' }} />
                          </div>
                        </StepLabel>

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
              fontSize={["12px", "14px", "14px"]}> <img src="/acme.png" style={{ height: '1.2vw', padding: '0% 1%', marginTop: '-1%' }}></img></Typography>
            <Typography
              variant="p"
              fontWeight={500}
              justifyContent={'center'} display={"flex"}
              fontSize={["8px", "10px", "12px"]}
            >
              {textConstants.WORKFLOW_STEPPER_SUBTITLE_2}
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical" style={{ paddingBottom: '27px', marginTop: '1vw' }} sx={{ color: '#334155' }}>
              <div className={'default-box'}>
                <ArcherElement id={`dstRightStep${rStepIndex}`}>
                  <div className='rightSideDiv dstDiv'></div>
                </ArcherElement>
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '14px', fontWeight: 'bold', color: '#000000', marginBottom: '0vw' } }}
                    icon={<img src="/account_circle.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>Authenticated End User</StepLabel>
                </Step>
                <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                  <div className='rightSideDiv srcDiv'></div>
                </ArcherElement>
              </div>

              <div className='default-box' style={{ height: '1.5vh' }}>
                <StepConnector classes={{ root: 'line-parent-3', line: 'full-lines' }} />
              </div>


              <div className={`default-box ${(pageStepCounter == 0) ? 'arrow-box' : 'color-box'}`} id="enrichment-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '14px', fontWeight: 'bold', color: '#000000' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src={(pageStepCounter > 0) ? step_complete_img : (pageStepCounter == 0 ? step_in_progress_img : step_default_img)} style={{ height: '1.4vw', padding: '0% 1%', marginTop: '-1%' }}></img>
                    </>}
                  >Recieve Enrichment Data</StepLabel>
                </Step>
              </div>


              <div className='default-box' style={{ height: '18vh' }}>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>


              <div className={`default-box ${(pageStepCounter == 1 || pageStepCounter == 2) ? 'arrow-box' : 'color-box'}`} style={{ paddingTop: '1vh', }} id="onboarding-box">
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#cfad56', marginBottom: '1.5vh' }}>Onboarding</div>
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#000000', borderColor: 'transparent', fontWeight: '600' } }}
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
                          style={{ height: '1.2vw', padding: '0% 1%', marginTop: '-1%' }}
                          className='infoImageIcon'></img>
                      </>
                    }>

                    Step 1
                  </StepLabel>

                  {/* <div style={{ marginLeft: '12px', marginTop: '4px', borderLeft: '1px solid #00000040', height: '17px', position: 'relative' }}></div> */}
                  <div style={{ paddingLeft: '20px', marginTop: '0px' }}>
                    <Step>
                      <StepConnector classes={{ line: 'full-lines-2' }} style={{ height: '0.8vh' }} />
                      <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#000000', fontSize: '11px' } }}
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
                              style={{ height: '0.8vw', padding: '0% 1%', marginTop: '-1%' }}
                              className='infoImageIcon'></img>
                          </>
                        }>
                        Send Telemetry
                      </StepLabel>
                    </Step>

                  </div>

                </Step>
                <StepConnector classes={{ line: 'full-lines' }} style={{ height: '1.6vh' }} />
                <Step>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#000000', fontWeight: '600' } }}
                    icon={
                      <>
                        <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                          <div className='rightSideDiv dstDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                          <div className='rightSideDiv srcDiv'></div>
                        </ArcherElement>
                        <img
                          src={pageStepCounter > 2 ? step_complete_img : (pageStepCounter == 2 ? step_in_progress_img : step_default_img)}
                          style={{ height: '1.2vw', padding: '0% 1%', marginTop: '-1%' }}
                          className='infoImageIcon'></img>
                      </>
                    }>Step 2
                  </StepLabel>

                  <div style={{ paddingLeft: '20px', marginTop: '-2px' }}>
                    <Step>
                      <StepConnector classes={{ line: 'full-lines' }} style={{ height: '0.8vh' }} />

                      <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#000000', fontSize: '11px' } }}
                        icon={
                          <>
                            <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                              <div className='rightSideDiv dstDiv'></div>
                            </ArcherElement>
                            <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                              <div className='rightSideDiv srcDiv'></div>
                            </ArcherElement>
                            <img
                              src={pageStepCounter > 2 ? step_complete_img : (pageStepCounter == 2 ? step_in_progress_img : step_default_img)}
                              style={{ height: '0.8vw', padding: '0% 1%', marginTop: '-1%' }}
                              className='infoImageIcon'></img>
                          </>
                        }>
                        Send Telemetry
                      </StepLabel>
                    </Step>

                  </div>
                </Step>
                <StepConnector classes={{ line: 'full-lines' }} style={{ height: '1.6vh' }} />
                <Step>
                  <StepLabel
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      '& .MuiStepLabel-label': { color: '#000000', fontWeight: '600', textWrap: false }
                    }}
                    icon={
                      <>
                        <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                          <div className='rightSideDiv dstDiv'></div>
                        </ArcherElement>
                        <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                          <div className='rightSideDiv srcDiv'></div>
                        </ArcherElement>
                        <img
                          src={pageStepCounter > 3 ? step_complete_img : (pageStepCounter == 3 ? step_in_progress_img : step_default_img)}
                          style={{ height: '1.2vw', padding: '0% 1%', marginTop: '-1%' }}
                          className='infoImageIcon'></img>
                      </>
                    }>Onboarding Complete</StepLabel>

                  <div style={{ paddingLeft: '20px', marginTop: '-2px' }}>
                    <Step>
                      <StepConnector classes={{ line: 'full-lines' }} style={{ height: '0.8vh' }} />

                      <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#000000', fontSize: '11px' } }}
                        icon={
                          <>
                            <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                              <div className='rightSideDiv dstDiv'></div>
                            </ArcherElement>
                            <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                              <div className='rightSideDiv srcDiv'></div>
                            </ArcherElement>
                            <img
                              src={pageStepCounter > 3 ? step_complete_img : (pageStepCounter == 3 ? step_in_progress_img : step_default_img)}
                              style={{ height: '0.8vw', padding: '0% 1%', marginTop: '-1%' }}
                              className='infoImageIcon'></img>
                          </>
                        }>
                        Send Telemetry
                      </StepLabel>
                    </Step>

                  </div>
                </Step>
              </div>
              <div className='default-box'>
                <StepConnector classes={{ line: 'full-lines' }} style={{ height: '14.5vh' }} />
              </div>


              <div className={'default-box color-box'} id="provision-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '14px', fontWeight: 'bold', color: '#000000' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>

                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src={(pageStepCounter == 4) ? step_complete_img : (pageStepCounter == 3 ? step_in_progress_img : step_default_img)} style={{ height: '1.2vw', padding: '0% 1%', marginTop: '-1%' }}></img></>}>Start tenant provisioning </StepLabel>
                </Step>
              </div>


              <div className='default-box'>
                <StepConnector classes={{ line: 'full-lines' }} style={{ height: '1.3vh' }} />
              </div>

              <div className={'default-box color-box'} id="provision-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '14px', fontWeight: 'bold', color: '#000000' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src={(pageStepCounter == 4) ? step_complete_img : (pageStepCounter == 3 ? step_in_progress_img : step_default_img)} style={{ height: '1.2vw', padding: '0% 1%', marginTop: '-1%' }}></img></>}>Complete Tenant Provision </StepLabel>
                </Step>
              </div>
              <div className='default-box' style={{ height: '53vh' }}>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className={`default-box ${(pageStepCounter >= 4) ? 'arrow-box' : 'color-box'}`} id="home-box">
                <Step sx={{ color: 'green' }} index={0} id='step-4'>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '14px', fontWeight: 'bold', color: '#000000' } }}
                    icon={<>
                      <ArcherElement id={`dstRightStep${++rStepIndex}`}>
                        <div className='rightSideDiv dstDiv'></div>
                      </ArcherElement>
                      <ArcherElement id={`srcRightStep${rStepIndex}`} relations={rightToLeftArrowRelations[`srcRightStep${rStepIndex}`] ? [rightToLeftArrowRelations[`srcRightStep${rStepIndex}`]] : []}>
                        <div className='rightSideDiv srcDiv'></div>
                      </ArcherElement><img src="/home.png" style={{ height: '1.3vw', padding: '0% 1%', marginTop: '-1%' }}></img></>} >Product Home  </StepLabel>
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