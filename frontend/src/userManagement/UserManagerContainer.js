// Importing React and useState, useEffect hooks
import React, { useEffect, useState } from "react";
import MemberView from "./MemberView";

// Defining the UserManager component
const UserManager = () => {
    useEffect(() => {

        const fetchData = async () => {
            if (localStorage.getItem("TSManagementToken") == null) {
                try {
                    const thrivestackResponse = await fetch('https://api.app.thrivestack.ai/api/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            key_id: "02c48de4-08fd-42b6-9751-7ebf0ecdcf08",
                            private_key: "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAqeNnuW0j/tH8F3/LYnVuNSmrB0Bh6vIl3IAg7qJMg6zVCo6r\n7p/8qsKMWvjOCYfvj2nFVrniuYpbWtxVPHOE5JGFd+iFrdghQ+8nLdUZQmXIbLZb\ndx4yoOWZnSy4WLpS0CaaVdKFPmLGeE8KwI7AomY47a+zbZAzGyT+J8g3pf3mhkoF\nZ+tKKMkeIHSP9fgCc3HV9k437aWmG0OtFYB5Z8lTRijVLQSlllosNHl0/qNokJD5\n2gO0OnirczpuH337df6Tty3sI7h4UYTu8ILZtACiVTHn1whwbYZIsh45zJPpm+4e\nQY1hQP/5DdztWvflQb4Jntw9TQ3tdwnQON3ECwIDAQABAoIBAB6eof9FsIspBaqm\nmd2xFJ/4Vp8D96IE6tYHMehQ0EGbUPqKJGrp4vxT/EAZP+lv2rmacrri3f5a9YQ2\n2hX/LCCWKdwmyJFAtx4raIBWPCs/dRRC+dFKXA2r1DgD62XyjyJ9EqwNOX65BtSA\nSovSLt4WVoRgepJwvwVRcY1yBLWh9kVVLObdZabxy43jKppVmggkuzju8PxSocPY\n+CqTwKOd8beG54ZjJSS3gcOHfMVDYGO9SSHgN/A5UoFCdOUsmP+dQ568nOnZEIdS\nwXaq4+XCKmc3wKQSzL5RsnflHMZHLEazjaH6IP3cw/ZztBI6NmMl+DdX/tZ2z0S7\ndSC70YECgYEA2CjdoS7bMeX5OXYHk0w7RW13rJ7wPILz1Th49uwtaF2izqVPxYpm\nevBnQFAf8mpg2Je3jI9qzgxGmwNVQGyshcET87ay/qrn9StF24a7S1xbP1cTtA+n\nwnRkPhAxfJY/Lb+A11kTJA3tfS9jtDn7xsH+LiL+46Zo+aJwDAM2WjsCgYEAyTNN\np36gVpWzfa7f7eSYqrGRBLisvjqAnduJhO4z3+Y0ReshCRr5doGcb68YDS69txbO\n6xlTxEZEuv1xDUis6mONA8ilU80fWZ2i1zfsmrmmQAanWe1GImAoAZUETgAQMTNh\n05ND0bPFYCUMMn+aOyoXK2KL0BrcqFUEtBSw0HECgYEApfg6s9fWVanOgmAt0Ntn\nZxd2HAStUMj7j2uc9XrCIrBCoYgsh/CMXzjXDnp3DRrA4Y0cUcCMsUibrcoRWzYW\nAV0OhMJzDTcMgyKGsNfyVxrCtQ+XAVpD5PqZPU4RsSdruySfOLocCELpZoVMeMVM\nnH+3OpWEQCc10vb2MUMGKKECgYAKsvS1LHGgSROjYlI8F0TbBtg8VQmyj+/Y9Ryp\n+fS+OkKbWTaHgmyzlY7ZDYmM4ehqvQbBz7X5oPb0rpd9aljvmd2czuWjwCujm1NW\neH3XeHnTu8bYbFqnZ0+ZTfBNqYky5JWWJ6WamCGtzCqK4Og1rzZOM05WAaesN+Ep\nJlSEsQKBgEWRdExnQSMkjW3YqU91/FS6t+wLL24aigkR5hliSMJNk2yUjLQ2M76d\n11J6uf7kQffSl/T+oq14c1euWooHTCoF8kafY9GuFSaQ5XRnuEZSypkQvf9dEFxY\nYfS8epsyt8rWIDCFtwiCqFYxrP35FlQEdVdo1pqphjmYQx2X9FlI\n-----END RSA PRIVATE KEY-----\n",
                            scopes: ["telemetry_apis", "workflow_trigger_api"],
                            expiry: 360
                        })
                    });
                    const data = await thrivestackResponse.json();
                    localStorage.setItem("TSManagementToken", data.token)
                    console.log("mngtToken", data)
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchData();

    }, [])

    return (
        <div>
            {/* Rendering the MemberView component */}
            <MemberView />
        </div>
    );
};

// Exporting the UserManager component as default
export default UserManager;
