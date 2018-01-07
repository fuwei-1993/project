require(["config"], function(){
	require(["load"], function(){
//实现验证码的生成		
	function generate (){	
	$.ajax({
		url : "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7",
		type:"get",
		dataType:"json",
		success:function(data){
			var src = data.showapi_res_body.image;
			var sid = data.showapi_res_body.sid; 
			$("#code-val").attr("src",src);
			$("#code-val").data("sid",sid);
		}
	});
    }
	
	generate();
    $(".next-code").click(generate);
//点击切换验证码并验证验证码    
    $("#btn-login").on("click",function(e){
 	e.preventDefault();
    	var _input = $(".code").val();
    	var _sid = $("#code-val").data("sid");
    	var url =  `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_input}&sid=${_sid}`;
    	$.getJSON(url,function(data){
    	
    		if(!data.showapi_res_body.valid){
    			
    			$("#msg-wrap").css({display:"block"});
    			$(".msg-error").text("请输入正确的验证码");
    		}else {
    			test();
    		}

    		
    	})
    	
     
    	 
    	
    	
    	
    	
    })

 
 //登录账号密码验证  
   function test(){

    		 var user =$(".user").val(),
    		     pass =$(".pass").val();
           
    $.ajax({
    	type:"post",
    	url:"http://10.7.187.131/PHP2/login.php",
	    data:`username=${user}&password=${pass}`,
	    dataType:"json",
    	success:function(data){
            if(data.status===1){
            	$("#msg-wrap").css({display:"none"});
            	$.cookie("username",user,{path:"/"});
            if($("#auto-login").prop("checked")){
            	$.cookie("username",user,{expires:7,path:"/"});
            }
            	location = "/index.html ";
            	
            }else{
            	$("#msg-wrap").css({display:"block"});
    			$(".msg-error").text("请输入正确的账号密码");
            }
   
    	}
    	
    })	

}
  
       
	});
});