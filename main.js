module.exports = function (app, fs) {
    var mysql = require('mysql');
    var jsonToQueryString = function (json) {
        console.log(json);
        console.log('json');

        return '?' +
            Object.keys(json).map(function (key) {
                console.log(encodeURIComponent(json[key]));


                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);

            }).join('&');
    }


    // 커넥션 풀 생성
    var pool = mysql.createPool({
        host: 'ec2-52-79-166-70.ap-northeast-2.compute.amazonaws.com',
        port: '3306',
        user: 'root',
        password: '',
        database: 'test',
        connectionLimit: 20,
        waitForConnections: false
    });

    /*
     * 동일 커넥션 처리가 없을 경우 사용 1번
     *
     pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
     if (err) throw err;
     console.log('The solution is: ', rows[0].solution);
     });
     */

    /*
     * 동일 커넥션 처리가필요할 경우 사용 2번 (트렌잭션 자동 증가 값등 기타등등..)
     *
     pool.getConnection(function(err, connection) {
     // Use the connection
     connection.query( 'SELECT something FROM sometable', function(err, rows) {
     // And done with the connection.
     connection.release();

     // Don't use the connection here, it has been returned to the pool.
     });
     });
     */


    var request = require('request');
    app.get('/', function (req, res) {
        res.render('index', {
            //	res.render('oauth', {
            //	res.render('indextest', {
            //	res.render('indexajaxtest', {
            //	res.render('login', {
            title: "MY HOMEPAGE",
            length: 5
        });
    });

    app.get('/oauth', function (req, res) {
        var stest = '';
        res.send(output);
    });

    app.get('/dynamic', function (req, res) {
        var lis = '';
        for (var i = 0; i < 5; i++) {
            lis = lis + '<li>coding</li>';
        }
        var time = Date();
        var output = '';
        res.send(output);
    });

    app.post('/form_receiver', function (req, res) {
        var title = req.body.title;
        var description = req.body.description;
        res.send(title + ',' + description);
    });

    app.post('/reg_date', function (req, res) {
        var oReturnData = {};

        pool.query('SELECT cal_no FROM vxy_cal  ORDER BY cal_no desc limit 1', function (err, rows, fields) {
            if (err) throw err;

            oReturnData['seq_no'] = rows;
            oReturnData['start'] = req.body.start_date;
            oReturnData['end'] = req.body.end_date;
            oReturnData['title'] = req.body.schedule_contents;
            oReturnData['label_color'] = req.body.label_color;
        });

        //auto incremoent 처리하는 법
        var myResponse = {
            cal_text: req.body.schedule_contents,
            user_id: 'user_id2',
            user_name: 'user_name',
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            cal_label_color: req.body.label_color,
            start_time: 'start_time',
            end_time: 'end_time'
        };

        pool.query('INSERT INTO vxy_cal SET ?', myResponse, function (err, result) {
            console.log('err')
            console.log(err)
            if (err) throw err;

            res.send({return_data: JSON.stringify(oReturnData)});
        });
    });


    app.post('/modified', function (req, res) {
        var sql = 'UPDATE vxy_cal SET start_date ="' + req.body.start_date + '",  end_date ="' + req.body.end_date + '"' + ', cal_label_color="' + req.body.label_color + '"' + ', cal_text="' + req.body.schedule_contents + '"' + ' WHERE cal_no=' + parseInt(req.body.cal_no);
        pool.query(sql, function (err, result) {
            if (!err) {
                console.log(result.affectedRows + " record(s) update");
                result['cal_no'] = req.body.cal_no
                res.send({
                    return_data: JSON.stringify(result)
                });
            } else {
                console.log(err);
            }
        });

    });

    app.post('/modi_date', function (req, res) {
        var body = req.body;
        //todo calno 를
        //bar에  calno 를 가지고 있어야 한다 . 그래서  클릭 했을때  calno와  관련된  데이타 값  뿌려주곳
        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'ec2-52-79-166-70.ap-northeast-2.compute.amazonaws.com',
            user: 'root',
            password: '',
            port: '3306',
            database: 'test'
        });


        connection.connect(function (err) {
            var sql = 'UPDATE vxy_cal SET start_date ="' + req.body.sStartAfterDate + '",  end_date ="' + req.body.sEndAfterDate + '"  WHERE cal_no=' + parseInt(req.body.calNo);
            connection.query(sql, function (err, result) {
                if (!err) {
                    console.log(result.affectedRows + " record(s) updated");
                    res.send({
                        return_data: JSON.stringify(result)
                    });
                } else {
                    console.log(err);
                }

            });
        });

    });


    app.get('/calender_view', function (req, res) {
        pool.query('SELECT * from vxy_cal where is_delete ="F"', function (err, rows, fields) {
            if (err) throw err;

            res.render('calender', {cal_data: JSON.stringify(rows)});
        });
    });

    app.post('/modi_view', function (req, res) {
        pool.query('SELECT * from vxy_cal where cal_no=' + req.body.cal_no, function (err, rows, fields) {

            if (err) throw err;
            res.send({
                cal_data: JSON.stringify(rows)
            });
        });

    });

    //수정페이지 - 페이지 이동 처리
    app.get('/move_modi_page', function (req, res) {

        pool.query('SELECT * from vxy_cal where cal_no=' + req.query.calNo, function (err, rows, fields) {
            if (err) throw err;
            res.render('modi_front', rows[0]);
        });
    });

    //삭제페이지
    app.post('/del_date', function (req, res) {
        console.log('req.body.cal_no')
        console.log(req.body.cal_no)


        var sql = 'UPDATE vxy_cal SET is_delete ="' + 'T' + '"  WHERE cal_no=' + parseInt(req.body.cal_no);
        pool.query(sql, function (err, result) {
            if (!err) {
//                console.log(result.affectedRows + " record(s) delete");
                result['cal_no'] = req.body.cal_no
                res.send({
                    return_data: JSON.stringify(result)
                });
            } else {
                console.log(err);
            }
        });

    });


    app.post('/login', function (req, res) {
        // rest_api key
        var client_id = '495aa953bc3aab844342f7e90981fec5';
        var redirect_url = '/oauth';

        var url = 'https://kauth.kakao.com/oauth/authorize?client_id=' + client_id + '&redirect_uri=' + redirect_url + '&response_type=code';
        //        https://kauth.kakao.com/oauth/authorize?client_id={client_id}&redirect_uri={등록한 path}&response_type=code
        var oRequestParam = {
            method: 'GET',
            url: url,
        };

        var sendData = '';
        request(oRequestParam, function (error, response, body) {
            console.log('request_login_result---------------')
            console.log(' ')
            if (!error && response.statusCode == 200) {
                // Print out the response body
                res.send({body: body});
            } else {
                console.log('error');
////                console.log(error);
//                console.log(response.statusCode);
//                console.log(response.body);
            }
        })
    });

    app.post('/send_me', function (req, res) {
        //변수
        var access_token = req.body['params[access_token]'];
        var token_type = req.body['params[token_type]'];
        var template_id = '4024';

        var Header = {
            'content-type': 'application/json',
//                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Authorization': 'Bearer' + ' ' + access_token,
        };
        var url = 'https://kapi.kakao.com/v1/api/talk/memo/send';
        var oRequestParam = {
            headers: Header,
            method: 'POST',
            url: url,
            form: {
                "template_id": "4024"
            }
        };
        request(oRequestParam, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log(response.statusCode);
                console.log(body);
            } else {
                console.log('error');
                console.log(response.statusCode);
                console.log(response.body);
            }
        })
    });

    app.post('/ajaxtest', function (req, res) {

//        console.log(req.body)
        //값 확인
//        console.log(req.body.params);
//        res.send(req.body.params);
        var http = require("http");

        var oRequestParam = {
            Header: 'Authorization: Bearer dxVysU_7h1Fyy6Af-lDK6UZRohItfyzHznC5sAoqAucAAAFcXz16Dg',
            HTTPMethod: 'POST',
            URL: 'https://kapi.kakao.com/v1/api/talk/memo/send',
            Parameter: 'template_id=4024'
        };

        http.request(oRequestParam, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                console.log('BODY: ' + chunk);
            });
        }).end();


    });

    app.get('/test', function (req, res) {
        res.render('test');
    });
}
;