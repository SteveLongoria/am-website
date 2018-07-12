
/*
 * Global variables.
 */
 
/*
 * To get the correct parent since several systems inject tags to elements, Ex: WordPress.
 */
function get_reputation_kahuna_container_node(node) {
	return (node.getAttribute('className') == 'reputation_kahuna_reviews_container' || node.getAttribute('class') == 'reputation_kahuna_reviews_container')?node:get_reputation_kahuna_container_node(node.parentNode);
}
/*
 * Update website view counter for reviews
 *
 * @author Daini
 */
function updatereviewcount(reviewId,scriptTagParent_ID){
	var site_Url = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html();
	
	
	$.ajax({
		type: 'POST',
		url: site_Url + 'adminstat/add_site_view_count',
		data: 'review=' + reviewId,
		success: function (msg){
			//alert(msg);
		}
	});
}
/*
 * Obtain current container reference.
 */
var script_tags = document.getElementsByTagName('script');
var scriptTagParent = get_reputation_kahuna_container_node(script_tags[script_tags.length - 1].parentNode);

scriptTagParent.id = 'repkahuna-review-container-' + (new Date()).getTime();

function getScript(url, success,scriptID) {
	var script     = document.createElement('script');
	    script.src = url;
	var head = document.getElementsByTagName('head')[0],
	done = false;

	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function() {
		if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
			done = true;

			// callback function provided as param
			success(scriptID);

			script.onload = script.onreadystatechange = null;
			head.removeChild(script);
		};
	};
	head.appendChild(script);
};

// Only do anything if jQuery isn't defined
if (typeof jQuery == 'undefined') {
	getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', function(scriptID) {
		reputation_kahuna_load_resources(scriptID);
	},scriptTagParent.id);
} else { // jQuery was already loaded
	// Run your jQuery Code
	reputation_kahuna_load_resources(scriptTagParent.id);
};

/*
 * Load needed resources after jQuery is loaded.
 */
function reputation_kahuna_load_resources(scriptTagParent_ID) {
	// Prevent name collisions wrapping the code in an anonymous function.
	jQuery(function($){
		if (typeof reputation_kahuna_styles_jquery_ui_loaded == 'undefined' || !reputation_kahuna_styles_jquery_ui_loaded) {
			// Load jQuery UI styles
			var link_elem = document.createElement('link');
			link_elem.href = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html() + 'public/js/lib/jquery-ui/css/themes/redmond/jquery-ui.css';
			link_elem.rel = 'stylesheet';
			link_elem.type = 'text/css';
			link_elem.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(link_elem);
			// Declaring global variable to not load this styles twice.
			reputation_kahuna_styles_jquery_ui_loaded = true;
		}

		if (typeof reputation_kahuna_styles_jquery_pretty_photo_loaded == 'undefined' || !reputation_kahuna_styles_jquery_pretty_photo_loaded) {
			// Load jQuery UI styles

			var link_elem = document.createElement('link');
			link_elem.href = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html() + 'public/js/lib/prettyPhoto/css/prettyPhoto.css';
			link_elem.rel = 'stylesheet';
			link_elem.type = 'text/css';
			link_elem.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(link_elem);
			// Declaring global variable to not load this styles twice.
			reputation_kahuna_styles_jquery_pretty_photo_loaded = true;

		}

		if (typeof reputation_kahuna_styles_base_review_loaded == 'undefined' || !reputation_kahuna_styles_base_review_loaded) {
			// Load Review styles
			var link_elem = document.createElement('link');
			link_elem.href = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html() + 'public/css/services/base_review.css';
			link_elem.rel = 'stylesheet';
			link_elem.type = 'text/css';
			link_elem.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(link_elem);
			// Declaring global variable to not load this styles twice.
			reputation_kahuna_styles_base_review_loaded = true;
		}

		var content_style = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_style').html();
		if (content_style == 'full' && (typeof reputation_kahuna_styles_full_review_loaded == 'undefined' || !reputation_kahuna_styles_full_review_loaded)) {
			var link_elem = document.createElement('link');
			link_elem.href = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html() + 'public/css/services/full_review.css';
			link_elem.rel = 'stylesheet';
			link_elem.type = 'text/css';
			link_elem.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(link_elem);
			reputation_kahuna_styles_full_review_loaded = true;
		}
		else if (content_style == 'two_thirds' && (typeof reputation_kahuna_styles_two_thirds_review_loaded == 'undefined' || !reputation_kahuna_styles_two_thirds_review_loaded)) {
			var link_elem = document.createElement('link');
			link_elem.href = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html() + 'public/css/services/two_thirds_review.css';
			link_elem.rel = 'stylesheet';
			link_elem.type = 'text/css';
			link_elem.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(link_elem);
			reputation_kahuna_styles_two_thirds_review_loaded = true;
		}
		else if (content_style == 'side_bar' && (typeof reputation_kahuna_styles_side_bar_review_loaded == 'undefined' || !reputation_kahuna_styles_side_bar_review_loaded)) {
			var link_elem = document.createElement('link');
			link_elem.href = $('#' + scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html() + 'public/css/services/side_bar_review.css?nd=' + Date();
			link_elem.rel = 'stylesheet';
			link_elem.type = 'text/css';
			link_elem.media = 'all';
			document.getElementsByTagName('head')[0].appendChild(link_elem);
			reputation_kahuna_styles_side_bar_review_loaded = true;
		}

		if (typeof $.fn.prettyPhoto != "function") {
 			// Load jQuery prettyPhoto
			getScript($('.reputation_kahuna_reviews_data_site_Url').html() + 'public/js/lib/prettyPhoto/js/jquery.prettyPhoto.js', function() {
			});
			reputation_kahuna_scripts_pretty_photo_loaded = true;
		}

		reputation_kahuna_get_reviews(scriptTagParent_ID);
	});
};

/*
 * Do the actual procesing.
 */
function reputation_kahuna_get_reviews(inner_scriptTagParent_ID_x) {
	var inner_scriptTagParent_ID = new String(inner_scriptTagParent_ID_x);

	// Prevent name collisions wrapping the code in an anonymous function.
	jQuery(function($){
		var site_Url = $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_site_Url').html();
		
		if($('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_location').text()==''){
			$('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_location').html(0);
		}
		
		/* Max Reviews */
		var max_reviews =  $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_maximum_latest_reviews').text();
		/* Reviews Max Chars */
		var review_max_chars = $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_maximum_number_characters').text();
		/* Review Text Color */
		var review_textcolor = $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_review_textcolor').text();
		
		if(review_textcolor == ''){ review_textcolor = "#000000"; }
		
		/* Set Default Values */
		if ( max_reviews == 0 )
		{
			max_reviews = 10;
		}
		if ( review_max_chars == 0 )
		{
			review_max_chars = 600;
		}

		/*
		 * Fill in the web reviews.
		 */
		$.ajax({
			async: false,
			cache: false,
			data: {
				id		: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_id').text(),
				entity	: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_entity').text(),
				style	: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_style').text(),
				content	: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_content').text(),
				 maximum_latest_reviews		: max_reviews, 
				/*maximum_latest_reviews : 10,*/
				maximum_number_characters	: review_max_chars,
				number_videos_shown	: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_number_videos_shown').text(),
				show_in_client		: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_show_in_client').text(),
				newlocation			: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_location').text(),
				country				: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_show_in_country').text(),
				review_textcolor	: $('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_review_textcolor').text()
			},
			dataType: 'jsonp',
			error: function(a, b, c){
				/*
				 * Show server message to user.
				 */
				alert(a + ' ' + b + ': ' + c);
			},
			success: function(response_from_server){
				//console.log(response_from_server);
				
				/*
				 * If it showing only videos or only directories hide the other kind of content.
				 */
				if ($('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_content').html() == 'videos') {
					// Hide Text Reviews panel.
					$('#' + inner_scriptTagParent_ID + ' ' + '.step').eq(1).hide();
				}
				else if ($('#' + inner_scriptTagParent_ID + ' ' + '.reputation_kahuna_reviews_data_content').html() == 'directories') {
					// Hide Videos Reviews panel.
					$('#' + inner_scriptTagParent_ID + ' ' + '.step').eq(0).hide();
				}
				
				if (response_from_server.data.length != 0) {
					
					// Check if company is disable or not
					if ( response_from_server.msg == 'Listed Successfully' )
					{
						// The company is active 
						var video_template 	= response_from_server.templates.video,
							text_template 	= response_from_server.templates.text,
							local_review 	= response_from_server.templates.local_review;

						var video_template$ = $(video_template);
						video_template$.find('.video-source-logo').attr('src',site_Url + 'public/images/favicons/youtube.png');

						video_template$.appendTo('#' + inner_scriptTagParent_ID + '.reputation_kahuna_reviews_container').hide();

						$(text_template).appendTo('#' + inner_scriptTagParent_ID + '.reputation_kahuna_reviews_container').hide();
						//$(local_review).appendTo('#' + inner_scriptTagParent_ID + '.reputation_kahuna_reviews_container').hide();

						for (var review = 0; review < response_from_server.data.length; review++) {
							
							if (response_from_server.data[review].review_type == 'video') {
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-template').clone().appendTo('#' + inner_scriptTagParent_ID + ' ' + '.video-reviews-container').addClass('review-video-' + response_from_server.data[review].id).removeClass('review-video-template');

								// Duration
								if (response_from_server.data[review].duration != '') {
									var duration_date = new Date(0, 0, 0, 0, 0, response_from_server.data[review].duration, 0);
									var duration_minutes = duration_date.getMinutes();
									var duration_seconds = duration_date.getSeconds();

									if (duration_seconds == '0'){
										$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-duration').html(duration_minutes + ':' + duration_seconds + '0');
									}
									else {
										$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-duration').html(duration_minutes + ':' + duration_seconds);
									}
								}
								else {
									$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-duration').hide();
								}

								// Video URL
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-url').attr('title',response_from_server.data[review].call_to_action);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-url').attr('href',response_from_server.data[review].youtube_link).prettyPhoto();
								// Thumbnail data
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-url img').attr('title',response_from_server.data[review].youtube_link);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-url img').attr('alt',response_from_server.data[review].title);

								var video_src_url =  '';
								if (response_from_server.data[review].thumbnail_link != '') {
									video_src_url += response_from_server.data[review].thumbnail_link;
								}
								else {
									video_src_url +=  'public/images/no-image-available.jpeg';
								}
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .video-url img').attr('src',video_src_url);

								// Title
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .title-value').html(response_from_server.data[review].title);
								// Rating data
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .rating-value').attr('title',response_from_server.data[review].rating);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .rating-value').attr('id', inner_scriptTagParent_ID + '-rating-section-' + response_from_server.data[review].id);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .rating-current-value').text(response_from_server.data[review].rating).hide();

								// Construct a static rating because Chrome and Opera don't support jquery-raty.
								var rating_html = '';
								for (var rating = 0;rating < response_from_server.data[review].rating; rating++) {
									rating_html += '<img title="' + response_from_server.data[review].rating + '" alt="' + response_from_server.data[review].rating + '" src="' + site_Url + 'public/js/lib/jquery.raty/img/star-on.png">';
								}
								for (var rating = 0;rating < 5 - response_from_server.data[review].rating; rating++) {
									rating_html += '<img title="' + response_from_server.data[review].rating + '" alt="' + response_from_server.data[review].rating + '" src="' + site_Url + 'public/js/lib/jquery.raty/img/star-off.png">';
								}

								$(rating_html).appendTo($('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .rating-value'));

								// Author
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .author-value').html(" "+response_from_server.data[review].author);
								// Source data
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .source-link').attr('href',response_from_server.data[review].youtube_link);

								// Content
								//$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .content-value').html('' + response_from_server.data[review].review + '<br /><br /><b>Review2</b>: ' + response_from_server.data[review].review1 + '<br /><br /><b>Review3</b>: ' + response_from_server.data[review].review2 + '');
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .content-value').html('' + response_from_server.data[review].review);
							}
							else if (response_from_server.data[review].review_type == 'review') {
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-template').clone().appendTo('#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-container').addClass('review-text-' + response_from_server.data[review].id).removeClass('review-text-template');
								// Source logo
								var directory_image_name = response_from_server.data[review].source;
								directory_image_name = directory_image_name.replace('_co_uk','');
								directory_image_name = directory_image_name.replace('_co_nz','');
								directory_image_name = directory_image_name.replace('_co_ie','');
								directory_image_name = directory_image_name.replace('_com_au','');
								directory_image_name = directory_image_name.replace('_ie','');
								directory_image_name = directory_image_name.replace('_ca','');
								directory_image_name = directory_image_name.replace('_uk','');
								directory_image_name = directory_image_name.replace('.jpg','.png');

								var source_logo = site_Url + 'public/images/sources/new/square/' + directory_image_name + '.png';
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .review-source-logo img').attr('height','50');
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .review-source-logo img').attr('width','45');
								
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .review-source-logo img').attr('src',source_logo);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .review-source-logo a').attr('onclick','return updatereviewcount(' + response_from_server.data[review].id + ',\''+inner_scriptTagParent_ID+'\')');
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .review-source-logo a').attr('target','_blank');
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .review-source-logo a').attr('href',response_from_server.data[review].source_link);

								// Review location
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .location-value').html(response_from_server.data[review].location_name);
								// Review title
								var review_title = '';
								if (response_from_server.data[review].title != '') {
									review_title += response_from_server.data[review].title;
								}
								else {
									review_title += '';
								}
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .title-value').html(review_title);

								// Hide checkbox
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .hide-checkbox').val(response_from_server.data[review].id);

								// Rating data
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-value').attr('title',response_from_server.data[review].rating);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-value').attr('id', inner_scriptTagParent_ID + '-rating-section-' + response_from_server.data[review].id);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-current-value').text(response_from_server.data[review].rating).hide();

								// Construct a static rating because Chrome and Opera don't support jquery-raty.
								var rating_html = '';
								var rating_value = Math.round(response_from_server.data[review].rating);
								for (var rating = 0;rating < rating_value; rating++) {
									rating_html += '<img title="' + response_from_server.data[review].rating + '" alt="' + response_from_server.data[review].rating + '" src="' + site_Url + 'public/js/lib/jquery.raty/img/star-on.png">';
								}
								for (var rating = 0;rating < 5 - rating_value; rating++) {
									rating_html += '<img title="' + response_from_server.data[review].rating + '" alt="' + response_from_server.data[review].rating + '" src="' + site_Url + 'public/js/lib/jquery.raty/img/star-off.png">';
								}

								$(rating_html).appendTo($('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-value'));

								// Author
								if (response_from_server.data[review].author_link != '') {
									// Author with link
									//$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .author-value').html('<a href="' + response_from_server.data[review].author_link + '" class="author-link">' + response_from_server.data[review].author + '</a>' );
									$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .author-value').html('<a href="' + response_from_server.data[review].author_link + '" class="author-link" target="_blank" onclick="return updatereviewcount(' + response_from_server.data[review].id + ',\''+inner_scriptTagParent_ID+'\')">' + response_from_server.data[review].author + '</a>' );
								}
								else {
									// Author
									$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .author-value').html(response_from_server.data[review].author);
								}

								// Source Link
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .source-link').attr('title',response_from_server.data[review].source);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .source-link').attr('href',response_from_server.data[review].source_link);
								
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .source-link').attr('target','_blank');
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .source-link').attr('onclick','return updatereviewcount(' + response_from_server.data[review].id + ',\''+inner_scriptTagParent_ID+'\')');
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .text-source-logo').attr('src',site_Url + 'public/images/favicons/' + response_from_server.data[review].source + '.png');

								// Source
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .source-value').html(response_from_server.data[review].source);
								// Date
								//$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .date-value').html(response_from_server.data[review].date);
								//$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .date-value').attr('content',response_from_server.data[review].date);
							
								// Content
								// converting unicodes
								//response_from_server.data[review].review = response_from_server.data[review].review.replace(/\\u003d/g,'=');
								
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .content-value').html('' + response_from_server.data[review].review );
								//$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .content-value').html('' + response_from_server.data[review].review + '<br /><br /><b>Review2</b>: ' + response_from_server.data[review].review1 + '<br /><br /><b>Review3</b>: ' + response_from_server.data[review].review2 + '');
								//$('#' + inner_scriptTagParent_ID + ' ' + '.review-video-' + response_from_server.data[review].id + ' .content-value').html('"' + response_from_server.data[review].review + '<br />Review2: ' + response_from_server.data[review].review1 + '<br />Review3: ' + response_from_server.data[review].review2 + '"');
							}
							else if (response_from_server.data[review].review_type == 'localreview') {
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-template').clone().appendTo('#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-container').addClass('review-text-' + response_from_server.data[review].id).removeClass('review-text-template');

								// Review location
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .location-value').html(response_from_server.data[review].location_name);
								$('.source-section').hide();
								$('.reputation_kahuna_reviews_container .title-section').hide();
								$('.review-source-logo').hide();
								$('.location-value').hide();
								
								// Review title
								var review_title = '';
								if (response_from_server.data[review].title != '') {
									review_title += response_from_server.data[review].title;
								}
								else {
									review_title += '';
								}
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .title-value').html(review_title);

								// Hide checkbox
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .hide-checkbox').val(response_from_server.data[review].id);

								// Rating data
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-value').attr('title',response_from_server.data[review].rating);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-value').attr('id', inner_scriptTagParent_ID + '-rating-section-' + response_from_server.data[review].id);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-current-value').text(response_from_server.data[review].rating).hide();

								// Construct a static rating because Chrome and Opera don't support jquery-raty.
								var rating_html = '';
								for (var rating = 0;rating < response_from_server.data[review].rating; rating++) {
									rating_html += '<img title="' + response_from_server.data[review].rating + '" alt="' + response_from_server.data[review].rating + '" src="' + site_Url + 'public/js/lib/jquery.raty/img/star-on.png">';
								}
								for (var rating = 0;rating < 5 - response_from_server.data[review].rating; rating++) {
									rating_html += '<img title="' + response_from_server.data[review].rating + '" alt="' + response_from_server.data[review].rating + '" src="' + site_Url + 'public/js/lib/jquery.raty/img/star-off.png">';
								}

								$(rating_html).appendTo($('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .rating-value'));

								// Author
								if (response_from_server.data[review].author_link != '') {
									// Author with link
									$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .author-value').html('<a href="' + response_from_server.data[review].author_link + '" class="author-link">' + response_from_server.data[review].author + '</a>' );
								}
								else {
									// Author
									$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .author-value').html(response_from_server.data[review].author);
								}


								// Date
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .date-value').html("Dated: "+response_from_server.data[review].date);
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .date-value').attr('content',response_from_server.data[review].date);
								// Content
								$('#' + inner_scriptTagParent_ID + ' ' + '.review-text-' + response_from_server.data[review].id + ' .content-value').html('' + response_from_server.data[review].review );
								//console.log(response_from_server.data[review].id );
							}
						}

						if ($('#' + inner_scriptTagParent_ID + ' ' + '.video-reviews-container').html() == '') {
							var msg = '<div style="margin-bottom:0;padding-left:0.7em;" class="ui-state-error ui-corner-all msg"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em"></span><span style="margin-top:-2px;vertical-align: middle">There are no <strong>Video Reviews</strong> yet.</span> <br style="clear:both"></p></div>';
							//$('#' + inner_scriptTagParent_ID + ' ' + '.video-reviews-container').html(msg);
						}
						if ($('#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-container').html() == '') {
							var msg = '<div style="margin-bottom:0;padding-left:0.7em;" class="ui-state-error ui-corner-all msg"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em"></span><span style="margin-top:-2px;vertical-align: middle">' + response_from_server.msg + '</span> <br style="clear:both"></p></div>';
							//$('#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-step-container').html(msg);
						}
						
					} else {
						// Company is inactive.
						var msg = '<div style="margin-bottom:0;padding-left:0.7em;" class="ui-state-error ui-corner-all msg"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em"></span><span style="margin-top:-2px;vertical-align: middle">' + response_from_server.msg + '</span> <br style="clear:both"></p></div>';
						$('#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-container').html(msg);
					}
					
		    	}
		    	else {
		    		var msg = '<div style="margin-bottom:0;padding-left:0.7em;" class="ui-state-error ui-corner-all msg"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em"></span><span style="margin-top:-2px;vertical-align: middle">There are no <strong>Video Reviews</strong> yet.</span> <br style="clear:both"></p></div>';
	    			//$('#' + inner_scriptTagParent_ID + ' ' + '.video-reviews-container').html(msg);

	    			msg = '<div style="margin-bottom:0;padding-left:0.7em;" class="ui-state-error ui-corner-all msg"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em"></span><span style="margin-top:-2px;vertical-align: middle">There are no <strong>Directory Reviews</strong> yet.</span> <br style="clear:both"></p></div>';
	    			//$('#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-container').html(msg);
		    	}

		    	$('#' + inner_scriptTagParent_ID + ' ' + '.video-reviews-container,' + '#' + inner_scriptTagParent_ID + ' ' + '.text-reviews-container,' + '#' + inner_scriptTagParent_ID + ' ' + '.review-video,' + '#' + inner_scriptTagParent_ID + ' ' + '.review-text').not('.review-video-template,.review-text-template').show();

		    	// The redundancy is due a Chrome bug that don't apply correctly the inline style.
		    	$('#' + inner_scriptTagParent_ID).css('display','block').show();

		    	// Set Review Text Color
				$('.review-text').attr('style', 'color:'+review_textcolor+' !important');
				$('.reputation_kahuna_review_snippet').attr('style', 'color:'+review_textcolor+' !important');
				$('.review-text-template').hide();
				$('.review-video-template').hide();

				$('.reputation_kahuna_reviews_container .title-section').hide();
			},
			type: 'GET',
			url:  site_Url + 'reviews/get_reviews/'
		});
	});
};
