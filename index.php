<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link rel="shortcut icon" href="images/sz/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="sz.css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
    <title>Solar Zen &gamma;</title>
    <script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/newClass.js"></script>
    <script type="text/javascript" src="js/fixEvent.js"></script>
    <script type="text/javascript" src="js/ArrayList.js"></script>
    <script type="text/javascript" src="js/Point.js"></script>
    <script type="text/javascript" src="js/Target.js"></script>
    <script type="text/javascript" src="js/CircleTarget.js"></script>
    <script type="text/javascript" src="js/SlideXTarget.js"></script>
    <script type="text/javascript" src="js/CosTarget.js"></script>
    <script type="text/javascript" src="js/Planet.js"></script>
    <script type="text/javascript" src="js/NullPlanet.js"></script>
    <script type="text/javascript" src="js/Carousel.js"></script>
    <script type="text/javascript" src="js/GameplayState.js"></script>
    <script type="text/javascript" src="js/sz.js"></script>

    <script type="text/javascript">

        function isIE6OrLess() {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("msie") != -1
                    && navigator.appVersion.substring(0, 1) <= 4;
        }

        function slideSwitch() {
            var $active = $('#ieScreen IMG.active');
            if ($active.length == 0)
                $active = $('#ieScreen IMG:last');
            var $next = $active.next().length ? $active.next() : $('#ieScreen IMG:first');
            $active.addClass('last-active');

            $next.css({
                opacity: 0.0
            }).addClass('active').animate({
                opacity: 1.0
            }, 1000, function() {
                $active.removeClass('active last-active');
            });
        }

        function initCom() {
            if (!isIE6OrLess()) {
                // Chrome wrong cursor during dnd fix
                document.onselectstart = function(){ return false; };
                init();
            } else {
                $('div.Block').css("display", "none");
                document.getElementById("ieScreen").style.display = "block";
                $("div.ScreenMsgLeft").show();
                $("#author").show();
                $("#author").css("right", "30px");
                $("#author").css("bottom", "200px");
                $("#author").css("cursor", "auto");
                $("div.Block").css("min-height", "19px");
                $(function() {
                    setInterval("slideSwitch()", 5000);
                });
            }
        }

        if (window.addEventListener)
            window.addEventListener("load", initCom, false);
        else if (window.attachEvent)
            window.attachEvent("onload", initCom);
        
    </script>
</head>

<body>

<object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_mini.swf" width="200"
        height="20">
    <param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_mini.swf"/>
    <param name="bgcolor" value="#202D3E"/>
    <param name="FlashVars" value="mp3=sounds/all.mp3"/>
</object>


<div id="menuScreen" class="Screen" style="display:none;">
    <div class="MenuItem">
        <img alt="Solar Zen" src="images/sz/logo_sz.png"/>
    </div>
    <div class="MenuItem" style="height:50px;">
    </div>
    <div id="btnContinue" class="MenuItem" style="cursor:pointer;">
        <img alt="Continue" src="images/sz/menu_text_continue.png"/>
    </div>
    <div id="btnNewGame" class="MenuItem" style="cursor:pointer;">
        <img alt="New game" src="images/sz/menu_text_newgame.png"/>
    </div>
    <div id="btnHowtoplay" class="MenuItem" style="cursor:pointer;">
        <img alt="How to play" src="images/sz/menu_text_howtoplay.png"/>
    </div>
    <div id="btnAbout" class="MenuItem" style="cursor:pointer;">
        <img alt="About" src="images/sz/menu_text_about.png"/>
    </div>
</div>
<div id="aboutScreen" class="Screen" style="display:none;">
    <div class="MenuItem">
        <img alt="Solar Zen" src="images/sz/logo_sz.png"/>
    </div>
    <div class="MenuItem" style="height:10px;">
    </div>
    <div class="MenuItem">
        <img alt="Game Disign &amp; Graphics: Andrey Kolesin &amp; Kirill Vorionin;\
		 Music &amp; Sound design: Tchaykovsky &amp; Greystorm;\
		  All music used in game is a public domain;\
		  Programming &amp; QA Management: Yakov Ilyin &amp; Andrey Akimov; Andrey Kolesin &amp; Kirill Voroinn;\
		  All Questions and Suggestions on support@epazzzsoftware.com" src="images/sz/menu_text_abt.png"/>
    </div>
</div>
<div id="helpScreen" class="Screen" style="display:none;">
    <div id="help1" class="MenuItem" style="padding:0 0 0 0;">
        <img alt="All is simple" src="images/sz/help1.jpg"/>
    </div>
    <div id="help2" class="MenuItem" style="display:none;padding:0 0 0 0;">
        <img alt="All is simple" src="images/sz/help2.jpg"/>
    </div>
    <div id="help3" class="MenuItem" style="display:none;padding:0 0 0 0;">
        <img alt="All is simple" src="images/sz/help3.jpg"/>
    </div>
    <div id="help4" class="MenuItem" style="display:none;padding:0 0 0 0;">
        <img alt="All is simple" src="images/sz/help4.jpg"/>
    </div>
    <div id="help5" class="MenuItem" style="display:none;padding:0 0 0 0;">
        <img alt="All is simple" src="images/sz/help5.jpg"/>
    </div>
</div>
<div id="ieScreen" class="Screen" style="display:none;">
    <img alt="All is simple" class="active first" src="images/sz/screen1.png"/>
    <img alt="All is simple" src="images/sz/screen2.png"/>
    <img alt="All is simple" src="images/sz/screen3.png"/>
    <img alt="All is simple" class="last" src="images/sz/screen4.png"/>

</div>

<div class="ScreenMsgLeft" style="display:none;">
    If you want to play it you need to use one of these browsers:
    <ul>
        <li><a href="http://www.mozilla-europe.org/ru/firefox/">Firefox 2.0 or later</a></li>
        <li><a href="http://www.opera.com/">Opera 9.0 or later</a></li>
        <li><a href="http://google.com/chrome">Google Chrome any versions</a></li>
        <li><a href="http://www.apple.com/safari/">Safari 4</a></li>
    </ul>
</div>

<div id="newGameScreen" class="Screen" style="display:none;">
    <div class="MenuItem">
        <div id="btnNewGameBack" style="float:left;">
            <img alt="Back" src="images/sz/blackhole_back.png"/>
        </div>
        <div id="btnNewGameSound" style="float:right;padding:15px 15px;">
            <img alt="Sound switcher" style="display:none; src=" images/sz/sound_on.png"/>
        </div>
    </div>
</div>
<div id="gameplayScreen" class="Screen" style="display:none;">
    <div class="MenuItem">
        <div id="btnGameplayBack" style="float:left;padding:15px 15px;">
            <img alt="Back" src="images/sz/text_back.png"/>
        </div>
        <div id="btnGameplaySound" style="float:right;padding:15px 15px;">
            <img alt="Sound switcher" style="display:none; src=" images/sz/sound_on.png"/>
        </div>
    </div>
    <div class="StartCircle">
    </div>
    <div id="handle" class="Handle">
    </div>
    <div id="cntContainer" class="ContainerCounter">
        0
    </div>
    <div id="cntPower" class="ContainerCounter" style="display:none;">
        0
    </div>
</div>
<div id="quoteScreen" class="Screen" style="display:none;">
    <div id="quote" class="QuoteItem">
        No Quote
    </div>
</div>
<div id="author" title="Double click on these squares opens contact information" class="Copyright"
     style="display:none;right:-220px">
    <div class="CopyrightLine">
        <div class="Block">
            &nbsp;
        </div>
        <div style="float:left;">
            <b>Code:</b>
            Kolesin Andrey
        </div>
        <div title="mail" class="BlockGmail">
            <a href="mailto:s4relok@gmail.com"><img alt="mail" src="images/sz/gmail.bmp"/></a>
        </div>
    </div>
    <div class="CopyrightLine">
        <div class="Block">
            &nbsp;
        </div>
        <div style="float:left;">
            <b>Graphic:</b>
            Voronin Kirill
        </div>
        <div title="mail" class="BlockGmail">
            <a href="mailto:christaingrey@gmail.com"><img alt="mail" src="images/sz/gmail.bmp"/></a>
        </div>
    </div>
    <div class="CopyrightLine">
        <div class="Block">
            &nbsp;
        </div>
        <div style="float:left;">
            <b>QA:</b>
            Artem Tyapkov
        </div>
        <div title="mail" class="BlockGmail">
            <a href="mailto:shadowkevil@gmail.com"><img alt="mail" src="images/sz/gmail.bmp"/></a>
        </div>
    </div>
    <div class="CopyrightLine">
        <div class="Block">
            &nbsp;
        </div>
        <b>HC.Design © 2009</b>
    </div>
    <div title="Valid XHTML" style="position:absolute; left:20px; top:80px;">
        <a href="http://validator.w3.org/check?uri=referer"><img
                src="http://www.w3.org/Icons/valid-xhtml10-blue"
                alt="Valid XHTML 1.0 Transitional" height="31" width="88"/></a>
    </div>

    <div title="Play it on Android" style="position:absolute; left:130px; top:80px;">
        <a href="http://www.cyrket.com/package/com.epazzzsoftware.solarzen"><img
                src="images/sz/and_buy.png"
                alt="Play it on Android" height="48" width="48"/></a>
    </div>

</div>
</body>
</html>
