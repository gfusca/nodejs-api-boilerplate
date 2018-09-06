![](https://i1.wp.com/www.helloworldforbeginners.com/wp-content/uploads/2017/01/node-express.png?w=365)
![](https://zdnet3.cbsistatic.com/hub/i/r/2018/02/16/8abdb3e1-47bc-446e-9871-c4e11a46f680/resize/370xauto/8a68280fd20eebfa7789cdaa6fb5eff1/mongo-db-logo.png)

# NodeJS API boilerpate
Aplicación base para una API REST en NodeJS.

## Instalación de dependencias
```
$ npm install
```

## Docker
En el repositorio se encuentra la configuración para la configuración de los entornos de ejecución. 
El mismo se encuentra definido en docker-compose.yml.

Para configurar e inicializar la aplicación:
```
$ docker-compose build
$ docker-compose up mongo app
```


## Configuración
La configuración se encuentra en la carpeta /config.
```
const config = {
    "server": {
      "PORT": process.env.PORT || 8088,
      "JWT_SECRET": process.env.JWT_SECRET || "secret",
      "JWT_TIMEOUT": process.env.JWT_TIMEOUT || 86400
    },
    "VERSION": process.env.API_VERSION || "v1",
    "MONGO_URL": process.env.MONGO_URL || "mongodb://root:mag.root@localhost:27107/magnetico",
}
```

## Organización de directorios

```
  src
    /config: contiene la configuración de la aplicación utilizando env vars.
    /controllers: contiene las clases responsables de comsumir el modelo de datos
    /models: contiene las clases que representan el modelo de datos de la aplicación
    /routes: contiene las clases que contiene las rutas de la aplicación (routing)
    app.js: main file
    server.js: archivo que representa la configuración e inicialización del server.
    /test: contiene los tests de la aplicación.
```

## Autenticación
Para la autenticación se utiliza express-jwt https://github.com/auth0/express-jwt