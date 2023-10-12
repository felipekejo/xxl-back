import { app } from "@/app";

/**
 * Represents the data required to send an email.
 */
export interface EmailRequestBody {
  /** The recipient's email address. */
  to: string;
  /** The subject of the email. */
  subject: string;
  /** The plain text content of the email. */
  text: string;
}

/**
 * Sends an email using the provided email data.
 *
 * @param {EmailRequestBody} emailData - The email data including recipient, subject, and text.
 * @returns {Promise<{ message: string }>} A promise that resolves with a success message when the email is sent successfully.
 * @throws {Error} If there is an error while sending the email.
 */
export async function sendMail(emailData: EmailRequestBody) {
  const { to, subject, text } = emailData;

  try {
    const mailer = app.mailer;

    await mailer.sendMail({
      to,
      subject,
      text,
    });

    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}
