// atributes for today_pic.html
var button = document.querySelector('#Get'); 
var feedback = document.querySelector('#msg');
var loadingDiv_today_pic = document.querySelector('#loading_pic');
var historyArray = [];
var today =  new Date().toLocaleDateString();
var done = false;


// function for today_pic.html
// event hendler for button
button.onclick = function (event) {
    if (done==false) {
        //show loading alert
        loadingDiv_today_pic.classList.remove('d-none');
        // api from https://api.nasa.gov/
        myJsonContent = fetch('https://api.nasa.gov/planetary/apod?api_key=caDR0OrlyRGP4bobbpaUs4iYlh4wrAWNrzz3SVNr')
           .then(function (response) {
                return response.json();
            })
          .then(function (myJson) {
                feedback.value = myJson.explanation + '©Copy right: ' + myJson.copyright ;
                var img = new Image();
                img.src = myJson.url;
                img.setAttribute("class", "img-responsive");
                img.setAttribute("alt", myJson.title);
                document.getElementById("img-space").appendChild(img);
                done = true;
                // analyze if exist the local storage and if is not alreadz today value
                if (ls){
                    historyArray = JSON.parse(ls);
                    if (historyArray[0].date != today) {
                        historyArray.unshift({ date: today, atitle: myJson.title, URL: myJson.url });
                        // save history to local storage
                        localStorage.setItem('history',JSON.stringify(historyArray));
                      }
                  }
                else {
                    historyArray.unshift({ date: today, atitle: myJson.title, URL: myJson.url });
                    localStorage.setItem('history',JSON.stringify(historyArray));
                }
                
                // hide loading alert
                loadingDiv_today_pic.classList.add('d-none');
            });   
    }   else  alert("You are trying to get information, Which you already have. Please thinking about yourself ! ");      
}