
$( "#generate-button" ).click( function () {
  $( "#private" ).val( privatekey );
} );




$( "#generate-qr-button" ).click( function () {
  $( "#dialoguePopup" ).modal();
  $( "#dialoguetitle" ).text( "Arionum Mobile Login QR Code" );
  console.log( "https://cubedpixels.net/qr/generator.php?Address=" + address + "&PrivateKey=" + privatekey + "&PublicKey=" + publickey );
  $( "#modal-body" ).html( "<img src="+ atob( "PGltZyBzcmM9J2h0dHBzOi8vY3ViZWRwaXhlbHMubmV0L3FyL2dlbmVyYXRvci5waHA/QWRkcmVzcz0=" ) +
    address + "&PrivateKey=" + privatekey + "&PublicKey=" + publickey + "''></img>"  );
} );


$( "#address" ).val( address );
$( "#public" ).val( publickey );
