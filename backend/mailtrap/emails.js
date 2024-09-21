const mailtrapConfig = require("./mailtrapConfig");
const emailTemplates = require("./emailTemplates");
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE } = emailTemplates;

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    console.log(recipient, mailtrapConfig.sender);
    try {
        const response = await mailtrapConfig.mailtrapClient.send({
            from: mailtrapConfig.sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    } catch (err) {
        console.error("Error sending verification email: ", err.message);
        throw new Error(`Error sending verification email: ${err.message}`);
    }
};

const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapConfig.mailtrapClient.send({
            from: mailtrapConfig.sender,
            to: recipient,
            template_uuid: "c5ae2201-7b7c-4d58-ae54-1b618de950eb",
            template_variables: {
                company_info_name: "Auth Company",
                name: name,
            },
        });

        console.log("Welcome email sent successfully", response);
    } catch (err) {
        console.error("Error sending welcome email: ", err.message);
        throw new Error(`Error sending welcome email: ${err.message}`);
    }
};

const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapConfig.mailtrapClient.send({
            from: mailtrapConfig.sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    } catch (err) {
        console.error("Error sending password reset mail: ", err);

        throw new Error(`Error sending password reset mail: ${err}`);
    }
};

const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapConfig.mailtrapClient.send({
            from: mailtrapConfig.sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Password reset success email sent successfully", response);
    } catch (err) {
        console.error("Error sending password reset success mail: ", err);

        throw new Error(`Error sending password reset success mail: ${err}`);
    }
};

module.exports = {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail,
};
