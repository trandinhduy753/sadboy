FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git zip unzip libpq-dev libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd exif

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 🟢 Copy toàn bộ source trước
COPY ./src ./

# 🟢 Tạo thư mục cần thiết (phòng khi thiếu)
RUN mkdir -p database/factories database/seeders

# 🟢 Cài đặt composer dependencies
RUN composer install --no-interaction --prefer-dist --no-dev --optimize-autoloader

RUN php artisan config:clear \
    && php artisan cache:clear \
    && php artisan route:clear \
    && php artisan view:clear \
    && php artisan optimize

# Phân quyền storage và bootstrap/cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache


EXPOSE 9000
CMD ["php-fpm"]
