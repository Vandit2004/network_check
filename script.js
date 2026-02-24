let popup = document.querySelector(".popup")
let wifiIcon = document.querySelector(".icon i")
let  title = document.querySelector(".popup .title")
let desc = document.querySelector(".popup .desc")
let reconnect = document.querySelector(".reconnect")
let isOnline = true,intervalId,timer = 10;
async function checkConnection(){
    try{
        let url = "https://jsonplaceholder.typicode.com/posts"
        let response = await fetch(url)
        isOnline = response.status>=200 && response.status<300
    }
    catch(err){
        isOnline = false
    }
    timer=10
    clearInterval(intervalId)
    handlepopup(isOnline)
}
function handlepopup(status){
    if(status){
       
        wifiIcon.className = "uil uil-wifi"
        title.innerHTML ="Restored Connection"
        desc.innerHTML = "your device is now successfully connect to the internet"
        popup.classList.add("online")
        return setTimeout(()=>{
            popup.classList.remove("show")
        },2000)
    }
    wifiIcon.className = "uil uil-wifi-slash"
    title.innerHTML = "Lost Connection"
    desc.innerHTML = "Your network is unavailable.we will attempt to reconnect you in <b>10</b> seconds</p>"
    popup.className ="popup show"
    intervalId = setInterval(()=>{
        timer--
        if(timer==0){
            checkConnection()
        }
        popup.querySelector(".desc b").innerHTML = timer
    },1000)
}
setInterval(()=>isOnline && checkConnection(),3000)
reconnect.addEventListener("click",checkConnection)
