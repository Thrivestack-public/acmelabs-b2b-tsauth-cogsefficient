import React from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import { textConstants } from "../../../textConstants";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function workFlowHeadingFinal() {

    const { userEmail } = useOnboardingFormData();

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '1px' }}>
            {/* Top Notification */}
            <div style={{
                backgroundColor: '#D0F3E0',
                padding: '5px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <span style={{ fontSize: '35px', color: '#333', fontWeight: 'bold', paddingLeft: '2vw' }}>🎉</span>
                <span style={{ marginLeft: '20px', color: '#333', fontSize: '17px' }}>
                    <strong>Congratulations!</strong> Self-serve integration is complete.
                </span>
            </div>

            {/* Section 1: New User Signup Emails */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ color: '#333333', fontSize: '20px', marginBottom: '10px' }}>New user signup emails have been sent</h2>

                <div style={{ marginLeft: '20px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <CheckCircleIcon sx={{ color: 'green', fontSize: '18px' }} />
                        <span style={{ marginLeft: '10px', fontSize: '14px', color: '#333' }}>
                            To signed-up user {userEmail}.
                        </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckCircleIcon sx={{ color: 'green', fontSize: '18px' }} />
                        <span style={{ marginLeft: '10px', fontSize: '14px', color: '#333' }}>
                            Acme's GTM team {userEmail}.
                        </span>
                    </div>
                </div>
            </div>

            {/* Section 2: Checkout Data Available */}
            <div style={{ marginBottom: '20px' }}>
                <div style={{ color: '#0A58CA', fontSize: '16px', fontWeight: 'bold', marginBottom: '1px'}}>NEXT STEPS</div>
                <h2 style={{ color: '#333333', fontSize: '20px', marginBottom: '4px', marginTop: '4px' }}>
                    Checkout data available for Analytics and Drive on Thrivestack
                </h2>

                <ol style={{ marginLeft: '0px', marginTop: '1px', fontSize: '14px', color: '#333' }}>
                    <li>Sign up or log in with your sample app ID on Thrivestack</li>
                    <li>Click demo or In the top Nav, choose product Acme</li>
                    <li>Checkout data available under Analytics and Drive</li>
                </ol>
            </div>

            {/* Sign up button */}
            <button style={{
                backgroundColor: '#1238CE',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                marginBottom: '5vh'
            }}
            onClick={() => window.open('https://app.thrivestack.ai', '_blank')}
            >
                Sign up
            </button><br />

            <Typography
                variant="p"
                fontWeight={550}
                paddingBottom={"4vh"}
                paddingTop={"0vh"}
                fontSize={"20px"}
            >
                {textConstants.WORKFLOW_PAGE_DESC}
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="space-between" paddingBottom="0vh" marginBottom="0vh">
                <Typography fontSize={"14px"}>
                    {`( Template: `}
                    <a 
                        href="https://docs.app.thrivestack.ai/getting-started/self-serve/integrate/#22-template-2-cogs-efficient-b2b-saas"
                        target="_blank" 
                    >
                        COGS Efficient
                    </a>
                    {` )`}
                </Typography>

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        textTransform: 'none',
                        backgroundColor: '#343A40',
                        marginLeft: '10px',
                    }}
                    onClick={() => window.open('https://www.thrivestack.ai/learn', '_blank')}
                >
                    Learn
                </Button>
            </Box>
            <div className='card-subHeader' style={{ marginTop: '20px' }}>{textConstants.CONCLUSION_PAGE_VERIFY_DESC_TWO}{` `}<a href="https://github.com/Thrivestack-public/acmelabs-b2b-tsauth-cogsefficient" target='_blank'>Github repo</a>{``}</div> <br />
        </div>
    )
}

export default workFlowHeadingFinal;