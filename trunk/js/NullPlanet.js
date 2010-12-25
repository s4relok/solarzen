NullPlanet = newClass(Planet, {
	
		constructor: function() {
			//this.constructor.prototype.constructor.call(this, x, y);
												
  		},
		
  		set: function(x, y) { 	
						    		
  		},
		
		isCross: function(x, y){
			
		    return false;
		},
				
		update: function(){
			
		},
				
		setFixed: function(isFix){
			
		},
				
		isRealCross: function(x, y){
			
		    return false;
		},
						
		hide: function(){
			
		},
		
		show: function(){
			return false;
		},
		
		doTouchDown: function(xc, yc){
							
			return false;
		},
		
		
		
		doTouchMove: function(xc, yc){
                            
            return true;
			
		},
		
		doTouchUp: function(x, y){
						
			return false;
		},
		
		setDragged: function(isDrag){
			
		},
				
		releasePlanet: function(){
			
						
		}
			
	});	
