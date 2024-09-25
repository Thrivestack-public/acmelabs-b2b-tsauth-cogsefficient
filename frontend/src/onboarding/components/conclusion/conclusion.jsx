import React, { useState, useEffect } from 'react';
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import './conclusion.css';
import { Box, Card, Grid, Button } from '@mui/material';
import { ArcherContainer, ArcherElement } from "react-archer";
import { textConstants } from '../../../textConstants';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useHistory } from 'react-router-dom';
function conclusion() {

    const { userEmail } = useOnboardingFormData();
    const { width, height } = useWindowSize();
    const history = useHistory();
    const handleSignUp = () => {
        history.push('/signUp');
    };
    const styles = {
        button: {
            marginTop: '10px',
            padding: '10px 20px',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
    }

    const [showGratification, setShowGratification] = useState(true);

    useEffect(() => {
        // Set a timeout to change showGratification to false after 5 seconds
        const timer = setTimeout(() => {
            setShowGratification(false);
        }, 5000);

        // Cleanup the timer if the component unmounts before the timer completes
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Function to handle click anywhere on the UI
        const handleClick = () => {
            setShowGratification(false);
        };

        // Add event listener for clicks
        document.addEventListener('click', handleClick);

        // Cleanup the event listener on component unmount
        return () => document.removeEventListener('click', handleClick);
    }, []);

    return (
        <div container className='conclusion-heading'>

            <Box className='flex cardBg' style={{ paddingTop: '0vh !important' }}>
                <div
                    style={{
                        backgroundColor: '#dae6f5',
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '17px',
                        textAlign: 'center',
                        marginBottom: '10px',
                    }}
                >
                    {textConstants.WORKFLOW_PAGE_BANNER_RIGHT}
                </div>
                {showGratification && (
                    <Confetti id='confetti-test' style={{ marginLeft: '45%' }} width={width * 0.55} />
                )}

                <div className='card-header' style={{ fontSize: '5vh' }}>Congratulations!</div> <br />
                <div className='card-subHeader'>{textConstants.CONCLUSION_PAGE_VERIFY_DESC}</div> <br />
                <div className='card-subHeader' style={{ marginBottom: '50px' }}>{textConstants.CONCLUSION_PAGE_VERIFY_DESC_TWO}{` `}<a href="https://github.com/Thrivestack-public/acmelabs-b2b-tsauth-cogsefficient" target='_blank'>Github repo</a>{``}</div> <br />

                
            </Box>
            <div className='div-font' style={{ paddingLeft: '6%' }}>

                <span className='conclusion-li-heading'>{textConstants.CONCLUSION_PAGE_VERIFY_INFO}:</span>
                <ol type='number' style={{ paddingInlineStart: '15px', fontSize: "16px" }}>
                    <li>{textConstants.CONCLUSION_PAGE_VERIFY_INFO_STEP_ONE} <span style={{ fontWeight: '500', fontSize: "16px" }}>{userEmail}</span>. <span style={{ fontWeight: '500', fontSize: "16px", color: 'blue' }}>Learn more </span>how to customize it.</li>
                    <li>{textConstants.CONCLUSION_PAGE_VERIFY_INFO_STEP_TWO} <span style={{ fontWeight: '500', fontSize: "16px" }}>{userEmail}</span>. <span style={{ fontWeight: '500', fontSize: "16px", color: 'blue' }}> Learn more </span>  on how to configure it.</li>
                </ol>
                <Card style={{ paddingLeft: '28px', paddingBottom: '2vh', marginTop: '6vh' }}>
                    <Grid container spacing={2} columns={12} >
                        <Grid item md={6}>
                            <p style={{ fontWeight: '500', fontSize: 'x-large' }}>{textConstants.CONCLUSION_PAGE_CARD_TEXT}</p>
                            <small style={{ color: '#64748B', fontSize: 'small' }}>Here’s how you can do it</small>
                            <ol type='number' style={{ paddingInlineStart: '15px' }}>
                                <li>{textConstants.CONCLUSION_PAGE_CARD_TEXT_ONE}</li>
                                <li>{textConstants.CONCLUSION_PAGE_CARD_TEXT_TWO}</li>
                                <li>{textConstants.CONCLUSION_PAGE_CARD_TEXT_THREE}</li>
                            </ol>

                        </Grid>
                        <Grid item md={6}>
                            <img src="/bg.png" alt="Image 2" height="150px" weight="150px" />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ width: '50%', marginLeft: '20px', marginTop: '30px' }}
                                onClick={() => window.open('https://app.thrivestack.ai', '_blank')}
                            >
                                SignUp
                            </Button>

                        </Grid>
                    </Grid>
                </Card>
            </div>

        </div>
    )
}

export default conclusion