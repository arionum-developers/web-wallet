
var publickey = localStorage.getItem( "rki_l_pb" );
var privatekey = localStorage.getItem( "rki_l_pr" );

if ( localStorage.getItem( "rki_l_pb" ) === null || localStorage.getItem( "rki_l_pr" ) === null ) {
  window.location.replace( "../" );
}
if ( localStorage.getItem( "rki_l_pb" ) === "" || localStorage.getItem( "rki_l_pr" ) === "" ) {
  window.location.replace( "../" );
}

var address = "";
address = aro.getAddress( publickey );

var peer = "https://wallet.arionum.com";
var corsbypass = "https://cubedpixels.net:9080/";

function getJSONP( url, success ) {
  setTimeout( function () {
    $.getJSON( peer + '/api.php?q=' + url, function ( data ) {
      success && success( data );
    } );
  }, 1 );


}

function getArionumBalance( success ) {
  getJSONP( 'getBalance&public_key=' + publickey + "&account=" + address, function ( data ) {
    localStorage.setItem( 'lastBalance', data.data + "" );
    success && success( data.data );
  } );
}

function sendTransaction( dst, val, signature, public_key, ver, message, date, success ) {
  console.log( "API REQUEST: " + 'send&dst=' + dst + "&val=" + val + "&signature=" + signature + "&public_key=" + public_key + "&ver=" + ver + "&message=" + message + "&date=" + date );
  getJSONP( 'send&dst=' + dst + "&val=" + val + "&signature=" + signature + "&public_key=" + public_key + "&ver=" + ver + "&message=" + message + "&date=" + date, function ( data ) {
    success && success( data );
  } );
}

function getLastTransactions( success, clear, preclear ) {
  try {
    if ( clear )
      if ( localStorage.getItem( "lastTransactions" ) !== null ) {
        var data = JSON.parse( localStorage.getItem( "lastTransactions" ) );
        preclear && preclear();
        for ( var i = 0; i < data.data.length; i++ ) {
          var obj = data.data[ i ];
          success && success( obj.date, obj.type, obj.val, obj.confirmations, obj.src, obj.dst, obj.message, obj.id );
        }
      }
  } catch ( e ) {}

  getJSONP( 'getTransactions&public_key=' + publickey + "&account=" + address + "&limit=8", function ( data ) {
    console.log( data );
    localStorage.setItem( 'lastTransactions', JSON.stringify( data ) );
    clear && clear();
    for ( var i = 0; i < data.data.length; i++ ) {

      var obj = data.data[ i ];
      success && success( obj.date, obj.type, obj.val, obj.confirmations, obj.src, obj.dst, obj.message, obj.id );

    }

  } );
}

function getTransactionsFull( success, clear, download ) {
  try {
    if ( clear )
      if ( localStorage.getItem( "fullTransactions" ) !== null ) {
        var data = JSON.parse( localStorage.getItem( "fullTransactions" ) );
        for ( var i = 0; i < data.data.length; i++ ) {
          var obj = data.data[ i ];
          success && success( obj.date, obj.type, obj.val, obj.confirmations, obj.src, obj.dst, obj.message, obj.id );
        }
      }
  } catch ( e ) {}
  if ( download && download === false )
    return;

  getJSONP( 'getTransactions&public_key=' + publickey + "&account=" + address + "&limit=1000", function ( data ) {
    console.log( data );
    localStorage.setItem( 'fullTransactions', JSON.stringify( data ) );
    clear && clear();
    for ( var i = 0; i < data.data.length; i++ ) {

      var obj = data.data[ i ];
      success && success( obj.date, obj.type, obj.val, obj.confirmations, obj.src, obj.dst, obj.message, obj.id );
    }
  } );
}

function getLatestTransaction( success ) {
  getJSONP( 'getTransactions&public_key=' + publickey + "&account=" + address + "&limit=1", function ( data ) {
    console.log( data );
    success && success( data );
  } );
}