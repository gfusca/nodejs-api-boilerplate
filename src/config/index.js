const config = {
    "server": {
      "PORT": process.env.PORT || 8088,
      "JWT_SECRET": process.env.JWT_SECRET || "secret",
      "JWT_TIMEOUT": process.env.JWT_TIMEOUT || 86400
    },
    "VERSION": process.env.API_VERSION || "v1",
    "MONGO_URL": process.env.MONGO_URL || "mongodb://root:mag.root@localhost:27107/magnetico",
}

module.exports = config;