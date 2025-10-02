/**
 * Calculate total price of an order based on product prices and quantities
 * @param {string} listProduct - Product list string in format "PRO001&S-2&M-3&L-1 PRO002&M-2&L-3"
 * @param {Object} productPrices - Object containing product prices in format {PRO001: "46058-S 47000-M 50000-L"}
 * @returns {number} Total price of the order
 */
export function calculateOrderTotal(listProduct, productPrices) {
    let total = 0;
    
    // Split into individual products
    const products = listProduct.split(' ');
    
    products.forEach(product => {
        // Split product ID and sizes
        const [productId, ...sizes] = product.split('&');
        
        // Get price string for this product
        const priceString = productPrices[productId];
        if (!priceString) return;
        
        // Parse price string into object
        const prices = {};
        priceString.split(' ').forEach(price => {
            const [value, size] = price.split('-');
            prices[size] = parseInt(value);
        });
        
        // Calculate total for each size
        sizes.forEach(size => {
            const [sizeType, quantity] = size.split('-');
            const price = prices[sizeType];
            if (price) {
                total += price * parseInt(quantity);
            }
        });
    });
    
    return total;
} 