(function (f) {
  function b(a) {
    var b = a.length,
      c = h.type(a);
    return "function" === c || h.isWindow(a)
      ? !1
      : 1 === a.nodeType && b
      ? !0
      : "array" === c ||
        0 === b ||
        ("number" === typeof b && 0 < b && b - 1 in a);
  }
  if (!f.jQuery) {
    var h = function (a, b) {
      return new h.fn.init(a, b);
    };
    h.isWindow = function (a) {
      return a && a === a.window;
    };
    h.type = function (a) {
      return a
        ? "object" === typeof a || "function" === typeof a
          ? g[e.call(a)] || "object"
          : typeof a
        : a + "";
    };
    h.isArray =
      Array.isArray ||
      function (a) {
        return "array" === h.type(a);
      };
    h.isPlainObject = function (a) {
      var b;
      if (!a || "object" !== h.type(a) || a.nodeType || h.isWindow(a))
        return !1;
      try {
        if (
          a.constructor &&
          !c.call(a, "constructor") &&
          !c.call(a.constructor.prototype, "isPrototypeOf")
        )
          return !1;
      } catch (w) {
        return !1;
      }
      for (b in a);
      return void 0 === b || c.call(a, b);
    };
    h.each = function (a, c, e) {
      var f = 0,
        g = a.length;
      var h = b(a);
      if (e)
        if (h) for (; f < g && ((h = c.apply(a[f], e)), !1 !== h); f++);
        else
          for (f in a) {
            if (a.hasOwnProperty(f) && ((h = c.apply(a[f], e)), !1 === h))
              break;
          }
      else if (h) for (; f < g && ((h = c.call(a[f], f, a[f])), !1 !== h); f++);
      else
        for (f in a)
          if (a.hasOwnProperty(f) && ((h = c.call(a[f], f, a[f])), !1 === h))
            break;
      return a;
    };
    h.data = function (b, c, e) {
      if (void 0 === e) {
        e = (e = b[h.expando]) && a[e];
        if (void 0 === c) return e;
        if (e && c in e) return e[c];
      } else if (void 0 !== c)
        return (
          (b = b[h.expando] || (b[h.expando] = ++h.uuid)),
          (a[b] = a[b] || {}),
          (a[b][c] = e)
        );
    };
    h.removeData = function (b, c) {
      var e = (b = b[h.expando]) && a[b];
      e &&
        (c
          ? h.each(c, function (a, b) {
              delete e[b];
            })
          : delete a[b]);
    };
    h.extend = function () {
      var a,
        b,
        c,
        e = arguments[0] || {},
        f = 1,
        g = arguments.length,
        l = !1;
      "boolean" === typeof e && ((l = e), (e = arguments[f] || {}), f++);
      "object" !== typeof e && "function" !== h.type(e) && (e = {});
      f === g && ((e = this), f--);
      for (; f < g; f++)
        if ((c = arguments[f]))
          for (b in c)
            if (c.hasOwnProperty(b)) {
              var q = e[b];
              var D = c[b];
              e !== D &&
                (l && D && (h.isPlainObject(D) || (a = h.isArray(D)))
                  ? (a
                      ? ((a = !1), (q = q && h.isArray(q) ? q : []))
                      : (q = q && h.isPlainObject(q) ? q : {}),
                    (e[b] = h.extend(l, q, D)))
                  : void 0 !== D && (e[b] = D));
            }
      return e;
    };
    h.queue = function (a, c, e) {
      function f(a, c) {
        c = c || [];
        if (a)
          if (b(Object(a))) {
            a = "string" === typeof a ? [a] : a;
            for (var e = +a.length, f = 0, g = c.length; f < e; )
              c[g++] = a[f++];
            if (e !== e) for (; void 0 !== a[f]; ) c[g++] = a[f++];
            c.length = g;
          } else [].push.call(c, a);
        return c;
      }
      if (a) {
        c = (c || "fx") + "queue";
        var g = h.data(a, c);
        if (!e) return g || [];
        !g || h.isArray(e) ? (g = h.data(a, c, f(e))) : g.push(e);
        return g;
      }
    };
    h.dequeue = function (a, b) {
      h.each(a.nodeType ? [a] : a, function (a, c) {
        b = b || "fx";
        a = h.queue(c, b);
        var e = a.shift();
        "inprogress" === e && (e = a.shift());
        e &&
          ("fx" === b && a.unshift("inprogress"),
          e.call(c, function () {
            h.dequeue(c, b);
          }));
      });
    };
    h.fn = h.prototype = {
      init: function (a) {
        if (a.nodeType) return (this[0] = a), this;
        throw Error("Not a DOM node.");
      },
      offset: function () {
        var a = this[0].getBoundingClientRect
          ? this[0].getBoundingClientRect()
          : { top: 0, left: 0 };
        return {
          top:
            a.top +
            (f.pageYOffset || document.scrollTop || 0) -
            (document.clientTop || 0),
          left:
            a.left +
            (f.pageXOffset || document.scrollLeft || 0) -
            (document.clientLeft || 0),
        };
      },
      position: function () {
        var a = this[0],
          b;
        for (
          b = a.offsetParent;
          b &&
          "html" !== b.nodeName.toLowerCase() &&
          b.style &&
          "static" === b.style.position.toLowerCase();

        )
          b = b.offsetParent;
        b = b || document;
        var c = this.offset(),
          e = /^(?:body|html)$/i.test(b.nodeName)
            ? { top: 0, left: 0 }
            : h(b).offset();
        c.top -= parseFloat(a.style.marginTop) || 0;
        c.left -= parseFloat(a.style.marginLeft) || 0;
        b.style &&
          ((e.top += parseFloat(b.style.borderTopWidth) || 0),
          (e.left += parseFloat(b.style.borderLeftWidth) || 0));
        return { top: c.top - e.top, left: c.left - e.left };
      },
    };
    var a = {};
    h.expando = "velocity" + new Date().getTime();
    h.uuid = 0;
    for (
      var g = {},
        c = g.hasOwnProperty,
        e = g.toString,
        l = "Boolean Number String Function Array Date RegExp Object Error".split(
          " "
        ),
        q = 0;
      q < l.length;
      q++
    )
      g["[object " + l[q] + "]"] = l[q].toLowerCase();
    h.fn.init.prototype = h.fn;
    f.Velocity = { Utilities: h };
  }
})(window);
(function (f) {
  "object" === typeof module && "object" === typeof module.exports
    ? (module.exports = f())
    : "function" === typeof define && define.amd
    ? define(f)
    : f();
})(function () {
  return (function (f, b, h, a) {
    function g(a) {
      for (var b = -1, c = a ? a.length : 0, e = []; ++b < c; ) {
        var f = a[b];
        f && e.push(f);
      }
      return e;
    }
    function c(a) {
      v.isWrapped(a) ? (a = D.call(a)) : v.isNode(a) && (a = [a]);
      return a;
    }
    function e(b) {
      b = G.data(b, "velocity");
      return null === b ? a : b;
    }
    function l(a, b) {
      (a = e(a)) &&
        a.delayTimer &&
        !a.delayPaused &&
        ((a.delayRemaining = a.delay - b + a.delayBegin),
        (a.delayPaused = !0),
        clearTimeout(a.delayTimer.setTimeout));
    }
    function q(a, b) {
      (a = e(a)) &&
        a.delayTimer &&
        a.delayPaused &&
        ((a.delayPaused = !1),
        (a.delayTimer.setTimeout = setTimeout(
          a.delayTimer.next,
          a.delayRemaining
        )));
    }
    function x(a) {
      return function (b) {
        return (1 / a) * Math.round(b * a);
      };
    }
    function n(a, c, e, f) {
      function g(a, b, c) {
        return (((1 - 3 * c + 3 * b) * a + (3 * c - 6 * b)) * a + 3 * b) * a;
      }
      var h = "Float32Array" in b;
      if (4 !== arguments.length) return !1;
      for (var m = 0; 4 > m; ++m)
        if (
          "number" !== typeof arguments[m] ||
          isNaN(arguments[m]) ||
          !isFinite(arguments[m])
        )
          return !1;
      a = Math.min(a, 1);
      e = Math.min(e, 1);
      a = Math.max(a, 0);
      e = Math.max(e, 0);
      var q = h ? new Float32Array(11) : Array(11),
        l = !1;
      h = function (b) {
        if (!l && ((l = !0), a !== c || e !== f))
          for (var h = 0; 11 > h; ++h) q[h] = g(0.1 * h, a, e);
        if (a === c && e === f) return b;
        if (0 === b) return 0;
        if (1 === b) return 1;
        var m = 0;
        for (h = 1; 10 !== h && q[h] <= b; ++h) m += 0.1;
        --h;
        h = m + ((b - q[h]) / (q[h + 1] - q[h])) * 0.1;
        var r =
          3 * (1 - 3 * e + 3 * a) * h * h + 2 * (3 * e - 6 * a) * h + 3 * a;
        if (0.001 <= r) {
          for (m = 0; 4 > m; ++m) {
            r =
              3 * (1 - 3 * e + 3 * a) * h * h + 2 * (3 * e - 6 * a) * h + 3 * a;
            if (0 === r) break;
            var E = g(h, a, e) - b;
            h -= E / r;
          }
          b = h;
        } else if (0 === r) b = h;
        else {
          h = m;
          m += 0.1;
          var n = 0;
          do
            (E = h + (m - h) / 2),
              (r = g(E, a, e) - b),
              0 < r ? (m = E) : (h = E);
          while (1e-7 < Math.abs(r) && 10 > ++n);
          b = E;
        }
        return g(b, c, f);
      };
      h.getControlPoints = function () {
        return [
          { x: a, y: c },
          { x: e, y: f },
        ];
      };
      var E = "generateBezier(" + [a, c, e, f] + ")";
      h.toString = function () {
        return E;
      };
      return h;
    }
    function w(a, b) {
      var c = a;
      v.isString(a)
        ? y.Easings[a] || (c = !1)
        : (c =
            v.isArray(a) && 1 === a.length
              ? x.apply(null, a)
              : v.isArray(a) && 2 === a.length
              ? M.apply(null, a.concat([b]))
              : v.isArray(a) && 4 === a.length
              ? n.apply(null, a)
              : !1);
      !1 === c &&
        (c = y.Easings[y.defaults.easing] ? y.defaults.easing : "swing");
      return c;
    }
    function H(b) {
      if (b) {
        b = y.timestamp && !0 !== b ? b : z.now();
        var c = y.State.calls.length;
        1e4 < c &&
          ((y.State.calls = g(y.State.calls)), (c = y.State.calls.length));
        for (var f = 0; f < c; f++)
          if (y.State.calls[f]) {
            var h = y.State.calls[f],
              q = h[0],
              r = h[2],
              l = h[3],
              n = !l,
              E = null,
              w = h[5],
              x = h[6];
            l || (l = y.State.calls[f][3] = b - 16);
            if (w)
              if (!0 === w.resume)
                (l = h[3] = Math.round(b - x - 16)), (h[5] = null);
              else continue;
            x = h[6] = b - l;
            var D = Math.min(x / r.duration, 1);
            w = 0;
            for (x = q.length; w < x; w++) {
              var B = q[w],
                A = B.element;
              if (e(A)) {
                var M = !1;
                r.display !== a &&
                  null !== r.display &&
                  "none" !== r.display &&
                  ("flex" === r.display &&
                    G.each(
                      [
                        "-webkit-box",
                        "-moz-box",
                        "-ms-flexbox",
                        "-webkit-flex",
                      ],
                      function (a, b) {
                        u.setPropertyValue(A, "display", b);
                      }
                    ),
                  u.setPropertyValue(A, "display", r.display));
                r.visibility !== a &&
                  "hidden" !== r.visibility &&
                  u.setPropertyValue(A, "visibility", r.visibility);
                for (var O in B)
                  if (B.hasOwnProperty(O) && "element" !== O) {
                    var Q = B[O],
                      aa = v.isString(Q.easing)
                        ? y.Easings[Q.easing]
                        : Q.easing;
                    if (v.isString(Q.pattern))
                      var W = Q.pattern.replace(
                        /{(\d+)(!)?}/g,
                        1 === D
                          ? function (a, b, c) {
                              a = Q.endValue[b];
                              return c ? Math.round(a) : a;
                            }
                          : function (a, b, c) {
                              a = Q.startValue[b];
                              b = Q.endValue[b] - a;
                              b = a + b * aa(D, r, b);
                              return c ? Math.round(b) : b;
                            }
                      );
                    else
                      1 === D
                        ? (W = Q.endValue)
                        : ((W = Q.endValue - Q.startValue),
                          (W = Q.startValue + W * aa(D, r, W)));
                    if (n || W !== Q.currentValue)
                      if (((Q.currentValue = W), "tween" === O)) E = W;
                      else {
                        if (u.Hooks.registered[O]) {
                          var Aa = u.Hooks.getRoot(O);
                          var Ba = e(A).rootPropertyValueCache[Aa];
                          Ba && (Q.rootPropertyValue = Ba);
                        }
                        W = u.setPropertyValue(
                          A,
                          O,
                          Q.currentValue +
                            (9 > F && 0 === parseFloat(W) ? "" : Q.unitType),
                          Q.rootPropertyValue,
                          Q.scrollData
                        );
                        u.Hooks.registered[O] &&
                          (u.Normalizations.registered[Aa]
                            ? (e(A).rootPropertyValueCache[
                                Aa
                              ] = u.Normalizations.registered[Aa](
                                "extract",
                                null,
                                W[1]
                              ))
                            : (e(A).rootPropertyValueCache[Aa] = W[1]));
                        "transform" === W[0] && (M = !0);
                      }
                  }
                r.mobileHA &&
                  e(A).transformCache.translate3d === a &&
                  ((e(A).transformCache.translate3d = "(0px, 0px, 0px)"),
                  (M = !0));
                M && u.flushTransformCache(A);
              }
            }
            r.display !== a &&
              "none" !== r.display &&
              (y.State.calls[f][2].display = !1);
            r.visibility !== a &&
              "hidden" !== r.visibility &&
              (y.State.calls[f][2].visibility = !1);
            r.progress &&
              r.progress.call(
                h[1],
                h[1],
                D,
                Math.max(0, l + r.duration - b),
                l,
                E
              );
            1 === D && C(f);
          }
      }
      y.State.isTicking && fa(H);
    }
    function C(b, c) {
      if (!y.State.calls[b]) return !1;
      for (
        var f = y.State.calls[b][0],
          g = y.State.calls[b][1],
          h = y.State.calls[b][2],
          r = y.State.calls[b][4],
          l = !1,
          q = 0,
          n = f.length;
        q < n;
        q++
      ) {
        var E = f[q].element;
        c ||
          h.loop ||
          ("none" === h.display && u.setPropertyValue(E, "display", h.display),
          "hidden" === h.visibility &&
            u.setPropertyValue(E, "visibility", h.visibility));
        var w = e(E);
        if (
          !0 !== h.loop &&
          (G.queue(E)[1] === a ||
            !/\.velocityQueueEntryFlag/i.test(G.queue(E)[1])) &&
          w
        ) {
          w.isAnimating = !1;
          w.rootPropertyValueCache = {};
          var x = !1;
          G.each(u.Lists.transforms3D, function (b, c) {
            b = /^scale/.test(c) ? 1 : 0;
            var e = w.transformCache[c];
            w.transformCache[c] !== a &&
              new RegExp("^\\(" + b + "[^.]").test(e) &&
              ((x = !0), delete w.transformCache[c]);
          });
          h.mobileHA && ((x = !0), delete w.transformCache.translate3d);
          x && u.flushTransformCache(E);
          u.Values.removeClass(E, "velocity-animating");
        }
        if (!c && h.complete && !h.loop && q === n - 1)
          try {
            h.complete.call(g, g);
          } catch (L) {
            setTimeout(function () {
              throw L;
            }, 1);
          }
        r && !0 !== h.loop && r(g);
        w &&
          !0 === h.loop &&
          !c &&
          (G.each(w.tweensContainer, function (a, b) {
            if (
              /^rotate/.test(a) &&
              0 === (parseFloat(b.startValue) - parseFloat(b.endValue)) % 360
            ) {
              var c = b.startValue;
              b.startValue = b.endValue;
              b.endValue = c;
            }
            /^backgroundPosition/.test(a) &&
              100 === parseFloat(b.endValue) &&
              "%" === b.unitType &&
              ((b.endValue = 0), (b.startValue = 100));
          }),
          y(E, "reverse", { loop: !0, delay: h.delay }));
        !1 !== h.queue && G.dequeue(E, h.queue);
      }
      y.State.calls[b] = !1;
      b = 0;
      for (c = y.State.calls.length; b < c; b++)
        if (!1 !== y.State.calls[b]) {
          l = !0;
          break;
        }
      !1 === l &&
        ((y.State.isTicking = !1), delete y.State.calls, (y.State.calls = []));
    }
    var F = (function () {
        if (h.documentMode) return h.documentMode;
        for (var b = 7; 4 < b; b--) {
          var c = h.createElement("div");
          c.innerHTML =
            "\x3c!--[if IE " +
            b +
            "]\x3e\x3cspan\x3e\x3c/span\x3e\x3c![endif]--\x3e";
          if (c.getElementsByTagName("span").length) return b;
        }
        return a;
      })(),
      A = (function () {
        var a = 0;
        return (
          b.webkitRequestAnimationFrame ||
          b.mozRequestAnimationFrame ||
          function (b) {
            var c = new Date().getTime();
            var e = Math.max(0, 16 - (c - a));
            a = c + e;
            return setTimeout(function () {
              b(c + e);
            }, e);
          }
        );
      })(),
      z = (function () {
        var a = b.performance || {};
        if ("function" !== typeof a.now) {
          var c =
            a.timing && a.timing.navigationStart
              ? a.timing.navigationStart
              : new Date().getTime();
          a.now = function () {
            return new Date().getTime() - c;
          };
        }
        return a;
      })(),
      D = (function () {
        var a = Array.prototype.slice;
        try {
          return a.call(h.documentElement), a;
        } catch (ba) {
          return function (b, c) {
            var e = this.length;
            "number" !== typeof b && (b = 0);
            "number" !== typeof c && (c = e);
            if (this.slice) return a.call(this, b, c);
            var f = [];
            b = 0 <= b ? b : Math.max(0, e + b);
            e = (0 > c ? e + c : Math.min(c, e)) - b;
            if (0 < e)
              if (((f = Array(e)), this.charAt))
                for (c = 0; c < e; c++) f[c] = this.charAt(b + c);
              else for (c = 0; c < e; c++) f[c] = this[b + c];
            return f;
          };
        }
      })(),
      O = function () {
        return Array.prototype.includes
          ? function (a, b) {
              return a.includes(b);
            }
          : Array.prototype.indexOf
          ? function (a, b) {
              return 0 <= a.indexOf(b);
            }
          : function (a, b) {
              for (var c = 0; c < a.length; c++) if (a[c] === b) return !0;
              return !1;
            };
      },
      v = {
        isNumber: function (a) {
          return "number" === typeof a;
        },
        isString: function (a) {
          return "string" === typeof a;
        },
        isArray:
          Array.isArray ||
          function (a) {
            return "[object Array]" === Object.prototype.toString.call(a);
          },
        isFunction: function (a) {
          return "[object Function]" === Object.prototype.toString.call(a);
        },
        isNode: function (a) {
          return a && a.nodeType;
        },
        isWrapped: function (a) {
          return (
            a &&
            a !== b &&
            v.isNumber(a.length) &&
            !v.isString(a) &&
            !v.isFunction(a) &&
            !v.isNode(a) &&
            (0 === a.length || v.isNode(a[0]))
          );
        },
        isSVG: function (a) {
          return b.SVGElement && a instanceof b.SVGElement;
        },
        isEmptyObject: function (a) {
          for (var b in a) if (a.hasOwnProperty(b)) return !1;
          return !0;
        },
      },
      B = !1;
    if (f.fn && f.fn.jquery) {
      var G = f;
      B = !0;
    } else G = b.Velocity.Utilities;
    if (8 >= F && !B)
      throw Error(
        "Velocity: IE8 and below require jQuery to be loaded before Velocity."
      );
    if (7 >= F) jQuery.fn.velocity = jQuery.fn.animate;
    else {
      var y = {
        State: {
          isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            b.navigator.userAgent
          ),
          isAndroid: /Android/i.test(b.navigator.userAgent),
          isGingerbread: /Android 2\.3\.[3-7]/i.test(b.navigator.userAgent),
          isChrome: b.chrome,
          isFirefox: /Firefox/i.test(b.navigator.userAgent),
          prefixElement: h.createElement("div"),
          prefixMatches: {},
          scrollAnchor: null,
          scrollPropertyLeft: null,
          scrollPropertyTop: null,
          isTicking: !1,
          calls: [],
          delayedElements: { count: 0 },
        },
        CSS: {},
        Utilities: G,
        Redirects: {},
        Easings: {},
        Promise: b.Promise,
        defaults: {
          queue: "",
          duration: 400,
          easing: "swing",
          begin: a,
          complete: a,
          progress: a,
          display: a,
          visibility: a,
          loop: !1,
          delay: !1,
          mobileHA: !0,
          _cacheValues: !0,
          promiseRejectEmpty: !0,
        },
        init: function (a) {
          G.data(a, "velocity", {
            isSVG: v.isSVG(a),
            isAnimating: !1,
            computedStyle: null,
            tweensContainer: null,
            rootPropertyValueCache: {},
            transformCache: {},
          });
        },
        hook: null,
        mock: !1,
        version: { major: 1, minor: 5, patch: 2 },
        debug: !1,
        timestamp: !0,
        pauseAll: function (b) {
          var c = new Date().getTime();
          G.each(y.State.calls, function (c, e) {
            if (e) {
              if (b !== a && (e[2].queue !== b || !1 === e[2].queue)) return !0;
              e[5] = { resume: !1 };
            }
          });
          G.each(y.State.delayedElements, function (a, b) {
            b && l(b, c);
          });
        },
        resumeAll: function (b) {
          var c = new Date().getTime();
          G.each(y.State.calls, function (c, e) {
            if (e) {
              if (b !== a && (e[2].queue !== b || !1 === e[2].queue)) return !0;
              e[5] && (e[5].resume = !0);
            }
          });
          G.each(y.State.delayedElements, function (a, b) {
            b && q(b, c);
          });
        },
      };
      b.pageYOffset !== a
        ? ((y.State.scrollAnchor = b),
          (y.State.scrollPropertyLeft = "pageXOffset"),
          (y.State.scrollPropertyTop = "pageYOffset"))
        : ((y.State.scrollAnchor =
            h.documentElement || h.body.parentNode || h.body),
          (y.State.scrollPropertyLeft = "scrollLeft"),
          (y.State.scrollPropertyTop = "scrollTop"));
      var M = (function () {
        function a(a, b, c) {
          var e = a.v + c.dv * b;
          return { dx: e, dv: -a.tension * (a.x + c.dx * b) - a.friction * e };
        }
        function b(b, c) {
          var e = { dx: b.v, dv: -b.tension * b.x - b.friction * b.v },
            f = a(b, 0.5 * c, e),
            g = a(b, 0.5 * c, f),
            h = a(b, c, g),
            m = (1 / 6) * (e.dv + 2 * (f.dv + g.dv) + h.dv);
          b.x += (1 / 6) * (e.dx + 2 * (f.dx + g.dx) + h.dx) * c;
          b.v += m * c;
          return b;
        }
        return function P(a, c, e) {
          var f = { x: -1, v: 0, tension: null, friction: null },
            g = [0],
            h = 0,
            r;
          a = parseFloat(a) || 500;
          c = parseFloat(c) || 20;
          e = e || null;
          f.tension = a;
          f.friction = c;
          (r = null !== e)
            ? ((h = P(a, c)), (a = (h / e) * 0.016))
            : (a = 0.016);
          for (;;) {
            var q = b(q || f, a);
            g.push(1 + q.x);
            h += 16;
            if (!(1e-4 < Math.abs(q.x) && 1e-4 < Math.abs(q.v))) break;
          }
          return r
            ? function (a) {
                return g[(a * (g.length - 1)) | 0];
              }
            : h;
        };
      })();
      y.Easings = {
        linear: function (a) {
          return a;
        },
        swing: function (a) {
          return 0.5 - Math.cos(a * Math.PI) / 2;
        },
        spring: function (a) {
          return 1 - Math.cos(4.5 * a * Math.PI) * Math.exp(6 * -a);
        },
      };
      G.each(
        [
          ["ease", [0.25, 0.1, 0.25, 1]],
          ["ease-in", [0.42, 0, 1, 1]],
          ["ease-out", [0, 0, 0.58, 1]],
          ["ease-in-out", [0.42, 0, 0.58, 1]],
          ["easeInSine", [0.47, 0, 0.745, 0.715]],
          ["easeOutSine", [0.39, 0.575, 0.565, 1]],
          ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
          ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
          ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
          ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
          ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
          ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
          ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
          ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
          ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
          ["easeInOutQuart", [0.77, 0, 0.175, 1]],
          ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
          ["easeOutQuint", [0.23, 1, 0.32, 1]],
          ["easeInOutQuint", [0.86, 0, 0.07, 1]],
          ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
          ["easeOutExpo", [0.19, 1, 0.22, 1]],
          ["easeInOutExpo", [1, 0, 0, 1]],
          ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
          ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
          ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]],
        ],
        function (a, b) {
          y.Easings[b[0]] = n.apply(null, b[1]);
        }
      );
      var u = (y.CSS = {
        RegEx: {
          isHex: /^#([A-f\d]{3}){1,2}$/i,
          valueUnwrap: /^[A-z]+\((.*)\)$/i,
          wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
          valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi,
        },
        Lists: {
          colors: "fill stroke stopColor color backgroundColor borderColor borderTopColor borderRightColor borderBottomColor borderLeftColor outlineColor".split(
            " "
          ),
          transformsBase: "translateX translateY scale scaleX scaleY skewX skewY rotateZ".split(
            " "
          ),
          transforms3D: [
            "transformPerspective",
            "translateZ",
            "scaleZ",
            "rotateX",
            "rotateY",
          ],
          units: "% em ex ch rem vw vh vmin vmax cm mm Q in pc pt px deg grad rad turn s ms".split(
            " "
          ),
          colorNames: {
            aliceblue: "240,248,255",
            antiquewhite: "250,235,215",
            aquamarine: "127,255,212",
            aqua: "0,255,255",
            azure: "240,255,255",
            beige: "245,245,220",
            bisque: "255,228,196",
            black: "0,0,0",
            blanchedalmond: "255,235,205",
            blueviolet: "138,43,226",
            blue: "0,0,255",
            brown: "165,42,42",
            burlywood: "222,184,135",
            cadetblue: "95,158,160",
            chartreuse: "127,255,0",
            chocolate: "210,105,30",
            coral: "255,127,80",
            cornflowerblue: "100,149,237",
            cornsilk: "255,248,220",
            crimson: "220,20,60",
            cyan: "0,255,255",
            darkblue: "0,0,139",
            darkcyan: "0,139,139",
            darkgoldenrod: "184,134,11",
            darkgray: "169,169,169",
            darkgrey: "169,169,169",
            darkgreen: "0,100,0",
            darkkhaki: "189,183,107",
            darkmagenta: "139,0,139",
            darkolivegreen: "85,107,47",
            darkorange: "255,140,0",
            darkorchid: "153,50,204",
            darkred: "139,0,0",
            darksalmon: "233,150,122",
            darkseagreen: "143,188,143",
            darkslateblue: "72,61,139",
            darkslategray: "47,79,79",
            darkturquoise: "0,206,209",
            darkviolet: "148,0,211",
            deeppink: "255,20,147",
            deepskyblue: "0,191,255",
            dimgray: "105,105,105",
            dimgrey: "105,105,105",
            dodgerblue: "30,144,255",
            firebrick: "178,34,34",
            floralwhite: "255,250,240",
            forestgreen: "34,139,34",
            fuchsia: "255,0,255",
            gainsboro: "220,220,220",
            ghostwhite: "248,248,255",
            gold: "255,215,0",
            goldenrod: "218,165,32",
            gray: "128,128,128",
            grey: "128,128,128",
            greenyellow: "173,255,47",
            green: "0,128,0",
            honeydew: "240,255,240",
            hotpink: "255,105,180",
            indianred: "205,92,92",
            indigo: "75,0,130",
            ivory: "255,255,240",
            khaki: "240,230,140",
            lavenderblush: "255,240,245",
            lavender: "230,230,250",
            lawngreen: "124,252,0",
            lemonchiffon: "255,250,205",
            lightblue: "173,216,230",
            lightcoral: "240,128,128",
            lightcyan: "224,255,255",
            lightgoldenrodyellow: "250,250,210",
            lightgray: "211,211,211",
            lightgrey: "211,211,211",
            lightgreen: "144,238,144",
            lightpink: "255,182,193",
            lightsalmon: "255,160,122",
            lightseagreen: "32,178,170",
            lightskyblue: "135,206,250",
            lightslategray: "119,136,153",
            lightsteelblue: "176,196,222",
            lightyellow: "255,255,224",
            limegreen: "50,205,50",
            lime: "0,255,0",
            linen: "250,240,230",
            magenta: "255,0,255",
            maroon: "128,0,0",
            mediumaquamarine: "102,205,170",
            mediumblue: "0,0,205",
            mediumorchid: "186,85,211",
            mediumpurple: "147,112,219",
            mediumseagreen: "60,179,113",
            mediumslateblue: "123,104,238",
            mediumspringgreen: "0,250,154",
            mediumturquoise: "72,209,204",
            mediumvioletred: "199,21,133",
            midnightblue: "25,25,112",
            mintcream: "245,255,250",
            mistyrose: "255,228,225",
            moccasin: "255,228,181",
            navajowhite: "255,222,173",
            navy: "0,0,128",
            oldlace: "253,245,230",
            olivedrab: "107,142,35",
            olive: "128,128,0",
            orangered: "255,69,0",
            orange: "255,165,0",
            orchid: "218,112,214",
            palegoldenrod: "238,232,170",
            palegreen: "152,251,152",
            paleturquoise: "175,238,238",
            palevioletred: "219,112,147",
            papayawhip: "255,239,213",
            peachpuff: "255,218,185",
            peru: "205,133,63",
            pink: "255,192,203",
            plum: "221,160,221",
            powderblue: "176,224,230",
            purple: "128,0,128",
            red: "255,0,0",
            rosybrown: "188,143,143",
            royalblue: "65,105,225",
            saddlebrown: "139,69,19",
            salmon: "250,128,114",
            sandybrown: "244,164,96",
            seagreen: "46,139,87",
            seashell: "255,245,238",
            sienna: "160,82,45",
            silver: "192,192,192",
            skyblue: "135,206,235",
            slateblue: "106,90,205",
            slategray: "112,128,144",
            snow: "255,250,250",
            springgreen: "0,255,127",
            steelblue: "70,130,180",
            tan: "210,180,140",
            teal: "0,128,128",
            thistle: "216,191,216",
            tomato: "255,99,71",
            turquoise: "64,224,208",
            violet: "238,130,238",
            wheat: "245,222,179",
            whitesmoke: "245,245,245",
            white: "255,255,255",
            yellowgreen: "154,205,50",
            yellow: "255,255,0",
          },
        },
        Hooks: {
          templates: {
            textShadow: ["Color X Y Blur", "black 0px 0px 0px"],
            boxShadow: ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
            clip: ["Top Right Bottom Left", "0px 0px 0px 0px"],
            backgroundPosition: ["X Y", "0% 0%"],
            transformOrigin: ["X Y Z", "50% 50% 0px"],
            perspectiveOrigin: ["X Y", "50% 50%"],
          },
          registered: {},
          register: function () {
            for (var a = 0; a < u.Lists.colors.length; a++)
              u.Hooks.templates[u.Lists.colors[a]] = [
                "Red Green Blue Alpha",
                "color" === u.Lists.colors[a] ? "0 0 0 1" : "255 255 255 1",
              ];
            var b;
            if (F)
              for (b in u.Hooks.templates)
                if (u.Hooks.templates.hasOwnProperty(b)) {
                  var c = u.Hooks.templates[b];
                  a = c[0].split(" ");
                  c = c[1].match(u.RegEx.valueSplit);
                  "Color" === a[0] &&
                    (a.push(a.shift()),
                    c.push(c.shift()),
                    (u.Hooks.templates[b] = [a.join(" "), c.join(" ")]));
                }
            for (b in u.Hooks.templates)
              if (u.Hooks.templates.hasOwnProperty(b)) {
                c = u.Hooks.templates[b];
                a = c[0].split(" ");
                for (var e in a)
                  a.hasOwnProperty(e) &&
                    (u.Hooks.registered[b + a[e]] = [b, e]);
              }
          },
          getRoot: function (a) {
            var b = u.Hooks.registered[a];
            return b ? b[0] : a;
          },
          getUnit: function (a, b) {
            return (a =
              (a.substr(b || 0, 5).match(/^[a-z%]+/) || [])[0] || "") &&
              O(u.Lists.units, a)
              ? a
              : "";
          },
          fixColors: function (a) {
            return a.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g, function (a, b, c) {
              return u.Lists.colorNames.hasOwnProperty(c)
                ? (b ? b : "rgba(") + u.Lists.colorNames[c] + (b ? "" : ",1)")
                : b + c;
            });
          },
          cleanRootPropertyValue: function (a, b) {
            u.RegEx.valueUnwrap.test(b) &&
              (b = b.match(u.RegEx.valueUnwrap)[1]);
            u.Values.isCSSNullValue(b) && (b = u.Hooks.templates[a][1]);
            return b;
          },
          extractValue: function (a, b) {
            if ((a = u.Hooks.registered[a])) {
              var c = a[1];
              b = u.Hooks.cleanRootPropertyValue(a[0], b);
              return b.toString().match(u.RegEx.valueSplit)[c];
            }
            return b;
          },
          injectValue: function (a, b, c) {
            var e = u.Hooks.registered[a];
            return e
              ? ((a = e[1]),
                (c = u.Hooks.cleanRootPropertyValue(e[0], c)),
                (c = c.toString().match(u.RegEx.valueSplit)),
                (c[a] = b),
                c.join(" "))
              : c;
          },
        },
        Normalizations: {
          registered: {
            clip: function (a, b, c) {
              switch (a) {
                case "name":
                  return "clip";
                case "extract":
                  return (
                    (a = u.RegEx.wrappedValueAlreadyExtracted.test(c)
                      ? c
                      : (a = c.toString().match(u.RegEx.valueUnwrap))
                      ? a[1].replace(/,(\s+)?/g, " ")
                      : c),
                    a
                  );
                case "inject":
                  return "rect(" + c + ")";
              }
            },
            blur: function (a, b, c) {
              switch (a) {
                case "name":
                  return y.State.isFirefox ? "filter" : "-webkit-filter";
                case "extract":
                  return (
                    (a = parseFloat(c)),
                    a ||
                      0 === a ||
                      (a = (c = c.toString().match(/blur\(([0-9]+[A-z]+)\)/i))
                        ? c[1]
                        : 0),
                    a
                  );
                case "inject":
                  return parseFloat(c) ? "blur(" + c + ")" : "none";
              }
            },
            opacity: function (a, b, c) {
              if (8 >= F)
                switch (a) {
                  case "name":
                    return "filter";
                  case "extract":
                    return (c = (a = c
                      .toString()
                      .match(/alpha\(opacity=(.*)\)/i))
                      ? a[1] / 100
                      : 1);
                  case "inject":
                    return (
                      (b.style.zoom = 1),
                      1 <= parseFloat(c)
                        ? ""
                        : "alpha(opacity\x3d" +
                          parseInt(100 * parseFloat(c), 10) +
                          ")"
                    );
                }
              else
                switch (a) {
                  case "name":
                    return "opacity";
                  case "extract":
                    return c;
                  case "inject":
                    return c;
                }
            },
          },
          register: function () {
            function b(a, b, c) {
              if (
                ("border-box" ===
                  u
                    .getPropertyValue(b, "boxSizing")
                    .toString()
                    .toLowerCase()) ===
                (c || !1)
              ) {
                var e = 0;
                a = "width" === a ? ["Left", "Right"] : ["Top", "Bottom"];
                var f = [
                  "padding" + a[0],
                  "padding" + a[1],
                  "border" + a[0] + "Width",
                  "border" + a[1] + "Width",
                ];
                for (a = 0; a < f.length; a++) {
                  var g = parseFloat(u.getPropertyValue(b, f[a]));
                  isNaN(g) || (e += g);
                }
                return c ? -e : e;
              }
              return 0;
            }
            function c(a, c) {
              return function (e, f, g) {
                switch (e) {
                  case "name":
                    return a;
                  case "extract":
                    return parseFloat(g) + b(a, f, c);
                  case "inject":
                    return parseFloat(g) - b(a, f, c) + "px";
                }
              };
            }
            (F && !(9 < F)) ||
              y.State.isGingerbread ||
              (u.Lists.transformsBase = u.Lists.transformsBase.concat(
                u.Lists.transforms3D
              ));
            for (var f = 0; f < u.Lists.transformsBase.length; f++)
              (function () {
                var b = u.Lists.transformsBase[f];
                u.Normalizations.registered[b] = function (c, f, g) {
                  switch (c) {
                    case "name":
                      return "transform";
                    case "extract":
                      return e(f) === a || e(f).transformCache[b] === a
                        ? /^scale/i.test(b)
                          ? 1
                          : 0
                        : e(f).transformCache[b].replace(/[()]/g, "");
                    case "inject":
                      c = !1;
                      switch (b.substr(0, b.length - 1)) {
                        case "translate":
                          c = !/(%|px|em|rem|vw|vh|\d)$/i.test(g);
                          break;
                        case "scal":
                        case "scale":
                          y.State.isAndroid &&
                            e(f).transformCache[b] === a &&
                            1 > g &&
                            (g = 1);
                          c = !/(\d)$/i.test(g);
                          break;
                        case "skew":
                          c = !/(deg|\d)$/i.test(g);
                          break;
                        case "rotate":
                          c = !/(deg|\d)$/i.test(g);
                      }
                      c || (e(f).transformCache[b] = "(" + g + ")");
                      return e(f).transformCache[b];
                  }
                };
              })();
            for (var g = 0; g < u.Lists.colors.length; g++)
              (function () {
                var b = u.Lists.colors[g];
                u.Normalizations.registered[b] = function (c, e, f) {
                  switch (c) {
                    case "name":
                      return b;
                    case "extract":
                      if (!u.RegEx.wrappedValueAlreadyExtracted.test(f)) {
                        c = {
                          black: "rgb(0, 0, 0)",
                          blue: "rgb(0, 0, 255)",
                          gray: "rgb(128, 128, 128)",
                          green: "rgb(0, 128, 0)",
                          red: "rgb(255, 0, 0)",
                          white: "rgb(255, 255, 255)",
                        };
                        if (/^[A-z]+$/i.test(f))
                          var g = c[f] !== a ? c[f] : c.black;
                        else
                          u.RegEx.isHex.test(f)
                            ? (g =
                                "rgb(" + u.Values.hexToRgb(f).join(" ") + ")")
                            : /^rgba?\(/i.test(f) || (g = c.black);
                        f = (g || f)
                          .toString()
                          .match(u.RegEx.valueUnwrap)[1]
                          .replace(/,(\s+)?/g, " ");
                      }
                      (!F || 8 < F) && 3 === f.split(" ").length && (f += " 1");
                      return f;
                    case "inject":
                      if (/^rgb/.test(f)) return f;
                      8 >= F
                        ? 4 === f.split(" ").length &&
                          (f = f.split(/\s+/).slice(0, 3).join(" "))
                        : 3 === f.split(" ").length && (f += " 1");
                      return (
                        (8 >= F ? "rgb" : "rgba") +
                        "(" +
                        f.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") +
                        ")"
                      );
                  }
                };
              })();
            u.Normalizations.registered.innerWidth = c("width", !0);
            u.Normalizations.registered.innerHeight = c("height", !0);
            u.Normalizations.registered.outerWidth = c("width");
            u.Normalizations.registered.outerHeight = c("height");
          },
        },
        Names: {
          camelCase: function (a) {
            return a.replace(/-(\w)/g, function (a, b) {
              return b.toUpperCase();
            });
          },
          SVGAttribute: function (a) {
            var b = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";
            if (F || (y.State.isAndroid && !y.State.isChrome))
              b += "|transform";
            return new RegExp("^(" + b + ")$", "i").test(a);
          },
          prefixCheck: function (a) {
            if (y.State.prefixMatches[a]) return [y.State.prefixMatches[a], !0];
            for (
              var b = ["", "Webkit", "Moz", "ms", "O"], c = 0, e = b.length;
              c < e;
              c++
            ) {
              var f =
                0 === c
                  ? a
                  : b[c] +
                    a.replace(/^\w/, function (a) {
                      return a.toUpperCase();
                    });
              if (v.isString(y.State.prefixElement.style[f]))
                return (y.State.prefixMatches[a] = f), [f, !0];
            }
            return [a, !1];
          },
        },
        Values: {
          hexToRgb: function (a) {
            a = a.replace(
              /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              function (a, b, c, e) {
                return b + b + c + c + e + e;
              }
            );
            return (a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))
              ? [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
              : [0, 0, 0];
          },
          isCSSNullValue: function (a) {
            return (
              !a || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(a)
            );
          },
          getUnitType: function (a) {
            return /^(rotate|skew)/i.test(a)
              ? "deg"
              : /(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(
                  a
                )
              ? ""
              : "px";
          },
          getDisplayType: function (a) {
            a = a && a.tagName.toString().toLowerCase();
            return /^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(
              a
            )
              ? "inline"
              : /^(li)$/i.test(a)
              ? "list-item"
              : /^(tr)$/i.test(a)
              ? "table-row"
              : /^(table)$/i.test(a)
              ? "table"
              : /^(tbody)$/i.test(a)
              ? "table-row-group"
              : "block";
          },
          addClass: function (a, b) {
            if (a)
              if (a.classList) a.classList.add(b);
              else if (v.isString(a.className))
                a.className += (a.className.length ? " " : "") + b;
              else {
                var c = a.getAttribute(7 >= F ? "className" : "class") || "";
                a.setAttribute("class", c + (c ? " " : "") + b);
              }
          },
          removeClass: function (a, b) {
            if (a)
              if (a.classList) a.classList.remove(b);
              else if (v.isString(a.className))
                a.className = a.className
                  .toString()
                  .replace(
                    new RegExp(
                      "(^|\\s)" + b.split(" ").join("|") + "(\\s|$)",
                      "gi"
                    ),
                    " "
                  );
              else {
                var c = a.getAttribute(7 >= F ? "className" : "class") || "";
                a.setAttribute(
                  "class",
                  c.replace(
                    new RegExp(
                      "(^|s)" + b.split(" ").join("|") + "(s|$)",
                      "gi"
                    ),
                    " "
                  )
                );
              }
          },
        },
        getPropertyValue: function (c, f, g, h) {
          function q(c, f) {
            var g = 0;
            if (8 >= F) g = G.css(c, f);
            else {
              var l = !1;
              /^(width|height)$/.test(f) &&
                0 === u.getPropertyValue(c, "display") &&
                ((l = !0),
                u.setPropertyValue(c, "display", u.Values.getDisplayType(c)));
              var m = function () {
                l && u.setPropertyValue(c, "display", "none");
              };
              if (!h) {
                if (
                  "height" === f &&
                  "border-box" !==
                    u.getPropertyValue(c, "boxSizing").toString().toLowerCase()
                )
                  return (
                    (f =
                      c.offsetHeight -
                      (parseFloat(u.getPropertyValue(c, "borderTopWidth")) ||
                        0) -
                      (parseFloat(u.getPropertyValue(c, "borderBottomWidth")) ||
                        0) -
                      (parseFloat(u.getPropertyValue(c, "paddingTop")) || 0) -
                      (parseFloat(u.getPropertyValue(c, "paddingBottom")) ||
                        0)),
                    m(),
                    f
                  );
                if (
                  "width" === f &&
                  "border-box" !==
                    u.getPropertyValue(c, "boxSizing").toString().toLowerCase()
                )
                  return (
                    (f =
                      c.offsetWidth -
                      (parseFloat(u.getPropertyValue(c, "borderLeftWidth")) ||
                        0) -
                      (parseFloat(u.getPropertyValue(c, "borderRightWidth")) ||
                        0) -
                      (parseFloat(u.getPropertyValue(c, "paddingLeft")) || 0) -
                      (parseFloat(u.getPropertyValue(c, "paddingRight")) || 0)),
                    m(),
                    f
                  );
              }
              g =
                e(c) === a
                  ? b.getComputedStyle(c, null)
                  : e(c).computedStyle
                  ? e(c).computedStyle
                  : (e(c).computedStyle = b.getComputedStyle(c, null));
              "borderColor" === f && (f = "borderTopColor");
              g = 9 === F && "filter" === f ? g.getPropertyValue(f) : g[f];
              if ("" === g || null === g) g = c.style[f];
              m();
            }
            "auto" === g &&
              /^(top|right|bottom|left)$/i.test(f) &&
              ((m = q(c, "position")),
              "fixed" === m || ("absolute" === m && /top|left/i.test(f))) &&
              (g = G(c).position()[f] + "px");
            return g;
          }
          if (u.Hooks.registered[f]) {
            var l = u.Hooks.getRoot(f);
            g === a && (g = u.getPropertyValue(c, u.Names.prefixCheck(l)[0]));
            u.Normalizations.registered[l] &&
              (g = u.Normalizations.registered[l]("extract", c, g));
            l = u.Hooks.extractValue(f, g);
          } else if (u.Normalizations.registered[f]) {
            g = u.Normalizations.registered[f]("name", c);
            if ("transform" !== g) {
              var m = q(c, u.Names.prefixCheck(g)[0]);
              u.Values.isCSSNullValue(m) &&
                u.Hooks.templates[f] &&
                (m = u.Hooks.templates[f][1]);
            }
            l = u.Normalizations.registered[f]("extract", c, m);
          }
          if (!/^[\d-]/.test(l))
            if ((g = e(c)) && g.isSVG && u.Names.SVGAttribute(f))
              if (/^(height|width)$/i.test(f))
                try {
                  l = c.getBBox()[f];
                } catch (R) {
                  l = 0;
                }
              else l = c.getAttribute(f);
            else l = q(c, u.Names.prefixCheck(f)[0]);
          u.Values.isCSSNullValue(l) && (l = 0);
          2 <= y.debug && console.log("Get " + f + ": " + l);
          return l;
        },
        setPropertyValue: function (a, c, f, g, h) {
          var l = c;
          if ("scroll" === c)
            h.container
              ? (h.container["scroll" + h.direction] = f)
              : "Left" === h.direction
              ? b.scrollTo(f, h.alternateValue)
              : b.scrollTo(h.alternateValue, f);
          else if (
            u.Normalizations.registered[c] &&
            "transform" === u.Normalizations.registered[c]("name", a)
          )
            u.Normalizations.registered[c]("inject", a, f),
              (l = "transform"),
              (f = e(a).transformCache[c]);
          else {
            u.Hooks.registered[c] &&
              ((l = c),
              (c = u.Hooks.getRoot(c)),
              (g = g || u.getPropertyValue(a, c)),
              (f = u.Hooks.injectValue(l, f, g)));
            u.Normalizations.registered[c] &&
              ((f = u.Normalizations.registered[c]("inject", a, f)),
              (c = u.Normalizations.registered[c]("name", a)));
            l = u.Names.prefixCheck(c)[0];
            if (8 >= F)
              try {
                a.style[l] = f;
              } catch (P) {
                y.debug &&
                  console.log(
                    "Browser does not support [" + f + "] for [" + l + "]"
                  );
              }
            else
              (g = e(a)) && g.isSVG && u.Names.SVGAttribute(c)
                ? a.setAttribute(c, f)
                : (a.style[l] = f);
            2 <= y.debug && console.log("Set " + c + " (" + l + "): " + f);
          }
          return [l, f];
        },
        flushTransformCache: function (a) {
          var b = "",
            c = e(a);
          if ((F || (y.State.isAndroid && !y.State.isChrome)) && c && c.isSVG) {
            c = function (b) {
              return parseFloat(u.getPropertyValue(a, b));
            };
            var f = {
              translate: [c("translateX"), c("translateY")],
              skewX: [c("skewX")],
              skewY: [c("skewY")],
              scale:
                1 !== c("scale")
                  ? [c("scale"), c("scale")]
                  : [c("scaleX"), c("scaleY")],
              rotate: [c("rotateZ"), 0, 0],
            };
            G.each(e(a).transformCache, function (a) {
              /^translate/i.test(a)
                ? (a = "translate")
                : /^scale/i.test(a)
                ? (a = "scale")
                : /^rotate/i.test(a) && (a = "rotate");
              f[a] && ((b += a + "(" + f[a].join(" ") + ") "), delete f[a]);
            });
          } else {
            var g, h;
            G.each(e(a).transformCache, function (c) {
              g = e(a).transformCache[c];
              if ("transformPerspective" === c) return (h = g), !0;
              9 === F && "rotateZ" === c && (c = "rotate");
              b += c + g + " ";
            });
            h && (b = "perspective" + h + " " + b);
          }
          u.setPropertyValue(a, "transform", b);
        },
      });
      u.Hooks.register();
      u.Normalizations.register();
      y.hook = function (b, f, g) {
        var h;
        b = c(b);
        G.each(b, function (b, c) {
          e(c) === a && y.init(c);
          g === a
            ? h === a && (h = u.getPropertyValue(c, f))
            : ((b = u.setPropertyValue(c, f, g)),
              "transform" === b[0] && y.CSS.flushTransformCache(c),
              (h = b));
        });
        return h;
      };
      var aa = function () {
        function f() {
          return n ? D.promise || null : z;
        }
        function g(c, f) {
          function g(g) {
            if (l.begin && 0 === F)
              try {
                l.begin.call(r, r);
              } catch (wa) {
                setTimeout(function () {
                  throw wa;
                }, 1);
              }
            if ("scroll" === M) {
              var n = /^x$/i.test(l.axis) ? "Left" : "Top",
                x = parseFloat(l.offset) || 0;
              if (l.container)
                if (v.isWrapped(l.container) || v.isNode(l.container)) {
                  l.container = l.container[0] || l.container;
                  var z = l.container["scroll" + n];
                  var P = z + G(c).position()[n.toLowerCase()] + x;
                } else l.container = null;
              else {
                z = y.State.scrollAnchor[y.State["scrollProperty" + n]];
                var R =
                  y.State.scrollAnchor[
                    y.State["scrollProperty" + ("Left" === n ? "Top" : "Left")]
                  ];
                P = G(c).offset()[n.toLowerCase()] + x;
              }
              q = {
                scroll: {
                  rootPropertyValue: !1,
                  startValue: z,
                  currentValue: z,
                  endValue: P,
                  unitType: "",
                  easing: l.easing,
                  scrollData: {
                    container: l.container,
                    direction: n,
                    alternateValue: R,
                  },
                },
                element: c,
              };
              y.debug && console.log("tweensContainer (scroll): ", q.scroll, c);
            } else if ("reverse" === M) {
              var k = e(c);
              if (!k) return;
              if (k.tweensContainer) {
                "none" === k.opts.display && (k.opts.display = "auto");
                "hidden" === k.opts.visibility &&
                  (k.opts.visibility = "visible");
                k.opts.loop = !1;
                k.opts.begin = null;
                k.opts.complete = null;
                B.easing || delete l.easing;
                B.duration || delete l.duration;
                l = G.extend({}, k.opts, l);
                var E = G.extend(!0, {}, k ? k.tweensContainer : null);
                for (x in E)
                  E.hasOwnProperty(x) &&
                    "element" !== x &&
                    ((n = E[x].startValue),
                    (E[x].startValue = E[x].currentValue = E[x].endValue),
                    (E[x].endValue = n),
                    v.isEmptyObject(B) || (E[x].easing = l.easing),
                    y.debug &&
                      console.log(
                        "reverse tweensContainer (" +
                          x +
                          "): " +
                          JSON.stringify(E[x]),
                        c
                      ));
                q = E;
              } else {
                G.dequeue(c, l.queue);
                return;
              }
            } else if ("start" === M) {
              (k = e(c)) &&
                k.tweensContainer &&
                !0 === k.isAnimating &&
                (E = k.tweensContainer);
              z = function (a, b) {
                v.isFunction(a) && (a = a.call(c, f, A));
                if (v.isArray(a)) {
                  var e = a[0];
                  if (
                    (!v.isArray(a[1]) && /^[\d-]/.test(a[1])) ||
                    v.isFunction(a[1]) ||
                    u.RegEx.isHex.test(a[1])
                  )
                    var g = a[1];
                  else if (
                    (v.isString(a[1]) &&
                      !u.RegEx.isHex.test(a[1]) &&
                      y.Easings[a[1]]) ||
                    v.isArray(a[1])
                  ) {
                    var h = b ? a[1] : w(a[1], l.duration);
                    g = a[2];
                  } else g = a[1] || a[2];
                } else e = a;
                b || (h = h || l.easing);
                v.isFunction(e) && (e = e.call(c, f, A));
                v.isFunction(g) && (g = g.call(c, f, A));
                return [e || 0, h, g];
              };
              R = function (f, e) {
                var g = u.Hooks.getRoot(f),
                  r = !1,
                  n = e[0],
                  w = e[1];
                e = e[2];
                if (
                  (k && k.isSVG) ||
                  "tween" === g ||
                  !1 !== u.Names.prefixCheck(g)[1] ||
                  u.Normalizations.registered[g] !== a
                ) {
                  ((l.display !== a &&
                    null !== l.display &&
                    "none" !== l.display) ||
                    (l.visibility !== a && "hidden" !== l.visibility)) &&
                    /opacity|filter/.test(f) &&
                    !e &&
                    0 !== n &&
                    (e = 0);
                  l._cacheValues && E && E[f]
                    ? (e === a && (e = E[f].endValue + E[f].unitType),
                      (r = k.rootPropertyValueCache[g]))
                    : u.Hooks.registered[f]
                    ? e === a
                      ? ((r = u.getPropertyValue(c, g)),
                        (e = u.getPropertyValue(c, f, r)))
                      : (r = u.Hooks.templates[g][1])
                    : e === a && (e = u.getPropertyValue(c, f));
                  var x,
                    z = !1;
                  g = function (a, b) {
                    var c;
                    b = (b || "0")
                      .toString()
                      .toLowerCase()
                      .replace(/[%A-z]+$/, function (a) {
                        c = a;
                        return "";
                      });
                    c || (c = u.Values.getUnitType(a));
                    return [b, c];
                  };
                  if (e !== n && v.isString(e) && v.isString(n)) {
                    var D = "";
                    var I = 0,
                      H = 0,
                      B = [],
                      P = [],
                      R = 0,
                      A = 0,
                      F = 0;
                    e = u.Hooks.fixColors(e);
                    for (
                      n = u.Hooks.fixColors(n);
                      I < e.length && H < n.length;

                    ) {
                      var C = e[I],
                        M = n[H];
                      if (/[\d\.-]/.test(C) && /[\d\.-]/.test(M)) {
                        for (
                          var O = C, L = M, N = (M = ".");
                          ++I < e.length;

                        ) {
                          C = e[I];
                          if (C === M) M = "..";
                          else if (!/\d/.test(C)) break;
                          O += C;
                        }
                        for (; ++H < n.length; ) {
                          M = n[H];
                          if (M === N) N = "..";
                          else if (!/\d/.test(M)) break;
                          L += M;
                        }
                        C = u.Hooks.getUnit(e, I);
                        N = u.Hooks.getUnit(n, H);
                        I += C.length;
                        H += N.length;
                        C === N
                          ? O === L
                            ? (D += O + C)
                            : ((D += "{" + B.length + (A ? "!" : "") + "}" + C),
                              B.push(parseFloat(O)),
                              P.push(parseFloat(L)))
                          : ((O = parseFloat(O)),
                            (L = parseFloat(L)),
                            (D +=
                              (5 > R ? "calc" : "") +
                              "(" +
                              (O
                                ? "{" + B.length + (A ? "!" : "") + "}"
                                : "0") +
                              C +
                              " + " +
                              (L
                                ? "{" +
                                  (B.length + (O ? 1 : 0)) +
                                  (A ? "!" : "") +
                                  "}"
                                : "0") +
                              N +
                              ")"),
                            O && (B.push(O), P.push(0)),
                            L && (B.push(0), P.push(L)));
                      } else if (C === M) {
                        D += C;
                        I++;
                        H++;
                        if (
                          (0 === R && "c" === C) ||
                          (1 === R && "a" === C) ||
                          (2 === R && "l" === C) ||
                          (3 === R && "c" === C) ||
                          (4 <= R && "(" === C)
                        )
                          R++;
                        else if (
                          (R && 5 > R) ||
                          (4 <= R && ")" === C && 5 > --R)
                        )
                          R = 0;
                        if (
                          (0 === A && "r" === C) ||
                          (1 === A && "g" === C) ||
                          (2 === A && "b" === C) ||
                          (3 === A && "a" === C) ||
                          (3 <= A && "(" === C)
                        )
                          3 === A && "a" === C && (F = 1), A++;
                        else if (F && "," === C) 3 < ++F && (A = F = 0);
                        else if (
                          (F && A < (F ? 5 : 4)) ||
                          (A >= (F ? 4 : 3) && ")" === C && --A < (F ? 5 : 4))
                        )
                          A = F = 0;
                      } else {
                        R = 0;
                        break;
                      }
                    }
                    if (I !== e.length || H !== n.length)
                      y.debug &&
                        console.error(
                          'Trying to pattern match mis-matched strings ["' +
                            n +
                            '", "' +
                            e +
                            '"]'
                        ),
                        (D = a);
                    if (D)
                      if (B.length) {
                        y.debug &&
                          console.log(
                            'Pattern found "' + D + '" -\x3e ',
                            B,
                            P,
                            "[" + e + "," + n + "]"
                          );
                        e = B;
                        n = P;
                        var T = (x = "");
                      } else D = a;
                  }
                  D ||
                    ((T = g(f, e)),
                    (e = T[0]),
                    (x = T[1]),
                    (T = g(f, n)),
                    (n = T[0].replace(/^([+-\/*])=/, function (a, b) {
                      z = b;
                      return "";
                    })),
                    (T = T[1]),
                    (e = parseFloat(e) || 0),
                    (n = parseFloat(n) || 0),
                    "%" === T &&
                      (/^(fontSize|lineHeight)$/.test(f)
                        ? ((n /= 100), (T = "em"))
                        : /^scale/.test(f)
                        ? ((n /= 100), (T = ""))
                        : /(Red|Green|Blue)$/i.test(f) &&
                          ((n = (n / 100) * 255), (T = ""))));
                  g = function () {
                    var a = c.parentNode || h.body,
                      e = u.getPropertyValue(c, "position"),
                      f = u.getPropertyValue(c, "fontSize"),
                      g = e === W.lastPosition && a === W.lastParent,
                      l = f === W.lastFontSize;
                    W.lastParent = a;
                    W.lastPosition = e;
                    W.lastFontSize = f;
                    var q = {};
                    if (l && g)
                      (q.emToPx = W.lastEmToPx),
                        (q.percentToPxWidth = W.lastPercentToPxWidth),
                        (q.percentToPxHeight = W.lastPercentToPxHeight);
                    else {
                      var r =
                        k && k.isSVG
                          ? h.createElementNS(
                              "http://www.w3.org/2000/svg",
                              "rect"
                            )
                          : h.createElement("div");
                      y.init(r);
                      a.appendChild(r);
                      G.each(
                        ["overflow", "overflowX", "overflowY"],
                        function (a, b) {
                          y.CSS.setPropertyValue(r, b, "hidden");
                        }
                      );
                      y.CSS.setPropertyValue(r, "position", e);
                      y.CSS.setPropertyValue(r, "fontSize", f);
                      y.CSS.setPropertyValue(r, "boxSizing", "content-box");
                      G.each(
                        "minWidth maxWidth width minHeight maxHeight height".split(
                          " "
                        ),
                        function (a, b) {
                          y.CSS.setPropertyValue(r, b, "100%");
                        }
                      );
                      y.CSS.setPropertyValue(r, "paddingLeft", "100em");
                      q.percentToPxWidth = W.lastPercentToPxWidth =
                        (parseFloat(u.getPropertyValue(r, "width", null, !0)) ||
                          1) / 100;
                      q.percentToPxHeight = W.lastPercentToPxHeight =
                        (parseFloat(
                          u.getPropertyValue(r, "height", null, !0)
                        ) || 1) / 100;
                      q.emToPx = W.lastEmToPx =
                        (parseFloat(u.getPropertyValue(r, "paddingLeft")) ||
                          1) / 100;
                      a.removeChild(r);
                    }
                    null === W.remToPx &&
                      (W.remToPx =
                        parseFloat(u.getPropertyValue(h.body, "fontSize")) ||
                        16);
                    null === W.vwToPx &&
                      ((W.vwToPx = parseFloat(b.innerWidth) / 100),
                      (W.vhToPx = parseFloat(b.innerHeight) / 100));
                    q.remToPx = W.remToPx;
                    q.vwToPx = W.vwToPx;
                    q.vhToPx = W.vhToPx;
                    1 <= y.debug &&
                      console.log("Unit ratios: " + JSON.stringify(q), c);
                    return q;
                  };
                  if (/[\/*]/.test(z)) T = x;
                  else if (x !== T && 0 !== e)
                    if (0 === n) T = x;
                    else {
                      m = m || g();
                      g =
                        /margin|padding|left|right|width|text|word|letter/i.test(
                          f
                        ) ||
                        /X$/.test(f) ||
                        "x" === f
                          ? "x"
                          : "y";
                      switch (x) {
                        case "%":
                          e *=
                            "x" === g
                              ? m.percentToPxWidth
                              : m.percentToPxHeight;
                          break;
                        case "px":
                          break;
                        default:
                          e *= m[x + "ToPx"];
                      }
                      switch (T) {
                        case "%":
                          e *=
                            1 /
                            ("x" === g
                              ? m.percentToPxWidth
                              : m.percentToPxHeight);
                          break;
                        case "px":
                          break;
                        default:
                          e *= 1 / m[T + "ToPx"];
                      }
                    }
                  switch (z) {
                    case "+":
                      n = e + n;
                      break;
                    case "-":
                      n = e - n;
                      break;
                    case "*":
                      n *= e;
                      break;
                    case "/":
                      n = e / n;
                  }
                  q[f] = {
                    rootPropertyValue: r,
                    startValue: e,
                    currentValue: e,
                    endValue: n,
                    unitType: T,
                    easing: w,
                  };
                  D && (q[f].pattern = D);
                  y.debug &&
                    console.log(
                      "tweensContainer (" + f + "): " + JSON.stringify(q[f]),
                      c
                    );
                } else
                  y.debug &&
                    console.log(
                      "Skipping [" + g + "] due to a lack of browser support."
                    );
              };
              for (n in I)
                if (I.hasOwnProperty(n)) {
                  P = u.Names.camelCase(n);
                  g = z(I[n]);
                  if (O(u.Lists.colors, P)) {
                    var C = g[0];
                    x = g[1];
                    var L = g[2];
                    if (u.RegEx.isHex.test(C)) {
                      g = ["Red", "Green", "Blue"];
                      C = u.Values.hexToRgb(C);
                      L = L ? u.Values.hexToRgb(L) : a;
                      for (var N = 0; N < g.length; N++) {
                        var T = [C[N]];
                        x && T.push(x);
                        L !== a && T.push(L[N]);
                        R(P + g[N], T);
                      }
                      continue;
                    }
                  }
                  R(P, g);
                }
              q.element = c;
            }
            if (q.element) {
              u.Values.addClass(c, "velocity-animating");
              Aa.push(q);
              if ((k = e(c)))
                "" === l.queue && ((k.tweensContainer = q), (k.opts = l)),
                  (k.isAnimating = !0);
              F === A - 1
                ? (y.State.calls.push([Aa, r, l, null, D.resolver, null, 0]),
                  !1 === y.State.isTicking && ((y.State.isTicking = !0), H()))
                : F++;
            }
          }
          var l = G.extend({}, y.defaults, B),
            q = {},
            m;
          e(c) === a && y.init(c);
          parseFloat(l.delay) &&
            !1 !== l.queue &&
            G.queue(c, l.queue, function (a, b) {
              if (!0 === b) return !0;
              y.velocityQueueEntryFlag = !0;
              b = y.State.delayedElements.count++;
              y.State.delayedElements[b] = c;
              b = (function (b) {
                return function () {
                  y.State.delayedElements[b] = !1;
                  a();
                };
              })(b);
              e(c).delayBegin = new Date().getTime();
              e(c).delay = parseFloat(l.delay);
              e(c).delayTimer = {
                setTimeout: setTimeout(a, parseFloat(l.delay)),
                next: b,
              };
            });
          switch (l.duration.toString().toLowerCase()) {
            case "fast":
              l.duration = 200;
              break;
            case "normal":
              l.duration = 400;
              break;
            case "slow":
              l.duration = 600;
              break;
            default:
              l.duration = parseFloat(l.duration) || 1;
          }
          !1 !== y.mock &&
            (!0 === y.mock
              ? (l.duration = l.delay = 1)
              : ((l.duration *= parseFloat(y.mock) || 1),
                (l.delay *= parseFloat(y.mock) || 1)));
          l.easing = w(l.easing, l.duration);
          l.begin && !v.isFunction(l.begin) && (l.begin = null);
          l.progress && !v.isFunction(l.progress) && (l.progress = null);
          l.complete && !v.isFunction(l.complete) && (l.complete = null);
          l.display !== a &&
            null !== l.display &&
            ((l.display = l.display.toString().toLowerCase()),
            "auto" === l.display &&
              (l.display = y.CSS.Values.getDisplayType(c)));
          l.visibility !== a &&
            null !== l.visibility &&
            (l.visibility = l.visibility.toString().toLowerCase());
          l.mobileHA = l.mobileHA && y.State.isMobile && !y.State.isGingerbread;
          if (!1 === l.queue)
            if (l.delay) {
              var n = y.State.delayedElements.count++;
              y.State.delayedElements[n] = c;
              n = (function (a) {
                return function () {
                  y.State.delayedElements[a] = !1;
                  g();
                };
              })(n);
              e(c).delayBegin = new Date().getTime();
              e(c).delay = parseFloat(l.delay);
              e(c).delayTimer = {
                setTimeout: setTimeout(g, parseFloat(l.delay)),
                next: n,
              };
            } else g();
          else
            G.queue(c, l.queue, function (a, b) {
              if (!0 === b) return D.promise && D.resolver(r), !0;
              y.velocityQueueEntryFlag = !0;
              g(a);
            });
          ("" !== l.queue && "fx" !== l.queue) ||
            "inprogress" === G.queue(c)[0] ||
            G.dequeue(c);
        }
        var m =
          arguments[0] &&
          (arguments[0].p ||
            (G.isPlainObject(arguments[0].properties) &&
              !arguments[0].properties.names) ||
            v.isString(arguments[0].properties));
        if (v.isWrapped(this)) {
          var n = !1;
          var x = 0;
          var r = this;
          var z = this;
        } else
          (n = !0),
            (x = 1),
            (r = m ? arguments[0].elements || arguments[0].e : arguments[0]);
        var D = { promise: null, resolver: null, rejecter: null };
        n &&
          y.Promise &&
          (D.promise = new y.Promise(function (a, b) {
            D.resolver = a;
            D.rejecter = b;
          }));
        if (m) {
          var I = arguments[0].properties || arguments[0].p;
          var B = arguments[0].options || arguments[0].o;
        } else (I = arguments[x]), (B = arguments[x + 1]);
        if ((r = c(r))) {
          var A = r.length,
            F = 0;
          if (
            !/^(stop|finish|finishAll|pause|resume)$/i.test(I) &&
            !G.isPlainObject(B)
          )
            for (B = {}, m = x + 1; m < arguments.length; m++)
              v.isArray(arguments[m]) ||
              (!/^(fast|normal|slow)$/i.test(arguments[m]) &&
                !/^\d/.test(arguments[m]))
                ? v.isString(arguments[m]) || v.isArray(arguments[m])
                  ? (B.easing = arguments[m])
                  : v.isFunction(arguments[m]) && (B.complete = arguments[m])
                : (B.duration = arguments[m]);
          switch (I) {
            case "scroll":
              var M = "scroll";
              break;
            case "reverse":
              M = "reverse";
              break;
            case "pause":
              var fa = new Date().getTime();
              G.each(r, function (a, b) {
                l(b, fa);
              });
              G.each(y.State.calls, function (b, c) {
                var e = !1;
                c &&
                  G.each(c[1], function (b, f) {
                    b = B === a ? "" : B;
                    if (
                      !0 !== b &&
                      c[2].queue !== b &&
                      (B !== a || !1 !== c[2].queue)
                    )
                      return !0;
                    G.each(r, function (a, b) {
                      if (b === f) return (c[5] = { resume: !1 }), (e = !0), !1;
                    });
                    if (e) return !1;
                  });
              });
              return f();
            case "resume":
              return (
                G.each(r, function (a, b) {
                  q(b, fa);
                }),
                G.each(y.State.calls, function (b, c) {
                  var e = !1;
                  c &&
                    G.each(c[1], function (b, f) {
                      b = B === a ? "" : B;
                      if (
                        (!0 !== b &&
                          c[2].queue !== b &&
                          (B !== a || !1 !== c[2].queue)) ||
                        !c[5]
                      )
                        return !0;
                      G.each(r, function (a, b) {
                        if (b === f) return (e = c[5].resume = !0), !1;
                      });
                      if (e) return !1;
                    });
                }),
                f()
              );
            case "finish":
            case "finishAll":
            case "stop":
              G.each(r, function (a, b) {
                e(b) &&
                  e(b).delayTimer &&
                  (clearTimeout(e(b).delayTimer.setTimeout),
                  e(b).delayTimer.next && e(b).delayTimer.next(),
                  delete e(b).delayTimer);
                "finishAll" !== I ||
                  (!0 !== B && !v.isString(B)) ||
                  (G.each(G.queue(b, v.isString(B) ? B : ""), function (a, b) {
                    v.isFunction(b) && b();
                  }),
                  G.queue(b, v.isString(B) ? B : "", []));
              });
              var ta = [];
              G.each(y.State.calls, function (b, c) {
                c &&
                  G.each(c[1], function (f, g) {
                    var h = B === a ? "" : B;
                    if (
                      !0 !== h &&
                      c[2].queue !== h &&
                      (B !== a || !1 !== c[2].queue)
                    )
                      return !0;
                    G.each(r, function (a, f) {
                      if (f === g) {
                        if (!0 === B || v.isString(B))
                          G.each(
                            G.queue(f, v.isString(B) ? B : ""),
                            function (a, b) {
                              v.isFunction(b) && b(null, !0);
                            }
                          ),
                            G.queue(f, v.isString(B) ? B : "", []);
                        if ("stop" === I)
                          (a = e(f)) &&
                            a.tweensContainer &&
                            (!0 === h || "" === h) &&
                            G.each(a.tweensContainer, function (a, b) {
                              b.endValue = b.currentValue;
                            }),
                            ta.push(b);
                        else if ("finish" === I || "finishAll" === I)
                          c[2].duration = 1;
                      }
                    });
                  });
              });
              "stop" === I &&
                (G.each(ta, function (a, b) {
                  C(b, !0);
                }),
                D.promise && D.resolver(r));
              return f();
            default:
              if (G.isPlainObject(I) && !v.isEmptyObject(I)) M = "start";
              else {
                if (v.isString(I) && y.Redirects[I]) {
                  var S = G.extend({}, B);
                  var Q = S.duration,
                    Fa = S.delay || 0;
                  !0 === S.backwards && (r = G.extend(!0, [], r).reverse());
                  G.each(r, function (b, c) {
                    parseFloat(S.stagger)
                      ? (S.delay = Fa + parseFloat(S.stagger) * b)
                      : v.isFunction(S.stagger) &&
                        (S.delay = Fa + S.stagger.call(c, b, A));
                    S.drag &&
                      ((S.duration =
                        parseFloat(Q) ||
                        (/^(callout|transition)/.test(I) ? 1e3 : 400)),
                      (S.duration = Math.max(
                        S.duration * (S.backwards ? 1 - b / A : (b + 1) / A),
                        0.75 * S.duration,
                        200
                      )));
                    y.Redirects[I].call(
                      c,
                      c,
                      S || {},
                      b,
                      A,
                      r,
                      D.promise ? D : a
                    );
                  });
                } else
                  (m =
                    "Velocity: First argument (" +
                    I +
                    ") was not a property map, a known action, or a registered redirect. Aborting."),
                    D.promise
                      ? D.rejecter(Error(m))
                      : b.console && console.log(m);
                return f();
              }
          }
          var W = {
              lastParent: null,
              lastPosition: null,
              lastFontSize: null,
              lastPercentToPxWidth: null,
              lastPercentToPxHeight: null,
              lastEmToPx: null,
              remToPx: null,
              vwToPx: null,
              vhToPx: null,
            },
            Aa = [];
          G.each(r, function (a, b) {
            v.isNode(b) && g(b, a);
          });
          S = G.extend({}, y.defaults, B);
          S.loop = parseInt(S.loop, 10);
          m = 2 * S.loop - 1;
          if (S.loop)
            for (x = 0; x < m; x++) {
              var Ba = { delay: S.delay, progress: S.progress };
              x === m - 1 &&
                ((Ba.display = S.display),
                (Ba.visibility = S.visibility),
                (Ba.complete = S.complete));
              aa(r, "reverse", Ba);
            }
          return f();
        }
        D.promise &&
          (I && B && !1 === B.promiseRejectEmpty ? D.resolver() : D.rejecter());
      };
      y = G.extend(aa, y);
      y.animate = aa;
      var fa = b.requestAnimationFrame || A;
      y.State.isMobile ||
        h.hidden === a ||
        ((B = function () {
          h.hidden
            ? ((fa = function (a) {
                return setTimeout(function () {
                  a(!0);
                }, 16);
              }),
              H())
            : (fa = b.requestAnimationFrame || A);
        }),
        B(),
        h.addEventListener("visibilitychange", B));
      f.Velocity = y;
      f !== b && ((f.fn.velocity = aa), (f.fn.velocity.defaults = y.defaults));
      G.each(["Down", "Up"], function (b, c) {
        y.Redirects["slide" + c] = function (b, e, f, g, h, l) {
          e = G.extend({}, e);
          var q = e.begin,
            r = e.complete,
            m = {},
            n = {
              height: "",
              marginTop: "",
              marginBottom: "",
              paddingTop: "",
              paddingBottom: "",
            };
          e.display === a &&
            (e.display =
              "Down" === c
                ? "inline" === y.CSS.Values.getDisplayType(b)
                  ? "inline-block"
                  : "block"
                : "none");
          e.begin = function () {
            0 === f && q && q.call(h, h);
            for (var a in n)
              if (n.hasOwnProperty(a)) {
                m[a] = b.style[a];
                var e = u.getPropertyValue(b, a);
                n[a] = "Down" === c ? [e, 0] : [0, e];
              }
            m.overflow = b.style.overflow;
            b.style.overflow = "hidden";
          };
          e.complete = function () {
            for (var a in m) m.hasOwnProperty(a) && (b.style[a] = m[a]);
            f === g - 1 && (r && r.call(h, h), l && l.resolver(h));
          };
          y(b, n, e);
        };
      });
      G.each(["In", "Out"], function (b, c) {
        y.Redirects["fade" + c] = function (b, e, f, g, h, l) {
          b = G.extend({}, e);
          var q = b.complete;
          e = { opacity: "In" === c ? 1 : 0 };
          0 !== f && (b.begin = null);
          b.complete =
            f !== g - 1
              ? null
              : function () {
                  q && q.call(h, h);
                  l && l.resolver(h);
                };
          b.display === a && (b.display = "In" === c ? "auto" : "none");
          y(this, e, b);
        };
      });
      return y;
    }
  })(
    window.jQuery || window.Zepto || window,
    window,
    window ? window.document : void 0
  );
});
(function (f) {
  "function" === typeof require && "object" === typeof exports
    ? (module.exports = f())
    : "function" === typeof define && define.amd
    ? define(["velocity"], f)
    : f();
})(function () {
  return (function (f, b, h, a) {
    var g = f.Velocity;
    if (g && g.Utilities) {
      var c = g.Utilities;
      if (
        (function (a, b) {
          var e = [];
          if (!a || !b) return !1;
          c.each([a, b], function (a, b) {
            var f = [];
            c.each(b, function (a, b) {
              for (; 5 > b.toString().length; ) b = "0" + b;
              f.push(b);
            });
            e.push(f.join(""));
          });
          return parseFloat(e[0]) > parseFloat(e[1]);
        })({ major: 1, minor: 1, patch: 0 }, g.version)
      )
        throw (
          (alert(
            "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity."
          ),
          Error(
            "Velocity UI Pack: You need to update Velocity (velocity.js) to a newer version. Visit http://github.com/julianshapiro/velocity."
          ))
        );
      g.RegisterEffect = g.RegisterUI = function (b, e) {
        function f(a, b, e, f) {
          var h = 0,
            l;
          c.each(a.nodeType ? [a] : a, function (a, b) {
            f && (e += a * f);
            l = b.parentNode;
            a = [
              "height",
              "paddingTop",
              "paddingBottom",
              "marginTop",
              "marginBottom",
            ];
            "border-box" ===
              g.CSS.getPropertyValue(b, "boxSizing").toString().toLowerCase() &&
              (a = ["height"]);
            c.each(a, function (a, c) {
              h += parseFloat(g.CSS.getPropertyValue(b, c));
            });
          });
          g.animate(
            l,
            { height: ("In" === b ? "+" : "-") + "\x3d" + h },
            {
              queue: !1,
              easing: "ease-in-out",
              duration: e * ("In" === b ? 0.6 : 1),
            }
          );
        }
        g.Redirects[b] = function (h, l, q, x, F, A, z) {
          var n = q === x - 1,
            w = 0;
          z = z || e.loop;
          e.defaultDuration =
            "function" === typeof e.defaultDuration
              ? e.defaultDuration.call(F, F)
              : parseFloat(e.defaultDuration);
          for (var v = 0; v < e.calls.length; v++)
            (C = e.calls[v][1]), "number" === typeof C && (w += C);
          w = 1 <= w ? 0 : e.calls.length ? (1 - w) / e.calls.length : 1;
          for (v = 0; v < e.calls.length; v++) {
            var B = e.calls[v],
              H = B[0],
              y = 1e3,
              C = B[1];
            B = B[2] || {};
            var u = {};
            l.duration !== a
              ? (y = l.duration)
              : e.defaultDuration !== a && (y = e.defaultDuration);
            u.duration = y * ("number" === typeof C ? C : w);
            u.queue = l.queue || "";
            u.easing = B.easing || "ease";
            u.delay = parseFloat(B.delay) || 0;
            u.loop = !e.loop && B.loop;
            u._cacheValues = B._cacheValues || !0;
            0 === v &&
              ((u.delay += parseFloat(l.delay) || 0),
              0 === q &&
                (u.begin = function () {
                  l.begin && l.begin.call(F, F);
                  var e = b.match(/(In|Out)$/);
                  e &&
                    "In" === e[0] &&
                    H.opacity !== a &&
                    c.each(F.nodeType ? [F] : F, function (a, b) {
                      g.CSS.setPropertyValue(b, "opacity", 0);
                    });
                  l.animateParentHeight &&
                    e &&
                    f(F, e[0], y + u.delay, l.stagger);
                }),
              null !== l.display &&
                (l.display !== a && "none" !== l.display
                  ? (u.display = l.display)
                  : /In$/.test(b) &&
                    ((C = g.CSS.Values.getDisplayType(h)),
                    (u.display = "inline" === C ? "inline-block" : C))),
              l.visibility &&
                "hidden" !== l.visibility &&
                (u.visibility = l.visibility));
            if (v === e.calls.length - 1) {
              var aa = function () {
                (l.display !== a && "none" !== l.display) ||
                  !/Out$/.test(b) ||
                  c.each(F.nodeType ? [F] : F, function (a, b) {
                    g.CSS.setPropertyValue(b, "display", "none");
                  });
                l.complete && l.complete.call(F, F);
                A && A.resolver(F || h);
              };
              u.complete = function () {
                if (z)
                  g.Redirects[b](
                    h,
                    l,
                    q,
                    x,
                    F,
                    A,
                    !0 === z ? !0 : Math.max(0, z - 1)
                  );
                if (e.reset) {
                  for (var c in e.reset)
                    if (e.reset.hasOwnProperty(c)) {
                      var f = e.reset[c];
                      g.CSS.Hooks.registered[c] !== a ||
                        ("string" !== typeof f && "number" !== typeof f) ||
                        (e.reset[c] = [e.reset[c], e.reset[c]]);
                    }
                  c = { duration: 0, queue: !1 };
                  n && (c.complete = aa);
                  g.animate(h, e.reset, c);
                } else n && aa();
              };
              "hidden" === l.visibility && (u.visibility = l.visibility);
            }
            g.animate(h, H, u);
          }
        };
        return g;
      };
      g.RegisterEffect.packagedEffects = {
        "callout.bounce": {
          defaultDuration: 550,
          calls: [
            [{ translateY: -30 }, 0.25],
            [{ translateY: 0 }, 0.125],
            [{ translateY: -15 }, 0.125],
            [{ translateY: 0 }, 0.25],
          ],
        },
        "callout.shake": {
          defaultDuration: 800,
          calls: [
            [{ translateX: -11 }],
            [{ translateX: 11 }],
            [{ translateX: -11 }],
            [{ translateX: 11 }],
            [{ translateX: -11 }],
            [{ translateX: 11 }],
            [{ translateX: -11 }],
            [{ translateX: 0 }],
          ],
        },
        "callout.flash": {
          defaultDuration: 1100,
          calls: [
            [{ opacity: [0, "easeInOutQuad", 1] }],
            [{ opacity: [1, "easeInOutQuad"] }],
            [{ opacity: [0, "easeInOutQuad"] }],
            [{ opacity: [1, "easeInOutQuad"] }],
          ],
        },
        "callout.pulse": {
          defaultDuration: 825,
          calls: [
            [{ scaleX: 1.1, scaleY: 1.1 }, 0.5, { easing: "easeInExpo" }],
            [{ scaleX: 1, scaleY: 1 }, 0.5],
          ],
        },
        "callout.swing": {
          defaultDuration: 950,
          calls: [
            [{ rotateZ: 15 }],
            [{ rotateZ: -10 }],
            [{ rotateZ: 5 }],
            [{ rotateZ: -5 }],
            [{ rotateZ: 0 }],
          ],
        },
        "callout.tada": {
          defaultDuration: 1e3,
          calls: [
            [{ scaleX: 0.9, scaleY: 0.9, rotateZ: -3 }, 0.1],
            [{ scaleX: 1.1, scaleY: 1.1, rotateZ: 3 }, 0.1],
            [{ scaleX: 1.1, scaleY: 1.1, rotateZ: -3 }, 0.1],
            ["reverse", 0.125],
            ["reverse", 0.125],
            ["reverse", 0.125],
            ["reverse", 0.125],
            ["reverse", 0.125],
            [{ scaleX: 1, scaleY: 1, rotateZ: 0 }, 0.2],
          ],
        },
        "transition.fadeIn": {
          defaultDuration: 500,
          calls: [[{ opacity: [1, 0] }]],
        },
        "transition.fadeOut": {
          defaultDuration: 500,
          calls: [[{ opacity: [0, 1] }]],
        },
        "transition.flipXIn": {
          defaultDuration: 700,
          calls: [
            [
              {
                opacity: [1, 0],
                transformPerspective: [800, 800],
                rotateY: [0, -55],
              },
            ],
          ],
          reset: { transformPerspective: 0 },
        },
        "transition.flipXOut": {
          defaultDuration: 700,
          calls: [
            [
              {
                opacity: [0, 1],
                transformPerspective: [800, 800],
                rotateY: 55,
              },
            ],
          ],
          reset: { transformPerspective: 0, rotateY: 0 },
        },
        "transition.flipYIn": {
          defaultDuration: 800,
          calls: [
            [
              {
                opacity: [1, 0],
                transformPerspective: [800, 800],
                rotateX: [0, -45],
              },
            ],
          ],
          reset: { transformPerspective: 0 },
        },
        "transition.flipYOut": {
          defaultDuration: 800,
          calls: [
            [
              {
                opacity: [0, 1],
                transformPerspective: [800, 800],
                rotateX: 25,
              },
            ],
          ],
          reset: { transformPerspective: 0, rotateX: 0 },
        },
        "transition.flipBounceXIn": {
          defaultDuration: 900,
          calls: [
            [
              {
                opacity: [0.725, 0],
                transformPerspective: [400, 400],
                rotateY: [-10, 90],
              },
              0.5,
            ],
            [{ opacity: 0.8, rotateY: 10 }, 0.25],
            [{ opacity: 1, rotateY: 0 }, 0.25],
          ],
          reset: { transformPerspective: 0 },
        },
        "transition.flipBounceXOut": {
          defaultDuration: 800,
          calls: [
            [
              {
                opacity: [0.9, 1],
                transformPerspective: [400, 400],
                rotateY: -10,
              },
            ],
            [{ opacity: 0, rotateY: 90 }],
          ],
          reset: { transformPerspective: 0, rotateY: 0 },
        },
        "transition.flipBounceYIn": {
          defaultDuration: 850,
          calls: [
            [
              {
                opacity: [0.725, 0],
                transformPerspective: [400, 400],
                rotateX: [-10, 90],
              },
              0.5,
            ],
            [{ opacity: 0.8, rotateX: 10 }, 0.25],
            [{ opacity: 1, rotateX: 0 }, 0.25],
          ],
          reset: { transformPerspective: 0 },
        },
        "transition.flipBounceYOut": {
          defaultDuration: 800,
          calls: [
            [
              {
                opacity: [0.9, 1],
                transformPerspective: [400, 400],
                rotateX: -15,
              },
            ],
            [{ opacity: 0, rotateX: 90 }],
          ],
          reset: { transformPerspective: 0, rotateX: 0 },
        },
        "transition.swoopIn": {
          defaultDuration: 850,
          calls: [
            [
              {
                opacity: [1, 0],
                transformOriginX: ["100%", "50%"],
                transformOriginY: ["100%", "100%"],
                scaleX: [1, 0],
                scaleY: [1, 0],
                translateX: [0, -700],
                translateZ: 0,
              },
            ],
          ],
          reset: { transformOriginX: "50%", transformOriginY: "50%" },
        },
        "transition.swoopOut": {
          defaultDuration: 850,
          calls: [
            [
              {
                opacity: [0, 1],
                transformOriginX: ["50%", "100%"],
                transformOriginY: ["100%", "100%"],
                scaleX: 0,
                scaleY: 0,
                translateX: -700,
                translateZ: 0,
              },
            ],
          ],
          reset: {
            transformOriginX: "50%",
            transformOriginY: "50%",
            scaleX: 1,
            scaleY: 1,
            translateX: 0,
          },
        },
        "transition.whirlIn": {
          defaultDuration: 850,
          calls: [
            [
              {
                opacity: [1, 0],
                transformOriginX: ["50%", "50%"],
                transformOriginY: ["50%", "50%"],
                scaleX: [1, 0],
                scaleY: [1, 0],
                rotateY: [0, 160],
              },
              1,
              { easing: "easeInOutSine" },
            ],
          ],
        },
        "transition.whirlOut": {
          defaultDuration: 750,
          calls: [
            [
              {
                opacity: [0, "easeInOutQuint", 1],
                transformOriginX: ["50%", "50%"],
                transformOriginY: ["50%", "50%"],
                scaleX: 0,
                scaleY: 0,
                rotateY: 160,
              },
              1,
              { easing: "swing" },
            ],
          ],
          reset: { scaleX: 1, scaleY: 1, rotateY: 0 },
        },
        "transition.shrinkIn": {
          defaultDuration: 750,
          calls: [
            [
              {
                opacity: [1, 0],
                transformOriginX: ["50%", "50%"],
                transformOriginY: ["50%", "50%"],
                scaleX: [1, 1.5],
                scaleY: [1, 1.5],
                translateZ: 0,
              },
            ],
          ],
        },
        "transition.shrinkOut": {
          defaultDuration: 600,
          calls: [
            [
              {
                opacity: [0, 1],
                transformOriginX: ["50%", "50%"],
                transformOriginY: ["50%", "50%"],
                scaleX: 1.3,
                scaleY: 1.3,
                translateZ: 0,
              },
            ],
          ],
          reset: { scaleX: 1, scaleY: 1 },
        },
        "transition.expandIn": {
          defaultDuration: 700,
          calls: [
            [
              {
                opacity: [1, 0],
                transformOriginX: ["50%", "50%"],
                transformOriginY: ["50%", "50%"],
                scaleX: [1, 0.625],
                scaleY: [1, 0.625],
                translateZ: 0,
              },
            ],
          ],
        },
        "transition.expandOut": {
          defaultDuration: 700,
          calls: [
            [
              {
                opacity: [0, 1],
                transformOriginX: ["50%", "50%"],
                transformOriginY: ["50%", "50%"],
                scaleX: 0.5,
                scaleY: 0.5,
                translateZ: 0,
              },
            ],
          ],
          reset: { scaleX: 1, scaleY: 1 },
        },
        "transition.bounceIn": {
          defaultDuration: 800,
          calls: [
            [
              { opacity: [1, 0], scaleX: [1.05, 0.3], scaleY: [1.05, 0.3] },
              0.35,
            ],
            [{ scaleX: 0.9, scaleY: 0.9, translateZ: 0 }, 0.2],
            [{ scaleX: 1, scaleY: 1 }, 0.45],
          ],
        },
        "transition.bounceOut": {
          defaultDuration: 800,
          calls: [
            [{ scaleX: 0.95, scaleY: 0.95 }, 0.35],
            [{ scaleX: 1.1, scaleY: 1.1, translateZ: 0 }, 0.35],
            [{ opacity: [0, 1], scaleX: 0.3, scaleY: 0.3 }, 0.3],
          ],
          reset: { scaleX: 1, scaleY: 1 },
        },
        "transition.bounceUpIn": {
          defaultDuration: 800,
          calls: [
            [
              { opacity: [1, 0], translateY: [-30, 1e3] },
              0.6,
              { easing: "easeOutCirc" },
            ],
            [{ translateY: 10 }, 0.2],
            [{ translateY: 0 }, 0.2],
          ],
        },
        "transition.bounceUpOut": {
          defaultDuration: 1e3,
          calls: [
            [{ translateY: 20 }, 0.2],
            [{ opacity: [0, "easeInCirc", 1], translateY: -1e3 }, 0.8],
          ],
          reset: { translateY: 0 },
        },
        "transition.bounceDownIn": {
          defaultDuration: 800,
          calls: [
            [
              { opacity: [1, 0], translateY: [30, -1e3] },
              0.6,
              { easing: "easeOutCirc" },
            ],
            [{ translateY: -10 }, 0.2],
            [{ translateY: 0 }, 0.2],
          ],
        },
        "transition.bounceDownOut": {
          defaultDuration: 1e3,
          calls: [
            [{ translateY: -20 }, 0.2],
            [{ opacity: [0, "easeInCirc", 1], translateY: 1e3 }, 0.8],
          ],
          reset: { translateY: 0 },
        },
        "transition.bounceLeftIn": {
          defaultDuration: 750,
          calls: [
            [
              { opacity: [1, 0], translateX: [30, -1250] },
              0.6,
              { easing: "easeOutCirc" },
            ],
            [{ translateX: -10 }, 0.2],
            [{ translateX: 0 }, 0.2],
          ],
        },
        "transition.bounceLeftOut": {
          defaultDuration: 750,
          calls: [
            [{ translateX: 30 }, 0.2],
            [{ opacity: [0, "easeInCirc", 1], translateX: -1250 }, 0.8],
          ],
          reset: { translateX: 0 },
        },
        "transition.bounceRightIn": {
          defaultDuration: 750,
          calls: [
            [
              { opacity: [1, 0], translateX: [-30, 1250] },
              0.6,
              { easing: "easeOutCirc" },
            ],
            [{ translateX: 10 }, 0.2],
            [{ translateX: 0 }, 0.2],
          ],
        },
        "transition.bounceRightOut": {
          defaultDuration: 750,
          calls: [
            [{ translateX: -30 }, 0.2],
            [{ opacity: [0, "easeInCirc", 1], translateX: 1250 }, 0.8],
          ],
          reset: { translateX: 0 },
        },
        "transition.slideUpIn": {
          defaultDuration: 900,
          calls: [[{ opacity: [1, 0], translateY: [0, 20], translateZ: 0 }]],
        },
        "transition.slideUpOut": {
          defaultDuration: 900,
          calls: [[{ opacity: [0, 1], translateY: -20, translateZ: 0 }]],
          reset: { translateY: 0 },
        },
        "transition.slideDownIn": {
          defaultDuration: 900,
          calls: [[{ opacity: [1, 0], translateY: [0, -20], translateZ: 0 }]],
        },
        "transition.slideDownOut": {
          defaultDuration: 900,
          calls: [[{ opacity: [0, 1], translateY: 20, translateZ: 0 }]],
          reset: { translateY: 0 },
        },
        "transition.slideLeftIn": {
          defaultDuration: 1e3,
          calls: [[{ opacity: [1, 0], translateX: [0, -20], translateZ: 0 }]],
        },
        "transition.slideLeftOut": {
          defaultDuration: 1050,
          calls: [[{ opacity: [0, 1], translateX: -20, translateZ: 0 }]],
          reset: { translateX: 0 },
        },
        "transition.slideRightIn": {
          defaultDuration: 1e3,
          calls: [[{ opacity: [1, 0], translateX: [0, 20], translateZ: 0 }]],
        },
        "transition.slideRightOut": {
          defaultDuration: 1050,
          calls: [[{ opacity: [0, 1], translateX: 20, translateZ: 0 }]],
          reset: { translateX: 0 },
        },
        "transition.slideUpBigIn": {
          defaultDuration: 850,
          calls: [[{ opacity: [1, 0], translateY: [0, 75], translateZ: 0 }]],
        },
        "transition.slideUpBigOut": {
          defaultDuration: 800,
          calls: [[{ opacity: [0, 1], translateY: -75, translateZ: 0 }]],
          reset: { translateY: 0 },
        },
        "transition.slideDownBigIn": {
          defaultDuration: 850,
          calls: [[{ opacity: [1, 0], translateY: [0, -75], translateZ: 0 }]],
        },
        "transition.slideDownBigOut": {
          defaultDuration: 800,
          calls: [[{ opacity: [0, 1], translateY: 75, translateZ: 0 }]],
          reset: { translateY: 0 },
        },
        "transition.slideLeftBigIn": {
          defaultDuration: 800,
          calls: [[{ opacity: [1, 0], translateX: [0, -75], translateZ: 0 }]],
        },
        "transition.slideLeftBigOut": {
          defaultDuration: 750,
          calls: [[{ opacity: [0, 1], translateX: -75, translateZ: 0 }]],
          reset: { translateX: 0 },
        },
        "transition.slideRightBigIn": {
          defaultDuration: 800,
          calls: [[{ opacity: [1, 0], translateX: [0, 75], translateZ: 0 }]],
        },
        "transition.slideRightBigOut": {
          defaultDuration: 750,
          calls: [[{ opacity: [0, 1], translateX: 75, translateZ: 0 }]],
          reset: { translateX: 0 },
        },
        "transition.perspectiveUpIn": {
          defaultDuration: 800,
          calls: [
            [
              {
                opacity: [1, 0],
                transformPerspective: [800, 800],
                transformOriginX: [0, 0],
                transformOriginY: ["100%", "100%"],
                rotateX: [0, -180],
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
          },
        },
        "transition.perspectiveUpOut": {
          defaultDuration: 850,
          calls: [
            [
              {
                opacity: [0, 1],
                transformPerspective: [800, 800],
                transformOriginX: [0, 0],
                transformOriginY: ["100%", "100%"],
                rotateX: -180,
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
            rotateX: 0,
          },
        },
        "transition.perspectiveDownIn": {
          defaultDuration: 800,
          calls: [
            [
              {
                opacity: [1, 0],
                transformPerspective: [800, 800],
                transformOriginX: [0, 0],
                transformOriginY: [0, 0],
                rotateX: [0, 180],
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
          },
        },
        "transition.perspectiveDownOut": {
          defaultDuration: 850,
          calls: [
            [
              {
                opacity: [0, 1],
                transformPerspective: [800, 800],
                transformOriginX: [0, 0],
                transformOriginY: [0, 0],
                rotateX: 180,
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
            rotateX: 0,
          },
        },
        "transition.perspectiveLeftIn": {
          defaultDuration: 950,
          calls: [
            [
              {
                opacity: [1, 0],
                transformPerspective: [2e3, 2e3],
                transformOriginX: [0, 0],
                transformOriginY: [0, 0],
                rotateY: [0, -180],
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
          },
        },
        "transition.perspectiveLeftOut": {
          defaultDuration: 950,
          calls: [
            [
              {
                opacity: [0, 1],
                transformPerspective: [2e3, 2e3],
                transformOriginX: [0, 0],
                transformOriginY: [0, 0],
                rotateY: -180,
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
            rotateY: 0,
          },
        },
        "transition.perspectiveRightIn": {
          defaultDuration: 950,
          calls: [
            [
              {
                opacity: [1, 0],
                transformPerspective: [2e3, 2e3],
                transformOriginX: ["100%", "100%"],
                transformOriginY: [0, 0],
                rotateY: [0, 180],
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
          },
        },
        "transition.perspectiveRightOut": {
          defaultDuration: 950,
          calls: [
            [
              {
                opacity: [0, 1],
                transformPerspective: [2e3, 2e3],
                transformOriginX: ["100%", "100%"],
                transformOriginY: [0, 0],
                rotateY: 180,
              },
            ],
          ],
          reset: {
            transformPerspective: 0,
            transformOriginX: "50%",
            transformOriginY: "50%",
            rotateY: 0,
          },
        },
      };
      for (var e in g.RegisterEffect.packagedEffects)
        g.RegisterEffect.packagedEffects.hasOwnProperty(e) &&
          g.RegisterEffect(e, g.RegisterEffect.packagedEffects[e]);
      g.RunSequence = function (a) {
        var b = c.extend(!0, [], a);
        1 < b.length &&
          (c.each(b.reverse(), function (a, e) {
            var f = b[a + 1];
            if (f) {
              var h = e.o || e.options;
              a = f.o || f.options;
              h = h && !1 === h.sequenceQueue ? "begin" : "complete";
              var l = a && a[h],
                q = {};
              q[h] = function () {
                var a = f.e || f.elements;
                a = a.nodeType ? [a] : a;
                l && l.call(a, a);
                g(e);
              };
              f.o
                ? (f.o = c.extend({}, a, q))
                : (f.options = c.extend({}, a, q));
            }
          }),
          b.reverse());
        g(b[0]);
      };
    } else b.console && console.log("Velocity UI Pack: Velocity must be loaded first. Aborting.");
  })(
    window.jQuery || window.Zepto || window,
    window,
    window ? window.document : void 0
  );
});
window.whatInput = (function () {
  function f() {
    window.clearTimeout(v);
    a(event);
    n = !0;
    v = window.setTimeout(function () {
      n = !1;
    }, 650);
  }
  function b(b) {
    n || a(b);
  }
  function h(b) {
    window.clearTimeout(v);
    a(b);
  }
  function a(a) {
    var b = a.keyCode ? a.keyCode : a.which,
      c = A[a.type];
    "pointer" === c &&
      (c =
        "number" === typeof a.pointerType
          ? O[a.pointerType]
          : "pen" === a.pointerType
          ? "touch"
          : a.pointerType);
    if (w !== c) {
      var e = a.target || a.srcElement;
      a = e.nodeName.toLowerCase();
      e = "input" === a ? e.getAttribute("type") : null;
      (!x.hasAttribute("data-whatinput-formtyping") &&
        w &&
        "keyboard" === c &&
        "tab" !== D[b] &&
        ("textarea" === a ||
          "select" === a ||
          ("input" === a && 0 > H.indexOf(e)))) ||
        -1 < F.indexOf(b) ||
        g(c);
    }
    "keyboard" === c && -1 === q.indexOf(D[b]) && D[b] && q.push(D[b]);
  }
  function g(a) {
    w = a;
    x.setAttribute("data-whatinput", w);
    -1 === z.indexOf(w) && z.push(w);
  }
  function c(a) {
    a = q.indexOf(D[a.keyCode ? a.keyCode : a.which]);
    -1 !== a && q.splice(a, 1);
  }
  function e() {
    x = document.body;
    window.PointerEvent
      ? (x.addEventListener("pointerdown", b),
        x.addEventListener("pointermove", b))
      : window.MSPointerEvent
      ? (x.addEventListener("MSPointerDown", b),
        x.addEventListener("MSPointerMove", b))
      : (x.addEventListener("mousedown", b),
        x.addEventListener("mousemove", b),
        "ontouchstart" in window && x.addEventListener("touchstart", f));
    x.addEventListener(C, b);
    x.addEventListener("keydown", h);
    x.addEventListener("keyup", h);
    document.addEventListener("keyup", c);
  }
  function l() {
    return (C =
      "onwheel" in document.createElement("div")
        ? "wheel"
        : void 0 !== document.onmousewheel
        ? "mousewheel"
        : "DOMMouseScroll");
  }
  var q = [],
    x,
    n = !1,
    w = null,
    H = "button checkbox file image radio reset submit".split(" "),
    C = l(),
    F = [16, 17, 18, 91, 93],
    A = {
      keydown: "keyboard",
      keyup: "keyboard",
      mousedown: "mouse",
      mousemove: "mouse",
      MSPointerDown: "pointer",
      MSPointerMove: "pointer",
      pointerdown: "pointer",
      pointermove: "pointer",
      touchstart: "touch",
    };
  A[l()] = "mouse";
  var z = [],
    D = {
      9: "tab",
      13: "enter",
      16: "shift",
      27: "esc",
      32: "space",
      37: "left",
      38: "up",
      39: "right",
      40: "down",
    },
    O = { 2: "touch", 3: "touch", 4: "mouse" },
    v;
  "addEventListener" in window &&
    Array.prototype.indexOf &&
    (document.body ? e() : document.addEventListener("DOMContentLoaded", e));
  return {
    ask: function () {
      return w;
    },
    keys: function () {
      return q;
    },
    types: function () {
      return z;
    },
    set: g,
  };
})();
