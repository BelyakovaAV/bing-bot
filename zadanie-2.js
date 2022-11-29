// ==UserScript==
// @name         bing-bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Задание 14. Основные элементы языка JavaScript
// @author       Belyakova Anastasiya
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://kladovkin.ru/*
// @match        https://motoreforma.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let btnBing = document.getElementById("search_icon");

let sites = {
  "napli.ru":["Установка и настройка Git", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", 	"Вывод произвольных типов записей и полей в WordPress"],
  "kiteuniverse.ru":["Kite Universe", "Ветровые арт инсталляции", "Фестиваль воздушных змеев"],
  "motoreforma.com":["Мотореформа", "прошивки для CAN-AM", "тюнинг для квадроциклов CAN-AM", "вариатор CV-Tech для Can-Am"]
}
let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];

if (btnBing !== null) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

if (btnBing !== null) {
  let i = 0;

  let timerId = setInterval (()=> {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnBing.click();
    }
  },300)

  } else if (location.hostname == site) {

    setInterval(() =>{
      let index = getRandom(0, links.length);
      if (getRandom(0,101) > 70) {
        location.href = "https://www.bing.com/";
      } else if (links[index].href.indexOf(site) !== -1) {
      links[index].click();
      };
    }, getRandom(3000,5000));

  } else {
    let nextBingPage = true;

    for (let i = 0; i < links.length; i++) {
      if (links[i].href.indexOf(site) !== -1) {
        let link = links[i];
        nextBingPage = false;
        console.log("Нашел строку " + link);
        setTimeout(()=>{
          link.click();
        }, getRandom(2000,3000));
        break;
      }
    }
    let elementExist = setInterval(()=>{
      let elem = document.querySelector(".sb_pagS");

      if (elem != null) {
        if(elem.innerHTML == 5) {
          nextBingPage = false;
          location.href = "https://www.bing.com/";
        }
        clearInterval (elementExist)
      }
    },400);

    if (nextBingPage) {
      setTimeout(()=>{
        let btnNextPage = document.querySelector(".sb_pagN");
      btnNextPage.click();
      }, getRandom(3000, 4000))
    }
  }
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;

};


