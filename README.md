```
 _______  _______  _        _        _______  _______ _________     _______  _        _______  _        _______ 
(  ____ \(  ___  )( (    /|( (    /|(  ____ \(  ____ \\__   __/    (  ____ \( \      (  ___  )| \    /\(  ____ \
| (    \/| (   ) ||  \  ( ||  \  ( || (    \/| (    \/   ) (       | (    \/| (      | (   ) ||  \  / /| (    \/
| |      | |   | ||   \ | ||   \ | || (__    | |         | | _____ | (__    | |      | (___) ||  (_/ / | (__    
| |      | |   | || (\ \) || (\ \) ||  __)   | |         | |(_____)|  __)   | |      |  ___  ||   _ (  |  __)   
| |      | |   | || | \   || | \   || (      | |         | |       | (      | |      | (   ) ||  ( \ \ | (      
| (____/\| (___) || )  \  || )  \  || (____/\| (____/\   | |       | )      | (____/\| )   ( ||  /  \ \| (____/\
(_______/(_______)|/    )_)|/    )_)(_______/(_______/   )_(       |/       (_______/|/     \||_/    \/(_______/
                                                                                                                
```

Connect middleware which assigns a Flake ID to every request.

# Usage #

    $ npm install connect-flake

    // load connect-flake
    var flake = require('connect-flake');

    // use the middleware which sets req.uuid
    app.use(flake('eth0'));

    // add a dynamic helper so the view can see #{uuid}
    app.all(function(req, res, next) {
        res.locals.flake = req.flake;
    });

## Uses of a Flake ID for each Request ##

Log the Flake ID in your log files to help you figure out what is going on:

    // in your logging
    myLogger(req.flake + ' : Something bad happened.');

Tell the user the Flake ID for the failed request, and get them to use it as a reference when they report the issue to
you (note: this is a Jade template):

    p Your reference is '#{flake}'.

Send yourself the Flake ID of the (failed) request so you can find it quicker:

    To: me@example.com
    From: noreply@example.com
    Subject: 50x error
    
    A web request (013c7990a044-0000-08ff-00027298bef9) failed.

You may even store the requests and/or errors in your database:

    sql> SELECT * FROM request WHERE uuid = '013c7990a044-0000-08ff-00027298bef9';

And there are many other uses too.

# Motivation #

When you have so many requests, it's hard to grep (search, find, etc) the logs to figure out what went wrong when you
get a bad request. connect-flake to the rescue.

Add this module as connect middleware and each request has a Flake ID. When you log anything, make sure you log this
Flake ID with it. When you get an error in your application, make sure you use the Flake ID when reporting it (whether
that is logged, email or whatever). Also, tell the user (in their 50x page) what the Flake ID is when something goes
wrong, so that they can tell you to sort things out.

By doing all this, you can easily find the request and what really happened to it. You may keep detailed or light logs,
but either way having a direct reference to the request will really help.

## Note ##

This package was inspired by my other package [connect-uuid](https://github.com/appsattic/connect-uuid) which was inspired by
https://groups.google.com/forum/#!msg/nodejs/2NcBM7eXD94/FVm-jL91cekJ

# Author #

Written by [Andrew Chilton](http://chilts.org/) - [Blog](http://chilts.org/blog/) -
[Twitter](https://twitter.com/andychilton).

# License #

* http://chilts.mit-license.org/2013/

(Ends)
