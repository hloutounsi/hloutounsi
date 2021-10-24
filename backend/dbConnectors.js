import casual from 'casual';
import _ from 'lodash';
import mongoose from 'mongoose';
import Sequelize from 'sequelize';

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Mohamed:0789mB!!@cluster0.qz9g8.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    language: {
        type: String
    },
    email: {
        type: String
    },
    contacts: {
        type: Array
    },
    isAdmin: { type: Boolean, default: false, required: true },
    isSeller: { type: Boolean, default: false, required: true },
    seller: {
      name: String,
      logo: String,
      logo2: String,
      description: String,
      rating: { type: Number, default: 0, required: true },
      numReviews: { type: Number, default: 0, required: true }
    }
});
const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );
  const sellerSchema = new mongoose.Schema(
    {
      rating: { type: Number },
      numReviews: { type: Number },
    },
    {
      timestamps: true,
    }
  );
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seller: sellerSchema,
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    reviews: [reviewSchema],
    weight: { type: Number, required: true },
    newPrice: {type: Number},
},
{
    timestamps: true,
});
const Products = mongoose.model('products', productSchema);
const Users = mongoose.model('users', userSchema);

// SQL
const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: './alien.sqlite'
});

const Aliens = sequelize.define('aliens', {
    firstName: { type: Sequelize.STRING },
    lastName: { type: Sequelize.STRING },
    planet: { type: Sequelize.STRING },
});

Aliens.sync({ force: true }).then(() => {
    _.times(10, (i) => {
        Aliens.create({
            firstName: casual.first_name,
            lastName: casual.last_name,
            planet: casual.word
        })
    })
})

export { Users, Aliens, Products };

