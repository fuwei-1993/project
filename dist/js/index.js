"use strict";require(["config"],function(){require(["template","load"],function(e){$.ajax({type:"get",url:"/mock/list.json",async:!0,dataType:"json",success:function(t){var o={products:t.res_body.data},n=e("prod_template",o);$("#floor").html(n)}}).done(function(){})}),require(["tools","carousel"],function(){$.ajax({dataType:"json",type:"get",url:"/mock/data.json",success:function(e){new Carousel({imgs:e.res_body.imgs,container:$(".banner"),width:1263,height:500,type:"slide",duration:3e3}).autoPlay()}})})});