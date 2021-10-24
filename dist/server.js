"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _config = _interopRequireDefault(require("./config.js"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));

var _emailRouter = _interopRequireDefault(require("./routers/emailRouter.js"));

var _productRouter = _interopRequireDefault(require("./routers/productRouter.js"));

var _orderRouter = _interopRequireDefault(require("./routers/orderRouter.js"));

var _uploadRouter = _interopRequireDefault(require("./routers/uploadRouter.js"));

var _schema = require("./schema.js");

var _expressGraphql = require("express-graphql");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongodbUrl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = (0, _express.default)();

const _dirname = _path.default.resolve();

app.use('/graphql', (0, _expressGraphql.graphqlHTTP)({
  schema: _schema.schema,
  graphiql: true
}));
app.use(_bodyParser.default.json());
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
    <h2>Bienvenue Mr. / Mme., ${req.body.name}</h2>
    <p>Nous vous remercions pour votre inscription. À partir de maintenant,
    vous pouvez démarrer une session sur votre profil d'utilisateur en indiquant 
    votre e-mail et votre mot de passe sur <a href="https://hloutounsi.com">hloutounsi.com</a></p>
    </div>
  `;
  const outputPayed = `
  <div style="padding: 3% 20%">
  <img src="https://hloutounsi.com/images/logo.png" width=300 />
  <h2>Confirmation de commande n° ${req.body.orderId}</h2>
  <h3>Bonjour</h3>
  <p>Nous vous remercions de votre commande.
  Votre date de livraison estimée est indiquée ci-dessous. 
  Vous pouvez suivre l’état de votre commande ou modifier celle-ci dans
  <a href="https://hloutounsi.com/orderhistory"> Vos commandes</a> sur Hloutounsi.com</p>
  <p>Livraison entre ${req.body.dateMin} et ${req.body.dateMax}<br />
  Méthode de Livraison ${req.body.shippingType}<br />Prix total: ${req.body.total}</p>
  </div>
`; // create reusable transporter object using the default SMTP transport

  let transporter = _nodemailer.default.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
      user: _config.default.EMAIL,
      // generated ethereal user
      pass: _config.default.PASSWORD_EMAIL // generated ethereal password

    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let html = output;
  if (req.body.type === "welcome") html = outputWelcome;
  if (req.body.type === "payed") html = outputPayed; // setup email data with unicode symbols

  let mailOptions = {
    from: _config.default.EMAIL,
    // sender address
    to: req.body.type === "welcome" || req.body.type === "payed" ? req.body.email : 'contact@hloutounsi.com',
    // list of receivers
    subject: 'Votre commande HlouTounsi.com',
    // Subject line
    html // html body

  }; // send mail with defined transport object

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', _nodemailer.default.getTestMessageUrl(info));
    res.send('L\'email a été bien envoyé');
  });
});
app.use('/api/uploads', _uploadRouter.default);
app.use('/api/users', _userRouter.default);
app.use('/api/emails', _emailRouter.default);
app.use('/api/products', _productRouter.default);
app.use('/api/orders', _orderRouter.default);
app.get('/api/config/paypal', (req, res) => {
  res.send(_config.default.PAYPAL_CLIENT_ID);
});
app.get('/api/config/google', (req, res) => {
  res.send(_config.default.GOOGLE_API_KEY);
});
app.use('/uploads', _express.default.static(_path.default.join(_dirname, '/../uploads')));
app.use(_express.default.static(_path.default.join(_dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  if (_config.default.PRODUTION) {
    res.sendFile(_path.default.join(`${_dirname}/../frontend/build/index.html`));
  } else {
    res.sendFile('c:/hloutounsi/frontend/build/index.html');
  }
});
app.listen(_config.default.PORT, () => {
  console.log(`Server started at http://localhost:${_config.default.PORT}`);
});