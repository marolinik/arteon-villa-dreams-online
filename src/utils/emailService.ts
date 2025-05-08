
// Simple mock email service for development purposes
// In a production environment, this would be replaced with a real email service

type EmailProps = {
  to: string;
  subject: string;
  body: string;
  attachments?: {
    filename: string;
    content: string;
  }[];
};

export const sendEmail = async (props: EmailProps): Promise<boolean> => {
  try {
    // In a real app, this would connect to an email API
    console.log("Sending email:");
    console.log(`To: ${props.to}`);
    console.log(`Subject: ${props.subject}`);
    console.log(`Body: ${props.body}`);
    
    if (props.attachments && props.attachments.length > 0) {
      console.log("Attachments:", props.attachments.map(a => a.filename).join(", "));
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log to localStorage for persistence
    const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
    sentEmails.push({
      to: props.to,
      subject: props.subject,
      body: props.body,
      date: new Date().toISOString()
    });
    localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
    
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};
