'use strict';
const mysql = require('mysql2');
var utils = require('../lib/utils');

exports.get = async () => {
    var query = 'SELECT * FROM products';
    var connection = utils.getDBConnection();

    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
            connection.end(); 
        });
    });
};

exports.post = async (productData) => {
    const { name, price, exp } = productData;
    const connection = utils.getDBConnection();

    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO products (name, price, exp) VALUES (?, ?, ?)', 
            [name, price, exp],
            (err, results) => {
                if (err) {
                    console.error('Error in post:', err); // Log error untuk debugging
                    reject(err);
                } else {
                    resolve({ id: results.insertId });
                }
                connection.end(); 
            });
    });
};

exports.delete = async (id) => {
    const connection = utils.getDBConnection();

    return new Promise((resolve, reject) => {
        connection.query(
            'DELETE FROM products WHERE id = ?', 
            [id],
            (err, results) => {
                if (err) {
                    console.error('Error in post:', err); // Log error untuk debugging
                    reject(err);
                } else {
                    resolve({ message: 'Product deleted successfully' });
                }
                connection.end(); 
            });
    });
};

exports.update = async (id, productData) => {
    const { name, price, exp } = productData;
    const connection = utils.getDBConnection();

    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE products SET name = ?, price = ?, exp = ? WHERE id = ?', 
            [name, price, exp, id],
            (err, results) => {
                connection.end();
                if (err) {
                    return reject(err);
                }
                if (results.affectedRows > 0) {
                    resolve({ message: 'Product updated successfully' });
                } else {
                    reject(new Error('Product not found'));
                }
            }
        );
    });
};