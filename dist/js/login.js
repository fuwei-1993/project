"use strict";require(["config"],function(){require(["load"],function(){function a(){$.ajax({url:"http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7",type:"get",dataType:"json",success:function(a){var s=a.showapi_res_body.image,e=a.showapi_res_body.sid;$("#code-val").attr("src",s),$("#code-val").data("sid",e)}})}a(),$(".next-code").click(a),$("#btn-login").on("click",function(a){a.preventDefault();var s="http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=08402fce064a484baad949d9a18f75e7&checkcode="+$(".code").val()+"&sid="+$("#code-val").data("sid");$.getJSON(s,function(a){a.showapi_res_body.valid?function(){var a=$(".user").val(),s=$(".pass").val();$.ajax({type:"post",url:"http://10.7.187.131/PHP2/login.php",data:"username="+a+"&password="+s,dataType:"json",success:function(s){1===s.status?($("#msg-wrap").css({display:"none"}),$.cookie("username",a,{path:"/"}),$("#auto-login").prop("checked")&&$.cookie("username",a,{expires:7,path:"/"}),location="/index.html "):($("#msg-wrap").css({display:"block"}),$(".msg-error").text("请输入正确的账号密码"))}})}():($("#msg-wrap").css({display:"block"}),$(".msg-error").text("请输入正确的验证码"))})})})});