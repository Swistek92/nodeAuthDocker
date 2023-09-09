"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRegistrationEmail = void 0;
const google_auth_library_1 = require("google-auth-library");
const logger_1 = __importDefault(require("./logger"));
const nodemailer = require("nodemailer");
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.REFRESH_TOKEN_MAIL}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const SendRegistrationEmail = async (to, url, txt) => {
    const oAuth2Client = new google_auth_library_1.OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    try {
        const access_token = await oAuth2Client.getAccessToken();
        logger_1.default.info("acces tokken" + access_token);
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: SENDER_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                access_token,
            },
        });
        const mailOptions = {
            from: SENDER_MAIL,
            to: to,
            subject: "Memes",
            html: `
      <div>
      <h1> wellcome on swistoklik.pl </h1>
      
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Memes World.</h2>
      <p>Congratulations! You're almost set to start!.
                  Just click the button below to validate your email address!.
                  </p>
                  
                  <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                  
                  <p>If the button doesn't work for any reason, you can also click on the link below:</p>
          
                  <div>${url}</div>
                </div>
              </div>
            `,
        };
        await transport.sendMail(mailOptions);
    }
    catch (error) {
        logger_1.default.error(error);
        throw new Error(error);
    }
};
exports.SendRegistrationEmail = SendRegistrationEmail;
