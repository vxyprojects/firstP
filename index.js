var express = require('express');
var path = require('path');
var app = express();
//app.set('views', '/node_view');
app.set('views', path.join(__dirname, '/node_view'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


//app.get('/', function (req, res) {
//    res.send('Hello World!');
//});

//var server = app.listen(3000, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//
//    // console.log('앱은 http://%s:%s 에서 작동 중입니다.', host, port);
//    console.log('앱은 http://%s:%s 에서 작동 중입니다.', host, port);
//});


app.customRender = function (root, name, fn) {
    var engines = app.engines;
    var cache = app.cache;
    view = cache[root + '-' + name];
    if (!view) {
        view = new (app.get('view'))(name, {
            defaultEngine: app.get('view engine'),
            root: root,
            engines: engines
        });
        ;
        if (!view.path) {
            var err = new Error('Failed to lookup view "' + name + '" in views directory "' + root + '"');
            err.view = view;
            return fn(err);
        }

        cache[root + '-' + name] = view;
    }

    try {
//        view.render(opts, fn);
        view.render(fn);
    } catch (err) {
        fn(err);
    }
}

app.get('/', function (req, res) {
    console.log('111');
    app.customRender(path.join(__dirname, '/node_view'), 'index', function (err, html) {
//    app.customRender(path.join('/node_view'), 'index', function (err) {
//    app.customRender('/node_view', 'index', function (err, html) {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(200);
//            res.send(200, html);
//            res.sendStatus(200, html);

        }

    });

});


app.listen(3000);

