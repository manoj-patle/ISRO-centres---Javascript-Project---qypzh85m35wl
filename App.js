const dataClass = document.querySelector('.data');
// console.log(dataClass);
const getData = async () => {
  const resp = await fetch('https://isro.vercel.app/api/centres');
  const data = await resp.json();
  //   console.log(data);
  //   console.log(data.centres);
  data.centres.forEach((element) => {
    delete element['id'];
  });
  //   console.log(data.centres);
  appendData(data.centres);
};
getData();

appendData = (data) => {
  data.forEach((element) => {
    const obj = Object.keys(element);
    const tr = document.createElement('tr');
    obj.forEach((key) => {
      const td = document.createElement('td');
      const divtHead = document.createElement('div');
      const divData = document.createElement('div');
      divtHead.className = 'tab__tbody--div';
      divtHead.textContent = key === 'name' ? 'Center' : key === 'Place' ? 'City' : 'State';
      divData.textContent = element[key];
      td.append(divtHead, divData);
      tr.append(td);
      document.querySelector('tbody').append(tr);
    });
    // document.querySelector('.hi').append(tr);
  });
};
