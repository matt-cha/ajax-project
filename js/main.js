var xhrVillagers = new XMLHttpRequest();
var villagerData = {};
xhrVillagers.open('GET', 'http://acnhapi.com/v1/villagers/');
xhrVillagers.responseType = 'json';
xhrVillagers.addEventListener('load', function () {
/*   console.log('xhrVillagers.status:', xhrVillagers.status);
  console.log('xhrVillagers.response:', xhrVillagers.response); */

  for (var key in xhrVillagers.response) {
    var target = {};
    var name = xhrVillagers.response[key].name['name-USen'];
    target.birthdayString = xhrVillagers.response[key]['birthday-string'];
    target.hobby = xhrVillagers.response[key].hobby;
    target.personality = xhrVillagers.response[key].personality;
    target.icon = xhrVillagers.response[key].icon_uri;
    target.image = xhrVillagers.response[key].image_uri;
    target.saying = xhrVillagers.response[key].saying;

    villagerData[name] = target;

  }
  /*   console.log('villagerData:', villagerData); */

});
xhrVillagers.send();

var $newVillagerSearched = document.querySelector('.navbar-form');
$newVillagerSearched.addEventListener('submit', saveForm);
function saveForm(event) {
  event.preventDefault();
  searchForAVillager();
  var formValues = {};
  formValues.name = $newVillagerSearched.elements.name.value;

  var villagerNamesList = Object.keys(villagerData);
  for (var i = 0; i < villagerNamesList.length; i++) {
    if (formValues.name === villagerNamesList[i]) {

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
  $heart.classList.remove('hidden');
  $heart.className = 'heart-like fa-regular fa-heart centered house-font-size margin-16px';
  $textHeart.textContent = '';
  likedCheck();
}

function renderNotFound(entry) {
  $searchImage.setAttribute('src', '/images/sad.png');
  $icon.setAttribute('src', '/images/thought.png');
  $name.textContent = 'No villager was found!';
  $name.classList.add('text-red');
  $birthday.textContent = '';
  $hobbyText.textContent = '';
  $personalityText.textContent = '';
  $sayingText.textContent = '';
  $heart.classList.add('hidden');
  $textHeart.className = 'text-heart transparent';
}

var $heart = document.querySelector('.heart-like');
var $textHeart = document.querySelector('.text-heart');
$heart.addEventListener('click', heartClicked);
function heartClicked(event) {
  var currentVillagerLiked = $name.textContent;
  if (data.liked.includes(currentVillagerLiked)) {

    $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
    $textHeart.textContent = 'Villager has already been added!';
    $textHeart.className = 'text-heart text-red fade-out';

  } else {
    data.liked.push(currentVillagerLiked);
    $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
    $textHeart.textContent = 'Villager has been added!';
    $textHeart.className = 'text-heart text-red fade-out ';
  }
}

function likedCheck(event) {
  var currentVillagerLiked = $name.textContent;
  if (data.liked.includes(currentVillagerLiked)) {
    $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size';
  } else {
    $heart.className = 'heart-like fa-regular fa-heart centered house-font-size';
  }
}
var $searchView = document.querySelector('.search-view');
var $villageViewMobile = document.querySelector('.village-view-mobile');
var $villageViewDesktop = document.querySelector('.village-view-desktop');
var $home = document.querySelector('.fa-house');
$home.addEventListener('click', goHome);
function goHome(event) {
  $villageViewMobile.classList.remove('hidden');
  $villageViewDesktop.classList.remove('hidden');
  $searchView.classList.add('hidden');
}

function searchForAVillager(event) {
  $villageViewMobile.classList.add('hidden');
  $searchView.classList.remove('hidden');
}
