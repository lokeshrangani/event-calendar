### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/lokeshrangani/react-laravel.git
   ```
2. Goto react-app folder 
   ```sh
   cd react-app
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Goto laravel folder 
   ```sh
   cd.. && cd laravel
   ```
5. Install Composer dependencies
   ```sh
   composer install
   ```
6. Generate Application Key
    ```sh
    php artisan key:generate
    ```
7. Generate JWT Secret
    ```sh
    php artisan jwt:secret
    ```
8. Create DB and make connection in .env
    ```sh
      DB_CONNECTION=mysql
      DB_HOST=HOST
      DB_PORT=PORT
      DB_DATABASE=DB_NAME
      DB_USERNAME=DB_USER
      DB_PASSWORD=DB_PASSWORD
    ```
9. Run Migration
    ```sh
    php artisan migrate
    ```
10. Create .env file and Set API End point in react .env
    ```sh
    REACT_APP_API_URL=PATH_TO_LARAVEL_PROJECT eg.http://localhost/react-laravel/laravel
    ```
11. Set file/folder permissions.
    ```sh
    chmod
    ```
