import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import { withTheme } from "@mui/styles";
import AWS from "aws-sdk";
import useWidth from "../../../shared/functions/useWidth";
import calculateSpacing from "./calculateSpacing";
import { textConstants } from "../../../textConstants";

function TenantRequestsList(props) {
  const { theme } = props;
  const width = useWidth();
  const pastData = [];
  // JSON.parse(localStorage.getItem("tenantCreationRequests")) || [];
  const [tenantCreationRequests, setTenantCreationRequests] =
    useState(pastData);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [tenantId, setTenantId] = useState("");

  // useEffect(() => {
  // localStorage.setItem(
  //   "tenantCreationRequests",
  //   JSON.stringify(tenantCreationRequests)
  // );
  // }, [tenantCreationRequests]);

  // Read AWS credentials for the source queue from environment variables
  const sourceQueueConfig = {
    accessKeyId: process.env.REACT_APP_SOURCE_QUEUE_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SOURCE_QUEUE_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_SOURCE_QUEUE_AWS_REGION,
    sourceQueueUrl: process.env.REACT_APP_SOURCE_QUEUE_URL,
  };

  // Read AWS credentials for the destination queue from environment variables
  const destinationQueueConfig = {
    accessKeyId: process.env.REACT_APP_DESTINATION_QUEUE_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_DESTINATION_QUEUE_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_DESTINATION_QUEUE_AWS_REGION,
    destinationQueueUrl: process.env.REACT_APP_DESTINATION_QUEUE_URL,
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const sourceSqs = new AWS.SQS(sourceQueueConfig);
  const destinationSqs = new AWS.SQS(destinationQueueConfig);

  const processMessageAndSendToDestination = async (message) => {
    // Assuming the message is in JSON format
    const dataObject = JSON.parse(message.Body);

    // Add additional properties to the new message for the destination queue
    const newMessage = {
      workflowRuntimeId: dataObject.workflowRuntimeId,
      workflowDesignTimeId: dataObject.workflowDesignTimeId,
      tenantName,
      tenantId,
      emailId: dataObject.emailId,
    };

    const sendMessageParams = {
      QueueUrl: destinationQueueConfig.destinationQueueUrl,
      MessageBody: JSON.stringify(newMessage),
    };

    try {
      await destinationSqs.sendMessage(sendMessageParams).promise();

      // Delete the received message from the source queue after processing
      await sourceSqs
        .deleteMessage({
          QueueUrl: sourceQueueConfig.sourceQueueUrl,
          ReceiptHandle: message.ReceiptHandle,
        })
        .promise();
      setTenantCreationRequests((prev) =>
        prev.filter((item) => item.MessageId !== message.MessageId)
      );
      setTenantId("");
      setTenantName("");
    } catch (err) {
      console.log(err);
    }
  };

  const receiveAndProcessMessage = async () => {
    try {
      setFetching(true);
      const receiveMessageParams = {
        QueueUrl: sourceQueueConfig.sourceQueueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 5,
      };

      const data = await sourceSqs
        .receiveMessage(receiveMessageParams)
        .promise();

      if (data.Messages) {
        const messageData = data.Messages;
        // //load message and parse its body and save
        setTenantCreationRequests((prev) => {
          return [...prev, ...messageData];
        });
      }

      // Continue listening for new messages recursively
      // receiveAndProcessMessage();
    } catch (err) {
      // Retry on error
      // receiveAndProcessMessage();
    }
    setFetching(false);
  };

  useEffect(() => {
    // Start processing messages from the source queue when the component mounts
    // receiveAndProcessMessage();
    const pollingInterval = setInterval(receiveAndProcessMessage, 10000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const onTenantRequestAccepted = async (message) => {
    try {
      setLoading(true);
      await processMessageAndSendToDestination(message);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onTenantRequestIgnore = (message) => {
    setTenantCreationRequests((prev) =>
      prev.filter((item) => item.MessageId === message.MessageId)
    );
  };

  return (
    <div>
      <div className="container-fluid">
        <Box mb={4} mt={12} textAlign={"center"}>
          <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
          <Typography
            fontSize={["20px", "28px", "36px"]}
            fontWeight={600}
            mb={2}
          >
            {textConstants.TENANT_LIST_PAGE_TITLE}
          </Typography>
          <Typography
            variant="p"
            display={"block"}
            fontSize={["12px", "14px", "16px"]}
          >
            {textConstants.TENANT_LIST_PAGE_DESC}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={2}
            p={2}
            textAlign={"left"}
            maxWidth={"600px"}
            margin={"auto"}
            fontSize={["12px", "14px", "16px"]}
          >
            <Typography
              variant="p"
              fontWeight={600}
              fontSize={["12px", "14px", "16px"]}
            >
              {textConstants.TENANT_LIST_PAGE_DESC_TWO}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            mt={4}
            border={"1px solid #ccc"}
            p={4}
            borderRadius={4}
          >
            <Typography fontSize={["16px", "20px"]} fontWeight={500} mb={2}>
              Tenant Requests
            </Typography>
            {fetching ? (
              <Typography
                variant="body1"
                paragraph
                fontWeight={600}
                fontSize={"20px"}
                color={"#bbb"}
              >
                ... Fetching ThriveStack Requests
              </Typography>
            ) : null}

            {!tenantCreationRequests.length ? (
              <Typography
                variant="body1"
                paragraph
                fontWeight={600}
                fontSize={"20px"}
                color={"#bbb"}
              >
                No new tenant creation request received
              </Typography>
            ) : null}
            <Box>
              <Grid container spacing={calculateSpacing(width, theme)}>
                {tenantCreationRequests.map((item) => {
                  const element = JSON.parse(item.Body);
                  return (
                    <Grid
                      item
                      xs={12}
                      key={element.workflowRuntimeId}
                      data-aos="zoom-in-up"
                      alignContent={"center"}
                      justifyItems={"center"}
                    >
                      <Box
                        display={"flex"}
                        width="100%"
                        justifyContent="space-between"
                        alignItems={"center"}
                        flexDirection={"column"}
                        gap={1}
                        p={2}
                        sx={{ border: "1px solid #aaa", borderRadius: 2 }}
                      >
                        <Typography
                          variant="body1"
                          paragraph
                          fontWeight={600}
                          fontSize={"20px"}
                        >
                          Tenant Create Request from ThriveStack
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Tenant Payload Data
                        </Typography>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          maxWidth={800}
                          textAlign={"left"}
                        >
                          {Object.keys(element).map((keyName) => {
                            return (
                              <Typography variant="body1" paragraph>
                                <b>{keyName}:</b> {element[keyName]}
                              </Typography>
                            );
                          })}
                        </Box>
                        <Box
                          width={"100%"}
                          borderBottom={"1px solid #aaa"}
                          mb={2}
                        />
                        <Typography variant="body1" paragraph>
                          Acknowledge Request
                        </Typography>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          maxWidth={400}
                          width={"100%"}
                          gap={2}
                        >
                          <TextField
                            label="Tenant Id"
                            name="tenantId"
                            size="small"
                            fullWidth
                            value={tenantId}
                            onChange={(e) => {
                              setTenantId(e.target.value);
                            }}
                          />
                          <TextField
                            label="Tenant Name"
                            name="tenantName"
                            size="small"
                            fullWidth
                            value={tenantName}
                            onChange={(e) => {
                              setTenantName(e.target.value);
                            }}
                          />
                        </Box>
                        {(!tenantId.length || !tenantName.length) && (
                          <Typography
                            variant="body1"
                            fontSize={"12px"}
                            paragraph
                          >
                            Add tenant id and tenant name to acknowledge.
                          </Typography>
                        )}
                        <Box
                          display={"flex"}
                          justifyContent="space-between"
                          alignItems={"center"}
                          my={4}
                          gap={2}
                          width={"100%"}
                          maxWidth={600}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            fullWidth
                            disabled={
                              loading || !tenantId.length || !tenantName.length
                            }
                            onClick={() => onTenantRequestAccepted(item)}
                          >
                            Acknowledge Back to ThriveStack System
                          </Button>
                        </Box>
                        <Typography variant="body1" paragraph>
                          By clicking the 'Acknowledge' button above,
                          SaasBuilder is confirming to the ThriveStack system
                          that they have successfully created a tenant in their
                          system and have sent an acknowledgment message to
                          ThriveStack along with the tenant details.
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
}

TenantRequestsList.propTypes = {};

export default withTheme(TenantRequestsList);
