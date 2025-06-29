-- Step 1: Create products table WITHOUT foreign key constraint first
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    delivery_time VARCHAR(50) NOT NULL,
    status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Step 2: Create other tables without foreign keys
CREATE TABLE product_images (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_sizes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    size VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_colors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    color VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_tags (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    tag VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 3: Add foreign key constraints AFTER all tables are created
-- (Only run these if your sellers table exists and has the correct structure)

-- Check if sellers table exists first, then add constraint
-- ALTER TABLE products 
-- ADD CONSTRAINT fk_products_seller 
-- FOREIGN KEY (seller_id) REFERENCES sellers(id) 
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE product_images 
-- ADD CONSTRAINT fk_product_images_product 
-- FOREIGN KEY (product_id) REFERENCES products(id) 
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE product_sizes 
-- ADD CONSTRAINT fk_product_sizes_product 
-- FOREIGN KEY (product_id) REFERENCES products(id) 
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE product_colors 
-- ADD CONSTRAINT fk_product_colors_product 
-- FOREIGN KEY (product_id) REFERENCES products(id) 
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- ALTER TABLE product_tags 
-- ADD CONSTRAINT fk_product_tags_product 
-- FOREIGN KEY (product_id) REFERENCES products(id) 
-- ON DELETE CASCADE ON UPDATE CASCADE;

-- Step 4: Create indexes
CREATE INDEX idx_products_seller_id ON products(seller_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_sizes_product_id ON product_sizes(product_id);
CREATE INDEX idx_product_colors_product_id ON product_colors(product_id);
CREATE INDEX idx_product_tags_product_id ON product_tags(product_id);
