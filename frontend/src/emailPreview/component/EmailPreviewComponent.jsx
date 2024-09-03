import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import DOMPurify from 'dompurify';
import {getManagementToken, getEnrichmentData} from '../../Api/viewSharedData'

const EmailPreviewComponent = ({ previewHtml }) => {

  const [userEmail, setUserEmail] = useState('')
  const [userData, setUserData] = useState({})
  const [companyData, setCompanyData] = useState({})

  const sanitizedHtml = DOMPurify.sanitize(previewHtml);

  const HtmlEnrichment = (template, value) => {

    return template.replace(/%s/g, function () {
      return value.shift()
    })

  }

  function getEnrichHTMLTable(userEmailID, userDataStr, orgDataStr) {

    console.log("JSONDATA",userDataStr)


    const extractString = (data, key) => {
      return (typeof data[key] === 'string' && data[key] !== '') ? data[key] : '-';
    };

    const extractInt = (data, key) => {
      return typeof data.key === 'number' ? data.key : 0;
    };

    const extractRegisteredDomain = (emailId) => {
      emailId = emailId.trim();
      const index = emailId.lastIndexOf('@');
      return index === -1 ? '' : emailId.substring(index + 1);
    };

    const enrichTable = [
      extractString(userDataStr, 'enrichment_employment_title'),
      extractString(userDataStr, 'enrichment_location'),
      extractString(userDataStr, 'enrichment_full_name'),
      userEmailID,
      extractString(userDataStr, 'enrichment_employment_title'),
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
    console.log("WTF",typeof(userDataStr))
    return enrichTable;
  }

  const EnrichredDataList = getEnrichHTMLTable(userEmail, userData, companyData)

  const EnrichredHtml = HtmlEnrichment(sanitizedHtml, EnrichredDataList)

  // ['ACME', "sample", 'Full_name', 'Email_ID', 'Company_Name', 'Job_Title', 'Location']

  

  // console.log("EnrichHTMLTABLE_OUTPUT",EnrichredHtml)


  useEffect(() => {

    async function callGetEnrichment(){
      const response = await getEnrichmentData()
      console.log(response)
      // setEnrichJsonData(response)
      const EnrichJson = {"product_id":"f01334c6-f726-11ee-bd2a-e60358d08e04","email_id":"akgupta317@gmail.com","user_enrichment_data":"{\"enrichment_first_name\":\"ankit\",\"enrichment_last_name\":\"gupta\",\"enrichment_full_name\":\"ankit gupta\",\"enrichment_avatar\":\"\",\"enrichment_email_provider\":\"\",\"enrichment_city\":\"\",\"enrichment_country\":\"india\",\"enrichment_country_code\":\"\",\"enrichment_employment_domain\":\"\",\"enrichment_employment_name\":\"\",\"enrichment_employment_role\":\"\",\"enrichment_employment_seniority\":\"\",\"enrichment_employment_sub_role\":\"\",\"enrichment_employment_title\":\"\",\"enrichment_facebook_handle\":\"\",\"enrichment_github_handle\":\"\",\"enrichment_linkedin_handle\":\"\",\"enrichment_location\":\"\",\"enrichment_phone\":[],\"enrichment_state\":\"bombay, maharashtra, india\",\"enrichment_state_code\":\"\",\"enrichment_time_zone\":\"\",\"enrichment_twitter_handle\":\"\",\"enrichment_inactive_at\":\"\",\"enrichment_active_at\":\"\"}","company_enrichment_data":"{\"enrichment_name\":\"\",\"enrichment_legal_name\":\"\",\"enrichment_domain\":\"\",\"enrichment_domain_aliases\":null,\"enrichment_phone_numbers\":null,\"enrichment_email_addresses\":null,\"enrichment_sector\":\"\",\"enrichment_industry_group\":\"\",\"enrichment_industry\":\"\",\"enrichment_sub_industry\":\"\",\"enrichment_tags\":null,\"enrichment_description\":\"\",\"enrichment_founder_year\":0,\"enrichment_location\":\"\",\"enrichment_time_zone\":\"\",\"enrichment_street_number\":\"\",\"enrichment_street_name\":\"\",\"enrichment_street_address\":\"\",\"enrichment_city\":\"\",\"enrichment_postal_code\":\"\",\"enrichment_state\":\"\",\"enrichment_state_code\":\"\",\"enrichment_country\":\"\",\"enrichment_country_code\":\"\",\"enrichment_logo\":\"\",\"enrichment_linkedin_handle\":\"\",\"enrichment_facebook_handle\":\"\",\"enrichment_twitter_handle\":\"\",\"enrichment_crunchbase_handle\":\"\",\"enrichment_email_provider\":\"\",\"enrichment_type\":\"\",\"enrichment_phone\":\"\",\"enrichment_traffic_rank\":\"\",\"enrichment_employees\":0,\"enrichment_employees_range\":\"\",\"enrichment_market_cap\":\"\",\"enrichment_raised\":\"\",\"enrichment_annual_revenue\":\"\",\"enrichment_tech\":\"\",\"enrichment_tech_categories\":null}"}
      setUserData(EnrichJson["user_enrichment_data"])
      setCompanyData(EnrichJson["company_enrichment_data"])
      setUserEmail(EnrichJson["email_id"])

      console.log("BHAI",typeof(EnrichJson["user_enrichment_data"]))
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