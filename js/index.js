const catCinsUrl = "https://api.thecatapi.com/v1/breeds";

axios.defaults.headers.common["x-api-key"] =
  "live_zDHJuHHMkAASIMs43WhJO7f5EAVy1PCxNmtK2iVk80v7pbBIFUmCN8xHFuiTGZd2";

let catList = [];
const formCats = document.querySelector(".formCats");
const catCinsName = document.querySelector(".catCinsName");
const catFoto = document.querySelector(".catFoto");
const catDescription = document.querySelector(".catDescription");

let catsArray = [];

const fetchBreeds = async () => {
  const res = await axios.get(catCinsUrl);
  console.dir(res.data);
  catList = res.data;

  catDescription.textContent = res.data[0].description;
  return res.data;
};

async function cinsleriListeYaz(cinsArr) {
  cinsArr.forEach((element) => {
    const opt = document.createElement("option");

    if (element.image != undefined) {
      opt.value = element.image.url;
    } else {
      opt.value =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCunw047IIl7tK-vDnMach9YZIfpSYShd1Ew&usqp=CAU";
    }

    opt.text = element.name;

    catCinsName.appendChild(opt);
  });
}

async function MainFunction() {
  const cinsArr = await fetchBreeds();
  catsArray = cinsArr;
  cinsleriListeYaz(cinsArr);
}

catCinsName.addEventListener("change", (e) => {
  catsArray.forEach((element, i) => {
    if (element.name == catCinsName[catCinsName.selectedIndex].textContent) {
      catDescription.textContent = element.description;
    }
  });

  catFoto.src = catCinsName.value;
});

MainFunction();
