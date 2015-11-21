var ids = {
    google: {
        callbackURL: "http://127.0.0.1:5000/champion-login/callback",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
}

module.exports = ids;
