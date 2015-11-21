var url_override = (process.env.URL_OVERRIDE || "http://serene-plains-5818.herokuapp.com");

var ids = {
    google: {
        callbackURL: url_override + "/champion-login/callback",
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }
};

module.exports = ids;
