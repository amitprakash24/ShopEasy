const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const jwt = require("jsonwebtoken");
app.use(cors());
app.use(express.json());

// ================= MONGODB =================
mongoose
  .connect('mongodb+srv://amitprakashyadav7_db_user:o7B1KBWlROpsSxD0@cluster0.ththyqt.mongodb.net/Ecommerce')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// ================= BASIC API =================
app.get('/', (req, res) => {
  res.send('Express API running');
});

// ================= UPLOAD SETUP =================

app.use('/images', express.static('upload/images'));

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
});


const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: 0, message: 'No file uploaded' });
  res.json({ success: 1, image_url: `http://localhost:${port}/images/${req.file.filename}` });
});
// ================= PRODUCT MODEL =================
const Product = mongoose.model('Product', {
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true }
});

// ================= ADD PRODUCT =================
app.post('/addproduct', async (req, res) => {
  try {
    // compute next id from the current maximum id to avoid collisions
    const last = await Product.findOne().sort({ id: -1 }).select('id').lean();
    let id = last && typeof last.id === 'number' ? last.id + 1 : 1;

    // attempt to insert, retry a few times if a duplicate-key (race) occurs
    let attempts = 0;
    while (attempts < 3) {
      try {
        const product = new Product({ id, ...req.body });
        await product.save();
        return res.json({ success: true, message: 'Product added', product });
      } catch (err) {
        // Mongo duplicate key error code
        if (err && err.code === 11000 && err.keyPattern && err.keyPattern.id) {
          attempts++;
          const lastRetry = await Product.findOne().sort({ id: -1 }).select('id').lean();
          id = lastRetry && typeof lastRetry.id === 'number' ? lastRetry.id + 1 : id + 1;
          continue; // retry with new id
        }
        throw err; // other errors bubble up
      }
    }

    // if we exhausted retries
    return res.status(500).json({ success: false, error: 'Failed to add product due to id collision; try again' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ================= REMOVE PRODUCT =================
app.post('/removeproduct', async (req, res) => {
  try {
    const { id } = req.body;
    await Product.deleteOne({ id });
    res.json({ success: true, message: 'Product removed', name: req.body.name });

  } catch (err) {

    res.status(500).json({ success: false, error: err.message });
  }
});

//===all the all products api===
app.get('/allproducts', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//schema creating for user model 
const User = mongoose.model('User', {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object },
  date: { type: Date, default: Date.now }
});

//========creating end pont for register user==========

// using inline User model above; remove external require (adjust if you add models/User.js)

app.post('/signup', async (req, res) => {
  try {
    // check if user exists
    let check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create cart
    const cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    // create user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: cart
    });

    await user.save();

    // generate JWT
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom');

    res.json({ success: true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// =====user login ===
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ success: false, error: "Wrong email" });
    }

    const passCompare = req.body.password === user.password;

    if (!passCompare) {
      // include debug info temporarily to inspect mismatch (remove in production)
      return res.status(400).json({ success: false, error: "Wrong password" });
    }

    const data = {
      user: { id: user.id }
    };

    const token = jwt.sign(data, 'secret_ecom'); // ideally use env variable
    res.json({ success: true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

//===== creating endpoints for new collections
app.get('/newcollections', async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log('new collection fatched')
  res.send(newcollection)

})

//======creating end point for popular for women
app.get('/popularinwomen', async (req, res) => {

  let products = await Product.find({ category: "women" });
  let popularinwomen = products.slice(0, 4);
  console.log('popular in women fathed');
  res.send(popularinwomen);

})


// coreate the middle ware to fatch the user 
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    req.status(401).send({ errors: "Please authontic using valid token" });


  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom');
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "please authonticate a valid token " });
      //console.log(req.body,req.user);

      let userData = await User.findOne({ _id: req.user.id });
      userData.cartData[req.itemId] += 1;
      await Users.findAndUpdate({ _id: req.user.id }, { cartData: userData.cartData })
      res.send('added');
    }

  }
}

// creating the endpoints featching the api add tocart 

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Added");
})

//==========removing the cart data 
// creating endpoint to remove product from cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId); // Useful for debugging
  let userData = await Users.findOne({ _id: req.user.id });

  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1;
  }

  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
})
// =========creatin the end point to get cartdata 

app.post('/getcart', fetchUser, async (req, res) => {
  console.log("GetCart"); /* */
  let userData = await User.findOne({ _id: req.user.id }); /* */
  res.json(userData.cartData); /* */
});
// ================= SERVER =================
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
