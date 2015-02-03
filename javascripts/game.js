//
// The Game
//

function init() {
	//
	// Settings
	//

	// Size
	var dragCircleRadiusScale = 7;
	var pageMargin = 10;

	// Color
	var upperPartFillColor = '#FFFF7E';
	var lowerPartFillColor = '#97D3FF';
	var dragCircleFillColor = '#CC5350';
	var dragTriangleFillColor = '#B2B246';
	var dragRectFillColor = '#BD7EFF';
	var holeColor = shadeColor(upperPartFillColor, 0.7);

	//
	// Global Variables
	//

	// Full Page Canvas
	var canvas = document.getElementById("canvas"); 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Getting canvas
	var stage = new createjs.Stage('canvas');
	stage.mouseMoveOutside = true;
	createjs.Touch.enable(stage);
	var counter = 0;

	//
	// Define ALL THE STUFF
	//

	// Splitting the screen into two sections

	// Upper Half of the screen
	var upperPart = new createjs.Shape();
	upperPart.graphics.beginFill(upperPartFillColor);
	upperPart.graphics.drawRect(0,0,window.innerWidth, window.innerHeight/2);
	upperPart.graphics.endFill();

	// Lower Half of the screen
	var lowerPart = new createjs.Shape();
	lowerPart.graphics.beginFill(lowerPartFillColor);
	lowerPart.graphics.drawRect(0, window.innerHeight - window.innerHeight/2, window.innerWidth, window.innerHeight/2)
	lowerPart.graphics.endFill();

	// Adding the draggable Shapes and making them draggable

	// Circle
	var dragCircle = new createjs.Shape();
	var dragCircleX = thirdWidth()/2 + pageMargin; // Workaround for a drag & drop issue
	var dragCircleY = getRandomY();
	var dragCircleShadow = new createjs.Shadow(shadeColor(dragCircleFillColor, -0.7), 2, 2, 10);
	var dragCirclePickupShadow = new createjs.Shadow(shadeColor(dragCircleFillColor, -0.7), 4, 4, 10);
	dragCircle.graphics.beginFill(dragCircleFillColor);
	dragCircle.graphics.drawCircle(dragCircleX, dragCircleY, third() / 2);
	dragCircle.setBounds(dragCircleX, dragCircleY, third(), third());
	dragCircle.graphics.endFill();
	dragCircle.shadow = dragCircleShadow;

	dragCircle.on("mousedown", function(e) {
		dragCircle.shadow = dragCirclePickupShadow;

		stage.update();
	});

	dragCircle.on("pressmove",function(e) {
	    // Update currentTarget, to which the event listener was attached
	    e.currentTarget.x = e.stageX - dragCircleX;
	    e.currentTarget.y = e.stageY - dragCircleY;

	    // Redraw stage
	    stage.update();
	});

	dragCircle.on("pressup", function(e) {
		dragCircle.shadow = dragCircleShadow;

		// Update the bounds on releasing the mouse press
		dragCircle.setBounds(dragCircleX + e.currentTarget.x, dragCircleY + e.currentTarget.y, dragCircle.getBounds().width, dragCircle.getBounds().height);
		// Check if the Circle is in the Hole
		if(checkTarget(holeCircle.getBounds(), dragCircle.getBounds())) {
			dragCircle.shadow = new createjs.Shadow('transparent', 0, 0, 0);
			// and if so remove it.
			setTimeout(function() {
				stage.removeChild(dragCircle);
				stage.update();
				counter++;
				if (counter === 3) {
					showCredits();
				}
			}, 300);
		}
		stage.update();

	});

	// Triangle
	var dragTriangle = new createjs.Shape();
	var dragTriangleX = thirdWidth() + thirdWidth() / 3 + pageMargin; // Workaround for drag & drop issue
	var dragTriangleY = getRandomY();
	var dragTriangleShadow = new createjs.Shadow(shadeColor(dragTriangleFillColor, -0.7), 2, 2, 10);
	var dragTrianglePickupShadow = new createjs.Shadow(shadeColor(dragTriangleFillColor, -0.7), 4, 4, 10);
	dragTriangle.graphics.beginFill(dragTriangleFillColor);
	dragTriangle.graphics.drawPolyStar(dragTriangleX, dragTriangleY, third() / 2, 3, 0, 120);
	dragTriangle.setBounds(dragTriangleX, dragTriangleY, third(), third());
	dragTriangle.graphics.endFill();
	dragTriangle.shadow = dragTriangleShadow;

	dragTriangle.on("mousedown", function(e) {
		dragTriangle.shadow = dragTrianglePickupShadow;

		stage.update();
	});

	dragTriangle.on("pressmove",function(e) {
	    // Update currentTarget, to which the event listener was attached
	    e.currentTarget.x = e.stageX - dragTriangleX;
	    e.currentTarget.y = e.stageY - dragTriangleY;

	    // Redraw stage
	    stage.update();
	});

	dragTriangle.on("pressup", function(e) {
		dragTriangle.shadow = dragTriangleShadow;

		// Update the bounds on releasing the mouse press
		dragTriangle.setBounds(dragTriangleX + e.currentTarget.x, dragTriangleY + e.currentTarget.y, dragTriangle.getBounds().width, dragTriangle.getBounds().height);
		// Check if the Object is in the Hole
		if(checkTarget(holeTriangle.getBounds(), dragTriangle.getBounds())) {
			dragTriangle.shadow = new createjs.Shadow('transparent', 0, 0, 0);
			// and if so remove it
			setTimeout(function() {
				stage.removeChild(dragTriangle);
				stage.update();
				counter++;
				if (counter === 3) {
					showCredits();
				}
			}, 300);
		}
		stage.update();

	});

	// Rectangle
	var dragRect = new createjs.Shape();
	var dragRectX = thirdWidth() * 2 + pageMargin;
	var dragRectY = getRandomY();
	var dragRectShadow = new createjs.Shadow(shadeColor(dragRectFillColor, -0.7), 2, 2, 10);
	var dragRectPickupShadow = new createjs.Shadow(shadeColor(dragRectFillColor, -0.7), 4, 4, 10);
	dragRect.graphics.beginFill(dragRectFillColor);
	dragRect.graphics.drawRect(dragRectX, dragRectY, third(), third());
	dragRect.setBounds(dragRectX, dragRectY, third(), third());
	dragRect.graphics.endFill();
	dragRect.shadow = dragRectShadow;

	dragRect.on("mousedown", function(e) {
		dragRect.shadow = dragRectPickupShadow;

		stage.update();
	});

	dragRect.on("pressmove",function(e) {
	    // Update currentTarget, to which the event listener was attached
	    e.currentTarget.x = e.stageX - dragRectX - (third() / 2);
	    e.currentTarget.y = e.stageY - dragRectY - (third() / 2);

	    // Redraw stage
	    stage.update();
	});

	dragRect.on("pressup", function(e) {
		dragRect.shadow = dragRectShadow;

		// On Mouse press up set the bounds
		dragRect.setBounds(dragRectX + e.currentTarget.x, dragRectY + e.currentTarget.y, dragRect.getBounds().width, dragRect.getBounds().height);
		// Check if the Object is in the Hole
		if(checkTarget(holeRect.getBounds(), dragRect.getBounds())) {
			// and if so, remove it
			dragRect.shadow = new createjs.Shadow('transparent', 0, 0, 0);
			setTimeout(function() {
				stage.removeChild(dragRect);
				stage.update();
				counter++;
				if (counter === 3) {
					showCredits();
				}
			}, 300);
		} 
		stage.update();

	});

	// Holes

	// Circle Hole
	var holeCircle = new createjs.Shape();
	holeCircle.graphics.beginFill(holeColor);
	holeCircle.graphics.drawCircle((thirdWidth() / 2) * 1.2 + pageMargin, (third() / 2) * 1.2 + pageMargin, (third() / 2) * 1.2);
	holeCircle.setBounds((thirdWidth() / 2) * 1.2 + pageMargin, (third() / 2) * 1.2 + pageMargin, third() * 1.2);
	holeCircle.graphics.endFill();

	// Triangle Hole
	var holeTriangle = new createjs.Shape();
	holeTriangle.graphics.beginFill(holeColor);
	holeTriangle.graphics.drawPolyStar(thirdWidth() + thirdWidth() / 3 + pageMargin, (third() + third() / 3 + pageMargin), (third() / 2) * 1.2, 3, 0, 120);
	holeTriangle.setBounds(thirdWidth() + thirdWidth() / 3 + pageMargin, (third() + third() / 3 + pageMargin), third() * 1.2);
	holeTriangle.graphics.endFill();

	// Rectangle Hole
	var holeRect = new createjs.Shape();
	holeRect.graphics.beginFill(holeColor);
	holeRect.graphics.drawRect((thirdWidth() * 2), (third() / 2) + pageMargin, third() * 1.2, third() * 1.2);
	holeRect.setBounds((thirdWidth() * 2), (third() / 2) + pageMargin, third() * 1.2, third() * 1.2);
	holeRect.graphics.endFill();


	//
	// Let's draw!
	//
	stage.addChild(upperPart);
	stage.addChild(lowerPart);

	stage.addChild(holeCircle);
	stage.addChild(holeTriangle);
	stage.addChild(holeRect);

	stage.addChild(dragCircle);
	stage.addChild(dragTriangle);
	stage.addChild(dragRect);
	stage.update();

	//
	// Functions
	//

	// Get the appropriate Scale
	function third() {
		if (window.innerWidth < window.innerHeight / 1.5) {
			return (window.innerWidth/3) * 0.9;
		} else {
			return (window.innerHeight/5) * 0.9;
		}
	}

	// Get a third of the width
	function thirdWidth() {
		return window.innerWidth/3;
	}

	// Get a random Int between min and max
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// Get a random y coordinate in the lower half of the screen
	function getRandomY() {
		return getRandomInt((window.innerHeight) - third(), (window.innerHeight / 2) + third());
	}

	// Shade a color
	function shadeColor(color, percent) {   
	    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
	    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
	}

	// Check if rect2 is inside rect1
	function checkTarget(rect1,rect2) {
	    if ( rect1.x >= rect2.x + rect2.width/6 || rect1.x + rect1.width/6 <= rect2.x || rect1.y >= rect2.y + rect2.height/6 || rect1.y + rect1.height/6 <= rect2.y ) {
	    	return false;
	    }
	    return true;
	}

	// Shows credits
	function showCredits() {

	    $('.credits').transit({
	    'opacity': 1
	    }, 0, function() {
	    $('.credits').css({
	      'display': 'table'
	    });
	    });
	}
};