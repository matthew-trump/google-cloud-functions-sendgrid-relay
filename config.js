const email_domain = process.env.EMAIL_DOMAIN;

const colors = {
    white: '#FFFFFF',
    yellow: '#FFC864',
    orange: '#FF4537',
    blue: '#2D46B9',
    teal: '#9BF0E1',
    purple: '#AF2996'
};


module.exports = {
    blank: {
        template: "generic",
        subject: ``,
        actionButtonUrl: (params) => {
            return `${email_domain}/`;
        },
        context: {
            hero: {
                background: colors.white,
                foreground: colors.white,
                title: ``,
                support: ``
            },
            body: {
                background: colors.white,
                foreground: colors.white,
                support: ``,
                button: `Test`,
                buttonBackground: colors.white,
                buttonColor: colors.white
            }
        }
    },
    invite: {
        template: "generic",
        actionButtonUrl: (params) => {
            return `${email_domain}/signup?email=${params.email}`
        },
        subject: "You've been invited to join our community",
        context: {
            hero: {
                background: colors.yellow,
                foreground: colors.orange,
                title: `Here we go.`,
                support: `You\'re invited to join our community.`
            },
            body: {
                background: colors.orange,
                foreground: colors.white,
                support: `Get started today.`,
                button: `get access`,
                buttonBackground: colors.yellow,
                buttonColor: colors.white
            }
        }
    },

    signup: {
        template: "generic",
        actionButtonUrl: (params) => {
            return `${email_domain}/login?email=${params.email}`;
        },
        subject: "Welcome to our community! Let's go.",
        context: {
            hero: {
                background: colors.blue,
                foreground: colors.teal,
                title: `Let’s get it<br/>started. `,
                support: `Thanks for signing up.`
            },
            body: {
                background: colors.teal,
                foreground: colors.blue,
                support: `Click here to get started`,
                button: `Let's Go`,
                buttonBackground: colors.blue,
                buttonColor: colors.white
            }
        }
    }
}
