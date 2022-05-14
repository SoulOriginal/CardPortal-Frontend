import { body } from "express-validator";
import { validateRequest } from "../../common";
import { requireAuth } from "../../common/middlewares/require-auth";
import { currentUser } from "../../common/middlewares/current-user";

const md5 = require("md5");
const nodeMailer = require("nodemailer");
const express = require("express");
const User = require("../../../models/userSchema");
const router = express.Router();

router.post(
  "/user/restore/email",
  [
    body("email")
      .isEmail()
      .notEmpty()
      .withMessage({ payload: "Invalid credentials" }),
    body("type").notEmpty().withMessage({ payload: "Invalid credentials" }),
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { email, type } = req.body;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        res.json({ payload: "email not found, email not send" });
        return;
      }
      console.log(existingUser);
      if (email === existingUser.email) {
        let transporter = nodeMailer.createTransport({
          host: "ssl://mail.adm.tools",
          port: 465,
          secure: true,
          service: "gmail",
          auth: {
            user: "booster.fun.control@gmail.com",
            pass: "bbuiymujnzybiccq",
          },
        });
        var blink = process.env.APP_URL;
        var SecretCode = md5(Date.now());
        if (type === "restore") {
          var mailOptions = {
            from: "booster.fun.control@gmail.com",
            to: email,
            subject: "Restore access your account CardPortal",
            text: `Follow this link to restore your password ${blink}password/reset/auth?email=${email}&token=${SecretCode}`,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html
              xmlns="http://www.w3.org/1999/xhtml"
              xmlns:o="urn:schemas-microsoft-com:office:office"
              style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
            >
              <head>
                <meta charset="UTF-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta content="telephone=no" name="format-detection" />
                <title>Новое письмо</title>
                <style type="text/css">
                  .rollover div {
                    font-size: 0;
                  }
                  #outlook a {
                    padding: 0;
                  }
                  .es-button {
                    mso-style-priority: 100 !important;
                    text-decoration: none !important;
                  }
                  a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                  }
                  .es-desk-hidden {
                    display: none;
                    float: left;
                    overflow: hidden;
                    width: 0;
                    max-height: 0;
                    line-height: 0;
                    mso-hide: all;
                  }
                  [data-ogsb] .es-button {
                    border-width: 0 !important;
                    padding: 10px 30px 10px 30px !important;
                  }
                  @media only screen and (max-width: 600px) {
                    p,
                    ul li,
                    ol li,
                    a {
                      line-height: 150% !important;
                    }
                    h1 {
                      font-size: 36px !important;
                      text-align: center;
                      line-height: 120%;
                    }
                    h2 {
                      font-size: 26px !important;
                      text-align: center;
                      line-height: 120%;
                    }
                    h3 {
                      font-size: 20px !important;
                      text-align: center;
                      line-height: 120%;
                    }
                    .es-header-body h1 a,
                    .es-content-body h1 a,
                    .es-footer-body h1 a {
                      font-size: 36px !important;
                    }
                    .es-header-body h2 a,
                    .es-content-body h2 a,
                    .es-footer-body h2 a {
                      font-size: 26px !important;
                    }
                    .es-header-body h3 a,
                    .es-content-body h3 a,
                    .es-footer-body h3 a {
                      font-size: 20px !important;
                    }
                    .es-menu td a {
                      font-size: 14px !important;
                    }
                    .es-header-body p,
                    .es-header-body ul li,
                    .es-header-body ol li,
                    .es-header-body a {
                      font-size: 14px !important;
                    }
                    .es-content-body p,
                    .es-content-body ul li,
                    .es-content-body ol li,
                    .es-content-body a {
                      font-size: 16px !important;
                    }
                    .es-footer-body p,
                    .es-footer-body ul li,
                    .es-footer-body ol li,
                    .es-footer-body a {
                      font-size: 14px !important;
                    }
                    .es-infoblock p,
                    .es-infoblock ul li,
                    .es-infoblock ol li,
                    .es-infoblock a {
                      font-size: 12px !important;
                    }
                    *[class="gmail-fix"] {
                      display: none !important;
                    }
                    .es-m-txt-c,
                    .es-m-txt-c h1,
                    .es-m-txt-c h2,
                    .es-m-txt-c h3 {
                      text-align: center !important;
                    }
                    .es-m-txt-r,
                    .es-m-txt-r h1,
                    .es-m-txt-r h2,
                    .es-m-txt-r h3 {
                      text-align: right !important;
                    }
                    .es-m-txt-l,
                    .es-m-txt-l h1,
                    .es-m-txt-l h2,
                    .es-m-txt-l h3 {
                      text-align: left !important;
                    }
                    .es-m-txt-r img,
                    .es-m-txt-c img,
                    .es-m-txt-l img {
                      display: inline !important;
                    }
                    .es-button-border {
                      display: block !important;
                    }
                    a.es-button,
                    button.es-button {
                      font-size: 20px !important;
                      display: block !important;
                      border-left-width: 0px !important;
                      border-right-width: 0px !important;
                    }
                    .es-adaptive table,
                    .es-left,
                    .es-right {
                      width: 100% !important;
                    }
                    .es-content table,
                    .es-header table,
                    .es-footer table,
                    .es-content,
                    .es-footer,
                    .es-header {
                      width: 100% !important;
                      max-width: 600px !important;
                    }
                    .es-adapt-td {
                      display: block !important;
                      width: 100% !important;
                    }
                    .adapt-img {
                      width: 100% !important;
                      height: auto !important;
                    }
                    .es-m-p0 {
                      padding: 0 !important;
                    }
                    .es-m-p0r {
                      padding-right: 0 !important;
                    }
                    .es-m-p0l {
                      padding-left: 0 !important;
                    }
                    .es-m-p0t {
                      padding-top: 0 !important;
                    }
                    .es-m-p0b {
                      padding-bottom: 0 !important;
                    }
                    .es-m-p20b {
                      padding-bottom: 20px !important;
                    }
                    .es-mobile-hidden,
                    .es-hidden {
                      display: none !important;
                    }
                    tr.es-desk-hidden,
                    td.es-desk-hidden,
                    table.es-desk-hidden {
                      width: auto !important;
                      overflow: visible !important;
                      float: none !important;
                      max-height: inherit !important;
                      line-height: inherit !important;
                    }
                    tr.es-desk-hidden {
                      display: table-row !important;
                    }
                    table.es-desk-hidden {
                      display: table !important;
                    }
                    td.es-desk-menu-hidden {
                      display: table-cell !important;
                    }
                    .es-menu td {
                      width: 1% !important;
                    }
                    table.es-table-not-adapt,
                    .esd-block-html table {
                      width: auto !important;
                    }
                    table.es-social {
                      display: inline-block !important;
                    }
                    table.es-social td {
                      display: inline-block !important;
                    }
                    .es-m-p5 {
                      padding: 5px !important;
                    }
                    .es-m-p5t {
                      padding-top: 5px !important;
                    }
                    .es-m-p5b {
                      padding-bottom: 5px !important;
                    }
                    .es-m-p5r {
                      padding-right: 5px !important;
                    }
                    .es-m-p5l {
                      padding-left: 5px !important;
                    }
                    .es-m-p10 {
                      padding: 10px !important;
                    }
                    .es-m-p10t {
                      padding-top: 10px !important;
                    }
                    .es-m-p10b {
                      padding-bottom: 10px !important;
                    }
                    .es-m-p10r {
                      padding-right: 10px !important;
                    }
                    .es-m-p10l {
                      padding-left: 10px !important;
                    }
                    .es-m-p15 {
                      padding: 15px !important;
                    }
                    .es-m-p15t {
                      padding-top: 15px !important;
                    }
                    .es-m-p15b {
                      padding-bottom: 15px !important;
                    }
                    .es-m-p15r {
                      padding-right: 15px !important;
                    }
                    .es-m-p15l {
                      padding-left: 15px !important;
                    }
                    .es-m-p20 {
                      padding: 20px !important;
                    }
                    .es-m-p20t {
                      padding-top: 20px !important;
                    }
                    .es-m-p20r {
                      padding-right: 20px !important;
                    }
                    .es-m-p20l {
                      padding-left: 20px !important;
                    }
                    .es-m-p25 {
                      padding: 25px !important;
                    }
                    .es-m-p25t {
                      padding-top: 25px !important;
                    }
                    .es-m-p25b {
                      padding-bottom: 25px !important;
                    }
                    .es-m-p25r {
                      padding-right: 25px !important;
                    }
                    .es-m-p25l {
                      padding-left: 25px !important;
                    }
                    .es-m-p30 {
                      padding: 30px !important;
                    }
                    .es-m-p30t {
                      padding-top: 30px !important;
                    }
                    .es-m-p30b {
                      padding-bottom: 30px !important;
                    }
                    .es-m-p30r {
                      padding-right: 30px !important;
                    }
                    .es-m-p30l {
                      padding-left: 30px !important;
                    }
                    .es-m-p35 {
                      padding: 35px !important;
                    }
                    .es-m-p35t {
                      padding-top: 35px !important;
                    }
                    .es-m-p35b {
                      padding-bottom: 35px !important;
                    }
                    .es-m-p35r {
                      padding-right: 35px !important;
                    }
                    .es-m-p35l {
                      padding-left: 35px !important;
                    }
                    .es-m-p40 {
                      padding: 40px !important;
                    }
                    .es-m-p40t {
                      padding-top: 40px !important;
                    }
                    .es-m-p40b {
                      padding-bottom: 40px !important;
                    }
                    .es-m-p40r {
                      padding-right: 40px !important;
                    }
                    .es-m-p40l {
                      padding-left: 40px !important;
                    }
                  }
                </style>
              </head>
              <body
                style="
                  width: 100%;
                  font-family: arial, 'helvetica neue', helvetica, sans-serif;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  padding: 0;
                  margin: 0;
                "
              >
                <div class="es-wrapper-color" style="background-color: #fafafa">
                  <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#fafafa"></v:fill>
                    </v:background>
                  <![endif]-->
                  <table
                    class="es-wrapper"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      padding: 0;
                      margin: 0;
                      width: 100%;
                      height: 100%;
                      background-repeat: repeat;
                      background-position: center top;
                      background-color: #fafafa;
                    "
                  >
                    <tr>
                      <td valign="top" style="padding: 0; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-content"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                          "
                        >
                          <tr>
                            <td
                              class="es-info-area"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 600px;
                                "
                                bgcolor="#FFFFFF"
                              >
                                <tr>
                                  <td align="left" style="padding: 20px; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    ></table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-header"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                            background-color: transparent;
                            background-repeat: repeat;
                            background-position: center top;
                          "
                        >
                          <tr>
                            <td align="center" style="padding: 0; margin: 0">
                              <table
                                bgcolor="#ffffff"
                                class="es-header-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 600px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          class="es-m-p0r"
                                          valign="top"
                                          align="center"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            bgcolor="#280c0b"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: separate;
                                              border-spacing: 0px;
                                              background-color: #280c0b;
                                              border-radius: 12px;
                                            "
                                            role="presentation"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 15px;
                                                  font-size: 0px;
                                                "
                                              >
                                                <a
                                                  target="_blank"
                                                  style="
                                                    -webkit-text-size-adjust: none;
                                                    -ms-text-size-adjust: none;
                                                    mso-line-height-rule: exactly;
                                                    text-decoration: underline;
                                                    color: #666666;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <h1
                                                    style="color: #5c68e2; font-size: 40px"
                                                  >
                                                    CardPortal
                                                  </h1>
                                                </a>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-content"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                          "
                        >
                          <tr>
                            <td align="center" style="padding: 0; margin: 0">
                              <table
                                bgcolor="#ffffff"
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: #ffffff;
                                  width: 600px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      padding-top: 30px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 10px;
                                                  font-size: 0px;
                                                "
                                              >
                                                <img
                                                  src="https://lvgosg.stripocdn.email/content/guids/CABINET_a3448362093fd4087f87ff42df4565c1/images/78501618239341906.png"
                                                  alt
                                                  style="
                                                    display: block;
                                                    border: 0;
                                                    outline: none;
                                                    text-decoration: none;
                                                    -ms-interpolation-mode: bicubic;
                                                  "
                                                  width="100"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-bottom: 10px;
                                                "
                                              >
                                                <h1
                                                  style="
                                                    margin: 0;
                                                    line-height: 46px;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    font-size: 46px;
                                                    font-style: normal;
                                                    font-weight: bold;
                                                    color: #333333;
                                                  "
                                                >
                                                Recover password
                                                </h1>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                class="es-m-p0r es-m-p0l"
                                                style="
                                                  margin: 0;
                                                  padding-top: 5px;
                                                  padding-bottom: 5px;
                                                  padding-left: 40px;
                                                  padding-right: 40px;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    -webkit-text-size-adjust: none;
                                                    -ms-text-size-adjust: none;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    line-height: 21px;
                                                    color: #333333;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  We will keep you updated with the latest events and news!
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: separate;
                                              border-spacing: 0px;
                                              border-left: 2px dashed #cccccc;
                                              border-right: 2px dashed #cccccc;
                                              border-top: 2px dashed #cccccc;
                                              border-bottom: 2px dashed #cccccc;
                                              border-radius: 5px;
                                            "
                                            role="presentation"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 20px;
                                                  padding-left: 20px;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <h2
                                                  style="
                                                    margin: 0;
                                                    line-height: 31px;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    font-size: 26px;
                                                    font-style: normal;
                                                    font-weight: bold;
                                                    color: #333333;
                                                  "
                                                >
                                                  Your confirmation code
                                                </h2>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 20px;
                                                  padding-left: 20px;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <h1
                                                  style="
                                                    margin: 0;
                                                    line-height: 55px;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    font-size: 46px;
                                                    font-style: normal;
                                                    font-weight: bold;
                                                    color: #5c68e2;
                                                  "
                                                >
                                                  <strong>${SecretCode}</strong>
                                                </h1>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      padding-bottom: 30px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: separate;
                                              border-spacing: 0px;
                                              border-radius: 5px;
                                            "
                                            role="presentation"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 10px;
                                                "
                                              >
                                                <span
                                                  class="es-button-border"
                                                  style="
                                                    border-style: solid;
                                                    border-color: #2cb543;
                                                    background: #5c68e2;
                                                    border-width: 0px;
                                                    display: inline-block;
                                                    border-radius: 6px;
                                                    width: auto;
                                                  "
                                                  ><a
                                                    href="${blink}password/reset/auth?email=${email}&token=${SecretCode}"
                                                    class="es-button"
                                                    target="_blank"
                                                    style="
                                                      mso-style-priority: 100 !important;
                                                      text-decoration: none;
                                                      -webkit-text-size-adjust: none;
                                                      -ms-text-size-adjust: none;
                                                      mso-line-height-rule: exactly;
                                                      color: #ffffff;
                                                      font-size: 20px;
                                                      border-style: solid;
                                                      border-color: #5c68e2;
                                                      border-width: 10px 30px 10px 30px;
                                                      display: inline-block;
                                                      background: #5c68e2;
                                                      border-radius: 6px;
                                                      font-family: arial, 'helvetica neue',
                                                        helvetica, sans-serif;
                                                      font-weight: normal;
                                                      font-style: normal;
                                                      line-height: 24px;
                                                      width: auto;
                                                      text-align: center;
                                                      border-left-width: 30px;
                                                      border-right-width: 30px;
                                                    "
                                                    >Restore access</a
                                                  ></span
                                                >
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-footer"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                            background-color: transparent;
                            background-repeat: repeat;
                            background-position: center top;
                          "
                        >
                          <tr>
                            <td align="center" style="padding: 0; margin: 0">
                              <table
                                class="es-footer-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 640px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 20px;
                                      padding-bottom: 20px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          style="padding: 0; margin: 0; width: 600px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 15px;
                                                  padding-bottom: 15px;
                                                  font-size: 0;
                                                "
                                              >
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  class="es-table-not-adapt es-social"
                                                  role="presentation"
                                                  style="
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    border-collapse: collapse;
                                                    border-spacing: 0px;
                                                  "
                                                >
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-right: 40px;
                                                      "
                                                    >
                                                      <img
                                                        title="Facebook"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                        alt="Fb"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-right: 40px;
                                                      "
                                                    >
                                                      <img
                                                        title="Twitter"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                                        alt="Tw"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-right: 40px;
                                                      "
                                                    >
                                                      <img
                                                        title="Instagram"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                                        alt="Inst"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="padding: 0; margin: 0"
                                                    >
                                                      <img
                                                        title="Youtube"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                                        alt="Yt"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="padding: 0; margin: 0">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  class="es-menu"
                                                  role="presentation"
                                                  style="
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    border-collapse: collapse;
                                                    border-spacing: 0px;
                                                  "
                                                >
                                                  <tr class="links">
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      width="33.33%"
                                                      style="
                                                        margin: 0;
                                                        padding-left: 5px;
                                                        padding-right: 5px;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        border: 0;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          display: block;
                                                          color: #999999;
                                                          font-size: 12px;
                                                        "
                                                        >Visit Us
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      width="33.33%"
                                                      style="
                                                        margin: 0;
                                                        padding-left: 5px;
                                                        padding-right: 5px;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        border: 0;
                                                        border-left: 1px solid #cccccc;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          display: block;
                                                          color: #999999;
                                                          font-size: 12px;
                                                        "
                                                        >Privacy Policy</a
                                                      >
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      width="33.33%"
                                                      style="
                                                        margin: 0;
                                                        padding-left: 5px;
                                                        padding-right: 5px;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        border: 0;
                                                        border-left: 1px solid #cccccc;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          display: block;
                                                          color: #999999;
                                                          font-size: 12px;
                                                        "
                                                        >Terms of Use</a
                                                      >
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-content"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                          "
                        >
                          <tr>
                            <td
                              class="es-info-area"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 600px;
                                "
                                bgcolor="#FFFFFF"
                              >
                                <tr>
                                  <td align="left" style="padding: 20px; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="padding: 0; margin: 0; display: none"
                                              ></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </body>
            </html>`,
          };
        } else if (type === "verified") {
          var mailOptions = {
            from: "booster.fun.control@gmail.com",
            to: email,
            subject: "Verified your accaunt CardPortal",
            text: `Follow this link to verified your accaunt ${blink}email/verify?email=${email}&token=${SecretCode}`,
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html
              xmlns="http://www.w3.org/1999/xhtml"
              xmlns:o="urn:schemas-microsoft-com:office:office"
              style="font-family: arial, 'helvetica neue', helvetica, sans-serif"
            >
              <head>
                <meta charset="UTF-8" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta content="telephone=no" name="format-detection" />
                <title>Новое письмо</title>
                <style type="text/css">
                  .rollover div {
                    font-size: 0;
                  }
                  #outlook a {
                    padding: 0;
                  }
                  .es-button {
                    mso-style-priority: 100 !important;
                    text-decoration: none !important;
                  }
                  a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                    font-size: inherit !important;
                    font-family: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                  }
                  .es-desk-hidden {
                    display: none;
                    float: left;
                    overflow: hidden;
                    width: 0;
                    max-height: 0;
                    line-height: 0;
                    mso-hide: all;
                  }
                  [data-ogsb] .es-button {
                    border-width: 0 !important;
                    padding: 10px 30px 10px 30px !important;
                  }
                  @media only screen and (max-width: 600px) {
                    p,
                    ul li,
                    ol li,
                    a {
                      line-height: 150% !important;
                    }
                    h1 {
                      font-size: 36px !important;
                      text-align: center;
                      line-height: 120%;
                    }
                    h2 {
                      font-size: 26px !important;
                      text-align: center;
                      line-height: 120%;
                    }
                    h3 {
                      font-size: 20px !important;
                      text-align: center;
                      line-height: 120%;
                    }
                    .es-header-body h1 a,
                    .es-content-body h1 a,
                    .es-footer-body h1 a {
                      font-size: 36px !important;
                    }
                    .es-header-body h2 a,
                    .es-content-body h2 a,
                    .es-footer-body h2 a {
                      font-size: 26px !important;
                    }
                    .es-header-body h3 a,
                    .es-content-body h3 a,
                    .es-footer-body h3 a {
                      font-size: 20px !important;
                    }
                    .es-menu td a {
                      font-size: 14px !important;
                    }
                    .es-header-body p,
                    .es-header-body ul li,
                    .es-header-body ol li,
                    .es-header-body a {
                      font-size: 14px !important;
                    }
                    .es-content-body p,
                    .es-content-body ul li,
                    .es-content-body ol li,
                    .es-content-body a {
                      font-size: 16px !important;
                    }
                    .es-footer-body p,
                    .es-footer-body ul li,
                    .es-footer-body ol li,
                    .es-footer-body a {
                      font-size: 14px !important;
                    }
                    .es-infoblock p,
                    .es-infoblock ul li,
                    .es-infoblock ol li,
                    .es-infoblock a {
                      font-size: 12px !important;
                    }
                    *[class="gmail-fix"] {
                      display: none !important;
                    }
                    .es-m-txt-c,
                    .es-m-txt-c h1,
                    .es-m-txt-c h2,
                    .es-m-txt-c h3 {
                      text-align: center !important;
                    }
                    .es-m-txt-r,
                    .es-m-txt-r h1,
                    .es-m-txt-r h2,
                    .es-m-txt-r h3 {
                      text-align: right !important;
                    }
                    .es-m-txt-l,
                    .es-m-txt-l h1,
                    .es-m-txt-l h2,
                    .es-m-txt-l h3 {
                      text-align: left !important;
                    }
                    .es-m-txt-r img,
                    .es-m-txt-c img,
                    .es-m-txt-l img {
                      display: inline !important;
                    }
                    .es-button-border {
                      display: block !important;
                    }
                    a.es-button,
                    button.es-button {
                      font-size: 20px !important;
                      display: block !important;
                      border-left-width: 0px !important;
                      border-right-width: 0px !important;
                    }
                    .es-adaptive table,
                    .es-left,
                    .es-right {
                      width: 100% !important;
                    }
                    .es-content table,
                    .es-header table,
                    .es-footer table,
                    .es-content,
                    .es-footer,
                    .es-header {
                      width: 100% !important;
                      max-width: 600px !important;
                    }
                    .es-adapt-td {
                      display: block !important;
                      width: 100% !important;
                    }
                    .adapt-img {
                      width: 100% !important;
                      height: auto !important;
                    }
                    .es-m-p0 {
                      padding: 0 !important;
                    }
                    .es-m-p0r {
                      padding-right: 0 !important;
                    }
                    .es-m-p0l {
                      padding-left: 0 !important;
                    }
                    .es-m-p0t {
                      padding-top: 0 !important;
                    }
                    .es-m-p0b {
                      padding-bottom: 0 !important;
                    }
                    .es-m-p20b {
                      padding-bottom: 20px !important;
                    }
                    .es-mobile-hidden,
                    .es-hidden {
                      display: none !important;
                    }
                    tr.es-desk-hidden,
                    td.es-desk-hidden,
                    table.es-desk-hidden {
                      width: auto !important;
                      overflow: visible !important;
                      float: none !important;
                      max-height: inherit !important;
                      line-height: inherit !important;
                    }
                    tr.es-desk-hidden {
                      display: table-row !important;
                    }
                    table.es-desk-hidden {
                      display: table !important;
                    }
                    td.es-desk-menu-hidden {
                      display: table-cell !important;
                    }
                    .es-menu td {
                      width: 1% !important;
                    }
                    table.es-table-not-adapt,
                    .esd-block-html table {
                      width: auto !important;
                    }
                    table.es-social {
                      display: inline-block !important;
                    }
                    table.es-social td {
                      display: inline-block !important;
                    }
                    .es-m-p5 {
                      padding: 5px !important;
                    }
                    .es-m-p5t {
                      padding-top: 5px !important;
                    }
                    .es-m-p5b {
                      padding-bottom: 5px !important;
                    }
                    .es-m-p5r {
                      padding-right: 5px !important;
                    }
                    .es-m-p5l {
                      padding-left: 5px !important;
                    }
                    .es-m-p10 {
                      padding: 10px !important;
                    }
                    .es-m-p10t {
                      padding-top: 10px !important;
                    }
                    .es-m-p10b {
                      padding-bottom: 10px !important;
                    }
                    .es-m-p10r {
                      padding-right: 10px !important;
                    }
                    .es-m-p10l {
                      padding-left: 10px !important;
                    }
                    .es-m-p15 {
                      padding: 15px !important;
                    }
                    .es-m-p15t {
                      padding-top: 15px !important;
                    }
                    .es-m-p15b {
                      padding-bottom: 15px !important;
                    }
                    .es-m-p15r {
                      padding-right: 15px !important;
                    }
                    .es-m-p15l {
                      padding-left: 15px !important;
                    }
                    .es-m-p20 {
                      padding: 20px !important;
                    }
                    .es-m-p20t {
                      padding-top: 20px !important;
                    }
                    .es-m-p20r {
                      padding-right: 20px !important;
                    }
                    .es-m-p20l {
                      padding-left: 20px !important;
                    }
                    .es-m-p25 {
                      padding: 25px !important;
                    }
                    .es-m-p25t {
                      padding-top: 25px !important;
                    }
                    .es-m-p25b {
                      padding-bottom: 25px !important;
                    }
                    .es-m-p25r {
                      padding-right: 25px !important;
                    }
                    .es-m-p25l {
                      padding-left: 25px !important;
                    }
                    .es-m-p30 {
                      padding: 30px !important;
                    }
                    .es-m-p30t {
                      padding-top: 30px !important;
                    }
                    .es-m-p30b {
                      padding-bottom: 30px !important;
                    }
                    .es-m-p30r {
                      padding-right: 30px !important;
                    }
                    .es-m-p30l {
                      padding-left: 30px !important;
                    }
                    .es-m-p35 {
                      padding: 35px !important;
                    }
                    .es-m-p35t {
                      padding-top: 35px !important;
                    }
                    .es-m-p35b {
                      padding-bottom: 35px !important;
                    }
                    .es-m-p35r {
                      padding-right: 35px !important;
                    }
                    .es-m-p35l {
                      padding-left: 35px !important;
                    }
                    .es-m-p40 {
                      padding: 40px !important;
                    }
                    .es-m-p40t {
                      padding-top: 40px !important;
                    }
                    .es-m-p40b {
                      padding-bottom: 40px !important;
                    }
                    .es-m-p40r {
                      padding-right: 40px !important;
                    }
                    .es-m-p40l {
                      padding-left: 40px !important;
                    }
                  }
                </style>
              </head>
              <body
                style="
                  width: 100%;
                  font-family: arial, 'helvetica neue', helvetica, sans-serif;
                  -webkit-text-size-adjust: 100%;
                  -ms-text-size-adjust: 100%;
                  padding: 0;
                  margin: 0;
                "
              >
                <div class="es-wrapper-color" style="background-color: #fafafa">
                  <!--[if gte mso 9]>
                    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                      <v:fill type="tile" color="#fafafa"></v:fill>
                    </v:background>
                  <![endif]-->
                  <table
                    class="es-wrapper"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                      border-collapse: collapse;
                      border-spacing: 0px;
                      padding: 0;
                      margin: 0;
                      width: 100%;
                      height: 100%;
                      background-repeat: repeat;
                      background-position: center top;
                      background-color: #fafafa;
                    "
                  >
                    <tr>
                      <td valign="top" style="padding: 0; margin: 0">
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-content"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                          "
                        >
                          <tr>
                            <td
                              class="es-info-area"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 600px;
                                "
                                bgcolor="#FFFFFF"
                              >
                                <tr>
                                  <td align="left" style="padding: 20px; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    ></table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-header"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                            background-color: transparent;
                            background-repeat: repeat;
                            background-position: center top;
                          "
                        >
                          <tr>
                            <td align="center" style="padding: 0; margin: 0">
                              <table
                                bgcolor="#ffffff"
                                class="es-header-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 600px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          class="es-m-p0r"
                                          valign="top"
                                          align="center"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            bgcolor="#280c0b"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: separate;
                                              border-spacing: 0px;
                                              background-color: #280c0b;
                                              border-radius: 12px;
                                            "
                                            role="presentation"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 15px;
                                                  font-size: 0px;
                                                "
                                              >
                                                <a
                                                  target="_blank"
                                                  style="
                                                    -webkit-text-size-adjust: none;
                                                    -ms-text-size-adjust: none;
                                                    mso-line-height-rule: exactly;
                                                    text-decoration: underline;
                                                    color: #666666;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  <h1
                                                    style="color: #5c68e2; font-size: 40px"
                                                  >
                                                    CardPortal
                                                  </h1>
                                                </a>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-content"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                          "
                        >
                          <tr>
                            <td align="center" style="padding: 0; margin: 0">
                              <table
                                bgcolor="#ffffff"
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: #ffffff;
                                  width: 600px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      padding-top: 30px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 10px;
                                                  font-size: 0px;
                                                "
                                              >
                                                <img
                                                  src="https://lvgosg.stripocdn.email/content/guids/CABINET_a3448362093fd4087f87ff42df4565c1/images/78501618239341906.png"
                                                  alt
                                                  style="
                                                    display: block;
                                                    border: 0;
                                                    outline: none;
                                                    text-decoration: none;
                                                    -ms-interpolation-mode: bicubic;
                                                  "
                                                  width="100"
                                                />
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-bottom: 10px;
                                                "
                                              >
                                                <h1
                                                  style="
                                                    margin: 0;
                                                    line-height: 46px;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    font-size: 46px;
                                                    font-style: normal;
                                                    font-weight: bold;
                                                    color: #333333;
                                                  "
                                                >
                                                Confirm your mailbox
                                                </h1>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                class="es-m-p0r es-m-p0l"
                                                style="
                                                  margin: 0;
                                                  padding-top: 5px;
                                                  padding-bottom: 5px;
                                                  padding-left: 40px;
                                                  padding-right: 40px;
                                                "
                                              >
                                                <p
                                                  style="
                                                    margin: 0;
                                                    -webkit-text-size-adjust: none;
                                                    -ms-text-size-adjust: none;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    line-height: 21px;
                                                    color: #333333;
                                                    font-size: 14px;
                                                  "
                                                >
                                                  We will keep you updated with the latest events and news!
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 10px;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: separate;
                                              border-spacing: 0px;
                                              border-left: 2px dashed #cccccc;
                                              border-right: 2px dashed #cccccc;
                                              border-top: 2px dashed #cccccc;
                                              border-bottom: 2px dashed #cccccc;
                                              border-radius: 5px;
                                            "
                                            role="presentation"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 20px;
                                                  padding-left: 20px;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <h2
                                                  style="
                                                    margin: 0;
                                                    line-height: 31px;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    font-size: 26px;
                                                    font-style: normal;
                                                    font-weight: bold;
                                                    color: #333333;
                                                  "
                                                >
                                                  Your confirmation code
                                                </h2>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 20px;
                                                  padding-left: 20px;
                                                  padding-right: 20px;
                                                "
                                              >
                                                <h1
                                                  style="
                                                    margin: 0;
                                                    line-height: 55px;
                                                    mso-line-height-rule: exactly;
                                                    font-family: arial, 'helvetica neue',
                                                      helvetica, sans-serif;
                                                    font-size: 46px;
                                                    font-style: normal;
                                                    font-weight: bold;
                                                    color: #5c68e2;
                                                  "
                                                >
                                                  <strong>${SecretCode}</strong>
                                                </h1>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      padding: 0;
                                      margin: 0;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      padding-bottom: 30px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: separate;
                                              border-spacing: 0px;
                                              border-radius: 5px;
                                            "
                                            role="presentation"
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 10px;
                                                  padding-bottom: 10px;
                                                "
                                              >
                                                <span
                                                  class="es-button-border"
                                                  style="
                                                    border-style: solid;
                                                    border-color: #2cb543;
                                                    background: #5c68e2;
                                                    border-width: 0px;
                                                    display: inline-block;
                                                    border-radius: 6px;
                                                    width: auto;
                                                  "
                                                  ><a
                                                    href="${blink}email/verify?email=${email}&token=${SecretCode}"
                                                    class="es-button"
                                                    target="_blank"
                                                    style="
                                                      mso-style-priority: 100 !important;
                                                      text-decoration: none;
                                                      -webkit-text-size-adjust: none;
                                                      -ms-text-size-adjust: none;
                                                      mso-line-height-rule: exactly;
                                                      color: #ffffff;
                                                      font-size: 20px;
                                                      border-style: solid;
                                                      border-color: #5c68e2;
                                                      border-width: 10px 30px 10px 30px;
                                                      display: inline-block;
                                                      background: #5c68e2;
                                                      border-radius: 6px;
                                                      font-family: arial, 'helvetica neue',
                                                        helvetica, sans-serif;
                                                      font-weight: normal;
                                                      font-style: normal;
                                                      line-height: 24px;
                                                      width: auto;
                                                      text-align: center;
                                                      border-left-width: 30px;
                                                      border-right-width: 30px;
                                                    "
                                                    >CONFIRM MAIL</a
                                                  ></span
                                                >
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-footer"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                            background-color: transparent;
                            background-repeat: repeat;
                            background-position: center top;
                          "
                        >
                          <tr>
                            <td align="center" style="padding: 0; margin: 0">
                              <table
                                class="es-footer-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 640px;
                                "
                              >
                                <tr>
                                  <td
                                    align="left"
                                    style="
                                      margin: 0;
                                      padding-top: 20px;
                                      padding-bottom: 20px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="left"
                                          style="padding: 0; margin: 0; width: 600px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="
                                                  padding: 0;
                                                  margin: 0;
                                                  padding-top: 15px;
                                                  padding-bottom: 15px;
                                                  font-size: 0;
                                                "
                                              >
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  class="es-table-not-adapt es-social"
                                                  role="presentation"
                                                  style="
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    border-collapse: collapse;
                                                    border-spacing: 0px;
                                                  "
                                                >
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-right: 40px;
                                                      "
                                                    >
                                                      <img
                                                        title="Facebook"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                        alt="Fb"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-right: 40px;
                                                      "
                                                    >
                                                      <img
                                                        title="Twitter"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png"
                                                        alt="Tw"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="
                                                        padding: 0;
                                                        margin: 0;
                                                        padding-right: 40px;
                                                      "
                                                    >
                                                      <img
                                                        title="Instagram"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                                        alt="Inst"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      style="padding: 0; margin: 0"
                                                    >
                                                      <img
                                                        title="Youtube"
                                                        src="https://lvgosg.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                                        alt="Yt"
                                                        width="32"
                                                        style="
                                                          display: block;
                                                          border: 0;
                                                          outline: none;
                                                          text-decoration: none;
                                                          -ms-interpolation-mode: bicubic;
                                                        "
                                                      />
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="padding: 0; margin: 0">
                                                <table
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  class="es-menu"
                                                  role="presentation"
                                                  style="
                                                    mso-table-lspace: 0pt;
                                                    mso-table-rspace: 0pt;
                                                    border-collapse: collapse;
                                                    border-spacing: 0px;
                                                  "
                                                >
                                                  <tr class="links">
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      width="33.33%"
                                                      style="
                                                        margin: 0;
                                                        padding-left: 5px;
                                                        padding-right: 5px;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        border: 0;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          display: block;
                                                          color: #999999;
                                                          font-size: 12px;
                                                        "
                                                        >Visit Us
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      width="33.33%"
                                                      style="
                                                        margin: 0;
                                                        padding-left: 5px;
                                                        padding-right: 5px;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        border: 0;
                                                        border-left: 1px solid #cccccc;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          display: block;
                                                          color: #999999;
                                                          font-size: 12px;
                                                        "
                                                        >Privacy Policy</a
                                                      >
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      width="33.33%"
                                                      style="
                                                        margin: 0;
                                                        padding-left: 5px;
                                                        padding-right: 5px;
                                                        padding-top: 5px;
                                                        padding-bottom: 5px;
                                                        border: 0;
                                                        border-left: 1px solid #cccccc;
                                                      "
                                                    >
                                                      <a
                                                        target="_blank"
                                                        style="
                                                          -webkit-text-size-adjust: none;
                                                          -ms-text-size-adjust: none;
                                                          mso-line-height-rule: exactly;
                                                          text-decoration: none;
                                                          display: block;
                                                          color: #999999;
                                                          font-size: 12px;
                                                        "
                                                        >Terms of Use</a
                                                      >
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <table
                          cellpadding="0"
                          cellspacing="0"
                          class="es-content"
                          align="center"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            border-collapse: collapse;
                            border-spacing: 0px;
                            table-layout: fixed !important;
                            width: 100%;
                          "
                        >
                          <tr>
                            <td
                              class="es-info-area"
                              align="center"
                              style="padding: 0; margin: 0"
                            >
                              <table
                                class="es-content-body"
                                align="center"
                                cellpadding="0"
                                cellspacing="0"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  border-collapse: collapse;
                                  border-spacing: 0px;
                                  background-color: transparent;
                                  width: 600px;
                                "
                                bgcolor="#FFFFFF"
                              >
                                <tr>
                                  <td align="left" style="padding: 20px; margin: 0">
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        border-collapse: collapse;
                                        border-spacing: 0px;
                                      "
                                    >
                                      <tr>
                                        <td
                                          align="center"
                                          valign="top"
                                          style="padding: 0; margin: 0; width: 560px"
                                        >
                                          <table
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                              border-collapse: collapse;
                                              border-spacing: 0px;
                                            "
                                          >
                                            <tr>
                                              <td
                                                align="center"
                                                style="padding: 0; margin: 0; display: none"
                                              ></td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
              </body>
            </html>
            `,
          };
        }
        var UpdateCode = await User.updateOne(
          { email },
          { remember_token: SecretCode }
        );
        var TransporterData = await transporter.sendMail(
          mailOptions,
          function (error, info) {
            if (error) {
              res.json({ payload: error, ok: "neOk" });
            } else {
              res.json({ payload: "Email sent: " + info.response, ok: "ok" });
            }
          }
        );
      } else {
        res.json({ payload: "email not found" });
      }
    } catch (error) {
      res.json(error.message);
    }
  }
);

export { router as inputEmailAndSendRouter };
