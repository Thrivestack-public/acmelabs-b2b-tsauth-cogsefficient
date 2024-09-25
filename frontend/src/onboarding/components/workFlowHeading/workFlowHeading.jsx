import React from 'react';
import { Grid, Button, Typography, Box } from '@mui/material';
import { textConstants } from "../../../textConstants";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

function workFlowHeading() {

  return (
    <div>
      <Grid>
        <Grid>

          <Typography
            variant="p"
            fontWeight={550}
            paddingBottom={"4vh"}
            paddingTop={"0vh"}
            fontSize={["12px", "14px", "x-large"]}  
          >
            {textConstants.WORKFLOW_PAGE_DESC}
          </Typography>

          <Box display="flex" alignItems="center" justifyContent="space-between" paddingBottom="3vh" marginBottom="2vh">
            <Typography fontSize={"16px"}>
              {`( Template: `}
              <a href="https://docs.app.thrivestack.ai/getting-started/self-serve/integrate/#22-template-2-cogs-efficient-b2b-saas" target='_blank'>
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

          <Grid item xs={12}>

            <Box
              display="flex"
              alignItems="center"
              bgcolor="rgba(226, 232, 240, 0.5)"
              borderRadius="8px"
              padding="10px"
              mb={2}
              border="1px solid rgba(0, 0, 0, 0.05)"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'rgb(255, 217, 0, 0.8)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  minWidth: '40px', 
                  minHeight: '40px',
                  marginRight: '1vw',
                }}
              >
                <EmojiObjectsIcon />
              </Box>
              <Typography>
                End user will navigate to your onboarding page. You will need to give us the page URL.
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              bgcolor="rgba(226, 232, 240, 0.5)"
              borderRadius="8px"
              padding="10px"
              mb={2}
              border="1px solid rgba(0, 0, 0, 0.05)"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'rgb(255, 217, 0, 0.8)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  minWidth: '40px', 
                  minHeight: '40px',
                  marginRight: '1vw',
                }}
              >
                <EmojiObjectsIcon />
              </Box>
              <Typography>
                Your app can log events for each step of the onboarding.
              </Typography>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              bgcolor="rgba(226, 232, 240, 0.5)"
              borderRadius="8px"
              padding="10px"
              mb={2}
              border="1px solid rgba(0, 0, 0, 0.05)"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'rgb(255, 217, 0, 0.8)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  minWidth: '40px', 
                  minHeight: '40px',
                  marginRight: '1vw',
                }}
              >
                <EmojiObjectsIcon />
              </Box>
              <Typography>
                With onboarding events, you can track user success and drop-off in Thrivestack’s activation reports in PLG analytics.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default workFlowHeading;