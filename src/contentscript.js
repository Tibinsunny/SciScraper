const changeUi = async () => { 
 let webUri =chrome.runtime.getURL("../imgs/loader.gif")
let innerDocument = document.querySelector("#LayoutWrapper > div > div > div > div.ng2-app > div > xpl-root > div > xpl-document-details > div > div.document-main.global-content-width-w-rr > div > div.document-main-content-container > section > div.document-main-left-trail-content")
let DOIFormater = document.querySelector("#LayoutWrapper > div > div > div > div.ng2-app > div > xpl-root > div > xpl-document-details > div > div.document-main.global-content-width-w-rr > div > div.document-main-content-container > section > div.document-main-left-trail-content > div > xpl-document-abstract > section > div.abstract-desktop-div.hide-mobile.text-base-md-lh > div.row.u-pt-1 > div:nth-child(2) > div.u-pb-1.stats-document-abstract-doi > a").href;
innerDocument.innerHTML = `<center><img src=${webUri} height="60px" width="60px"></center`
let getUrlData = await fetch(`https://enigmatic-lowlands-31426.herokuapp.com/?url=https://sci-hub.hkvisa.net/${window.location.href}`)
let dataResponse = await getUrlData.json()
innerDocument.innerHTML = `<iframe height=500 width=720 src=${dataResponse.url}>`
}
const collectLinks = () => {
    let link = window.location.href
    let title = (document.title).split("|")[0]
    chrome.storage.local.get(['linkData'],(data) => {
        if(data['linkData'])
        {
            if(data['linkData'].length>0)
            {
                 (data['linkData']).push({
                    link:link,
                    title:title
                })
                chrome.storage.local.set({linkData:data['linkData']},(data) => {
                   
                })
            }
            else
            {
                let insertData = [{
                    link:link,
                    title:title
                }]
                chrome.storage.local.set({linkData:insertData},()=> {
                   
                })
            }
        }
        else{
            let insertData = [{
                link:link,
                title:title
            }]
            chrome.storage.local.set({linkData:insertData},()=> {
               
            })
        }

        chrome.storage.local.get(['linkData'],(data) => {
         
        })
    })
}
const checkStatus = () => {
    chrome.storage.local.get(['extension-status'], function (data) {
        let status = data['extension-status']
        if(status === null)
    {
        chrome.storage.local.set({'extension-status': true}, function() {
        
          });
    }
    if(status ===true)
    {
        return true;
    }
    else
    {
        return false;
    }
    })
    
}
let webUri =chrome.runtime.getURL("../imgs/icons8-download-50.png")
chrome.storage.local.get(['extension-status','collector-status'], function (data) {
    if(data['extension-status'])
    {
        let buttonAdd = document.querySelector("#LayoutWrapper > div > div > div > div.ng2-app > div > xpl-root > div > xpl-document-details > div > div.document-main.global-content-width-w-rr > section.document-main-header.row > div > xpl-document-header > section > div.document-header-inner-container.row > div > div > div.document-main-subheader > div.document-header-metrics-banner.row > div.col-7-24.black-tooltip.hide-mobile > xpl-document-toolbar > div > div")
        buttonAdd.innerHTML += `<button id="btn-clickable"><img src='${webUri}'></button>`
        document.getElementById('btn-clickable').addEventListener("click",() => {
            changeUi()
            if(data['collector-status']){
            collectLinks()
            }
        })
 
    }

})
