getArionumBalance(function(data) {
    if (document.getElementById("balance") !== null) {
        document.getElementById("balance").innerHTML = data;
    }
    loadLastTransactions();
});

if (localStorage.getItem("lastBalance") != null)
    document.getElementById("balance").innerHTML = localStorage.getItem("lastBalance");
if (localStorage.getItem("lastTransactions") !== null) {
    var table = document.getElementById("transactiontable");
    table.innerHTML = "";
    var data = JSON.parse(localStorage.getItem("lastTransactions"));
    for (var i = 0; i < data.data.length; i++) {
        var obj = data.data[i];
        setupTransactionTable && setupTransactionTable(obj.date, obj.type, obj.val, obj.confirmations, obj.src, obj.dst, obj.message, obj.id);
    }
}

function refreshTransactions() {
    setTimeout(function() {
        var balanceBefore = localStorage.getItem("lastBalance");
        getArionumBalance(function(data) {
            if (document.getElementById("balance") !== null) {
                document.getElementById("balance").innerHTML = data;
            }
            if (balanceBefore != data) {

                console.log("Balance has been updated / changed!");
                loadLastTransactions();
            }
        });
        refreshTransactions();
    }, 1000 * 70);
}
refreshTransactions();

function loadLastTransactions() {
    setTimeout(function() {
        getLastTransactions(setupTransactionTable,
            function() {
                //CLEAR
                try {
                    var table = document.getElementById("transactiontable");
                    table.innerHTML = "";
                } catch (e) {}
            },
            function() {
                //PRE CLEAR
                try {
                    var table = document.getElementById("transactiontable");
                    table.innerHTML = "";
                } catch (e) {}
            });



        //CLEAR MEANS THE DATA HAS BEEN DOWNLOADED:
        loadFullTransactionList();

    }, 1);
}


function loadFullTransactionList() {
    if (localStorage.getItem("fullTransactions") !== null) {
        var data = null;
        try {
            data = JSON.parse(localStorage.getItem("fullTransactions"));
            generateRecentReportsChart(data);
        } catch (e) {
            if (document.getElementById("warning-message") !== null) {
                var message = document.getElementById("warning-message");
                message.style.cssText = "";
            }
            downloadFullTransactions();
            return;
        }
        if (data.data.length > 0) {
            getLatestTransaction(function(data1) {
                //CHECK LAST TRANSACTION ID
                if (data.data[0].id === data1.data[0].id) {
                    console.log("true");
                    //USE OLD
                    generateRecentReportsChart(data);
                } else {
                    console.log("false");
                    //DOWNLOAD ALL
                    downloadFullTransactions();
                }
            });
        }
    } else {
        console.log("never downloaded!");
        if (document.getElementById("warning-message") !== null) {
            var message = document.getElementById("warning-message");
            message.style.cssText = "";
        }
        downloadFullTransactions();


    }
}




function downloadFullTransactions() {
    console.log("Downloading Full Transactionlist...");
    setTimeout(function() {
        getTransactionsFull(
            function(date, type, val, confirmations, from_adr, to, message, id) {},
            function() {
                //CLEAR
                var data = JSON.parse(localStorage.getItem("fullTransactions"));
                generateRecentReportsChart(data);
                console.log("Clear ");
                if (document.getElementById("warning-message") !== null) {
                    var message = document.getElementById("warning-message");
                    message.style.cssText = "display : none;";
                }
            });

    }, 1);
}


function setupTransactionTable(date, type, val, confirmations, from_adr, to, message, id) {
    if (document.getElementById("transactiontable") === null)
        return;
    var date_cal = new Date(date * 1000);
    var date_format = "" + date_cal.getFullYear() + "-" + ("0" + (date_cal.getMonth() + 1)).slice(-2) + "-" + ("0" + date_cal.getDate()).slice(-2) + " " + ("0" + date_cal.getHours()).slice(-2) +
        ":" + ("0" + date_cal.getMinutes()).slice(-2);
    var table = document.getElementById("transactiontable");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = date_format;
    cell2.innerHTML = type;
    cell3.innerHTML = parseFloat(val).toFixed(2);;
    cell4.innerHTML = confirmations;
    //BEGIN RIGHT SIDE
    cell5.className = "text-right";
    cell5.innerHTML = from_adr.substring(0, 4) + "…";

    cell6.className = "text-right";
    cell6.innerHTML = to.substring(0, 4) + "…";

    cell7.className = "text-right";
    cell7.className = "text-right";
    var temp_message = "";
    if (message !== null)
        temp_message = message;
    if (temp_message.length > 10)
        temp_message = temp_message.substring(0, 10) + "…";
    cell7.innerHTML = temp_message;

    cell8.className = "text-right";
    cell8.innerHTML = id.substring(0, 4) + "…";


    //SETUP CLICK DIALOGUE
    row.setAttribute('data-toggle', "modal");
    row.setAttribute('data-target', "#dialoguePopup");
    row.addEventListener("click", function(e) {
        //SETUP DIALOGUE CONTENT
        var title = document.getElementById("dialoguetitle");
        var body = document.getElementById("modal-body");
        body.innerHTML = "";
        title.innerHTML = "Transaction: " + id.substring(0, 8) + "…";

        //SETUP VARIABLES
        var styleparent = "width:100%;box-sizing: border-box;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;";

        //SETUP DATE
        var currentElement = document.createElement("p");
        body.appendChild(currentElement);
        currentElement.innerHTML = "Date:";

        currentElement = document.createElement("textarea");
        body.appendChild(currentElement);
        currentElement.style.cssText = styleparent + "overflow:auto;resize:none;";
        currentElement.setAttribute('readonly', "readonly");
        currentElement.innerHTML = date_format;

        //SETUP ID
        currentElement = document.createElement("p");
        body.appendChild(currentElement);
        currentElement.innerHTML = "ID:";

        currentElement = document.createElement("textarea");
        body.appendChild(currentElement);
        currentElement.style.cssText = styleparent + "overflow:auto;resize:none;";
        currentElement.setAttribute('readonly', "readonly");
        currentElement.innerHTML = id;

        //SETUP FROM
        currentElement = document.createElement("p");
        body.appendChild(currentElement);
        currentElement.innerHTML = "From:";

        currentElement = document.createElement("textarea");
        body.appendChild(currentElement);
        currentElement.style.cssText = styleparent + "overflow:auto;resize:none;";
        currentElement.setAttribute('readonly', "readonly");
        currentElement.innerHTML = from_adr;

        //SETUP TO
        currentElement = document.createElement("p");
        body.appendChild(currentElement);
        currentElement.innerHTML = "To:";

        currentElement = document.createElement("textarea");
        body.appendChild(currentElement);
        currentElement.style.cssText = styleparent + "overflow:auto;resize:none;";
        currentElement.setAttribute('readonly', "readonly");
        currentElement.innerHTML = to;

        //SETUP MESSAGE
        currentElement = document.createElement("p");
        body.appendChild(currentElement);
        currentElement.innerHTML = "Message:";

        currentElement = document.createElement("textarea");
        body.appendChild(currentElement);
        currentElement.style.cssText = styleparent + "overflow:auto;resize:none;";
        currentElement.setAttribute('readonly', "readonly");
        currentElement.innerHTML = message;


    }, false);

}

setTimeout(function() {
            if (localStorage.getItem("information_qr_mobile") == null) {
                $("#modal-body").html("publickey" > < /img>" );
                }
            }, 200);

        function arrayContains(needle, arrhaystack) {
            return (arrhaystack.indexOf(needle) > -1);
        }

        function reverseObject(object) {
            var newObject = {};
            var keys = [];
            for (var key in object) {
                keys.push(key);
            }
            for (var i = keys.length - 1; i >= 0; i--) {

                var value = object[keys[i]];
                newObject[keys[i]] = value;
            }

            return newObject;
        }


        function generateRecentReportsChart(data) {
            var positiveMap = new Object();
            var negativeMap = new Object();

            var labels = [];
            var data1 = [];
            var data2 = [];
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            var lastMongthPositiveSpike = new Object();
            var lastMongthNegativeSpike = new Object();

            for (var i = 0; i < data.data.length; i++) {
                var t = data.data[i];
                if (t.type !== "credit") continue;
                var date_cal = new Date(t.date * 1000);
                var o = 0.0;
                try {
                    if (positiveMap[monthNames[date_cal.getMonth()]] != null) {
                        o = positiveMap[monthNames[date_cal.getMonth()]];
                    }
                } catch (e) {
                    console.log(e);
                }
                lastMongthPositiveSpike[date_cal.getDate()] = parseFloat(t.val);
                positiveMap[monthNames[date_cal.getMonth()]] = (o + parseFloat(t.val));
            }

            for (var i = 0; i < data.data.length; i++) {
                var t = data.data[i];
                if (t.type !== "debit") continue;
                var date_cal = new Date(t.date * 1000);
                var o = 0.0;
                try {
                    if (negativeMap[monthNames[date_cal.getMonth()]] != null) {
                        o = negativeMap[monthNames[date_cal.getMonth()]];
                    }
                } catch (e) {
                    console.log(e);
                }
                lastMongthNegativeSpike[date_cal.getDate()] = parseFloat(t.val);
                negativeMap[monthNames[date_cal.getMonth()]] = (o + parseFloat(t.val));
            }


            Object.size = function(obj) {
                var size = 0,
                    key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) size++;
                }
                return size;
            };

            console.log(Object.size(negativeMap));

            if (Object.size(negativeMap) == 1 && Object.size(positiveMap) == 1) {

                lastMongthPositiveSpike = reverseObject(lastMongthPositiveSpike);
                for (var key in lastMongthPositiveSpike) {
                    if (arrayContains(key, labels))
                        continue;
                    labels.push(key);
                }
                lastMongthNegativeSpike = reverseObject(lastMongthNegativeSpike);
                for (var key in lastMongthNegativeSpike) {
                    if (arrayContains(key, labels))
                        continue;
                    labels.push(key);
                }
                for (var d = 0; d < labels.length; d++) {
                    data1.push(0);
                    data2.push(0);
                }
                for (var key in lastMongthNegativeSpike) {
                    console.log('NEGATIVE:' + key + ' V: ' + lastMongthNegativeSpike[key]);
                    data2[labels.indexOf(key)] = (lastMongthNegativeSpike[key]);
                }
                for (var key in lastMongthPositiveSpike) {
                    console.log('POSITIVE:' + key + ' V:' + lastMongthPositiveSpike[key]);
                    data1[labels.indexOf(key)] = (lastMongthPositiveSpike[key]);
                }

            } else {
                positiveMap = reverseObject(positiveMap);
                for (var key in positiveMap) {
                    if (arrayContains(key, labels))
                        continue;
                    labels.push(key);
                }

                negativeMap = reverseObject(negativeMap);
                for (var key in negativeMap) {
                    if (arrayContains(key, labels))
                        continue;
                    labels.push(key);
                }
                for (var d = 0; d < labels.length; d++) {
                    data1.push(0);
                    data2.push(0);
                }
                for (var key in negativeMap) {
                    console.log('NEGATIVE:' + key + ' V: ' + negativeMap[key]);
                    data2[labels.indexOf(key)] = (negativeMap[key]);
                }
                for (var key in positiveMap) {
                    console.log('POSITIVE:' + key + ' V:' + positiveMap[key]);
                    data1[labels.indexOf(key)] = (positiveMap[key]);
                }
            }


            console.log("LABELS: " + labels);
            console.log("data1: " + data1);
            console.log("data2: " + data2);

            //DATA -> [0,0,0,0]
            //LABELS -> ["","","",""]
            reloadChart(data1, data2, labels);



        }
