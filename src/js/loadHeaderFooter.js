define(["jquery","cookie"],function($){
	//将header。HTML加载显示，绑定交互效果
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
	}
	})
	
	$(".footer").load("/html/include/footer.html")
})


