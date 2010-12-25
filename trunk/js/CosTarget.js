CosTarget = newClass(SlideXTarget, {
		constructor: function(x, h, speed) {
			this.constructor.prototype.constructor.call(this, x, h, speed);
			
			this.heigth = h;    						
  		},
		
  		update: function() { 	
							
			this.nextX();
			this.nextY();			
			updateMyElement(this, this.x-G.TGT_R, this.y-G.TGT_R);    		
  		},
		
		nextY: function(){
			this.y = Math.abs( Math.round(  this.heigth*Math.cos( (this.x/180)*Math.PI ) ) ) + 20;
		},
			
	});	