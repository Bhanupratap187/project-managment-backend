import Mailgen from 'mailgen';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Task Managment App',
      link: process.env.CLIENT_URL,
    },
  });

  const textEmailContent = mailGenerator.generatePlaintext(
    options.mailGencontent,
  );
  const htmlEmailContent = mailGenerator.generate(options.mailGencontent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASSWORD,
    },
  });

  const mail = {
    from: 'bhanupratapnaruka187@gmail.com',
    to: options.to,
    subject: options.subject,
    text: textEmailContent,
    html: htmlEmailContent,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

const varificationEmailTemplate = (userName, emailVerificationLink) => {
  return {
    body: {
      name: userName,
      intro: "Welcome to Our Service! We're excited to have you on board.",
      action: {
        instructions:
          'To get started with your account, please click the button below to verify your email address:',
        button: {
          color: '#22BC66',
          text: 'Verify Email',
          link: emailVerificationLink,
        },
      },
      outro:
        'If you did not create an account, no further action is required on your part.',
    },
  };
};

const resetPasswordEmailTemplate = (userName, resetPasswordLink) => {
  return {
    body: {
      name: userName,
      intro: 'You have requested to reset your password.',
      action: {
        instructions: 'To reset your password, please click the button below:',
        button: {
          color: '#DC4D2F',
          text: 'Reset Password',
          link: resetPasswordLink,
        },
      },
      outro:
        'If you did not request a password reset, please ignore this email or contact support if you have questions.',
    },
  };
};

export { varificationEmailTemplate, resetPasswordEmailTemplate, sendEmail };
