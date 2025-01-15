
Handlebars.registerHelper('check', function(value, comparator) {
    return (value === comparator) ? 'No content' : value;
});

Handlebars.registerHelper('if_even', function(conditional, options) {
  if((conditional % 2) == 0) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

Handlebars.registerHelper('ifCondition', function (v1, operator, v2, options) {

     switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
    
    });

Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "",
        subcontext = [],
        i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {

                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});



Handlebars.registerHelper('getLocalizedString', function(key) {
	try {
       return getLocalizedString(key);
    } catch (ex) {
        globalLogger.error("getLocalizedString> " + ex.toString());
        return '';
    }
});


Handlebars.registerHelper('dateTimeFormatterDDMMMYYYY', function(dateTime) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {

            var date = new Date(dateTime);
            var local;
            if (localizedStrings.IsEnglish()) {
                local = "en-GB";
            } else {
                local = "ar-EG";
            }

            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            //console.log(new Intl.DateTimeFormat(local,options ).format(date));     
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toLocaleDateString(local, options);
            //return date.getMonth();
        }
    } catch (ex) {
        globalLogger.error("dateTimeFormatterDDMMMYYYY> " + ex.toString());
        return dateTime;
    }
});

Handlebars.registerHelper('dateTimeFormatterLocalMonth', function(dateTime) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {
            var date = new Date(dateTime);

            var local;
            if (localizedStrings.IsEnglish()) {
                local = "en-GB";
            } else {
                local = "ar-EG";
            }
            var options = {
                month: 'short'
            };
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toLocaleDateString(local, options);
        }
    } catch (ex) {
        globalLogger.error("dateTimeFormatterLocalMonth> " + ex.toString());
        return dateTime;
    }
});

Handlebars.registerHelper('dateTimeFormatterLocalTime', function(dateTime) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {
            var date = new Date(dateTime);

            var local;
            if (localizedStrings.IsEnglish()) {
                local = "en-GB";
            } else {
                local = "ar-EG";
            }

            var options = {
                hour: 'numeric',
                minute: 'numeric'
            };
            //console.log(new Intl.DateTimeFormat(local,options ).format(date));
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toLocaleTimeString(local, options);
        }
    } catch (ex) {
        globalLogger.error("dateTimeFormatterLocalMonth> " + ex.toString());
        return dateTime;
    }
});

Handlebars.registerHelper('dateTimeFormatterLocalFullDateTime', function(dateTime) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {
            var date = new Date(dateTime);

            var local;
            if (localizedStrings.IsEnglish()) {
                local = "en-GB";
            } else {
                local = "ar-EG";
            }

            var options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour12: false
            };
            //console.log(new Intl.DateTimeFormat(local,options ).format(date));
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toLocaleTimeString(local, options);
        }
    } catch (ex) {
        globalLogger.error("dateTimeFormatterLocalFullDateTime> " + ex.toString());
        return dateTime;
    }
});


Handlebars.registerHelper('dateTimeFormatterUTC', function(dateTime, format) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {
            format = globalUtilities.ensureParameter(format, "dd-MMM-yyyy HH:mm:ss");

            var date = new Date(dateTime);
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toString(format);
        }
    } catch (ex) {
        globalLogger.error("dateTimeFormatterUTC> " + ex.toString());
        return dateTime;
    }
});
Handlebars.registerHelper('JsonDateToLocalMonth', function(dateTime) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {
            var date = new Date(dateTime);

            var local;
            if (localizedStrings.IsEnglish()) {
                local = "en-GB";
            } else {
                local = "ar-EG";
            }
            var options = {
                month: 'short'
            };
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toLocaleDateString(local, options);
        }
    } catch (ex) {
        globalLogger.error("JsonDateToLocalMonth> " + ex.toString());
        return dateTime;
    }
});
Handlebars.registerHelper('JsonDateToDay', function(dateTime) {
    try {
        if (dateTime == '' || dateTime == null || dateTime == undefined || dateTime == "undefined" || $.isPlainObject(dateTime)) {
            return '';
        } else {
            var date = new Date(dateTime);

            var local;
            if (localizedStrings.IsEnglish()) {
                local = "en-GB";
            } else {
                local = "ar-EG";
            }
            var options = {
                day: 'numeric'
            };
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
            return date.toLocaleDateString(local, options);
        }
    } catch (ex) {
        globalLogger.error("JsonDateToDay> " + ex.toString());
        return dateTime;
    }
});

Handlebars.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
});

Handlebars.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
        return options.fn(this);
    }
});

Handlebars.registerHelper('default', function(value, options) {
    debugger;
    return true; ///We can add condition if needs
});
Handlebars.registerHelper('WordTrimming', function(str, no_words) {
    try {
        if (typeof str !== 'string') return '';
        if(str.split(" ").length > no_words ){
        	return str.split(" ").splice(0, no_words).join(" ")+" ...";
        }
        else{
        	return str.split(" ").splice(0, no_words).join(" ");
        }
    } catch (ex) {
        globalLogger.error("WordTrimming> " + ex.toString());
        return dateTime;
    }
});
Handlebars.registerHelper('checklength', function(v1, v2, options) {
    'use strict';
    if (v1.length > v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
Handlebars.registerHelper('IsEnglish', function(options) {
    var fnTrue = options.fn,
        fnFalse = options.inverse;

    var lcid = _spPageContextInfo.currentLanguage;

    return lcid == 1033 ? fnTrue(this) : fnFalse(this);
});

Handlebars.registerHelper('GetLocalizedText', function(englishText, arabicText) {
    var lcid = _spPageContextInfo.currentLanguage;

    return lcid == 1033 ? englishText : arabicText;
});

Handlebars.registerHelper('localizedTextFormatter', function(englishText, arabicText, characterLimit, moreTemplate) {
    try {
        var lcid = _spPageContextInfo.currentLanguage;

        var text = lcid == 1033 ? englishText : arabicText;

        text = $('<div/>').html(text).text();

        characterLimit = globalUtilities.ensureParameter(characterLimit, 100);
        moreTemplate = globalUtilities.ensureParameter(moreTemplate, "");

        if (text != null && text != "undefined" && text != "" && text.length > characterLimit) {
            text = text.substring(0, characterLimit);
            text += moreTemplate;
        }

        return text;
    } catch (ex) {
        globalLogger.error("localizedTextFormatter > " + ex.toString());
        return text;
    }
});

Handlebars.registerHelper('GetRelativeUrl', function(url) {
    try {
        if (typeof url !== 'string') return '';
        url = url.toLowerCase();
        return url.substring(url.indexOf("/admin/"));
    } catch (ex) {
        globalLogger.error("GetRelativeUrl> " + ex.toString());
        return dateTime;
    }
});

var getItemId = function() {
    try {
        var results = new RegExp('[\?&]' + 'ItemId' + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return decodeURI(results[1]) || 0;
        }
    } catch (ex) {
        globalLogger.error("getItemId > " + ex.toString());
        return 0;
    }
}
