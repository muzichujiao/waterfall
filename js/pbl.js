$(window).on('load',function(){
	waterFall();
	var dataInt ={"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'}]};
	$(window).on('scroll',function(){
		//如果能加载，将遍历数据将图片加载出来
		if(checkScroll){
			$.each(dataInt.data,function(key,value){
				var oBox = $('<div>').addClass('box').appendTo($('.main'));
				var oPic = $('<div>').addClass('boxPic').appendTo($(oBox));
				var oImg = $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			})
			waterFall();
		}
	})
})

//判断能否加载
function checkScroll(){
	var lastBox = $('.main>div').last();//获取最后一个div元素
	var lastBoxDis = lastBox.offset().top + Math.floor(lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(document).height();
	return (lastBoxDis<scrollTop+documentH)?true:false;
}

//找出数组arr中值为num的索引值
function findIndex(arr,num){
	for(var i=0;i<arr.length;i++){
		if(num == arr[i])
			return i;
	}
}

function waterFull(){
	//首先我们要确定有多少列
	
	var boxArr = [];
	boxArr = $('.box');
	var boxWidth = boxArr.eq(0).outerWidth();
	var browerW = $(document).width();
	var col =Math.floor(browerW / boxWidth);
	//设置main的宽度并且居中
	$('.main').css({
		'width':col*boxWidth + 'px',
		'margin':'0 auto',
		'position':'relative',
	});

	/* 我们要找到前面index张图片的高度，找出最小值，
	 * 将第index+1张图片放到下面
	*/
	var indexHeight = []; // 保存每一列的高度，一开始是前col张图片的高度
	//遍历所有boxArr
	boxArr.each(function(index,value){
		var h = boxArr.eq(index).outerHeight();
		if(index<col){  //将前面index张图片高度放入indexHeight数组
			indexHeight.push(h); 
		}else{  //每加入一张图片，时刻更新indexHeight数组中的值
			var minH = Math.min.apply(null,indexHeight); //找出数组最矮高度
			//找出最矮高度后，将下一张图片放到下面
			var minHIndex = findIndex(indexHeight,minH); //发现高度最小的一列
			$(value).css({ 
				'position':'absolute',
				'left':minHIndex * boxWidth + 'px',
				'top':minH + 'px',
			});
			indexHeight[minHIndex] += boxArr.eq(index).outerHeight(); //更新每一列的高度值
		}
	});
}
