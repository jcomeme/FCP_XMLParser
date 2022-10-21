var csv = [];
window.onload = (() => {
    const e = document.getElementById("file"),
        t = (document.getElementById("result"), new FileReader);
    e.addEventListener("change", function (e) {
        t.readAsText(e.target.files[0])
    }),
        t.onload = function (e) {
            csv = [],
                $("#coment").html('<h3>作成したテロップ原稿は<a href="https://docs.google.com/create" target="_blank" rel="noopener">Googleドキュメント</a>で共有しよう</h3><h3>CSVを活用したPhotoshopのテロップ流し込みは<a href="https://vook.vc/n/1224" target="_blank" rel="noopener">コチラの記事</a>を参考にして下さい</h3><p class="button-dl">CSV保存</p><a style = "display:none;" id = "downloader" href = "#" ></a >'),
                $(".button-dl").on("click", btnClick),
                parseXML_Pr(e)
        }
});
var toDoubleDigits = function (e) {
    return 1 === (e += "").length && (e = "0" + e),
        e
};

function zenkaku2Hankaku(e) {
    return e.replace(/[A-Za-z0-9]/g, function (e) {
        return String.fromCharCode(e.charCodeAt(0) + 65248)
    })
}

function parseXML_Pr(e) {
    "use strict";
    let t = e.target.result,
        o = (new DOMParser).parseFromString(t, "text/xml"),
        l = o.getElementsByTagName("name")[0].textContent,
        a = o.getElementsByTagName("timebase")[0].textContent,
        n = o.getElementsByTagName("timecode").length;
    n = Number(n - 1);
    let i = o
            .getElementsByTagName("timecode")[n]
            .getElementsByTagName("frame")[0]
            .textContent,
        g = o
            .getElementsByTagName("timecode")[n]
            .getElementsByTagName("displayformat")[0]
            .textContent,
        s = o.getElementsByTagName("clipitem").length,
        r = [],
        m = [],
        u = [];
    for (let e = 0; e < s; e++)
        if (o.getElementsByTagName("clipitem")[e].getElementsByTagName("start")[0]) {
            let t = o
                    .getElementsByTagName("clipitem")[e]
                    .getElementsByTagName("start")[0]
                    .textContent,
                l = o
                    .getElementsByTagName("clipitem")[e]
                    .getElementsByTagName("end")[0]
                    .textContent,
                n = Number(l) - Number(t);
            if (n < 5 && n > 0) {
                let e = Math.round(Number(t) + Number(i));
                if ("NDF" == g) {
                    let t = toDoubleDigits(Math.floor(e / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(e % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (60 * a) / a));
                    m.push(t)
                } else if (a < 40) {
                    let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) / (60 * a - 2))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) % (60 * a - 2) / a));
                    m.push(t)
                } else {
                    let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 36)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 36)) / (60 * a - 4))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 36)) % (60 * a - 4) / a));
                    m.push(t)
                }
            }
            if (n < 10 && n > 4) {
                let e = Math.round(Number(t) + Number(i));
                if ("NDF" == g) {
                    let t = toDoubleDigits(Math.floor(e / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(e % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (60 * a) / a));
                    u.push(t)
                } else if (a < 40) {
                    let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) / (60 * a - 2))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) % (60 * a - 2) / a));
                    u.push(t)
                } else {
                    let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 36)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 36)) / (60 * a - 4))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 36)) % (60 * a - 4) / a));
                    u.push(t)
                }
            }
            let s = o
                .getElementsByTagName("clipitem")[e]
                .getElementsByTagName("filter")
                .length;
            if (s > 0)
                for (let t = 0; t < s; t++) {
                    if ("GraphicAndType" == o
                        .getElementsByTagName("clipitem")[e]
                        .getElementsByTagName("filter")[t]
                        .getElementsByTagName("effect")[0]
                        .getElementsByTagName("effectid")[0]
                        .textContent) {
                        let l = [],
                            n = o
                                .getElementsByTagName("clipitem")[e]
                                .getElementsByTagName("start")[0]
                                .textContent,
                            s = o
                                .getElementsByTagName("clipitem")[e]
                                .getElementsByTagName("end")[0]
                                .textContent;
                        if (n < 0 && (n = o
                            .getElementsByTagName("clipitem")[e]
                            .previousElementSibling
                            .getElementsByTagName("start")[0]
                            .textContent), s < 0 && (s = o
                            .getElementsByTagName("clipitem")[e]
                            .nextElementSibling
                            .getElementsByTagName("end")[0]
                            .textContent), n = Number(n) + Number(i), s = Number(s) + Number(i), "NDF" == g) {
                            n = toDoubleDigits(Math.floor(n / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(n % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(n % (60 * a) / a))
                        } else if (a < 40) {
                            n = toDoubleDigits(Math.floor(n / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(n % (6 * (600 * a - 18)) / (60 * a - 2))) + ":" + toDoubleDigits(Math.floor(n % (6 * (600 * a - 18)) % (60 * a - 2) / a))
                        } else {
                            n = toDoubleDigits(Math.floor(n / (6 * (600 * a - 36)))) + ":" + toDoubleDigits(Math.floor(n % (6 * (600 * a - 36)) / (60 * a - 4))) + ":" + toDoubleDigits(Math.floor(n % (6 * (600 * a - 36)) % (60 * a - 4) / a))
                        }
                        if ("NDF" == g) {
                            s = toDoubleDigits(Math.floor(s / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(s % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(s % (60 * a) / a))
                        } else if (a < 40) {
                            s = toDoubleDigits(Math.floor(s / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(s % (6 * (600 * a - 18)) / (60 * a - 2))) + ":" + toDoubleDigits(Math.floor(s % (6 * (600 * a - 18)) % (60 * a - 2) / a))
                        } else {
                            s = toDoubleDigits(Math.floor(s / (6 * (600 * a - 36)))) + ":" + toDoubleDigits(Math.floor(s % (6 * (600 * a - 36)) / (60 * a - 4))) + ":" + toDoubleDigits(Math.floor(s % (6 * (600 * a - 36)) % (60 * a - 4) / a))
                        }
                        l.push(n),
                            l.push(s);
                        let m = o
                            .getElementsByTagName("clipitem")[e]
                            .getElementsByTagName("filter")[t]
                            .getElementsByTagName("effect")[0]
                            .getElementsByTagName("name")[0]
                            .textContent;
                        l.push(m),
                            l.push(e + ":" + t),
                        "" != m && r.push(l)
                    }
                }

        }

    let D = "";
    if (m.sort(), m.length > 0) {
        D += "5フレ以下のクリップ\n";
        for (let e = 0; e < m.length; e++)
            D += m[e] + "\n"

    }
    r.sort(function (e, t) {
        return e[0] > t[0]
            ? 1
            : e[0] < t[0]
                ? -1
                : e[1] > t[1]
                    ? 1
                    : e[1] < t[1]
                        ? -1
                        : 0
    });
    let f = l + "\n",
        h = r.length,
        b = [];
    b.push("title"),
        csv.push(b);
    for (let e = 0; e < h; e++) {
        let t = zenkaku2Hankaku(r[e][0]),
            o = zenkaku2Hankaku(r[e][1]),
            l = r[e][2],
            a = [];
        if (e > 0)
            if (r[e][0] == r[e - 1][0] && r[e][1] == r[e - 1][1]) {
                f += "\n" + l;
                let e = csv[csv.length - 1][0],
                    t = '"' + l + "\n" + (
                        e = e.replace(/"/g, "")
                    ) + '"';
                csv[csv.length - 1][0] = t
            } else
                f += "\n\n" + t + " 〜 " + o,
                    f += "\n" + l,
                    a.push('"' + l + '"'),
                    csv.push(a);

        else
            f += t + " 〜 " + o,
                f += "\n" + l,
                a.push('"' + l + '"'),
                csv.push(a)
    }
    r.length > 0 ? (D += "\n" + f, $("#result_area").val(D)) : parseXML_FCP(e)
}

function parseXML_FCP(e) {
    "use strict";
    let t = e.target.result,
        o = (new DOMParser).parseFromString(t, "text/xml"),
        l = o.getElementsByTagName("name")[0].textContent,
        a = o.getElementsByTagName("timebase")[0].textContent,
        n = (o.getElementsByTagName("string")[0].textContent, o
            .getElementsByTagName("timecode")[0]
            .getElementsByTagName("displayformat")[0]
            .textContent),
        i = o.getElementsByTagName("frame")[0].textContent,
        g = o.getElementsByTagName("generatoritem").length,
        s = [],
        r = [],
        m = [],
        u = 0,
        D = o.getElementsByTagName("clipitem").length;
    for (let e = 0; e < D; e++) {
        let t = o
                .getElementsByTagName("clipitem")[e]
                .getElementsByTagName("start")[0]
                .textContent,
            l = o
                .getElementsByTagName("clipitem")[e]
                .getElementsByTagName("end")[0]
                .textContent,
            g = Number(l) - Number(t);
        if (g < 5 && g > 0) {
            let e = Number(t) + Number(i);
            if ("NDF" == n) {
                let t = toDoubleDigits(Math.floor(e / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(e % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (60 * a) / a));
                u = 1,
                    r.push(t)
            } else {
                let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) % (60 * a - 2) / a));
                u = 1,
                    r.push(t)
            }
        }
        if (g < 10 && g > 4) {
            let e = Number(t) + Number(i);
            if ("NDF" == n) {
                let t = toDoubleDigits(Math.floor(e / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(e % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (60 * a) / a));
                u = 1,
                    m.push(t)
            } else {
                let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) % (60 * a - 2) / a));
                u = 1,
                    m.push(t)
            }
        }
    }
    for (let e = 0; e < g; e++) {
        let t = o
                .getElementsByTagName("generatoritem")[e]
                .getElementsByTagName("start")[0]
                .textContent,
            l = o
                .getElementsByTagName("generatoritem")[e]
                .getElementsByTagName("end")[0]
                .textContent,
            g = Number(l) - Number(t);
        if (g < 5 && g > 0) {
            let e = Math.round((Number(t) + Number(i)) / a);
            if ("NDF" == n) {
                let t = toDoubleDigits(Math.floor(e / a / 600 / 6)) + ":" + toDoubleDigits(Math.floor(e % (3600 * a) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (60 * a) / a));
                u = 1,
                    r.push(t)
            } else {
                let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) % (60 * a - 2) / a));
                u = 1,
                    r.push(t)
            }
        }
        if (g < 10 && g > 4) {
            let e = Math.round((Number(t) + Number(i)) / a);
            if ("NDF" == n) {
                let t = toDoubleDigits(Math.floor(e / 3600)) + ":" + toDoubleDigits(Math.floor(e % 3600 / 60)) + ":" + toDoubleDigits(Math.floor(e % 60));
                u = 1,
                    m.push(t)
            } else {
                let t = toDoubleDigits(Math.floor(e / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(e % (6 * (600 * a - 18)) % (60 * a - 2) / a));
                u = 1,
                    m.push(t)
            }
        }
        if (o
            .getElementsByTagName("generatoritem")[e]
            .getElementsByTagName("effect")[0]
            .getElementsByTagName("parameter")
            .length > 1) {
            let t = o
                .getElementsByTagName("generatoritem")[e]
                .getElementsByTagName("effect")[0]
                .getElementsByTagName("parameter")[0]
                .getElementsByTagName("parameterid")[0]
                .textContent;
            if ("str" == o
                .getElementsByTagName("generatoritem")[e]
                .getElementsByTagName("effect")[0]
                .getElementsByTagName("parameter")[1]
                .getElementsByTagName("parameterid")[0]
                .textContent) {
                let t = [],
                    l = o
                        .getElementsByTagName("generatoritem")[e]
                        .getElementsByTagName("start")[0]
                        .textContent,
                    g = o
                        .getElementsByTagName("generatoritem")[e]
                        .getElementsByTagName("end")[0]
                        .textContent;
                if (l < 0 && (l = o
                    .getElementsByTagName("generatoritem")[e]
                    .previousElementSibling
                    .getElementsByTagName("start")[0]
                    .textContent), g < 0 && (g = o
                    .getElementsByTagName("generatoritem")[e]
                    .nextElementSibling
                    .getElementsByTagName("end")[0]
                    .textContent), l = Number(l) + Number(i), g = Number(g) + Number(i), "NDF" == n) {
                    l = toDoubleDigits(Math.floor(l / 3600)) + ":" + toDoubleDigits(Math.floor(l % 3600 / 60)) + ":" + toDoubleDigits(Math.floor(l % 60))
                } else {
                    l = toDoubleDigits(Math.floor(l / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(l % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(l % (6 * (600 * a - 18)) % (60 * a - 2) / a))
                }
                if ("NDF" == n) {
                    g = toDoubleDigits(Math.floor(g / 3600)) + ":" + toDoubleDigits(Math.floor(g % 3600 / 60)) + ":" + toDoubleDigits(Math.floor(g % 60))
                } else {
                    g = toDoubleDigits(Math.floor(g / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(g % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(g % (6 * (600 * a - 18)) % (60 * a - 2) / a))
                }
                t.push(l),
                    t.push(g);
                let r = o
                    .getElementsByTagName("generatoritem")[e]
                    .getElementsByTagName("effect")[0]
                    .getElementsByTagName("parameter")[1]
                    .getElementsByTagName("value")[0]
                    .textContent;
                t.push(r),
                    s.push(t)
            } else if ("str" == t) {
                let t = [],
                    l = o
                        .getElementsByTagName("generatoritem")[e]
                        .getElementsByTagName("start")[0]
                        .textContent,
                    g = o
                        .getElementsByTagName("generatoritem")[e]
                        .getElementsByTagName("end")[0]
                        .textContent;
                if (l < 0 && (l = o
                    .getElementsByTagName("generatoritem")[e]
                    .previousElementSibling
                    .getElementsByTagName("start")[0]
                    .textContent), g < 0 && (g = o
                    .getElementsByTagName("generatoritem")[e]
                    .nextElementSibling
                    .getElementsByTagName("end")[0]
                    .textContent), l = Number(l) + Number(i), g = Number(g) + Number(i), "NDF" == n) {
                    l = toDoubleDigits(Math.floor(l / 3600)) + ":" + toDoubleDigits(Math.floor(l % 3600 / 60)) + ":" + toDoubleDigits(Math.floor(l % 60))
                } else {
                    l = toDoubleDigits(Math.floor(l / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(l % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(l % (6 * (600 * a - 18)) % (60 * a - 2) / a))
                }
                if ("NDF" == n) {
                    g = toDoubleDigits(Math.floor(g / 3600)) + ":" + toDoubleDigits(Math.floor(g % 3600 / 60)) + ":" + toDoubleDigits(Math.floor(g % 60))
                } else {
                    g = toDoubleDigits(Math.floor(g / (6 * (600 * a - 18)))) + ":" + toDoubleDigits(Math.floor(g % (6 * (600 * a - 18)) / (60 * a))) + ":" + toDoubleDigits(Math.floor(g % (6 * (600 * a - 18)) % (60 * a - 2) / a))
                }
                t.push(l),
                    t.push(g);
                let r = o
                    .getElementsByTagName("generatoritem")[e]
                    .getElementsByTagName("effect")[0]
                    .getElementsByTagName("parameter")[0]
                    .getElementsByTagName("value")[0]
                    .textContent;
                t.push(r),
                    s.push(t)
            }
        }
    }
    let f = "";
    if (r.sort(), r.length > 0) {
        f += "5フレ以下のクリップ\n";
        for (let e = 0; e < r.length; e++)
            f += r[e] + "\n"
    }
    if (m.sort(), m.length > 0) {
        f += "10フレ以下のクリップ\n";
        for (let e = 0; e < m.length; e++)
            f += m[e] + "\n"
    }
    s.sort(function (e, t) {
        return e[0] > t[0]
            ? 1
            : e[0] < t[0]
                ? -1
                : e[1] > t[1]
                    ? 1
                    : e[1] < t[1]
                        ? -1
                        : 0
    });
    let h = l + "\n",
        b = s.length;
    for (let e = 0; e < b; e++) {
        let t = s[e][0],
            o = s[e][1],
            l = s[e][2],
            a = [];
        if (e > 0)
            if (s[e][0] == s[e - 1][0] && s[e][1] == s[e - 1][1]) {
                h += "\n" + l;
                let e = csv[csv.length - 1][0],
                    t = '"' + l + "\n" + (
                        e = e.replace(/"/g, "")
                    ) + '"';
                csv[csv.length - 1][0] = t
            } else
                h += "\n\n" + t + " 〜 " + o,
                    h += "\n" + l,
                    a.push('"' + l + '"'),
                    csv.push(a); else h += t + " 〜 " + o, h += "\n" + l, a.push('"' + l + '"'), csv.push(a)
    }
    (s.length > 0 || 1 == u) && (f += "\n" + h, $("#result_area").val(f))
}

const btnClick = function () {
    var e = csv, t = new Uint8Array([239, 187, 191]), o = e.map(function (e) {
            return e.join(",")
        }).join("\r\n"), l = new Blob([t, o], {type: "text/csv"}), a = (window.URL || window.webkitURL).createObjectURL(l),
        n = document.getElementById("downloader");
    n.download = "data.csv", n.href = a, $("#downloader")[0].click()
};
