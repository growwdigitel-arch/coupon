"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as XLSX from "xlsx";

export interface RecipientRow {
  id: string;
  name: string;
  email: string;
  couponCode: string;
  expiryDate: string;
  status: "Delivered" | "Opened" | "Clicked" | "Bounced" | "Pending";
  openTime?: string;
}

export interface UploadedFile {
  id: string;
  fileName: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadDate: string;
  rowCount: number;
  data: RecipientRow[];
}

export interface Campaign {
  id: string;
  title: string;
  userEmail: string;
  userName: string;
  fileName: string;
  totalRecipients: number;
  sentCount: number;
  openRate: number;
  clickRate: number;
  status: "Sending" | "Completed" | "Scheduled" | "Draft";
  sendDate: string;
  creditsUsed: number;
  recipients: RecipientRow[];
}

export interface SmtpConfig {
  provider: "gmail" | "smtp" | "brevo";
  smtpHost?: string;
  smtpPort?: number;
  smtpUsername?: string;
  smtpPassword?: string;
  smtpEncryption?: "TLS" | "SSL";
  brevoApiKey?: string;
}

export interface PurchaseRecord {
  id: string;
  type: "package" | "topup";
  packageName: string;
  credits: number;
  amount: number;
  date: string;
  txnId: string;
  status: "Success" | "Pending" | "Failed";
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: "user" | "owner";
  walletBalance: number;
  credits: number;
  gmailConnected: boolean;
  gmailAddress?: string;
  smtpConfig?: SmtpConfig;
  companyName: string;
  status: "Active" | "Suspended";
  createdAt: string;
  planName?: string;
  purchaseHistory?: PurchaseRecord[];
}

interface AppContextType {
  currentUser: UserAccount | null;
  users: UserAccount[];
  uploadedFiles: UploadedFile[];
  campaigns: Campaign[];
  globalSmtpConfig: SmtpConfig;
  login: (email: string, role: "user" | "owner") => boolean;
  logout: () => void;
  uploadFile: (file: File, user: UserAccount) => Promise<UploadedFile>;
  createManualFile: (
    fileName: string,
    rows: { name: string; email: string; couponCode: string; expiryDate: string }[],
    user: UserAccount
  ) => UploadedFile;
  launchCampaign: (title: string, templateHtml: string, selectedFile: UploadedFile) => Promise<boolean>;
  topUpWallet: (amount: number, credits: number) => void;
  subscribePlan: (planLabel: string, amount: number, credits: number) => void;
  connectGmail: (address: string) => void;
  saveSmtpConfig: (config: SmtpConfig) => void;
  adminUpdateCredits: (userId: string, newCredits: number) => void;
  adminToggleUserStatus: (userId: string) => void;
  adminDeleteFile: (fileId: string) => void;
}

const initialSmtpConfig: SmtpConfig = {
  provider: "brevo",
  smtpHost: "smtp-relay.brevo.com",
  smtpPort: 587,
  smtpUsername: "santhoshram444@gmail.com",
  smtpEncryption: "TLS",
  brevoApiKey: process.env.NEXT_PUBLIC_BREVO_API_KEY || "",
};

const initialUsers: UserAccount[] = [
  {
    id: "usr_1",
    name: "StyleNova",
    email: "hello@stylenova.in",
    role: "user",
    walletBalance: 8750,
    credits: 17500,
    gmailConnected: true,
    gmailAddress: "hello@stylenova.in",
    smtpConfig: initialSmtpConfig,
    companyName: "StyleNova Fashion House",
    status: "Active",
    createdAt: "2026-01-15",
    planName: "Growth Plan (₹999/mo)",
    purchaseHistory: [
      { id: "ph_1_1", type: "package", packageName: "Growth Plan", credits: 10000, amount: 999, date: "2026-01-15", txnId: "TXN20260115001", status: "Success" },
      { id: "ph_1_2", type: "topup", packageName: "Top-Up 5000 Credits", credits: 5000, amount: 499, date: "2026-03-22", txnId: "TXN20260322044", status: "Success" },
      { id: "ph_1_3", type: "topup", packageName: "Top-Up 2500 Credits", credits: 2500, amount: 249, date: "2026-06-10", txnId: "TXN20260610088", status: "Success" },
    ],
  },
  {
    id: "usr_2",
    name: "NexaTech",
    email: "campaigns@nexatech.io",
    role: "user",
    walletBalance: 24500,
    credits: 49000,
    gmailConnected: true,
    gmailAddress: "campaigns@nexatech.io",
    smtpConfig: initialSmtpConfig,
    companyName: "NexaTech Solutions",
    status: "Active",
    createdAt: "2026-02-10",
    planName: "Pro Plan (₹1,999/mo)",
    purchaseHistory: [
      { id: "ph_2_1", type: "package", packageName: "Pro Plan", credits: 25000, amount: 1999, date: "2026-02-10", txnId: "TXN20260210002", status: "Success" },
      { id: "ph_2_2", type: "topup", packageName: "Top-Up 10000 Credits", credits: 10000, amount: 999, date: "2026-04-05", txnId: "TXN20260405077", status: "Success" },
      { id: "ph_2_3", type: "package", packageName: "Enterprise Plan Upgrade", credits: 15000, amount: 3999, date: "2026-05-20", txnId: "TXN20260520112", status: "Success" },
      { id: "ph_2_4", type: "topup", packageName: "Top-Up 5000 Credits", credits: 5000, amount: 499, date: "2026-07-01", txnId: "TXN20260701201", status: "Success" },
    ],
  },
  {
    id: "usr_owner",
    name: "Nikhil (Platform Owner)",
    email: "admin@couponmail.io",
    role: "owner",
    walletBalance: 99999,
    credits: 999999,
    gmailConnected: true,
    gmailAddress: "owner@couponmail.io",
    smtpConfig: initialSmtpConfig,
    companyName: "CouponMail HQ",
    status: "Active",
    createdAt: "2025-11-01",
    planName: "Unlimited Owner Plan",
  },
];

const sampleStyleNovaData: RecipientRow[] = [
  { id: "r_1", name: "Ananya Roy", email: "ananya@example.com", couponCode: "NOVA50", expiryDate: "2026-11-15", status: "Opened", openTime: "2 mins ago" },
  { id: "r_2", name: "Siddharth Malhotra", email: "sid@example.com", couponCode: "NOVA50", expiryDate: "2026-11-15", status: "Clicked", openTime: "5 mins ago" },
  { id: "r_3", name: "Kavita Rao", email: "kavita@example.com", couponCode: "NOVA50", expiryDate: "2026-11-15", status: "Delivered", openTime: "10 mins ago" },
  { id: "r_4", name: "Vikram Seth", email: "vikram@example.com", couponCode: "NOVA50", expiryDate: "2026-11-15", status: "Delivered", openTime: "12 mins ago" },
  { id: "r_5", name: "Meera Nair", email: "meera@example.com", couponCode: "NOVA50", expiryDate: "2026-11-15", status: "Opened", openTime: "15 mins ago" },
];

const sampleNexaTechData: RecipientRow[] = [
  { id: "r_10", name: "Amitabh Joshi", email: "amitabh@domain.com", couponCode: "NEXA30", expiryDate: "2026-12-01", status: "Opened", openTime: "1 hour ago" },
  { id: "r_11", name: "Sunita Patel", email: "sunita@domain.com", couponCode: "NEXA30", expiryDate: "2026-12-01", status: "Clicked", openTime: "2 hours ago" },
  { id: "r_12", name: "Rohan Das", email: "rohan@domain.com", couponCode: "NEXA30", expiryDate: "2026-12-01", status: "Delivered", openTime: "3 hours ago" },
];

const initialFiles: UploadedFile[] = [
  {
    id: "file_1",
    fileName: "StyleNova_Diwali_VIP_Customers.xlsx",
    uploadedBy: "hello@stylenova.in",
    uploadedByName: "StyleNova",
    uploadDate: "2026-07-20",
    rowCount: 12500,
    data: sampleStyleNovaData,
  },
  {
    id: "file_2",
    fileName: "NexaTech_Flash_Sale_Leads.csv",
    uploadedBy: "campaigns@nexatech.io",
    uploadedByName: "NexaTech",
    uploadDate: "2026-07-22",
    rowCount: 8200,
    data: sampleNexaTechData,
  },
];

const initialCampaigns: Campaign[] = [
  {
    id: "cmp_1",
    title: "StyleNova Diwali Mega Collection Launch",
    userEmail: "hello@stylenova.in",
    userName: "StyleNova",
    fileName: "StyleNova_Diwali_VIP_Customers.xlsx",
    totalRecipients: 12500,
    sentCount: 11800,
    openRate: 71.4,
    clickRate: 28.6,
    status: "Completed",
    sendDate: "2026-07-24 10:30 AM",
    creditsUsed: 11800,
    recipients: sampleStyleNovaData,
  },
  {
    id: "cmp_2",
    title: "NexaTech Flash Friday — VIP Access",
    userEmail: "campaigns@nexatech.io",
    userName: "NexaTech",
    fileName: "NexaTech_Flash_Sale_Leads.csv",
    totalRecipients: 8200,
    sentCount: 8200,
    openRate: 74.8,
    clickRate: 33.2,
    status: "Completed",
    sendDate: "2026-07-22 03:00 PM",
    creditsUsed: 8200,
    recipients: sampleNexaTechData,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [users, setUsers] = useState<UserAccount[]>(initialUsers);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(initialFiles);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [globalSmtpConfig, setGlobalSmtpConfigState] = useState<SmtpConfig>(initialSmtpConfig);

  useEffect(() => {
    const savedUser = localStorage.getItem("couponmail_user");
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    } else {
      setCurrentUser(initialUsers[0]);
    }

    const savedGlobalSmtp = localStorage.getItem("couponmail_global_smtp");
    if (savedGlobalSmtp) {
      try {
        setGlobalSmtpConfigState(JSON.parse(savedGlobalSmtp));
      } catch (e) {
        console.error("Failed to parse global smtp config", e);
      }
    }
  }, []);

  const login = (email: string, role: "user" | "owner") => {
    let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      found = {
        id: `usr_${Date.now()}`,
        name: email.split("@")[0],
        email: email,
        role: role,
        walletBalance: 500,
        credits: 1000,
        gmailConnected: false,
        smtpConfig: globalSmtpConfig,
        companyName: "My Brand",
        status: "Active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers((prev) => [...prev, found!]);
    } else if (found.role !== role) {
      found = { ...found, role: role };
    }

    setCurrentUser(found);
    localStorage.setItem("couponmail_user", JSON.stringify(found));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("couponmail_user");
  };

  const uploadFile = async (file: File, user: UserAccount): Promise<UploadedFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonRows: any[] = XLSX.utils.sheet_to_json(worksheet);

          const parsedRows: RecipientRow[] = jsonRows.map((row, idx) => ({
            id: `row_${Date.now()}_${idx}`,
            name: row.Name || row.name || row["First Name"] || row.Customer || `Customer ${idx + 1}`,
            email: row.Email || row.email || row["Email Address"] || `customer${idx + 1}@example.com`,
            couponCode: row.Coupon || row.coupon || row.Code || row["Coupon Code"] || `SAVE${(idx + 1) * 10}`,
            expiryDate: row.Expiry || row.expiry || "2026-12-31",
            status: "Pending",
          }));

          const newFile: UploadedFile = {
            id: `file_${Date.now()}`,
            fileName: file.name,
            uploadedBy: user.email,
            uploadedByName: user.name,
            uploadDate: new Date().toISOString().split("T")[0],
            rowCount: parsedRows.length > 0 ? parsedRows.length : 150,
            data: parsedRows.length > 0 ? parsedRows : sampleStyleNovaData,
          };

          setUploadedFiles((prev) => [newFile, ...prev]);
          resolve(newFile);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const createManualFile = (
    fileName: string,
    rows: { name: string; email: string; couponCode: string; expiryDate: string }[],
    user: UserAccount
  ): UploadedFile => {
    const parsedRows: RecipientRow[] = rows.map((r, idx) => ({
      id: `row_manual_${Date.now()}_${idx}`,
      name: r.name || `Customer ${idx + 1}`,
      email: r.email || `customer${idx + 1}@example.com`,
      couponCode: r.couponCode || "SAVE20",
      expiryDate: r.expiryDate || "2026-12-31",
      status: "Pending",
    }));

    const newFile: UploadedFile = {
      id: `file_manual_${Date.now()}`,
      fileName: fileName || `Manual_Recipients_${new Date().toISOString().split("T")[0]}.csv`,
      uploadedBy: user.email,
      uploadedByName: user.name,
      uploadDate: new Date().toISOString().split("T")[0],
      rowCount: parsedRows.length,
      data: parsedRows,
    };

    setUploadedFiles((prev) => [newFile, ...prev]);
    return newFile;
  };

  const launchCampaign = async (title: string, templateHtml: string, selectedFile: UploadedFile): Promise<boolean> => {
    if (!currentUser) return false;
    const requiredCredits = selectedFile.rowCount;

    if (currentUser.credits < requiredCredits) {
      alert(`Insufficient credits! You need ${requiredCredits} credits but have ${currentUser.credits}. Please top up your wallet.`);
      return false;
    }

    // Determine Brevo API Key & Sender Email from global storage or state
    const activeApiKey = globalSmtpConfig?.brevoApiKey || currentUser.smtpConfig?.brevoApiKey;
    const activeSenderEmail = globalSmtpConfig?.smtpUsername || "santhoshram444@gmail.com";

    // Call /api/send-email for live execution
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: activeApiKey,
          senderEmail: activeSenderEmail,
          senderName: currentUser.name,
          recipients: selectedFile.data,
          subject: title,
          htmlContent: templateHtml,
        }),
      });

      const apiRes = await response.json();

      if (apiRes.mode === "brevo_ip_error") {
        alert(
          `🔒 BREVO SECURITY NOTICE: Unauthorised IP Address!\n\nBrevo blocked the request because your IP (${apiRes.userIp}) is restricted.\n\nTO FIX THIS:\n1. Open: https://app.brevo.com/security/authorised_ips\n2. Click "Add an IP Address" and paste: ${apiRes.userIp}\n   (or disable IP Restrictions for your API Key)\n3. Click Save & try sending again!`
        );
        return false;
      } else if (apiRes.mode === "brevo_sender_error") {
        alert(
          `📩 BREVO SENDER VERIFICATION NEEDED:\n\n${apiRes.message}\n\nTO FIX THIS:\n1. Open: https://app.brevo.com/senders\n2. Add your sender email: ${activeSenderEmail}\n3. Verify your email via Brevo's confirmation link and try sending again!`
        );
        return false;
      } else if (apiRes.mode === "brevo_api_live") {
        if (apiRes.success) {
          alert(`🎉 SUCCESS! Real emails delivered via Brevo API!\n\n${apiRes.message}`);
        } else {
          alert(`⚠️ Brevo API Response: ${apiRes.message}`);
        }
      } else {
        alert(`ℹ️ Demo Mode: ${apiRes.message}`);
      }
    } catch (e: any) {
      console.error("API Call error", e);
    }

    const updatedUser = {
      ...currentUser,
      credits: currentUser.credits - requiredCredits,
    };
    setCurrentUser(updatedUser);
    localStorage.setItem("couponmail_user", JSON.stringify(updatedUser));

    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));

    const newCampaign: Campaign = {
      id: `cmp_${Date.now()}`,
      title,
      userEmail: currentUser.email,
      userName: currentUser.name,
      fileName: selectedFile.fileName,
      totalRecipients: selectedFile.rowCount,
      sentCount: selectedFile.rowCount,
      openRate: 68.2,
      clickRate: 25.4,
      status: "Completed",
      sendDate: new Date().toLocaleString(),
      creditsUsed: requiredCredits,
      recipients: selectedFile.data.map((r) => ({ ...r, status: "Delivered", openTime: "Just now" })),
    };

    setCampaigns((prev) => [newCampaign, ...prev]);
    return true;
  };

  const topUpWallet = (amount: number, credits: number) => {
    if (!currentUser) return;
    const newHistory: PurchaseRecord = {
      id: `ph_${Date.now()}`,
      type: "topup",
      packageName: `Top-Up ${credits} Credits`,
      credits: credits,
      amount: amount,
      date: new Date().toISOString().split("T")[0],
      txnId: `TXN${Date.now()}`,
      status: "Success",
    };
    const updated = {
      ...currentUser,
      walletBalance: currentUser.walletBalance + amount,
      credits: currentUser.credits + credits,
      purchaseHistory: [newHistory, ...(currentUser.purchaseHistory || [])],
    };
    setCurrentUser(updated);
    localStorage.setItem("couponmail_user", JSON.stringify(updated));
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const subscribePlan = (planLabel: string, amount: number, credits: number) => {
    if (!currentUser) return;
    const newHistory: PurchaseRecord = {
      id: `ph_${Date.now()}`,
      type: "package",
      packageName: `${planLabel} Plan`,
      credits: credits,
      amount: amount,
      date: new Date().toISOString().split("T")[0],
      txnId: `TXN${Date.now()}`,
      status: "Success",
    };
    const updated: UserAccount = {
      ...currentUser,
      planName: `${planLabel} Plan (₹${amount}/mo)`,
      walletBalance: currentUser.walletBalance + amount,
      credits: currentUser.credits + credits,
      purchaseHistory: [newHistory, ...(currentUser.purchaseHistory || [])],
    };
    setCurrentUser(updated);
    localStorage.setItem("couponmail_user", JSON.stringify(updated));
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const connectGmail = (address: string) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      gmailConnected: true,
      gmailAddress: address,
    };
    setCurrentUser(updated);
    localStorage.setItem("couponmail_user", JSON.stringify(updated));
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
  };

  const saveSmtpConfig = (config: SmtpConfig) => {
    setGlobalSmtpConfigState(config);
    localStorage.setItem("couponmail_global_smtp", JSON.stringify(config));

    if (currentUser) {
      const updated = {
        ...currentUser,
        smtpConfig: config,
      };
      setCurrentUser(updated);
      localStorage.setItem("couponmail_user", JSON.stringify(updated));
    }
  };

  const adminUpdateCredits = (userId: string, newCredits: number) => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, credits: newCredits } : u)));
    if (currentUser && currentUser.id === userId) {
      const updated = { ...currentUser, credits: newCredits };
      setCurrentUser(updated);
      localStorage.setItem("couponmail_user", JSON.stringify(updated));
    }
  };

  const adminToggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
      )
    );
  };

  const adminDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        uploadedFiles,
        campaigns,
        globalSmtpConfig,
        login,
        logout,
        uploadFile,
        createManualFile,
        launchCampaign,
        topUpWallet,
        subscribePlan,
        connectGmail,
        saveSmtpConfig,
        adminUpdateCredits,
        adminToggleUserStatus,
        adminDeleteFile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
