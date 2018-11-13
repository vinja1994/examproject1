//CURRENCY CONVERTER

//Creating connection between HTML and Javascript






var calculate = function calculate() {
  
    var amount = parseFloat(document.getElementById("amount").value);
    var select = document.getElementById("currencyFrom");
    var select1 = document.getElementById("currencyTo");
    var result = document.getElementById("result");
  
     var number = amount * select1.options[select1.selectedIndex].dataset.rate; 

     result.value = number;
}
  
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

    //We make an array of our currencies
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
    //local storage currencies 
    localStorage.setItem("currencies", JSON.stringify(currenciesList));

    currencyTo.innerHTML = html;
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
//console.log(document.getElementById('currencyTo').)
//document.getElementById('currencyTo').value = activeUser.currency.name

// Universal function to retrieve user Array from LocalStorage
var activeUser = JSON.parse(localStorage.getItem('activeUser'))