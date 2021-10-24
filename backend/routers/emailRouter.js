import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Email from '../models/emailModel.js';
import { isAdmin, isAuth } from '../utils.js';

const emailRouter = express.Router();
emailRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const emails = await Email.find({});
    res.send(emails);
  })
);

emailRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
      console.log(req.body.email)
      const email = new Email({ email: req.body.email });
      const createdEmail = await email.save();
      res
      .status(201)
      .send({ message: 'Nouvel email créé', email: createdEmail });
  })
);

export default emailRouter;
