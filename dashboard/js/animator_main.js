( function ( $ ) {
  var ctx = document.getElementById( "aro_balanace_chart" );
  if ( ctx ) {
    document.getElementById( "aro_balanace_chart" ).height = 115;
    var myChart = new Chart( ctx, {
      type: 'bar',
      data: {
        labels: [ '', '', '', '', '', '', '', '', '', '', '', '' ],
        datasets: [ {
          label: "",
          data: [ 77, 80, 78, 64, 59, 74, 61, 74, 66, 61, 59, 74 ],
          borderColor: "transparent",
          borderWidth: "0",
          backgroundColor: "rgba(255,255,255,.3)"
        } ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        maintainAspectRatio: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [ {
            display: false,
            categoryPercentage: 1,
            barPercentage: 0.65
          } ],
          yAxes: [ {
            display: false
          } ]
        }
      }
    } );
    myChart.aspectRatio = 0;
    setTimeout( function () {
      console.log( "SETTING CSS" );
    }, 2000 );
  }
} )( jQuery );



function reloadChart( data2, data1, labels ) {
  var heighest = 0;
  if ( Math.max( ...data1 ) > heighest ) heighest = Math.max( ...data1 );
  if ( Math.max( ...data2 ) > heighest ) heighest = Math.max( ...data2 );
  var steps = heighest / data2.length;

  try {
    // ARO RECENT REPORT
    const aroIn = 'rgba(88,128,250,0.8)'
    const aroOut = 'rgba(249,87,87,0.8)'

    var elements = 10
    var data3 = [ 52, 60, 55, 50, 65, 80, 57, 70, 105, 115 ]
    var data4 = [ 102, 70, 80, 100, 56, 53, 80, 75, 65, 90 ]
    var ctx = document.getElementById( "recent-rep-chart" );
    if ( ctx ) {
      ctx.height = 300;
      ctx.style.height = "";
      var myChart = new Chart( ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [ {
            label: 'Aro In',
            backgroundColor: aroIn,
            borderColor: 'transparent',
            pointHoverBackgroundColor: aroIn,
            borderWidth: 0,
            data: data2

          }, {
            label: 'Aro Out',
            backgroundColor: aroOut,
            borderColor: 'transparent',
            pointHoverBackgroundColor: aroOut,
            borderWidth: 0,
            data: data1

          } ]
        },
        options: {
          maintainAspectRatio: false,
          legend: {
            display: false
          },
          responsive: true,
          scales: {
            xAxes: [ {
              gridLines: {
                drawOnChartArea: true,
                color: '#f2f2f2'
              },
              ticks: {
                fontFamily: "Poppins",
                fontSize: 12
              }
            } ],
            yAxes: [ {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: steps,
                max: heighest,
                fontFamily: "Poppins",
                fontSize: 12
              },
              gridLines: {
                display: true,
                color: '#f2f2f2'

              }
            } ]
          },
          elements: {
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3
            }
          }


        }
      } );
    }
    ctx.style.height = "";
  } catch ( error ) {
    console.log( error );
  }
}

//SITE FADE IN ANIMATION
( function ( $ ) {
  "use strict";
  $( ".animsition" ).animsition( {
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 300,
    outDuration: 300,
    linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([class^="chosen-single"])',
    loading: true,
    loadingParentElement: 'html',
    loadingClass: 'page-loader',
    loadingInner: '<div class="page-loader__spin"></div>',
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: [ 'animation-duration', '-webkit-animation-duration' ],
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'html',
    transition: function ( url ) {
      window.location.href = url;
    }
  } );


} )( jQuery );



//DROPDOWN FOR LOGOUT
( function ( $ ) {
  // USE STRICT
  "use strict";

  try {
    var menu = $( '.js-item-menu' );
    var sub_menu_is_showed = -1;

    for ( var i = 0; i < menu.length; i++ ) {
      $( menu[ i ] ).on( 'click', function ( e ) {
        e.preventDefault();
        $( '.js-right-sidebar' ).removeClass( "show-sidebar" );
        if ( jQuery.inArray( this, menu ) == sub_menu_is_showed ) {
          $( this ).toggleClass( 'show-dropdown' );
          sub_menu_is_showed = -1;
        } else {
          for ( var i = 0; i < menu.length; i++ ) {
            $( menu[ i ] ).removeClass( "show-dropdown" );
          }
          $( this ).toggleClass( 'show-dropdown' );
          sub_menu_is_showed = jQuery.inArray( this, menu );
        }
      } );
    }
    $( ".js-item-menu, .js-dropdown" ).click( function ( event ) {
      event.stopPropagation();
    } );

    $( "body,html" ).on( "click", function () {
      for ( var i = 0; i < menu.length; i++ ) {
        menu[ i ].classList.remove( "show-dropdown" );
      }
      sub_menu_is_showed = -1;
    } );

  } catch ( error ) {
    console.log( error );
  }

  var wW = $( window ).width();
  // DESKTOP SIDEBAR
  var right_sidebar = $( '.js-right-sidebar' );
  var sidebar_btn = $( '.js-sidebar-btn' );

  sidebar_btn.on( 'click', function ( e ) {
    e.preventDefault();
    for ( var i = 0; i < menu.length; i++ ) {
      menu[ i ].classList.remove( "show-dropdown" );
    }
    sub_menu_is_showed = -1;
    right_sidebar.toggleClass( "show-sidebar" );
  } );

  $( ".js-right-sidebar, .js-sidebar-btn" ).click( function ( event ) {
    event.stopPropagation();
  } );

  $( "body,html" ).on( "click", function () {
    right_sidebar.removeClass( "show-sidebar" );

  } );


  try {
    // PHONE HAMBURGER MENU
    $( '.hamburger' ).on( 'click', function () {
      $( this ).toggleClass( 'is-active' );
      $( '.navbar-mobile' ).slideToggle( '500' );
    } );
    $( '.navbar-mobile__list li.has-dropdown > a' ).on( 'click', function () {
      var dropdown = $( this ).siblings( 'ul.navbar-mobile__dropdown' );
      $( this ).toggleClass( 'active' );
      $( dropdown ).slideToggle( '500' );
      return false;
    } );
  } catch ( error ) {
    console.log( error );
  }
} )( jQuery );