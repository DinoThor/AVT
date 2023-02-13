import { createTestAccount, createTransport } from 'nodemailer';

async function send(data) {
    
    let fakeAccount = await createTestAccount();
    
    let transporter = createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: fakeAccount.user,
            pass: fakeAccount.pass
        }
    });

    await transporter.sendMail({
        from: "VRAIN <foo@vrain.com>", // TODO: Get values from config file
        to: data.dest,
        subject: "Aviso",
        text: "Aviso",
        html: "<b>Aviso a familiares</b>"
    });    
}