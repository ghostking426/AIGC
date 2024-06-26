export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  const dayTime = 24 * 60 * 60 * 1000;
  const secondTime = 60 * 1000;
  d.setTime(d.getTime() + exdays * dayTime);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
};
