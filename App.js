const dataClass = document.querySelector('.data');
const mainBodyData = document.querySelector('.mainBody');
const filterData = document.querySelector('.filterData');
const btn = document.querySelectorAll('.btn');
const errorMsg = document.getElementById('isInputTyped');
const timeFrames = {
  city: 'Place',
  state: 'State',
  center: 'name',
};
let timeStamp = '';
function setTimeFrame(selected) {
  btn.forEach((bt) => (bt.style.background = ''));
  if (selected == 'city') {
    btn[0].style.background = 'blue';
  } else if (selected == 'state') {
    btn[1].style.background = 'blue';
  }
  if (selected == 'center') {
    btn[2].style.background = 'blue';
  }
  timeStamp = timeFrames[selected];
  // console.log(timeStamp);
}
async function getData() {
  const resp = await fetch('https://isro.vercel.app/api/centres');
  const data = await resp.json();
  data.centres.forEach((element) => {
    delete element['id'];
  });
  appendData(data.centres);
}
getData();
appendData = (data) => {
  data.forEach((element) => {
    const obj = Object.keys(element);
    const tr = document.createElement('tr');
    obj.forEach((key) => {
      const td = document.createElement('td');
      const divtHead = document.createElement('div');
      const divData = document.createElement('div');
      divtHead.textContent = key === 'name' ? 'Center' : key === 'Place' ? 'City' : 'State';
      divData.textContent = element[key];
      td.append(divtHead, divData);
      tr.append(td);
      mainBodyData.append(tr);
    });
  });
};

async function searchInput() {
  const inputData = document
    .getElementById('inp')
    .value.toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
  if (inputData === '') {
    errorMsg.textContent = 'Please enter input !';
  } else if (timeStamp === '') {
    errorMsg.textContent = 'Please select city / state / center !';
  } else {
    mainBodyData.style.display = 'none';
    const resp = await fetch('https://isro.vercel.app/api/centres');
    const data = await resp.json();
    data.centres.forEach((element) => {
      delete element['id'];
    });

    // const filtData = data.centres.filter((center) => center.`${timeStamp}`.toLowerCase() === inputData.toLowerCase());
    // console.log(filtData);

    if (timeStamp === 'Place') {
      const filtData = data.centres.filter((center) => center.Place.toLowerCase() === inputData.toLowerCase());
      filteredData(filtData);
    } else if (timeStamp === 'State') {
      const filtData = data.centres.filter((center) => center.State.toLowerCase() === inputData.toLowerCase());
      filteredData(filtData);
    } else if (timeStamp === 'name') {
      const filtData = data.centres.filter((center) => center.name.toLowerCase() === inputData.toLowerCase());
      filteredData(filtData);
    }
  }
}

const filteredData = (data) => {
  filterData.textContent = '';
  if (data.length) {
    data.forEach((element) => {
      const obj = Object.keys(element);
      const tr = document.createElement('tr');
      obj.forEach((key) => {
        const td = document.createElement('td');
        const divtHead = document.createElement('div');
        const divData = document.createElement('div');
        divtHead.textContent = key === 'name' ? 'Center' : key === 'Place' ? 'City' : 'State';
        divData.textContent = element[key];
        td.append(divtHead, divData);
        tr.append(td);
        filterData.append(tr);
      });
    });
  } else {
    filterData.textContent = 'NO DATA AVAILABLE FOR THE SELECTED SEARCH, PLEASE TRY AGAIN !';
    filterData.style.color = 'red';
  }
};
