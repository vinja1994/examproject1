//CURRENCY CONVERTER

/* Connecting HTML currency form with the functionality from JavaScript 
We create a function to convert currencies using API and the value entered by the user.

*/
var calculate = function calculate() {
  
    var amount = parseFloat(document.getElementById("amount").value); //entered by user
    var select = document.getElementById("currencyFrom"); //Default USD - hardcoded to value of 1
    var select1 = document.getElementById("currencyTo"); //Selected currency by user - currency rates retrieved from API
    var result = document.getElementById("result"); //Calculated in function

/* The calculation for the selected rates
This calculation takes the users entered amount times the rates retrieved from API and returns the index from our downdown list.
*/
    var number = amount * select1.options[select1.selectedIndex].dataset.rate; 
     result.value = number;
}
  
// The calculate function is initiated as soon as the user types a number in the amount field and displays the results immediately in the result field
// This element allows the user to see the immediate result without pressing a calculate button

  document.getElementById("amount").addEventListener("keyup", calculate);
  document.getElementById("currencyTo").addEventListener("change", calculate);

 /* This function fetches rates for the users selected currency
The key is the abbreviation of the currency rate name and the value is the rate connected to each currency*/

function callbackFunc(response){ // Response indicates that we need to retrieve information from the user
    var currencies = response; 
    var currencies_keys = Object.keys(currencies.quotes); // This takes all keys into an array
    var currencies_values = Object.values(currencies.quotes);

//This ensures the user can not change the default currencyFrom 
    var currencyFrom = document.getElementById("currencyFrom");
    currencyFrom.setAttribute("disabled", "disabled"); 

// When the user changes the selected currency it will be shown in the currencyTo field 
    var currencyTo = document.getElementById("currencyTo");
    var html = "";

// Here we use a universal function to retrieve activeUser key from LocalStorage
     var activeUser = JSON.parse(localStorage.getItem('activeUser'))
   
//This function retrieves the users predefined currency from the registration form
    var currenciesList = [];

    for(i=0; i < currencies_keys.length; i++){
        if(i == 0){
            var currency = currencies_keys[i].substring(0,3); // With this substring we split the currencyFrom and currencyTo into their own strings

// The option value refers to the users selected predefined currency. FURTHER EXPLANATION + CURRENCY +
            html += "<option value='" + currency + "'>" + currency + "</option>";                
        }

// With this substring we split the currencyFrom and currencyTo into their own strings and define variables
        var currency = currencies_keys[i].substring(3,6);
        var rate = currencies_values[i];

// We connect this to our currency class which consists of the specific currency and its specific rate
// We then push the object into the currency list
        var currencyObject = new Currency(currency, rate);
        currenciesList.push(currencyObject);

        html += "<option value='" + currency + "' data-rate='" + rate + "'>" + currency + "</option>";
    }
// Fetching local storage currencies and displaying predefined currency from activeUser in currencyTo in HTML 
    localStorage.setItem("currencies", JSON.stringify(currenciesList));

    currencyTo.innerHTML = html;

    currencyTo.value = activeUser.currency.name; 
 }

// set endpoint and your access key
endpoint = 'live'
access_key = '7ff7413fd18c1b9652f371629bd4bb4f';

// Here we get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,   
    dataType: 'jsonp',
    success: function(json) {
        callbackFunc(json);  
    }
});

//Logout function - redirects to LogIn html when button is clicked
var logout = document.getElementById('logout');
logout.onclick = function() {
    document.location.href = 'login1.html'; 
}