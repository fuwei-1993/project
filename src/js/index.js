require(["config"], function(){
	require(["template","load"], function(template){
		$.ajax({
			type:"get",
			url:"/mock/list.json",
			async:true,
			dataType:"json",
			success:function(data){
				var prd = {
					products:data.res_body.data
				};
				var html = template("prod_template",prd)
				$("#floor").html(html)				
			}
		});
     
       
      
       
      
	});
	require(["tools","carousel"],function(){
		
		
		$.ajax({
			dataType:"json",
			type:"get",
			url:"/mock/data.json",
			success:function(data){
				
				var d = new Carousel({
			
		    	imgs:data.res_body.imgs,
						container:$(".banner"),
					     width:1263,
						height:500,
						type:"slide",
						duration:3000
		})
				d.autoPlay();
				
			}
		});
		
	
	})

	
});