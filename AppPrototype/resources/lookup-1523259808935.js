(function(window, undefined) {
  var dictionary = {
    "75759fb6-b6e2-4b2d-b856-d60c300a3ef0": "add_new_work_cont",
    "450df460-dcde-443d-a00c-e0950dc9a2ef": "Registration_form",
    "4fdd4095-1a5d-4f10-8433-42afa1a95ffb": "after_registration",
    "17d94e96-bab1-4aca-b61d-cb2c44ae64dd": "admin_login",
    "d12245cc-1680-458d-89dd-4f0d7fb22724": "loginScreen",
    "16532a5a-cca7-4f43-922e-7e145689e818": "add_new_work",
    "e73b655d-d3ec-4dcc-a55c-6e0293422bde": "960 grid - 16 columns",
    "ef07b413-721c-418e-81b1-33a7ed533245": "960 grid - 12 columns",
    "f39803f7-df02-4169-93eb-7547fb8c961a": "Template 1",
    "bb8abf58-f55e-472d-af05-a7d1bb0cc014": "default"
  };

  var uriRE = /^(\/#)?(screens|templates|masters|scenarios)\/(.*)(\.html)?/;
  window.lookUpURL = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, url;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      url = folder + "/" + canvas;
    }
    return url;
  };

  window.lookUpName = function(fragment) {
    var matches = uriRE.exec(fragment || "") || [],
        folder = matches[2] || "",
        canvas = matches[3] || "",
        name, canvasName;
    if(dictionary.hasOwnProperty(canvas)) { /* search by name */
      canvasName = dictionary[canvas];
    }
    return canvasName;
  };
})(window);