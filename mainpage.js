//CURRENCY CONVERTER

//  Connectiong HTML currency form with the functionality from JavaScript 


var calculate = function calculate() {
  
    var amount = parseFloat(document.getElementById("amount").value);
    var select = document.getElementById("currencyFrom");
    var select1 = document.getElementById("currencyTo");
    var result = document.getElementById("result");

    // The calculation for the selected rates
  
     var number = amount * select1.options[select1.selectedIndex].dataset.rate; 

     result.value = number;
}
  
// The function calculate is initiated as soon as the user types a number in the amount field and displays the results immediately in the result field
// This element allows the user to see the immediate result without pressing a calculate buttoon

  document.getElementById("amount").addEventListener("keyup", calculate);
  document.getElementById("currencyTo").addEventListener("change", calculate);



  //API collect rates 


function callbackFunc(response){

    var currencies = response;
    var currencies_keys = Object.keys(currencies.quotes);
    var currencies_values = Object.values(currencies.quotes);

    var currencyFrom = document.getElementById("currencyFrom");
    currencyFrom.setAttribute("disabled", "disabled");

    var currencyTo = document.getElementById("currencyTo");
    var html = "";

     // Universal function to retrieve user Array from LocalStorage
     var activeUser = JSON.parse(localStorage.getItem('activeUser'))
console.log(activeUser);
   

    //We make an array of our currencies retrieved from the API
    var currenciesList = [];

    for(i=0; i < currencies_keys.length; i++){
        if(i == 0){
            var currency = currencies_keys[i].substring(0,3);
            html += "<option value='" + currency + "'>" + currency + "</option>";                
        }

        var currency = currencies_keys[i].substring(3,6);
        var rate = currencies_values[i];

        var currencyObject = new Currency(currency, rate);
        currenciesList.push(currencyObject);

        html += "<option value='" + currency + "' data-rate='" + rate + "'>" + currency + "</option>";
    }
    // Fetching local storage currencies and displaying preffered currency from activeUser in currencyTo in HTML 
    localStorage.setItem("currencies", JSON.stringify(currenciesList));

    currencyTo.innerHTML = html;

    currencyTo.value = activeUser.currency.name;

     
 }


// set endpoint and your access key
endpoint = 'live'
access_key = '7ff7413fd18c1b9652f371629bd4bb4f';

// get the most recent exchange rates via the "live" endpoint:
$.ajax({
    url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + access_key,   
    dataType: 'jsonp',
    success: function(json) {
        callbackFunc(json);
        
    }
});

//Forward to LogIn html when button is clicked
var logout = document.getElementById('logout');
logout.onclick = function() {
    document.location.href = 'login1.html'; 


}





