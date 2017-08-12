(function () {
    function l(a) {
        a = {redirect_uri: "kakaojs", response_type: "code", state: a};
        for (var b in f)f.hasOwnProperty(b) && (a[b] = f[b]);
        b = [];
        for (var c in a)if (a.hasOwnProperty(c)) {
            var d = a[c];
            d === Object(d) && (d = JSON.stringify(d));
            b.push(encodeURIComponent(c) + "\x3d" + encodeURIComponent(d))
        }
        return "/oauth/authorize?" + b.join("\x26")
    }

    function k(a, b, c) {
        b = b || document.domain;
        document.cookie = a + "\x3d; expires\x3dThu, 01 Jan 1970 00:00:00 GMT; domain\x3d" + b + "; path\x3d" + (c || "/")
    }

    var g;
    try {
        g = window.self !== window.top
    } catch (m) {
        g = !0
    }
    if (g) {
        var f = {}, e = new easyXDM.Rpc({}, {
            local: {
                setClient: function (a, b, c, d, e) {
                    c === Object(c) ? f = c : f.client_id = c;
                    c = document.getElementById("kakao-login-btn");
                    c.className = a + " " + b;
                    return {width: c.offsetWidth, height: c.offsetHeight}
                }, setStateToken: function (a, b, c) {
                    window.document.getElementById("kakao-login-btn").onclick = function () {
                        window.open(l(a), "", "width\x3d480, height\x3d520")
                    }
                }, deleteAuthCookie: function (a, b) {
                    k("_kawlt", ".kakao.com", "/");
                    k("_maldive_oauth_si", ".kakao.com", "/");
                    return !0
                }, getCode: function (a, b) {
                    reqwest({
                        url: "/apiweb/code.json", method: "get", data: {state: a, client_id: b}, success: function (a) {
                            e.postResponse(a)
                        }
                    })
                }, getAccessToken: function (a, b, c) {
                    reqwest({
                        url: "/oauth/token",
                        method: "get",
                        headers: {KA: getKakaoAgent()},
                        data: {
                            grant_type: "authorization_code",
                            code: a,
                            redirect_uri: c,
                            client_id: b,
                            approval_type: "individual",
                            client_origin: getProxyOrigin()
                        },
                        success: function (a) {
                            e.postResponse(a)
                        }
                    })
                }
            }, remote: {postResponse: {}, getKakaoAgent: {}}
        });
        window.postResponse = function (a) {
            var b = {};
            easyXDM.apply(b, a);
            e.postResponse(b, function (a) {
            }, function (a) {
                console.log("Errogir: " + JSON.stringify(a))
            })
        };
        window.getProxyOrigin = function () {
            return e.origin
        };
        var h = "os/javascript";
        window.getKakaoAgent = function () {
            return h
        };
        e.getKakaoAgent(function (a) {
            h = a
        }, function (a) {
            h = "sdk/\x3c\x3d1.0.3 os/javascript lang/" + (navigator.userLanguage || navigator.language) + " device/" + navigator.platform.replace(/ /g, "_")
        })
    }
})();