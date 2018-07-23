var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function() {
    passport.use(
        new LocalStrategy({
           usernameField: 'id',
           passwordField: 'pw'
        },
        function(id, pw, done) {
            //
        }
    ));
};
