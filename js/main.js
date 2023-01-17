
var xhrVillagers = new XMLHttpRequest();
var villagerData = {};
xhrVillagers.open('GET', 'http://acnhapi.com/v1/villagers/');
xhrVillagers.responseType = 'json';
xhrVillagers.addEventListener('load', function () {

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
  toggleNoEntries();
  generateDomTree();
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
var count = 1;
function countChecker(event) {
  if (count > 5) {
    count = 1;
  }
  if (count < 1) {
    count = 5;
  }
  if (count === 1) {
    slideOne();
  }
  if (count === 2) {
    slideTwo();
  }
  if (count === 3) {
    slideThree();
  }
  if (count === 4) {
    slideFour();
  }
  if (count === 5) {
    slideFive();
  }
}
/* function arrowClicked(event) {

  if (event.target.classList.contains('mobile-slider-right')) {
    count++;

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
    count--;

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
} */
function arrowClicked(event) {

  if (event.target.classList.contains('mobile-slider-right')) {
    count++;
    countChecker();
  } else if (event.target.classList.contains('mobile-slider-left')) {
    count--;
    countChecker();
  }
}
var $dotOne = document.querySelector('.dot-one');
var $dotTwo = document.querySelector('.dot-two');
var $dotThree = document.querySelector('.dot-three');
var $dotFour = document.querySelector('.dot-four');
var $dotFive = document.querySelector('.dot-five');

$dotOne.addEventListener('click', dotOneClicked);
function dotOneClicked(event) {
  count = 1;
  countChecker();
}

$dotTwo.addEventListener('click', dotTwoClicked);
function dotTwoClicked(event) {
  count = 2;
  countChecker();
}

$dotThree.addEventListener('click', dotThreeClicked);
function dotThreeClicked(event) {
  count = 3;
  countChecker();
}

$dotFour.addEventListener('click', dotFourClicked);
function dotFourClicked(event) {
  count = 4;
  countChecker();
}

$dotFive.addEventListener('click', dotFiveClicked);
function dotFiveClicked(event) {
  count = 5;
  countChecker();
}

function slideOne(event) {
  $slider.className = 'column-full img-frame display-flex  slider first-slide';
  $dotOne.className = 'dot-one fa-solid  fa-circle dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular fa-circle dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular fa-circle dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular fa-circle dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular fa-circle dots-padding house-font-size';
}
function slideTwo(event) {
  $slider.className = 'column-full img-frame display-flex  slider second-slide';
  $dotOne.className = 'dot-one fa-regular  fa-circle dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-solid fa-circle dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular fa-circle dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular fa-circle dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular fa-circle dots-padding house-font-size';
}

function slideThree(event) {
  $slider.className = 'column-full img-frame display-flex  slider third-slide';
  $dotOne.className = 'dot-one fa-regular  fa-circle dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular fa-circle dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-solid fa-circle dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular fa-circle dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular fa-circle dots-padding house-font-size';
}

function slideFour(event) {
  $slider.className = 'column-full img-frame display-flex  slider fourth-slide';
  $dotOne.className = 'dot-one fa-regular  fa-circle dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular fa-circle dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular fa-circle dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-solid fa-circle dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular fa-circle dots-padding house-font-size';
}

function slideFive(event) {
  $slider.className = 'column-full img-frame display-flex  slider fifth-slide';
  $dotOne.className = 'dot-one fa-regular  fa-circle dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular fa-circle dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular fa-circle dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular fa-circle dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-solid fa-circle dots-padding house-font-size';
}
/* function slideOne(event) {

  $slider.className = 'column-full img-frame display-flex  slider first-slide';
  $dotOne.className = 'dot-one fa-solid  fa-circle dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular dots-padding house-font-size';
}
function slideTwo(event) {
  $slider.className = 'column-full img-frame display-flex  slider second-slide';
  $dotOne.className = 'dot-one fa-regular  dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-solid dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular dots-padding house-font-size';
}

function slideThree(event) {
  $slider.className = 'column-full img-frame display-flex  slider third-slide';
  $dotOne.className = 'dot-one fa-regular  dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-solid dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular dots-padding house-font-size';
}

function slideFour(event) {
  $slider.className = 'column-full img-frame display-flex  slider fourth-slide';
  $dotOne.className = 'dot-one fa-regular  dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-solid dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-regular dots-padding house-font-size';
}

function slideFive(event) {
  $slider.className = 'column-full img-frame display-flex  slider fifth-slide';
  $dotOne.className = 'dot-one fa-regular  dots-padding house-font-size';
  $dotTwo.className = 'dot-two  fa-regular dots-padding house-font-size';
  $dotThree.className = 'dot-three  fa-regular dots-padding house-font-size';
  $dotFour.className = 'dot-four  fa-regular dots-padding house-font-size';
  $dotFive.className = 'dot-five  fa-solid dots-padding house-font-size';
} */
function renderSlide(firstVillager, secondVillager) {
  var $slidesRow = document.createElement('div');

  $slidesRow.setAttribute('class', 'row slides');
  var $resColImg = document.createElement('div');
  $resColImg.setAttribute('class', 'column-full resident');
  var $resMainImg = document.createElement('img');
  $resMainImg.setAttribute('src', firstVillager.image);
  $resMainImg.setAttribute('class', 'residents-main-image-slide margin-zero align-items-center border-radius-all display-flex clickable');
  $resMainImg.setAttribute('villager-name', firstVillager.name);
  var $resColIcon = document.createElement('div');
  $resColIcon.setAttribute('class', 'column-full display-flex');
  var $resIcon = document.createElement('img');
  $resIcon.setAttribute('src', firstVillager.icon);
  $resIcon.setAttribute('class', 'icon resident-icon-mobile-slide clickable');
  $resIcon.setAttribute('villager-name', firstVillager.name);
  var $p = document.createElement('p');
  $p.textContent = firstVillager.name;

  $slidesRow.appendChild($resColImg);
  $resColImg.appendChild($resMainImg);
  $slidesRow.appendChild($resColIcon);
  $resColIcon.appendChild($resIcon);
  $resColIcon.appendChild($p);

  if (typeof secondVillager !== 'undefined') {
    var $resColImgBelow = document.createElement('div');
    $resColImgBelow.setAttribute('class', 'column-full resident');
    var $resMainImgBelow = document.createElement('img');
    $resMainImgBelow.setAttribute('src', secondVillager.image);
    $resMainImgBelow.setAttribute('class', ' res-img-below residents-main-image-slide margin-zero align-items-center border-radius-all display-flex clickable');
    $resMainImgBelow.setAttribute('villager-name', secondVillager.name);
    var $resColIconBelow = document.createElement('div');
    $resColIconBelow.setAttribute('class', ' res-icon-below column-full display-flex');
    var $resIconBelow = document.createElement('img');
    $resIconBelow.setAttribute('src', secondVillager.icon);
    $resIconBelow.setAttribute('class', 'icon  resident-icon-mobile-slide clickable');
    $resIconBelow.setAttribute('villager-name', secondVillager.name);
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
    $resColImgBelow.setAttribute('class', 'column-full ');
    $resMainImgBelow = document.createElement('img');
    $resMainImgBelow.setAttribute('src', 'images/hello.png');
    $resMainImgBelow.setAttribute('class', 'visibility-hidden res-img-below residents-main-image-slide margin-zero align-items-center border-radius-all display-flex');
    $resColIconBelow = document.createElement('div');
    $resColIconBelow.setAttribute('class', ' res-icon-below column-full display-flex');
    $resIconBelow = document.createElement('img');
    $resIconBelow.setAttribute('src', 'images/thought.png');
    $resIconBelow.setAttribute('class', 'visibility-hidden icon resident-icon-mobile-slide');
    $pBelow = document.createElement('p');
    $pBelow.textContent = 'Add another villager!';
    $pBelow.setAttribute('class', 'visibility-hidden res-p-below');

    $slidesRow.appendChild($resColImgBelow);
    $resColImgBelow.appendChild($resMainImgBelow);
    $slidesRow.appendChild($resColIconBelow);
    $resColIconBelow.appendChild($resIconBelow);
    $resColIconBelow.appendChild($pBelow);
  }

  return $slidesRow;
}

function createSlides(likedVillagers) {

  $sliderCol.replaceChildren();
  for (var i = 0; i < data.liked.length; i += 2) {
    $sliderCol.appendChild(renderSlide(data.liked[i], data.liked[i + 1]));
  }
}
var $sliderCol = document.querySelector('.slider');
document.addEventListener('DOMContentLoaded', generateDomTree);

function generateDomTree(event) {
  createSlides(data.liked);
  toggleNoEntries();
}
var $noLikedMessage = document.querySelector('.no-liked-message');

function toggleNoEntries(event) {
  if (data.liked.length === 0) {
    $noLikedMessage.classList.remove('hidden');

  } else {
    $noLikedMessage.classList.add('hidden');
  }
}

var $overlay = document.querySelector('.overlay');
var $xButton = document.querySelector('.fa-x');
$xButton.addEventListener('click', closeIndividualCard);
function closeIndividualCard(event) {
  $overlay.classList.add('hidden');
}
$slider = document.querySelector('.slider');
$slider.addEventListener('click', openVillagerCard);
var $individualMainImg = document.querySelector('.individual-main-img');
var $individualIconImg = document.querySelector('.individual-icon-img');
var $individualName = document.querySelector('.individual-name');
var $individualBirthday = document.querySelector('.individual-birthday');
var $individualHobby = document.querySelector('.individual-hobby');
var $individualPersonality = document.querySelector('.individual-personality');
var $individualSaying = document.querySelector('.individual-saying');

function openVillagerCard(event) {
  if (event.target.matches('.clickable')) {
    $overlay.classList.remove('hidden');
    for (var i = 0; i < data.liked.length; i++) {
      if (event.target.getAttribute('villager-name') === data.liked[i].name) {
        $individualMainImg.setAttribute('src', data.liked[i].image);
        $individualIconImg.setAttribute('src', data.liked[i].icon);
        $individualName.textContent = data.liked[i].name;
        $individualBirthday.textContent = data.liked[i].birthdayString;
        $individualHobby.textContent = data.liked[i].hobby;
        $individualPersonality.textContent = data.liked[i].personality;
        $individualSaying.textContent = data.liked[i].saying;
      }
    }
  }
}
var $overlayTrash = document.querySelector('.overlay-trash');
var $trash = document.querySelector('.fa-trash');
$trash.addEventListener('click', openRemoveModal);
function openRemoveModal(event) {
  $overlayTrash.classList.remove('hidden');
}

var $removeVillagerButton = document.querySelector('.remove-villager');
var $cancelRemoveVillagerButton = document.querySelector('.cancel-remove-villager');
$removeVillagerButton.addEventListener('click', trashModalButtons);
$cancelRemoveVillagerButton.addEventListener('click', trashModalButtons);
function trashModalButtons(event) {
  if (event.target.classList.contains('remove-villager')) {
    $overlayTrash.classList.add('hidden');
    $overlay.classList.add('hidden');
    for (var i = 0; i < data.liked.length; i++) {
      if ($individualName.textContent === data.liked[i].name) {
        data.liked.splice(i, 1);
        generateDomTree();
      }
    }
  } else if (event.target.classList.contains('cancel-remove-villager')) {
    $overlayTrash.classList.add('hidden');
  }
}

var xhrMusic = new XMLHttpRequest();
var musicDataAll = [];
var musicDataSunny = [];
var musicDataRainy = [];
var musicDataSnowy = [];
var musicDataDay = [];
var musicDataNight = [];

xhrMusic.open('GET', 'http://acnhapi.com/v1/backgroundmusic/');
xhrMusic.responseType = 'json';
xhrMusic.addEventListener('load', function () {

  for (var key in xhrMusic.response) {
    musicDataAll.push(xhrMusic.response[key].music_uri);
    if (xhrMusic.response[key].hour > 4 && xhrMusic.response[key].hour < 19) {
      musicDataDay.push(xhrMusic.response[key].music_uri);
    } else if (xhrMusic.response[key].hour < 5 || xhrMusic.response[key].hour > 18) {
      musicDataNight.push(xhrMusic.response[key].music_uri);
    }
    if (xhrMusic.response[key].weather.includes('Rainy')) {
      musicDataRainy.push(xhrMusic.response[key].music_uri);
    } else if (xhrMusic.response[key].weather.includes('Sunny')) {
      musicDataSunny.push(xhrMusic.response[key].music_uri);
    } else if (xhrMusic.response[key].weather.includes('Snowy')) {
      musicDataSnowy.push(xhrMusic.response[key].music_uri);
    }
  }
});

xhrMusic.send();

var $playButton = document.querySelector('.play-button');

var $audio = document.querySelector('.play-music-audio');
$playButton.addEventListener('click', playButton);

var $pausebutton = document.querySelector('.pause-button');
$pausebutton.addEventListener('click', pauseButton);
var $playParent = document.querySelector('.play-parent');
var $pauseParent = document.querySelector('.pause-parent');
function playButton(event) {
  $playParent.classList.add('hidden');
  $pauseParent.classList.remove('hidden');
  if ($pausebutton.classList.contains('was-paused')) {
    $audio.play();
    $pausebutton.classList.remove('was-paused');
  } else {

    intersection(weatherChosen, timeChosen);

    pickRandomSong(intersectionArray);

    $audio.setAttribute('src', intersectionArray[randomIndex]);

    $audio.play();

    $pauseParent.classList.remove('hidden');

    $playParent.classList.add('hidden');
  }
}
function pauseButton(event) {
  $audio.pause();
  $pauseParent.classList.add('hidden');
  $playParent.classList.remove('hidden');
  $pausebutton.classList.add('was-paused');
}

var $rewind = document.querySelector('.fa-backward');
var $next = document.querySelector('.fa-forward');
$rewind.addEventListener('click', rewindSong);
$next.addEventListener('click', nextSong);
function nextSong(event) {
  intersection(weatherChosen, timeChosen);

  pickRandomSong(intersectionArray);

  $audio.setAttribute('src', intersectionArray[randomIndex]);
  $pauseParent.classList.remove('hidden');
  $playParent.classList.add('hidden');

  $audio.play();
}
function rewindSong(event) {
  $audio.currentTime = 0;
  $pauseParent.classList.remove('hidden');
  $playParent.classList.add('hidden');
  $audio.play();
}

$audio.addEventListener('ended', playNextSong);
function playNextSong(event) {

  intersection(weatherChosen, timeChosen);

  pickRandomSong(intersectionArray);

  $audio.setAttribute('src', intersectionArray[randomIndex]);

  $audio.play();
}

var $weather = document.querySelector('.fa-cloud-sun');
var $weatherModal = document.querySelector('.overlay-weather');
$weatherModal.addEventListener('click', weatherOptionClicked);
var weatherChosen = musicDataAll;
var $backgroundImage = document.querySelector('.background');
function weatherOptionClicked(event) {

  if (event.target.classList.contains('weather-sun')) {
    $backgroundImage.className = 'container background background-image-sunny';
    weatherChosen = musicDataSunny;
    $playButton.classList.add('fa-play');
    $playButton.classList.remove('fa-pause');
    playButton();
    $weatherModal.classList.add('hidden');

  } else if (event.target.classList.contains('fa-cloud-showers-heavy')) {
    $backgroundImage.className = 'container background background-image-rain';
    weatherChosen = musicDataRainy;
    $playButton.classList.add('fa-play');
    $playButton.classList.remove('fa-pause');
    playButton();
    $weatherModal.classList.add('hidden');
  } else if (event.target.classList.contains('fa-snowflake')) {
    $backgroundImage.className = 'container background background-image-snow';
    weatherChosen = musicDataSnowy;
    $playButton.classList.add('fa-play');
    $playButton.classList.remove('fa-pause');
    playButton();
    $weatherModal.classList.add('hidden');
  } else if (event.target.classList.contains('weather-close')) {
    $weatherModal.classList.add('hidden');
  }

  return weatherChosen;
}

$weather.addEventListener('click', openWeatherModal);
function openWeatherModal(event) {
  $weatherModal.classList.remove('hidden');

}

var $time = document.querySelector('.fa-clock');
var $timeModal = document.querySelector('.overlay-time');
var timeChosen = musicDataAll;
$time.addEventListener('click', openTimeModal);
function openTimeModal(event) {
  $timeModal.classList.remove('hidden');
}

$timeModal.addEventListener('click', timeOptionClicked);
function timeOptionClicked(event) {
  if (event.target.classList.contains('time-sun-day')) {
    $backgroundImage.className = 'container background background-image-day';
    timeChosen = musicDataDay;
    $playButton.classList.add('fa-play');
    $playButton.classList.remove('fa-pause');
    playButton();

    $timeModal.classList.add('hidden');
  } else if (event.target.classList.contains('fa-moon')) {
    $backgroundImage.className = 'container background background-image-night';
    timeChosen = musicDataNight;
    $playButton.classList.add('fa-play');
    $playButton.classList.remove('fa-pause');
    playButton();
    $timeModal.classList.add('hidden');
  } else if (event.target.classList.contains('time-close')) {
    $timeModal.classList.add('hidden');
  }
  return timeChosen;
}

var randomIndex = 0;
function pickRandomSong(songArray) {
  randomIndex = Math.floor(Math.random() * songArray.length);
  return randomIndex;

}

var intersectionArray = [];
function intersection(arrayOne, arrayTwo) {

  for (var i = 0; i < arrayOne.length; i++) {
    for (var k = 0; k < arrayTwo.length; k++) {
      if (arrayOne[i] === arrayTwo[k]) {
        intersectionArray.push(arrayTwo[k]);
      }
    }
  }
  return intersectionArray;
}

/* var $nightMode = document.querySelector('.night-mode');
$nightMode.addEventListener('click', nightMode);
function nightMode(event) {

}
 */
