var contain = document.getElementById( "content" );
var as = contain.getElementsByTagName( "a" );
var imgs = contain.getElementsByTagName( "img" );

var database = ["http://panoots.tumblr.com/post/161069345886/drew-these-two-good-lads"];
var datalink = ["http://68.media.tumblr.com/f9ad935ad860f4b19b6070d822ce4033/tumblr_oqj0zwu5Yn1qfs0z9o1_1280.png"];

const TOTAL = 5;

function page( num )
{
	for( var i = 0; i < TOTAL; i++ )
	{
		var its_like_poetry_it_rhymes = num*TOTAL+i;
		as[i].href = datalink[its_like_poetry_it_rhymes];
		imgs[i].src = database[its_like_poetry_it_rhymes];
	}
}
