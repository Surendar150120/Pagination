var globalData = [];

var currPage = 0;

// Creating H1
const h1Ele = document.createElement("h1");

h1Ele.innerText = "Pagination";

h1Ele.id = "title";

//Creating paragraph
const pELe = document.createElement("p");

pELe.innerText = "Paginating 100 data for easy readability";

pELe.id = "description";

// Creating Main DIV
const mainDiv = document.createElement("div");

mainDiv.className = "table-responsive";

// Creating table
const tableEle = document.createElement("table");

tableEle.className = "table table-bordered table-warning";
tableEle.id = "table";

//Creating thead
const theadEle = document.createElement("thead");
theadEle.className = "table table-bordered table-dark";

// Creating tr
const trEle = document.createElement("tr");

["Id", "Email", "Name"].forEach((columnName) => {
  // th
  const thEle = document.createElement("th");
  thEle.innerText = columnName;
  trEle.appendChild(thEle);
});

theadEle.appendChild(trEle);

// Creating tbody
const tbodyEle = document.createElement("tbody");

tableEle.append(theadEle, tbodyEle);

mainDiv.appendChild(tableEle);

// Creating Main DIV
const btnsDiv = document.createElement("div");

btnsDiv.className = " d-flex justify-content-center";
btnsDiv.id = "buttons";

const nextBtn = document.createElement("button");

nextBtn.innerText = "Next";

nextBtn.className = " btn btn-light";

const prevBtn = document.createElement("button");

prevBtn.innerText = "Prev";

prevBtn.className = " btn btn-light";

const populateTable = (startIndex, endIndex) => {
  globalData.slice(startIndex, endIndex).forEach(({ email, id, name }) => {
    //Creating tr
    const innerTr = document.createElement("tr");

    //Creating tds
    const innerTdId = document.createElement("td");
    innerTdId.innerText = id;
    const innerTdName = document.createElement("td");
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement("td");
    innerTdEmail.innerText = email;

    innerTr.append(innerTdId, innerTdEmail, innerTdName);

    tbodyEle.appendChild(innerTr);
  });
};

const pageBtns = [...Array(20).keys()].map((pageNo) => {
  const pageBtn = document.createElement("button");
  pageBtn.className = "btn btn-light";
  pageBtn.innerText = pageNo + 1;

  pageBtn.addEventListener("click", () => {
    currPage = pageNo;
    tbodyEle.innerHTML = "";
    const startIndex = pageNo * 5;

    const endIndex = pageNo * 5 + 5;
    populateTable(startIndex, endIndex);
  });
  return pageBtn;
});

btnsDiv.append(nextBtn, ...pageBtns, prevBtn);

document.body.style.textAlign = "center";
document.body.append(h1Ele, pELe, mainDiv, btnsDiv);

const request = new XMLHttpRequest();

request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);

request.send(null);

request.onload = () => {
  const data = JSON.parse(request.responseText);
  globalData = data;
  data.slice(currPage, 5).forEach(({ email, id, name }) => {
    // tr
    const innerTr = document.createElement("tr");
    // tds
    const innerTdId = document.createElement("td");
    innerTdId.innerText = id;
    const innerTdName = document.createElement("td");
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement("td");
    innerTdEmail.innerText = email;
    innerTr.append(innerTdId, innerTdEmail, innerTdName);
    tbodyEle.appendChild(innerTr);
  });
};

const showNextSetOfData = (prev = false) => {
  if (prev && currPage > 0) currPage--;
  else if (!prev && currPage < 19) currPage++;
  else return;
  tbodyEle.innerHTML = "";
  const startIndex = currPage * 5;

  const endIndex = currPage * 5 + 5;
  populateTable(startIndex, endIndex);
};

nextBtn.addEventListener("click", () => showNextSetOfData());

prevBtn.addEventListener("click", () => {
  showNextSetOfData(true);
});
