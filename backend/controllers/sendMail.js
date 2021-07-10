const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    SENDER_EMAIL_PASSWORD
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = (to, url, pwd, txt) => {
    console.log('Vao day send email')
    console.log('oauth2Client', oauth2Client)
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()
    // const smtpTransport = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         type: 'OAuth2',
    //         user: SENDER_EMAIL_ADDRESS,
    //         clientId: MAILING_SERVICE_CLIENT_ID,
    //         clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    //         refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    //         accessToken
    //     }
    // })
    const smtpTransport = nodemailer.createTransport({
    // service: 'gmail',
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: SENDER_EMAIL_ADDRESS,
        pass: SENDER_EMAIL_PASSWORD
    }
})

    const mailOptions = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "🚀 [KT-VietNam] Reset Your Password 🚀",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Khôi phục tài khoản</h2>
                <p>Hãy ghi nhớ mật khẩu của bạn cẩn thận! Đây là mật khẩu mới của bạn:
                </p>
                <h3>${pwd}</h3>
                <a href=${url} style="background: deepskyblue; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
                <i>Hoặc nhấp vào đây:</i>
                <div>${url}</div>
            </div>
        `
    }

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        console.log('sendmail run')
        if (err) {
            console.log(err);
            return err;
        } 
        console.log('INFO:',info)
        return infor
    })
}

module.exports = sendEmail