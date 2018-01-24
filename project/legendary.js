'use strict';

function add_legend_entries()
{
	var theBigL = document.getElementById( 'legend' );
	const chapters = document.getElementsByClassName( 'chapter' );
	for( var i = 0; i < chapters.length; i++ )
	{
		var li = document.createElement( 'li' );
		var a = document.createElement( 'a' );
		a.href = '#' + chapters[i].id;
		a.innerHTML = chapters[i].innerHTML;
		theBigL.appendChild( li );
		li.appendChild( a );
	}
}
