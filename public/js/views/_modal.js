function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function ModalTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"views\u002Fclient\u002F_modal.pug":".modal(id=modalID): .window\n    .closeBtn &times;\n    header\n        block header\n    section.content\n        block content\n    footer\n        block footer\n"};
;var locals_for_with = (locals || {});(function (modalID) {;pug_debug_line = 1;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"modal\""+pug_attr("id", modalID, true, false)) + "\u003E";
;pug_debug_line = 1;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003Cdiv class=\"window\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003Cdiv class=\"closeBtn\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "&times;\u003C\u002Fdiv\u003E";
;pug_debug_line = 3;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003Cheader\u003E";
;pug_debug_line = 4;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003C\u002Fheader\u003E";
;pug_debug_line = 5;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003Csection class=\"content\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003C\u002Fsection\u003E";
;pug_debug_line = 7;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003Cfooter\u003E";
;pug_debug_line = 8;pug_debug_filename = "views\u002Fclient\u002F_modal.pug";
pug_html = pug_html + "\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"modalID" in locals_for_with?locals_for_with.modalID:typeof modalID!=="undefined"?modalID:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}