const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');
const mustache = require('mustache');

const templateDir = "../email-templates/";

const headerTemplate = fs.readFileSync(path.resolve(__dirname, templateDir + 'header.mjml'), 'utf8');
const footerTemplate = fs.readFileSync(path.resolve(__dirname, templateDir + 'footer.mjml'), 'utf8');


const option = {
    minify: true
}



const getFormattedHtml = (id, config) => {


    const filepath = templateDir + `${config.template}.mjml`;

    const template = fs.readFileSync(path.resolve(__dirname, filepath), 'utf8');

    const context = Object.assign(config.context, {
        headerTemplate: headerTemplate,
        footerTemplate: footerTemplate,
    });

    const mjml = mustache.render(template, context);


    const html = mjml2html(mjml, option);

    return html;

};

module.exports = {
    getFormattedHtml
}
