/* var $villagerName = document.querySelector('.villager-name');
var xhrVillagers = new XMLHttpRequest();
var villagerData = {};
xhrVillagers.open('GET', 'http://acnhapi.com/v1/villagers/');
xhrVillagers.responseType = 'json';
xhrVillagers.addEventListener('load', function () {
  console.log('xhrVillagers.status:', xhrVillagers.status);
  console.log('xhrVillagers.response:', xhrVillagers.response);

  var keys = Object.keys(xhrVillagers.response);

  for (var i = 0; i < keys.length; i++) {
    var target = {};
    var name = xhrVillagers.response[keys[i]].name['name-USen'];
    var hobby = xhrVillagers.response[keys[i]].hobby;
    var icon = xhrVillagers.response[keys[i]].icon_uri;
    var image = xhrVillagers.response[keys[i]].image_uri;
    var saying = xhrVillagers.response[keys[i]].saying;
    target.birthdayString = xhrVillagers.response[keys[i]]['birthday-string'];
    target.hobby = xhrVillagers.response[keys[i]].hobby;
    target.icon = xhrVillagers.response[keys[i]].icon_uri;
    target.image = xhrVillagers.response[keys[i]].image_uri;
    target.saying = xhrVillagers.response[keys[i]].saying;

    villagerData[name] = target;

  }
  console.log(villagerData);

});
xhrVillagers.send();
 */
