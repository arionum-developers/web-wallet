$( "#address" ).val( address );
$( "#public" ).val( publickey );

$( "#generate-button" ).click( function () {
  $( "#private" ).val( privatekey );
} );


$( "#generate-qr-button" ).click( function () {
  $( "#dialoguePopup" ).modal();
  $( "#dialoguetitle" ).text( "Arionum Mobile Login QR Code" );
  console.log( "https://cubedpixels.net/qr/generator.php?Address=" + address + "&PrivateKey=" + privatekey + "&PublicKey=" + publickey );
  $( "#modal-body" ).html( "<img src='https://cubedpixels.net/qr/generator.php?Address=" + address + "&PrivateKey=" + privatekey + "&PublicKey=" + publickey + "''></img>" );
} );