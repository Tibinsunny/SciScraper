let injectButton = document.querySelector(
  "#xplMainContentLandmark > div > xpl-document-details > div > div.document-main.global-content-width-w-rr > section.document-main-header.row.g-0 > div > xpl-document-header > section > div.document-header-inner-container.row.g-0 > div > div > div.document-main-subheader > div.document-header-metrics-banner.d-flex.flex-wrap > div.col-7-24.black-tooltip.hide-mobile > xpl-document-toolbar > div > div > ul",
);
let activeLink = "https://sci-hub.ru/";
let doiSelector = document.querySelector("a[append-to-href]");
activeLink += doiSelector.innerText;
let li = document.createElement("li");
let img = document.createElement("img");
li.addEventListener("click", (e) => {
  window.open(activeLink, "_blank");
});
img.src = chrome.runtime.getURL("imgs/icons8-download-50.png");
li.style.cursor = "pointer";
li.title = "Download";
li.appendChild(img);
injectButton.appendChild(li);
