// --------------------------------------------------------------------------------------------------------------------
//
// connect-flake.js - Connect middleware to assign a Flake ID to every request.
//
// Copyright (c) 2013 Andrew Chilton <chilts@appsattic.com> - http://chilts.org/blog/
//
// License: http://chilts.mit-license.org/2013/
//
// --------------------------------------------------------------------------------------------------------------------
//
// For example, if you put the Flake ID on a 50x page, the user can tell you it and then you can grep the logs
// for any messages related to this Flake ID.
//
// Arguments:
//     - netif - the net interface to use for the mac address (so we can generate unique IDs)
//
// --------------------------------------------------------------------------------------------------------------------

var flake = require('flake');

module.exports = function(netif) {
    var flakeGen = flake(netif);
    return function(req, res, next) {
        req.flake = flakeGen();
        next();
    };
};

// --------------------------------------------------------------------------------------------------------------------
