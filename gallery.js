var contain = document.getElementById( "content" );
var as = contain.getElementsByTagName( "a" );
var imgs = contain.getElementsByTagName( "img" );

var datalink = ["http://panoots.tumblr.com/post/161103438226/re-drew-twintelle-because-i-didnt-like-how-the",
"http://panoots.tumblr.com/post/161069345886/drew-these-two-good-lads",
"http://panoots.tumblr.com/post/161037322201/minmin",
"http://panoots.tumblr.com/post/160995557286/kid-cobra"];
var database = ["http://68.media.tumblr.com/84ba37788f17bcdde2dce03144872813/tumblr_oqktmk3nWq1qfs0z9o1_r1_1280.png",
"http://68.media.tumblr.com/f9ad935ad860f4b19b6070d822ce4033/tumblr_oqj0zwu5Yn1qfs0z9o1_1280.png",
"http://68.media.tumblr.com/9026305e08a1ab333126c6c8611a4e39/tumblr_oqhd0uhwU51qfs0z9o1_1280.png",
"http://68.media.tumblr.com/4e7fcbe18fcbecf45debc6d4a58d61f9/tumblr_oqfab1BHYm1qfs0z9o1_1280.png"];

const TOTAL = 5;

function page( num )
{
	for( var i = 0; i < TOTAL; i++ )
	{
		var index = num*TOTAL+i;
		var link = datalink[index];
		if( link != undefined )
		{
			as[i].href = link;
		}
		var image = database[index];
		if( image != undefined )
		{
			imgs[i].src = image;
		}
	}
}

var pageNum = 0;

function increment()
{
	pageNum++;
	page( pageNum );
}

function decrement()
{
	pageNum--;
	page( pageNum );
}
