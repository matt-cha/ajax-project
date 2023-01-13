/* exported data */

var data = {
  individualVillagerCard: null,
  entries: [],
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
