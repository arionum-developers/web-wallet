$( "#address" ).val( address );
$( "#public" ).val( publickey );

$( "#generate-button" ).click( function () {
  $( "#private" ).val( privatekey );
} );


$( "#generate-qr-button" ).click( function () {
  $( "#dialoguePopup" ).modal();
  $( "#dialoguetitle" ).text( "Arionum Mobile Login QR Code" );
  new QRCode(document.getElementById("modal-body"), address+"|"+privatekey+"|"+publickey);
} );
