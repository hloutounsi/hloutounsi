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
app.post('/api/send', async (req, res) => {
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
  const outputWelcome = `
    <div style="padding: 3% 20%">
    <img src="https://hloutounsi.com/images/logo.png" width=300 />
    <h1>Bienvenue Mr. / Mme., ${req.body.name}</h1>
    <p>Nous vous remercions pour votre inscription. À partir de maintenant,
    vous pouvez démarrer une session sur votre profil d'utilisateur en indiquant 
    votre e-mail et votre mot de passe sur <a href="https://hloutounsi.com">hloutounsi.com</a></p>
    </div>
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
    to: req.body.type === "welcome" ? req.body.email : 'medbbelaid@gmail.com', // list of receivers
    subject: 'Node Contact Request', // Subject line
    text: 'Hello world?', // plain text body
    html: req.body.type === "welcome" ? outputWelcome : output // html body
  };

  // send mail with defined transport object
  await transporter.sendMail(mailOptions, (error, info) => {
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
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});
