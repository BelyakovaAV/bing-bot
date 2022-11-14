// ==UserScript==
// @name         bing-bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Задание 14. Основные элементы языка JavaScript
// @author       Belyakova Anastasiya
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let search_icon = document.getElementById("search_icon");
let keywords = ["Первые в России автоматизированные склады временного хранения вещей", "Сдаем в аренду мини-склады для хранения", "доступ к вашему боксу 24 часа, 7 дней в неделю"];
let keyword = keywords[getRandom(0, keywords.length)];


if (search_icon !== null) {
  document.getElementById("sb_form_q").value = keyword;
  search_icon.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("kladovkin.ru") !== -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
