import { app } from "@/app";
import { FastifyReply, FastifyRequest } from "fastify";

interface EmailRequestBody {
    to: string;
    subject: string;
    text: string;
}

/**
 * Sends an email.
 *
 * @param {FastifyRequest} request - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object.
 * @returns {Promise<FastifyReply>} The response indicating the status of the email sending operation.
 */
export async function replyContactMessage(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const emailData: EmailRequestBody = request.body as EmailRequestBody;

    try {
        const { to, subject, text } = emailData;
        const mailer = app.mailer;

        await mailer.sendMail({
            to,
            subject,
            text,
        });

        return reply.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return reply.status(500).send({ message: "Failed to send email" });
    }
}
