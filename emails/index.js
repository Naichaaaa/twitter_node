const nodemailer = require('nodemailer');
const sparkPostTransporter = require('nodemailer-sparkpost-transport');
const path = require('path');
const pug = require('pug');

class Email {
    constructor() {
        this.from = 'Dyma projects <no-replay@dyma-projects.site>';
        if (process.env.NODE_ENV === 'production') {
            this.transporter = nodemailer.createTransport(sparkPostTransporter({
                sparkPostApiKey: '4ee1ef56b009a90d2a30c2b25e637c6e6231bf2e',
                endpoint: 'https://api.eu.sparkpost.com'
            }));
        } else {
            this.transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "2b12eba88d4e55",
                    pass: "8b5337745d35d6"
                }
            });
        }
    }

    async sendEmailVerification(options) {
        try {
            const email = {
                from: this.from,
                subject: 'Email verification',
                to: options.to,
                html: pug.renderFile(__dirname, 'templates/email-verification', {
                    username: options.username,
                    url: `https://${options.host}/users/email-verification/${options.userId}/${options.token}`
                })
            };
            const response = await this.transporter.sendMail(email);
            console.log(response);
        } catch(e) {
            throw e;
        }
    }
}


module.exports = new Email();