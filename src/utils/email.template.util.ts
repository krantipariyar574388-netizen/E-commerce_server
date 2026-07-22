const formatDate = (date: NativeDate) => {
  return date.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
};

// Generate New Login Detected Email HTML
export const newLoginDetectedHtml = ({
  email,
  loginAt,
  userAgent,
  fullName,
}: {
  email: string;
  loginAt: NativeDate;
  userAgent: string;
  fullName: string;
}) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Login Detected</title>
</head>

<body style="margin:0;padding:0;background:#f5f3ff;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(109,40,217,.15);">

<!-- Header -->
<tr>
<td align="center"
style="background:linear-gradient(135deg,#6d28d9,#8b5cf6);padding:40px;color:white;">
<h1 style="margin:0;font-size:28px;">New Login Detected</h1>
<p style="margin-top:10px;font-size:15px;opacity:.9;">
We noticed a new sign in to your account.
</p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:35px;">

<p style="font-size:16px;color:#374151;">
Hello <strong>${fullName}</strong>,
</p>

<p style="font-size:15px;color:#4b5563;line-height:1.7;">
A new login to your account has been detected. If this was you, no further action is required.
If you don't recognize this activity, please secure your account immediately.
</p>

<table width="100%" cellpadding="12"
style="margin:25px 0;border:1px solid #ede9fe;border-radius:10px;background:#faf5ff;">
<tr>
<td style="color:#6d28d9;font-weight:bold;width:150px;">Email</td>
<td style="color:#374151;">${email}</td>
</tr>

<tr>
<td style="color:#6d28d9;font-weight:bold;">Login Time</td>
<td style="color:#374151;">${formatDate(loginAt)}</td>
</tr>

<tr>
<td style="color:#6d28d9;font-weight:bold;">Device</td>
<td style="color:#374151;">${userAgent}</td>
</tr>
</table>

<div style="text-align:center;margin-top:35px;">
<a href="#"
style="
display:inline-block;
padding:14px 30px;
background:#7c3aed;
color:#ffffff;
text-decoration:none;
border-radius:8px;
font-weight:bold;
font-size:15px;
">
Secure My Account
</a>
</div>

<p style="margin-top:35px;font-size:14px;color:#6b7280;line-height:1.6;">
If this login was made by you, you can safely ignore this email.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center"
style="background:#faf5ff;padding:20px;color:#6b7280;font-size:13px;border-top:1px solid #ede9fe;">
© ${new Date().getFullYear()} Your Company. All rights reserved.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

  return html;
};

// Generate New Account Created Email HTML
export const newAccountCreatedHtml = ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Welcome to Our Platform</title>
</head>

<body style="margin:0;padding:0;background:#f5f3ff;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(109,40,217,.15);">

<!-- Header -->
<tr>
<td align="center"
style="background:linear-gradient(135deg,#6d28d9,#8b5cf6);padding:40px;color:#ffffff;">
<h1 style="margin:0;font-size:30px;">🎉 Welcome!</h1>
<p style="margin-top:10px;font-size:16px;opacity:.95;">
Your account has been created successfully.
</p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:35px;">

<p style="font-size:16px;color:#374151;">
Hello <strong>${fullName}</strong>,
</p>

<p style="font-size:15px;color:#4b5563;line-height:1.7;">
Welcome! Your account has been successfully created and is ready to use.
We're excited to have you on board.
</p>

<table width="100%" cellpadding="12"
style="margin:28px 0;border:1px solid #ede9fe;border-radius:10px;background:#faf5ff;">

<tr>
<td style="width:140px;color:#6d28d9;font-weight:bold;">
Full Name
</td>
<td style="color:#374151;">
${fullName}
</td>
</tr>

<tr>
<td style="color:#6d28d9;font-weight:bold;">
Email
</td>
<td style="color:#374151;">
${email}
</td>
</tr>

<tr>
<td style="color:#6d28d9;font-weight:bold;">
Status
</td>
<td style="color:#16a34a;font-weight:bold;">
Active ✅
</td>
</tr>

</table>

<div style="text-align:center;margin:35px 0;">
<a href="#"
style="
display:inline-block;
padding:14px 32px;
background:#7c3aed;
color:#ffffff;
text-decoration:none;
font-size:15px;
font-weight:bold;
border-radius:8px;
">
Go to Dashboard
</a>
</div>

<p style="font-size:14px;color:#6b7280;line-height:1.7;">
If you didn't create this account, please contact our support team immediately.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center"
style="background:#faf5ff;padding:22px;border-top:1px solid #ede9fe;">

<p style="margin:0;font-size:13px;color:#6b7280;">
Thank you for choosing us 💜
</p>

<p style="margin-top:8px;font-size:12px;color:#9ca3af;">
© ${new Date().getFullYear()} Your Company. All rights reserved.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

  return html;
};