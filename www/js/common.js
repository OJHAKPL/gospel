	/*--------- Login -----------*/  
	function printData() {
		
		$('#book_page').html('<div style="margin-top:20%;text-align:center;padding-left:-4%;"><img src="images/ajax-loader-list.gif"></div>');
		$.post(
		"http://workplace.gisllp.com/jacob/web_home",
		{
		  url: $("#search_url").val()
		},
		
		function(data,status){
		alert('hi');
			var dataArray = jQuery.parseJSON(data);
			
			var htmlStr='';
			if(dataArray.success){
				localStorage.setItem('book_url',dataArray.book_url);
				localStorage.setItem('book_url_old',dataArray.book_url);
				$('#book_page').html(dataArray.success);
				$('a').attr('onclick', 'change_url(this);');
				$('a').removeAttr('target');
				$( ".search-panel" ).hide();
			} else {
				if(dataArray.error){
					$(".flash-message").show();
					$(".flash-message").addClass("failure-msg");
					$(".flash-message").text(dataArray.error);
					setTimeout(function() {
					$('.flash-message').hide();
					}, 3000);
				}		
			}			
		});
	}
	
	
	
	function show_bookmark_url(myurl) {
		$.post(
				"http://workplace.gisllp.com/jacob/web_home",
		{
		  url: myurl
		},
		
		function(data,status){
			var dataArray = jQuery.parseJSON(data);
			
			var htmlStr='';
			if(dataArray.success){
				localStorage.setItem('book_url',dataArray.book_url);
				$('#book_page').html(dataArray.success);
				$('a').attr('onclick', 'change_url(this);');
				$('a').removeAttr('target');
			} else {
				if(dataArray.error){
					$(".flash-message").show();
					$(".flash-message").addClass("failure-msg");
					$(".flash-message").text(dataArray.error);
					setTimeout(function() {
					$('.flash-message').hide();
					}, 3000);
				}		
			}			
		});
	}
	
	
	function bookmark_url(){
		var my_url = localStorage.getItem('book_url');
		var new_urls  = new Array();
		//var new_urls = "'"+localStorage.getItem('book_url')+"'";
		var k =0;
		var object = JSON.parse(localStorage.getItem("bookmark_url_my"));
		if(object){
			for(var i=0;i<=object.length;i++){
				if(object[i]){
					//new_urls = new_urls + ','+object[i];
					new_urls[i] = object[i];
					k = i+1;
				}
			}
		}
		if(new_urls.indexOf(localStorage.getItem('book_url')) > -1){
			$(".flash-message").show();
			$(".flash-message").addClass("success-msg");
			$(".flash-message").text('Bookmark already exist.');
			setTimeout(function() {
			$('.flash-message').hide();
			}, 3000);
			return false;
		}else{
			new_urls[k] = localStorage.getItem('book_url');
		}
		
		//new_urls = new_urls.replace('"', '');	
		console.log(new_urls);
		localStorage.setItem("bookmark_url_my", JSON.stringify(new_urls));
		
		if(my_url){
			$(".flash-message").show();
			$(".flash-message").addClass("success-msg");
			$(".flash-message").text('Bookmark has been added.');
			setTimeout(function() {
			$('.flash-message').hide();
			}, 3000);
		}		
	}
	
	function show_all_bookmark(){
		//localStorage.clear();
		var object = JSON.parse(localStorage.getItem("bookmark_url_my"));
		//console.log(localStorage.getItem("bookmark_url_my"));
		$('#book_page').html("");
		$('.search-panel').hide();
		$('#book_page').append("<div style='margin-left:-50px;'><ul class='tasks-bar' id='myBookmarks'><li><span style='font-weight:bold;font-weight:18px;color:#023656;'>Bookmark List</span></li>");
		
		if(object && object.length > 0){
			for(var i=0;i<=object.length;i++){
				if(object[i]){
					var myUrl = "'" + object[i] +"'";
					
					$('#book_page').append('<li style="list-style:none;margin-left:-50px;border-bottom:1px solid #023656;padding:10px 0px;"><a style="width:90%;text-decoration:none;" href="javascript:void(0);" onclick="show_bookmark_url('+ myUrl +');" >'+object[i]+'</a><i onclick="remove_bookmark('+ myUrl +');" style="cursor:pointer;float:right;color:#E35B5B;" class="fa fa-trash"></i></li>');
				}
			}
		}else{
			$('#book_page').append('<li style="list-style:none;margin-left:-50px;border-bottom:1px solid #ccc;padding:10px 0px;">No Bookmarks yet</li>');
		}
		$('#book_page').append("</ul></div>");
	}
	
	
	function show_main_url(){
		var my_url = localStorage.getItem("book_url_old");
		show_bookmark_url(my_url);
	}
	
	function remove_bookmark(my_url){
		//var my_url = localStorage.getItem('book_url');
		var new_urls  = new Array();
		//var new_urls = "'"+localStorage.getItem('book_url')+"'";
		var k =0;
		var object = JSON.parse(localStorage.getItem("bookmark_url_my"));
		if(object){
			for(var i=0;i<=object.length;i++){
				if(object[i] && object[i] !=my_url){
					//new_urls = new_urls + ','+object[i];
					new_urls[i] = object[i];
					k = i+1;
				}
			}
		}
		
		
		//console.log(new_urls);
		localStorage.setItem("bookmark_url_my", JSON.stringify(new_urls));
		
		if(my_url){
			$(".flash-message").show();
			$(".flash-message").addClass("success-msg");
			$(".flash-message").text('Bookmark has been removed.');
			setTimeout(function() {
			$('.flash-message').hide();
			}, 3000);
		}	

		show_all_bookmark();	
	}
	
	function onBackKeyDown() {
		history.go(-1);
	}
	
	function change_url(ele){
		var href = jQuery(ele).attr('href');
		if(href.substr(0,4) != 'http'){
			if(href.substr(0,2) =='//'){
				href = 'http:' + href;
			}else if(href.substr(0,1) !='/'){
				href = 'http://' + href;
			}
		}
		jQuery(ele).attr('href' , 'javascript:void(0);');
		if(href.substr(0,1) !='/'){
			jQuery(ele).attr('onclick', 'show_bookmark_url("'+href+'");');
			show_bookmark_url(href);
		}
	}

	$(document).ready(function(){
		$('a').attr('onclick', 'change_url(this);');
		$('a').removeAttr('target');
		$('.btn-search').click(function(){
			$(this).toggleClass('active');
			//$('.search-panel').toggle();
			$( ".search-panel" ).animate({
				height: "toggle"
			}, 300, function() {});
		});

	});