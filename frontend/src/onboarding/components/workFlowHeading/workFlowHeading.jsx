import React from 'react'
import { Grid, Button, Typography } from '@mui/material';
import { textConstants } from "../../../textConstants";

function workFlowHeading() {

  return (
    <div>
      <Grid>
        <Grid>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: 'none', alignItems: 'left', backgroundColor: '#343A40'
            }}
          >Learn</Button>
        </Grid>
        <Grid>
          <Typography
            variant="p"
            fontWeight={500}
            paddingBottom={"4vh"}
            paddingTop={"0vh"}
            fontSize={["12px", "14px", "x-large"]}
          >
            <img></img>  {textConstants.WORKFLOW_PAGE_TITLE}
          </Typography>

          <Typography fontSize={"x-small"}> {`{Template: `}<a href="https://example.com">COGS Efficient</a>{`}`}</Typography><br />
          <Typography backgroundColor="#E1E4EF" color="#0A1E71" padding={"0.5vw"} marginTop={"0vh"} marginBottom={"6vh"}
            fontWeight={"700"} textAlign={"center"} justifyContent={"center"} display={"flex"} lineHeight={"21.6px"} fontSize={'16px'}
          > {textConstants.WORKFLOW_PAGE_DESC}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default workFlowHeading