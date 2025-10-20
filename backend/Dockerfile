# Chọn image PHP
FROM php:8.2-fpm

# Cài đặt các extension cần thiết
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    curl zip vim \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql exif

# Cài Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel code
COPY . .

# Cài dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

# Set quyền cho storage và cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port 9000 cho php-fpm
EXPOSE 9000

CMD ["php-fpm"]
