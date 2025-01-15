function makeSingleCallFun(fun) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      return fun.apply(this, arguments);
    }
  }
}
var GetLocalizedKeys = makeSingleCallFun(function () {
    $.ajax({
        type: "GET",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        url: "/_vti_bin/QPInternetService.svc/Gettranslations",
        cache: true,
        async: true,
        success: function (data) {
            localStorage.setItem("Localizations", JSON.stringify(data));
            $('#spanCookie').html(getLocalizedString('CookieMessage'));
			$('#CookieSavePreferences').html(getLocalizedString('CookieSavePreferences'));
			$('#CookieCancel').html(getLocalizedString('CookieCancel'));
			$('#CookieAcceptAll').html(getLocalizedString('CookieAcceptAll'));
			$('#CookieRejectAll').html(getLocalizedString('CookieRejectAll'));
			
			$('#CookieCustomize').html(getLocalizedString('CookieCustomize'));
			$('#customizeCookiesTitle').html(getLocalizedString('CookiePreferences'));
			$('#CookiePreferences').html(getLocalizedString('CookieConsentPreferences'));
			$('#CookieOption1').html(getLocalizedString('CookieOption1'));
			$('#CookieOption2').html(getLocalizedString('CookieOption2'));
			$('#CookieOption3').html(getLocalizedString('CookieOption3'));
			$('#CookieOption4').html(getLocalizedString('CookieOption4'));
			$('#CookieChoose').html(getLocalizedString('CookieChoose'));
        },
        error: function (xhr, textStatus, error) {
            console.log("Error GetLocalizedKeys !");
        }
    });  
});

var getLocalizedString = function (key) {
    try {
        GetLocalizedKeys();
        var dataRow = JSON.parse(localStorage.getItem("Localizations")).filter(function (item) { return item.Key === key; });
        if(! dataRow){
        	GetLocalizedKeys ();
        	dataRow = JSON.parse(localStorage.getItem("Localizations")).filter(function (item) { return item.Key === key; });
        }
        switch (_spPageContextInfo.currentLanguage) {
            case 1025:
                return dataRow[0].Arabic;
                break;
            default:
                return dataRow[0].English;
                break;
        }

    } catch (ex) {
       // globalLogger.error("getLocalizedString> " + ex.toString());
        return '';
    }
};

GetLocalizedKeys();