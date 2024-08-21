import React, { useState, useEffect } from 'react';
import './conclusion.css';
import { Box, Card, Grid, Button } from '@mui/material';
import { ArcherContainer, ArcherElement } from "react-archer";
import { textConstants } from '../../../textConstants';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { useHistory } from 'react-router-dom';
function conclusion() {
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
        <div container className='conclusion-heading' >
            <Box className='cardBg'>
                {showGratification && (
                    <Confetti id='confetti-test' style={{ marginLeft: '45%' }} width={width * 0.55} />
                )}
                <ArcherContainer strokeColor='#94A3B8' className='archer-body'>
                    <ArcherElement
                        id="image1" Typography
                        relations={[
                            {
                                targetId: 'image2',
                                targetAnchor: 'left',
                                sourceAnchor: 'right',
                                style: { startMarker: true, stroke: '#94A3B8', strokeWidth: 1, lineStyle: 'straight' }
                            }
                        ]}
                    >
                        <img src="/thrive.png" alt="Image 1" className='thrive-img' />
                    </ArcherElement>

                    <ArcherElement id="image2">
                        <img src="/acme.png" alt="Image 2" className='acme-img' />
                    </ArcherElement>
                </ArcherContainer>
                <span className='card-header'>Congratulations!</span> <br />
                <span className='card-subHeader'>{textConstants.CONCLUSION_PAGE_VERIFY_DESC}</span> <br />
                <span className='card-subHeader'>{textConstants.CONCLUSION_PAGE_VERIFY_DESC_TWO}</span><span fontSize={"x-small"}> {``}<a href="https://example.com">Github repo</a>{``}</span>
            </Box>
            <div className='div-font' style={{ paddingLeft: '6%' }}>

                <span className='conclusion-li-heading'>{textConstants.CONCLUSION_PAGE_VERIFY_INFO}:</span>
                <ol type='number' style={{ paddingInlineStart: '15px', fontSize: "16px" }}>
                    <li>{textConstants.CONCLUSION_PAGE_VERIFY_INFO_STEP_ONE} <span style={{ fontWeight: '500', fontSize: "16px" }}>&lt;end-user@YourCustomer.com&gt;</span>. <span style={{ fontWeight: '500', fontSize: "16px", color: 'blue' }}>Learn more </span>how to customize it.</li>
                    <li>{textConstants.CONCLUSION_PAGE_VERIFY_INFO_STEP_TWO} <span style={{ fontWeight: '500', fontSize: "16px" }}>&lt;GTM@acmelabs.com&gt;.</span><span style={{ fontWeight: '500', fontSize: "16px", color: 'blue' }}>Learn more </span>  on how to configure it.</li>
                </ol>
                <Card style={{ paddingLeft: '28px' }}>
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
                                onClick={handleSignUp}
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