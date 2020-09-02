// Credentials for jwt Secret and Database
module.exports = {
    MONGO_URI: process.env.MONGODB_URI || process.env.DATABASE_INFO,
    jwtSecret: process.env.JWT_SECRET,
    awsKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY
}