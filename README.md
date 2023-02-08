# Proyecto Final Backend NodeJS de CoderHouse

## Autenticación de Usuarios

### Dependencias implementadas
* Mongo-store, mongoose, connect-mongo passport, passport-local y bcrypt

Dependiendo de la conexión a MongoDB (Local o Cloud), los usuarios almacenan en la base de datos su e-mail y su
contraseña, esta última siendo encriptada con la dependencia bcrypt
Una vez iniciada la sesión, el usuario va a tener un límite de tiempo en caso de que no haya actividad en la API-REST, de lo contrario, se lo va a redireccionar nuevamente al signIn
El límite de tiempo fué aplicado con las cookies en la dependencia MongoStore


## API-Rest

### Framework Principal ==> Express

### Dependencias implementadas
* express, express-graphql, express-session

Están aplicados todos los verbos aplicados (GET, POST, PUT, DELETE) con sus respectivos end-points (rutas)

### PERSISTENCIAS
* sqlite3, firebase-admin, knex

#### Persistencia productos

En los DAOs de los productos se puede optar por inicializar el proyecto con sus dependencias en memoria o con
SQL haciendo las consultas desde la consola o ejecutando algún archivo de javascript teniendo como ejemplo el que
se encuentra en la ruta ./src/db/consultas-sqlite.js
Las funciones dentro de los DAOs usan knex para encontrar algún producto por ID o para elegir toda la colección.

#### Persistencia mensajes

A diferencia de los productos, persistencia en base de datos de los mismos es en Firebase
La estructura de los mensajes está ordenada con normalizr


### LOGS de las rutas

#### Dependencias implementadas
* pino

Tanto las rutas que se encuentran como las que no, por c/u, se envía al archivo ./src/logs/debug.log la respuesta
de cada petición

### Uso de Socket.IO
* socket.io

El uso de sockets es para interactuar consultas de la API en el frontend. Así podemos visualizar los cards de los productos con sus características: título, precio, imagen
No pude aplicar todas las consultas en el front-end, aunque se pueden implementar todas con POSTMAN.

### Carrito
* nodemailer

En el carrito, además de ver las características (del/de los) producto/s agregado/s también van a tener su respectiva cantidad y el precio total. Junto con un botón de procesar el pago de los mismos en el cuál implementé la API de MercadoPago. Al mismo tiempo se envía mediante el uso de nodemailer un resumen por correo de la orden de compra con los detalles. No pude aplicar un límite de stock para cada producto.



## Frontend

### Motor de plantillas implementado ==> EJS
* ejs

Todo los archivos estáticos pertenecientes al frontend están en la carpeta /public
Casi todos los estilos de CSS y funciones de JS se agregaron con la librería de bootstrap5


## Dependencias Complementarias

### Dependencias
* faker, os

Usando las funciones en los middlewares, vistos en clase, podemos obtener: números aleatorios, productos aleatorios (uso de faker) y obtener datos del sistema (uso de os)


## Comandos NPM
* nodemon

### npm run start  ==>  node ./src/server.js

La autenticación de usuarios se ejecuta con MongoDB Cloud. La persistencia de los productos y los mensajes se establecen en memoria


### npm run dev  ==>  nodemon ./src/server.js Memory Memory mongodb://localhost/27017

La autenticación de usuarios se ejecuta con MongoDB Local. La persistencia de los productos y los mensajes se establecen en memoria 


### npm run dev  ==> nodemon ./src/server.js SQLite Firebase

La autenticación de usuarios se ejecuta con MongoDB Cloud. La persistencia de los productos y los mensajes se establecen con SQL y Firebase respectivamente


### npm run DBscript  ==>  node ./src/persistence/store/script.js

Crea las tablas para las bases de datos de SQL y Firebase para los productos y los mensajes
En caso de haber sido creados anteriormente, los mismos se reiniciarán
