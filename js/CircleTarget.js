CircleTarget = newClass(Target, {
		constructor: function(x, y, radius, wd, wbegin) {
			this.constructor.prototype.constructor.call(this, x - radius, y);
			
    		this.xc = x;
			this.yc = y;
			this.r = radius;
			this.w = wd;
			this.angle = wbegin ? wbegin : 0;				
  		},
		
  		update: function() { 	
			
			this.angle+=this.w;
			this.nextX();
			this.nextY();
			updateMyElement(this, this.x-G.TGT_R, this.y-G.TGT_R);    		
  		},
		
		nextX: function(){
			this.x = (this.xc + this.r*Math.cos(this.angle));
		},
	
		nextY: function() {
			this.y = (this.yc + this.r*Math.sin(this.angle));
		}
		
	});	