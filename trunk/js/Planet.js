Math.toDegrees = function(arg){
	return (arg/180)*Math.PI;
}

Planet = newClass(Point, {
	
		constructor: function(number, x, y) {
			this.constructor.prototype.constructor.call(this, x, y);
			
			this.number = number;
			this.Vx = -7;
			this.Vy = 0;
			this.isFixed = true;
			this.isDragged = false;
			
			this._element = installPlanetOnScreen(x, y,
		 		"url('images/sz/planet_" + number + ".png')",
		  		gameplayScreen);
		  
			this._element.planet = this;
			 
			/*
			this._element.onclick = function(){
				this.planet.isFixed = false;
			}
			*/									
  		},
		
  		set: function(x, y) { 	
			this.constructor.prototype.set.call(this, x, y);	
			updateMyElement(this, this.x - G.rPlanet, this.y - G.rPlanet);
			    		
  		},
		
		setFixed: function(isFix){
			this.isFixed = isFix;
		
			if(!isFix)
				Planet.numPlanetsFly++;
		},
		
		isCross: function(x, y){
			var dX = x - this.x;
		    var dY = y - this.y;
		    return Math.sqrt(dX * dX + dY * dY) < (G.SUN_R+ G.rPlanet - 7);
		},
		
		isRealCross: function(x, y){
			var dX = x - this.x;
		    var dY = y - this.y;
		    return Math.sqrt(dX * dX + dY * dY) < G.rPlanet;
		},
				
		update: function(){
			
			if(this.isFixed)
			return;
		
			var yys = G.Y2 - this.y;
			var xxs = G.X2 - this.x;
			
			var length = Math.sqrt(Math.pow(yys, 2)+ Math.pow(xxs, 2));
	
			var cosPl = yys/length;
			var sinPl = xxs/length;
					
			var gravitation =  (17 * ( (10*67) / (Math.pow(length, 2)) ));
			
			var tgPl = yys/xxs;
			
			//mFollower.setCurrentPosition(x, y, tgPl);	
			
			this.length = length;	
			
			// speed
			this.Vx += gravitation*sinPl;
			this.Vy += gravitation*cosPl;
			
			// position
			this.y += Math.round(this.Vy);
			this.x += Math.round(this.Vx);
			
			updateMyElement(this, this.x - G.rPlanet, this.y - G.rPlanet);
		},
		
		hide: function(){
			this._element.style.display = "none";
		},
		
		show: function(){
			this._element.style.display = "block";
		},
		
		doTouchDown: function(xc, yc){
			if(this.isFixed){
				cntPowerElement.style.display = "block";
				this.setDragged(true);
				return true;
			}				
			return false;
		},
		
		
		
		doTouchMove: function(xc, yc){
            if (this.isDragged) {
				
				updateElementPosition(cntPowerElement,
				 		xc, yc - 25);
				
				this.mx = xc;
				this.my = yc;
				
				// arrow
				var mx_xp = this.mx - this.x;
				var my_yp = this.my - this.y;
				
				// full length
				this.mxy = Math.sqrt(Math.pow(mx_xp, 2)+Math.pow(my_yp, 2));
		
				// angle correcting
				{
					this.sin = mx_xp/this.mxy;
					
					if(this.my - this.y > 0 )				
						this.m_angle = Math.toDegrees(Math.asin(this.sin));
					else {
						if(Math.asin(this.sin)<0)
							this.m_angle = Math.toDegrees(-(Math.PI + Math.asin(this.sin)));
						else
							this.m_angle = Math.toDegrees(Math.PI - Math.asin(this.sin));
					}
				}
				
				// if too little
				if(this.mxy < G.ARROW_MIN_LEN){
					
					this.sin = mx_xp/this.mxy;
					this.cos = my_yp/this.mxy;			
					
					this.mx = this.x + this.sin*G.ARROW_MIN_LEN;
					this.my = this.y + this.cos*G.ARROW_MIN_LEN;
					
					this.mxy = G.ARROW_MIN_LEN;
					
				}
				
				// if too long
				else if(this.mxy > G.ARROW_LEN){
					
					this.sin = mx_xp/this.mxy;
					this.cos = my_yp/this.mxy;			
					
					this.mx = this.x + this.sin*G.ARROW_LEN;
					this.my = this.y + this.cos*G.ARROW_LEN;
					
					this.mxy = G.ARROW_LEN;
		
				}
				
				this.pow = Math.round( (this.mxy - G.ARROW_MIN_LEN) / G.SAMPLE_1_7) + 1;
				
				cntPowerElement.innerHTML = this.pow;
				
				return false;	
				
			}
                
            return true;
			
		},
		
		doTouchUp: function(x, y){
			if(this.isDragged){
				
				cntPowerElement.style.display = "none";
				this.setDragged(false);			
				this.releasePlanet();
							
				return true;
			}
			
			return false;
		},
		
		setDragged: function(isDrag){
			this.isDragged = isDrag;
		},
				
		releasePlanet: function(){
			
			this.setFixed(false);
			
			var min_x = this.sin*G.ARROW_MIN_LEN;
			var min_y = this.cos*G.ARROW_MIN_LEN;
			
			var dx = this.mx - this.x;
			var dy = this.my - this.y;					
			
			this.Vx = min_x/G.SPEED_MIN_DIVIDER + (dx - min_x) / G.SPEED_DIVIDER;
			this.Vy = min_y/G.SPEED_MIN_DIVIDER + (dy - min_y) / G.SPEED_DIVIDER;
						
		},
		
        isFarAway: function(){
            if (this.length >= G.MAX_LENGTH) 
                return true;
            return false;
        }
		
			
	});	
