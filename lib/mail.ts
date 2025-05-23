import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificaionEmail = async(
    email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Confirm your email to fix your gully",
        html:`<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`
    })
}