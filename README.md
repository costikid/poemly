# Express.js Backend with User Authentication and Poem Management API + VueJs frontend

Things to note: Use the branch called "final". The auth is implemented using a token generated in the backend, which is then transformed into a cookie in the frontend to retrieve it. This app is not ready for real life deployment, as some security best practices still need to be implemented. The files apiConfig.js and authConfig.js in the frontend folder are not being used. I need to leave them there for future reference...

- BACKEND

1. User auth with JWT
2. CRUD backend API to create, edit and delete poems
3. Users can only view their own poems. Not the ones by other people.
4. Guide on how to test this using the thunderbolt vs code extension. Always remember the bearer token or your API calls won't work!
5. CRUD backend API to change a user's password, delete the user or change their email
6. Connection to mongodb using mongoose to store users emails and passwords, poems titles, content and written date.
7. Dummy SMTP server to send the user a welcome email (using Mailslurp and Nodemailer). Note that it's not included in the backend code. You can read below if you wish to implement this feature.
8. Check the end of the readme file for links to the tech stack used

- FRONTEND

1. VueJs components for login/register, write edit and delete poems, change account settings
2. VueJs component showing inspirational quotes and being able to copy them to clipboard using the Quotable API
3. Users can ORDER poems by written date or SEARCH them
4. Users can share poems via email or social media
5. Pinia for state management
6. VueJs Composition API (different from the Options API)
7. Check the end of the readme file for links to the tech stack used

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`in the root folder
3. Create a .env file in the root folder and insert `JWT_SECRET=yewfwefwef` . Remember to include the .env in gitignore so you don't commit it with the changes.
4. `nodemon index.js` to start the server. Your backend will run on `http://localhost:3000/`
5. Go to the frontend folder (cd frontend). Run `npm install`. Then type `npm run serve` to start the Vue JS app which will run on `http://localhost:8081/` . Both servers need to be running at the same time for the app to work (have one terminal window with localhost:3000 and another one with localhost:8081).

- Requires dependencies (backend)

```json
"dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "isomorphic-fetch": "^3.0.0",
    "js-cookie": "^3.0.5",
    "jsonwebtoken": "^9.0.2",
    "mailslurp-client": "^15.20.0",
    "mongoose": "^8.2.4",
    "nodemailer": "^6.9.13"
  }

```

- Requires dependencies (frontend)

```json
  "dependencies": {
    "@fortawesome/fontawesome-free": "^6.5.2",
    "axios": "^1.6.8",
    "bootstrap": "^5.3.3",
    "bootstrap-vue": "^2.23.1",
    "core-js": "^3.8.3",
    "file-saver": "^2.0.5",
    "pinia": "^2.1.7",
    "vue": "^3.4.23",
    "vue-router": "^4.3.0",
    "vuex": "^4.0.2"
  },

```

6. Set up MongoDB following [these instructions](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/). I also recommend to download [MongoDbcompass](https://www.mongodb.com/products/tools/compass).

## API Endpoints

### Register a User

Remember the password needs to be at least 6 characters long, contain a number and a special character.

- **Endpoint**: `POST http:localhost:3000/auth/register`
- **Sample Request Body**:

```json
{
  "email": "email@email.com",
  "password": "your_new_password2!"
}
```

### Login a User

- **Endpoint**: `POST http:localhost:3000/auth/login`
- **Sample Request Body (use same details you used to register)**:

```json
{
  "email": "email@email.com",
  "password": "your_new_password2!"
}
```

As a response, you will get a token. Remember to include this bearer token to make other requests.

### Post a poem

- **Endpoint**: `POST http:localhost:3000/api/poems`
- **Sample Request Body**:

```json
{
  "title": "your title",
  "content": "your content"
}
```

Remember to include the bearer token

### Edit a poem

- **Endpoint**: `PUT http:localhost:3000/api/poems/poemid`
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

- **Endpoint**: `DELETE  http:localhost:3000/api/poems/poemid`

You will find the poem ID in your mongo db
Remember to include the bearer token

### Get poems by user ID

- **Endpoint**: `GET  http:localhost:3000/poems/user/userId`

You will find the user ID in the mongo db database. Also, I implemented a functionality whereby users can view only their own poems. Not other people's.
Remember to include the bearer token

### Get the poem's written date

**Endpoint**: `GET http:localhost:3000/api/poems/poemid/writtenDate`

Remember the bearer token

### Get a poem by its ID

- **Endpoint**: `GET http:localhost:3000/poems/poemid`

Remember the bearer token

### Change user email

- **Endpoint**: `PUT http:localhost:3000/api/update-details`
- **Sample Request Body**:

```json
{
  "email": "newemail@email.com"
}
```

Remember the bearer token

### Change user password

- **Endpoint**: `PUT http:localhost:3000/api/change-password`

- **Sample Request Body**:

```json
{
  "oldPassword": "current_password",
  "newPassword": "new_password"
}
```

Remember the bearer token

### Delete a user

**Endpoint**: `DELETE http:localhost:3000/api/delete`

Remember the bearer token

# With email

Configure nodemailer for email functionality and Mailslurp's SMTP server for testing. Follow [these instructions](https://www.mailslurp.com/guides/smtp-imap/). Remember to include Mailslurp's API key in the .env of your root folder. I have now removed the code below because I have exceeded the API limit. But it's a valid template, regardless of the SMTP server you are using. Should you wish to include a welcome email after the user registers, place the code below in the register function of the auth controller.

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
9. [Quotable API](https://github.com/lukePeavey/quotable)

## To do

1. Cookies in the express backend too instead of the token (I am only transforming the token into cookies in the frontend for now)
2. Password strength meter instead of enforcing password complexity. Will use [vue-password-strength-meter](https://www.npmjs.com/package/vue-password-strength-meter)
3. Deploy to [railway](https://railway.app)
4. SEO and accessibility like image alt-text
