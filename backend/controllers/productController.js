// Mock Data (To be replaced with real DB queries)
const products = [
    { id: 1, name: "Oversized Heavyweight Hoodie", price: 85.00, image: "hoodie.jpg", category: "Apparel" },
    { id: 2, name: "Minimalist Cargo Pants", price: 110.00, image: "cargo.jpg", category: "Apparel" },
    { id: 3, name: "Matte Black Titanium Ring", price: 45.00, image: "ring.jpg", category: "Accessories" }
];

const getProducts = async (req, res) => {
    try {
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Server Error fetching products" });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getProducts, getProductById };