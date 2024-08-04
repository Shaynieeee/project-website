'use strict'

const repository = require('../repositories/product-repository');

exports.getProducts = async () => {
    try {
        const result = await repository.get();
        return result;
    } catch (error) {
        throw error;
    }
};

exports.createProducts = async (productData, cb) => {
    try {
        // Validasi data sebelum mengirim ke repository
        if (!productData.name || !productData.price || !productData.exp) {
            throw new Error('Invalid product data'); // Validasi dasar
        }
        const result = await repository.post(productData);
        return result; // Pastikan format hasil sesuai dengan ekspektasi
    } catch (error) {
        console.error('Error in postProducts:', error); // Menambahkan logging
        throw new Error('Failed to create product'); // Menambahkan pesan error yang lebih spesifik
    }
};

exports.deleteProduct = async (id) => {
    try {
        return await repository.delete(id);
    } catch (error) {
        console.error('Error in deleteProduct:', error);
        throw new Error('Failed to delete product');
    }
};

exports.updateProduct = async (id, productData) => {
    try {
        if (!productData.name || !productData.price || !productData.exp) {
            throw new Error('Invalid product data');
        }
        return await repository.update(id, productData);
    } catch (error) {
        console.error('Error in updateProduct:', error);
        throw new Error('Failed to update product');
    }
};
