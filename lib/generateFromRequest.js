const configEmails = require('../config');

const getFormattedHtml = require('./getFormattedHtml').getFormattedHtml;
const sendMail = require('./sendMail');

const EMAIL_FROM_ADDRESS = process.env.EMAIL_FROM_ADDRESS;
const SHOW_THE_EMAIL = 0;
const SEND_THE_EMAIL = 1;

const getActionButtonUrl = (id, params) => {
    if (configEmails[id] && configEmails[id].actionButtonUrl) {
        const urlConfig = Object.assign({}, params);
        const actionButtonUrl = configEmails[id].actionButtonUrl(urlConfig);
        return actionButtonUrl;
    }
    return "";
};


const generateFromRequest = (req, res, id, params, mode) => {
    const EMAIL_TO_ADDRESS = params.email;

    if (id && params.email) {
        const emailConfig = configEmails[id];
        const actionButtonUrl = getActionButtonUrl(id, params);


        const configobj = Object.assign({},
            emailConfig,
            {
                to: EMAIL_TO_ADDRESS,
                from: EMAIL_FROM_ADDRESS
            }, {
                context: Object.assign(emailConfig.context, { actionButtonUrl: actionButtonUrl })
            });


        const htmlObj = getFormattedHtml(id, configobj);

        if (mode === SHOW_THE_EMAIL) {
            res.send(htmlObj.html);
        } else if (mode === SEND_THE_EMAIL) {
            sendMail(req, res, configobj, htmlObj.html, () => { })
        }


    } else if (!id) {
        res.json({ error: "id missing: " + id });
    } else if (mode === SEND_THE_EMAIL && !EMAIL_TO_ADDRESS) {
        res.json({ error: "email param missing" });
    } else {
        res.json({});
    }
}

module.exports = generateFromRequest;