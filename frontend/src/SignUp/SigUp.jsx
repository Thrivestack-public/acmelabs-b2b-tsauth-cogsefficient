import React, { useState } from 'react';
import { Grid, TextField, Paper, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { signUpFormData } from '../textConstants';

function SignUp() {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/onboarding/boardingSection');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh',
            backgroundColor: '#fff',
        },
        form: {
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
        },
        label: {
            marginBottom: '10px',
            display: 'block',
        },
        button: {
            marginTop: '10px',
            padding: '10px 20px',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
        },
        img: {
            marginRight: '10px',
            height: '50px', // Adjust size as needed
            width: '50px', // Adjust size as needed
            objectFit: 'cover',
        },
        imgContainer: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            marginLeft: '70px', // Adjust distance from left as needed
        },
        headline: {
            fontFamily: 'Open Sans',
            fontSize: '14px',
            fontWeight: '700',
            lineHeight: '20px',
            letterSpacing: '-0.02em',
            marginLeft: '5px', // Adjust as needed
        },
        headlineText: {
            fontFamily: 'Satoshi',
            fontSize: '18px',
            fontWeight: '700',
            lineHeight: '24.3px',

            marginLeft: '234px',
            marginBottom: '40px'
        },
        imgBox: {
            display: 'flex',
            marginBottom: '35px',
            marginLeft: '165px'
        }

    };

    return (
        <>
            {/* Image and headline section */}
            <Paper sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                marginBottom: '1.4%'
            }}
            >
                <img
                    src="/acme.png"
                    alt="icon"
                    style={styles.img}
                />
                <Typography
                    variant="body1"
                    fontWeight={600}
                    marginTop={'1%'}
                >
                    {signUpFormData.IMG_HEADLINE}
                </Typography>
            </Paper>

            {/* Main grid layout */}
            <Grid container spacing={2}>
                {/* Left column */}
                <Grid item 
                md={4} 
                style={{ backgroundColor: '#5D2A6D', padding: '4%', height: '580px' }}
                >
                    <Typography 
                    fontWeight={400} 
                    fontSize="28px"
                     color="#FFFFFF"
                      lineHeight={'54.2px'}
                      >
                        Start your journey with us
                    </Typography>
                    <Typography 
                    fontSize="14px"
                     fontWeight={400} 
                     paddingTop="2%" 
                     color="#FFFFFF" 
                     lineHeight="21.6px">
                        Discover the world’s best community of freelancers and business owners
                    </Typography>
                </Grid>

                {/* Right column */}
                <Grid item md={8} style={{ backgroundColor: '#fff', padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        {/* Image and headline (duplicate for consistency) */}
                        <div style={styles.imgContainer}>
                            <img src="/acme.png" alt="icon" style={styles.imgBox} />
                            <Typography variant="body1" fontWeight={600} marginTop={'-4%'}>
                                {signUpFormData.IMG_HEADLINE}
                            </Typography>
                        </div>
                        {/* Headline text */}
                        <Typography variant="h5" style={styles.headlineText}>
                            {signUpFormData.HEADLINE}
                        </Typography>

                        {/* Form section */}
                        <div style={styles.container}>
                            <form style={styles.form} onSubmit={handleSubmit}>
                                <label style={styles.label}>
                                    Email:
                                    <TextField

                                        label="Enter your email here"
                                        name="contactEmail"
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        fullWidth
                                        InputLabelProps={{}}
                                    />
                                </label>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ ...styles.button, width: '100%' }}
                                    type="submit"
                                >
                                    Continue
                                </Button>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default SignUp;
