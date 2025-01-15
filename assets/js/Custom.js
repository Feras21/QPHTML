$( document ).ajaxComplete(function() {

  $("#breadcrumb a").attr('href','#');

 $(".carousel").carousel({
  interval: 3500,
});
});

/**$("#announcment-carousel").owlCarousel({
  rtl: localizedStrings.IsEnglish() ? false : true,
  loop: true,
  margin: 30,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: true,
    },
    600: {
      items: 2,
      nav: true,
    },
    1000: {
      items: 3,
      nav: true,
    },
  },
});**/

window.onscroll = function () {
  stickyHeader();
};

var header = document.getElementById("myHeader");
var navigationHeaderSticky = document.getElementById(
  "navigation-header-sticky"
);

var sticky = header.offsetTop;

function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    navigationHeaderSticky.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky");
    navigationHeaderSticky.classList.remove("sticky-header");
  }
}

var GeneratePaging = function (e) {
  $("#" + e.Id).paginationn({
    items: e.Total,
    itemsOnPage: e.ItemsPerPage,
    cssStyle: "light-theme",
    onPageClick: e.callBack,
    prevText: e.prevText,
    nextText: e.nextText,
  });
};

generalMethods = {
  wordTrimming: function (e, r, n) {
    $(e).each(function () {
      var e = $(this).text();
      if ("string" != typeof e) return "";
      void 0 === n && (n = "...");
      var t = e.trim().split(" ");
      if (t.length > r) {
        for (var a = t.length - 1; -1 < a; --a) r < a + 1 && (t.length = a);
        var i = (i = t.join(" ")).concat(n);
      } else i = t.join(" ");
      $(this).text(i);
    });
  },
  getQueryVariable: function (e) {
    for (
      var t = window.location.search.substring(1).split("&"), a = 0;
      a < t.length;
      a++
    ) {
      var i = t[a].split("=");
      if (i[0] == e) return i[1];
    }
    return !1;
  },
  redirectToAnotherPage: function (e) {
    window.location = _spPageContextInfo.webAbsoluteUrl + e;
  },
  showLoadingTemplate: function (e, t) {
    $(t).hide(),
      $(e).prepend(
        '<div class="loading"><img class="loading-image" alt="loading Image" src="/_layouts/15/Advancya.Components/Images/Progress.gif"></div>'
      );
  },
  hideLoadingTemplate: function (e, t) {
    $(e + " .loading").remove(), $(t).show();
  },
  CarouselInHandleBars: function (e) {
  $(e + " .carousel-item:first").addClass("active");
      $(e + " .carousel-indicators li:first").addClass("active");

    $(e + " .carousel-item:first-child").addClass("active");
      $(e + " .carousel-indicators li:first-child").addClass("active");
    var t = $(e + " .carousel-item").length;
    if (t <= 0) $(e + " .carousel-indicators").remove();
    else
      for (i = 0; i < t; i++)
        $(e + " .carousel-indicators li:eq(" + i + ")").attr("data-slide-to", i);
  },
  DefaultLanguage: function () {
    window.location.href = $("#MasterPageSwitchLangButton").attr("data-href");
  },
  LanguageSwitcher: function () {
    $("#MasterPageSwitchLangButton").text(
      localizedStrings.GetLocalizeValue("LanguageSwitcher")
    ),
      $("#MasterPageSwitchLangButton").attr(
        "aria-label",
        localizedStrings.GetLocalizeValue("LanguageSwitcherText")
      );
    var e,
      t = window.location.href.replace(new RegExp("/en/", "ig"), "/ar/"),
      a = window.location.href.replace(new RegExp("/ar/", "ig"), "/en/");
    if (localizedStrings.IsEnglish()) {
      (e = new XMLHttpRequest()).open("GET", t, !1);
      try {
        e.send(null);
      } catch (e) {
        $("#MasterPageSwitchLangButton").attr("data-href", "/ar");
      }
      200 === e.status
        ? $("#MasterPageSwitchLangButton").attr("data-href", t)
        : $("#MasterPageSwitchLangButton").attr("data-href", "/ar"),
        $("#MasterPageSwitchLangButton").attr("lang", "ar"),
        $("#MasterPageSwitchLangButton").attr("dir", "rtl");
    } else {
      (e = new XMLHttpRequest()).open("GET", a, !1);
      try {
        e.send(null);
      } catch (e) {
        $("#MasterPageSwitchLangButton").attr("data-href", "/ar");
      }
      200 === e.status
        ? $("#MasterPageSwitchLangButton").attr("data-href", a)
        : $("#MasterPageSwitchLangButton").attr("data-href", "/en"),
        $("#MasterPageSwitchLangButton").attr("lang", "en"),
        $("#MasterPageSwitchLangButton").attr("dir", "ltr");
    }
  },
};


$(document).ready(function () {
$(".copyright-end a:nth-child(2)").on("click", function() {
    $("#s4-workspace").scrollTop(0);
    return false;
});

if(!localizedStrings.IsEnglish()){
$(".logoLocalization a").attr("href","/ar");
$("#language-title").text("اللغة")
}else{
$(".logoLocalization a").attr("href","/en");

};
  $(".has-third-level").hover(
    function () {
      $(".third-level").show();
    },
    function () {
      $(".third-level").hide();
    }
  );

  if (localizedStrings.IsEnglish()) {
    $("link[href*='QP_CSS/styles_en.css']").remove();
  } else {
    $("link[href*='QP_CSS/styles_ar.css']").remove();
  }

  /*  $("#scroll-to-section").hover(
    function () {
      $(this).attr("class", "bounce bounce-running");
    },
    function () {
      $(this).attr("class", "bounce");
    }
  ); */

	
  setTimeout(function(){
	  
	  /*added by mokdad on 10-9*/
		if(document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value == "1")
		{

		$('#myHeader').remove();
		$('#bannerSlider .carousel-caption').remove();
		}
	  
	  
	  $(".scroll-down").click(function () {
	    $("html, body,#s4-workspace").animate(
	      {
	        scrollTop: $(".scroll-upto").offset().top,
	      },
	      500
	    );
	  });
	  
	 
	  $("#scroll-to-section").click(function () {
	  
	    $("html, body,#s4-workspace").animate(
	      {
	        scrollTop: $("#lng-section").offset().top - 200,
	      },
	      500
	    );
	  });
	  $("#search-desktop, .search-button").click(function () {
	    $(".search-contanier").fadeToggle();
	  });
  },2000);
  
  
  
  
  
  
});
