/* exported data */
/* exported villagerLikedData */
var data = {
  view: 'search-view',
  entries: [],
  villagerNumber: 1,
  nextEntryId: 1,
  liked: []
};

window.addEventListener('beforeunload', jsonStringify);
function jsonStringify(event) {
  var formJsonString = JSON.stringify(data);
  localStorage.setItem('form-values', formJsonString);

}

var formJson = localStorage.getItem('form-values');
if (formJson !== null) {
  data = JSON.parse(formJson);
}
