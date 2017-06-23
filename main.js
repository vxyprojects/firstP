module.exports = function (app, fs) {
    var request = require('request');
    app.get('/', function (req, res) {
        res.render('index', {
//        res.render('oauth', {
//        res.render('indextest', {
//            res.render('indexajaxtest', {
//        res.render('login', {
            title: "MY HOMEPAGE",
            length: 5
        })
    });

    app.get('/oauth', function (req, res) {


        var stest = `<!DOCTYPE html>
<html>
    <head>
        <title>Kakao Web Login</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta content='website' property='og:type'>
        <meta content='카카오계정' property='og:title'>
        <meta content='/assets/og_kakao-647358f65df075833642b25b50567a2f.png' property='og:image'>
        <script src="/js/jquery-1.9.1.min.js" type="text/javascript"></script>
        <script src="/js/spin.min.js" type="text/javascript"></script>
        <script src="/js/jquery.watermark.min.js" type="text/javascript"></script>
        <script src="/js/modulejs-1.13.0.min.js" type="text/javascript"></script>
        <script src="/assets/weblogin-2746f8e51e0eb26eff12472041982940.js" type="text/javascript"></script>
        <script>
                $(function(){
                         $(":input[placeholder]").each(function(){
                                $(this).watermark($(this).attr('placeholder'));
                         });
                });
        </script>
          <link href="/assets/weblogin/layout-6848088602aea34a5a5f2363506911fe.css" media="screen" rel="stylesheet" type="text/css" />
<link href="/assets/weblogin/common-2a8f0e5fdfc60a8bb036359fd3fb327b.css" media="screen" rel="stylesheet" type="text/css" />
<link href="/assets/weblogin/main-de155ec6d91abdceff2ad7b83c50dd87.css" media="screen" rel="stylesheet" type="text/css" />
 <script src="/js/weblogin/releases/jquery.kakaoLogin-1.4.0.min.js" type="text/javascript"></script>
 <script src="/assets/web2app/userAgent-658d90dbc7d32e210f45a2dc81a8681d.js" type="text/javascript"></script>
  <script>
    if(window.util.userAgent().platform == 'pc'){
        //PC에서만 실행 될 스크립트
        if ($(window).width() < 480 || $(window).height() < 620) {
            window.resizeTo(Math.max($(window).width(), 480), Math.max($(window).height(), 680));
        }
        document.cookie = "as_mobile=false";
    } else {
        if ($(window).width() < 480 || $(window).height() < 620) {
            window.resizeTo(480, 680);
            document.cookie = "as_mobile=true";
        }
    }
    $(function(){
        var spinner = kakao.weblogin.MaskedSpinner;
        var kakaoLogin = $('#login-form').kakaoLogin({
            login : function(){
                spinner.spin();
                return true;
            },
            always : function(){
                spinner.stop();
            },
            error : function(message){
                $('#error-message').html(message);
            },
            done : function(data) {
              if (data.status == 0) {
                document.cookie = "as_mobile=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
                location.href = this.continue_url;
              } else {
                this.error(data.message);
              }
            },
            callback_url : location.protocol + '//' + location.host + '/cb.html'
        }, '');
        $('#btn_login').click(function(){
            $('#login-form').submit();
            return false;
        });

        var input_email = $('.email-input');
        var div_tooltip = $('div.email_tooltip');
        var button_tooltip = $('#btn_email_tooltip');

        button_tooltip.click(function(){
            $("div.email_tooltip").toggle();
            $('#btn_email_tooltip').toggleClass("btn-close");
        });

        // 이메일 필드에 커서를 놓으면 툴팁을 닫아준다
        input_email.focus(function(){
            div_tooltip.hide();
            button_tooltip.removeClass('btn-close').addClass('btn-help');
        });

        // 이메일을 입력하기 시작하면 ? 버튼을 숨기고, 다시 필드가 비면 ? 버튼을 노출한다
        input_email.on('keyup keypress blur change', function() {
            if($(this).val()) {
                button_tooltip.hide();
                button_tooltip.removeClass('btn-close').addClass('btn-help');
            } else {
                button_tooltip.removeClass('btn-close').addClass('btn-help');
                button_tooltip.show();
            }
        });
    });
  </script>

        <!--[if lt IE 9]>
        <script src="/js/respond.min.js" type="text/javascript"></script>
        <![endif]-->
        <script type="text/javascript">
          var _tiq="undefined"!=typeof _tiq?_tiq:[];_tiq.push(["__setConfig",{enableSPA:!0,disableQuery:!0,enableClick:!0}]),_tiq.push(["__trackPageview"]),function(e){var t=e.createElement("script");t.type="text/javascript",t.async=!0,t.src=location.protocol+"//m2.daumcdn.net/tiara/js/td.min.js";var n=e.getElementsByTagName("head")[0];n.appendChild(t)}(document);
        </script>
    </head>
    <body>
        <div class="wrap">
                <html lang="en">
<div class="header">
    <a href="/login?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D495aa953bc3aab844342f7e90981fec5%26redirect_uri%3D%2Foauth%26response_type%3Dcode">
  <img alt="Logo_kakao" src="/assets/weblogin/logo_kakao-234837c7e519e51afadb6a0523567929.png" /><img alt="Pc_login_title" src="/assets/en/weblogin/pc_login_title-a92c0b6037087518d775845fb93e72ef.png" />
    </a>
  <span class="right">
    <a href="http://www.kakao.com/helps?service=8&locale=en" target="_kakao">FAQ</a>&nbsp;
    <a href="http://www.kakao.com/requests?locale=en" target="_kakao">Contact Us</a>
  </span>
</div>

<div class="cont-wrap">
      <div class="left-banner">
        <img alt="Kakao_accounts_banner" src="/assets/en/weblogin/kakao_accounts_banner-8b680a126886a9446c20be1fe4eed01c.png" />
      </div>
  <div class="login-area-wrap">
    <div class="login-area">
      <div class="subtitle">
        <img alt="Loginbox_ci" src="/assets/weblogin/loginbox_ci-6c3d2afea85a3ff758d336e7ce9ed28b.png" title="Kakao" />
      </div>
      <div class="container">
        <form method="POST" id="login-form" style="align:right">
          <fieldset>
            <input type="hidden" name="type" value="w"/>
            <input type="hidden" name="continue" value='https://kauth.kakao.com/oauth/authorize?client_id=495aa953bc3aab844342f7e90981fec5&amp;redirect_uri=/oauth&amp;response_type=code'>
            <label for="email" class="screen_out">Email addressInput</label>
            <input id="email" type="text" class="email-input" name="email" value="" placeholder="Email address">
            <!--[if IE 8]><div class="old-ie"><![endif]-->
            <button type="button" class="btn-help" id="btn_email_tooltip" aria-hidden="true" tabindex="-1"></button>
            <div class="email_tooltip" style="top: 70px; display: none;">
              <span class="arr" style="left:auto;right:10px"></span>
              <p>Kakao Account is an email based ID linked to Kakao services.</p>
              <div class="bn_box">
                <a href="/weblogin/find_account_guide?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D495aa953bc3aab844342f7e90981fec5%26redirect_uri%3D%2Foauth%26response_type%3Dcode" class="link_find">Find Account
                  ></a>
              </div>
            </div>
            <!--[if IE 8]> </div> <![endif]-->
            <label for="password" class="screen_out">PasswordInput</label>
            <input type="password" id="password" name="password" placeholder="Password (4-16 letters)"/>
            <div class="remember">
              <input type="checkbox" name="remember" value="true"  /><label class="label" for="remember">Remember my account</label>
            </div>
            <a href="#" id="btn_login" class="btn-login"><img alt="Log In" src="/assets/en/weblogin/pc_login_text-c37466dd96ec10645e8fd54d3b6e5ea5.png" /></a><input type="submit" style="visibility: hidden;"/>
            <div class="error">
              <span id="error-message"></span>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="login-help">
        <a href="/weblogin/create_account?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D495aa953bc3aab844342f7e90981fec5%26redirect_uri%3D%2Foauth%26response_type%3Dcode" class="signup">Sign Up</a>
        <div class="right">
          <a href="/weblogin/find_account_guide?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D495aa953bc3aab844342f7e90981fec5%26redirect_uri%3D%2Foauth%26response_type%3Dcode">Find Account</a>
          <a href="/weblogin/find_password?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D495aa953bc3aab844342f7e90981fec5%26redirect_uri%3D%2Foauth%26response_type%3Dcode" class="last">Reset Password</a>
        </div>
      </div>
    </div>
  </div>
</div>


                        <div class="footer">
                                <ul>
                                        <li class="first"><a href="http://kakao.com/policy/terms" target="_kakao">Terms of Service</a></li>
                                        <li><a href="http://kakao.com/policy/privacy" target="_kakao">Privacy Policy</a></li>
                                        <li><a href="http://kakao.com/policy/oppolicy" target="_kakao">Operation Policy</a></li>
                                        <li><a href="http://kakao.com/notices" target="_kakao">Notices</a></li>
                                </ul>
        <div class="copyright">Copyright &copy; <a href="http://www.kakaocorp.com/">Kakao Corp.</a> All rights reserved.</div>
                </div>
        </div>

        </body>
</html>
`;
//        res.send(stest);

//        res.render('oauth')
    });

    app.get('/dynamic', function (req, res) {
        var lis = '';
        for (var i = 0; i < 5; i++) {
            lis = lis + '<li>coding</li>';
        }
        var time = Date();
        var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
    </body>
  </html>`;
//        console.log(typeof  output);
        res.send(output);
    });


    app.post('/form_receiver', function (req, res) {
        var title = req.body.title;
        var description = req.body.description;
        res.send(title + ',' + description);
    });

    app.post('/reg_date', function (req, res) {

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'ec2-52-79-166-70.ap-northeast-2.compute.amazonaws.com',
            user: 'root',
            password: '',
            port: '3306',
            database: 'test'
        });

        connection.connect();
        console.log('req.body.start_date')
        console.log(req.body.start_date)
        console.log('req.body.end_date')
        console.log(req.body.end_date)


        //auto incremoent 처리하는 법
        var myResponse = {
            cal_text: req.body.schedule_contents,
            user_id: 'user_id2',
            user_name: 'user_name',
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            start_time: 'start_time',
            end_time: 'end_time'
        };

        connection.query('INSERT INTO vxy_cal SET ?',
            myResponse, function (err, result) {

                if (!err) {
                    //todo 여기가  에러 나고있다.
                    res.send('no error');
                }
                else {
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

        connection.connect();


        //auto incremoent 처리하는 법  modi  처리
        var myResponse = {
            cal_text: req.body.schedule_contents,
            user_id: 'user_id2',
            user_name: 'user_name',
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            start_time: 'start_time',
            end_time: 'end_time'
        };


//        connection.query('update vxy_cal set area = ? where idx=?',
//            myResponse, function (err, result) {
//
//                if (!err) {
//                    //todo 여기가  에러 나고있다.
//                    res.send('no error');
//                }
//                else {
//                    console.log(err);
//                }
//            });


    });


    app.get('/calender_view', function (req, res) {

        var mysql = require('mysql');
        var connection = mysql.createConnection({
            host: 'ec2-52-79-166-70.ap-northeast-2.compute.amazonaws.com',
            user: 'root',
            password: '',
            port: '3306',
            database: 'test'
        });
        connection.connect();
        connection.query('SELECT * from vxy_cal', function (err, rows, fields) {
            if (!err) {
//                console.log('The solution is: ', rows);
                res.render('calender', {
                    cal_data: JSON.stringify(rows)
                })
            } else {

                console.log('Error while performing Query.', err);
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