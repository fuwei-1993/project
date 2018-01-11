;
(function(){
	function xQuery(selector){
	return	new xQuery.prototype.init(selector)
		
	}
	xQuery.prototype={
		consotructor:xQuery,
		init:function(selector){
			if(typeof selector==="string"){
				let elements =document.querySelectorAll(selector);
			for(let i = 0,len=elements.length;i<len;i++){
				this[i] = elements[i];
				this.length = len;
			}
			
			}else if(typeof selector==="object"){
				this[0]=selector 
				this.length = 1
			}
			
		},
		css:function(options,attr){
			if(typeof options==="string"&&typeof attr==="undefined"){
				var _result = []
				for(let i =0;i<this.length;i++){
				
				 _result.push(window.getComputedStyle?getComputedStyle(this[i])[options]:this[i].currentStyle[options])
				}
				return _result
			}
			
			if(typeof options==="object"){
				
				for(let i =0;i<this.length;i++){
					
			for(let attr in options){
				if(options.hasOwnProperty(attr)){
					this[i].style[attr]=options[attr]
					
				}
				
			  }
			}
		  }
			if(typeof options==="string"&&typeof attr==="string"){
					for(let i =0;i<this.length;i++){
						this[i].style[options] = attr 
					}
			}
			
			return this;
		},
	
		animate:function(options,speed,fn){
			let _start = [],
			    _range=[];
			  
		for(let  i = 0;i<this.length;i++){	
			_start.push({})
			_range.push({})
		    for(let attr in options){
		    	if(options.hasOwnProperty(attr)){
//		      
		    		_start[i][attr] = parseFloat(getComputedStyle(this[i])[attr])
		    		_range[i][attr] = options[attr]-_start[i][attr]
		
		    	}
		 
		    	
		    }
		       
		    
		  }
		
		    var preTime = new Date();
		  this.timer = setInterval(()=>{
		    var curTime = new Date();
		    
		    var _elapsed = Math.min(curTime-preTime,speed);
		    for(let i = 0;i<this.length;i++){
		    	for(let attr in options){
		    		
		    		let _result =  _range[i][attr]/speed*_elapsed+_start[i][attr];
		    	
		    	   this[i].style[attr]=_result+(attr==="opacity"?"":"px");
		    	  
		    	}
		    	
		    }
		       if (_elapsed === speed) { // 运动结束
						clearInterval(this.timer);
						// 判断是否有运动结束后执行的函数，有则调用执行
						fn && fn();
					}
		    	
		    },1000/60)
		    
		return this;
		
		},
		show:function(){
			for(let i = 0 ;i<this.length;i++){
			this[i].style["display"] = "block";
			}
			return this;
		},
		hide:function(){
			for(let i = 0 ;i<this.length;i++){
			this[i].style["display"] = "none";
			}
			return this;
		},
		
		fadeIn:function(speed,fn){
			for(let i = 0;i<this.length;i++){
				let element = this[i];
				xQuery(element).show();
				element.style.opacity = 0;
				xQuery(element).animate({opacity:1},speed,fn)
			}
			return this;
		},
		fadeOut:function(speed,fn){
			for(let i = 0;i<this.length;i++){
				let element = this[i];
				xQuery(element).animate({opacity:0},speed,function(){
					xQuery(element).hide();
					fn&&fn();
				})
			}
			return this;
		},
		
		on:function (type,callback){
		for(let i = 0;i<this.length;i++){
	var element = this[i];	
		if(element.addEventListener){
		if(type.indexOf("on")==0){
			type = type.slice(2)
		}
		element.addEventListener(type,callback)
		
	}else{
		if(type.indexOf("on")!=0)
		type = "on"+type
		
		element.attachEvent(type,callback)
	}	
		
		}
	return this;
	},	
		
		
	}
	   xQuery.inArray = function(value, array){
		/* 浏览器支持使用数组的 indexOf() 方法 */
		if (Array.prototype.indexOf)
			return array.indexOf(value);
		/* 浏览器不支持使用数组的 indexOf() 方法 */
		for (var i = 0, len = array.length; i < len; i++) {
			if (value === array[i])
				return i;
		}
		return -1;
	}
	   xQuery.ajax = function(options){
	  		var url = options.url;
	  		if(!url)
	  		return;
	  	var method = (options.type || "GET").toUpperCase();
	  	var queryString = null;
	  	if(options.data){
	  	for(var attr in options.data){
	  		queryString = [];
	  	queryString.push(attr+"="+options.data[attr]);
	  
	  		
	  	}
	  		queryString = queryString.join("&");
	  	      }
	  	
	  	if(method==="GET"){
	  		 url+="?"+queryString;
	  		queryString = null;
	  	}
	  	
	  	var xhr = new XMLHttpRequest();
	  	
	  	  xhr.open(method,url,true);
	  	if(method==="POST")
	  	xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	  	
	  	
	  	xhr.send(queryString);
	  	
	  	xhr.onreadystatechange = function(){
	  		if(xhr.readyState===4&&xhr.status===200){
	  			var Data = xhr.responseText;
	  			if(options.dataType==="json"){
	  				Data = JSON.parse(Data)
	  			}
	  			options.success&&options.success(Data);
	  			
	  		}else{
	  			options.error&&options.error(xhr.statusText);
	  		}
	  		
	  	}
	  	
	  	
	  	
	  	
	  	   }
	   
	   
	   
	     xQuery.prototype.init.prototype = Object.create(xQuery.prototype)
	    
	    window.$=window.xQuery = xQuery
})();
