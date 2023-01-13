
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
    target.id = xhrVillagers.response[key].id;

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

      formValues.id = villagerData[villagerNamesList[i]].id;
      formValues.hobby = villagerData[villagerNamesList[i]].hobby;
      formValues.personality = villagerData[villagerNamesList[i]].personality;
      formValues.icon = villagerData[villagerNamesList[i]].icon;
      formValues.image = villagerData[villagerNamesList[i]].image;
      formValues.birthdayString = villagerData[villagerNamesList[i]].birthdayString;
      formValues.saying = villagerData[villagerNamesList[i]].saying;

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
// original
/* function heartClicked(event) {
  var currentVillagerLiked = $name.textContent;
  if (data.liked.length >= 10) {
    $textHeart.textContent = 'There are already 10 villagers!';
    $textHeart.className = 'text-heart text-red fade-out ';

  } else if (data.liked.includes(currentVillagerLiked)) {
    $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
    $textHeart.textContent = 'Villager has already been added!';
    $textHeart.className = 'text-heart text-red fade-out';

  } else {
    data.liked.push(currentVillagerLiked);
    $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
    $textHeart.textContent = 'Villager has been added!';
    $textHeart.className = 'text-heart text-red fade-out ';
  }
} */

/* function heartClicked(event) { // edit 2

  var currentVillagerLiked = $name.textContent;
  console.log('line:122 currentVillagerLiked::: ', currentVillagerLiked);
  if (data.liked.length >= 10) {
    $textHeart.textContent = 'There are already 10 villagers!';
    $textHeart.className = 'text-heart text-red fade-out ';
    return null;
  } else {
    if (data.liked.length === 0) {
      data.liked.unshift(data.entries[0]);
      console.log('line131');

    } for (var i = 0; i < data.liked.length; i++) {
      if (data.liked[i].name === currentVillagerLiked) {
        console.log('already an added villager ');
        $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
        $textHeart.textContent = 'Villager has already been added!';
        $textHeart.className = 'text-heart text-red fade-out';
      } else {
        console.log('not a match, new villager');
        data.liked.unshift(data.entries[0]);
        $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
        $textHeart.textContent = 'Villager has been added!';
        $textHeart.className = 'text-heart text-red fade-out ';
      }
    }
  }
} */

function heartClicked(event) {

  if (data.liked.length >= 10) {
    $textHeart.textContent = 'There are already 10 villagers!';
    $textHeart.className = 'text-heart text-red fade-out ';
    return null;
  } else {
    if (data.liked.some(e => e.name === data.entries[0].name)) {
    /*   console.log('Already Liked'); */
      $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
      $textHeart.textContent = 'Villager has already been added!';
      $textHeart.className = 'text-heart text-red fade-out';
    } else {
      data.liked.unshift(data.entries[0]);
      $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size ';
      $textHeart.textContent = 'Villager has been added!';
      $textHeart.className = 'text-heart text-red fade-out ';
    }
  }
}
/* function likedCheck(event) { // old.
  var currentVillagerLiked = $name.textContent;
  for (var i = 0; i < data.liked.length; i++) {
    if (data.liked[i].name !== currentVillagerLiked) {
      $heart.className = 'heart-like fa-regular fa-heart centered house-font-size';
    } else {
      $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size';
    }
  }
} */
function likedCheck(event) {

  if (data.liked.some(e => e.name === data.entries[0].name)) {
    $heart.className = 'heart-like fa-solid text-red fa-heart centered house-font-size';
  } else {

    $heart.className = 'heart-like fa-regular fa-heart centered house-font-size';
  }
}

var $home = document.querySelector('.fa-house');
$home.addEventListener('click', goHome);

function goHome(event) {
  viewSwap($villageSlide);
}
function searchForAVillager(event) {
  viewSwap($search);
}
var $view = document.querySelectorAll('.view');
var $search = document.querySelector('[data-view="search"]');
var $villageSlide = document.querySelector('[data-view="village-slide"]');
function viewSwap(view) {
  for (var i = 0; i < $view.length; i++) {
    var currentView = $view[i];
    currentView.classList.add('hidden');
  }
  view.classList.remove('hidden');
}

var $slider = document.querySelector('.slider');
var $leftArrow = document.querySelector('.mobile-slider-left');
var $rightArrow = document.querySelector('.mobile-slider-right');
$leftArrow.addEventListener('click', arrowClicked);
$rightArrow.addEventListener('click', arrowClicked);

function arrowClicked(event) {

  if (event.target.classList.contains('mobile-slider-right')) {

    if ($slider.classList.contains('first-slide')) {

      $slider.classList.remove('first-slide');
      $slider.classList.add('second-slide');
    } else if ($slider.classList.contains('second-slide')) {
      $slider.classList.remove('second-slide');
      $slider.classList.add('third-slide');
    } else if ($slider.classList.contains('third-slide')) {
      $slider.classList.remove('third-slide');
      $slider.classList.add('fourth-slide');
    } else if ($slider.classList.contains('fourth-slide')) {
      $slider.classList.remove('fourth-slide');
      $slider.classList.add('fifth-slide');
    } else if ($slider.classList.contains('fifth-slide')) {
      $slider.classList.remove('fifth-slide');
      $slider.classList.add('first-slide');
    }
  } else if (event.target.classList.contains('mobile-slider-left')) {
    if ($slider.classList.contains('first-slide')) {
      $slider.classList.remove('first-slide');
      $slider.classList.add('fifth-slide');
    } else if ($slider.classList.contains('fifth-slide')) {
      $slider.classList.remove('fifth-slide');
      $slider.classList.add('fourth-slide');
    } else if ($slider.classList.contains('fourth-slide')) {
      $slider.classList.remove('fourth-slide');
      $slider.classList.add('third-slide');
    } else if ($slider.classList.contains('third-slide')) {
      $slider.classList.remove('third-slide');
      $slider.classList.add('second-slide');
    } else if ($slider.classList.contains('second-slide')) {
      $slider.classList.remove('second-slide');
      $slider.classList.add('first-slide');
    }
  }
}

// use loop to append data for one image,icon, name and repeat for lengt of the liekd array
function renderSlide(firstVillager, secondVillager) {
  var $slidesRow = document.createElement('div');

  $slidesRow.setAttribute('class', 'row slides');
  var $resColImg = document.createElement('div');
  $resColImg.setAttribute('class', 'column-full resident-one-top');
  var $resMainImg = document.createElement('img');
  $resMainImg.setAttribute('src', firstVillager.image);
  $resMainImg.setAttribute('class', 'residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
  var $resColIcon = document.createElement('div');
  $resColIcon.setAttribute('class', 'column-full display-flex');
  var $resIcon = document.createElement('img');
  $resIcon.setAttribute('src', firstVillager.icon);
  $resIcon.setAttribute('class', 'icon resident-icon-mobile-slide');
  var $p = document.createElement('p');
  $p.textContent = firstVillager.name;

  $slidesRow.appendChild($resColImg);
  $resColImg.appendChild($resMainImg);
  $slidesRow.appendChild($resColIcon);
  $resColIcon.appendChild($resIcon);
  $resColIcon.appendChild($p);

  if (typeof secondVillager !== 'undefined') {
    var $resColImgBelow = document.createElement('div');
    $resColImgBelow.setAttribute('class', 'column-full resident-one-top');
    var $resMainImgBelow = document.createElement('img');
    $resMainImgBelow.setAttribute('src', secondVillager.image);
    $resMainImgBelow.setAttribute('class', ' res-img-below residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
    var $resColIconBelow = document.createElement('div');
    $resColIconBelow.setAttribute('class', ' res-icon-below column-full display-flex');
    var $resIconBelow = document.createElement('img');
    $resIconBelow.setAttribute('src', secondVillager.icon);
    $resIconBelow.setAttribute('class', 'icon  resident-icon-mobile-slide');
    var $pBelow = document.createElement('p');
    $pBelow.textContent = secondVillager.name;
    $pBelow.setAttribute('class', 'res-p-below');

    $slidesRow.appendChild($resColImgBelow);
    $resColImgBelow.appendChild($resMainImgBelow);
    $slidesRow.appendChild($resColIconBelow);
    $resColIconBelow.appendChild($resIconBelow);
    $resColIconBelow.appendChild($pBelow);
  } else {
    $resColImgBelow = document.createElement('div');
    $resColImgBelow.setAttribute('class', 'column-full resident-one-top');
    $resMainImgBelow = document.createElement('img');
    $resMainImgBelow.setAttribute('src', 'images/hello.png' /* secondVillager.image */);
    $resMainImgBelow.setAttribute('class', ' res-img-below residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
    $resColIconBelow = document.createElement('div');
    $resColIconBelow.setAttribute('class', ' res-icon-below column-full display-flex');
    $resIconBelow = document.createElement('img');
    $resIconBelow.setAttribute('src', 'images/thought.png');
    $resIconBelow.setAttribute('class', 'icon resident-icon-mobile-slide');
    $pBelow = document.createElement('p');
    $pBelow.textContent = 'Add another villager!';
    $pBelow.setAttribute('class', 'res-p-below');

    $slidesRow.appendChild($resColImgBelow);
    $resColImgBelow.appendChild($resMainImgBelow);
    $slidesRow.appendChild($resColIconBelow);
    $resColIconBelow.appendChild($resIconBelow);
    $resColIconBelow.appendChild($pBelow);
  }

  return $slidesRow;
}

/*   if ((data.liked.length + 2) % 2 === 0) { //old
    var $slidesRow = document.createElement('div');

    $slidesRow.setAttribute('class', 'row slides');
    var $resColImg = document.createElement('div');
    $resColImg.setAttribute('class', 'column-full resident-one-top');
    var $resMainImg = document.createElement('img');
    $resMainImg.setAttribute('src', entry.image);
    $resMainImg.setAttribute('class', 'residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
    var $resColIcon = document.createElement('div');
    $resColIcon.setAttribute('class', 'column-full display-flex');
    var $resIcon = document.createElement('img');
    $resIcon.setAttribute('src', entry.icon);
    $resIcon.setAttribute('class', 'icon resident-icon-mobile-slide');
    var $p = document.createElement('p');
    $p.textContent = entry.name;

    $slidesRow.appendChild($resColImg);
    $resColImg.appendChild($resMainImg);
    $slidesRow.appendChild($resColIcon);
    $resColIcon.appendChild($resIcon);
    $resColIcon.appendChild($p);

    var $resColImgBelow = document.createElement('div');
    $resColImgBelow.setAttribute('class', 'column-full resident-one-top');
    var $resMainImgBelow = document.createElement('img');
    $resMainImgBelow.setAttribute('src', entry.image);
    $resMainImgBelow.setAttribute('class', 'visibility-hidden res-img-below residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
    var $resColIconBelow = document.createElement('div');
    $resColIconBelow.setAttribute('class', 'visibility-hidden res-icon-below column-full display-flex');
    var $resIconBelow = document.createElement('img');
    $resIconBelow.setAttribute('src', entry.icon);
    $resIconBelow.setAttribute('class', 'icon visibility-hidden resident-icon-mobile-slide');
    var $pBelow = document.createElement('p');
    $pBelow.textContent = entry.name;
    $pBelow.setAttribute('class', 'res-p-below');

    $slidesRow.appendChild($resColImgBelow);
    $resColImgBelow.appendChild($resMainImgBelow);
    $slidesRow.appendChild($resColIconBelow);
    $resColIconBelow.appendChild($resIconBelow);
    $resColIconBelow.appendChild($pBelow);

    $slidesRow.appendChild($resColImgBelow);
    $resColImgBelow.appendChild($resMainImgBelow);
    $slidesRow.appendChild($resColIconBelow);
    $resColIconBelow.appendChild($resIconBelow);
    $resColIconBelow.appendChild($pBelow);
  } else if ((data.liked.length + 2) % 2 !== 0) {

    var $resMainImgBelowToChange = document.querySelector('.res-img-below');
    $resMainImgBelowToChange.setAttribute('src', entry.image);
    $resMainImgBelowToChange.setAttribute('class', 'residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
    var $resColIconToChange = document.querySelector('div');
    $resColIconToChange.setAttribute('class', 'column-full display-flex');
    var $resIconToChange = document.querySelector('.res-icon-below');
    $resIconToChange.setAttribute('src', entry.icon);
    $resIconToChange.setAttribute('class', 'icon resident-icon-mobile-slide');
    var $pToChange = document.querySelector('res-p-below');
    $pToChange.textContent = entry.name;

  }
  return $slidesRow;
}
 */
var villagerList10Max = data.liked;
function createSlides(villagerList10Max) {
  for (var i = 0; i < villagerList10Max.length; i += 2) {
    $sliderCol.appendChild(renderSlide(villagerList10Max[i], villagerList10Max[i + 1]));
  }
}
var $sliderCol = document.querySelector('.slider');
document.addEventListener('DOMContentLoaded', generateDomTree);

function generateDomTree(event) {
  createSlides(villagerList10Max);
}
