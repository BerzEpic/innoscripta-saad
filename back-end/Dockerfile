# Use an official PHP image as the base
FROM php:8.0-apache

# Set the working directory in the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    unzip

# Enable Apache modules
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath xml zip

# Copy the application files to the working directory
COPY . .

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-interaction --no-scripts --prefer-dist

# Generate application key
RUN php artisan key:generate

# Run database migrations and seeders
RUN php artisan migrate --seed

# Set Apache document root
RUN sed -i -e 's/html/html\/public/g' /etc/apache2/sites-available/000-default.conf

# Expose port 8000
EXPOSE 8000

# Start Apache server
CMD ["apache2-foreground"]
