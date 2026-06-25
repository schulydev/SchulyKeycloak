<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
    body { margin:0; padding:0; background-color:#ffffff; width:100% !important; -webkit-text-size-adjust:none; }
    body, td, th { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    a { color:#18181b; }
    .preheader { display:none !important; visibility:hidden; mso-hide:all; font-size:1px; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden; }
    h1 { margin:0 0 16px; font-size:34px; line-height:1.15; font-weight:800; color:#18181b; letter-spacing:-0.02em; }
    p { margin:0 0 28px; font-size:16px; line-height:1.6; color:#52525b; }
    .btn { background-color:#18181b; border-top:14px solid #18181b; border-bottom:14px solid #18181b; border-left:30px solid #18181b; border-right:30px solid #18181b; display:inline-block; color:#ffffff !important; text-decoration:none; border-radius:9999px; font-size:13px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; box-sizing:border-box; }
    .footer { font-size:14px; line-height:1.6; color:#a1a1aa; margin:40px 0 0; }
    @media (prefers-color-scheme: dark) {
      body { background-color:#0a0a0a !important; }
      h1 { color:#fafafa !important; }
      p { color:#a1a1aa !important; }
      .brandname { color:#fafafa !important; }
      .btn { background-color:#fafafa !important; border-color:#fafafa !important; color:#0a0a0a !important; }
    }
    </style>
    <!--[if mso]>
    <style type="text/css">.btn { font-family: Arial, sans-serif; }</style>
    <![endif]-->
  </head>
  <body>
    <span class="preheader">Confirm your email to finish setting up your Schuly account.</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
      <tr>
        <td align="center" style="padding:56px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">
            <tr>
              <td style="padding-bottom:44px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;padding-right:10px;">
                      <img src="https://schuly.dev/assets/app_icon.png" width="40" height="40" alt="Schuly" style="display:block;width:40px;height:40px;border:0;border-radius:9px;" />
                    </td>
                    <td class="brandname" style="vertical-align:middle;font-size:20px;font-weight:800;color:#18181b;letter-spacing:-0.01em;">Schuly</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr><td><h1>Confirm your account</h1></td></tr>
            <tr><td><p>Please click the button below to confirm your email address and finish setting up your Schuly account. This link is valid for ${linkExpirationFormatter(linkExpiration)}.</p></td></tr>
            <tr>
              <td>
                <a href="${link}" class="btn" target="_blank">Confirm email</a>
              </td>
            </tr>
            <tr>
              <td>
                <p class="footer">Didn&rsquo;t sign up for Schuly? You can safely ignore this email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
