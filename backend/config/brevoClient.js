import Brevo from "@getbrevo/brevo";
import dotenv from "dotenv";
dotenv.config();

const brevoClient = new Brevo.TransactionalEmailsApi();
brevoClient.authentications["apiKey"].apiKey = process.env.BREVO_API_KEY;

export default brevoClient;
