# Usage
- Clone this repository: `git clone https://github.com/smoothkt4951/KT-Ecommerce.git`
- Change directory to use backend: `cd backend`

## Description .env files
- [.env.sample](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.env.sample): Template for .env files
  + `PORT`: Port to start server
  + `DB_USER`: SQL Server username, should be `sa` account
  + `DB_PWD`: SQL Server password
  + `DB_NAME`: your Database name
  + `JWT_SECRET`: secret key
  + `MONGODB_URI`= MongoDB connection URI
 - rename it `.env.development`: development environment
 - rename it `.env.test`: test environment
 - rename it: `.env.product`: docker container environment
## API Documents
- Edit file [.env.sample](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.env.sample) to suitable for your port in localhost and Database Config 
- Rename it `.env.development`
- `npm start`
- `http://localhost:PORT/api-docs/`
## Test
- Edit file [.env.sample](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.env.sample) to suitable for your port in localhost and Database Config 
- Rename it `.env.test`
- If you want to test workflow, just run command: `npm test` or `npm run coverage`
- IF you want to test API one by one, you have to edit file [.mocharc.json](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.mocharc.json)
    + replace: `"ignore": ["test/api/**"],` with `"ignore": ["test/workflow/**"],`
- `npm test` or `npm run coverage`
- 
## Start
- Edit file [.env.sample](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.env.sample) to suitable for your port in localhost and Database Config 
- Rename it `.env.development`
- `npm start`

## Docker Container
- Edit file [.env.sample](https://github.com/smoothkt4951/KT-Ecommerce/blob/main/backend/.env.sample) to suitable for your port in localhost and Database Config 
- Rename it `.env.product`
- `docker-compose up`

