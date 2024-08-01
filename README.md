# acmelabs-b2b-tsauth-cogsefficient
This is ACME Labs SaaS application using ThriveStack's B2B COGS efficient template. This template uses Thrivestack provided authentication

## Getting Started

## Goal

The primary goal of the ThriveStack Sample App is to empower SaaS builders by providing a practical example they can simulate and run on their own systems. By exploring this sample app, SaaS developers can gain insights into the integration capabilities of ThriveStack.

## Use Cases

1. **SaaS Simulation and Testing:**
   - **Objective:** SaaS builders can use the sample app to simulate real-world scenarios and test their integrations with ThriveStack.
   - **How?** By following the setup instructions in this README, SaaS builders can deploy the sample app locally or on a test environment. They can then interact with the app, trigger events, and observe how ThriveStack integrates seamlessly.

2. **Customer Understanding:**
   - **Objective:** Customers who are considering ThriveStack can use the sample app to understand how it fits into their existing workflows.
   - **How?** The sample app showcases various integration points with ThriveStack. Customers can explore these features, such as data synchronization, event handling, and authentication. By doing so, they gain a clearer understanding of how ThriveStack can enhance their own applications.

## Getting Started

Follow these steps to set up the ThriveStack Sample App:

1. **Clone the Repository:**
   - Clone this repository to your local machine using `git clone https://github.com/your-username/thrivestack-sample-app.git`.

2. **Install Dependencies:**
   - Navigate to the project directory and run `npm install` to install the necessary dependencies.

#### 3. Install dependencies 

You can use npm or yarn, but we recommend using yarn. If it isn't already installed on your machine, the instructions on how to do so can be found [here](https://classic.yarnpkg.com/lang/en/docs/install/). After yarn is installed, run this command:
```
yarn install
```

#### 4. Start the app

Run this command to start the app:

```
yarn start
```

#### 5. Open the app
Browse to `http://localhost:3000`


##### User invitation with Magic Link
This app contains a user invitation route that uses a magic link.
To use it, go to your [project configuration](https://app.descope.com/settings/project) and do the following
 - Set the "User Invitation Redirect URL" to a URL with the path of `auth/invitation` (e.g. `http://localhost:3000/auth/invitation`)
 - Check the Add a "Magic Link token to the invitation link" checkbox, so that the token is sent in the invitation email

## Learn More
To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us
If you need help you can [contact us](https://docs.descope.com/support/)
