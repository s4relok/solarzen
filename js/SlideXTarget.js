SlideXTarget = newClass(Target, {
    constructor: function(x, y, speed) {
        this.constructor.prototype.constructor.call(this, x, y);

        this._speed = speed;
    },

    update: function() {

        this.nextX();
        updateMyElement(this, this.x - G.TGT_R, this.y - G.TGT_R);
    },

    nextX: function() {
        if (this._speed > 0)
            this.x = this.x != G.SCREEN_WIDTH + G.SUN_R ? this.x + this._speed : - G.SUN_R;
        else
            this.x = this.x != - G.SUN_R ? this.x + this._speed : G.SCREEN_WIDTH + G.SUN_R;
    }

});