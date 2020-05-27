// atributes for objects.html
var button_object = document.querySelector('#obj');
var userInputDate = document.querySelector('#Datefrom');
var resultInput = document.querySelector('#result');
var unit = "meters";
var table = document.getElementById('tableContents');
// ID loading je jiz v index.html pridane
var loadingDiv_object = document.querySelector('#loading_obj');
var today =  new Date().toLocaleDateString();


// function for objects.html
// event hendler for button
button_object.onclick = function (event){
    var stat = isDateHigher(today,userInputDate.value);
    console.log(today);
    console.log(userInputDate.value);
    console.log(stat);
    if (userInputDate.value != "" && stat == "false") {
        //show loading alert
        loadingDiv_object.classList.remove('d-none');
        // api from https://api.nasa.gov/
        myJsonContent = fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date='+ userInputDate.value +'&end_date='+ userInputDate.value +'&api_key=caDR0OrlyRGP4bobbpaUs4iYlh4wrAWNrzz3SVNr')
           .then(function (response) {
                return response.json();
            })
          .then(function (myJson) {
                var tableContents =[];
                var elem_count = myJson.element_count
                for (let i = 0; i < elem_count; i++) {
                    var object_name = myJson.near_earth_objects[userInputDate.value][i].name;
                    var min_diameter = Math.round(myJson.near_earth_objects[userInputDate.value][i].estimated_diameter[unit].estimated_diameter_min);
                    var max_diameter = Math.round(myJson.near_earth_objects[userInputDate.value][i].estimated_diameter[unit].estimated_diameter_max);
                    var estim_diameter = (min_diameter+max_diameter)/2;
                    tableContents[i] = '<tr><td>'+object_name+'</td><td>'+estim_diameter+'</td></tr>';
                }
                table.innerHTML = tableContents;
                // hide loading alert
                loadingDiv_object.classList.add('d-none');
            });
    }else  alert("You didn't choose the date or choose date from future ");
}

function isDateHigher(today,date){

    D1 = today.split('.'); 
    D2 = date.split('-');
    //D1.reverse();
    status = false;
    sumD1 = 0;
    sumD2 = 0;
    for (let i = 0; i < 3; i++) {
        sumD1 = (D1[i])*1 + sumD1;
        sumD2 = (D2[i])*1 + sumD2;
    }
    console.log(sumD1);
    console.log(sumD2);
    if (sumD2 > sumD1) {
        console.log("done if");
        status = true;
    }
return status
}