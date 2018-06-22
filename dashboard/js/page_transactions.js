loadFullTransactionList();

function loadFullTransactionList() {
    downloadFullTransactions(false);
    if (localStorage.getItem("fullTransactions") !== null) {
        try {
            var data = JSON.parse(localStorage.getItem("fullTransactions"));
        } catch (e) {
            if (document.getElementById("warning-message") !== null) {
                var message = document.getElementById("warning-message");
                message.style.cssText = "";
            }
            downloadFullTransactions(true);
            return;
        }
        if (data.data.length > 0) {
            getLatestTransaction(function(data1) {
                //CHECK LAST TRANSACTION ID
                if (data.data[0].id === data1.data[0].id) {
                    console.log("true");
                    //USE OLD
                    downloadFullTransactions(false);
                } else {
                    console.log("false");
                    //DOWNLOAD ALL
                    downloadFullTransactions(true);
                }
            });
        }
    } else {
        console.log("never downloaded!");
        if (document.getElementById("warning-message") !== null) {
            var message = document.getElementById("warning-message");
            message.style.cssText = "";
        }
        downloadFullTransactions(true);


    }
}

function downloadFullTransactions(download) {
    if (!download)
        console.log("Loading Transactionlist...");
    else
        console.log("Downloading Full Transactionlist...");
    setTimeout(function() {
        getTransactionsFull(
            function(date, type, val, confirmations, from_adr, to, message, id) {
                if (document.getElementById("transactiontable") === null)
                    return;
                var date_cal = new Date(date * 1000);
                var date_format = "" + date_cal.getFullYear() + "-" + ("0" + date_cal.getMonth()).slice(-2) + "-" + ("0" + date_cal.getDate()).slice(-2) + " " + ("0" + date_cal.getHours()).slice(-2) +
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

            },
            function() {
                //CLEAR
                try {
                    var table = document.getElementById("transactiontable");
                    table.innerHTML = "";
                } catch (e) {}
                console.log("Clear ");
                if (document.getElementById("warning-message") !== null) {
                    var message = document.getElementById("warning-message");
                    message.style.cssText = "display : none;";
                }
            }, download);

    }, 1);
}