let cardContainer = document.querySelector(".cards-container");

initialDataRender();

async function initialDataRender() {
  let response = await fetch("/data.JSON");
  let data = await response.json();
  //   console.log(data);

  for (let i of data) {
    let html = "";
    let section = document.createElement("section");
    section.classList.add("card-top");
    if (i.title == "Work") {
      section.classList.add("work");
    } else if (i.title == "Play") {
      section.classList.add("play");
    } else if (i.title == "Study") {
      section.classList.add("study");
    } else if (i.title == "Exercise") {
      section.classList.add("exercise");
    } else if (i.title == "Social") {
      section.classList.add("social");
    } else if (i.title == "Self Care") {
      section.classList.add("self-care");
    }

    let iconPath = i.title.toLowerCase().replace(" ", "-");
    html += `<img src="images/icon-${iconPath}.svg" alt="icon" class="icon"/>
      <div class="card-info">
        <div class="card-info-top">
          <p>${i.title}</p>
          <img src="images/icon-ellipsis.svg" alt="three-dots" class="dots" />
        </div>
        <div class="card-info-bottom">
          <p class="hours">${i.timeframes.weekly.current}hrs</p>
          <p class="date-info">Last week - ${i.timeframes.weekly.previous}hrs</p>
        </div>
      </div>`;
    section.innerHTML = html;
    cardContainer.appendChild(section);
  }
}

const button = document.querySelectorAll(".button");

for (let i of button) {
  i.addEventListener("click", getData);
}

function getData(e) {
  let clickedButton = e.target;
  buttonText = clickedButton.innerText.toLowerCase();

  fetchData();

  async function fetchData() {
    let response = await fetch("/data.JSON");
    let data = await response.json();

    let hours = document.querySelectorAll(".hours");
    let timeInfo = document.querySelectorAll(".date-info");
    let infoDiv = document.querySelectorAll(".card-info-bottom");

    if (buttonText == "daily") {
      for (let j = 0; j < hours.length; j++) {
        infoDiv[j].style.animation = "none";
        infoDiv[j].offsetHeight;
        infoDiv[j].style.animation = "fly-out 0.6s normal ease";
        hours[j].innerHTML = `${data[j].timeframes.daily.current}hrs`;
        infoDiv[j].style.animation = "fly-in 0.6s normal ease";
      }
      for (let z = 0; z < timeInfo.length; z++) {
        timeInfo[z].innerHTML = `Last day - ${data[z].timeframes.daily.previous}hrs`;
      }
    }

    if (buttonText == "weekly") {
      for (let j = 0; j < hours.length; j++) {
        infoDiv[j].style.animation = "none";
        infoDiv[j].offsetHeight;
        infoDiv[j].style.animation = "fly-out 0.6s normal ease";
        hours[j].innerHTML = `${data[j].timeframes.weekly.current}hrs`;
        infoDiv[j].style.animation = "fly-in 0.6s normal ease";
      }
      for (let z = 0; z < timeInfo.length; z++) {
        timeInfo[z].innerHTML = `Last week- ${data[z].timeframes.weekly.previous}hrs`;
      }
    }

    if (buttonText == "monthly") {
      for (let j = 0; j < hours.length; j++) {
        infoDiv[j].style.animation = "none";
        infoDiv[j].offsetHeight;
        infoDiv[j].style.animation = "fly-out 0.6s normal ease";
        hours[j].innerHTML = `${data[j].timeframes.monthly.current}hrs`;
        infoDiv[j].style.animation = "fly-in 0.6s normal ease";
      }
      for (let z = 0; z < timeInfo.length; z++) {
        timeInfo[z].innerHTML = `Last month - ${data[z].timeframes.monthly.previous}hrs`;
      }
    }
  }
}
