const express = require('express');
const cors = require('cors');
const app = express();

// --- 1. DYNAMIC CORS CONFIGURATION ---
// This allows your frontend to communicate with this backend.
const allowedOrigins = [
  'http://localhost:5173', // Local development
  'https://sls-boys-core-production.up.railway.app' // Your live Railway frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// --- 2. MIDDLEWARE ---
// Must be placed BEFORE routes
app.use(express.json());

// --- 3. DATA STORAGE (In-Memory) ---
const products = [
  {
    id: 1,
    name: "OVERSIZED HEAVYWEIGHT HOODIE",
    price: 85.00,
    category: "Upper",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Premium 450GSM cotton hoodie with a boxy, modern fit."
  },
  {
    id: 2,
    name: "MINIMALIST CARGO PANTS",
    price: 110.00,
    category: "Lower",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Multi-pocket technical cargos designed for urban utility."
  },
  {
    id: 3,
    name: "MATTE BLACK TITANIUM RING",
    price: 45.00,
    category: "Accessories",
    image: "https://images.pexels.com/photos/266666/pexels-photo-266666.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Hand-polished titanium with a deep matte finish."
  },
  {
    id: 4,
    name: "CORE GRAPHIC TEE",
    price: 40.00,
    category: "Upper",
    image: "https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Signature SLS-BOYS essential tee."
  }
];

let users = []; 
let orders = []; 

// --- 4. PRODUCT ROUTES ---
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// --- 5. AUTHENTICATION ROUTES ---
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find(u => u.email === email);
  
  if (userExists) {
    return res.status(400).json({ message: "User already exists." });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json({ 
    message: "Account created successfully!", 
    user: { name: newUser.name, email: newUser.email } 
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ 
      message: `Welcome, ${user.name}`, 
      user: { name: user.name, email: user.email } 
    });
  } else {
    res.status(401).json({ message: "Invalid credentials." });
  }
});

// --- 6. ORDER ROUTES ---
app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body;
  
  const newOrder = {
    id: `ORD-${Date.now()}`,
    date: new Date().toLocaleString(),
    customer,
    items,
    total,
    status: "Processing"
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Order placed!", orderId: newOrder.id });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// --- 7. SERVER START ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is active on port ${PORT}`);
});