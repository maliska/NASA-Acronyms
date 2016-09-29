//Joel Malissa & Logan Stafman

//maps from acronym to meaning
var myMap = {};

$.getJSON('https://raw.githubusercontent.com/maliska/NASA-Acronyms/master/acronyms24k.json', function(data) {
    for(var i = 0; i < data.length; i++) {
        var abbrev = data[i]['abbreviation'].toLowerCase();
        if(myMap[abbrev] === undefined)
            myMap[abbrev] = new Array();
        myMap[abbrev].push(data[i]);
    }
});

// places meaning(s) below selected acronym in a qtip tooltip
$(function() {
    $("body").mouseup(function() {
        setTimeout(function() {
            var range, rect;
            var selection = window.getSelection();
            if(selection.rangeCount > 0) {
                range = selection.getRangeAt(0);
                rect = range.getBoundingClientRect();
            }
            var selText = selection.toString().trim().toLowerCase().replace(/\./g,'');
            var meanings;
            if(myMap[selText] !== undefined) {
                var meanings = new Array();
                for(var i = 0; i < myMap[selText].length; i++) {
                    meanings.push(myMap[selText][i]['expansion']);
                }
            }
            if(selText !== "" && meanings !== undefined) {
                $(".qtip").remove();
                $("#nasa_tooltip").remove();
                var div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.top = rect.top + 'px';
                div.style.left = rect.left + 'px';
                div.style.height = rect.height + 'px';
                div.style.width = rect.width + 'px';
                var meaning = "";
                for(var i = 0; i < meanings.length; i++) meaning += "\u2022  " + meanings[i] + "<br>";
                meaning = meaning.trim();
                div.setAttribute('title', meaning);
                div.setAttribute('id', 'nasa_tooltip');
                document.body.appendChild(div);
   
                $.fn.qtip.zindex = 999999;
                $('#nasa_tooltip').qtip({
                    hide: false,
                    content: meaning,
                    position: {
                        my: 'top center',
                        at: 'bottom center',
                        viewport: true,
                        adjust: {
                        	method: 'shift none',
                        	scroll: false
                        }
                    },
                    style: {
                        classes: 'qtip-tipsy-force-color'
                    }
                }).mouseover();
            } else {
                $(".qtip").remove();
                $("#nasa_tooltip").remove();
            }
        }, 10);
    });
});
