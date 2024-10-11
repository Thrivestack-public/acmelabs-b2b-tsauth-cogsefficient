import React, { useState } from "react";
import { Grid, Box, Typography, LinearProgress, Paper, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import OnboardingPageOne from '../onboardingPageOne/OnboardingPageOne';
import OnboardingPageTwo from '../onboardingPageTwo/OnboardingPageTwo';
import { useOnboardingFormData } from '../onboardingFormDataContext/onboardingFormDataContext'
import WorkFlowHeading from '../workFlowHeading/workFlowHeading';
import WorkFlowStepper from '../workFlowStepper/workFlowStepper';
import Conclusion from '../conclusion/conclusion';
import "./boardingSection.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Navbar from "./Navbar";
import WorkFlowHeadingFinal from '../workFlowHeading/workflowHeadingFinal'
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import zIndex from "@mui/material/styles/zIndex";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  Stop
} from "recharts";

function boardingSectionNew() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const togglePanel = () => {
    setIsCollapsed(prevState => !prevState);
  };

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


  const data = [
    { name: "Jan", value1: 200000, value2: 150000 },
    { name: "Feb", value1: 220000, value2: 170000 },
    { name: "Mar", value1: 180000, value2: 140000 },
    { name: "Apr", value1: 250000, value2: 160000 },
    { name: "May", value1: 230000, value2: 180000 },
    { name: "Jun", value1: 270000, value2: 200000 },
  ];

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', position: 'relative' }}>
      <Navbar page={currentPage} sx={{ zIndex: 500 }} />
      <Grid container spacing={0} sx={{ height: '100%' }}>
        {currentPage !== 3 ?
          (
            <Grid className="leftGrid-body"
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                overflowY: 'auto',
                height: '100%',

              }}>
              {/* MAIN content */}
              <Box
                component="img"
                sx={{
                  width: 140,
                  alignItems: 'center',
                  margin: '0vh 0 5vh 0'
                }}
                alt="ACME LABS."
                src="/acme.png"
              />
              <Typography variant="h4"
                align="center"
                gutterBottom
                sx={{
                  fontWeight: 500,
                  fontSize: '1.5vw !important'
                }}
              >
                Your multi step onboarding
              </Typography>

              {/* Stepper */}
              <Box sx={{ width: '30%', marginTop: 2 }}>
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',  // GAp between sections
                  alignItems: 'center',
                  height: 10,
                }}>
                  {/* First Section */}
                  <LinearProgress
                    variant="determinate"
                    value={currentPage >= 1 ? 100 : 0}
                    sx={{
                      height: 7,
                      borderRadius: '5px',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: currentPage >= 1 ? '#5D2A6D' : '#e0e0e0',
                      },
                      backgroundColor: '#e0e0e0',
                    }}
                  />

                  {/* Second Section */}
                  <LinearProgress
                    variant="determinate"
                    value={currentPage >= 2 ? 100 : 0}
                    sx={{
                      height: 7,
                      borderRadius: '5px',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: currentPage >= 2 ? '#5D2A6D' : '#e0e0e0',
                      },
                      backgroundColor: '#e0e0e0',
                    }}
                  />

                  {/* Third Section */}
                  <LinearProgress
                    variant="determinate"
                    value={currentPage === 3 ? 100 : 0}
                    sx={{
                      height: 7,
                      borderRadius: '5px',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: currentPage === 3 ? '#5D2A6D' : '#e0e0e0',
                      },
                      backgroundColor: '#e0e0e0',
                    }}
                  />
                </Box>
              </Box>

              <Grid
                container
                spacing={2}
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '1px !important',
                  transform: 'scale(0.9)',
                  transformOrigin: 'top',
                }}>
                {currentPage === 1 && <OnboardingPageOne />}
                {currentPage === 2 && <OnboardingPageTwo />}
                {currentPage === 3 && <Conclusion />}
              </Grid>

            </Grid>
          ) : (
// MOCK WEBSITE PART
            <Box
              sx={{
                display: 'flex',
                minHeight: '100vh',
                bgcolor: 'rgba(249, 250, 251, 0.8)',  // Semi-transparent background
                width: '100%',
                backdropFilter: 'blur(10px)',  // Apply the blur effect
              }}
            >
              {/* Sidebar */}
              <Box
                sx={{
                  width: 80,
                  bgcolor: '#F2F3F5',
                  padding: '20px 0',
                  textAlign: 'center',
                  boxShadow: '2px 0px 5px rgba(0,0,0,0.1)',
                  position: 'fixed',
                  height: '100vh',
                  opacity: 0.7
                }}
              >
                <List>
                  <ListItem>
                    <Avatar alt="Acme Labs" src="/favicon-192x192.png" sx={{ width: 40, height: 40, marginBottom: 2 }} />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon sx={{ justifyContent: 'center', marginBottom: '5vh', marginTop: '3vh' }}>
                      <HomeIcon sx={{ color: '#B0B0B0' }} />
                    </ListItemIcon>
                  </ListItem>
                  {[1, 2, 3, 4].map((item) => (
                    <ListItem key={item}>
                      <ListItemIcon sx={{ justifyContent: 'center', marginBottom: '5vh' }}>
                        <PersonIcon sx={{ color: '#B0B0B0' }} />
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ flexGrow: 1, marginLeft: 10, padding: '30px', width: '100%', opacity: 0.5 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      sx={{ padding: 3, borderRadius: '10px', minHeight: 150, backgroundColor: '#FFFFFF', width: '90%', margin: '0 auto' }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#3C3E44' }}>
                        Learn
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Box sx={{ width: '30%', height: 80, bgcolor: '#EDEFF1', borderRadius: '8px' }} />
                        <Box sx={{ width: '30%', height: 80, bgcolor: '#EDEFF1', borderRadius: '8px' }} />
                      </Box>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      sx={{ padding: 3, borderRadius: '10px', backgroundColor: '#FFFFFF', width: '90%', margin: '0 auto' }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#3C3E44' }}>
                        Things to do
                      </Typography>
                      <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        {[
                          { id: '01', count: 6465, avatar: '/path-to-avatar-1' },
                          { id: '02', count: 5665, avatar: '/path-to-avatar-2' },
                          { id: '03', count: 1755, avatar: '/path-to-avatar-3' },
                        ].map((item) => (
                          <Grid item xs={12} key={item.id}>
                            <Grid container alignItems="center">
                              <Grid item xs={1}>
                                <Typography sx={{ fontWeight: 600, color: '#6C6F7D' }}>{item.id}</Typography>
                              </Grid>
                              <Grid item xs={3}>
                                <Typography sx={{ fontWeight: 600, color: '#2D2F36' }}>{item.count}</Typography>
                              </Grid>
                              <Grid item xs={2}>
                                <Avatar alt={`User ${item.id}`} src={item.avatar} />
                              </Grid>
                              <Grid item xs={6}>
                                <Box sx={{ height: '12px', bgcolor: '#EDEFF1', borderRadius: '6px' }} />
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper
                      elevation={3}
                      sx={{
                        padding: 3,
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF',
                        width: '90%',
                        margin: '0 auto'
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#3C3E44' }}>
                        Usage
                      </Typography>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                          <Line
                            type="monotone"
                            dataKey="value1"
                            stroke="#8884d8"
                            strokeWidth={3}
                            fill="url(#colorUv)"
                            fillOpacity={1}
                          />
                          <Line
                            type="monotone"
                            dataKey="value2"
                            stroke="#888888"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>

                </Grid>
              </Box>
            </Box>



          )}

        {/* SIDEBAR PANEL */}
        <Box
          className="rightGrid-body"
          sx={{
            position: 'fixed',
            top: 0,
            right: isCollapsed ? '-20%' : '0',
            width: '40%',
            backgroundColor: '#F8FAFC !important',
            transition: 'right 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            height: '100vh',
            zIndex: 1000,
            paddingLeft: '1vw',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box sx={{ padding: 2, paddingTop: 0, textAlign: 'left', display: 'flex', alignItems: 'center' }}>
            {isCollapsed ? (
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <ExitToAppIcon onClick={togglePanel} sx={{ cursor: 'pointer', transform: 'rotate(180deg)' }} />
                <Typography sx={{ marginLeft: '1vw', cursor: 'pointer', fontSize: '1.2rem' }} onClick={togglePanel}>
                  Expand
                </Typography>
              </div>
            ) : currentPage === 3 ? (
              null
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <ExitToAppIcon onClick={togglePanel} sx={{ cursor: 'pointer' }} />
                <Typography sx={{ marginLeft: '1vw', cursor: 'pointer', fontSize: '1.2rem' }} onClick={togglePanel}>
                  Collapse
                </Typography>
              </div>
            )}
          </Box>



          <Box style={{ margin: '20px', marginTop: '10px' }}>
            {currentPage === 3 ? (
              <WorkFlowHeadingFinal />
            ) : (
              <WorkFlowHeading />
            )}

            <WorkFlowStepper />
          </Box>

        </Box>
      </Grid>

    </Box>
  );
}

boardingSectionNew.propTypes = {};

export default boardingSectionNew;
