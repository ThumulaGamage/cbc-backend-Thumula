import Product from "../models/product.js";

export function getProducts(req,res){
    Product.find().then(
        (data)=>{
            res.json(data)
        }
    )
}

export function saveProduct(req, res){
    if(req.user == null){
        res.status(403).json({
            message: "Unauthorized"
        })
        return
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message: "Unauthorized You need to be an admin"
        })
        return
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
    });

    product
        .save()
        .then(() => {
            res.json({
                message: "Product added successfully",
            });
        })
        .catch(() => {
            res.json({
                message: "Failed to add product",
            });
        }
    );
}