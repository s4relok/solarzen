Carousel = newClass(null, {

    constructor: function(planets, lives) {

        for (var i = 0; i < G.numInCarousel; i++) {
            var e = document.createElement("div");
            e.className = "BBL_IN_STR";
            e.style.left = G.BBL_POS[i * 2] + G.STR_C_X - G.STR_R - G.BBL_R + "px";
            e.style.top = G.BBL_POS[i * 2 + 1] + G.STR_C_Y - G.STR_R - G.BBL_R + "px";

            gameplayScreen.appendChild(e);
        }

        this.mCells = new Array();
        this.mContainer = new Array();
        this.cntContainer = 0;
        this.mLives = lives;

        this.cntContainer = planets.length - G.numInCarousel;

        if (planets.length < G.numInCarousel) {

            for (var i = 0; i < planets.length; i++) {
                this.mCells[i] = planets[i];
                this.setPosition(this.mCells[i], i);
            }

            for (var i = planets.length; i < G.numInCarousel; i++) {
                this.mCells[i] = new NullPlanet();
            }

        } else {

            for (var i = 0; i < G.numInCarousel; i++) {
                this.mCells[i] = planets[i];
                this.setPosition(this.mCells[i], i);
            }

            if (this.cntContainer > 0) {
                for (var i = 0; i < this.cntContainer; i++) {
                    this.mContainer[i] = planets[i + G.numInCarousel];
                    planets[i + G.numInCarousel].hide();
                }
            }

        }

        this.updateContainerCnt();

        //gameplaystate_inst.mLives = this.mCells;
    },

    updateContainerCnt: function() {
        if (this.cntContainer <= 0) {
            document.getElementById("cntContainer").style.display = "none";
        }
        else {
            document.getElementById("cntContainer").style.display = "block";
            document.getElementById("cntContainer").innerHTML = "+ " + this.cntContainer;
        }

    },

    update: function() {

    },

    slideRight: function() {

        var bp;
        bp = this.mCells[0];

        for (var i = 0; i < G.numInCarousel - 1; i++) {
            this.mCells[i] = this.mCells[i + 1];
            this.setPosition(this.mCells[i], i);
        }

        this.mCells[G.numInCarousel - 1] = bp;
        this.mCells[G.numInCarousel - 1].set(G.BBL_POS[(G.numInCarousel - 1) * 2] +
                G.STR_C_X - G.STR_R, G.BBL_POS[(G.numInCarousel - 1) * 2 + 1] + G.STR_C_Y - G.STR_R);

    },

    setPosition: function(p, i) {
        if (p instanceof NullPlanet) return;
        p.show();
        p.set(G.BBL_POS[i * 2] + G.STR_C_X - G.STR_R, G.BBL_POS[i * 2 + 1] + G.STR_C_Y - G.STR_R);
    },

    resetCarousel: function() {
        for (var i = 0; i < G.numInCarousel; i++) {
            this.mCells[i].setFixed(true);
            this.setPosition(this.mCells[i], i);
        }
    },

    add: function(p) { //Planet p

        for (var i = 0; i < G.numInCarousel; i++) {
            if (this.mCells[i] instanceof NullPlanet) {
                this.mCells[i] = p;
                this.setPosition(this.mCells[i], i);
                return;
            }
        }

        function hidePlanetBeyondGameField(p) {
            p.set(-200, -200);
        }

        for (var i = 0; i < this.mContainer.length; i++) {
            if (this.mContainer[i] instanceof NullPlanet) {
                p.setFixed(true);
                this.mContainer[i] = p;

                hidePlanetBeyondGameField(this.mContainer[i]);

                this.cntContainer++;
                this.updateContainerCnt();
                return;
            }
        }

    },

    doTouchDown: function(xc, yc) {

        for (var i = 0; i < G.numInCarousel; i++) {

            if (this.mCells[i].isRealCross(xc, yc)) {

                this.mCells[i].doTouchDown(xc, yc);
                return true;
            }
        }

        return false;
    },

    doTouchMove: function(xc, yc) {

        for (var i = 0; i < G.numInCarousel; i++) {

            this.mCells[i].doTouchMove(xc, yc);

        }
        return false;

    },

    doTouchUp: function(xc, yc) {

        for (var i = 0; i < G.numInCarousel; i++) {

            if (this.mCells[i].doTouchUp(xc, yc)) {
//                playSound('menu_out');
                this.mLives.add(this.mCells[i]);
                this.mCells[i] = this.nextFromContainer(i);

                return true;
            }

        }

        return false;

    },

    nextFromContainer: function(pos) {
        for (var i = 0; i < this.mContainer.length; i++) {
            if (!(this.mContainer[i] instanceof NullPlanet)) {
                p = this.mContainer[i];
                this.mContainer[i] = new NullPlanet();

                this.setPosition(p, pos);

                this.cntContainer--;
                this.updateContainerCnt();

                return p;
            }
        }

        return new NullPlanet();
    }

});
