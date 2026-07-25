import { NextResponse } from "next/server";
import crypto from "crypto";

// PayU Test Credentials
const PAYU_MERCHANT_KEY = "gtKFFx";
const PAYU_MERCHANT_SALT = "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { txnid, amount, productinfo, firstname, email } = body;

    if (!txnid || !amount || !productinfo || !firstname || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // PayU hash formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt)
    const hashString = `${PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_MERCHANT_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    return NextResponse.json({
      hash,
      key: PAYU_MERCHANT_KEY,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
