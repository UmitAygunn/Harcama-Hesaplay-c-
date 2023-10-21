// ! HTML' den Gelenler

const addBtn = document.getElementById("add-btn");
const priceInp = document.getElementById("price-inp");
const titleInp = document.getElementById("title-inp");
const list = document.querySelector("#list");
const checkBox = document.querySelector("#checked");
const totalSpan = document.querySelector("#price-info");
const select = document.querySelector("select");
const userInp = document.querySelector("#user-inp");

// ! Olay İzleyicileri

addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInp.addEventListener("change", saveUser);
document.addEventListener("DOMContentLoaded", getUser);

// ! Fonksiyonlar

// Toplam Fiyat Bilgisi

let totalPrice = 0;

// Hem toplam değişkeni hem arayüzü göncelleyen fonksiyon

function updateTotal(price) {
  // Js'de tutulan değişkeni güncelle

  totalPrice += price;

  // Html'deki toplam alanı güncelle

  totalSpan.innerText = totalPrice;
}

// Yeni Harcama EKler

function addExpense(event) {
  // Sayfayı Yenilemeyi Engelleme

  event.preventDefault();

  // İnputların değerlerine erişme

  const title = titleInp.value;
  const price = priceInp.valueAsNumber;

  //! 1- İnputlardan biri dahi boşsa alert ver ve fonksiyonu durdur.

  if (!title || !price) {
    alert("Please fill in the blank!");
    return;
  }

  // ! 2- İnputlar doluysa bir kart oluştur ve html' e ekle
  // A- Div Oluşturma:

  const expenseDiv = document.createElement("div");

  // B- Class Ekleme:

  expenseDiv.classList.add("expense");

  if (checkBox.checked === true) {
    expenseDiv.classList.add("paid");
  }

  // C- Div'in içeriğini belirleme

  expenseDiv.innerHTML = `

<h2 id="title">${title}</h2>
 <h2 id="price">${price}</h2>
 <div class="btns">
   <img id="update" src="iamges/money.png" />
   <img id="delete" src="iamges/delete.png" />
 </div>
`;

  // D- Oluşan kartı html'e gönder

  list.appendChild(expenseDiv);

  // E- Toplamı güncelle

  updateTotal(price);

  //! 3- İnputları Temizleme

  titleInp.value = "";
  priceInp.value = "";
  checkBox.checked = false;
}

// Harcamayı siler ve günceller

function handleUpdate(event) {
  // Tıklanılan Eleman

  const ele = event.target;

  // Tıklanılan butonun kartına ulaşma

  const parent = ele.parentElement.parentElement;

  // Tıklanılan elemanın id'si delete ise çalışır

  if (ele.id === "delete") {
    // Sildiğimiz elemanın fiyatına erişme

    const price = Number(parent.children[1].innerText);

    // Toplamdan sildiğimiz fiyatı çıkarma

    updateTotal(-price);

    // Elemanı html'den kaldırma

    parent.remove();
  }

  // Tıklanılan eleman güncelle ise

  if (ele.id === "update") {
    parent.classList.toggle("paid"); // Yoksa ekler varsa kaldırır.(Toggle)
  }
}

// Note'ları filtreler

function handleFilter(event) {
  const selected = event.target.value;

  // Listedeki elemanlara eriş

  const items = list.childNodes;

  // Listedeki her bir eleman için switch ile
  // yapacağımız sorgu elemanını hangisinin gözükeceğine karar vermek.

  items.forEach((item) => {
    // Seçilen değere göre yapılacak işleme karar verme

    switch (selected) {
      case "all":
        // Class'ı paid olsada olmasada göster
        item.style.display = "flex";
        break;
      case "paid":
        // Class'ında paid olmayanlar gizlenecek
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-paid":
        // Class'ında paid olanlar gizlenecek
        if (!item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
    }
  });
}

// Kullanıcıyı kaydeder

function saveUser(event) {
  localStorage.setItem = ("username", event.target.value);
}

// Kullanıcıyı localden alıp inputa yazar

function getUser() {
  // LocalStorage'den ismi al

  const userName = localStorage.getItem("username") || "";

  // Kullanıcı ismini inputa aktar

  userInp.value = userName;
}
