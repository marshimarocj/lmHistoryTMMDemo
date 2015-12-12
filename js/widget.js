/*
function PageHeader(rootEle)
{
	// Nothing To Do
}

function TabView(rootEle)
{
	// Nothing To Do
}
*/

// param is the number images shown simultaneously in carousel
function Carousel(rootEle, d, param)
{
	///////////////////////////////////////////////
	// privileged functions

	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	rootId = rootEle.attr('id');
	rootEle.append('<!-- Wrapper for slides -->' +
				'<div class="carousel-inner" role="listbox"></div>' +
				'<!-- Controls -->' +
				'<a class="left carousel-control" href="#' + rootId + '" role="button" data-slide="prev">' +
					'<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
					'<span class="sr-only">Previous</span>' +
				'</a>' +
				'<a class="right carousel-control" href="#' + rootId + '" role="button" data-slide="next">' +
					'<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
					'<span class="sr-only">Next</span>' +
				'</a>');
	$.each(d, function(i, field) {
		rootEle.children("ol").append('<li data-target="#' + rootId + '" data-slide-to="' + i + '"></li>');
		if (typeof field == 'object') {
			rootEle.children("div.carousel-inner").append('<div class="item"><img src="' +
							field[1] + '" onclick="location.href=\'match.html?iid' + field[0] + '\'"></div>');
		} else {
			rootEle.children("div.carousel-inner").append('<div class="item"><img src="' + field + '"></div>');
		}

	});
	rootEle.children("ol").children("li").first().addClass("active");
	rootEle.children("div.carousel-inner").children("div").first().addClass("active");
/*	this.SetItemClickFunc = function(clickFunc)
	{
		// Nothing To Do
	}
*/
}


// param is the number images shown simultaneously in the bottom carousel
function ExtendedCarousel(rootEle, d, cols, param)
{
	$.each(d, function(i, field) {
		var lightSliderId = "lightSlider" + i;
		rootEle.append('<div class="cascade-item"><ul id=' + lightSliderId + '></ul></div>');
		$.each(field, function(j, img) {
			$('#' + lightSliderId).append('<li data-thumb="' + img + '"><img src="' + img + '"></li>');
		});
		$('#' + lightSliderId).lightSlider({
		    gallery: true,
		    item: 1,
			speed:500,
            auto:true,
		    loop:true,
		    slideMargin: 0,
		    thumbItem: 9
		});
	});

	rootEle.masonry({
		itemSelector: '.cascade-item',
		isAnimated: true,
		animationOptions: {
			duration: 400
		},
		columnWidth: function(containerWidth) {
			return containerWidth / cols;
		}
	});
}

function ListView(rootEle, d)
{
	///////////////////////////////////////////////
	// privileged functions

	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	$.each(d, function(i, field) {
		rootEle.append('<a href="event.html?eid' + field[0] + '" class="list-group-item">' + field[1] + '</a>');
	});
/*	this.SetItemClickFunc = function(clickFunc)
	{
		// Nothing To Do
	}
*/
}

// param is {rows : int, cols: int}
// processFunc(item), item is item in list
function PagedTable(rootEle, d, param, processFunc)
{
	///////////////////////////////////////////////
	// privileged functions


	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	this.SetItemClickFunc = function(clickFunc)
	{
		//TODO
	}
}

// param is {height: int, width: int}
// use the widge from https://timeglider.com/widget/index.php
// let's take https://timeglider.com/widget/kitchen_sink.html for example
// 1. in the top bar, remove "legend", "info", change "start" to "reset", the function of "reset" in same as "start": return to the initial state
// 2. remove the timeglider icon in the bottom bar (the easiest way is to delete this icon from the folder)
// 3. don't show the image row.
// 4. use circle for all events
// need to support the following functions:
// 1. fit the range of dates in the screen
// 2. once an event is clicked, pop up the panel that is similar to the example "netscape founded" (details are elaborated in fillPopupPanel function)
function TimeGlider(rootEle, param)
{
	//TODO

	///////////////////////////////////////////////d
	// private functions

	// automatically adjust scale to let date from start to end fit in the screen
	function _fitin(start, end)
	{
		//TODO
	}

	//handles the layout and content of popup panel
	// from top to bottom:
	// 1. show date in title
	// 2. show text descripiton on the top
	// 3. show one image on the left
	// 4. show entity information on the right
	// 5. a link at bottom called "detail" to link to the event.html with parameter eid
	function _popupPanel(eid)
	{
		//TODO
	}

	///////////////////////////////////////////////
	// privileged functions

	// get data from a json url
	// past data will be cleaned and the view will be refreshed by the new data,
	// see if we can add some animation for such transition
	// data is a list of [eid, imgurl, text, who list, where list, when list]
	this.GetData = function(url)
	{
		//TODO
	}
}

// processFunc(d)
function PopupPanel(rootEle, d, queryImgUrl, matchImgRootUrl, fuseImgRootUrl, processFunc)
{
	$.each(d, function(i, field) {
		var matchImgUrl = matchImgRootUrl + field[0] + '.jpg';
		var fuseImgUrl = fuseImgRootUrl + field[1] + '.jpg';
		var text = field[2];
		$modal = $('<div class="modal fade" id="popupModal' + i + '" role="dialog">' +
				'<div class="modal-dialog" role="document">' +
					'<div class="modal-content">' +
						'<div class="modal-header">' +
							'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							'<h4 class="modal-title">Popup panel</h4>' +
						'</div>' +
						'<div class="modal-footer centered">' +
							'<img src="' + queryImgUrl + '" class="img-query">' +
							'<img src="' + matchImgUrl + '" class="img-matched">' +
							'<img src="' + fuseImgUrl + '" class="img-fused">' +
						'</div></div></div></div>');
		rootEle.append($modal);
	});
}

// d is a list
// cols is column number in layout
// processFunc(item), item is item in list d
// clickFunc(item), item is item in list d
function CascadeLayout(rootEle, d, cols, matchImgRootUrl, processFunc)
{
	///////////////////////////////////////////////
	// privileged functions

	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	rootEle.masonry({
		itemSelector: '.cascade-item',
		isAnimated: true,
		animationOptions: {
			duration: 400
		},
		columnWidth: function(containerWidth) {
			return containerWidth / cols;
		}
	});

	$.each(d, function(i, field) {
		var matchImgUrl = matchImgRootUrl + field[0] + '.jpg';
		$cascadeItem = $('<img class="cascade-item" src="' + matchImgUrl + '" alt="' + field[2] +
				'" title="' + field[2] + '" data-toggle="modal" data-target="#popupModal' + i + '">');
		rootEle.append($cascadeItem).masonry('appended', $cascadeItem);
	});

/*	this.SetItemClickFunc = function(clickFunc)
	{
	};
*/
}
