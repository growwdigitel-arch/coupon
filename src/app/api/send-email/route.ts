import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { apiKey, senderEmail, senderName, recipients, subject, htmlContent } = body;

    const brevoApiKey = apiKey && apiKey.startsWith("xkeysib-") ? apiKey : process.env.BREVO_API_KEY;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: "No recipients provided" },
        { status: 400 }
      );
    }

    const results = [];

    // If real Brevo API Key is present
    if (brevoApiKey && brevoApiKey.startsWith("xkeysib-") && !brevoApiKey.includes("demo-key") && !brevoApiKey.includes("global-owner-key")) {
      // Must use a verified Brevo account email. Defaulting to santhoshram444@gmail.com
      const verifiedBrevoSender = (senderEmail && senderEmail.includes("@gmail.com")) || (senderEmail && senderEmail.includes("santhosh"))
        ? senderEmail
        : "santhoshram444@gmail.com";

      for (const rec of recipients) {
        // Fix typos like @gmai.com -> @gmail.com
        let cleanedRecipientEmail = rec.email ? rec.email.trim() : "";
        if (cleanedRecipientEmail.endsWith("@gmai.com")) {
          cleanedRecipientEmail = cleanedRecipientEmail.replace("@gmai.com", "@gmail.com");
        }

        const personalizedHtml = htmlContent
          .replace(/\{\{First_Name\}\}/g, rec.name || "Customer")
          .replace(/\{\{Coupon_Code\}\}/g, rec.couponCode || "SAVE20")
          .replace(/\{\{Expiry_Date\}\}/g, rec.expiryDate || "2026-12-31");

        const payload = {
          sender: {
            name: senderName || "CouponMail",
            email: verifiedBrevoSender,
          },
          to: [
            {
              email: cleanedRecipientEmail,
              name: rec.name || cleanedRecipientEmail.split("@")[0],
            },
          ],
          subject: subject.replace(/\{\{First_Name\}\}/g, rec.name || "Customer"),
          htmlContent: personalizedHtml,
        };

        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoApiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const resData = await res.json();
        if (res.ok) {
          results.push({ email: cleanedRecipientEmail, status: "Sent", messageId: resData.messageId });
        } else {
          const errMsg = resData.message || JSON.stringify(resData);
          results.push({ email: cleanedRecipientEmail, status: "Failed", error: errMsg, code: resData.code });
        }
      }

      const allSuccess = results.every((r) => r.status === "Sent");
      const hasIpError = results.some((r) => r.error && r.error.includes("unrecognised IP address"));
      const hasSenderError = results.some((r) => r.error && (r.error.toLowerCase().includes("sender") || r.error.toLowerCase().includes("unverified")));

      if (hasIpError) {
        return NextResponse.json({
          success: false,
          mode: "brevo_ip_error",
          userIp: "2405:201:e04e:7873:d97a:28a2:9c7f:63b6",
          authIpUrl: "https://app.brevo.com/security/authorised_ips",
          results,
          message: "⚠️ Brevo Security Alert: Unrecognised IP Address detected.",
        });
      }

      if (hasSenderError) {
        return NextResponse.json({
          success: false,
          mode: "brevo_sender_error",
          results,
          message: `⚠️ Brevo Sender Error: Sender email '${verifiedBrevoSender}' is not verified in Brevo. Add your email under https://app.brevo.com/senders`,
        });
      }

      return NextResponse.json({
        success: allSuccess,
        mode: "brevo_api_live",
        results,
        message: allSuccess
          ? `🎉 Real email delivered to ${results.length} recipients via Brevo API!`
          : `Brevo API Response: ${JSON.stringify(results)}`,
      });
    }

    // Simulation / Demo Mode when no valid Brevo API key is saved in Owner Admin
    for (const rec of recipients) {
      results.push({
        email: rec.email,
        status: "Sent",
        messageId: `sim_msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      });
    }

    return NextResponse.json({
      success: true,
      mode: "simulation",
      results,
      message: `Campaign dispatched to ${recipients.length} recipients.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process email delivery request" },
      { status: 500 }
    );
  }
}
