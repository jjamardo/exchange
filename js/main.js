if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(`sw.js`)
    .then(function () {
      console.log("Service Worker Registered");
    });
}

var cop_rate_element = document.getElementById("cop_rate");
var cop_rate;
fetch('https://freecurrencyapi.net/api/v2/latest?apikey=74847440-5885-11ec-8d05-6bc28f17916f')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    cop_rate = Math.round(myJson.data.COP);
    cop_rate_element.innerHTML = `1 USD = ${cop_rate} COP`;
  });


var ars_rate_element = document.getElementById("ars_rate");
var ars_rate;
fetch('https://api.bluelytics.com.ar/v2/latest')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    ars_rate = myJson.blue.value_sell;
    ars_rate_element.innerHTML = `1 USD = ${ars_rate} ARS`;
  });

var from_input = document.getElementById("from_input");
var to_input = document.getElementById("to_input");
var form_element = document.getElementById("form_data");
console.log(form_element);
form_element.addEventListener("submit", function (evt) {
  evt.preventDefault();
  to_input.value = Math.round(from_input.value / cop_rate * ars_rate);
});
