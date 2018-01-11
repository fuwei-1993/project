require(["config"],function(){
	require(["template","load"],function(template){
		$.cookie.json = true;
		$.ajax({
			type:"get",
			url:"/mock/cart-data.json",
			async:true,
			dataType:"json",
			success:function(data){
				var pro = {
					products:data.res_body.data
				}
				
				var html = template("pr-template",pro)
				$(".cart-list").html(html)
			}
		});
		$(".cart-list").delegate(".add-cart","click",function(e){
			  var children = $(this).parent().parent().children()
			  
			var pro = {
				
				     id:children.eq(0).text(),
				     standrad:children.eq(1).text(),
				     imgSrc:children.eq(2).children().attr("src"),
                       detail:children.eq(3).find("a").text(),
                       price:children.eq(3).find("span:last").text(),
                       script:children.eq(4).find("span").text(),
                       amount:1
			}
			//克隆一个图片对象按照动画效果进入购物车(未完成)
			var _img = children.eq(2).children().clone();
			_img.css({position:"absolute",top:0,left:0,zIndex:9999});
			children.eq(2).append(_img);
			var _top = e.clientY;
			var _left = $(window).width()-e.clientX;
		

			_img.animate({width:"50",height:"50"},1000).delay(500).animate({top:-_top,left:_left},1000,function(){
				_img.remove()
			});
			
			
      		var products = $.cookie("products")||[];
      		   var index = isExist(pro.id,products);
      		   if(index===-1){
      		   	products.push(pro)
      		   
      		   }else{
      		   	products[index].amount++
      		   }
      		   
      		   
      		$.cookie("products",products,{expires:7,path:"/"})
			
			
		})
		
		
	
		
	
		function isExist(id,products){
			
			for(var i =0;i<products.length;i++ ){
				if(id===products[i].id ){
					
				  return i ;
				   
				}
			}
			 return -1;
		}
		
		
		
	})
	
})
