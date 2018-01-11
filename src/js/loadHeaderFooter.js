define(["jquery","cookie","template"],function($,a,template){
	//将header。HTML加载显示，绑定交互效果
	$.cookie.json =true;
	$.ajax("/html/include/header.html").done(function(data){
     $(".header").html(data)
	}).done(function(){
	if($.cookie("username")){
		$("#login").html(`<a href="#">${$.cookie("username")}</a>`);
		$(".register").html(`<a href="#">[退出]</a>`);
		$(".register").click(function(){
			$.cookie("username","",{expires:-1});
			location.reload();
			
		})
		
	};
	
	
	
	if($(".searwrap").length!==0){
		var _top = $(".searwrap").offset().top;
	

	$(window).on("scroll",function(){
		var scroll = $(document).scrollTop();
		if(scroll>=_top){
			$(".searwrap").css({position:"fixed",top:0,zIndex:2})
			$(".searwrap").css({background:"rgba(224,224,224,0.9)"});
			
		}else{
			$(".searwrap").css({position:"relative",zIndex:1});
			$(".searwrap").css({background:"rgba(224,224,224,1)"});
			
		}
	  
	})
	
	}
	//在其他不用下拉打开到页面实现hover到功能
	if($(".catalist").css("display")==="none"){
	
		
		$(".catalogos").mouseenter(function(){
			$(".catalist").css("display","block")
		})
			$(".catalogos").mouseleave(function(){
		$(".catalist").css("display","none")
		   
	})
		$(".catalist").hover(function(){
		
		 $(".catalist").css("display","block")
	},function(){
		$(".catalist").css("display","none")
	})
		  

	
	}
	
//在购物车里添加cookie
//删除

setInterval(function(){

		var product = $.cookie("products")||[];
		
		var pro = {
			products:product
		}
		var html = template("shop-template",pro);
		
		$(".shopping-list").find("ul").html(html);
		
		$(".shopping-list").delegate(".delete","click",function(){
		 Delete(this,product)
          
		})
		 dom(product)
			
		},800)
		
		
//将对应到数据加到DOM元素中	
function dom(product){
	if(product.length!==0){
	var num=[];
		var num2 = [];
		for(var i = 0;i<product.length;i++){
		      num.push(product[i].amount	)
		      num2.push(product[i].amount*product[i].price)
		}
		
		var tex = num.reduce(function(a,b){
			return a+b
		})
		var pri =( num2.reduce(function(a,b){
			return a+b
		})).toFixed(2)
	    $(".text .s1").find("b").text(tex);  
		$(".total-num").find("b").text(tex);
		 $(".text .s2").find("b").text(pri);
		 $(".total-price").text(pri);

}else{
	 $(".text .s1").find("b").text(0);  
		$(".total-num").find("b").text(0);
		 $(".text .s2").find("b").text("0.0");
		 $(".total-price").text("0.0");
	$.cookie("products","",{expires:-1,path:"/"})
	
}
}

		
		
	

	
	
//点击实现删除函数
	function Delete(that,product){
	 	product.splice(find(that,product),1)
           $.cookie("products",product,{expires:7,path:"/"})
           $(that).parent().parent().remove();
           
	}
//找到对应元素到cookie
function find(that,product){
	     
		var id = $(that).parent().parent().find(".id").text()
	 	
	 	var index = isExist(id,product)
	 	return index
}
 function isExist(id,products){
			
			for(var i =0;i<products.length;i++ ){
				if(id===products[i].id ){
					
				  return i ;
				   
				}
			}
			 return -1;
		}
	
	
	}).done(function(){
	$(".shopping-cart").hover(function(){
	  $(".shopping-list").stop().fadeIn();
	},function(){
	  $(".shopping-list").stop().fadeOut();
	})
	
	
	
	
	
	})
	
	
	
	
	$(".footer").load("/html/include/footer.html")
})


