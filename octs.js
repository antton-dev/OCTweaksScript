// ==UserScript==
// @name			OC Tweak Script
// @author			-L0Lock-, benzouye, Lamecarlate
// @namespace   		https://github.com/L0Lock/OCTweaksScript
// @description 		Améliore l'affichage des forums OpenClassrooms
// @updateURL   		https://raw.githubusercontent.com/L0Lock/OCTweaksScript/master/octs.js
// @downloadURL 		https://raw.githubusercontent.com/L0Lock/OCTweaksScript/master/octs.js
// @include			*openclassrooms.com/*
// @version			1.2.2
// @noframes
// @grant			GM_getValue
// @grant			GM_setValue
// @require			https://code.jquery.com/jquery-3.3.1.min.js
// @require			https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// ==/UserScript==

(function($, document, undefined) {
	'use strict';
	const gitUrl = "https://raw.githubusercontent.com/L0Lock/OCTweaksScript/master/";

	// Copie du fil d'ariane en bas du sujet
	$(".breadcrumb").clone().insertAfter($("section.comments"));

	// Ajout bouton forum entête
	$(".mainTopNav").prepend('<li class="mainTopNav__itemContainer"><a class="mainTopNav__item" href="/forum">Forums</a></li>');

	// Bouton afficher/masquer les épinglés
	if( GM_getValue( "showPostIt" ) === undefined ) GM_setValue( "showPostIt" , true );

	// Lien règles forum
	$(".nav-tabs--searchField").css( {"width": "40%"} );
	$("#secondMenu li:eq(0)").before('<li><a href="https://openclassrooms.com/forum/sujet/regles-et-bonnes-pratiques-du-forum-9">Règles du forum</a></li>');

	if( window.location.href.indexOf( "forum" ) > 0 && window.location.href.indexOf( "sujet" ) <= 0 ) {
		$("h1").eq(1).prepend( '<img id="oc-mod-showhide" class="oc-mod-tooltip" />&nbsp;' );
		$("#oc-mod-showhide").css({
			"z-index":"3000",
			"cursor":"pointer",
			"height":"20px"
		});
		toggleTopics( {data : {stable: true}} );

		function toggleTopics( event ) {
			if( !event.data.stable ) {
				GM_setValue( "showPostIt", !GM_getValue( "showPostIt" ) );
			}

			var action = GM_getValue( "showPostIt" ) ? 'show' : 'hide';
			var texte = GM_getValue( "showPostIt" ) ? 'Masquer' : 'Afficher';
			var classe = GM_getValue( "showPostIt" ) ? 'block' : 'none';

			$(".list").first().css({"display":classe});
			$("#oc-mod-showhide").attr( "src", gitUrl+action+'.png' );
			$("#oc-mod-showhide").attr( "title", texte+" les sujets épinglés" );
		};

		$("#oc-mod-showhide").click( {"stable":false}, toggleTopics );
	}

	// Bouton top
	$("#mainContentWithHeader").append('<span title="Haut de la page" class="oc-mod-tooltip oc-mod-nav" id="oc-mod-top"><i class="icon-next"></i></span>');
	if( $(window).scrollTop() < 100 ) {
		$("#oc-mod-top").hide();
	}
	$("#oc-mod-top").click( () => {
		$(window).scrollTop( 0 );
	});

	// Bouton bottom
	$("#mainContentWithHeader").append('<span title="Bas de la page" class="oc-mod-tooltip oc-mod-nav" id="oc-mod-bottom"><i class="icon-next"></i></span>');
	if( $(window).height()+$(window).scrollTop() > $(document).height()-250 ) {
		$("#oc-mod-bottom").hide();
	}
	$("#oc-mod-bottom").click( () => {
		$(window).scrollTop( $(document).height()-200 );
	});

	// Style bouton top/bottom
	$(".icon-next").css({"display":"inline-block"});
	$(".oc-mod-nav").css({
		"cursor":"pointer",
		"position":"fixed",
		"right":"50px",
		"background":"#497EF6",
		"color":"#fff"
	});
	$("#oc-mod-top").css({
		"padding":"11px 15px 15px 15px",
		"top":"38%"
	});
	$("#oc-mod-top>i").css({"transform":"rotate(-90deg)"});
	$("#oc-mod-bottom").css({
		"padding":"17px 15px 9px 15px",
		"bottom":"38%"
	});
	$("#oc-mod-bottom>i").css({"transform":"rotate(90deg)"});

	// Gestion du scroll
	$(window).scroll( () => {
		if( $(window).scrollTop() > 100 ) {
			$("#oc-mod-top").show();
		} else {
			$("#oc-mod-top").hide();
		}
		if( $(window).height()+$(window).scrollTop() < $(document).height()-250 ) {
			$("#oc-mod-bottom").show();
		} else {
			$("#oc-mod-bottom").hide();
		}
	});

	// Eviter retour à la ligne boutons d'action
	$(".actions>li>a").css({"font-size":"1rem"});

	// Gestion des infobulles
	$(".oc-mod-tooltip").tooltip( {
		open: function( event, ui ) {
			$(".ui-widget-shadow").css({"background":"#fff"});
			$(".ui-widget-shadow").fadeTo(0,1);
		}
	});

	// Suppression des pubs
	$(".adviceBanner").remove();

	// Replacement des bannières
	$("#mainSection").prepend( $(".banner") );
})(window.jQuery, document);
