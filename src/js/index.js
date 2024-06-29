const btn = document.querySelector(".btn");
const boxTransaction = document.querySelector(".transaction");
const transactionTable = document.querySelector(".transaction__table");
const searchBox = document.querySelector(".input__box");
const inputSearch = document.querySelector(".input__search");
const inputSvg = document.querySelector(".input__svg");
const loading = document.querySelector(".loading");

const URL_ALLFETCH = "http://localhost:3000/transactions";

let isLoading = false;
let allTransactions = [];
let inputValue = "";
// let sortPrice2 = "desc";
let order = "desc";

const deleteBtnSearchAllTransactions = async () => {
  btn.classList.add("none");
  boxTransaction.classList.add("flex");
  searchBox.classList.add("flex");

  searchAddTransaction(URL_ALLFETCH);
};

const searchAddTransaction = async (url) => {
  
  // let sortData = [];
  transactionTable.innerHTML = "";
  loading.classList.add("flex");

  
  const data = await fetch(url);
  const res = await data.json();
  // if ((sortPrice === "asc")) {
  //   sortData = res.sort((a, b) => a.date > b.date);
  //   console.log(sortData);
  // } else {
  //   sortData = res.sort((a, b) => a.date < b.date);
  //   // console.log(sortData);
  // }
  
  loading.classList.remove("flex");

  allTransactions = res;

  allTransactions.forEach((res) => {
    let isColor = "error";
    res.type === "افزایش اعتبار" ? (isColor = "success") : (isColor = "error");
    transactionTable.innerHTML += `<tr>
      <td>${res.id}</td>
      <td class="${isColor}">${res.type}</td>
      <td>${res.price.toLocaleString()}</td>
      <td>${res.refId}</td>
      <td>${setDate(res.date)}</td>
      </tr>`;
  });

  const price = document.querySelector(".price");
  const date = document.querySelector(".date");
  price.addEventListener("click", sortHandler);
  date.addEventListener("click", sortHandler);

};

const setDate = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.toLocaleDateString("fa-IR");
  const fullDate = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;

  return `${day}  <span class="clock">ساعت</span>  ${fullDate}`;
};

const searchHandler = (e) => {
  e.preventDefault();
  const value = inputSearch.value;
  searchAddTransaction(`${URL_ALLFETCH}?refId_like=${value}&_sort=price&_order=${order}`);
};

const sortHandler = (e) => {
  const value = inputSearch.value;
  [...e.target.parentElement.childNodes][3].classList.toggle("chevronRotate");
  if (e.target.parentElement.classList[1] === "date") {
    // sortPrice2 === "asc" ? (sortPrice2 = "desc") : (sortPrice2 = "asc");
    // searchAddTransaction(
    //   `${URL_ALLFETCH}?refId_like=${value}&_sort=price&_order=${order}`
    // );
  } else {
    order === "asc" ? (order = "desc") : (order = "asc");
    searchAddTransaction(
      `${URL_ALLFETCH}?refId_like=${value}&_sort=price&_order=${order}`
    );
  }
};

btn.addEventListener("click", deleteBtnSearchAllTransactions);
inputSvg.addEventListener("click", searchHandler);
searchBox.addEventListener("submit", searchHandler);
