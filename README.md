# detlef

> Progressive Web App starts with a traditional web site/application and progressively enhance with modern features.

[![CircleCI](https://circleci.com/gh/daliborgogic/detlef-app.svg?style=svg)](https://circleci.com/gh/daliborgogic/detlef-app)

```bash
# Install
$ npm i

# environment variables
$ cat > .env << EOL
CMS_DOMAIN=
APP_DOMAIN=
FIRST_NAME=
LAST_NAME=
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_INSTANCE=
EOL

# Dev
$ env $(grep -v '^#' .env | xargs -d '\n' -t) \
node_modules/.bin/micro -l tcp://0.0.0.0:3000

# Test
$ env $(grep -v '^#' .env | xargs -d '\n' -t) \
node_modules/.bin/ava -t -v

# Build
$ env $(grep -v '^#' .env | xargs -d '\n' -t) \
node_modules/.bin/nuxt build

# Start
$ env $(grep -v '^#' .env | xargs -d '\n') \
NODE_ENV=production \
node_modules/.bin/micro -l tcp://0.0.0.0:3000

# Or start with process manager
$ pm2 start process.json
```

```MAILCHIMP_API_KEY``` navigate to the API Keys section of your MailChimp account: [Your API Keys](https://us1.admin.mailchimp.com/account/api/).

```MAILCHIMP_LIST_ID``` individual list id.

```MAILCHIMP_INSTANCE``` if last part of your MailChimp API key is e.g. us6, all API endpoints for your account are available at ```https://us6.api.mailchimp.com/3.0/```.
