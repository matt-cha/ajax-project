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
    var personality = xhrVillagers.response[keys[i]].personality;
    var icon = xhrVillagers.response[keys[i]].icon_uri;
    var image = xhrVillagers.response[keys[i]].image_uri;
    var saying = xhrVillagers.response[keys[i]].saying;
    target.birthdayString = xhrVillagers.response[keys[i]]['birthday-string'];
    target.hobby = xhrVillagers.response[keys[i]].hobby;
    target.personality = xhrVillagers.response[keys[i]].personality;
    target.icon = xhrVillagers.response[keys[i]].icon_uri;
    target.image = xhrVillagers.response[keys[i]].image_uri;
    target.saying = xhrVillagers.response[keys[i]].saying;

    villagerData[name] = target;

  }
  console.log('villagerData:', villagerData);

});
xhrVillagers.send();

var $newVillagerSearched = document.querySelector('.navbar-form');
$newVillagerSearched.addEventListener('submit', saveForm);
function saveForm(event) {
  event.preventDefault();
  var formValues = {};
  formValues.name = $newVillagerSearched.elements.name.value;

  var villagerNamesList = Object.keys(villagerData);
  var incorrectName = 'not found';
  for (var i = 0; i < villagerNamesList.length; i++) {
    if (formValues.name === villagerNamesList[i]) {
      console.log('match');
      formValues.entryId = data.nextEntryId;
      formValues.hobby = villagerData[villagerNamesList[i]].hobby;
      formValues.personality = villagerData[villagerNamesList[i]].personality;
      formValues.icon = villagerData[villagerNamesList[i]].icon;
      formValues.image = villagerData[villagerNamesList[i]].image;
      formValues.birthdayString = villagerData[villagerNamesList[i]].birthdayString;

      formValues.saying = villagerData[villagerNamesList[i]].saying;

      data.nextEntryId++;
      data.entries.unshift(formValues);
      document.querySelector('.navbar-form').reset();
      renderVillagerSearch();
// reset the search  rednered after
      break;
    } else if (formValues.name !== villagerNamesList[i]) {
      renderNotFound();
    }
  }

}

var $searchImage = document.querySelector('.search-image');
var $icon = document.querySelector('.icon');
var $name = document.querySelector('.villager-name');
var $birthday = document.querySelector('.birthday');
var $hobbyText = document.querySelector('.hobby-text');
var $personalityText = document.querySelector('.personality-text');
var $sayingText = document.querySelector('.saying-text');

function renderVillagerSearch(entry) {

  $searchImage.setAttribute('src', data.entries[0].image);
  $icon.setAttribute('src', data.entries[0].icon);
  $name.textContent = data.entries[0].name;
  $name.classList.remove('text-red');
  $birthday.textContent = data.entries[0].birthdayString;
  $hobbyText.textContent = data.entries[0].hobby;
  $personalityText.textContent = data.entries[0].personality;
  $sayingText.textContent = data.entries[0].saying;
}

function renderNotFound(entry) {
  $searchImage.setAttribute('src', '/images/sad.png');
  $name.textContent = 'No villager was found!';
}
 */
