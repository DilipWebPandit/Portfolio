import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const brevoClient = new Brevo.TransactionalEmailsApi();

// Set API key authentication
brevoClient.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export default brevoClient;
