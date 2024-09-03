import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import { getManagementToken, getEnrichmentData } from '../../Api/viewSharedData'

const EmailPreviewComponent = ({ previewHtml }) => {

  const [userEmail, setUserEmail] = useState('')
  const [userData, setUserData] = useState({})
  const [companyData, setCompanyData] = useState({})

  const sanitizedHtml = DOMPurify.sanitize(previewHtml);

  const HtmlEnrichment = (template, values) => {
    let valueIndex = 0;
    return template.replace(/%[sd]/g, (match) => {
      if (valueIndex < values.length) {
        const replacement = match === '%s' ? String(values[valueIndex]) : parseInt(values[valueIndex], 10);
        valueIndex++;
        return replacement;
      }
      return match;
    });
  };


  function getEnrichHTMLTable(userEmailID, userDataStr, orgDataStr) {


    const extractString = (data, key) => {
      return (typeof data[key] === 'string' && data[key] !== '') ? data[key] : '-';
    };

    const extractInt = (data, key) => {
      return typeof data[key] === 'number' ? data[key] : 0;
    };

    const extractRegisteredDomain = (emailId) => {
      emailId = emailId.trim();
      const index = emailId.lastIndexOf('@');
      return index === -1 ? '' : emailId.substring(index + 1);
    };

    const enrichTable = [
      extractString(userDataStr, 'enrichment_full_name'),
      userEmailID,
      extractString(userDataStr, 'enrichment_employment_name'),
      extractString(userDataStr, 'enrichment_employment_title'),
      extractString(userDataStr, 'enrichment_location'),
      extractString(userDataStr, 'enrichment_linkedin_handle'),
      extractRegisteredDomain(userEmailID),
      extractString(orgDataStr, 'enrichment_name'),
      extractString(orgDataStr, 'enrichment_location'),
      extractInt(orgDataStr, 'enrichment_employees'),
      extractInt(orgDataStr, 'enrichment_founder_year'),
      extractString(orgDataStr, 'enrichment_industry')
    ];
    return enrichTable;
  }

  const EnrichredDataList = getEnrichHTMLTable(userEmail, userData, companyData)

  const EnrichredHtml = HtmlEnrichment(sanitizedHtml, EnrichredDataList)


  useEffect(() => {

    async function callGetEnrichment() {
      const response = await getEnrichmentData()

      if (response) {
        const data = JSON.parse(response)
        setUserData(JSON.parse(data["user_enrichment_data"]))
        setCompanyData(JSON.parse(data["company_enrichment_data"])) 
        setUserEmail(data["email_id"])
        console.log("PARSEDUSER DATA",JSON.parse(data["user_enrichment_data"]))
        console.log("PARSEDcomp DATA",JSON.parse(data["company_enrichment_data"]))
      }

    }

    callGetEnrichment()

  }, []);

  return (
    <Paper
      sx={{
        paddingTop: '2%',
        margin: '5% 0%',
        paddingBottom: '2%',
        backgroundColor: '#F8FAFC',
        boxShadow: 'none'
      }}
    >
      {/* <Box sx={{ borderBottom: '1px solid #efe9e9', display: 'flex', alignItems: 'center', padding: '0 1%' }}>
        <img src="/previewImg.png" style={{ height: '20px', marginRight: '8px' }} alt="preview" />
        <Typography variant="subtitle1">Preview Email</Typography>
      </Box> */}
      <Box sx={{ padding: '2%' }}>
        <Box
          dangerouslySetInnerHTML={{ __html: EnrichredHtml }}
          sx={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '16px',
            '& img': { maxWidth: '100%' }
          }}
        />
      </Box>
    </Paper>
  );
};

export default EmailPreviewComponent;