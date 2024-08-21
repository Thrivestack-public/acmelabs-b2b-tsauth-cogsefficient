export const textConstants = {
  ONBOARDING_PAGE_ONE_TITLE: "Acme Labs Onboarding For End-user",
  ONBOARDING_PAGE_ONE_DESCRIPTION_ONE:
    "Imagine this page as your product's onboarding page, which your end-users see once their authentication is completed. Typically, you want your end-users to fill out the onboarding form, as shown below. You can enable this by simply configuring the onboarding page URL in Thrivestack's Workflow builder (Signup Workflow).",
  ONBOARDING_PAGE_ONE_DESCRIPTION_TWO:
    "Behind the scene ThriveStack has already completed the following steps -",

  ONBOARDING_PAGE_ONE_STEP_ONE_HEADING:
    "It's a multi-step onboarding process. If a user drops off during this process, ThriveStack will work behind the scenes to capture the drop-off, enabling you to understand why users may not be able to complete it.",
  ONBOARDIG_PAGE_ONE_STEP_ONE_TITLE: "SaaS Application Onboarding Page",
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
  CONCLUSION_PAGE_VERIFY_INFO : "New User Signup Notifications have been sent out",
  CONCLUSION_PAGE_VERIFY_INFO_STEP_ONE: "Welcome email notification sent to the singed up en- user on",
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

  WORKFLOW_PAGE_TITLE: "How Thrivestack integrates with Yours SaaS (Acme Labs)",
  WORKFLOW_PAGE_DESC: "Self-serve orchestration between your app and Thrivestack",
  WORKFLOW_STEPPER_TITLE: "Thrivestack",
  WORKFLOW_STEPPER_SUBTITLE: "*Works in the background",
  WORKFLOW_STEPPER_TITLE_TWO: "Acme Labs",
  SHARED_DATA_MODAL_TITLE: "Shared Data", // FOR MODAL
  SHARED_DATA_MODAL_DESC: "Here’s a gathered and stored data through the entire process, allowing you to access and view it",
  PREV_MODAL_TITLE: "Preview Email",
  PREV_MODAL_DESC: "Here’s a preview of the email that was sent to the end user",
  PREV_MODAL_TEXT: "Hi Team,",
  PREV_MODAL_TEXT1: ' We\'re excited to let you know that your new tenant has been successfully provisioned! You can now start exploring and utilizing all the features.',
  PREV_MODAL_TEXT2: ' If you have any questions or need assistance, feel free to reach out.'
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
