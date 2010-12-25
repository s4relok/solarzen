Target = newClass(Point, {
    constructor: function(x, y) {
        this.constructor.prototype.constructor.call(this, x, y);
        this.isCrossed = false;
    },

    update: function() {
        // for override
    },

    isCross: function(p) {
        if (!p instanceof Planet)
            throw new Error("Illegal argument. Not 'Planet'.");

        if (this.isCrossed)
            return false;

        this.isCrossed = p.isCross(this.x, this.y);
        return this.isCrossed;
    },

    setCrossed: function(isCrossed) {
        this.isCrossed = isCrossed;
    }
});