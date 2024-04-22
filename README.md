# Express.js Backend with User Authentication and Poem Management API

- BACKEND

1. User auth with JWT
2. CRUD backend API to create, edit and delete poems
3. Users can only view their own poems. Not the ones by other people.
4. Guide on how to test this using the thunderbolt vs code extension. Always remember the bearer token or your API calls won't work!
5. CRUD backend API to change a user's password, delete the user or change their email
6. Connection to mongodb using mongoose to store users emails and passwords, poems titles and content
7. Dummy SMTP server to send the user a welcome email (using Mailslurp and Nodemailer)
8. Check the end of the readme file for links to the tech stack used

- FRONTEND

1. VueJs components for login/register, write edit and delete poems, change account settings
2. VueJs component showing inspirational quotes and being able to copy them to clipboard using the [Quotable API](https://github.com/lukePeavey/quotable)
3. Users can ORDER poems by written date or SEARCH them
4. Users can share poems via email or social media
5. Pinia for state management
6. Composition API

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. `node index.js` to start the server
4. Go to frontend folder. Run `npm install`. `npm run serve` to start the Vue JS app

- Requires dependencies (backend)

```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.4",
     "nodemailer": "^6.9.13"
  }

```

3. Set up MongoDB following [these instructions](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)

## API Endpoints

### Register a User

- **Endpoint**: `POST /auth/register`
- **Sample Request Body**:

```json
{
  "email": "email@email.com",
  "password": "your_new_password2!"
}
```

### Login a User

- **Endpoint**: `POST /auth/login`
- **Sample Request Body (use same details you used to register)**:

```json
{
  "email": "email@email.com",
  "password": "your_new_password2!"
}
```

As a response, you will get a token. Remember to include this bearer token to make other requests

### Post a poem

- **Endpoint**: `POST /api/poems`
- **Sample Request Body**:

```json
{
  "title": "your title",
  "content": "your content"
}
```

Remember to include the bearer token

### Edit a poem

- **Endpoint**: `PUT /api/poems/poemid`
- **Sample Request Body**:

```json
{
  "title": "your title updated",
  "content": "your content updated"
}
```

You will find the poem ID in your mongo db
Remember to include the bearer token

### Delete a poem

- **Endpoint**: `DELETE  /api/poems/poemid`

You will find the poem ID in your mongo db
Remember to include the bearer token

### Get poems by user ID

- **Endpoint**: `GET  /poems/user/:userId`

You will find the user ID in the mongo db database. Also, I implemented a functionality whereby users can view only their own poems. Not other people's.
Remember to include the bearer token

### Get the poem's written date

**Endpoint**: `GET /api/poems/poemid/writtenDate`

Remember the bearer token

### Change user email

- **Endpoint**: `PUT /api/update-details`
- **Sample Request Body**:

```json
{
  "email": "newemail@email.com"
}
```

Remember the bearer token

### Change user password

- **Endpoint**: `PUT /api/change-password`

- **Sample Request Body**:

```json
{
  "oldPassword": "current_password",
  "newPassword": "new_password"
}
```

Remember the bearer token

### Delete a user

**Endpoint**: `DELETE /api/delete`

Remember the bearer token

# With email

Configure nodemailer for email functionality and Mailslurp's SMTP server for testing. Follow [these instructions](https://www.mailslurp.com/guides/smtp-imap/). Remember to include Mailslurp's API key in the .env. I have now removed the code below because I exceeded the API limit. But it's a valid template, regardless of the SMTP server you are using.

- **authcontroller.js**

  ```const inbox = await mailslurp.createInboxWithOptions({
    inboxType: 'SMTP_INBOX',
  });

  const server = await mailslurp.inboxController.getImapSmtpAccess({
    inboxId: inbox.id,
  });

  const transport = nodemailer.createTransport({
    host: server.smtpServerHost,
    port: server.smtpServerPort,
    secure: false,
    auth: {
      user: server.smtpUsername,
      pass: server.smtpPassword,
      type: 'PLAIN',
    },
  });

  const sent = await transport.sendMail({
    from: inbox.emailAddress,
    to: email,
    subject: 'Welcome to Our App',
    text: 'Thank you for registering with us!',
  });
  ```

# Tech stack

1. [VUEjs](https://vuejs.org/)
2. [Express](https://expressjs.com/)
3. [JWT](https://jwt.io/)
4. [Mongoose](https://mongoosejs.com/)
5. [Nodemailer](https://www.nodemailer.com/)
6. [Mailslurp](https://www.mailslurp.com/)
7. [Pinia](https://pinia.vuejs.org/)
8. [VueCompositionAPI](https://vuejs.org/api/composition-api-setup.html)
