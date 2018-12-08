var heading = document.querySelector( ".hero-heading" );

var openMenuPersonal = document.querySelector( ".open-menu-personal" );
var personalMenu = document.querySelector( ".personal" );
var selectedPersonal = document.querySelector( ".selected-personal" );
var closeMenuPersonal = document.querySelector( ".close-menu-personal" );



//-> CHECK IF ALREADY LOGGED IN->
checkLogin();


//-> IMAGE LOADER
window.onload = function () {
  //CHECKIF MOBILE
  var mobilecheck = window.matchMedia( "only screen and (max-width: 700px)" );
  var is_mobile = mobilecheck.matches;
  var placeholder = document.querySelector( '.placeholder' );

  var img = new Image();

  var imgLarge = new Image();
  if ( is_mobile ) {
    imgLarge.src = placeholder.dataset.mobile;
  } else {
    imgLarge.src = placeholder.dataset.large;
  }
  imgLarge.onload = function () {
    imgLarge.classList.add( 'loaded' );
  };
  placeholder.appendChild( imgLarge );
}


function checkLogin() {
  if ( localStorage.getItem( "rki_l_pb" ) === null || localStorage.getItem( "rki_l_pr" ) === null ) {
    $( "#dashboard_btn" ).click( function () {
      openSignIn();
    } );
    return;
  }
  if ( localStorage.getItem( "rki_l_pb" ) === "" || localStorage.getItem( "rki_l_pr" ) === "" ) {
    $( "#dashboard_btn" ).click( function () {
      openSignIn();
    } );
    return;
  }
  console.log( "LOGGED IN!" );
  setTimeout( function () {

    $( "#dashboard_btn" ).click( function () {
      window.location.replace( "./dashboard/" );
    } );
    $( "#signup" ).click( function () {
      window.location.replace( "./dashboard/" );
    } );
    $( "#signup2" ).click( function () {
      window.location.replace( "./dashboard/" );
    } );
    $( "#login" ).click( function () {
      window.location.replace( "./dashboard/" );
    } );
    $( "#login2" ).click( function () {
      window.location.replace( "./dashboard/" );
    } );

    $( "#login2" ).hide();
    $( "#login" ).hide();

    $( "#signup" ).text( "Dashboard" );
    $( "#signup2" ).text( "Go to Dashboard" );

  }, 50 );
}




$( document ).mousedown( function ( e ) {
  var container = $( "#login-frame" );
  var container1 = $( "#signup-frame" );
  if ( !container.is( e.target ) && container.has( e.target ).length === 0 ) {
    container.hide();
  }
  if ( !container1.is( e.target ) && container1.has( e.target ).length === 0 ) {
    container1.hide();
  }
} );



openMenuPersonal.onclick = personal;

function personal() {
  if ( personalMenu.style.display == "block" ) {
    close();
    return;
  }
  close();
  personalMenu.style.display = "block";
  selectedPersonal.classList.add( "selected-rotate" );
  heading.classList.add( "text-move" );
}


var openMenuBusiness = document.querySelector( ".open-menu-business" );
var businessMenu = document.querySelector( ".business" );
var selectedBusiness = document.querySelector( ".selected-business" );
var closeMenuBusiness = document.querySelector( ".close-menu-business" );

openMenuBusiness.onclick = business;

function business() {
  if ( businessMenu.style.display == "block" ) {
    close();
    return;
  }
  close();
  businessMenu.style.display = "block";
  selectedBusiness.classList.add( "selected-rotate" );
  heading.classList.add( "text-move" );
}


closeMenuPersonal.onclick = close;
closeMenuBusiness.onclick = close;

function close() {
  personalMenu.style.display = "none";
  businessMenu.style.display = "none";
  selectedPersonal.classList.remove( "selected-rotate" );
  selectedBusiness.classList.remove( "selected-rotate" );
  heading.classList.remove( "text-move" );
}

var login = document.querySelector( "#login" );
var login2 = document.querySelector( "#login2" );
var loginframe = document.querySelector( "#login-frame" );

login.onclick = openSignIn;
login2.onclick = openSignIn;

function openSignIn() {
  $( "#signup-frame" ).hide();
  $( "#login-frame" ).hide();
  $( "body" ).css( 'cssText', "overflow: hidden;" );
  loginframe.classList.remove( "hidden" );
  $( "#login-frame" ).fadeIn( "fast" );
}

var signup = document.querySelector( "#signup" );
var signup2 = document.querySelector( "#signup2" );
var singupframe = document.querySelector( "#signup-frame" );

signup.onclick = openSignUp;
signup2.onclick = openSignUp;

function openSignUp() {
  $( "#login-frame" ).hide();
  $( "#signup-frame" ).hide();
  $( "body" ).css( 'cssText', "overflow: hidden;" );
  singupframe.classList.remove( "hidden" );
  $( "#signup-frame" ).fadeIn( "fast" );
}