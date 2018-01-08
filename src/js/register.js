require(["config"],function(){
 		require(["load"],function(){
//到、动态生成验证码 		
 		function generate (){	
	$.ajax({
		url : "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7",
		type:"get",
		dataType:"json",
		success:function(data){
			var src = data.showapi_res_body.image;
			var sid = data.showapi_res_body.sid; 
			$("#imgCode").attr("src",src);
			$("#imgCode").data("sid",sid);
		}
	});
    }
	
	generate();
    $("#nex-img").click(generate);
//点击切换验证码并验证验证码    
 
        
    $(".UIcode").on("blur",codeTest)
   var flag = false; 
 function codeTest(){
   
    var _input = $(this).val();
    	var _sid = $("#imgCode").data("sid");
    	var url =  `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode=${_input}&sid=${_sid}`;
    	$.getJSON(url,function(data){
    	
    		if(!data.showapi_res_body.valid){
    			flag = false;
    			$(".p3 .error").css({display:"block"});
    			$(".p3 .error").html("<i><b>x</b></i>图形验证码错误");
    			
    			
    		}else{
    		     flag = true;
    		    $(".p3 .error").css({display:"none"});
    		     
    		}
             
    	})
    	
    }
   
 
//手机号格式验证 
 
  $(".phone").on("blur",phoneTest)


function phoneTest(){
  
   var reg = /^\d{11}$/;
  
  var val = $(".phone").val();
      if(reg.test(val)){
      $(".p2 .error").css({display:"none"});
      
      }else{
      	$(".p2 .error").css({display:"inline-block"});
      	$(".p2 .error").html("<i><b>x</b></i>手机号格式不对");
  
      }   
   return reg.test(val)
 }



//密码格式验证
$(".password").on("blur",passTest);
function passTest(){
 var reg = /^\w{6,20}$/ ;
 var val = $(".password").val(),
     val2 = $(".confirm").val();
    if(val==""){
     $(".p5 i").css({background:"yellow"});
     $(".p5 .error ").css({display:"inline-block",color:"black"});
      
    $(".p5 .error").html("<i><b>i</b></i>密码不能为空");
    }
    
    else if(!reg.test(val)){
    $(".p5 .error").css({display:"inline-block",color:"red"})
    $(".p5 .error").html("<i><b>x</b></i>密码格式不正确");
    }
   
    
     else{
    
      $(".p5 .error").css({display:"none"})
       return true;
     }

}


//确认密码一致
$(".confirm").on("blur",passConfir)
function passConfir(){
var val = $(".password").val(),
     val2 = $(".confirm").val();
    if(val2!==val){
     $(".p5 .error").css({display:"inline-block",color:"red"})
    $(".p5 .error").html("<i><b>x</b></i>密码输入不一致");
    return false;
    }else{
     $(".p5 .error").css({display:"none"});
     return true;
    }

}

//验证通过过后将数据提交到数据库
 $(".final").on("click",function(){
  var user = $(".phone").val();
  var pass = $(".password").val();
 if(passConfir()&&passTest()&&phoneTest()&&flag&&$("#deal").prop("checked")){
    $.ajax({
        url:"http://10.7.187.131/PHP2/register.php",
        type:"post",
        dataType:"json",
        data:`username=${user}&password=${pass}`,
        success:function(data){
          if(data.status!==0){
          	$(".p2 .error").css({display:"inline-block"});
      	    $(".p2 .error").html(`<i><b>x</b></i>${data.message}`);
  
          }else{
            alert(data.message);
          
          }
         
        }
    });
   
}


});






 })

})
