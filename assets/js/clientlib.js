Element.prototype.matches ||
  (Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector);
Element.prototype.closest ||
  (Element.prototype.closest = function (a) {
    var b = this;
    if (!document.documentElement.contains(b)) return null;
    do {
      if (b.matches(a)) return b;
      b = b.parentElement || b.parentNode;
    } while (null !== b && 1 === b.nodeType);
    return null;
  });
(function () {
  function a(a) {
    function b(a) {
      a.element.removeAttribute("data-cmp-is");
      e(a.options);
      c(a.element);
      h._elements.item &&
        ((h._elements.item = Array.isArray(h._elements.item)
          ? h._elements.item
          : [h._elements.item]),
        (h._elements.button = Array.isArray(h._elements.button)
          ? h._elements.button
          : [h._elements.button]),
        (h._elements.panel = Array.isArray(h._elements.panel)
          ? h._elements.panel
          : [h._elements.panel]),
        h._properties.singleExpansion &&
          ((a = x()), 0 === a.length && n(0), 1 < a.length && n(a.length - 1)),
        y(),
        f(),
        window.Granite &&
          window.Granite.author &&
          window.Granite.author.MessageChannel &&
          new window.Granite.author.MessageChannel(
            "cqauthor",
            window
          ).subscribeRequestMessage("cmp.panelcontainer", function (a) {
            if (
              a.data &&
              "cmp-accordion" === a.data.type &&
              a.data.id === h._elements.self.dataset.cmpPanelcontainerId &&
              "navigate" === a.data.operation
            ) {
              var b = h._properties.singleExpansion;
              h._properties.singleExpansion = !0;
              n(a.data.index);
              h._properties.singleExpansion = b;
            }
          }));
    }
    function c(a) {
      h._elements = {};
      h._elements.self = a;
      a = h._elements.self.querySelectorAll("[data-cmp-hook-accordion]");
      for (var b = 0; b < a.length; b++) {
        var c = a[b];
        if (c.closest(".cmp-accordion") === h._elements.self) {
          var d = "accordion";
          d = d.charAt(0).toUpperCase() + d.slice(1);
          d = c.dataset["cmpHook" + d];
          h._elements[d]
            ? (Array.isArray(h._elements[d]) ||
                (h._elements[d] = [h._elements[d]]),
              h._elements[d].push(c))
            : (h._elements[d] = c);
        }
      }
    }
    function e(a) {
      h._properties = {};
      for (var b in k)
        if (k.hasOwnProperty(b)) {
          var c = k[b],
            d = null;
          a &&
            null != a[b] &&
            ((d = a[b]),
            c && "function" === typeof c.transform && (d = c.transform(d)));
          null === d && (d = k[b]["default"]);
          h._properties[b] = d;
        }
    }
    function f() {
      var a = h._elements.button;
      if (a)
        for (var b = 0; b < a.length; b++)
          (function (c) {
            a[b].addEventListener("click", function (a) {
              n(c);
              r(c);
            });
            a[b].addEventListener("keydown", function (a) {
              var b = h._elements.button.length - 1;
              switch (a.keyCode) {
                case d.ARROW_LEFT:
                case d.ARROW_UP:
                  a.preventDefault();
                  0 < c && r(c - 1);
                  break;
                case d.ARROW_RIGHT:
                case d.ARROW_DOWN:
                  a.preventDefault();
                  c < b && r(c + 1);
                  break;
                case d.HOME:
                  a.preventDefault();
                  r(0);
                  break;
                case d.END:
                  a.preventDefault();
                  r(b);
                  break;
                case d.ENTER:
                case d.SPACE:
                  a.preventDefault(), n(c), r(c);
              }
            });
          })(b);
    }
    function n(a) {
      if ((a = h._elements.item[a]))
        if (h._properties.singleExpansion) {
          for (var b = 0; b < h._elements.item.length; b++)
            h._elements.item[b] !== a &&
              t(h._elements.item[b]) &&
              p(h._elements.item[b], !1);
          p(a, !0);
        } else p(a, !t(a));
    }
    function p(a, b) {
      b
        ? a.setAttribute(l.item.expanded, "")
        : a.removeAttribute(l.item.expanded);
      v(a);
    }
    function t(a) {
      return a && a.dataset && void 0 !== a.dataset.cmpExpanded;
    }
    function v(a) {
      if (t(a)) {
        var b = h._elements.item.indexOf(a);
        -1 < b &&
          ((a = h._elements.button[b]),
          (b = h._elements.panel[b]),
          a.classList.add(g.button.expanded),
          a.setAttribute("aria-expanded", !0),
          b.classList.add(g.panel.expanded),
          b.classList.remove(g.panel.hidden),
          b.setAttribute("aria-hidden", !1),
          h._properties.singleExpansion &&
            (a.classList.add(g.button.disabled),
            a.setAttribute("aria-disabled", !0)));
      } else
        (b = h._elements.item.indexOf(a)),
          -1 < b &&
            ((a = h._elements.button[b]),
            (b = h._elements.panel[b]),
            a.classList.remove(g.button.disabled),
            a.classList.remove(g.button.expanded),
            a.removeAttribute("aria-disabled"),
            a.setAttribute("aria-expanded", !1),
            b.classList.add(g.panel.hidden),
            b.classList.remove(g.panel.expanded),
            b.setAttribute("aria-hidden", !0));
    }
    function y() {
      for (var a = 0; a < h._elements.item.length; a++) v(h._elements.item[a]);
    }
    function x() {
      for (var a = [], b = 0; b < h._elements.item.length; b++) {
        var c = h._elements.item[b];
        t(c) && a.push(c);
      }
      return a;
    }
    function r(a) {
      h._elements.button[a].focus();
    }
    var h = this;
    a && a.element && b(a);
  }
  function b(a) {
    a = a.dataset;
    var b = [],
      c = "accordion";
    c = c.charAt(0).toUpperCase() + c.slice(1);
    c = ["is", "hook" + c];
    for (var d in a)
      if (a.hasOwnProperty(d)) {
        var e = a[d];
        0 === d.indexOf("cmp") &&
          ((d = d.slice(3)),
          (d = d.charAt(0).toLowerCase() + d.substring(1)),
          -1 === c.indexOf(d) && (b[d] = e));
      }
    return b;
  }
  function c() {
    for (var c = document.querySelectorAll(f.self), d = 0; d < c.length; d++)
      new a({ element: c[d], options: b(c[d]) });
    c =
      window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver;
    d = document.querySelector("body");
    new c(function (c) {
      c.forEach(function (c) {
        c = [].slice.call(c.addedNodes);
        0 < c.length &&
          c.forEach(function (c) {
            c.querySelectorAll &&
              [].slice.call(c.querySelectorAll(f.self)).forEach(function (c) {
                new a({ element: c, options: b(c) });
              });
          });
      });
    }).observe(d, { subtree: !0, childList: !0, characterData: !0 });
  }
  var d = {
      ENTER: 13,
      SPACE: 32,
      END: 35,
      HOME: 36,
      ARROW_LEFT: 37,
      ARROW_UP: 38,
      ARROW_RIGHT: 39,
      ARROW_DOWN: 40,
    },
    f = { self: '[data-cmp-is\x3d"accordion"]' },
    g = {
      button: {
        disabled: "cmp-accordion__button--disabled",
        expanded: "cmp-accordion__button--expanded",
      },
      panel: {
        hidden: "cmp-accordion__panel--hidden",
        expanded: "cmp-accordion__panel--expanded",
      },
    },
    l = { item: { expanded: "data-cmp-expanded" } },
    k = {
      singleExpansion: {
        default: !1,
        transform: function (a) {
          return !(null === a || "undefined" === typeof a);
        },
      },
    };
  "loading" !== document.readyState
    ? c()
    : document.addEventListener("DOMContentLoaded", c());
})();
(function () {
  var a = window.jQuery;
  a(document).ready(function () {
    a(".animate").mouseenter(function () {
      a(this).addClass("hover");
      a(".hover").velocity(
        { translateZ: 0, scale: 1.15 },
        { duration: 150, easing: "easeInSine" }
      );
    });
    a(".animate").mouseleave(function () {
      a(".hover").velocity("stop");
      a(".hover").velocity(
        { translateZ: 0, scale: 1 },
        { duration: 150, easing: "easeOutSine" }
      );
      a(this).removeClass("hover");
    });
    a.Velocity.RegisterEffect("transition.perspectiveLeftIn", {
      defaultDuration: 950,
      calls: [
        [
          {
            opacity: [1, 1],
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
    });
    a.Velocity.RegisterEffect("transition.perspectiveLeftOut", {
      defaultDuration: 950,
      calls: [
        [
          {
            opacity: [1, 1],
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
    });
  });
})();
$(document).ready(function (a) {
  $(".has-third-level").hover(
    function () {
      $(this).find(".third-level").show();
      //$(".third-level").show();
    },
    function () {
      $(this).find(".third-level").hide();
    }
  ); 
  function b() {
    a(".selected-subtree.instant").removeClass("instant");
    a(".navigation-list-subtree.opening").removeClass("opening");
    var b = a(".navigation-list"),
      c = a(".selected-subtree");
    a(c).addClass("closing");
    setTimeout(function () {
      a(b).removeClass("show-subtree");
      a(c).removeClass("selected-subtree");
      a(c).removeClass("closing");
      a(c).attr("aria-expanded", !1);
    }, 200);
    g(c);
  }
  function c(b) {
    var d = a(b);
    clearTimeout(l);
    a(".selected-subtree.instant").removeClass("instant");
    if (!d.hasClass("selected-subtree")) {
      a(d).attr("aria-expanded", !0);
      var e = a(".navigation-list"),
        g = 0 != a(".main-menu-list-item.opening").length;
      e.hasClass("show-subtree") && !g
        ? (a(".selected-subtree")
            .removeClass("selected-subtree")
            .attr("aria-expanded", "false"),
          d.addClass("instant"),
          d.addClass("selected-subtree"),
          f(d))
        : g
        ? (l = setTimeout(function () {
            c(b);
          }, 100))
        : (a(".selected-subtree")
            .removeClass("selected-subtree")
            .attr("aria-expanded", "false"),
          e.addClass("show-subtree"),
          d.addClass("opening"),
          setTimeout(function () {
            a(d).addClass("selected-subtree");
          }, 50),
          setTimeout(function () {
            d.removeClass("opening");
          }, 200),
          f(d));
    }
  }
  function d(b) {
    var c = a(".navigation-list"),
      d = a(b).parent().parent();
    a(".selected-subtree.instant").removeClass("instant");
    a(b).hasClass("navigation-list-back") &&
      ((c = a(".navigation-list")),
      (d = a(b).parent().parent().parent().parent()));
    a(c).hasClass("show-subtree") && a(d).hasClass("selected-subtree")
      ? (a(d).addClass("closing"),
        setTimeout(function () {
          a(c).removeClass("show-subtree");
          a(d).removeClass("selected-subtree");
          a(d).removeClass("closing");
          a(d).attr("aria-expanded", !1);
        }, 200),
        g(d))
      : a(c).hasClass("show-subtree") && !a(d).hasClass("selected-subtree")
      ? (a(".selected-subtree")
          .removeClass("selected-subtree")
          .attr("aria-expanded", "false"),
        a(d).addClass("instant"),
        a(d).addClass("selected-subtree"),
        a(d).attr("aria-expanded", !0),
        f(d),
        a(".navigation-list").animate(
          { scrollTop: a(".selected-subtree").offset().top - 80 },
          1e3
        ))
      : (a(".selected-subtree").removeClass("selected-subtree"),
        a(c).addClass("show-subtree"),
        a(d).addClass("selected-subtree").attr("aria-expanded", !0),
        f(d));
  }
  function f(b) {
    b = a(b).find(".navigation-list-arrow button");
    if (null != b) {
      var c = b.data("label");
      b.attr("aria-label", c + " submenu open");
    }
  }
  function g(b) {
    b = a(b).find(".navigation-list-arrow button");
    if (null != b) {
      var c = b.data("label");
      b.attr("aria-label", c + " submenu closed");
    }
  }
  a(".menu-button").click(function () {
    a("body").hasClass("show-menu")
      ? (a("body").removeClass("show-menu"),
        a(".navigation-list").velocity("transition.fadeOut"),
        a(".navigation-list \x3e li").velocity("transition.slideLeftOut", {
          complete: function () {
            a(".navigation-list, .navigation-list \x3e li").removeAttr("style");
          },
        }))
      : (a("body").addClass("show-menu"),
        a("#scroll-to-top").hide(),
        a(".navigation-list").velocity("transition.fadeIn"),
        a(".navigation-list \x3e li").velocity("transition.slideLeftIn", {
          duration: 500,
          stagger: 30,
          drag: !0,
          display: "block",
          complete: function () {
            a(".navigation-list \x3e li").removeAttr("style");
          },
        }));
  });
  a(".main-menu-list-item").click(function (b) {
    1200 > window.innerWidth &&
      !(
        1 !=
          a(b.target)
            .closest(".main-menu-list-item")
            .find(".navigation-list-subtree").length ||
        b.target.className.includes("navigation-list-link sublink") ||
        b.target.parentElement.className.includes(
          "navigation-list-link sublink"
        ) ||
        b.target.className.includes("arrow-sectionpage-container") ||
        b.target.className.includes("arrow-sectionpage-link")
      ) &&
      (b.preventDefault(),
      b.stopPropagation(),
      d(a(this).find(".navigation-list-arrow")));
  });
  a(".expand-menu-button").click(function () {
    a(".main-navigation").hasClass("expand-menu") ||
    a("expand-menu-button").hasClass("active")
      ? (a(".main-navigation").removeClass("expand-menu"),
        a(".expand-menu-button").removeClass("active"))
      : (a(".main-navigation").addClass("expand-menu"),
        a(".expand-menu-button").addClass("active"));
  });
  a(".navigation-list-arrow").click(function () {
    d(this);
  });
  a(".content").click(function () {
    b();
  });
  var l;
  a(".navigation-list \x3e li \x3e .navigation-list-item").click(function () {
    var b = a(this).parent().hasClass("selected-subtree");
    if (!(1199 < a(window).width())) {
      var c = a(this).siblings(".navigation-list-subtree").children("li");
      c.velocity("stop");
      b
        ? c.velocity("transition.slideLeftOut", {
            duration: 300,
            stagger: 0,
            drag: !0,
            display: "block",
          })
        : c.velocity("transition.slideLeftIn", {
            duration: 500,
            stagger: 30,
            drag: !0,
            display: "block",
          });
    }
  });
  var k, e;
  a(".main-menu-list-item").hover(
    function (b) {
      if (
        0 < a(this).children("ul").length &&
        "mouse" === whatInput.ask() &&
        1199 < a(window).width()
      )
        if (
          (clearTimeout(k),
          (0 === a(".navigation-list.show-subtree").length ||
            3 > b.originalEvent.movementX) &&
            b.originalEvent.movementX)
        )
          c(this), clearTimeout(e);
        else {
          var d = this;
          clearTimeout(e);
          e = setTimeout(function () {
            c(d);
          }, 200);
        }
    },
    function (c) {
      1199 < a(window).width() && (clearTimeout(k), (k = setTimeout(b, 100)));
    }
  );
  a(window).resize(function () {
    a(".main-navigation").hasClass("expand-menu") &&
      a(".main-navigation, .navigation-list").removeAttr("style");
  });
});
jQuery(document).ready(function (a) {
  ModalModule.initialize();
});
var ModalModule = (function () {
  return {
    initialize: function () {
      function a() {
        $(".mfp-close").on("click touch", function () {
          $.magnificPopup.close();
        });
      }
      function b() {
        $(".mfp-content").click(function (a) {
          "mfp-close" != a.target.className && a.stopPropagation();
        });
      }
      var c = function () {
        var a = $(".mfp-bg");
        a && a.remove();
        (a = $(".mfp-wrap")) && a.remove();
      };
      $(".inverse-panel").magnificPopup({
        type: "ajax",
        closeOnContentClick: !1,
        closeMarkup:
          '\x3cbutton title\x3d\'%title%\' type\x3d"button" class\x3d"mfp-close si si-close-button" \x3e\n\x3c/button\x3e',
        closeOnBgClick: !0,
        disableOn: 1200,
        removalDelay: 300,
        mainClass: "mfp-slide",
        callbacks: {
          beforeOpen: function () {
            this.st.el.attr("aria-expanded", "true");
            c();
          },
          open: function () {
            b();
          },
          close: function () {
            window.location.hash = "";
            this.st.el.attr("aria-expanded", "false");
          },
          afterClose: function () {
            this.st.el.siblings(".button-focus-catcher").focus();
          },
          parseAjax: function (a) {
            a.data = $(a.data).find(".content.panel-content");
          },
          ajaxContentAdded: function () {
            var b = this.currItem.src;
            -1 < b.indexOf("#") &&
              (window.location.hash = "#" + b.split("#")[1]);
            a();
            $(".mfp-close").focus();
            MagnificPopupModule.scaleCloseButton();
            window.numberAnimation(".mfp-slide");
            window.initVisualList(".mfp-content");
            window.initLazy();
          },
        },
      });
      $(".panel").magnificPopup({
        type: "ajax",
        closeOnContentClick: !1,
        closeMarkup:
          '\x3cbutton title\x3d\'%title%\' type\x3d"button" class\x3d"mfp-close si si-close-button" \x3e\n\x3c/button\x3e',
        closeOnBgClick: !0,
        disableOn: 1200,
        removalDelay: 300,
        mainClass: "mfp-slide",
        callbacks: {
          beforeOpen: function () {
            this.st.el.attr("aria-expanded", "true");
            c();
          },
          open: function () {
            b();
          },
          close: function () {
            window.location.hash = "";
            this.st.el.attr("aria-expanded", "false");
          },
          afterClose: function () {
            this.st.el.siblings(".button-focus-catcher").focus();
          },
          parseAjax: function (a) {
            a.data = $(a.data).find(".content.panel-content");
          },
          ajaxContentAdded: function () {
            var b = this.currItem.src;
            -1 < b.indexOf("#") &&
              (window.location.hash = "#" + b.split("#")[1]);
            FoundationModule.initialize();
            ServiceNowModule.initialize();
            MailingListModule.initialize();
            SlickCarousel.initialize();
            storageRequestDatePickerInit();
            showHideCareerFairHelperText();
            AOS.init({ disable: !0 });
            "undefined" != typeof Cookiebot && Cookiebot.runScripts();
            $(".progress-button").progressInitialize();
            a();
            $(".mfp-close").focus();
            MagnificPopupModule.scaleCloseButton();
            onloadCallback();
            window.numberAnimation(".mfp-slide");
            window.initLazy();
            window.initVisualList(".mfp-content");
          },
        },
      });
    },
  };
})();
function toggleOverlay() {
  function a() {
    $("body").addClass("overlay");
    $(".page-overlay").css("display", "block");
    $(".page-overlay").animate({ opacity: 0.6 }, 500, function () {});
  }
  function b() {
    $("body").addClass("overlay-out");
    $(".page-overlay").animate({ opacity: 0 }, 500, function () {
      $(".page-overlay").css("display", "none");
    });
  }
  $("body").hasClass("overlay")
    ? ($("body").removeClass("overlay"), b())
    : ($("body").hasClass("overlay-out") &&
        $("body").removeClass("overlay-out"),
      a());
}
var SlickCarousel = (function () {
  var a = window.jQuery;
  return {
    initialize: function () {
      a(".slideshow").each(function () {
        var b = a(this).data("duration") || 7e3;
        a(this).not(".slick-initialized").slick({
          infinite: !1,
          dots: !0,
          autoplay: !0,
          autoplaySpeed: b,
          rows: 0,
          prevArrow: !1,
          nextArrow: !1,
        });
        a(this)
          .find(".slick-slide")
          .each(function () {
            var b = 0,
              d = 0,
              f = 0;
            a(this).on("mousedown touchstart", function (a) {
              b = new Date().getTime();
              d = a.screenX;
              f = a.screenY;
            });
            a(this).on("mouseup touchend", function (c) {
              if (0 == c.originalEvent.button) {
                var g = new Date().getTime() - b,
                  k = Math.abs(c.screenX - d);
                c = Math.abs(c.screenY - f);
                500 > g &&
                  50 > k &&
                  50 > c &&
                  (g = a(this).find("a").attr("href")) &&
                  (window.location.href = g);
              }
            });
          });
      });
    },
  };
})();
(function () {
  function a(a) {
    var b = e("#global-search #" + a + " .results").children("article").length,
      c = e("#global-search #" + a + " .hits"),
      d = e("#search-language").data("emptysearch");
    0 === b
      ? (e("#global-search #" + a + " .result").remove(),
        e("#global-search #" + a + " .results").append(
          '\x3cdiv class\x3d"no-result"\x3e' + d + "\x3c/div\x3e"
        ),
        c.siblings(".show-all").addClass("few-results"),
        c.parent().addClass("no-results"))
      : (c.parent().removeClass("no-results"),
        0 === e("#global-search #" + a + " .result").length &&
          e("#global-search #" + a + " h2").append(
            '\x3cspan class\x3d"result"\x3e\x3c/span\x3e'
          ),
        e("#global-search #" + a + " .result").html(b),
        c.data("count", b),
        3 < b
          ? (c.siblings(".show-all").removeClass("few-results"),
            e("#global-search #" + a + " .results").hasClass("show-all")
              ? c.html(c.data("pattern").replace("{}", b).replace("{}", b))
              : c.html(c.data("pattern").replace("{}", 3).replace("{}", b)))
          : (c.siblings(".show-all").addClass("few-results"),
            c.html(c.data("pattern").replace("{}", b).replace("{}", b))));
  }
  function b(a) {
    var b =
      '\x3carticle class\x3d"site"\x3e\x3ca href\x3d"' +
      a.path +
      '.html"\x3e\x3cheader\x3e';
    a.thumbnail &&
      (b +=
        '\x3cimg src\x3d"' +
        a.thumbnail +
        '.transform/search/image.jpg" alt\x3d"' +
        a.alt +
        '"\x3e');
    return (b +=
      "\x3ch3\x3e" +
      a.title +
      "\x3c/h3\x3e\x3c/header\x3e" +
      a.description +
      "\x3c/a\x3e\x3c/artile\x3e");
  }
  function c(a) {
    return (
      '\x3carticle class\x3d"article"\x3e\x3ca href\x3d"' +
      a.path +
      '.html"\x3e\x3cdiv class\x3d"date"\x3e' +
      a.date +
      "\x3c/div\x3e\x3ch3\x3e" +
      a.title +
      "\x3c/h3\x3e\x3c/a\x3e\x3c/article\x3e"
    );
  }
  function d(b, c, d, g) {
    if (c && c.results) {
      var p = c.results;
      c.hasMoreResults
        ? e("#global-search #" + b + " .loadmore").addClass("show")
        : e("#global-search #" + b + " .loadmore").removeClass("show");
      if (
        0 != p.length ||
        0 == e("#global-search #" + b).find(".no-result").length
      )
        g || e("#global-search #" + b + " .results").html(""),
          e.each(p, function (a, c) {
            e("#global-search #" + b + " .results").append(d(c));
          }),
          a(b);
    }
  }
  function f(a) {
    a = e("#" + a + " .hits").data("count");
    return e.isNumeric(a) ? a : 0;
  }
  function g(a, g, l) {
    e("#global-search").addClass("show-results");
    g ||
      (e(".show-all.few-results").removeClass("few-results"),
      e(".column .hits").html(""),
      e(".column .hits").data("count", 0),
      e(".search-field-results").html(e(".no-result").first().html()));
    "" != a && e(".loading-indicator").css("display", "inline-block");
    var k =
      "/content/statoil/searchEngine.html?" +
      (e("body").hasClass("author") ? "wcmmode\x3ddisabled\x26" : "") +
      "language\x3d" +
      e("#search-language").val() +
      "\x26query\x3d" +
      encodeURIComponent(a);
    g && (k = k + "\x26offset\x3d" + g);
    l && (k = k + "\x26searchType\x3d" + l);
    q = a;
    e.getJSON(k, function (a) {
      d("site", a.site, b, null != g);
      d("news", a.news, c, null != g);
      a = f("site") + f("news");
      0 < a
        ? e(".search-field-results").html(
            e(".search-field-results").data("pattern").replace("{}", a)
          )
        : e(".search-field-results").html(e(".no-result").first().html());
      e(".loading-indicator").css("display", "none");
    }).fail(function () {
      d("site", { results: [] }, b);
      d("news", { results: [] }, c);
      e(".search-field-results").html(e(".no-result").first().html());
      e(".loading-indicator").css("display", "none");
    });
  }
  function l() {
    e(".show-all").click(function () {
      var a = e(this).parent().siblings(".results-container");
      a.toggleClass("show-all");
      e(this).toggleClass("active");
      var b = e(this).siblings(".hits");
      a.hasClass("show-all")
        ? b.html(
            b
              .data("pattern")
              .replace("{}", b.data("count"))
              .replace("{}", b.data("count"))
          )
        : b.html(
            b.data("pattern").replace("{}", 3).replace("{}", b.data("count"))
          );
    });
  }
  function k() {
    e("#search-field").keypress(function (a) {
      13 == a.which &&
        ((a =
          "/content/statoil/search.html?language\x3d" +
          e("#search-language").val() +
          "\x26q\x3d" +
          e("#search-field").val().replace(/'/g, "\\'")),
        window.location.replace(a),
        e("#search-field").blur(),
        e("#global-search").addClass("show-results"));
    });
    e("#global-search .column").each(function () {
      var a = this.id,
        b = e(this),
        c = b.find(".search-meta .show-all");
      b.find(".loadmore").click(function () {
        var d = b.find(".results").children().length;
        g(q, d, a);
        d = b.find(".results article");
        d[d.length - 1].querySelector("a").focus();
        c.hasClass("active") || c.click();
      });
    });
    e("#search-field").focus(function () {
      e("#global-search").removeClass("show-results");
    });
    l();
  }
  var e = window.jQuery,
    q = "";
  e(window).on("load", function () {
    var a = e("#search-field");
    k();
    var b = a.val();
    if ("undefined" !== typeof b) {
      var c = b.length;
      a.focus();
      a[0].setSelectionRange(c, c);
      g(b.replace(/'/g, "\\'"));
    }
  });
})();
$(document).ready(function (a) {
  var b = a(".banner-video svg"),
    c = a(".banner-video video");
  c.on("play", function () {
    b.fadeOut();
  });
  c.on("pause", function () {
    b.fadeIn();
  });
  b.on("click", function () {
    c[0].play();
  });
  c.attr("controls") ||
    c.click(function () {
      this.paused ? this.play() : this.pause();
    });
  c.attr("autoplay") || b.show();
});
(function () {
  var a = window.jQuery;
  a(document).ready(function () {
    var b = a(".filterable"),
      c = a(".filter");
    c.bind("click", function (d) {
      a(this).toggleClass("active");
      var f = "";
      c.each(function (b) {
        b = c[b];
        -1 < a(b).attr("class").indexOf("active") &&
          ((b = a(b).data("group")), (f += b + ","));
      });
      f = f.substring(0, f.length - 1);
      b.each(function (c) {
        c = b[c];
        a(c).css("display", "block");
        var d = a(c).data("groups");
        null != d && 0 <= f.indexOf(d)
          ? a(c).css("display", "block")
          : a(c).css("display", "none");
      });
    });
  });
});
(function () {
  var a = {
    getCookie: function (a) {
      a += "\x3d";
      for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
        for (var f = b[d]; " " == f.charAt(0); ) f = f.substring(1);
        if (0 == f.indexOf(a)) return f.substring(a.length, f.length);
      }
      return "";
    },
  };
  jQuery(document).ready(function (b) {
    b(".cookie-alert .cookie-close").click(function () {
      var a = new Date();
      a.setTime(a.getTime() + 31536e6);
      a = a.toGMTString();
      document.cookie =
        "cookiealert\x3dhide; expires\x3d" +
        a +
        "; path\x3d/;samesite\x3dlax;secure";
      b(".cookie-alert").slideUp(500, function () {
        b(".cookie-alert").remove();
      });
      return !1;
    });
    "hide" !== a.getCookie("cookiealert") &&
      b(".cookie-alert").css("display", "flex");
  });
})();
(function () {
  function a(a) {
    return $(a).closest("div.list-container").attr("id");
  }
  function b(a) {
    $("#" + a).addClass("loading");
    var b = $("#" + a).find("ul.list-container li");
    b[b.length - 1].querySelector("a").focus();
    $.ajax({
      url: c(a, !0),
      success: function (b) {
        var c = $(b).find("ul.list-container li");
        $("#" + a + " ul.list-container")
          .append(c)
          .trigger("updateList");
        0 != $(b).find(".more-results").length &&
          $("#" + a + " .more-results-btn").removeAttr("disabled");
        e(a);
        $("#" + a).removeClass("loading");
        window.initLazy();
        ModalModule.initialize();
      },
    });
  }
  function c(a, b) {
    var c = 0;
    b && (c = $("#" + a + " .list-item").length);
    b = $("#" + a).data("nodepath") + ".html?offset\x3d" + c;
    (c = $("#" + a + " .queried").data("query")) && 0 != c.length
      ? (f(a, c), (c = "\x26query\x3d" + encodeURIComponent(c)))
      : (c = void 0);
    c && (b += c);
    c = $("#" + a + " .list-year-filter").val();
    c = $.isNumeric(c) ? "\x26year\x3d" + c : void 0;
    c && (b += c);
    a =
      "title" == $("#" + a + " .list-sort-option").val()
        ? "\x26sort\x3dtitle"
        : void 0;
    a && (b += a);
    return b;
  }
  function d(a, b) {
    $("#" + a).addClass("loading");
    $.ajax({
      url: c(a, !1),
      success: function (b) {
        $("#" + a + " ul.list-container").html(
          $(b).find("ul.list-container li")
        );
        0 == $(b).find(".more-results").length
          ? $("#" + a + " .more-results-btn").attr("disabled", !0)
          : $("#" + a + " .more-results-btn").removeAttr("disabled");
        e(a);
        $("#" + a).removeClass("loading");
        ModalModule.initialize();
      },
    });
  }
  function f(a, b) {
    a = $("#" + a + " .queried");
    b && 0 != b.length
      ? (a.data("query", b), a.text(a.data("template").replace("{}", b)))
      : (a.text(""), a.data("query", ""));
  }
  function g(a) {
    var b = [];
    $("#" + a + " .tags-filter .tag-filter").each(function (a, c) {
      b.push($(c).data("tag"));
    });
    return b;
  }
  function l(a) {
    $("#" + a + " .tag-filter .tag-filter-count").data("count", 0);
    $("#" + a + " .tag-filter .tag-filter-count").html(0);
    $("#" + a + " ul.list-container li:not(.hidden-item)").each(function (
      b,
      c
    ) {
      b = k(c);
      for (c = 0; c < b.length; c++) {
        var d = $(
            "#" +
              a +
              " .tag-filter[data-tag\x3d'" +
              b[c] +
              "'] .tag-filter-count"
          ),
          e = d.data("count");
        e += 1;
        d.data("count", e);
        d.html(e.toString());
      }
    });
  }
  function k(a) {
    return (a = $(a).data("tags")) ? a.split(";") : [];
  }
  function e(b) {
    if (0 < $("#" + b + " .tags-filter").length) {
      var c = g(b),
        d = [];
      $("#" + b + " ul.list-container li").each(function (e, g) {
        e = k(g);
        for (g = 0; g < e.length; g++) {
          var h = e[g];
          d.push(h);
          0 > c.indexOf(h) &&
            ($("#" + b + " .tags-filter").append(
              '\x3cbutton class\x3d"tag-filter btn medium tools-inverted narrow tag inrow" data-tag\x3d"' +
                h +
                '"\x3e' +
                h +
                '\x3cspan class\x3d"tag-filter-count"\x3e\x3c/span\x3e\x3c/button\x3e'
            ),
            $("#" + b + " .tag-filter[data-tag\x3d'" + h + "']").click(
              function () {
                $(this).toggleClass("is-active");
                q(a(this));
              }
            ),
            c.push(h));
        }
      });
      for (var e = 0; e < c.length; e++)
        -1 == d.indexOf(c[e]) &&
          $("#" + b + " .tag-filter[data-tag\x3d'" + c[e] + "']").remove();
      q(b);
    }
  }
  function q(a) {
    var b = u(a);
    w(a, b);
    m(a);
    1 == n() && l(a);
  }
  function w(a, b) {
    $("#" + a + " ul.list-container li.list-item").each(function (a, c) {
      a = !1;
      var d = k(c);
      if (0 == d.length && 0 < b.length) a = !0;
      else for (var e = 0; e < b.length; e++) -1 == d.indexOf(b[e]) && (a = !0);
      a ? $(c).addClass("hidden-item") : $(c).removeClass("hidden-item");
    });
  }
  function m(a) {
    a = Array.from($("#" + a + " ul.list-container li.list-item"));
    var b = $(".more-results-btn"),
      c = $(".no-result-container"),
      d = 0;
    a.forEach(function (a) {
      a.classList.contains("hidden-item") && d++;
    });
    d === a.length
      ? (b.prop("disabled", !0), c.css("display", "block"))
      : (b.prop("disabled", !1), c.css("display", "none"));
  }
  function u(a) {
    var b = [];
    $("#" + a + " .tag-filter.is-active").each(function (a, c) {
      b.push($(c).data("tag"));
    });
    return b;
  }
  function n() {
    return $(".news-list-container")
      .find(".tags-filter")
      .data("is-tag-count-enabled");
  }
  $(document).ready(function () {
    $(".sort-options-container .custom-dropdown .custom-dropdown-items").prop(
      "selectedIndex",
      0
    );
    $(".list-search-container .search").val("");
    1 == n() &&
      $("ul.list-container").each(function (b, c) {
        l(a(c));
      });
    $(".more-results-btn").click(function () {
      "disabled" != $(this).attr("disabled") &&
        $(this).attr("disabled", "disabled");
      b(a(this));
    });
    $(".list-search-container .search").keypress(function (b) {
      13 == b.which && ((b = a(this)), f(b, $(this).val()), d(b));
    });
    $(".list-search-container .search").on("search", function (b) {
      "" === $(this).val() && ((b = a(this)), f(b, $(this).val()), d(b));
    });
    $(".list-year-filter").change(function () {
      d(a(this));
    });
    $(".list-sort-option").change(function () {
      d(a(this));
    });
    $(".tag-filter").click(function (b) {
      0 != b.clientX &&
        0 != b.clientY &&
        $(this).find(".button-focus-catcher").get(0).focus();
      $(this).toggleClass("is-active");
      q(a(this));
    });
  });
})();
$(document).ready(function (a) {
  a(".progress-button").progressInitialize();
});
(function (a) {
  a.fn.progressInitialize = function () {
    return this.each(function () {
      function b(a) {
        g.filter(".background-horizontal,.background-bar").width(a + "%");
        g.filter(".background-vertical").height(a + "%");
      }
      var c = a(this),
        d = 0,
        f = a.extend(
          { type: "background-horizontal", loading: "Loading.." },
          c.data()
        );
      c.attr({ "data-loading": f.loading });
      var g = a('\x3cspan class\x3d"loading-bar ' + f.type + '"\x3e').appendTo(
        c
      );
      c.on("progress", function (a, f, e, q) {
        c.hasClass("in-progress") ||
          (g.show(),
          (d = 0),
          c.removeClass("finished").addClass("in-progress"));
        d = e ? f : d + f;
        100 <= d && (d = 100);
        q &&
          (c.removeClass("in-progress").addClass("finished"),
          g.delay(500).fadeOut(function () {
            c.trigger("progress-finish");
            b(0);
          }));
        b(d);
      });
    });
  };
  a.fn.progressStart = function () {
    var a = this.first(),
      c = new Date().getTime();
    if (a.hasClass("in-progress")) return this;
    a.on("progress", function () {
      c = new Date().getTime();
    });
    var d = window.setInterval(function () {
      new Date().getTime() > 2e3 + c && a.progressIncrement(5);
    }, 500);
    a.on("progress-finish", function () {
      window.clearInterval(d);
    });
    return a.progressIncrement(10);
  };
  a.fn.progressFinish = function () {
    return this.first().progressSet(100);
  };
  a.fn.progressIncrement = function (a) {
    a = a || 10;
    this.first().trigger("progress", [a]);
    return this;
  };
  a.fn.progressSet = function (a) {
    a = a || 10;
    var b = !1;
    100 <= a && (b = !0);
    return this.first().trigger("progress", [a, !0, b]);
  };
  a.fn.progressTimed = function (b, c) {
    var d = this.first(),
      f = d.find(".loading-bar");
    if (d.is(".in-progress")) return this;
    f.css("transition", b + "s linear");
    d.progressSet(99);
    window.setTimeout(function () {
      f.css("transition", "");
      d.progressFinish();
      a.isFunction(c) && c();
    }, 1e3 * b);
  };
})(jQuery);
(function () {
  function a(a) {
    a instanceof jQuery || (a = c(a));
    if (!a.hasClass("start")) {
      a.addClass("start");
      var b = a.attr("id"),
        d = a.data("number");
      a = -1 < (d + "").indexOf("%") ? "%" : "";
      "" != a && (d = d.replace(a, ""));
      var e = d;
      e =
        -1 < (e + "").indexOf(",")
          ? ","
          : -1 < (e + "").indexOf(".")
          ? "."
          : -1 < (e + "").indexOf(" ")
          ? " "
          : -1 < (e + "").indexOf("-")
          ? "-"
          : "";
      -1 < (d + "").indexOf(",") && (d = (d + "").replace(",", "."));
      -1 < (d + "").indexOf(" ") && (d = (d + "").replace(" ", "."));
      -1 < (d + "").indexOf("-") && (d = (d + "").replace("-", "."));
      var f = parseFloat(d);
      f = (Math.abs(f) + "").split(".")[1];
      new CountUp(b, 0, d, null == f ? 0 : f.length, 2.5, {
        useEasing: !0,
        useGrouping: !0,
        separator: "",
        decimal: e,
        prefix: "",
        suffix: a,
      }).start();
    }
  }
  function b(a) {
    "function" === typeof jQuery && a instanceof jQuery && (a = a[0]);
    a = a.getBoundingClientRect();
    return (
      0 <= a.top &&
      0 <= a.left &&
      a.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      a.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  var c = window.jQuery,
    d;
  c(window).scroll(function () {
    d && (clearTimeout(d), (d = null));
    d = setTimeout(f, 250);
  });
  c(window).on("load", function () {
    f();
  });
  var f = function (d) {
    (d ? c(d).find(".number") : c(".number")).each(function () {
      var f = c(this);
      f.hasClass("countup")
        ? b(this)
          ? a(this)
          : d &&
            ((f = this),
            setTimeout(function () {
              a(f);
            }, 400))
        : f.text(f.data("number"));
    });
  };
  window.numberAnimation = f;
})();
var MagnificPopupModule = (function () {
  var a = window.jQuery;
  return {
    scaleCloseButton: function () {
      a(".mfp-close").mouseenter(function () {
        a(".mfp-close").addClass("hover");
        a(".hover").velocity(
          { scale: 1.15 },
          { duration: 150, easing: "easeInSine" }
        );
      });
      a(".mfp-close").mouseleave(function () {
        a(".hover").velocity("stop");
        a(".hover").velocity(
          { scale: 1 },
          { duration: 150, easing: "easeOutSine" }
        );
        a(".mfp-close").removeClass("hover");
      });
    },
  };
})();

$(document).ready(function (a) {
  var b;
  a(window).scroll(function () {
    b && window.clearTimeout(b);
    b = window.setTimeout(function () {
      100 < a(this).scrollTop()
        ? a("#scroll-to-top").fadeIn(350)
        : a("#scroll-to-top").fadeOut(350);
    }, 200);
  });
  a("#scroll-to-top").click(function () {
    a("#scroll-to-top").fadeOut(350);
    a("html, body").velocity("scroll", { duration: 800 });
    return !1;
  });
});

$(document).ready(function (a) {
  a = a("body");
  var b = navigator.userAgent;
  -1 < b.indexOf("MSIE") || -1 < b.indexOf("Trident/")
    ? a.addClass("ie")
    : -1 < b.indexOf("Edge/")
    ? a.addClass("edge")
    : -1 < b.indexOf("Firefox/")
    ? a.addClass("ff")
    : -1 < b.indexOf("Chrome/") && a.addClass("chrome");
});
(function () {
  var a = window.jQuery;
  a(".remit-table").length &&
    a(function () {
      a.ajax({
        datatype: "json",
        type: "get",
        url: location.protocol + "//" + location.host + "/services/remit",
      })
        .done(function (b) {
          var c = a("#remit-item-template").html();
          b.Data.List = b.Data.List.map(function (a) {
            a.CurrentMessage.IsUpdated = 1 < a.CurrentMessage.Version;
            return a;
          });
          var d = b.Data.List.filter(function (a) {
            return a.CurrentMessage.IsPlannedEvent;
          });
          d = Mustache.render(c, d);
          a("#planned-events \x3e .remit-table").append(d);
          b = b.Data.List.filter(function (a) {
            return !a.CurrentMessage.IsPlannedEvent;
          });
          c = Mustache.render(c, b);
          a("#unplanned-events \x3e .remit-table").append(c);
          a(".accordion-title").click(function () {
            var b =
              "View history" == a(this).text()
                ? "Hide history"
                : "View history";
            a(this).text(b);
          });
          FoundationModule.initialize();
        })
        .fail(function (a, c, d) {});
    });
})();
var InPageNavigationModule = (function () {
  var a = window.jQuery,
    b = "";
  return {
    initialize: function () {
      function c() {
        l = [];
        a(f).each(function () {
          l.push(a(this).offset().top);
        });
        k = 0.5 * window.innerHeight;
      }
      var d = document.createElement("ul");
      a("#in-page-nav").append(d);
      var f = a("div.anchor-container \x3e a");
      a.each(f, function () {
        var b = a(this).attr("id"),
          c = a(this).data("label"),
          f = document.createElement("li");
        d.appendChild(f);
        var g = document.createElement("a");
        g.setAttribute("aria-label", c);
        g.setAttribute("class", "dot-nav");
        g.setAttribute("href", "#" + b);
        f.appendChild(g);
        b = document.createElement("span");
        b.setAttribute("class", "label");
        b.innerHTML = c;
        g.appendChild(b);
        c = document.createElement("span");
        c.setAttribute("class", "dot");
        g.appendChild(c);
      });
      a(".dot-nav").click(function (b) {
        b.preventDefault();
        var c = a(this).attr("href");
        a(c).velocity("scroll", {
          duration: 800,
          easing: "ease-in-out",
          complete: function () {
            window.location.hash = c;
            a("#in-page-nav ul li").removeClass("active");
            a(this.parent).addClass("active");
          },
        });
        return !1;
      });
      var g,
        l = [],
        k = 0;
      a(document).on("load", c);
      a(window).resize(c);
      c();
      a(document).scroll(function () {
        g && window.clearTimeout(g);
        g = window.setTimeout(function () {
          for (
            var c = a(document).scrollTop() + k, d, f = 0;
            f < l.length && !(c < l[f]);
            f++
          )
            d = f;
          a("#in-page-nav ul li").removeClass("active");
          a("#in-page-nav ul li:eq(" + d + ")").addClass("active");
          c = a("#in-page-nav ul li.active a").attr("href");
          "undefined" !== typeof c && 0 < a(window).scrollTop()
            ? b !== c &&
              ((b = c),
              window.history.replaceState
                ? window.history.replaceState(null, null, c)
                : (window.location.hash = c))
            : (a("#in-page-nav ul li").removeClass("active"),
              (b = ""),
              window.history.replaceState
                ? window.history.replaceState("", "/", window.location.pathname)
                : (window.location.hash = ""));
        }, 100);
      });
    },
  };
})();
$(function () {
  function a() {
    $(".horisontalbar").each(function () {
      var a = $(this),
        c = a.find("li:not(.dommy)"),
        d = this.dummy
          ? this.dummy
          : (this.dummy = $('\x3cli class\x3d"dommy"\x3e\x3c/li\x3e')),
        f = Math.floor(a.width() / $(c[0]).width());
      c.length > f
        ? (a.removeClass("singleline"),
          (a = c.length % f),
          0 !== a && f % 2 !== a % 2 ? c.parent().append(d) : d.remove())
        : a.addClass("singleline");
    });
  }
  $(window).resize(a);
  a();
});
(function () {
  var a = window.jQuery;
  a(function () {
    var b = a(".calendar-item");
    0 < b.length &&
      a.each(b, function (b, d) {
        b = a(d).find(".time");
        if (!0 !== a(b).data("timeNotSpecified")) {
          d = a(b).data("startDateTime");
          var c = a(b).data("endDateTime");
          c = new Date(c);
          d = moment(new Date(d)).format("HH:mm");
          c = moment(c).format("HH:mm");
          var g = moment.tz(moment.tz.guess()).zoneAbbr();
          d = d + " - " + c + " " + g;
          a(b.children(".event-start-end-time")[0]).text(d);
        }
      });
  });
})();
