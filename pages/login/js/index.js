var file = false;
var filetext = "";
$('#sumbit_text').click(function() {


    if (!file) {
        var publicString = document.getElementById("public").value;
        var privateString = document.getElementById("private").value;
        if (publicString === "" || privateString === "") return;
        startAnimation("arionum:" + privateString + ":" + publicString);
    } else {
        startAnimation(filetext);
    }
});
$("#close").click(function(){
    window.top.location.href = "http://cubedpixels.net/projects/Arionum%20Wallet/";
});


$('#submit_file').click(function() {
    $('#file_chooser').click();
});
document.getElementById('file_chooser').addEventListener('change', onFileSelect, false);


function onFileSelect(evt) {
    var f = evt.target.files[0];
    if (f) {
        var r = new FileReader();
        r.onload = function(e) {
            var contents = e.target.result;
            console.log("CONTENT: " + contents);
            filetext = contents;
            file = true;
            //HIDE AND CHANGE->
            $("#top_file_selector").hide();
            $("#public_key_top").hide();
            $("#title_text").text("Enter your password");
            $("#private").attr("placeholder","Enter Password");
            $('#private').get(0).type = 'password';
        }
        r.readAsText(f);
    }
}

function startAnimation(string) {
    $('.login').addClass('test')
    setTimeout(function() {
        $('.login').addClass('testtwo')
    }, 200);
    setTimeout(function() {
        $(".authent").show().animate({
            right: -320
        }, {
            easing: 'easeOutQuint',
            duration: 600,
            queue: false
        });
        $(".authent").animate({
            opacity: 1
        }, {
            duration: 200,
            queue: false
        }).addClass('visible');
    }, 400);
    setTimeout(function() {
        console.log('Load was performed.');


        //CHECK PUBLIC AND PRIVATE KEY >>
        var keypair = null;

        if (file) {
            try {
                console.log("DECODING: " + string + " \n With PW: " + document.getElementById("private").value);
                keypair = aro.decodeKeypair(string, document.getElementById("private").value);
                console.log(keypair);
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                console.log("DECODING: " + string);
                keypair = aro.decodeKeypair(string);
                console.log(keypair);
            } catch (e) {
                console.log(e);
            }

        }


        $(".authent").show().animate({
            right: 90
        }, {
            easing: 'easeOutQuint',
            duration: 600,
            queue: false
        });
        $(".authent").animate({
            opacity: 0
        }, {
            duration: 200,
            queue: false
        }).addClass('visible');
        $('.login').removeClass('testtwo')

        setTimeout(function() {
            $('.login').removeClass('test')
            $('.login div').fadeOut(123);
        }, 100);


        setTimeout(function() {
            if (keypair !== null) {
                localStorage.setItem('rki_l_pr', keypair.privateCoin);
                localStorage.setItem('rki_l_pb', keypair.publicCoin);
                $('.success').fadeIn();
                setTimeout(function() {
                    window.top.location.href = "http://cubedpixels.net/projects/Arionum%20Wallet/dashboard/";
                }, 1000);
            } else {
                localStorage.setItem('rki_l_pr', "");
                localStorage.setItem('rki_l_pb', "");
                $('.error').fadeIn();
                setTimeout(function() {
                    location.reload();
                }, 1500);
            }
        }, 200);

    }, 600);


}

$('input[type="text"],input[type="password"]').focus(function() {
    $(this).prev().animate({
        'opacity': '1'
    }, 200)
});
$('input[type="text"],input[type="password"]').blur(function() {
    $(this).prev().animate({
        'opacity': '.5'
    }, 200)
});

$('input[type="text"],input[type="password"]').keyup(function() {
    if (!$(this).val() == '') {
        $(this).next().animate({
            'opacity': '1',
            'right': '30'
        }, 200)
    } else {
        $(this).next().animate({
            'opacity': '0',
            'right': '20'
        }, 200)
    }
});

var open = 0;
$('.tab').click(function() {
    $(this).fadeOut(200, function() {
        $(this).parent().animate({
            'left': '0'
        })
    });
});