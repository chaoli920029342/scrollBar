/*vixony 2013-4-16 scrollbar plugins
适用于金融平台客户端使用兼容ie系列
*/
//CommonFunction
document.execCommand("BackgroundImageCache", false, true);
document.ondragstart = function () { return false; };
//window.onerror = killErrors;
function killErrors() { return true; }
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

!function (a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery) }(function (a) { function b(b) { var g = b || window.event, h = i.call(arguments, 1), j = 0, l = 0, m = 0, n = 0, o = 0, p = 0; if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) { if (1 === g.deltaMode) { var q = a.data(this, "mousewheel-line-height"); j *= q, m *= q, l *= q } else if (2 === g.deltaMode) { var r = a.data(this, "mousewheel-page-height"); j *= r, m *= r, l *= r } if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) { var s = this.getBoundingClientRect(); o = b.clientX - s.left, p = b.clientY - s.top } return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h) } } function c() { f = null } function d(a, b) { return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0 } var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], i = Array.prototype.slice; if (a.event.fixHooks) for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks; var k = a.event.special.mousewheel = { version: "3.1.11", setup: function () { if (this.addEventListener) for (var c = h.length; c;) this.addEventListener(h[--c], b, !1); else this.onmousewheel = b; a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this)) }, teardown: function () { if (this.removeEventListener) for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1); else this.onmousewheel = null; a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height") }, getLineHeight: function (b) { var c = a(b)["offsetParent" in a.fn ? "offsetParent" : "parent"](); return c.length || (c = a("body")), parseInt(c.css("fontSize"), 10) }, getPageHeight: function (b) { return a(b).height() }, settings: { adjustOldDeltas: !0, normalizeOffset: !0 } }; a.fn.extend({ mousewheel: function (a) { return a ? this.bind("mousewheel", a) : this.trigger("mousewheel") }, unmousewheel: function (a) { return this.unbind("mousewheel", a) } }) });

//模拟滚动条v1.3
; $.fn.extend({
    onpageupdown: function (Func) {
        return this.each(function () {
            var _self = this;
            _self.C = 0;

            if (typeof window.addEventListener != "undefined") {
                _self.addEventListener("keydown", function (e) {
                    _self.C = e.keyCode;
                    Func && Func.call(_self);
                    try {
                        e.preventDefault();
                    }
                    catch (er) { }
                }, false);
            } else {
                _self.attachEvent("onkeydown", function (e) {
                    _self.C = e.keyCode;
                    Func && Func.call(_self);
                    try {
                        e.preventDefault();
                    }
                    catch (er) { }
                });
            }
        });
    },
    //滚动条 
    jscroll: function (j) {

        var doc = window.document;
        var E = {
            on: function (el, type, fn) {
                el.addEventListener ?
                    el.addEventListener(type, fn, false) :
                    el.attachEvent ?
                        el.attachEvent("on" + type, fn) :
                        el['on' + type] = fn;
            },
            un: function (el, type, fn) {
                el.removeEventListener ?
                    el.removeEventListener(type, fn, false) :
                    el.detachEvent ?
                        el.detachEvent("on" + type, fn) :
                        el['on' + type] = null;
            },
            evt: function (e) {
                return e || window.event;
            }
        };

        return this.each(function () {
            j = j || {};
            j.win = j.win || {};
            j.Bar = j.Bar || {};
            j.Btn = j.Btn || {};
            j.PadW = j.PadW || {};
            j.Bar.Bg = j.Bar.Bg || {};
            j.Bar.Bd = j.Bar.Bd || {};
            j.Btn.uBg = j.Btn.uBg || {};
            j.Btn.dBg = j.Btn.dBg || {};
            var jun = {
                  W: "15px"
                , IW: "13px"
                , CurrT: 0
				, BgUrl: ""
				, BarSrc: ""
				, Bg: "#efefef"
				, Bar: {
				    Pos: "up"
						, Bd: { Out: "#b5b5b5", Hover: "#ccc" }
						, Bg: { Out: "#fff", Hover: "#fff", Focus: "orange" }
				}
				, Btn: {
				    btn: true
						, uBg: { Out: "#ccc", Hover: "#fff", Focus: "orange" }
						, dBg: { Out: "#ccc", Hover: "#fff", Focus: "orange" }
				}
				, synScrl: null
				, Fn: function () { }
                , btmFn: function () { }
            };
            j.W = j.W || jun.W;
            j.IW = j.IW || jun.IW;
            j.BgUrl = j.BgUrl || jun.BgUrl;
            j.BarSrc = j.BarSrc || jun.BarSrc;
            j.Bg = j.Bg || jun.Bg;
            j.Bar.Pos = j.Bar.Pos || jun.Bar.Pos;//up置顶 !up置底 manual手动设置，要配合属性$(_self).attr("CurrT",你自定义的初始scrollTop);
            j.Bar.Bd.Out = j.Bar.Bd.Out || jun.Bar.Bd.Out;
            j.Bar.Bd.Hover = j.Bar.Bd.Hover || jun.Bar.Bd.Hover;
            j.Bar.Bg.Out = j.Bar.Bg.Out || jun.Bar.Bg.Out;
            j.Bar.Bg.Hover = j.Bar.Bg.Hover || jun.Bar.Bg.Hover;
            j.Bar.Bg.Focus = j.Bar.Bg.Focus || jun.Bar.Bg.Focus;
            j.Btn.btn = j.Btn.btn != undefined ? j.Btn.btn : jun.Btn.btn;
            j.Btn.uBg.Out = j.Btn.uBg.Out || jun.Btn.uBg.Out;
            j.Btn.uBg.Hover = j.Btn.uBg.Hover || jun.Btn.uBg.Hover;
            j.Btn.uBg.Focus = j.Btn.uBg.Focus || jun.Btn.uBg.Focus;
            j.Btn.dBg.Out = j.Btn.dBg.Out || jun.Btn.dBg.Out;
            j.Btn.dBg.Hover = j.Btn.dBg.Hover || jun.Btn.dBg.Hover;
            j.Btn.dBg.Focus = j.Btn.dBg.Focus || jun.Btn.dBg.Focus;
            j.Fn = j.Fn || jun.Fn;
            j.btmFn = j.btmFn || jun.btmFn;
            j.synScrl = j.synScrl || jun.synScrl;
            j.CurrT = j.CurrT || jun.CurrT;

            if ($.browser.msie) { document.execCommand("BackgroundImageCache", false, true); };
            var _self = null;
            _self = this;

            var Stime, Sp = 0, Isup = 0;
            $(_self).css({ overflow: "hidden", position: "relative", display: "block", padding: j.PadW });
            var dw = $(_self).width(), dh = $(_self).height();


            var sw = j.W ? parseInt(j.W) : 15;
            var innerw = j.IW ? parseInt(j.IW) : 13;
            var sl = dw - sw;
            var bw = j.Btn.btn == true ? sw : 0;
            if ($(_self).children(".jscroll-c").height() == null) {
                $(_self).wrapInner("<div class='jscroll-c' unselectable='on'></div>");
                $(_self).append("<div class='jscroll-e' unselectable='on'><div class='jscroll-u'></div><div class='jscroll-h'  unselectable='on'><div class='jscroll-bart' unselectable='on'></div><div  class='jscroll-h-i' unselectable='on'><div class='jscroll-h-s' unselectable='on'></div></div><div class='jscroll-barb' unselectable='on'></div></div><div class='jscroll-d' unselectable='on'></div></div>");
            };
            var jscrollc = $(_self).children(".jscroll-c");
            var jscrolle = $(_self).children(".jscroll-e");
            var jscrollh = jscrolle.children(".jscroll-h");
            var jscrollu = jscrolle.children(".jscroll-u");
            var jscrolld = jscrolle.children(".jscroll-d");
            var jscrollhi = jscrollh.children(".jscroll-h-i");
            var dpageY, diffseT;
            //jscrollc.css({ "padding-right": sw });
            jscrolle.css({ width: sw });
            jscrollh.css({ top: bw, width: sw });
            jscrollhi.css({ width: innerw });
            if (bw <= 0) {
                jscrollu.css({ height: bw, display: "none" });
                jscrolld.css({ height: bw, display: "none" });
            }
            else {
                jscrollu.css({ height: bw });
                jscrolld.css({ height: bw });
            }
            var sch = jscrollc.outerHeight(true);
            if (sch == 0) { sch = 0.01; };
            var sh = (dh - 2 * bw) * dh / sch;
            if (sh < 25) { sh = 25 };
            var wh = sh / 10;
            var attrCurrT = $(_self).attr("CurrT");//获取滚动条当前的高度            
            var curT = j.CurrT ? parseInt(j.CurrT) : 0, allowS = false;
            if (curT == 0) { jscrollc.css("top", "0"); }
            jscrollh.height(sh);
            jscrollhi.height(parseInt(sh) - 12);
            if (sch <= dh) { jscrollc.css({ padding: 0 }); jscrolle.addClass("non").css({ display: "none" }); } else { jscrolle.removeClass("non").css({ display: "" }); allowS = true; }
            if (j.Bar.Pos != "up") {
                curT = dh - sh - bw;
                setT();
            }

            //hidden event bind
            $(this).mouseover(function () {
                var thisbx = $(this), scrlbr = $(this).find(".jscroll-e");
                if (!scrlbr.hasClass("non")) {
                    scrlbr.addClass("mon").stop(true, true, false).fadeTo(50, 1);
                }
            }).mouseleave(function (e) {

                var thisbx = $(this), scrlbr = $(this).find(".jscroll-e");
                if (!scrlbr.hasClass("non")) {
                    scrlbr.removeClass("mon");
                    if (scrlbr.hasClass("vxdrag")) { } else {
                        //scrlbr.fadeOut("slow");
                    }
                }
            });

            jscrollh.bind("mousedown", function (e) {

                e = E.evt(e);
                j['Fn'] && j['Fn'].call(_self);
                ResetScrollSize();
                Isup = 1;
                jscrolle.addClass("vxdrag");
                dpageY = e.pageY;
                diffseT = parseInt(jscrollh.css("top"));
                
                var el = jscrollh[0];
                if (el.setCapture) { //IE
                    E.on(el, "losecapture", mouseup);
                    el.setCapture();
                    e.cancelBubble = true;
                } else if (window.captureEvents) { //标准DOM
                    e.stopPropagation();
                    E.on(window, "blur", mouseup);
                    e.preventDefault();
                }
                E.on(doc, 'mousemove', mousemove);
                E.on(doc, 'mouseup', mouseup);
                return false;
            });

            jscrollu.bind("mousedown", function (e) {
                j['Fn'] && j['Fn'].call(_self);
                ResetScrollSize();
                Isup = 1;
                _self.timeSetT("u");
                $(document).mouseup(function () {
                    Isup = 0;
                    $(document).unbind();
                    clearTimeout(Stime);
                    Sp = 0;
                });
                return false;
            });
            jscrolld.bind("mousedown", function (e) {
                j['Fn'] && j['Fn'].call(_self);
                ResetScrollSize();
                Isup = 1;
                _self.timeSetT("d");
                $(document).mouseup(function () {
                    Isup = 0;
                    $(document).unbind();
                    clearTimeout(Stime);
                    Sp = 0;
                });
                return false;
            });

            _self.timeSetT = function (d) {
                var self = this;
                if (d == "u") { curT -= wh; } else { curT += wh; };
                setT();
                Sp += 2;
                var t = 500 - Sp * 50;
                if (t <= 0) { t = 0 };
                Stime = setTimeout(function () { self.timeSetT(d); }, t);
            };
            jscrolle.bind("mousedown", function (e) {
                j['Fn'] && j['Fn'].call(_self);
                ResetScrollSize();
                curT = curT + e.pageY - jscrollh.offset().top - sh / 2;
                asetT();
                return false;
            });
            $(_self).onpageupdown(function () {
                j['Fn'] && j['Fn'].call(_self);
                ResetScrollSize();
                if (this.C == 33 || this.C == 36) {
                    curT = curT - sh;
                    asetT();
                    return false;
                } else if (this.C == 34 || this.C == 35) {
                    curT = curT + sh;
                    asetT();
                    return false;
                } else if (this.C == 37 || this.C == 38) {
                    if (jscrolle.css("display") == "none") return;
                    j['Fn'] && j['Fn'].call(_self);
                    ResetScrollSize();
                    curT -= wh;
                    setT();

                } else if (this.C == 39 || this.C == 40) {
                    if (jscrolle.css("display") == "none") return;
                    j['Fn'] && j['Fn'].call(_self);
                    ResetScrollSize();
                    curT += wh;
                    asetT();
                    return false;
                }
            });
            function asetT() {
                if (curT < bw) { curT = bw; }
                if (curT > dh - sh - bw) { curT = dh - sh - bw; }
                jscrollh.stop().animate({ top: curT }, 100);
                var scT = -((curT - bw) * (sch - dh) / (dh - sh - 2 * bw));

                jscrollc.stop().animate({ top: scT }, 100);
                if (!!j.synScrl) {
                    $(j.synScrl).stop().animate({ top: scT }, 100);
                }
            };
            function setT() {
                if (curT < bw) { curT = bw; }
                if (curT > dh - sh - bw) { curT = dh - sh - bw; }
                jscrollh.css({ top: curT });
                var scT = -((curT - bw) * (sch - dh) / (dh - sh - 2 * bw));
                jscrollc.css({ top: scT });
                if (!!j.synScrl) {
                    $(j.synScrl).css({ top: scT });
                }
            };

            function setT0() {
                jscrollc.css({ top: scT });
            };
            function mousemove(e) {
                e = E.evt(e);
                curT = e.clientY - dpageY + diffseT;
                setT();
            }
            function mousedown(e) {
                e = E.evt(e);
                var el = jscrollh[0];
                if (el.setCapture) { //IE
                    E.on(el, "losecapture", mouseup);
                    el.setCapture();
                    e.cancelBubble = true;
                } else if (window.captureEvents) { //标准DOM
                    e.stopPropagation();
                    E.on(window, "blur", mouseup);
                    e.preventDefault();
                }
                diffX = e.clientX - el.offsetLeft;
                diffY = e.clientY - el.offsetTop;
                E.on(doc, 'mousemove', mousemove);
                E.on(doc, 'mouseup', mouseup);
            }
            function mouseup(e) {
                var el = jscrollh[0];
                jscrolle.removeClass("vxdrag");
                E.un(doc, 'mousemove', mousemove);
                E.un(doc, 'mouseup', mouseup);
                if (el.releaseCapture) { //IE
                    E.un(el, "losecapture", mouseup);
                    el.releaseCapture();
                }
                if (window.releaseEvents) { //标准DOM
                    E.un(window, "blur", mouseup);
                }
            }
            function ResetScrollSize() {
                dh = $(_self).height();
                sch = jscrollc.height();
                if (sch == 0) { sch = 0.01; };
                sh = (dh - 2 * bw) * dh / sch;
                if (sh < 25) { sh = 25 };
                wh = sh / 10;
            };
            $(_self).mousewheel(function (event, delta) {
                if (jscrolle.css("display") == "none") return;
                attrCurrT = $(_self).attr("CurrT");
                attrCurrT = attrCurrT > 0 ? parseInt(attrCurrT) : -1;
                if (j.Bar.Pos == "manual" && attrCurrT > 0) {
                    curT = attrCurrT;
                    attrCurrT = -1;
                    $(_self).attr("CurrT", attrCurrT);
                }

                j['Fn'] && j['Fn'].call(_self);
                ResetScrollSize();
                if (delta > 0) { curT -= wh; } else { curT += wh; };
                setT();
                event.stopPropagation();
                event.preventDefault();
            });
        });
    }
});

//设置滚动
//函数名 ResetScroll()
//参数可输入0、1、2个，参数有次序
//有参数时：第一个参数是指定需要重置的滚动区域，eg：#scrollbox1、.scrollbox2、etc
//第二个参数是是否需要滚动条拉到顶端0位置。
function ReSetScroll() {
    var win, scrlbx, scrlTop = false;
    if (arguments[0]) {
        win = $("" + arguments[0]);
        scrlbx = win;
    } else {
        win = window.document;
        scrlbx = $("[scrollflag]");
    }
    if (arguments[1]) {
        scrlTop = true
    }

    scrlbx.each(function () {
        var obj = $(this);
        if (obj.find(".jscroll-c").size() > 0) {
            //debugger;
            var jscrollc = obj.find(".jscroll-c");
            var jscrollh = obj.find(".jscroll-h");
            var jscrollhi = obj.find(".jscroll-h-i");
            var jscrolle = obj.find(".jscroll-e");
            var bw = 0,
            dh = obj.height(),
            sch = jscrollc.height() == 0 ? 0.01 : jscrollc.height(),
            ot = obj.offset().top,
            sct = jscrollc.offset().top;
            if (sch <= dh) {
                jscrollc.css({ padding: 0, top: 0 });
                jscrolle.addClass("non").css({ display: "none" });
            } else {
                var newBh = ((dh - 2 * bw) * dh / sch) < 25 ? 25 : parseInt((dh - 2 * bw) * dh / sch)
                , aa = ((ot - sct) >= (sch - dh)) ? (sch - dh) : (ot - sct)
                , newBt = parseInt((dh * aa) / sch)
                , newCt = 0;
                newBt = (newBt < 0) ? 0 : newBt;

                if (newBt + newBh > (dh - 2)) {
                    newBt = ((dh - newBh) < 0) ? 0 : (dh - newBh);
                    newCt = parseInt(sch - dh);
                    jscrollc.css({ top: parseInt(-newCt) });
                }

                jscrolle.removeClass("non").css({ display: "" });
                jscrollh.css({ height: newBh, top: newBt });
                jscrollhi.css({ height: parseInt(newBh) - 12 });
            }

            if (scrlTop) {
                jscrollh.css({ top: 0 });
                jscrollc.css({ top: 0 });
            }
        }
        //hidden
        //$(".jscroll-e",obj).delay(800).fadeOut('slow');
    })
}

//创建滚动条
function CreatWinScrollStyle1(obj) {
    obj.jscroll({
        W: "11px", IW: "11px", CurrT: 0
    , Bar: { Pos: "up" }
    , Btn: { btn: false }
    , Fn: function () { }
    });
}
//resizeScrollBar
