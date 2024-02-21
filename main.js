
// // ES5
// function hello() {
//   console.log('Hello 500 anh em lop web38');
// }
// hello();

// // ES6
// const hi = () => {
//   console.log('anh em nay khoe khong!');
// }
// hi();

// // IIFE ES5
// (function () {
//   //Code thuc thi
//   console.log('abcd!');

// })();
// // cach su dung voi pram truyen vao
// (function (x, y) {
//   let a = 10;
//   console.log(x + y);
//   console.log(a); //10
// })(3, 4);
// console.log(a);








// Lam chuc nang phan trang
const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// B1: Truy cap phan tu
const curPageEl = document.querySelector("#curPage");
const dataContainer = document.querySelector("#data");

// B2: Function Lay du lieu ve tu API
const fetchData = async (API_URL) => {
  const res = await axios.get(API_URL);
  return res.data
}

// B3:  Hien thi du lieu ra giao dien

// ==== Set 1 so gia tri mac dinh
let itemsPerPage = 15; //So luong hien thi bai viet tren trang
let currentPage = 1; //Trang hien tai

// === Hien thi du lieu tra ve tu api (serve)
const displayData = (data, page) => {
  currentPage = page; //Cap nhat lai trang
  curPageEl.innerHTML = currentPage; //Hien thi no ra h1
  dataContainer.innerHTML = ''; //Xoa du cu
  // Vi tri bat dau va ket thuc cac muc hien thi tren trang
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // Loc du lieu tu mang data de hien thi ra trang voi vi tri tren
  const itemsToDisplay = data.slice(start, end);
  // Hien thi itemsToDisplay len trang
  itemsToDisplay.forEach(item => {
    const itemElement = document.createElement("li"); //Tao 1 the ao
    itemElement.innerHTML = item.title; //Gan gia tri the ao

    dataContainer.appendChild(itemElement); //Hien thi ra gia dien
  });
}


// B4: Tao phan trang
const createPagination = (data) => {
  //Truy cap vao phan tu phan trang
  const paginationContainer = document.querySelector("#pagNums");
  paginationContainer.innerHTML = ''; //Xoa du cu

  // Tinh tong so trang cua minh - Math.ceil lam tron
  totalPages = Math.ceil(data.length / itemsPerPage); // 7


  // Them nut "next" va "prev" vao trang
  if (totalPages > 0) {
    const nextBtn = document.createElement("button"); //Tao nut button
    const prevBtn = document.createElement("button"); //Tao nut button

    // Them dung vao button
    nextBtn.textContent = "Next";
    prevBtn.textContent = "Prev";

    // Them su kien nguoi dung click vao 2 nut nay
    nextBtn.addEventListener("click", () => {
      if (totalPages > currentPage + 1) { //Kiem tra kp trang cuoi cung
        displayData(data, currentPage + 1);
      }
    });
    prevBtn.addEventListener("click", () => {
      if (0 < currentPage - 1) { //Kiem tra kp trang dau tien
        displayData(data, currentPage - 1);
      }
    });

    // Them nut next va prev ra ngoai giao dien
    paginationContainer.insertAdjacentElement("afterend", nextBtn);
    paginationContainer.insertAdjacentElement("beforebegin", prevBtn);

    // Them cac so trang cu the ra
    for(let i = 1; i <= totalPages; i++ ){
      const button = document.createElement("button"); //Tao nut trang moi
      button.textContent = i;

      // Bam vao chuyen sang trang moi
      button.addEventListener("click", ()=>{
        displayData(data, i);
      })

      // Hien thi ra
      paginationContainer.appendChild(button);
      

    }
  }

}


// Khoi tao IIFE - ES6 - Bang dieu khien
(async () => {
  try {

    const data = await fetchData(apiUrl); //Thuc thi fetchData()

    displayData(data, 1); //Thuc thi displayData ()

    createPagination(data); //Thu thi createPagination ()

  } catch (error) {

    dataContainer.innerHTML = "Du lieu tai ve that bai!";
    console.log(error);

  }
})()