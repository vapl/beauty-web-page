var sumInput = document.querySelector("#sum");
var percentSelect = document.querySelector("#interest");
var termSelect = document.querySelector("#leasing-term");
var submit = document.querySelector("#submit-button");
var errorPlacement = document.querySelector(".form");

function errorFunction() {
    var error = document.createElement("p");
    error.classList.add("error-message");
    var errorMessage = document.querySelector(".error-message");
    
    // Pārbauda vai pievienotais elements eksistē, lai nepievienot vēlreiz.
    if (document.body.contains(errorMessage)) {
        return false;
    } else {
        errorPlacement.insertBefore(error, errorPlacement.children[1]);
        document.querySelector("#sum").focus();
        // Ja summas ievades lauks nav tukšs, tad brīdinājuma ziņojums pazūd
        sumInput.addEventListener("input", function(e) {
           if (e.value != "") error.remove();
           document.querySelector(".monthly-payment-result").textContent = "0.00 €"
           document.querySelector(".refundable-amount-result").textContent = "0.00 €"
       })
    }

    if (sumInput.value == "") {
        error.innerHTML = "Summas lauks nedrīkst būt tukšs!";        
    } else if (sumInput.value == 0) {
        sumInput.value = "";
        error.innerHTML = "Summa nevar sākties ar nulli!";
    } else if (sumInput.value > 10000) {
        sumInput.value = "";
        error.innerHTML = "Maksimālā aizdevuma summa 10 000 €!";
    } else {
        error.remove();
    }
}

// Neļauj ievietot citus simbolus izņemot ciparus
sumInput.addEventListener("keyup", function(e) {
    e.target.value = e.target.value.replace(/[^0-9+]/g, "");
})

// Ar Enter pogas palīdzību rādām rezultātu
document.addEventListener("input", function(e) {
    e.target.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            calculation();
            e.preventDefault();
        }
    });
})

function calculation() {

    errorFunction();

    var K = parseFloat(sumInput.value);
    var i = parseFloat(percentSelect.value);
    var n = parseFloat(termSelect.value);
    var monthlyPaymentResult;
    var refundableAmountResult;

    if (sumInput.value == "") {
        K = 0;
    } else {
        monthlyPaymentResult = K * ((i / 12) / (1 - Math.pow((1 + (i / 12)), -n)));
        refundableAmountResult = monthlyPaymentResult * n;
    
        monthlyPaymentResult = document.querySelector(".monthly-payment-result").innerHTML = monthlyPaymentResult.toFixed(2) + " €";
        refundableAmountResult = document.querySelector(".refundable-amount-result").innerHTML = refundableAmountResult.toFixed(2) + " €";
    }

    return false;
}
