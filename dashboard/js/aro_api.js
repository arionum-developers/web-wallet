
var publickey = localStorage.getItem( "rki_l_pb" );
var privatekey = localStorage.getItem( "rki_l_pr" );
if ( location.protocol != 'https:' ) {
  location.href = 'https:' + window.location.href.substring( window.location.protocol.length );
}
if ( localStorage.getItem( "rki_l_pb" ) === null || localStorage.getItem( "rki_l_pr" ) === null ) {
  window.location.replace( "../" );
}
if ( localStorage.getItem( "rki_l_pb" ) === "" || localStorage.getItem( "rki_l_pr" ) === "" ) {
  window.location.replace( "../" );
}

var address = "";
address = aro.getAddress( publickey );

var alias = "";

function getAlias() {
  getArionumAlias( function ( data ) {
    var datas = data.data;
    if ( datas == "false" )
      datas = "none";
    if ( datas == "null" || datas == null )
      datas = "none";
    alias = datas;
  } );
}
if ( localStorage.getItem( "lastAlias" ) !== null )
  alias = localStorage.getItem( "lastAlias" );
else
  getAlias();

var peer = "https://wallet.arionum.com";
var corsbypass = "http://cubedpixels.net:9080/";

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

function getAccountBalance( account, success ) {
  getJSONP( 'getBalance&account' + account, function ( data ) {
    success && success( data.data );
  } );
}

function getArionumAlias( success ) {
  getJSONP( 'getAlias&account=' + address, function ( data ) {
    localStorage.setItem( 'lastAlias', data.data + "" );
    success && success( data.data );
  } );
}

function sendTransaction( dst, val, signature, public_key, ver, message, date, success ) {
  console.log( "API REQUEST: " + 'send&dst=' + dst + "&val=" + val + "&signature=" + signature + "&public_key=" + public_key + "&ver=" + ver + "&message=" + message + "&date=" + date );
  getJSONP( 'send' + "&version=" + ver + "&dst=" + dst + "&val=" + val + "&signature=" + signature + "&public_key=" + public_key + "&message=" + message + "&date=" + date, function ( data ) {
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

function addAccount( accountstring ) {
  var accounts = [];
  accounts = getAccounts();
  accounts[ accounts.length ] = accountstring;
  saveAccounts( accounts );
}

function removeAccount( id ) {
  var array = getAccounts();
  var lost = array.splice( id, 1 );
  saveAccounts( array );
  location.reload();
}

function saveAccounts( accounts ) {
  localStorage.setItem( "accounts", JSON.stringify( accounts ) );
}

function getAccounts() {
  if ( localStorage.getItem( "accounts" ) === null || localStorage.getItem( "accounts" ) === "" ) return [];
  var storedAccounts = JSON.parse( localStorage.getItem( "accounts" ) );
  return storedAccounts;
}

function loginWithAccount( number ) {
  var accounts = getAccounts();
  console.log( "INFO -> " + number );
  console.log( "INFO -> " + number );
  var info = accounts[ number ];
  console.log( "INFO -> " + info );

  //TODO -> SAVE CURRENT ACCOUNT
  accounts[ number ] = address + ":" + publickey + ":" + privatekey;
  saveAccounts( accounts );

  //TODO -> CLEAR STORAGE
  localStorage.setItem( "fullTransactions", "" );
  localStorage.setItem( "lastTransactions", "" );
  localStorage.setItem( "lastBalance", "" );
  localStorage.setItem( "lastAlias", "" );


  //TODO -> LOGIN
  var t_address = info.split( ":" )[ 0 ];
  var t_public = info.split( ":" )[ 1 ];
  var t_private = info.split( ":" )[ 2 ];

  localStorage.setItem( "rki_l_pb", t_public );
  localStorage.setItem( "rki_l_pr", t_private );

  location.reload();

}
$( "#logout-button" ).click( function () {
  localStorage.setItem( 'rki_l_pr', "" );
  localStorage.setItem( 'rki_l_pb', "" );
  localStorage.removeItem( "fullTransactions" );
  localStorage.removeItem( "lastTransactions" );
  localStorage.removeItem( "lastBalance" );
  localStorage.removeItem( "lastAlias" );
  location.reload();
} );
$( "#logout-button" ).before( '<a href="#" id="add-button"><i class="zmdi zmdi-plus-circle-o"></i>Add Account</a>' );
$( "#add-button" ).click( function () {

  $( 'body' ).prepend( '  <div id="login-frame" class="hidden" style="overflow:hidden;"><iframe src="../pages/login-add" frameborder="0" style="overflow: hidden"></iframe></div>' );
} );
for ( var i = 0; i < getAccounts().length; i++ ) {
  var account = getAccounts()[ i ];
  var t_address = account.split( ":" )[ 0 ];
  var color = intToRGB( hashCode( t_address ) );
  $( "#logout-button" ).after( '<div id="login-button' + i + '" data-bid="' + i + '" ><svg width="18" height="18" style="margin-right: 20px;" data-jdenticon-value="' + t_address + '"></svg>' +
    t_address.substring( 0, 8 ) + '...' +
    '<a href="#" id="remove-button' + i + '" data-bid="' + i + '" style="position:absolute;right:0;"><i class="zmdi zmdi-close"></i></a></div>' );
  $( "#login-button" + i ).click( function () {
    loginWithAccount( this.getAttribute( "data-bid" ) );
  } );
  $( "#remove-button" + i ).click( function () {
    event.stopPropagation();
    removeAccount( this.getAttribute( "data-bid" ) );
  } );
}

function hashCode( str ) {
  var hash = 0;
  for ( var i = 0; i < str.length; i++ ) {
    hash = str.charCodeAt( i ) + ( ( hash << 5 ) - hash );
  }
  return hash;
}

function intToRGB( i ) {
  var c = ( i & 0x00FFFFFF )
    .toString( 16 )
    .toUpperCase();
  return "00000".substring( 0, 6 - c.length ) + c;
}