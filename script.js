// ----- data -----

let totalSold = 0;
let menu = [];

// ----- elements -----

const openButton = document.getElementById("open-button");
const statusLine = document.getElementById("status");
const totalSoldLine = document.getElementById("total-sold");
const menuForm = document.getElementById("menu-form");
const itemNameInput = document.getElementById("item-name");
const itemDescriptionInput = document.getElementById("item-description");
const menuList = document.getElementById("menu-list");
const locationInput = document.getElementById("location-input");
const setLocationButton = document.getElementById("set-location-button");
const locationDisplay = document.getElementById("location-display");
const closeButton = document.getElementById("close-button")

// ----- functions -----

function renderMenu() {
  menuList.replaceChildren();
  menu.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.classList.add("text-shadow-lg/50");
    if (item.soldOut) {
      listItem.classList.add("sold-out");
    }
    listItem.append(item.name);
    const saleButton = document.createElement("button");
    saleButton.type = "button";
    saleButton.textContent = "Sold";
    saleButton.classList.add(
      "border",
      "px-2",
      "py-1",
      "rounded-md",
      "ml-2",
      "bg-linear-to-r",
      "from-[#49e4ff]",
      "to-[#ff4ce7]"
    );
    saleButton.addEventListener("click", function (event) {
      event.stopPropagation();
      totalSold += 1;
      totalSoldLine.textContent = "Total sold: " + totalSold;
    });
    listItem.append(saleButton);

    if (!item.soldOut) {
      listItem.addEventListener("click", function () {
        item.soldOut = true;
        renderMenu();
      });
    }

    if (item.description) {
      const description = document.createElement("p");
      description.textContent = item.description;
      listItem.append(description);
    }

    menuList.append(listItem);
  });
}

// ----- listeners -----
openButton.addEventListener("click", function () {
  statusLine.textContent = "Open";
  statusLine.classList.remove("closed");
  statusLine.classList.add("open");

});

closeButton.addEventListener("click", function () {
  statusLine.textContent = "Close";
  statusLine.classList.add("closed");
  statusLine.classList.remove("open");

});

function setLocation() {
  const location = locationInput.value.trim();
  if (location) {
    locationDisplay.textContent = "Today's location: " + location;
    locationInput.value = "";
  }
}

setLocationButton.addEventListener("click", setLocation);
locationInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    setLocation();
   
  }
});

function addMenuItem(event) {
  event.preventDefault();
  const name = itemNameInput.value.trim();
  const description = itemDescriptionInput.value.trim();
  if (!name || !description) {
    return;
  }

  menu.push({
    name: name,
    description: description,
  });
  renderMenu();
  menuForm.reset();
}

menuForm.addEventListener("submit", addMenuItem);
itemDescriptionInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addMenuItem(event);
  }
});

// ----- run at load -----

renderMenu();