let toggleBtn = document.getElementById("toggle-trigger");
let triggerBall = document.getElementById("trigger-ball");
chrome.storage.local.get(['extension-status','collector-status'],(data)=>{
let status = data['extension-status'];
let collectorStatus = data['collector-status'];
if(status)
{
    triggerBall.style.marginLeft="17px"
    triggerBall.style.marginRight="0px"
    triggerBall.style.backgroundColor = "green" 
}
else
{
    triggerBall.style.marginLeft="0px"
    triggerBall.style.marginRight="17px"
    triggerBall.style.backgroundColor = "red"  
}
if(collectorStatus)
{
    document.getElementById('link-collector').checked=true  
}
else
{
    document.getElementById('link-collector').checked=false
}
let tableContent = document.getElementById("table-content")
// chance of error here
chrome.storage.local.get(['linkData'],(data) => {
    if(data['linkData']!==undefined)
    {
        (data['linkData']).map((linkData) => {
            tableContent.innerHTML +=`<tr><td>${linkData.link}</td><td>${linkData.title}</td></tr>` 
        })
    }

 

})
})
toggleBtn.addEventListener("click",() => {
    let triggerBall = document.getElementById("trigger-ball");
    if(triggerBall.style.marginLeft === "17px")
    {
        triggerBall.style.marginLeft="0px"
        triggerBall.style.marginRight="17px"
        triggerBall.style.backgroundColor = "red"
        chrome.storage.local.set({'extension-status': false}, function() {
            console.log('value set');
          });
    }
    else
    {
        triggerBall.style.marginLeft="17px"
        triggerBall.style.marginRight="0px"
        triggerBall.style.backgroundColor = "green"
        chrome.storage.local.set({'extension-status': true}, function() {
            console.log('value set true');
          });

    } 
})
let linkCollectorDom = document.getElementById("link-collector")

linkCollectorDom.addEventListener("click",()=> {
if(linkCollectorDom.checked)
{
    chrome.storage.local.set({'collector-status':true})
}
else
{
    chrome.storage.local.set({'collector-status':false})
}
})
let deleteBtn = document.getElementById("delete-btn")
deleteBtn.addEventListener("click",() => {
    chrome.storage.local.set({linkData:""},() => {
        document.getElementById("table-content").innerHTML = ""
    })
})
