import mongoose from "mongoose";
import { productModel } from "./models/products.model.js";
import { cartModel } from "./models/carts.model.js";

class ProductDBManager {

    async read() {
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async create(product) {

        try {
            const newProduct = new productModel(product);
            let result = await newProduct.save();
            return result;
        } catch (err) {
            throw err;
        }
    }

    async update(id, newProduct) {

        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, newProduct, { new: true });
            return updatedProduct;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(id);
            return deletedProduct;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

}

class CartDBManager {

    // createCart = (products) => {
    //     const cart = new Object();
    //     cart.products = products;
    //     return cart;
    // }

    async read() {
        try {
            const cart = await cartModel.find();
            return cart;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async create(cart) {
        try {
            const newCart = new cartModel(cart);
            let result = await newCart.save();
            return result;
        } catch (err) {
            throw e;
        }
    }

    async addProductToCart(cartId, productIdToAdd) {

        try {
            //Search for the cart in DB
            const cartSearched = await cartModel.findById(cartId);

            //Search for the product in DB
            const productSearched = await productModel.findById(productIdToAdd);

            const productInCart = cartSearched.products.find((p) => p.id === productIdToAdd);

            if (productInCart) {
                //The product it's already in the cart.
                //Increment quantity.
                console.log("Product already in cart. Quantity incremented by one.")
                productInCart.quantity++;
            } else {
                console.log("Adding a new product to cart.")
                cartSearched.products.push({ id: productIdToAdd, quantity: 1 });
            }

            //Update the cart in DB
            const updatedCart = await cartModel.findByIdAndUpdate(cartId, { $set: { products: cartSearched.products } }, { new: true });
            return updatedCart;
        } catch (err) {
            console.log(err);
            throw e;
        }
    }

    async deleteProductFromCart(cartId, productId) {
    try {

        const cartToModify = await cartModel.findById(cartId);

        const index = cartToModify.products.findIndex((p) => p === productId);

        console.log(index);

        if (index === -1) {
            throw new Error("Product not found in cart");
        } else {
            cartToModify.products.splice(index, 1);
            const updatedCart = await cartModel.findByIdAndUpdate(cartId, { $set: { products: cartToModify.products } }, { new: true });
            return updatedCart;
        }

    } catch (err) {
        throw err;
    }
}

    async delete (cartId){

}

}

export { ProductDBManager, CartDBManager };