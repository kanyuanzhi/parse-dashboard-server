var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');

var allowInsecureHTTP = true

var api1 = new ParseServer({
        databaseURI: 'mongodb://localhost:27017/DB_KAN', // Connection string for your MongoDB database
        //cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
        appId: 'kanyuanzhi',
        masterKey: 'kanyuanzhi', // Keep this key secret!
        //fileKey: 'optionalFileKey',
        serverURL: 'http://localhost:4040/parse1' // Don't forget to change to https if needed
    }
);

var api2 = new ParseServer({
        databaseURI: 'mongodb://localhost:27017/DB_KANsecond', // Connection string for your MongoDB database
        //cloud: '/home/myApp/cloud/main.js', // Absolute path to your Cloud Code
        appId: 'kanyuanzhi2',
        masterKey: 'kanyuanzhi2', // Keep this key secret!
        //fileKey: 'optionalFileKey',
        serverURL: 'http://localhost:4040/parse2' // Don't forget to change to https if needed
    }
);

var dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:4040/parse1",
            "appId": "kanyuanzhi",
            "masterKey": "kanyuanzhi",
            "appName": "DB_KAN"
        },
        {
            "serverURL": "http://localhost:4040/parse2",
            "appId": "kanyuanzhi2",
            "masterKey": "kanyuanzhi2",
            "appName": "DB_KANsecond"
        }
    ],
    "users": [
        {
            "user": "user1",
            "pass": "pass1",
            "apps": [{"appId": "kanyuanzhi"}, {"appId": "kanyuanzhi2"}]
        },
        {
            "user": "user2",
            "pass": "pass2",
            "apps": [{"appId": "kanyuanzhi"}]
        }
    ]
}, allowInsecureHTTP);

var app = express();

// make the Parse Server available at /parse
app.use('/parse1', api1);
app.use('/parse2', api2);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040,function () {
    console.log("server started!")
});