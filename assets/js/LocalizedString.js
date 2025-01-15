var localizedStrings = {
  En: {
    //Master Page
    SiteName: "Qatar Petroleum",
    SiteUrl: "/en/",
    LanguageSwitcher: "Ar",
  },
  Ar: {
    //Master Page
    SiteName: "قطر للبترول",
    SiteUrl: "/ar/",
    LanguageSwitcher: "En",
  },

  IsEnglish: function () {
    return _spPageContextInfo.currentLanguage == 1033;
  },

  GetLocalizeValue: function (Key) {
    return localizedStrings.IsEnglish()
      ? localizedStrings.En[Key]
      : localizedStrings.Ar[Key];
  },
};
