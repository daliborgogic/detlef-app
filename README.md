# detlef

> Progressive Web App starts with a traditional web site/application and progressively enhance with modern features.

[![CircleCI](https://circleci.com/gh/daliborgogic/detlef-app.svg?style=svg)](https://circleci.com/gh/daliborgogic/detlef-app)

### Environment Variables

| Key                     | Description                                                                                                                                      |
|:------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|
| ```CMS_DOMAIN```        | Content Menagement System (CMS) Top Level Domain (TLD).                                                                                          |
| ```APP_DOMAIN```        | Application Top Level Domain (TLD).                                                                                                              |
| ```FIRST_NAME```        | Given name, part of a personal name.                                                                                                             |
| ```LAST_NAME```         | Surname, family name, or last name.                                                                                                              |
| ```MAILCHIMP_API_KEY``` | Navigate to the API Keys section of your MailChimp account: [Your API Keys](https://us1.admin.mailchimp.com/account/api/).                       |
| ```MAILCHIMP_LIST_ID``` | Individual  MailChimp [list id](https://us1.admin.mailchimp.com/account/api/). Lists > List > Settings > List name & defaults > List ID.         |
| ```MAILCHIMP_INSTANCE```| If last part of your MailChimp API key is e.g. us6, all API endpoints for your account are available at ```https://us6.api.mailchimp.com/3.0/```.|

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
$ npm run dev

# Test
$ npm test

# Build
$ npm run build

# Start
$ npm start

# Or start with process manager
$ pm2 start process.json
```
