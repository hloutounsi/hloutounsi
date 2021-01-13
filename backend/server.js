import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import config from './config.js';
import userRoute from './routers/userRouter.js';
import productRoute from './routers/productRouter.js';
import orderRoute from './routers/orderRouter.js';
import uploadRoute from './routers/uploadRouter.js';

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

const app = express();
// const __dirname = path.resolve();
app.use(bodyParser.json());
app.use('/api/send', (req, res) => {
  const output = `
    <p>Nouveau demande de contact</p>
    <h3>Contact Details</h3>
    <ul>  
    <li>Nom: ${req.body.name}</li>
    <li>Sujet: ${req.body.subject}</li>
    <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL, // generated ethereal user
        pass: config.PASSWORD_EMAIL  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: config.EMAIL, // sender address
    to: 'medbbelaid@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('Email has been sent');
  });
});
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.get('/api/config/google', (req, res) => {
  res.send(config.GOOGLE_API_KEY);
});
app.use('/uploads', express.static(path.join('C:/hloutounsi/uploads')));
app.use(express.static(path.join('C:/hloutounsi/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join('C:/hloutounsi/frontend/build/index.html'));
});

app.listen(config.PORT, () => {
  console.log('Server started at http://localhost:5000');
});
