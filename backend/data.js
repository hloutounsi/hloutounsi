import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
        "name" : "Baklawa",
        "category" : "Gâteau au miel",
        "image" : "/images/p1.jpg",
        "price" : 120,
        "countInStock" : 10,
        "brand" : "Nike",
        "rating" : 4.5,
        "numReviews" : 10,
        "description" : "high quality product",
        "reviews" : [],
    },
    {
        "name" : "Makroudh",
        "category" : "Gâteau au miel",
        "image" : "/images/p2.png",
        "price" : 100,
        "countInStock" : 20,
        "brand" : "Adidas",
        "rating" : 4,
        "numReviews" : 10,
        "description" : "Makroudh tunisien",
        "reviews" : [],
    },
    {
        "name" : "Grawich",
        "category" : "Gâteau au miel",
        "image" : "/images/p3.jpg",
        "price" : 220,
        "countInStock" : 0,
        "brand" : "Lacoste",
        "rating" : 4.8,
        "numReviews" : 17,
        "description" : "high quality grawich yitgharmich",
        "reviews" : [],
    },
    {
        "name" : "Sablés fondants à la confiture",
        "category" : "Gâteau sec",
        "image" : "/images/p4.jpg",
        "price" : 78,
        "countInStock" : 15,
        "brand" : "Nike",
        "rating" : 5,
        "numReviews" : 1,
        "description" : "Que diriez-vous de sablés pour le gouter ?? mais ceux-la sont ultra fondants à la confiture. J’ai déjà une série de recettes de biscuits sur mon blog pour des évènements spéciaux ou tout simplement un après-midi en famille ou entre amis autour d’un café ou un thé à la menthe.Une recette qui reste très facile, l’ajout de la maïzena les rend fondants à souhait. Ma petite touche je badigeonne le sable de blanc d’oeuf et je saupoudre de pistaches concassées que vous pouvez remplacer par des amandes ou noisettes concassées ou tout simplement les saupoudrer de sucre glace.Cette recette je l’ai déniché chez ma chère Ranouza du joli blog Un brin de gourmandise.Cette année j’ai décidé de participer à des jeux culinaires cela permet de sortir un peu de la routine mais aussi de découvrir de nouveaux blogs et de tester des recettes ! Et le 23 du mois c’est au tour de Foodista Challenge, c’est ma première participation 🙂",
        "reviews" : [],
    },
    {
        "name" : "Les manicotti tunisiens (Deblah)",
        "category" : "Gâteau au miel",
        "image" : "/images/p5.jpg",
        "price" : 65,
        "countInStock" : 5,
        "brand" : "Puma",
        "rating" : 4.5,
        "numReviews" : 10,
        "description" : "Une recette de famille aujourd'hui, avec un incontournable de la cuisine juive tunisienne, les manicotti",
        "reviews" : [],
    },
    {
      "name" : "sablés au nutella",
      "category" : "Gâteau sec",
      "image" : "/images/p6.jpg",
      "price" : 139,
      "countInStock" : 12,
      "brand" : "Adidas",
      "rating" : 4.5,
      "numReviews" : 15,
      "description" : " ils sont très fondants a la bouche, facile a réaliser et avec des ingrédients simples.",
      "reviews" : [],
    },
  ],
};
export default data;
