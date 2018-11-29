//CURRENCY CONVERTER

/* Connecting HTML currency form with the functionality from JavaScript 
We create a function to convert currencies using API and the value entered by the user.

*/
var calculate = function calculate() {
  
    var amount = parseFloat(document.getElementById("amount").value); // Sets the varaible amount to be connected with whatever value the user types in the amount field in HTML
    var select1 = document.getElementById("currencyTo"); // Sets the variable select1 to be connected with currencyTo in HTML 
    var result = document.getElementById("result"); // Sets the variable result to be connected with result in HTML 

/* The calculation for the selected rates
The calculation times the amount the user types with the currency and rate related to the currency
And defines this number equals result
*/
    var number = amount * select1.options[select1.selectedIndex].dataset.rate; 
     result.value = number;
}
  
// The calculate function is initiated as soon as the user types a number in the amount field or change the currency, and displays the result immediately in the result field
// This element allows the user to see the immediate result without pressing a calculate button

  document.getElementById("amount").addEventListener("keyup", calculate);
  document.getElementById("currencyTo").addEventListener("change", calculate);

 /* This defines currencies and rates connected witht the specific currency 
The key is the abbreviation of the currency name and the value is the rate connected to each currency*/

function callbackFunc(response){ 
    var currencies = response; 
    var currencies_keys = Object.keys(currencies.quotes); 
    var currencies_values = Object.values(currencies.quotes);

//This ensures that the user can not change the default currency in the currencyFrom field 
    var currencyFrom = document.getElementById("currencyFrom");
    currencyFrom.setAttribute("disabled", "disabled"); 

// When define that the currencies and its values shoud go to the currencyTo field 
    var currencyTo = document.getElementById("currencyTo");
    var currencySelection = "";

// Here we use a universal function to retrieve the activeUser key from LocalStorage as a string and transforms the values into JavaScript objects using JSON.parse
    var activeUser = JSON.parse(localStorage.getItem('activeUser'))
   
// This creates a list of all the currencies 
    var currenciesList = [];

    for(i=0; i < currencies_keys.length; i++){
        if(i == 0){
            var currency = currencies_keys[i].substring(0,3); // With this substring we split the currencyFrom and currencyTo into their own strings
        
        }

// With this substring we split the currencyFrom and currencyTo into their own strings and define variables
// And defines that the varibale rate should inherit the values of the currenices_values, which is currencies and quotes  
        var currency = currencies_keys[i].substring(3,6);
        var rate = currencies_values[i];

// Create a variable called currency object that consists of the variables currency and rate 
// Push the object into the currency list 
// We tell our currency converter that whatever the currency the user picks it should inherit the values of the variable currency and rate
        var currencyObject = new Currency(currency, rate);
        currenciesList.push(currencyObject);

        currencySelection += "<option value='" + currency + "' data-rate='" + rate + "'>" + currency + "</option>";
    }
//  Adding the list of currency objects to local storage and transforming the list to a string and displaying predefined currency from activeUser in currencyTo in HTML 
    localStorage.setItem("currencies", JSON.stringify(currenciesList));

    currencyTo.innerHTML = currencySelection;

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