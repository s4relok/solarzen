var HOWTO_PAGE = 1;
var USER_LEVEL = 1;
var CURRENT_LEVEL = 0;
var delay = 20;
var options = { path: '/', expires: 365 * 14 };

var GameState = null;

var G = {
    LEVELS: 15,
    X2: 160,
    Y2: 240,
    X2MENU: 134,
    SUNB_R: 53,
    rPlanet: 30,
    numInCarousel: 5,
    BBL_POS: [96, 40, 149, 79, 129, 142, 63, 142, 43, 79],
    STR_C_X: 161,
    STR_C_Y: 429,
    STR_R: 96,
    BBL_R: 33,
    SCREEN_WIDTH: 320,
    TGT_R: 32,
    SUN_R: 32,
    ARROW_MIN_LEN: 70,
    ARROW_LEN: 223,
    SAMPLE_1_7: 21,
    SPEED_DIVIDER: 25,
    SPEED_MIN_DIVIDER: 14,
    MAX_LENGTH: 3000
};

LEVELS_TARGETS = [
    // 1
    [new Target(G.X2, 100)],
    // 2
    [new Target(G.X2 - 100, 100), new Target(G.X2 + 100, 100)],
    // 3
    [new Target(G.X2, 100), new CircleTarget(G.X2, 100, 72, 0.05)],
    // 4
    [new Target(G.X2 - 100, 100 + 70), new Target(G.X2 + 100, 100 - 70), new Target(G.X2, 100)],
    // 5
    [new CircleTarget(G.X2 + 50, 100, 60, -0.05), new CircleTarget(G.X2 - 50, 100, 60, 0.05)],
    // 6
    [new CircleTarget(G.X2 + 50, 80, 40, 0.05), new CircleTarget(G.X2 - 50, 80, 40, 0.05) ],
    // 7
    [new SlideXTarget(50, 40, 1), new SlideXTarget(90, 100, 2), new SlideXTarget(130, 160, 3) ],
    // 8
    [new CircleTarget(G.X2 + 50, 100, 60, 0.05), new CircleTarget(G.X2 - 50, 100, 60, 0.05), new CircleTarget(G.X2, 150, 60, -0.05) ],
    // 9
    [new CircleTarget(G.X2, 100, 90, 0.05), new SlideXTarget(50, 40, 1), new SlideXTarget(G.SCREEN_WIDTH - 50, 160, -1) ],
    // 10
    [new Target(G.X2, 100), new CircleTarget(G.X2, 100, 67, -0.05), new CircleTarget(G.X2, 100, 100, +0.05), new SlideXTarget(50, 190, 1) ],
    // 11
    [new SlideXTarget(50, 40, 1), new SlideXTarget(90, 100, 2), new SlideXTarget(130, 160, 3), new CircleTarget(G.X2, G.Y2 - 21, 90, 0.1) ],
    // 12
    [new SlideXTarget(50, 40, 1), new SlideXTarget(90, 100, 2), new SlideXTarget(130, 160, 3), new SlideXTarget(G.X2, 70, -4), new SlideXTarget(G.X2, 130, 4) ],
    // 13
    [new CircleTarget(40, 70, 10, -0.4), new CircleTarget(G.SCREEN_WIDTH - 40, 170, 10, 0.4), new CircleTarget(G.X2, 100, 70, +0.05), new CircleTarget(G.X2, 100, 70, +0.05, ((2 * Math.PI) / 3)), new CircleTarget(G.X2, 100, 70, +0.05, (2 * (2 * Math.PI) / 3)) ],
    // 14
    [new CircleTarget(G.X2 + 50, 100, 60, -0.05), new CircleTarget(G.X2 - 50, 100, 60, 0.05), new SlideXTarget(50, 40, 1), new SlideXTarget(G.SCREEN_WIDTH - 50, 160, -1) ],
    // 15
    [new CircleTarget(G.SCREEN_WIDTH - 70, 70, 20, -0.2), new CircleTarget(G.SCREEN_WIDTH - 70, 70, 20, -0.2, Math.PI), new CircleTarget(70, 170, 20, 0.2), new CircleTarget(70, 170, 20, 0.2, Math.PI), new CosTarget(G.SCREEN_WIDTH - 50, 40, 2), new CosTarget(50, 160, -2) ],
    // 16*
    [new CircleTarget(70, 70, 20, -0.1), new CircleTarget(G.SCREEN_WIDTH - 70, 170, 20, 0.1), new CosTarget(50, 40, 1), new CosTarget(G.SCREEN_WIDTH - 50, 160, -1) ]
];

var QUOTES = ['\"The journey of a thousand miles must begin with a single step.\"<br/><br/>Lao Tzu',
    '\"The water flows, but back into the ocean; The moon sinks, but is even in Heaven.\"',
    '\"The reverse side also has a reverse side...\"<br/><br/>Japanese Proverb.',
    '\"Ride your horse along the edge of a sword; hide yourself in the middle of flames...\"<br/><br/>Zen saying.',
    '\"Day after day the sun...\"<br/><br/>Zen saying.',
    '\"In winter, the seven stars walk upon a crystal forest...\"<br/><br/>Soen Nakagawa.',
    '\"Externally keep yourself away from all relationships, and internally have no pantings in your heart; when your mind is like unto a straight-standing wall, you may enter into the Path.\"<br/><br/>Bodhidharma',
    '\"The path of the enlightened one leaves no track - it is like the path of birds in the sky.\"',
    '\"A jug fills drop by drop.\"',
    '\"We cannot see our reflection in running water. It is only in still water that we can see.\"',
    '\"It takes a wise man to learn from his mistakes, but an even wiser man to learn from others.\"',
    '\"To know the road ahead, ask those coming back.\"',
    '\"Normally, we do not so much look at things as overlook them....\"<br/><br/>Alan Watts.',
    '\"One moon shows in every pool in every pool the one moon.\"',
    '\"Your Treasure House is in yourself, it contains all you need.\"<br/><br/>Hui Hai' ];

function updateMyElement(obj, x, y) {
    if (!"_element" in obj)
        throw new Error("Illegal argument. No '_element' property.");
    updateElementPosition(obj._element, x, y);
}

function updateElementPosition(e, x, y) {
    if (!e.style)
        throw new Error("Illegal argument. Not 'Element' object.");
    e.style.left = x + "px";
    e.style.top = y + "px";
}

function installPlanetOnScreen(x, y, backgroundImage, screen) {

    var e = document.createElement("div");
    e.className = "Planet";
    e.style.backgroundImage = backgroundImage;

    updateElementPosition(e, x - G.rPlanet, y - G.rPlanet);
    screen.appendChild(e);
    return e;
}

function installSunOnScreen(screen) {
    var sun = document.createElement("div");
    sun.className = "Sun";
    updateElementPosition(sun, G.X2 - G.SUNB_R, G.Y2 - G.SUNB_R);
    screen.appendChild(sun);
    return sun;
}

function hideScreen(screen) {
    if (screen.style) {
        screen.style.display = "none";
    }
    else
        throw Error("Not Element");
}

function showScreen(screen) {
    if (screen.style) {
        screen.style.display = "block";
    }
    else
        throw Error("Not Element");
}

var menuScreen = null;
var newGameScreen = null;
var gameplayScreen = null;
var quoteScreen = null;

var cntPowerElement = null;
var power = 0;

function loadUserProfile() {
    if (!$.cookie("USER_LEVEL")) {
        $.cookie("USER_LEVEL", USER_LEVEL, options);
    }
    else {
        USER_LEVEL = Number($.cookie("USER_LEVEL"));
    }
}

function init() {
    loadUserProfile();
    
    var aboutScreen1 = document.getElementById("aboutScreen");
    menuScreen = document.getElementById("menuScreen");
    var helpScreen = document.getElementById("helpScreen");
    newGameScreen = document.getElementById("newGameScreen");
    gameplayScreen = document.getElementById("gameplayScreen");
    quoteScreen = document.getElementById("quoteScreen");

    var btnAbout1 = document.getElementById("btnAbout");
    var btnHowtoplay = document.getElementById("btnHowtoplay");
    var btnNewGame = document.getElementById("btnNewGame");
    var btnContinue = document.getElementById("btnContinue");
    var btnNewGameBack = document.getElementById("btnNewGameBack");
    cntPowerElement = document.getElementById("cntPower");

    var author = document.getElementById("author");
    author.style.display = "block";

    if (USER_LEVEL < 1)
        hideScreen(btnContinue);
    else
        hideScreen(btnNewGame);

    author.ondblclick = function() {
        if (author.style.right == "-220px")
            author.style.right = "0px";
        else
            author.style.right = "-220px";
    };

    showScreen(menuScreen);


    function hideMenuScreen() {
        menuScreen.style.display = "none";
    }

    function setHelpPage(pageNumber) {

        if (typeof(pageNumber) != "number")
            throw Error("Не число");

        for (var i = 1; i <= 5; i++) {
            var helpPage = document.getElementById("help" + i);
            helpPage.style.display = "none";
        }

        var activePage = document.getElementById("help" + pageNumber);
        activePage.style.display = "block";
    }


    aboutScreen1.onclick = function() {
        aboutScreen1.style.display = "none";
        menuScreen.style.display = "block";
    };

    helpScreen.onclick = function() {
        if (HOWTO_PAGE != 5) {
            HOWTO_PAGE++;
        }
        else {
            menuScreen.style.display = "block";
            hideScreen(helpScreen);
        }
        setHelpPage(HOWTO_PAGE);
    };

    btnAbout1.onclick = function() {
        hideMenuScreen();
        aboutScreen1.style.display = "block";
    };

    btnHowtoplay.onclick = function() {
        hideMenuScreen();
        HOWTO_PAGE = 1;
        setHelpPage(HOWTO_PAGE);
        helpScreen.style.display = "block";
    };

    btnNewGame.onclick = function() {
        hideMenuScreen();
        showScreen(newGameScreen);
        if (!GameState)
            GameState = new NewGameState();
    };
    btnContinue.onclick = btnNewGame.onclick;

    btnNewGameBack.onclick = function() {
        hideScreen(newGameScreen);
        showScreen(menuScreen);
    };
}

function TargetList(targets) {
    this.mTargets = targets;
    this.update = function() {
        for (var i = 0; i < this.mTargets.length; i++) {
            this.mTargets[i].setCrossed(false);
            this.mTargets[i].update();
        }
    };

    this.checkVictory = function(o) {
        var matches = 0;

        for (var i = 0; i < o.length; i++) {
            p = o[i];

            for (var j = 0; j < this.mTargets.length; j++) {

                if (this.mTargets[j].isCross(p)) {
                    matches++;
                    break;
                }

            }
        }
        return matches == this.mTargets.length;
    };

    //Constructor
    for (var i = 0; i < targets.length; i++) {
        targets[i]._element = createTargetElement(targets[i].x, targets[i].y);
    }
}

function createTargetElement(x, y) {
    var e = document.createElement("div");
    e.className = "Target";
    updateElementPosition(e, x - G.TGT_R, y - G.TGT_R);
    gameplayScreen.appendChild(e);
    return e;
}

/*
 * PlanetButton class and all about
 */
PlanetButton.prototype.set = function(x, y) {
    updateMyElement(this, x - G.rPlanet, y - G.rPlanet);
};

function PlanetButton(x, y, levelNumber) {
    this._levelNumber = levelNumber;

    this._element = installPlanetOnScreen(x, y, "url('images/sz/planet_" + levelNumber + ".png')", document.getElementById("newGameScreen"));

    this._element.planet = this;

    this._element.onclick = function() {
        GameState.dispose();
        //hideScreen(newGameScreen);
        showScreen(gameplayScreen);
        CURRENT_LEVEL = this.planet._levelNumber - 1;
        GameState = new gameplayState();
        GameState.update();
    }
}

NullPlanetButton.prototype.set = function(x, y) {
    updateMyElement(this, x - G.rPlanet, y - G.rPlanet);
};

function NullPlanetButton(x, y, levelNumber) {
    this._levelNumber = levelNumber;

    this._element = installPlanetOnScreen(x, y, "url('images/sz/planet_" + levelNumber + "_disabled.png')", document.getElementById("newGameScreen"));
}

function QuoteState() {
    this._element = quoteScreen;

    showScreen(quoteScreen);
    var q = document.getElementById("quote");
    q.innerHTML = QUOTES[CURRENT_LEVEL];

    if (USER_LEVEL == CURRENT_LEVEL + 1) {
        USER_LEVEL = USER_LEVEL != 15 ? USER_LEVEL + 1 : USER_LEVEL;
        $.cookie("USER_LEVEL", USER_LEVEL, options);
    }

    quoteScreen.onclick = function() {
        //window.location.reload();
        GameState.dispose();
        showScreen(newGameScreen);
        GameState = new NewGameState();
    }
}

QuoteState.prototype.dispose = function() {
    e = this._element;
    e.style.display = "none";
};

function NewGameState() {

    var sun = installSunOnScreen(newGameScreen);

    this._rotateCnt = 0;
    this._w = 0;
    this._isMove = false;

    sun.ondblclick = function() {

        GameState._isMove = !GameState._isMove;
        var planets = GameState._planets;

        updatePlanets = function(planets) {

            if (GameState._isMove != false) {

                GameState._w += ((2 * Math.PI / G.LEVELS) / 100);

                for (var i = 1; i <= G.LEVELS; i++) {

                    planets[i].set(Math.round(G.X2 + Math.cos(GameState._w) * G.X2MENU), Math.round(G.Y2 + Math.sin(GameState._w) * G.X2MENU));

                    GameState._w += 2 * Math.PI / G.LEVELS;

                }

                setTimeout("updatePlanets(GameState._planets)", delay);
            }
        };

        setTimeout("updatePlanets(GameState._planets)", delay);
    };

    sun.onclick = function() {

        if (GameState._isMove)
            return;
        GameState._rotateCnt = 10;

        var planets = GameState._planets;

        updatePlanets = function(planets) {

            if (GameState._rotateCnt > 0) {
                GameState._w += ((2 * Math.PI / G.LEVELS) / 20);
                for (var i = 1; i <= G.LEVELS; i++) {
                    planets[i].set(Math.round(G.X2 + Math.cos(GameState._w) * G.X2MENU),
                            Math.round(G.Y2 + Math.sin(GameState._w) * G.X2MENU));
                    GameState._w += 2 * Math.PI / G.LEVELS;

                }
                GameState._rotateCnt--;
            }
            setTimeout("updatePlanets(GameState._planets)", delay);
        };
        setTimeout("updatePlanets(GameState._planets)", delay);
    };

    this._planets = new Array();
    this._w = 0;

    for (var i = 1; i <= G.LEVELS; i++) {

        if (i <= USER_LEVEL) {

            this._planets[i] = new PlanetButton(Math.round(G.X2 + Math.cos(this._w) * G.X2MENU), Math.round(G.Y2 + Math.sin(this._w) * G.X2MENU), i);

        }
        else {

            this._planets[i] = new NullPlanetButton(Math.round(G.X2 + Math.cos(this._w) * G.X2MENU), Math.round(G.Y2 + Math.sin(this._w) * G.X2MENU), i);
        }
        this._w += 2 * Math.PI / G.LEVELS;

    }

    _w = 0;
}

NewGameState.prototype.dispose = function() {
    e = newGameScreen;

    for (var i = e.childNodes.length - 1; i >= 0; i--) {
        if ((e.childNodes[i].className == "Sun") ||
                (e.childNodes[i].className == "Planet") ||
                (e.childNodes[i].className == "Target") ||
                (e.childNodes[i].className == "BBL_IN_STR")) {
            e.removeChild(e.childNodes[i]);

        }
    }
    e.style.display = "none";
};