
function Carousel({imgs,container,width,height,type,duration}){
	this.imgs = imgs;
	this.len = this.imgs.length;
	this.container = container;
	this.width = width;
	this.height = height;
	this.type = type;
	this.circles = null;
	this.lis = null;
	this.currIndex = 0;
	this.nextIndex = 1;
	this.timer = null;
	this.duration = duration;
	this.init();
	this.flag = true;
}
Carousel.prototype = {
	init:function(){
		var html = `<div class="fwCarousel_container">
		      <ul class="fwCarousel_ul">`
		      
		     for(var i =0;i<this.len;i++){
		     html +=`<li class="fwCarousel_li"><a href=${this.imgs[i].href}></a><img src=${this.imgs[i].src}></li>`
		     }

		
	html+=`</ul>
		<div class="pages"></div>
		<div class="pre">&lt;</div>
		<div class="nex">&gt;</div>
		</div>`
      this.container[0].innerHTML = html;	
		
	$(this.container[0].querySelector(".fwCarousel_container")).css({
		width:this.width+"px",
		height:this.height+"px",
		position:"relative",
		
		overflow:"hidden"
	})
	
	$(this.container[0].querySelector(".fwCarousel_ul")).css({
		width:(this.type==="slide"?this.width*this.len:this.width)+"px",
		height:this.height+"px",
		listStyle:"none",
		position:(this.type==="fade"?"relative":"absolute"),
	})
	this.lis = this.container[0].querySelectorAll(".fwCarousel_li")
	
	for(let i = 0 ;i<this.len;i++){
		
		
		
		$(this.lis[i]).css({
				width:this.width+"px",
				height:this.height+"px"
			})
		if(this.type==="fade"){
			$(this.lis[i]).css({
				display:"none",
				position:"absolute",
				top:0,
				left:0
			})
		}else{
			$(this.lis[i]).css({
				display:"block",
				position:"relative",
				float:"left"
			})
			
		}
		
		if(i===0){
			$(this.lis[i]).css({
				display:"block"
			})
		}
		
	}
	
	$(this.container[0].querySelector(".pages")).css({
		width:this.width+"px",
		height:"40px",
		background:"black",
		position:"absolute",
		bottom:0,
	})
	
	html = "";
	for(let i = 0;i<this.len;i++){
		html+="<i></i>"
	}
	this.container[0].querySelector(".pages").innerHTML=html;
	
	this.circles = this.container[0].querySelectorAll("i")
//	  $(".pages i").css({
//	background:"white",
//		height:"20px",
//		width:"20px",
//		float:"left",
//		margin:"5px",
//		borderRadius:"50%"
//	 })
	 
	this.circles[0].className = "current"
	
	this.bind()
  },
  autoPlay:function(){
  	this.timer = setInterval(()=>{
  		this.move()
  	},this.duration)
  
  },
  move:function(){
  	
  	   if(this.type==="slide"&&this.flag){
  	   	this.slide();
  	   }
  	    if(this.type==="fade"){
  	   	this.fade();
  	   }
  	  
  },
  fade:function(){
	$(this.lis[this.currIndex]).fadeOut(400)
	$(this.lis[this.nextIndex]).fadeIn(400)
  	this.circles[this.currIndex].className = "";
  	this.circles[this.nextIndex].className = "current";
  	this.currIndex  = this.nextIndex;
  	
  	  this.nextIndex++;
  	  if(this.nextIndex>=this.len)
  	  this.nextIndex = 0;

  },
  slide:function(){
  	this.flag = false;
  	var _width =-this.width*this.nextIndex;
  	this.circles[this.currIndex].className = "";
  	this.circles[this.nextIndex].className = "current";
  	 this.currIndex  = this.nextIndex;
	$(this.container[0].querySelector(".fwCarousel_ul")).animate({
		left:_width,
		
	},500,()=>{	
	 this.flag = true;
	})
  	
  	 this.nextIndex++;
  	  if(this.nextIndex>=this.len)
  	  this.nextIndex = 0;
  },
  bind:function(){
  	$(this.container[0].querySelector(".fwCarousel_container")).on("mouseenter",()=>{
		clearInterval(this.timer);
	})
  		$(this.container[0].querySelector(".fwCarousel_container")).on("mouseleave",()=>{
		this.autoPlay();
	})
	$(this.container[0].querySelector(".nex")).on("click",()=>{
		this.move();
	})
  	
  	$(this.container[0].querySelector(".pre")).on("click",()=>{
  		this.nextIndex = this.currIndex - 1;
		if(this.nextIndex<0)
		this.nextIndex = this.len-1
		this.move();
	})
  	
  	for(let i = 0 ; i<this.len;i++){
  		$(this.circles[i]).on("click",()=>{
  			this.nextIndex = i;
  			this.move();
  		})
  	}
  	
  }
	
	
}
