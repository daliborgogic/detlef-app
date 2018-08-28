# detlef

> Progressive Web App

```bash
# Install
$ npm i

# environment variables
$ cat > .env << EOL
CMS_DOMAIN=
APP_DOMAIN=
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_INSTANCE=
EOL
```

```MAILCHIMP_API_KEY``` navigate to the API Keys section of your MailChimp account: (Your API Keys)[https://us1.admin.mailchimp.com/account/api/].

```MAILCHIMP_LIST_ID``` individual list id.

```MAILCHIMP_INSTANCE``` last part of your MailChimp API key is us6, all API endpoints for your account are available at ```https://us6.api.mailchimp.com/3.0/```.

```bash

# Dev
$ npm run dev

# Build
$ npm run build

# Start
$ npm start

# Or start with process manager 
$ pm2 start process.json
```
