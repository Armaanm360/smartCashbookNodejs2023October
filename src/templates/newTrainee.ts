import { projectLogo, projectName, projectURL } from "./templateConstants";

export const newTrainee = (email: string, password: string) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${projectName} TRAINEE</title>
       <style>
    /* Reset default styles */
    body, p {
      margin: 0;
      padding: 0;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    
    /* Header */
    .header {
      background-color: #f4f4f4;
      padding: 20px;
      text-align: center;
    }
    
    /* Content */
    .content {
      padding: 20px;
      border: 1px solid #ccc;
    }
    
    /* Button */
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
    </head>
    <body
      style="
        font-family: Helvetica, Arial, sans-serif;
        margin: 0px;
        padding: 0px;
        background-color: #ffffff;
      "
    >
      <div class="container">
    <div class="header">
      <h1>Welcome to BAB Membership!</h1>
    </div>
    <div class="content">
      <p>Hello [Member Name],</p>
      <br/>
      <p>Thank you for joining BAB Membership! We're excited to have you on board.</p>
      <br/>
      <p>Your membership account has been created successfully. You can now access your account using the following credentials:</p>
      <p>Email: ${email}</p>
      <p>Password: ${password}</p>
      <br/>
      <p>Please click the button below to log in to your account:</p>
      <p><a class="button" href="">Log In</a></p>
      <br/>
      <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
      <div style="text-align: left">
                        <div style="padding-bottom: 20px">
                          <img
                            src="${projectLogo}"
                            alt="${projectName}"
                            style="width: 100px"
                          />
                        </div>
                      </div>
                      <div
                        style="
                          padding-top: 20px;
                          color: rgb(153, 153, 153);
                          text-align: center;
                        "
                      >
                        <a href="${projectURL}" style="padding-bottom: 16px; text-decoration: none; font-weight: bold;">${projectURL}<a/>
                      </div>
      <p>Best regards,</p>
      <p>${projectName}</p>
    </div>
  </div>
    </body>
  </html>
  `;
};
