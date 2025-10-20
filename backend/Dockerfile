FROM php:8.2-fpm

# Cài các package cần thiết
RUN apt-get update && apt-get install -y \
    git zip unzip libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd exif

# Cài composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy toàn bộ source code
COPY ./src ./

# Tạo thư mục cần thiết
RUN mkdir -p database/factories database/seeders

# Cài dependencies
RUN composer install --no-interaction --prefer-dist --no-dev --optimize-autoloader

# Clear cache, optimize
RUN php artisan config:clear \
    && php artisan cache:clear \
    && php artisan route:clear \
    && php artisan view:clear \
    && php artisan optimize

# Phân quyền storage và bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
