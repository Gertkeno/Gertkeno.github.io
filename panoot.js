/* javascript banner draw */
var can = document.getElementById( "bancan" );
var ctx = can.getContext("2d");

function resize_canvas()
{
	can.width = window.innerWidth;
	can.height = window.innerHeight * 0.2;
	return can;
}

function clean_bit()
{
	ctx.clearRect( 0, 0, can.width, can.height );
	ctx.fillStyle='#FFD6F2';
	ctx.fillRect( 0, 0, can.width, can.height );
	ctx.filter = "blur(3px)"; /* canvas filter might only work on firefox 49+ */
	return true;
}

function draw_bubble( x, y, r )
{
	ctx.beginPath();
	ctx.arc( x, y, r, 0, 2*Math.PI );
	ctx.fillStyle='#FFB4EA';
	ctx.fill();
	return true;
}

function draw_random( count )
{
	if( !clean_bit() ) return false;
	for( var i=0; i < count; i++ )
	{
		var w = can.width;
		var h = can.height;
		draw_bubble( Math.random()*w, Math.random()*h, Math.random()*40+16 );
	}
	return true;
}

function full_draw()
{
	resize_canvas();
	draw_random( Math.floor( can.width / 192 ) );
	/* can.width / 192 so it's 10 dots @ 1920 */
	return true;
}

/* everything else javascripty */
