// param is the number images shown simultaneously in carousel
function Carousel(rootEle, d, param, processFunc)
{
	///////////////////////////////////////////////
	// privileged functions

	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	// var imgRootUrl = 'http://222.29.193.172:8006/lmHistoryMMData/img/';
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
		rootEle.children("div.carousel-inner").append(processFunc(field));
	});
	// $.each(d, processFunc);
	rootEle.children("ol").children("li").first().addClass("active");
	rootEle.children("div.carousel-inner").children("div").first().addClass("active");

	// this.SetItemClickFunc = function(clickFunc)
	// {
		// Nothing To Do
	// }

}


// param is the number images shown simultaneously in the bottom carousel
function ExtendedCarousel(rootEle, d, cols, param)
{
	var imgRootUrl = 'http://222.29.193.172:8006/lmHistoryTMMData/img/imgs/';
	$.each(d, function(i, field) {
		var lightSliderId = "lightSlider" + i;
		rootEle.append('<div class="cascade-item"><ul id=' + lightSliderId + '></ul></div>');
		$.each(field, function(j, img) {
			$('#' + lightSliderId).append('<li data-thumb="' + imgRootUrl + img + '"><img src="' + imgRootUrl + img + '"></li>');
		});
		$('#' + lightSliderId).lightSlider({
		    gallery: true,
		    item: 1,
		    loop:true,
		    slideMargin: 0,
		    thumbItem: 9
		});
	});

	rootEle.imagesLoaded(function(){
		rootEle.masonry({
			itemSelector: '.cascade-item',
/*			isAnimated: true,
			animationOptions: {
				duration: 400
			},
*/
			columnWidth: function(containerWidth) {
				return containerWidth / cols;
			}
		});
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
}

// param is {rows : int, cols: int}
// processFunc(item), item is item in list
function PagedTable(rootEle, d, param, processFunc)
{
	///////////////////////////////////////////////
	// privileged functions


	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	rootEle.html('<table id="tableData" class="table table-bordered table-striped"></table>');
	$tbody = $('<tbody></tbody>');
	var len = d.length;
	var cols = param['cols'];
	var i = 0;
	for (i; i < Math.floor(len / cols); i ++) {
		$tr = $('<tr></tr>');
		for (var j = 0; j < cols; j ++) {
			$tr.append('<td>' + d[i * cols + j][1] + '</td>');
		}
		$tbody.append($tr);
	}
	$tr = $('<tr></tr>');
	for (var j = 0; j < cols; j ++) {
		if (d[i * cols + j] == undefined) {
			$tr.append('<td></td>');
		} else {
			$tr.append('<td>' + d[i * cols + j][1] + '</td>');
		}
	}
	$tbody.append($tr);
	$('#tableData').append($tbody);
	$('#tableData').page({limit: param['rows']});
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
    var data_source = [
        {
            "id":"history",
            "title":"History events",
            "focus_date":"1936-07-01 12:00:00",
            "initial_zoom":"39",
            "image_lane_height":0,
            "events":[
            ],
            "tags":{"mardigras":2,"chris":2,"arizona":2,"netscape":2,"flop":1}

        }
    ];

	//TODO

	///////////////////////////////////////////////d
	// private functions

	// automatically adjust scale to let date from start to end fit in the screen
	function _fitin(start, end)
	{
		//TODO
        var stimestamp = $.myTime.ZCDateToUnix(start);
        var etimestamp = $.myTime.ZCDateToUnix(end);
        var timestamp = (stimestamp + etimestamp)/2;
        var duration = (etimestamp-stimestamp)/30;

        data_source[0].focus_date = $.myTime.UnixToDate(timestamp, true, 8);
        data_source[0].initial_zoom = 50;
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

	// get data from a json url
	// past data will be cleaned and the view will be refreshed by the new data,
	// see if we can add some animation for such transition
	// data is a list of [eid, imgurl, text, who list, where list, when list]
	this.GetData = function(url)
	{

        $.getJSON(url, function( data ) {

            var starttime = 0;
            var endtime = 0;

            //data_source = base_source;
            data_source[0].events = [];

            $.each(data, function(index,obj){ //遍历json数据列

                var event = {};
                event.id = obj[0];

                event.description = obj[2];
                if(obj[2].length > 10){
                    event.title = obj[2].substr(0, 10)+"...";  //取前10个字符
                }else{
                    event.title = obj[2].text;
                }

                event.link = obj[1];
                event.startdate = obj[5][0];
                event.high_threshold = 60;
                event.importance = 50;
                event.date_display = "ye";
                event.icon = "circle_black.png";
                event.image = "http://222.29.193.172:8006/lmHistoryTMMData/img/imgs/"+obj[1];

                data_source[0].events.push(event);

                if (starttime == 0 && endtime == 0){
                    starttime = obj[5][0];
					endtime = obj[5][0];
				}else{
					var nowtime = $.myTime.ZCDateToUnix(obj[5][0]);
					if (nowtime < $.myTime.ZCDateToUnix(starttime))
						starttime = obj[5][0];
					if (nowtime > $.myTime.ZCDateToUnix(endtime)){
						endtime = obj[5][0];
					}
				}
            });
            //alert(endtime);
            //调整设置参数
            _fitin(starttime, endtime);

            rootEle.timeline({

				"min_zoom":1,
				"max_zoom":50,
				"timezone":"-06:00",
				"icon_folder":"css/timeglider-1.0.3/icons/",
				"data_source": data_source,
				"show_footer":true,
				"display_zoom_level":false,
				"mousewheel":"zoom", // zoom | pan | none
				"constrain_to_data":false,
				"image_lane_height":100,
				"loaded":function () {
					// loaded callback function
				 }

    			}).resizable({
    					stop:function(){
    						// $(this).data("timeline").resize();
    					}
    			});


       /*
            //TODO
            if (!init){
                 tg1 = rootEle.timeline({

				"min_zoom":1,
				"max_zoom":50,
				"timezone":"-06:00",
				"icon_folder":"css/timeglider-1.0.3/icons/",
				"data_source": data_source,
				"show_footer":true,
				"display_zoom_level":true,
				"mousewheel":"zoom", // zoom | pan | none
				"constrain_to_data":true,
				"image_lane_height":100,
				"loaded":function () {
					// loaded callback function
				 }

    			}).resizable({
    					stop:function(){
    						// $(this).data("timeline").resize();
    					}
    			});
                tg_instance = tg1.data("timeline");
                tg_instance.refresh();
                //alert(tg_instance);
                //init = true;
            }else{
                tg_instance.reloadTimeline("history", "json/bf.json");
                tg_instance.refresh();
            }
            */
        });
	}
}

// processFunc(d)
// function PopupPanel(rootEle, d, queryImgRootUrl, matchImgRootUrl, fuseImgRootUrl, processFunc)
// {
// 	$.each(d, function(i, field) {
// 		var matchImgName = field[0];
// 		var queryImgName = field[1];
// 		var fuseImgName = field[2];
// 		var text = field[3];

// 		var queryImgUrl = queryImgRootUrl + queryImgName;
// 		var matchImgUrl = matchImgRootUrl + matchImgName;
// 		var fuseImgUrl = fuseImgRootUrl + fuseImgName;

// 		$modal = $('<div class="modal fade" id="popupModal' + i + '" role="dialog">' +
// 				'<div class="modal-dialog" role="document">' +
// 					'<div class="modal-content">' +
// 						'<div class="modal-header">' +
// 							'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
// 							'<h4 class="modal-title">Popup panel</h4>' +
// 						'</div>' +
// 						'<div class="modal-footer centered">' +
// 							'<img src="' + queryImgUrl + '" class="img-query">' +
// 							'<img src="' + matchImgUrl + '" class="img-matched">' +
// 							'<img src="' + fuseImgUrl + '" class="img-fused">' +
// 						'</div></div></div></div>');
// 		rootEle.append($modal);
// 	});
// }

function PopupPanel(rootEle, popupId, d, processFunc)
{
	$modal = $(
		'<div class="modal fade" id="popupModal' + popupId + '" role="dialog">' +
			'<div class="modal-dialog" role="document">' +
				'<div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
						'<h4 class="modal-title">Popup panel</h4>' +
					'</div>' +
					processFunc(d) +
				'</div></div></div>');
	rootEle.append($modal);
}

// d is a list
// cols is column number in layout
// processFunc(item), item is item in list d
// clickFunc(item), item is item in list d
function CascadeLayout(rootEle, d, cols, processFunc)
{
	// register the clickFunc to the widget
	// bind clickFunc to each element's click event in the widget
	// rootEle.masonry({
	// 	itemSelector: '.cascade-item',
	// 	isAnimated: true,
	// 	animationOptions: {
	// 		duration: 400
	// 	},
	// 	columnWidth: function(containerWidth) {
	// 		return containerWidth / cols;
	// 	}
	// });

/*	rootEle.masonry({
		itemSelector: '.cascade-item',
		// isAnimated: true,
		// animationOptions: {
		// 	duration: 400
		// },
		columnWidth: function(containerWidth) {
			return containerWidth / cols;
		}
	});
*/

	$.each(d, function(i, field) {

		// var matchImgUrl = matchImgRootUrl + field[0];
		// $cascadeItem = $('<img class="cascade-item" src="' + matchImgUrl + '" alt="' + field[3] +
		// 		'" title="' + field[3] + '" data-toggle="modal" data-target="#popupModal' + i + '">');
		// rootEle.append($cascadeItem).masonry('appended', $cascadeItem);

		var cascadeItemHtml = processFunc(field);
		// $cascadeItem = $(cascadeItemHtml);
		rootEle.append($(cascadeItemHtml));//.masonry('appended', $cascadeItem);
	});

/*	rootEle.imagesLoaded().progress(function(imgLoad, image){
		// console.log('loading');
		rootEle.mansory('layout');
	});
	*/

	rootEle.imagesLoaded(function(){
		rootEle.masonry({
			itemSelector: '.cascade-item',
/*			isAnimated: true,
			animationOptions: {
				duration: 400
			},
*/
			columnWidth: function(containerWidth) {
				return containerWidth / cols;
			}
		});
	});

}
