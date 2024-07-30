export const appConfig = () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    hostname: process.env.DB_HOSTNAME || 'localhost',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    databaseName: process.env.DB_NAME || 'postgres',
    databasePort: process.env.DB_PORT || '5432',
  },
})
