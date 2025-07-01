// import { FullConfig } from "@playwright/test";
import * as dotenv from "dotenv";
import path from "path";


async function globalSetup() {
// read the env variable from the command line or default to 'local'
const envName = process.env.ENV || "local";  //local or dev user provided
const envFile = `.env.${envName}`;
const envPath = path.resolve(`env/${envFile}`);

// Load the environment variables from the selected file
dotenv.config({path: envPath});

console.log("GLOBAL setup started .....");
console.log(`Loaded environment: ${envName}`);
}

export default globalSetup;