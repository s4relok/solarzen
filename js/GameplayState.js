gameplayState = newClass(null, {

    constructor: function() {

        this.sun = installSunOnScreen(gameplayScreen);
        this.sun.onclick = function() {
            GameState.reset();
        };

        this.handle = document.getElementById("handle");
        this.handle.onclick = function() {
            GameState.mCar.slideRight();
        };

        var btnGameplayBack = document.getElementById("btnGameplayBack");
        btnGameplayBack.onclick = function() {
            GameState.dispose();
            showScreen(newGameScreen);
            GameState = new NewGameState();
        };

        this.mLives = new ArrayList();
        this.isEnd = false;

        var planetsNum = USER_LEVEL;
        var planets = new Array();

        for (var i = planetsNum; i > 0; i--) {

            planets[(planetsNum) - i] = new Planet(i, 160, G.rPlanet);
        }

        this.mCar = new Carousel(planets, this.mLives);
        this.mTargets = new TargetList(LEVELS_TARGETS[CURRENT_LEVEL]);

        this.v = 0;

        this._screen = gameplayScreen;
        var power = 0;
        var curPlanet = null;
        var Vx = 0;
        var Vy = 0;


        window.onmousedown = function(e) {
            e = fixEvent(e);

            var x = e.pageX - gameplayScreen.offsetLeft;
            var y = e.pageY - gameplayScreen.offsetTop;


            if (GameState.isEnd)
                return false;

            GameState.mCar.doTouchDown(x, y);

            /*
             for(var i in GameState.mCar.mCells){
             if(!GameState.mCar.mCells[i] instanceof Planet)
             continue;

             if(GameState.mCar.mCells[i].isRealCross(e.x, e.y)){
             curPlanet = GameState.mCar.mCells[i];
             cntPowerElement.style.display = "block";
             }

             }
             */

            return true;
        }

        /*this._screen*/
        window.onmousemove = function(e) {
            e = fixEvent(e);
            var x = e.pageX - gameplayScreen.offsetLeft;
            var y = e.pageY - gameplayScreen.offsetTop;

            if (GameState.isEnd)
                return false;

            GameState.mCar.doTouchMove(x, y);
            return true;
        }

        window.onmouseup = function(e) {
            e = fixEvent(e);
            var x = e.pageX - gameplayScreen.offsetLeft;
            var y = e.pageY - gameplayScreen.offsetTop;

            if (GameState.isEnd)
                return false;

            GameState.mCar.doTouchUp(x, y);
            return true;
        }
    },

    update: function() {

        //this.v += 0.001;
        //document.getElementById("debug").innerHTML = this.v;

        if (!this.isEnd) {
            //this.mCar.update();
            this.mTargets.update();
        }

        var i = this.mLives.iterator();

        while (i.hasNext()) {
            var p = i.next();

            if (!this.isEnd) {

                p.update();

                if (p.isCross(G.X2, G.Y2) || p.isFarAway()) {

                    //m.getSoundState().play(R.raw.pln_dst_bypln, 0);
                    this.mCar.add(p);
                    this.mCar.resetCarousel();
                    p = new NullPlanet();
                    this.mLives.set(i.index - 1, p);
                }

            }
        }


        if (!this.isEnd) {
            if (this.mTargets.checkVictory(this.mLives.array)) {
                // onWin
                this.onWin();
            }
        }

        if (GameState.update)
            setTimeout("if(GameState.update) GameState.update();", delay);

    },

    onWin: function() {

        this.isEnd = true;


        setTimeout("GameState.onAfterWin();", 3000);

        //m.getSoundState().play(R.raw.lvl_ends, 0);

        /*
         Timer t = new Timer();
         t.schedule(new TimerTask(){


         public void run() {
         onAfterWin();
         }

         }, 4000);*/
    },

    onAfterWin: function() {
        this.dispose();
        GameState = new QuoteState();
    },

    dispose: function() {
        e = gameplayScreen;
        //e.removeChild()

        for (var i = e.childNodes.length - 1; i >= 0; i--) {
            if ((e.childNodes[i].className == "Sun") ||
                    (e.childNodes[i].className == "Planet") ||
                    (e.childNodes[i].className == "Target") ||
                    (e.childNodes[i].className == "BBL_IN_STR" )) {
                e.removeChild(e.childNodes[i]);

            }
        }
        ;

        e.style.display = "none";
    },

    clearLives: function() {

        this.mLives = new ArrayList();
        this.mCar.mLives = this.mLives;
    },

    reset: function() {
        Planet.numPlanetsFly = 0;

        var i = this.mLives.iterator();

        while (i.hasNext()) {
            var p = i.next();
            if (!(p instanceof NullPlanet))
                this.mCar.add(p);
        }

        this.clearLives();
        this.mCar.resetCarousel();
    }

});