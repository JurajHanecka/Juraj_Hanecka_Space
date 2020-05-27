
var ls = localStorage.getItem('history');
var historyAvailable = document.querySelector('#navlinkdisabled');

if (ls) {
    historyAvailable.setAttribute("aria-disabled","false");
    historyAvailable.classList.remove('disabled');
    var arrItems = JSON.parse(ls); // The array to store JSON items.

    $(document).ready(function () {
        $('#btShowImage').click(function () {

        // Extract values for the table header.
        var col = [];
        for (var i = 0; i < arrItems.length; i++) {
            for (var key in arrItems[i]) {
                if (col.indexOf(key) === -1) {
                col.push(key);
                }
            }
        }

        // Create a <table> element dynamically.
        var table = document.createElement("table");

        var tr = table.insertRow(-1);  // Table row.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // Table header.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

         // Add JSON data to the table as rows.
        for (var i = 0; i < arrItems.length; i++) {
            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (j === 2) {      // The last JSON column has image urls.

                 // Create an <img> element to show the images.
                 var img = document.createElement('img');        
                    img.src = arrItems[i].URL;   // The image source from JSON array.
                 tabCell.appendChild(img);
                }
                else
                    tabCell.innerHTML = arrItems[i][col[j]];
            }
        }

        // Finally, add the newly created <table> with data to a container.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
        });
        
    });

}

