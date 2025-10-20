# Base image
FROM php:8.2-fpm

# Cài các extension cần thiết
RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    curl zip vim \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql exif

# Cài Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy source code
COPY . .

# Tạo folder trống cần thiết để Composer không báo lỗi
RUN mkdir -p database/factories \
    && mkdir -p database/seeders \
    && mkdir -p storage/framework/cache/data \
    && touch database/factories/.gitkeep

# Set quyền cho storage và cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Cài dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

EXPOSE 9000
CMD ["php-fpm"]
