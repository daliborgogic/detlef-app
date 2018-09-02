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

### Usage

Install a package, and any packages that it depends on
```bash
$ npm i
```

Set Environment Variables

```bash
$ cat > .env << EOL
CMS_DOMAIN=
APP_DOMAIN=
FIRST_NAME=
LAST_NAME=
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
MAILCHIMP_INSTANCE=
EOL
```

Launch a development server on ```localhost:3000``` with hot-reloading:

```bash
$ npm run dev
```

Run Tests
```bash
$ npm test
```

Build application with webpack:

```bash
$ npm run build
```

Start the server in production mode:

```bash
$ npm start
```

Or start the server with process manager:

```bash
$ pm2 start process.json
```
