export const sendEmail = async (name: string, email: string, message: string) => {
  const accessKey = "aabd80cf-a057-4d6c-bb49-e072e0f59aff";
  
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: "New Form Submission from ScribbleSense",
      }),
    });

    const result = await response.json();
    if (result.success) {
      return { success: true, message: result.message };
    } else {
      throw new Error(result.message || "Failed to send email");
    }
  } catch (error: any) {
    console.error("Email submission error:", error);
    throw new Error(error.message || "Failed to send email");
  }
};
