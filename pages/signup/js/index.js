$( '#sumbit_text' ).click( function () {
  var passwordString = document.getElementById( "password" ).value;
  if ( passwordString === "" ) return;
  startAnimation( passwordString );
} );

$( "#close" ).click( function () {
  window.top.location.href = "/";
} );

function download( filename, text ) {
  var element = document.createElement( 'a' );
  element.setAttribute( 'href', 'data:text/plain;charset=utf-8,' + encodeURIComponent( text ) );
  element.setAttribute( 'download', filename );

  element.style.display = 'none';
  document.body.appendChild( element );

  element.click();

  document.body.removeChild( element );
}



function startAnimation( string ) {
  $( '.login' ).addClass( 'test' )
  setTimeout( function () {
    $( '.login' ).addClass( 'testtwo' )
  }, 200 );
  setTimeout( function () {
    $( ".authent" ).show().animate( {
      right: -320
    }, {
      easing: 'easeOutQuint',
      duration: 600,
      queue: false
    } );
    $( ".authent" ).animate( {
      opacity: 1
    }, {
      duration: 200,
      queue: false
    } ).addClass( 'visible' );
  }, 400 );
  setTimeout( function () {
    console.log( 'Load was performed.' );


    //CHECK PUBLIC AND PRIVATE KEY >>
    var keypair = aro.encodeKeypair();
    console.log( keypair );

    $( ".authent" ).show().animate( {
      right: 90
    }, {
      easing: 'easeOutQuint',
      duration: 600,
      queue: false
    } );
    $( ".authent" ).animate( {
      opacity: 0
    }, {
      duration: 200,
      queue: false
    } ).addClass( 'visible' );
    $( '.login' ).removeClass( 'testtwo' )

    setTimeout( function () {
      $( '.login' ).removeClass( 'test' )
      $( '.login div' ).fadeOut( 123 );
    }, 100 );


    setTimeout( function () {
      $( '.success' ).fadeIn();
      $( '.success div' ).fadeIn();
      $( "#publickey" ).val( keypair.publicCoin );
      $( "#privatekey" ).val( keypair.privateCoin );
      $( ".authent" ).hide();
      console.log( "ENCODED: " + keypair.encoded );
      console.log( "PW: " + $( "#password" ).val() );
      aro.encryptAro( keypair.encoded, $( "#password" ).val() )
        .then( encrypt => {
          download( "webwallet.aro", encrypt );
        } );;

      $( "#gologin" ).click( function () {
        window.location.replace( "/pages/login/" );
      } );

    }, 200 );

  }, 600 );


}

$( 'input[type="text"],input[type="password"]' ).focus( function () {
  $( this ).prev().animate( {
    'opacity': '1'
  }, 200 )
} );
$( 'input[type="text"],input[type="password"]' ).blur( function () {
  $( this ).prev().animate( {
    'opacity': '.5'
  }, 200 )
} );

$( 'input[type="text"],input[type="password"]' ).keyup( function () {
  if ( !$( this ).val() == '' ) {
    $( this ).next().animate( {
      'opacity': '1',
      'right': '30'
    }, 200 )
  } else {
    $( this ).next().animate( {
      'opacity': '0',
      'right': '20'
    }, 200 )
  }
} );

var open = 0;
$( '.tab' ).click( function () {
  $( this ).fadeOut( 200, function () {
    $( this ).parent().animate( {
      'left': '0'
    } )
  } );
} );