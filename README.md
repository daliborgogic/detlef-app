# detlef

> Progressive Web App

[![CircleCI](https://circleci.com/gh/daliborgogic/detlef-app.svg?style=svg)](https://circleci.com/gh/daliborgogic/detlef-app)

```bash
# Install
$ npm i

# environment variables
$ cat > .env << EOL
CMS_DOMAIN=
APP_DOMAIN=
APP_NAME=
APP_SHORT_NAME=
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_INSTANCE=
EOL

# Dev
$ npm run dev

# Build
$ npm run build

# Start
$ npm start

# Or start with process manager 
$ pm2 start process.json
```

```MAILCHIMP_API_KEY``` navigate to the API Keys section of your MailChimp account: [Your API Keys](https://us1.admin.mailchimp.com/account/api/).

```MAILCHIMP_LIST_ID``` individual list id.

```MAILCHIMP_INSTANCE``` if last part of your MailChimp API key is e.g. us6, all API endpoints for your account are available at ```https://us6.api.mailchimp.com/3.0/```.
