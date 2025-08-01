### Installed packages
```bash
    npm init -D
```
#### Pakages set 01
##### Express -> Is a web frameworks allows to developed APIs
##### Mongoose -> For databases
##### Dot env -> Access fro encironment variables
##### Jsonwebtoken -> Used for authentication
##### Cloudinary -> Can upload images
##### Bycyptjs -> Hash the passwords
##### Cors ->  Handle Cross-Origin Resource Sharing (CORS) — to control which frontend domains are allowed to access the backend APIs.
```bash
    npm i express mongoose dotenv jsonwebtoken cloudinary bcryptjs cors
```
```bash
    npm i nodemon -D
```
###### Create better secret code for jwt
```bash
    openssl rand -base64 32 
```
###### CORN pkg for send server req automatically after evert 14min
```bash
    npm i corn 
```