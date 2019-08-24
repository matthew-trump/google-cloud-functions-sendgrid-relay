const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


const sendMail = (req, res, configobj, html, callback) => {


    const msg = {
        subject: configobj.subject,
        to: configobj.to,
        from: configobj.from,
        html: html
    };

    sendgrid.send(msg).then(() => {
        res.status(200).json({ 'success': 'email successfully sent' });
        if (typeof callback === 'function') {
            callback();
        }
    })
        .catch(error => {
            const { message } = error;
            res.status(200).json({ 'error': `${message}` });
            console.error(error.toString());
        });

}

module.exports = sendMail;