const router = require('express').Router();
const generateFromRequest = require('./lib/generateFromRequest');
const ALLOW_DISPLAY_IN_BROWSER = process.env.ALLOW_DISPLAY_IN_BROWSER;
const TEST_EMAIL_RECIPIENT = process.env.TEST_EMAIL_RECIPIENT;
const SECRET_KEY = process.env.SECRET_KEY;
const SHOW_THE_EMAIL = 0;
const SEND_THE_EMAIL = 1;


const handleRequest = (routeId) => {

    return (req, res) => {
        const id = routeId || req.query.id;


        if (req.method === 'GET' && ALLOW_DISPLAY_IN_BROWSER) {
            const params = Object.assign({}, req.query);
            generateFromRequest(req, res, id, params, SHOW_THE_EMAIL);

        } else if (req.method === 'POST') {
            const params = Object.assign({}, req.body);
            generateFromRequest(req, res, id, params, SEND_THE_EMAIL);
        }

    }
};


router.use('/test', handleRequest(null));
router.use('/invite', handleRequest('invite'));
router.use('/signup', handleRequest('signup'));


if (ALLOW_DISPLAY_IN_BROWSER) {

    const testRoutes = [
        {
            route: "/invite",
            params: {
                email: TEST_EMAIL_RECIPIENT
            }
        },
        {
            route: "/signup",
            params: {
                email: TEST_EMAIL_RECIPIENT
            }
        }
    ]

    const appTitle = "Sendgrid Email Relay";

    const testLinkList = testRoutes.map(testRoute => {
        const queryString = Object.keys(testRoute.params).map(key => key + '=' + testRoute.params[key]).join('&').replace(/ /g, "+");
        const url = testRoute.route + '?' + queryString;

        return `
        <li style="margin-bottom: 0.5em;">
            <ul class="horizontal">
                <li><button onclick="doPost('${testRoute.route}','${queryString}')">POST</button></li>
                <li><button onclick="window.location='${url}';">GET</button></li>
                <li class="route">${testRoute.route}</li>   
                <li style="color: #666;"><span style="font-size: 0.9em">${queryString}</span></li>
            </ul>
        </li>`
    }).join('');

    router.get('/', (req, res) => {
        res.send(`<html>
        <head>
        <title>${appTitle}</title>
        <style>
            body{
                margin: 1em;
                font-family: sans-serif;
            }
            h1{
                
            }
            h2{
                margin-top: 1.5em;
                margin-left: 0.5em;
                font-size: 1em;
            
            }
            h3{
                display: none;
                font-family: monospace;
                font-weight: normal;
            }
            ul{
                list-style-type: none;
            }
            ul.horizontal{
                display: flex;

            }
            ul.horizontal li{
                margin-right: 1em;
            }
           
            .secretKey{
                /** do not expose the SECRET_KEY itself here! **/
                display: ${SECRET_KEY ? 'block' : 'none'};
                border: 1px solid #ccc;
                margin: 0.5em;
                padding: 1em;
                width: 50em;
                
            }
            .route{
                width: 8em; color: #333; font-weight: bold; color: #009;
            }
            .description{
                font-size: 0.8em;
            }
        </style>
        <script>
        function doPost(route, params){
           
            var secretKey = document.getElementById('secretKey').value;

            //console.log("DO POST",route,params,secretKey);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", route, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Authorization", secretKey);

            xhr.onreadystatechange = function() { 
                if (this.readyState === XMLHttpRequest.DONE) {
                    // Request finished. Do processing here.
                    if(this.status === 200){
                        window.alert(route+" email was sent to recipent via SendGrid");
                    }else{
                        window.alert("ERROR "+route+" email could not be sent, status:"+this.status);
                    }
                   
                }
            }
            
   
            xhr.send(params);
           
            
        }
        </script>
        </head>
        <body>
            <h1>${appTitle}</h1>
            <h3>${req.url}</h3>
            <div>
                <ul class="description">
                  
                   <li>POST generates email and sends it to <span style="font-family: monospace;">company_email</span></li>
                   <li>GET generates email and displays it in the browser</li>
                   <li>Value of <span style="font-family: monospace;">company_email</span> is set in the environment variable <span style="font-family: monospace;">TEST_EMAIL_RECIPIENT</span></li>
                  
                 </ul>
            </div>
           
            <h2>Test routes</h2>
            <div class="secretKey">SECRET_KEY: 
               <input id="secretKey" value="" type="text" size="50">
            <span style="font-size: 0.8em">required for POST</span>
            </div>
            <ul style="margin-top: 2em;">
                ${testLinkList}
            </ul>
            <div style="color: #666; font-size: 0.8em;">!! This page is visible because the environment variable <span style="font-family: monospace;">ALLOW_DISPLAY_IN_BROWSER</span> is non-zero. To turn this off set this variable to zero.</div>
           
        </body>
    </html>`)
    })
}

module.exports = router;