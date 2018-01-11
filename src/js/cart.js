require(["config"],function(){
	require(["template","load"],function(template){
		$.cookie.json = true;
		var product = $.cookie("products")||[];
	console.log(product)
		
//		new Promise(function(resolve){
//		setInterval(function(){
//		 product = $.cookie("products")
//		resolve(product)
//	},1000)	
//	
//		}).then(function(product){
//			
//			console.log(product)
//		})
//		
	
		var pro = {
			products:product
		};
	var html = template("cart-template",pro);
	 $("#cart").html(html);
//点击删除就实现删除元素和cookie	
	
		 $("#cart").delegate(".delete","click",function(){
	Delete(this)
	
	 })
	function Delete(that){
	 	product.splice(find(that),1)
           $.cookie("products",product,{expires:7,path:"/"})
           $(that).parent().parent().remove();
            calc();
	}
	

//点击实现加减
 $("#cart").delegate(".add","click",function(){
     this.num = $(this).parent().find("input").val()
 	  this.num++
 	         $(this).parent().find("input").val(this.num)  
 	      product[find(this)].amount++
 	  
   this.parent = $(this).parent().parent()
 	      var price =parseFloat(this.parent.find(".price").text())
 	 
 	      this.parent.find(".calc span").text((price*this.num).toFixed(2))
 	      	      
 	      
 	       $.cookie("products",product,{expires:7,path:"/"})
 	       calc()
 })
 $("#cart").delegate(".reduce","click",function(){
     this.num = $(this).parent().find("input").val()
 	  this.num--;
 	  console.log(product)
 	         $(this).parent().find("input").val(this.num)  
 	         console.log(find(this))
      product[find(this)].amount--
 	      
 	      if(this.num<=0){
 	      	Delete(this)
 	      }
 	       this.parent = $(this).parent().parent()
 	      var price =parseFloat(this.parent.find(".price").text())
 	 
 	      this.parent.find(".calc span").text((price*this.num).toFixed(2))
 	      
 	    $.cookie("products",product,{expires:7,path:"/"})  
 	    calc()
 })
//点击实现清空购物车

$(".del-all").click(function(){
	console.log(this)
	$.cookie("products"," ",{expires:-1,path:"/"})
})
//选择删除和全选功能
$(".del-check").click(function(){
	var len = $("#cart").find(":checked").length
	    for(let i = 0; i<len;i++){
	    	Delete( $("#cart").find(":checked")[i])
	    }
	$("#cart").find(":checked").parent().parent().remove()
	 
calc();
	
	
})


//全选功能
$(".checkall").click(function(){
	if($(this).prop("checked")){

        $(".checkall").prop("checked", true);
        $(".cart-alert").find(":checkbox").prop("checked", true);
      
}else{
	   $(".checkall").prop("checked", false);
	      $("#cart").find(":checkbox").prop("checked", false)}
   
})


$("#cart").delegate(":checkbox","click",function(){
	  if( $("#cart").find(":checked").length===$("#cart").find(":checkbox").length){
	  	  $(".checkall").prop("checked", true);
	  }else{
	  	$(".checkall").prop("checked",false);
	  }
})


//找到对应元素到cookie
function find(that){
	     
		var id = $(that).parent().parent().find(".price").text()
	 	
	 	var index = isExist(id,product)
	 	return index
}

	  
//计算总价	   
	   calc();
	   function calc(){
	 	var total = 0; 
	 for(var i = 0 ;i<$(".calc span").length;i++){
	   	    total+=Number($(".calc span")[i].innerText)
	   }
	 
	   $(".calcall b b").text(total.toFixed(2))
	    
	};
	//数组对象中值是否存在
	   function isExist(id,products){
			
			for(var i =0;i<products.length;i++ ){
				if(id===products[i].price ){
					
				  return i ;
				   
				}
			}
			 return -1;
		}
	   
	 
	  
	})
	
})
