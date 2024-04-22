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

Use the "withoutemailsignup" default branch. The others are not being updated. Though they do provide a simple example of sending emails to users when they register and to reset the password. Remember to install nodemailer if you want to use those branches. And here is a short guide if you want to use those branches.

Configure nodemailer for email functionality. I put some dummy SMTP connection data in the code but you will need to replace it with the details of your own SMTP server. You can use [Ethereal mail](https://ethereal.email/) if you need a fake server for testing purposes.

- **authcontroller.js**

  ```// Sending welcome email
   const transporter = nodemailer.createTransport({
     host: 'your smtp server address',
     port: your port,
     secure: false,
     auth: {
       user: 'the email associated to your smtp address',
       pass: 'your password'
     }
   });

   const mailOptions = {
     from: 'the email associated to your smtp address',
     to: email,
     subject: 'Welcome to Our Website!',
     text: 'Thank you for signing up. We are glad to have you on board!'
   };
  ```

- **forgotpasswordcontroller.js**

  ```
  // Send password reset email
    const transporter = nodemailer.createTransport({
      host: 'your smtp server',
      port: your port,
      secure: false,
      auth: {
        user: 'email associated to your server',
        pass: 'your password'
      }
    });

    const mailOptions = {
      from: 'email associated to your server',
      to: email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
        + `http://${req.headers.host}/auth/reset-password/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

  ```

# Tech stack

1. [VUEjs](https://vuejs.org/)
2. [Express](https://expressjs.com/)
3. [JWT](https://jwt.io/)
4. [Mongoose](https://mongoosejs.com/)
5. [Nodemailer](https://www.nodemailer.com/)
6. [Mailslurp](https://www.mailslurp.com/)

# To do

1. Write some logic to delete the jwt token on client side now that I am sure it works
2. Understanding why I get registration welcome email when I use a fake email address to receive but not on my outlook or gmail. Security policies?
3. Maybe use cookies instead of local storage?
4. Use nodemon instead of node index.js
