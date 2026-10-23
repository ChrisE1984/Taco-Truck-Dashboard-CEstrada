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

// ----- functions -----

function renderMenu() {
  menuList.replaceChildren();
  menu.forEach(function (item) {
    const listItem = document.createElement("li");
    if (item.soldOut) {
      listItem.classList.add("sold-out");
    }
    listItem.append(item.name);
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

function setLocation() {
  const location = locationInput.value.trim();
  if (location) {
    locationDisplay.textContent = "Today's location: " + location;
  }
}

setLocationButton.addEventListener("click", setLocation);

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
  totalSold = totalSold + 1;
  totalSoldLine.textContent = "Total sold: " + totalSold;
  renderMenu();
  menuForm.reset();
}

menuForm.addEventListener("submit", addMenuItem);

// ----- run at load -----

renderMenu();