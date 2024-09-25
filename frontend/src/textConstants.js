export const textConstants = {
  ONBOARDING_PAGE_ONE_TITLE: "Acme Labs Onboarding For End-user",
  ONBOARDING_PAGE_ONE_DESCRIPTION_ONE:
    "Imagine this page as your product's onboarding page, which your end-users see once their authentication is completed. Typically, you want your end-users to fill out the onboarding form, as shown below. You can enable this by simply configuring the onboarding page URL in Thrivestack's Workflow builder (Signup Workflow).",
  ONBOARDING_PAGE_ONE_DESCRIPTION_TWO:
    "Behind the scene ThriveStack has already completed the following steps -",

  ONBOARDING_PAGE_ONE_STEP_ONE_HEADING:
    "Here’s a simulation of your app’s onboarding steps, showcasing a multi-step process. With self-serve telemetry, your app can log events for each step (e.g., started, completed), enabling your Growth teams to track success and drop-offs using",
  ONBOARDIG_PAGE_ONE_STEP_ONE_TITLE: "Simulation of your Product's Onboarding",
  ONBOARDING_PAGE_ONE_STEP_SUB_TITLE: "will be navigated to",
  ONBOARDING_PAGE_ONE_STEP_SUB_TITLE2: "after ThriveStack completes the steps as listed in the left pane. This page is an",
  ONBOARDING_PAGE_ONE_STEP_SUB_TITLE3:"page of self-serve onboarding within ",
  ONBOARDING_PAGE_ONE_STEP_SUB_TITLE4:" ThriveStack needs a page URL to redirect to. This page will receive data that can be used to ",
  ONBOARDING_PAGE_TWO_TITLE: "Acme Labs Onboarding For End-user",
  ONBOARDING_PAGE_TWO_DESCRIPTION_ONE:
    "Imagine this page as your product's onboarding page, which your end-users see once their authentication is completed. Typically, you want your end-users to fill out the onboarding form, as shown below. You can enable this by simply configuring the onboarding page URL in Thrivestack's Workflow builder (Signup Workflow).",
  ONBOARDING_PAGE_TWO_DESCRIPTION_TWO:
    "Upon completing the onboarding process, ThriveStack will then proceed to undertake the following steps:",
  ONBOARDING_PAGE_TWO_LIST_ITEM_ONE: "Enrichment",
  ONBOARDING_PAGE_TWO_LIST_ITEM_TWO: "Associate App Role",
  ONBOARDING_PAGE_TWO_LIST_ITEM_THREE: "Associate App Pricing",
  ONBOARDING_PAGE_TWO_LIST_ITEM_FOUR: "Tenant Creation Request",

  ONBOARDING_PAGE_TWO_SUCCESS_TITLE:
    "The end user has successfully completed the onboarding process!",
  ONBOARDING_PAGE_TWO_SUCCESS_DESC_ONE:
    "Upon the successful completion of onboarding by the end user, you (Saasbuilder) need to redirect the end user to the return URL received from ThriveStack when redirected to the onboarding URL. This redirection enables ThriveStack to continue with the subsequent steps in the signup workflow.",
  ONBOARDING_PAGE_TWO_SUCCESS_DESC_TWO:
    "As a SaaS builder, your responsibility is to redirect the end user back to ThriveStack system using the return URL once they have completed the onboarding process.",
  // "Please wait! End user will be redirected shortly.",
  ONBOARDING_PAGE_TWO_SUCCESS_RETURN_URL: "Return URL is",
  ONBOARDING_PAGE_TWO_RETURN_BTN_TEXT: "Simulate redirect back to ThriveStack",
  ONBOARDING_PAGE_TWO_RETURN_DESCRIPTION:
    "Clicking on the button above will simulate the automatic redirection from SaaSBuilder's onboarding to the ThriveStack system, which will occur automatically once the onboarding is complete.",
  
  CONCLUSION_PAGE_VERIFY_TEXT1: "Welcome email received for the end user on john@acmelabs.com",
  CONCLUSION_PAGE_VERIFY_TEXT2: "Email received for Acme GTM Team on john@acmelabs.com",
  CONCLUSION_PAGE_VERIFY_DESC: "Thrivestack and Acme Labs self serve integration is complete",
  CONCLUSION_PAGE_VERIFY_DESC_TWO: "Checkout the Github repository for the entire code base here:",
  CONCLUSION_PAGE_VERIFY_INFO_HEADING: "This page simulates your product's homepage.",
  CONCLUSION_PAGE_VERIFY_INFO : "New User Signup Notifications have been sent out",
  CONCLUSION_PAGE_VERIFY_INFO_STEP_ONE: "Welcome email notification sent to the signed up end-user on",
  CONCLUSION_PAGE_VERIFY_INFO_STEP_TWO: "Notification to ACME’s GTM sent to ",
  CONCLUSION_PAGE_CARD_TEXT: "Checkout data available for Analytics and Drive on Thrivestack",
  CONCLUSION_PAGE_CARD_TEXT_ONE:"Sign up or log in with your sample app ID on Thrivestack",
  CONCLUSION_PAGE_CARD_TEXT_TWO: "Click demo or In the top Nav, choose product Acme",
  CONCLUSION_PAGE_CARD_TEXT_THREE: "Checkout data available under Analytics and Drive",
  
  HOME_PAGE_TITLE: "Welcome to Acme Labs's Home Page",
  HOME_PAGE_DESC_ONE:
    "This is the landing page for Acme Labs's end-users, who are redirected here from the ThriveStack system after creating their tenant.",
  HOME_PAGE_DESC_TWO:
    "Once the end user arrives on this page, all the necessary steps will have been executed, and we will have gathered and stored the data throughout the entire process, allowing you to access and view it.",
  HOME_PAGE_DATA_CARD_TITLE: "User Data",
  HOME_PAGE_DATA_CARD_TEXT:
    "All user data collected during signup will be displayed here.",

  TENANT_LIST_PAGE_TITLE: "Welcome to Acme Labs tenant creation page",
  TENANT_LIST_PAGE_DESC: `This page serves as a simulation of your backend system's response to tenant creation requests originating from ThriveStack`,
  TENANT_LIST_PAGE_DESC_TWO: `It's important to note that end-users won't have visibility of this page. This simulation provides an experience for testing your backend system.`,

  
  WORKFLOW_PAGE_TITLE: "How Thrivestack integrates with Acme Labs (Your SaaS Product)",
  WORKFLOW_PAGE_DESC: "Self-serve orchestration between your app and Thrivestack",
  WORKFLOW_STEPPER_TITLE: "Thrivestack",
  WORKFLOW_STEPPER_SUBTITLE: "*Works in the background",
  WORKFLOW_STEPPER_SUBTITLE_2: "*Your SaaS Product",
  WORKFLOW_STEPPER_TITLE_TWO: "Acme Labs",
  SHARED_DATA_MODAL_TITLE: "Shared Data", // FOR MODAL
  SHARED_DATA_MODAL_DESC: "ThriveStack will send enrichment data to your application. Use the People and Company enrichment data to know who is the End User signing up to your product and which company they belong to. Personalise your end user's product onboarding journey or use it for customer segmentation, lead scoring, personalised outreach and more.",
  SHARED_DATA_MODAL_DESC_TENANT: "On successful validation of the end user, Thrivestack will create a Tenant on their side and send you the details of create and other Tenant lifecycle events on your side to keep them in sync. This is done via registering your webhook on ThriveStack and listening ThriveStack's webhook at your end.",
  SHARED_DATA_MODAL_INFO_TENANT: "This is done via registering your webhook on ThriveStack and listening ThriveStack's webhook at your end.",
  SHARED_DATA_MODAL_DESC_ONBOARDING_REDIRECT: "ThriveStack will redirect the user to your Product's onboarding. You can use the enrichment data to personalise your end user's onboarding journey or your take the user through your custom onboarding steps.",
  SHARED_DATA_MODAL_INFO_ONBOARDING_REDIRECT:'You will need to acknowledge and redirect the user back to ThriveStack to complete the Self-Serve flow',
  SHARED_DATA_MODAL_DESC_REDIRECT: "On successful completion of the Self-Serve workflow, ThriveStack will redirect the end user to your Product's home page that you have configured in ThriveStack",
  SHARED_DATA_MODAL_INFO_REDIRECT:"You can configure a home or product's page of your choice by setting the configuration.",
  PREV_MODAL_TITLE: "Preview Email",
  PREV_MODAL_DESC: "Here’s a preview of the email that was sent to the end user",
  PREV_MODAL_TEXT: "Hi Team,",
  PREV_MODAL_TEXT2: ' If you have any questions or need assistance, feel free to reach out.',
  
  ENRICHMENT_MAIL : `<!doctype html><html><head> <title>Welcome on board!</title></head><body style="background-color:#f4f7fa;font-family:Arial,sans-serif;margin:0;padding:0"> <table role="presentation" style="font-family:Arial,sans-serif;font-size:16px" width="100%%" bgcolor="#f4f7fa"> <tr> <td align="center"> <table role="presentation" style="margin:0 auto" width="600"> <tr> <td style="text-align:center;padding:24px;background-color:#f4f7fa"><img alt="Logo" src="https://thrivestack-prod-product-static-assests-krlm.s3.amazonaws.com/products/f01334c6-f726-11ee-bd2a-e60358d08e04/logo_full.png" style="height:35px; width:135px;"></td> </tr> <tr> <td style="padding:30px 40px;background-color:#fff;text-align:center"><span style="font-size:40px">👤</span> <h1 style="font-size:1.5rem; line-height: 1.2;">A new user has signed up for your product, Acme Labs in Production environment</h1> <p style="color:#64748b;line-height:1.5rem">Below are the user and company enrichment data attributes from Thrivestack’s default enrichment provider.</p> </td> </tr> <tr> <td style="background-color:#f4f7fa;height:8px;line-height:8px;font-size:1px"></td> </tr> <td style="padding:24px 40px;background-color:#fff"> <h3 style="color:#0e172b;font-size:1rem;text-align:center">User attributes</h3> <table style="width:100%;border-collapse:collapse;margin:20px auto;background-color:#fff; table-layout:fixed"> <tr style="background-color:#f8fafc"> <th style="color:#64748b;padding:10px;border:1px solid #e2e8f0;text-align:left">Attribute</th> <th style="color:#64748b;padding:10px;border:1px solid #e2e8f0;text-align:left">Value</th> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Full name</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Email ID</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Company name</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Job title</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Location</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">LinkedIn handle</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> </table> <h3 style="color:#0e172b;font-size:1rem;text-align:center">Company attributes</h3> <table style="width:100%;border-collapse:collapse;margin:20px auto;background-color:#fff; table-layout:fixed"> <tr style="background-color:#f8fafc"> <th style="color:#64748b;padding:10px;border:1px solid #e2e8f0;text-align:left">Attribute</th> <th style="color:#64748b;padding:10px;border:1px solid #e2e8f0;text-align:left">Value</th> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Company's registered domain</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Company name</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Company location</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Employees count</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%d</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Founded Year</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%d</td> </tr> <tr> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">Industry</td> <td style="padding:10px;border:1px solid #e2e8f0;text-align:left">%s</td> </tr> </table> </td> <tr> <td style="background-color:#f4f7fa;height:8px;line-height:8px;font-size:1px"></td> </tr> <tr> <td style="padding:24px 40px;background-color:#fff;text-align:center"> <p style="line-height:24px;margin-bottom:10px;color:#64748b">You can customize the attributes for automatic enrichment of new users. Bring your Enrichment provider like Clearbit, People Data Labs or use defaults.</p><a href="%s" style="color:#1238ce;text-decoration:none">Setup Self Serve</a></td> </tr> <tr> <td style="padding:24px;background-color:#f4f7fa;color:#94a3b8;text-align:center;font-size:.7rem"> <p style="line-height:1.25rem">© ThriveStack 2024<br>Seattle, USA</p> </td> </tr> </table> </td> </tr> </table></body></html>`,
  WELCOME_MAIL: `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head> <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> <meta name="Generator" content="Microsoft Word 15 (filtered medium)"> <!--[if !mso]><style>v\:* {behavior:url(#default#VML);}o\:* {behavior:url(#default#VML);}w\:* {behavior:url(#default#VML);}.shape {behavior:url(#default#VML);}</style><![endif]--> <style> <!-- /* Font Definitions */ @font-face { font-family: Wingdings; panose-1: 5 0 0 0 0 0 0 0 0 0; } @font-face { font-family: "Cambria Math"; panose-1: 2 4 5 3 5 4 6 3 2 4; } @font-face { font-family: Aptos; panose-1: 2 11 0 4 2 2 2 2 2 4; } @font-face { font-family: "Apple Color Emoji"; panose-1: 0 0 0 0 0 0 0 0 0 0; } @font-face { font-family: "Segoe UI"; panose-1: 2 11 5 2 4 2 4 2 2 3; } /* Style Definitions */ p.MsoNormal, li.MsoNormal, div.MsoNormal { margin: 0cm; font-size: 12.0pt; font-family: "Aptos", sans-serif; } h1 { mso-style-priority: 9; mso-style-link: "Heading 1 Char"; mso-margin-top-alt: auto; margin-right: 0cm; mso-margin-bottom-alt: auto; margin-left: 0cm; font-size: 24.0pt; font-family: "Aptos", sans-serif; font-weight: bold; } h2 { mso-style-priority: 9; mso-style-link: "Heading 2 Char"; mso-margin-top-alt: auto; margin-right: 0cm; mso-margin-bottom-alt: auto; margin-left: 0cm; font-size: 18.0pt; font-family: "Aptos", sans-serif; font-weight: bold; } a:link, span.MsoHyperlink { mso-style-priority: 99; color: blue; text-decoration: underline; } span.Heading1Char { mso-style-name: "Heading 1 Char"; mso-style-priority: 9; mso-style-link: "Heading 1"; font-family: "Aptos Display", sans-serif; color: #0F4761; } span.Heading2Char { mso-style-name: "Heading 2 Char"; mso-style-priority: 9; mso-style-link: "Heading 2"; font-family: "Aptos Display", sans-serif; color: #0F4761; } span.EmailStyle21 { mso-style-type: personal-reply; font-family: "Aptos", sans-serif; color: windowtext; } .MsoChpDefault { mso-style-type: export-only; font-size: 10.0pt; mso-ligatures: none; } /* Page Definitions */ @page { mso-endnote-separator: url("cid:header.htm\@01DAFEC9.888DFFE0") es; mso-endnote-continuation-separator: url("cid:header.htm\@01DAFEC9.888DFFE0") ecs; } @page WordSection1 { size: 612.0pt 792.0pt; margin: 72.0pt 72.0pt 72.0pt 72.0pt; mso-footer: url("cid:header.htm\@01DAFEC9.888DFFE0") f1; } div.WordSection1 { page: WordSection1; } /* List Definitions */ @list l0 { mso-list-id: 1346786645; mso-list-template-ids: -684281356; } @list l0:level1 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 36.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Symbol; } @list l0:level2 { mso-level-number-format: bullet; mso-level-text: o; mso-level-tab-stop: 72.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: "Courier New"; mso-bidi-font-family: "Times New Roman"; } @list l0:level3 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 108.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } @list l0:level4 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 144.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } @list l0:level5 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 180.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } @list l0:level6 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 216.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } @list l0:level7 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 252.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } @list l0:level8 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 288.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } @list l0:level9 { mso-level-number-format: bullet; mso-level-text: ; mso-level-tab-stop: 324.0pt; mso-level-number-position: left; text-indent: -18.0pt; mso-ansi-font-size: 10.0pt; font-family: Wingdings; } ol { margin-bottom: 0cm; } ul { margin-bottom: 0cm; } --> </style> <!--[if gte mso 9]><xml><o:shapedefaults v:ext="edit" spidmax="2050" /></xml><![endif]--> <!--[if gte mso 9]><xml><o:shapelayout v:ext="edit"><o:idmap v:ext="edit" data="2" /></o:shapelayout></xml><![endif]--></head><body bgcolor="#F4F7FA" lang="EN-IN" link="blue" vlink="purple" style="word-wrap:break-word"> <table class="MsoNormalTable" border="0" cellpadding="0" width="100%" style="width:100.0%;background:#F4F7FA"> <tbody> <tr> <td style="padding:.75pt .75pt .75pt .75pt"> <div align="center"> <table class="MsoNormalTable" border="0" cellpadding="0" width="600" style="width:450.0pt"> <tbody> <tr> <td style="background:#F4F7FA;padding:18.0pt 18.0pt 18.0pt 18.0pt"> <p class="MsoNormal" align="center" style="text-align:center"><span style="color:black"><img id="_x0000_i1026" src="/acme.png" alt="Logo" width="224px"></span> <o:p></o:p> </p> </td> </tr> <tr> <td style="background:white;padding:22.5pt 30.0pt 22.5pt 30.0pt"> <p class="MsoNormal" align="center" style="text-align:center"><span style="font-family:&quot;Apple Color Emoji&quot;;color:black">&#128075;</span> <o:p></o:p> </p> <h1 align="center" style="text-align:center"><span style="color:black">Welcome on board User!</span> <o:p></o:p> </h1> <p align="center" style="text-align:center;line-height:1.5rem"><span style="color:#475569">Get started with our free plan and it’s easy to get started. We’ll guide your through the setup process so you can make the most of the product.<o:p></o:p></span></p> <p class="MsoNormal" align="center" style="text-align:center"><span style="color:black"><a href="http://url3476.thrivestack.ai/ls/click?upn=u001.915Gsr4YX-2B-2Fe4CLo-2BDXng1Cad-2FDldCLYth656lQWABtTV2MncktJGJr8z64R4A3b3PUA1e-2Bau7KmWwh7VSrvoA-3D-3D60y5_7jYFfJDPAH5iQXwHYbQiZESFXgSpEzm36-2B8RsmKHmHV6Oe1RJ9gbTiZ-2F4m6FuSA450-2FnbTi41UtpJ-2FVfnXi0DxbaBafHykCGT1vY-2FHB3c9KL4L4JjmAwOSwTVlEiaa4snHcm1cZ6H2Z1mhwAvzL2lqZYJt-2BLGqIj2gtRTtU2fznKg2u8k4DuJeeEIKk6u-2BbV5TKFm0Huzh4U80-2By83tBug-3D-3D"><span style="color:white;background:#7F56D9;text-decoration:none">Get Started</span></a> </span> <o:p></o:p> </p> </td> </tr> <tr style="height:6.0pt"> <td style="background:#F4F7FA;padding:.75pt .75pt .75pt .75pt;height:6.0pt"></td> </tr> <tr> <td style="background:white;padding:18.0pt 30.0pt 18.0pt 30.0pt"> <h2 style="font-size:1.125rem"><span style="color:black">About Acme Labs</span> <o:p></o:p> </h2> <p style="margin-top:7.5pt;line-height:1.5rem"><span style="color:#475569">AcmeLabs helps you Build, Analyze, and Drive your Product-Led Growth for efficient distribution<o:p></o:p></span></p> </td> </tr> <tr style="height:6.0pt"> <td style="background:#F4F7FA;padding:.75pt .75pt .75pt .75pt;height:6.0pt"></td> </tr> <tr> <td style="background:white;padding:18.0pt 30.0pt 18.0pt 30.0pt"> <h2 style="font-size:1.125rem"><span style="color:black">What’s included in free plan</span> <o:p></o:p> </h2> <ul style="margin-top:0cm;list-style-position:inside" type="disc"> <li class="MsoNormal" style="margin-top:7.5pt;mso-list:l0 level1 lfo1;box-sizing:border-box"> <span style="font-family:&quot;Segoe UI&quot;,sans-serif;color:black">No-Code Workflow Orchestration</span><span style="font-family:&quot;Segoe UI&quot;,sans-serif"><o:p></o:p></span></li> <li class="MsoNormal" style="margin-top:7.5pt;mso-list:l0 level1 lfo1;box-sizing:border-box"> <span style="font-family:&quot;Segoe UI&quot;,sans-serif;color:black">Seamless Authentication</span><span style="font-family:&quot;Segoe UI&quot;,sans-serif"><o:p></o:p></span></li> <li class="MsoNormal" style="margin-top:7.5pt;mso-list:l0 level1 lfo1;box-sizing:border-box"> <span style="font-family:&quot;Segoe UI&quot;,sans-serif;color:black">Event Tracking</span><span style="font-family:&quot;Segoe UI&quot;,sans-serif"><o:p></o:p></span></li> <li class="MsoNormal" style="margin-top:7.5pt;mso-list:l0 level1 lfo1;box-sizing:border-box"> <span style="font-family:&quot;Segoe UI&quot;,sans-serif;color:black">Standard &amp; Custom Report Generation</span><span style="font-family:&quot;Segoe UI&quot;,sans-serif"><o:p></o:p></span></li> </ul> </td> </tr> <tr style="height:6.0pt"> <td style="background:#F4F7FA;padding:.75pt .75pt .75pt .75pt;height:6.0pt"></td> </tr> <tr> <td style="background:white;padding:18.0pt 30.0pt 18.0pt 30.0pt"> <p align="center" style="margin-bottom:7.5pt;text-align:center;line-height:1.5rem"> <span style="color:#475569">If you need help getting started, then set up a 1:1 meeting with our team member.<o:p></o:p></span></p> <p class="MsoNormal" align="center" style="text-align:center"><span style="color:black"><a href="http://url3476.thrivestack.ai/ls/click?upn=u001.915Gsr4YX-2B-2Fe4CLo-2BDXng-2FWRg22-2Fx-2BRZfz9Y9QElRhkMHq1u3N5icoARTqCehJn8GfWhy25XykX9wbB-2BU7huV4VEFDzZP6tznZ-2BUIYsz8x4-3Dk0eg_7jYFfJDPAH5iQXwHYbQiZESFXgSpEzm36-2B8RsmKHmHV6Oe1RJ9gbTiZ-2F4m6FuSA450-2FnbTi41UtpJ-2FVfnXi0D94XPZBL-2FEEPzMN5T7CpgiCTKx9pgDQKY3AN6ZKdr5LK-2BErlgaps6w3JHWCSaRAfc13viJ0dG6QSOh448D7pBR-2FJzfxudZexLdD4tt-2FwIY6Hd-2B9pRpF73P87Df-2FE9jKtHg-3D-3D"><span style="color:#7F56D9;text-decoration:none">Schedule meeting</span></a> </span> <o:p></o:p> </p> </td> </tr> <tr> <td style="background:#F4F7FA;padding:18.0pt 18.0pt 18.0pt 18.0pt;font-size:.7rem"> <p align="center" style="text-align:center;line-height:1.25rem"><span style="color:#94A3B8">© Acme Labs 2024<o:p></o:p></span></p> </td> </tr> </tbody> </table> </div> </td> </tr> </tbody> </table> <p class="MsoNormal"><span style="font-family:&quot;Arial&quot;,sans-serif"><img border="0" width="4" height="4" style="width:.0416in;height:.0416in" id="_x0000_i1025" src="http://url3476.thrivestack.ai/wf/open?upn=u001.ApWE67R5D-2B164wWmTIudnA9iICEM0z8PnfZwLghoDOolcu-2FP-2BAzQ62QtA4qK-2FWIcksIjXa2NB0FwebIxUBgc-2B-2F8O8oeyE6cchXbDFQpDxl1qLWGAo01Gy34Zk3IaFaIBvTF7tUFFIyHbxA1QB0F2t8XfB1UV3cAaD8BdByY7ZETtRi-2BpCb1t1QCOATkTMp0WgGL-2FL6N6y2gEF12NPmmWN2FyRyO8PbIhJiveNVHtx9Q-3D"><o:p></o:p></span></p> </div> </div> </div> </div></body></html>`,

  MODAL_DEFAULT_INFO: `Save it in cookies in your application browser or save it in your database. Choose from 150+ attributes`,

  ENRICHMENT_DOCS_LINK: 'https://docs.app.thrivestack.ai/getting-started/self-serve/customization#enrichment',

  ONBOARDING_DOCS_LINK: 'https://docs.app.thrivestack.ai/getting-started/self-serve/customization#onboarding',

  TENANT_DOCS_LINK: 'https://docs.app.thrivestack.ai/getting-started/self-serve/customization#subscribe-to-tenant-requests',

  REDIRECT_DOCS_LINK: 'https://docs.app.thrivestack.ai/getting-started/self-serve/customization#user-redirection',


  
};



export const signUpFormData = {
  HEADLINE: "Welcome to Acme Labs!",
  IMG_HEADLINE: "Acme Labs",
}
export const signupStepsData = [
  {
    step: "1. Authentication Token",
    text: "Thrivestack has done authentication through your authentication provider and securely stored the authentication token in cookies at the domain level.",
  },
  {
    step: "2. User Surge Check",
    text: "ThriveStack has reviewed the user limit that you configured within the waitlist user node settings.",
  },
  {
    step: "3. Onboarding",
    text: "Upon completing the user surge check, ThriveStack guided the end user to initiate the Acme Labs onboarding process via the redirect URL configured by Acme Labs (SaasBuilder) in the onboarding node settings in the workflow builder. After successfully onboarding the end user, Acme Labs subsequently directs them back to the designated returnUrl.",
  },
  {
    step: "4. User Enrichment",
    text: "ThriveStack subsequently performed data enrichment based on the enrichment fields configured by Acme Labs (SaasBuilder) within the enrichment node settings, enhancing the user's information. The enriched data is then securely stored within the Acme Labs CRM.",
  },
  {
    step: "5. Associate Role and Pricing",
    text: "ThriveStack has also allocated a default role and pricing based on the settings defined by Acme Labs (SaasBuilder) in the Associate App Role and Associate App Pricing configurations.",
  },
  {
    step: "6. Tenant Surge Check",
    text: "ThriveStack has also checked the tenant limit that you configured within the waitlist user node settings.",
  },
  {
    step: "7. Tenant Creation and Acknowledgement",
    text: "ThriveStack initiated a tenant creation request, retrieved the tenant information from the tenant acknowledgment queue, and securely stored it for further processing.",
  },
  {
    step: "8. Notify End User",
    text: "In the signup workflow, ThriveStack also communicated the successful account creation to the user through the email service provider specified in the Notify Node settings.",
  },
  {
    step: "9. Redirect End User",
    text: "Towards the end, ThriveStack directed the user to the Acme Labs application, specifically to the redirect URL configured by SaasBuilder within the Redirect Node settings of the signup workflow.",
  },
];

export const onboardingPageOneStepsData = [
  {
    step: "Authentication",
    status: "done",
    text: "Thrivestack has authenticated your end-user through the authentication provider configured in Workflow Builder and securely stored the authentication token in cookies at the domain level.",
  },
  {
    step: "User Surge Check",
    status: "done",
    text: "ThriveStack has reviewed the user limit that you configured within the waitlist user node settings in Workflow Builder.",
  },
];

export const onboardingPageTwoStepsData = [
  {
    step: "Enrichment",
    status: "not done",
    text: "ThriveStack will automatically enrich user and organization data based on the fields configured by you (SaasBuilder) within the Enrichment node settings in the Workflow Builder.",
  },
  {
    step: "Associate User Role",
    status: "not done",
    text: "ThriveStack will assign a default role to the end user as configured within the Associate Role node settings in the Workflow Builder.",
  },
  {
    step: "Associate Pricing Plan",
    status: "not done",
    text: "ThriveStack will designate a default pricing plan for the end user as configured within the Associate Pricing node settings in the Workflow Builder.",
  },
  {
    step: "Tenant Surge Check",
    status: "not done",
    text: "ThriveStack will then verify the tenant limit that you've configured within the Waitlist Tenant node settings.",
  },
  {
    step: "Tenant Creation Request",
    status: "not done",
    text: "Following the tenant surge check, ThriveStack will send a request for tenant creation to your (SaasBuilder's) system (queue) as configured within the Create Tenant node settings in the Workflow Builder.",
  },
];
