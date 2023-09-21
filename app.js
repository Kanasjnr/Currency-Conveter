const getCurrenyOptions = async () => {
  const apiUrl = "https://api.exchangerate.host/symbols";
  const response = await fetch(apiUrl);
  const data = await response.json();
  //   console.log(json.symbols);
  return data.symbols;
};

//using THen Method
// const getCurrenyOptions = () => {
//   const apiUrl = "https://api.exchangerate.host/symbols";
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => data.symbols);
//   return symbols;
// };

const getCurrencyRates = async (fromCurrency, toCurrency) => {
  const apiUrl = "https://api.exchangerate.host/convert";
  const currencyConverterUrl = new URL(apiUrl);
  currencyConverterUrl.searchParams.append("from", fromCurrency);
  currencyConverterUrl.searchParams.append("to", toCurrency);
  const response = await fetch(currencyConverterUrl);
  const json = await response.json();
  console.log(json);
  return json.result;
};

// using then method

// const getCurrencyRates = async(fromCurrency, toCurrency) => {
//     const apiUrl = 'https://api.exchangerate.host/convert'
//     const currencyConvertUrl = new URL(apiUrl)
//     currencyConvertUrl.searchParams.append('from', fromCurrency)
//     currencyConvertUrl.searchParams.append('to', toCurrency)

//     const result = fetch(currencyConvertUrl)
//     .then((response) => response.json())
//     .then((data) => data.result)
//     return result;
// }

const appendOptionsElToSelectEl = (optionItem, selectElement) => {
  const optionElement = document.createElement("option");
  optionElement.value = optionItem.code;
  optionElement.textContent = optionItem.description;
  selectElement.appendChild(optionElement);
};

const populateSelectEl = (selectElement, optionItems) => {
  optionItems.forEach((optionItem) =>
    appendOptionsElToSelectEl(optionItem, selectElement)
  );
};

const setUpCurrencies = async () => {
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  const currencyOptions = await getCurrenyOptions();
  const currencies = Object.keys(currencyOptions).map(
    (currencyKeys) => currencyOptions[currencyKeys]
  );

  populateSelectEl(fromCurrency, currencies);
  populateSelectEl(toCurrency, currencies);
};

setUpCurrencies();

const setUpEventListner = () => {
  const formElement = document.querySelector("#converter");
  formElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    const fromCurrency = document.getElementById("fromCurrency");
    const toCurrency = document.getElementById("toCurrency");
    const amount = document.getElementById("amount");
    const convertResultElement = document.getElementById("result");
try{
    const rates = await getCurrencyRates(fromCurrency.value, toCurrency.value);

    const amountValue = Number(amount.value);
    const conversionRate = Number(amountValue * rates).toFixed(2);
    convertResultElement.textContent = `${amountValue} ${fromCurrency.value} = ${conversionRate} ${toCurrency.value}`;
}
catch (err){
    convertResultElement.textContent = `There Is An Error ${err.message}`
    convertResultElement.classList.add("error")
}

  });
};
setUpEventListner()
