FROM php:8.2-fpm

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    zip curl vim \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql exif

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy source code
COPY . .

# Tạo folder cần thiết
RUN mkdir -p database/factories \
    && mkdir -p database/seeders \
    && mkdir -p storage/framework/cache/data \
    && touch database/factories/.gitkeep

# Set quyền
RUN chown -R www-data:www-data storage bootstrap/cache

# Composer
RUN composer install --no-dev --optimize-autoloader

EXPOSE 9000
CMD ["php-fpm"]
