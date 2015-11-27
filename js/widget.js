function PageHeader(rootEle)
{
	//TODO
}

function TabView(rootEle)
{
	//TODO
}

// param is the number images shown simultaneously in carousel
function Carousel(rootEle, d, param)
{
	///////////////////////////////////////////////
	// privileged functions

	// register the clickFunc to the widget
	// clickFunc(item), item is item in d, i.e. [imgId, imgUrl]
	this.SetItemClickFunc = function(clickFunc)
	{
		//TODO
	}
}

// param is the number images shown simultaneously in the bottom carousel
function ExtendedCarousel(rootEle, d, param)
{
}

function ListView(rootEle, d)
{
	//TODO

	///////////////////////////////////////////////
	// privileged functions

	// register the clickFunc to the widget
	// clickFunc(item), item is item in d, i.e. [eid, text]
	this.SetItemClickFunc = function(clickFunc)
	{
		//TODO
	}
}

// param is {rows : int, cols: int}
// processFunc(item), item is item in list
function PagedTable(rootEle, d, param, processFunc)
{
	///////////////////////////////////////////////
	// privileged functions


	// register the clickFunc to the widget
	// clickFunc(item), item is item in list, i.e. [eid, text]
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
function PopupPanel(rootEle, d, processFunc)
{
	//TODO
}

// d is a list
// cols is column number in layout
// processFunc(item), item is item in list d
// clickFunc(item), item is item in list d
function CascadeLayout(rootEle, d, cols, processFunc)
{
	//TODO

	///////////////////////////////////////////////
	// privileged functions
	this.SetItemClickFunc = function(clickFunc)
	{
		//TODO
	};
}