var $ = window.jQuery;
window.statusV3 = false;
//update
window.maxbots = 0;
window.lastTimeusedBots = Date.now();
window.lastTimeusedSlide = Date.now();
window.lastTimeusedFullMap = Date.now();	
window.restartbotsonserver = false;	
window.fullmapstatus = false;
window.botslaunched = false;
window.firstconnect = false;
window.ZoomValue = 1;	
window.isPremium = false;
//end

window.xt = false;
window.serverReady = false;
window.leaderBoard = {};
window.iamleader = false;
window.clientname = null;
window.ismyblob = null;
window.interactiv_color = false;
window.virus_mass = false;
window.ServerSwitching = false;
window.CurrentServerPlaying = null;
window.botmodeChange = false;
window.botmode2Change = false;
window.botmode3Change = false;
window.botmode = 0;
window.stopmovement = false;
window.botmode2 = 0;
window.botmode3 = 0;
window.ab = false;
window.iCanMove = false;
window.mapborder = false;
window.attack_range = false;
window.mytotalSize = 0;
window.mapgrid = false;
window.other_mass = false;
window.selectblob = false;
window.latency = null;
window.startTime = null;
window.lastresultext = null;
window.purefeeder = false;
window.antiAfk = Date.now();
window.currentBotsLoaded = 0;
//MSG EXT : 
window.variable = "LOL";
var waitUntilLoaded = null;
waitUntilLoaded = setInterval(function() {
    if($('#chv2_main-container').length > 0) {
        refresh();
        clearInterval(waitUntilLoaded);
    }
}, 200);
setInterval(function(){
    if (window.CurrentServerPlaying != null && window.client.currentServer != window.CurrentServerPlaying)
    {
        window.client._ws.close();
		window.xt = false;
        window.ServerSwitching = true;
        window.CurrentServerPlaying = window.client.currentServer;
		window.botmodeChange = false;
		window.botmode2Change = false;
		window.botmode3Change = false;
    }
},70);
var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}
var refresh = function(){
            if($('#chv2_main-container').length == 0) {
                return;
            }
    		var t = window.client.lastmessage;
    		if(t == undefined)
            {
    			return;
            }
    		if(t.nope){
                window.serverReady = true;
                var htmlAppend = '';
                htmlAppend = '<div class="chv2_expire_pkgexp chv2_expire"><p>1</p></div>';
                htmlAppend += '<div class="chv2_expire_chgip chv2_expire"><p>2</p></div>';
                htmlAppend += '<div class="chv2_expire_buyone chv2_expire"><p>3</p></div>';
                document.getElementById('chv2_main-container').innerHTML = htmlAppend;
    		} else if(t.alreadyConnected){
                window.serverReady = true;
                htmlAppend = '';
                htmlAppend = '<div class="chv2_expire_pkgexp chv2_expire"><p>4</p></div>';
                htmlAppend += '<div class="chv2_expire_chgip chv2_expire"><p>5</p></div>';
                htmlAppend += '<div class="chv2_expire_buyone chv2_expire"><p>6</p></div>';
                document.getElementById('chv2_main-container').innerHTML = htmlAppend;
    		} else if(t.special != undefined){
				if (typeof(window.variable[t.special]) != 'undefined'){window.lastresultext = '7';}else{window.lastresultext = 'Error please update extension';}
                window.serverReady = true;
                htmlAppend = '';
                htmlAppend = '<div class="chv2_expire_pkgexp chv2_expire"><p>8</p></div>';
                htmlAppend += '<div class="chv2_expire_chgip chv2_expire"></div>';
                htmlAppend += '<div class="chv2_expire_buyone chv2_expire"></div>';
                document.getElementById('chv2_main-container').innerHTML = htmlAppend;
    		} else{
                if(window.loadingset == undefined)
                {
					window.maxbots = t.maxBots;
					if (window.sliderValue)
					{
						if (t.currentBots > window.sliderValue) 
						{
							t.currentBots = window.sliderValue;
						}
						t.maxBots = window.sliderValue;
					}
					htmlAppend = '';
					htmlAppend += '<div class="chv2_active_botsnb chv2_active"><p id="chv2_active_botsnb_ok">Bots: <span id="chv2_numeric_bot_load">'+t.currentBots+'</span> / '+t.maxBots+'<br><span class="chv2_small">bots alive<span id="chv2_agario_srvfull"></span></span>';
					htmlAppend += '<span style="width: 0%;" id="chv2_bot_load"></span>';
					htmlAppend += '<p id="chv2_active_botsnb_ko" style="background-color: rgba(255,0,0,0.5);display: none;padding-top: 12px;"></p>';
					htmlAppend += '</div>';
					htmlAppend += '<div class="chv2_active_botmode chv2_active"><p style=""><span id="botmode">NORMAL</span><br><span class="chv2_small">Current botMode</span></p></div>';
					if (t.playingTime)
					{
					var timecoinsleft = (t.expire / 86400 >>> 0) + 'days ' + (t.expire / 3600 % 24 >>> 0) + 'hrs ' + (t.expire / 60 % 60 >>> 0) +'mins '+ (t.expire % 60 >>> 0) +'secs';
					htmlAppend += '<div class="chv2_active_expire chv2_active"><p><span id="chv2_expire_time">'+timecoinsleft+'</span>';
					htmlAppend += '<br><span class="chv2_small">Remain time</span> </p></div>';
						document.getElementById('chv2_main-container').innerHTML = htmlAppend;
						window.loadingset = true;
					}
					else
					{
						htmlAppend += '<div class="chv2_active_expire chv2_active"><p><span id="chv2_expire_time"></span>';
						htmlAppend += '<br><span class="chv2_small">Remain time</span> </p></div>';
						document.getElementById('chv2_main-container').innerHTML = htmlAppend;
						window.loadingset = true;
						window.expire = t.expire;
						//var expire = new Date(t.expire);						
					}
				}
                else
                {
					window.maxbots = t.maxBots;
					if (!window.sliderValue)
					{
						if (botnum.noUiSlider){	
							botnum.noUiSlider.set(t.maxBots);
						}
						window.sliderValue = t.maxBots;
					}
					if (window.sliderValue)
					{
						if (t.currentBots > window.sliderValue) 
						{
							t.currentBots = window.sliderValue;
						}
						t.maxBots = window.sliderValue;
					}
					if(t.algo == 0)
						$('#botmode').html('<span id="botmode">NORMAL</span>');
    				else if(t.algo == 1)
						$('#botmode').html('<span id="botmode">FARMING</span>');
    				else if(t.algo == 2)
						$('#botmode').html('<span id="botmode">NORMAL</span>');
					else if(t.algo == 3)
						$('#botmode').html('<span id="botmode">FARMING</span>');
					else if(t.algo == 4)
						$('#botmode').html('<span id="botmode">PURE FEEDER</span>');
					
					var percent = (t.s1/(t.s1+t.s2)*100);
					if(isNaN(percent))
					percent = 0;
					$('#Efficiency').html('<p id="Efficiency">Efficiency : '+percent.toFixed(2)+'%</p>');
                    $('#chv2_active_botsnb_ok').html('Bots: <span id="chv2_numeric_bot_load">'+t.currentBots+'</span> / '+t.maxBots+'<br><span class="chv2_small">bots alive<span id="chv2_agario_srvfull"></span></span><span style="width: 0%;" id="chv2_bot_load"></span>');
					window.currentBotsLoaded =  t.currentBots;
                    var botLoadPct = Math.floor((t.currentBots / t.maxBots) * 100);
                    $('#chv2_bot_load').css('width', botLoadPct+'%');
                    $('#chv2_bot_load').css('background-color', getColorForPercentage(botLoadPct/100));
					if (t.playingTime)
					{
						var timecoinsleft = (t.expire / 86400 >>> 0) + 'days ' + (t.expire / 3600 % 24 >>> 0) + 'hrs ' + (t.expire / 60 % 60 >>> 0) +'mins '+ (t.expire % 60 >>> 0) +'secs';
						document.getElementById('chv2_expire_time').innerHTML = timecoinsleft;
					}
                }
    		}
			if (!t.playingTime || (typeof t.playingTime === 'undefined'))
			{
				showRemaining();
			}
};
    	var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;
    	function showRemaining() {
    		if(document.getElementById('chv2_expire_time') == undefined)
            {
    			return;
            }
    		if(window.expire == undefined || window.expire == 0)
            {
    			return;
            }
    		var now = new Date();
            var distance = new Date(window.expire) - now;
            if (distance < 0) {
                document.getElementById('chv2_expire_time').innerHTML = 'EXPIRED!';
                return;
            }
            var days = Math.floor(distance / _day);
            var hours = Math.floor((distance % _day) / _hour);
            var minutes = Math.floor((distance % _hour) / _minute);
            var seconds = Math.floor((distance % _minute) / _second);
            document.getElementById('chv2_expire_time').innerHTML = days + 'days ';
            document.getElementById('chv2_expire_time').innerHTML += hours + 'hrs ';
            document.getElementById('chv2_expire_time').innerHTML += minutes + 'mins ';
            document.getElementById('chv2_expire_time').innerHTML += seconds + 'secs';
}
setInterval(function()
{
                if (window.xt)
                    {
                	    var e = {};
                        e.action = 4;
                        e.leaderBoard = window.leaderBoard;
                        window.client._ws.send(JSON.stringify(e));
                    }
},1000);
class GUITweaker {
	constructor() {
        this.addGUI();
	}
addGUI() {
    $('body').append(`
	<style>
	#chithercomUI2 {
    font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
    height: 50px!important;
    background-color: rgba(20,20,20, 0.2);
    position: fixed;
    top: 0;
	width: calc(100% - 57%);
    left: 0px; 
    /*right: 500px;*/
    z-index: 9999999;
    color: #dddddd!important;
    font-size: 14px!important;
    text-align: left!important;
    line-height: 18px!important;
    box-sizing: border-box;
	display: inline-flex;
}
#chithercomUI2 .chv2_logo {
    cursor: pointer;
    text-transform: uppercase;
    width: 188px;
    height: 33px;
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    margin-right: 10px;
	margin-top: 7px;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAAAhCAYAAABjscE2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABg1JREFUeNrsXM9r3EYU/mR83q0OvRRcg0oPJSEXmR57WlOH1qWG2G0hUCh099KkhCTsQs6GNa5JSX/AbkshENrULrjglLh4Ka1d7Iv3YrLkELzguKQ3b9f/wPSQWUWSJevNaDSSNnkg9oc08/S9+ebNmzcjGYwxhMgRABPisgCgBjmpuj6DdLcBrLj0iEqSmBjkpcUPcHzdBHWtcDvK2tAtZW7PWQB2wPmeS0eT/w6TDQAlqJcWgMlnlmMs6DCZvGyE1Bl2WIyxhqSuOr9Xip6kMamUZW4XHboaAjYc2LEeA5cdUu8GS0Y8bTcS0ivsGD1KpOwsgH3uKWRHhCNej8r7UllWRma5x7M06CoD2CXqKvH2qsbAtRujfGxJgvAm0XhVAMuKcCwTjKgDk0qxFNqHomuD2AlNBfrq/MgM4eOCsgmeQjXgeoSnTxpTEmITRy9VpC+fcq6hWF9VI7ZEPTwI3rCcEJ5qgoS1kI7oJEU5YnKqs70yRfieAg9PkRoAA8CEgEc0U8JElQrHNKeho1Vc9usS7ae7vey0CW8SenM7RiOZAt5ixaWvTSxTSgGTbHpwRdPI0uZpQdkOZku0V1dQ3yTvLP6Det/NkPKTUYSngGvF8LSyQ2Mv4QaLgwkJYjI16gqynyWpg0r4JEIlIQ9PJUdPgng6YmEzBUwvRKxTZYrwlBugDFmllIxuDhmmXsr6hqqTy3j4NnHIMjOEM6uYKPV1NepSqW9oCN8lGqaUI8KngalErK+riOyU9GY7hRFFq4zGyGbojncnYzR2ljA1ILaI09SoawFDLqMSkzuqNzR5fe2UMeYZUw3R2SMV0uJkb6XRQK+8/kbouSePHiqpRwXhKY1u5YzwaWNybxPW5W0NPEcyGmMS1SWSQ0WsuyFwfRNPVxizjCkqrm/yTx0el/EOvADaQphS+XPr75dP8+Jvvf3Oe5u//+Z0yqmZC+xN28Zep4Nff7pjuK7798mjh5VotGJ7kvd91+8T9j/7dZQE9jJbgtcP9nfrxoSE9nJXNeoK0ydif6H97Ytf3mKCz07EPkYksxnUDIKdgVEsa5hE9tJE7QCl6poghmF1Xdm1S9equPb5Je3h1IhkNgPEmNdCuvn4LGNaIZJQxY7CtkC4kvjuzD/+2sRXXyw4ZK9cvsL2HnQYD69Yv3/M5heXmC/sYgAG14Gfd45vmt+zre0d5/fB4SHzl93a3mEjgp6rF/E7a14+65jaxE6rQnoKbRZLbv941/k+v7jEGrdu4tzZM85/xWIBN65fxdr9dQYA/f6xc258bCywzoPDQ2EPTwFad/cY0B7iiGvAFh+WKwkRPg1MImJl0EnEI3zjW8e7f1b+1Pn/zt1lT9Zo+vwUpmYuMDeZi8VCIPEPHosT3hySBsOQY8q1uL21m8BhXvrc2TPY2t458f/4q17C/3z7B0OU8FZePUYKxLSfI44q3Vvz33FfvEzfW+aDjz9hxUIhtBOpDGlUkEPnXg37BeHzP6LuPeic8O7ukWGv0xEmfNJP5duShDdjGFMnpmEmY1dShwUAq2v38P5HFwexuTE+NiaUiiwWCifClWKh4Inhg+J3fp6FET7pmNT2GZBK+lmXIUUf/NaJKesyi3gPzrcF28sGYK2u3cPM9LuGe0VURez/UrHonbASMzRuwlMb7zWcfGawJUE+ak64ynvpkQSBdWPKojS4/ZYF7jfIo1O3OAwyXruAN/0oTfTjp0Tf3N72TGTd8vjwnxPleCcw0vLw/vqbGhrbynn9aUmQN1+QmXv5PLtnoci3sBQpblK7J6yyHj7pxisFGLWWc0KWniPC90B/rUgi4ia138Ovr/5iiBI+TjxKmdQELfHHectw0quhspjyLt1TRt/BW3iVZtmiVlEHGRp/piYsg0MhvK73JpZChspJiO0vryF6r3iamPLs2aMI3eJzHmV79b9ufud8v/jhnCezsnZ/3fHeYV5cJJwZEF5XLGqdYsQJftRCvGuXn5vgxo5613jamPIiTW7XOdDfTtbDszeMVfh36Qdibly/alQuX/F46n7/GPOLS5g+P2VEefOgCetp8v8ApSgVxarjzWoAAAAASUVORK5CYII=');
}
#chithercomUI2 .chv2_logo_free {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyCAYAAAC+jCIaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5M0VFQUIxN0M5MTZFNjExOTZFRTg0QjYxMUJDNjg1QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MjZCRjU4RDFGOTgxMUU2QTU4NTk5QUQ0RDgwNzlBOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MjZCRjU4QzFGOTgxMUU2QTU4NTk5QUQ0RDgwNzlBOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpERTIwMDM5Rjk3MUZFNjExOUQ5Rjk3OTAyRTFGRTcyMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5M0VFQUIxN0M5MTZFNjExOTZFRTg0QjYxMUJDNjg1QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlgpdkgAAALJSURBVHja7JzxkeIgFIejYwO2wJXglZAtYbeEWIJXgpagJWxK0BLOEkwLqeAmhzM4w72FBKKB7Nz3zbx/BAThx3sPknHRdV0B8GqWTAEgLEBYgLAAEBYgLEBYAAgLEBYgLACEBQgLEBZAEmHd33xwWKXt3P1LZcqU+Pwm2h5F+U6USx6f77owlKefyvou1dOPq23XM2bVU+8+R+9y/v4XVhF119o+tZWOsg179AulsVrbBx7Lz9kjKujnXdveW/pncdPWDdhOW2Gsr/7N1FVWfWmx/YW3GSGsPV7pKXbG40+NMmt1M33O2mOp3IP8RjTa9BYvto6yKvFY9sZbzlZYrgm5avtpJtE3ka/kYPV1EWVbq6yZoG/7+xdmLEOcTG4lc9TUHDP1GyQsqfpW25sRF/i5jhTWRQh5SMyP+h9mbWSf5Yv7C2ozJCxlTHqPFt0EnaJTUnsEoebosZRHrTHJZGdZlWmRj9YYbgnaVo68tEnwO2cTRVaRwmoJgUEbyedRcnjJJsdExD7SIQSOD1OhC1wKLx/qJV33ZW1AhBnT32CbFWueJDxNeWoue7xktnw41mOt0UkvjcMzbTMt7iHwaiSLsBqHsNaRE20fSU+Zfqd9F/Vj4ra1I0RN7RFbx7z/yrnDlgGDdp14wM/lSWHJO6IhMbeODasi+o3tL6jNMmDQV4ewCIn9k96KRZ76Oetpbg4gJMeqHbvhbE3WPXnkWWL/Qk8dDhuHpyyLTJejY4VVGFH9NqeRc84fkICjOFqHbKKrY5FTXGkUiQX9lLCyJ4LfkFqEw02icCiT+JBNIO+kQjbPYJvQ64ZDwY37sx4khdc6OE7xWXKtmHustyLuOSFJfPqwNJtwGCOsx+syWzFpLYILOh1uEuSiviQ++du/C/6DFHJ7LACEBQgLEBYAwgKEBQgLAGEBwgKEBYCwAGEBwgLo5a8AAwCTLhdsLUxn1gAAAABJRU5ErkJggg==')!important;
}
#chithercomUI2 a { 
    color: #66e48c!important; 
    text-decoration: none!important; 
}
#chithercomUI2 br { 
    display: block!important;  
    height: 0!important;
    margin: 0px 0!important; 
}
#chithercomUI2 .small {
    font-size: 12px!important;
    color: #cccccc;
}
#chv2_main-container {
    height: 50px;
    width: calc(100% - 215px);
    box-sizing: content-box!important;
    display: inline-block;
    vertical-align: top;
}
.chv2_signletext {
    text-align: center;
    margin-top: 13px!important;
}
#chithercomUI2 .chv2_expire {
    width: 32%;
    height: 50px;
    display: inline-block;
    text-align: center;
    vertical-align: top;
    box-sizing: border-box;
    font-size: 15px;
}
#chithercomUI2 .chv2_expire p {
    line-height: 20px;
    margin-top: 6px;
}
#chithercomUI2 .chv2_expire p b {
    font-size: 20px;
}
#chithercomUI2 .chv2_expire_pkgexp p {
    margin-top: 9px;
    display: block;
    background-color: rgba(255, 0, 0, 0.5);
    border-radius: 4px;
    padding: 6px;
    font-size: 18px;
    
}
#chithercomUI2 .chv2_active {
    text-align: center;
    height: 50px;
    display: inline-block;
    vertical-align: top;

}
#chithercomUI2 .chv2_active_botsnb {
    width: 20%;
}
#chithercomUI2 .chv2_active_expire {
    /*width: calc(35% - 3px);*/
	width: 60%;
}

#chithercomUI2 .chv2_active_botmode,  
#chithercomUI2 .chv2_active_followcmd,  
#chithercomUI2 .chv2_active_speedcmd, 
#chithercomUI2 .chv2_active_randomcmd {
    width: 20%;
}

#chithercomUI2 .chv2_active p {
    background-color: rgba(0,0,0, 0.5);
    border-radius: 4px;
    display: block;
    height: 40px;
    margin-top: 5px;
    margin-left: 2.5px;
    margin-right: 2.5px;
    margin-bottom: 0;
    font-size: 17px;
    line-height: 16px;
    padding-top: 4px;
    box-sizing: border-box;
    position: relative;
}
#chithercomUI2 .chv2_active p .chv2_small {
    font-size: 12px;
}

#chithercomUI2 #chv2_bot_load {
    position: relative;
    bottom: -2px;
    left: 0px;
    width: 0%;
    height: 2px;
    background-color: #00ff00;
    display: block;
    border-radius: 4px;
    -webkit-transition: width 2s;
    -moz-transition: width 2s;
    -o-transition: width 2s;
    transition: width 2s;
}

#chithercomUI2 #chv2_message_container {
    height: 22px;
    position: relative;
    bottom: 0;
    color: #dddddd;
    font-size: 14px;
    text-align: center;
    background-color: rgba(20,20,20, 0.8);
    border-radius: 4px;
    display: none;
}
#chithercomUI2 #chv2_message_container p {
    margin-top: -6px;
}

#chv2_staticmap {
    width: 246px;
    height: 270px;
    background-color: rgba(0,0,0, 0.5);
    position: fixed;
    bottom: 5px;
    right: 10px;
    color: rgba(255, 255, 255, 0.5);
    overflow: hidden;
    line-height: 0;
    z-index: 100;
}
#chv2_advert {
    text-align: center;
    background-color: rgba(20, 20, 20, 0.8);
    height: 20px;
    line-height: 21px;
    display: none;
}
#chv2_advert p {
    font-size: 14px;
    margin: 0;
}
#chv2_advert p .red {
    color: #ff0000;
}
#chv2_advert p .orange {
    color: #ffff00;
}

@media screen and (max-width: 1260px) { 
    
   /* #chithercomUI2 {
        left: 0!important;
        rigth: 0!important;
        width: 100%;
        background-color: rgba(0,0,0, 0.5);
    }
	*/

    
}
@media screen and (max-width: 1100px) { 
        #chv2_staticmap, #chv2_staticmaphide {
        width: 0px;
        height: 0px;
    }
}



@media screen and (max-width: 1260px) { 
    
    /*#chithercomUI2 {
        left: 0!important;
        rigth: 0!important;
        width: 100%;
        background-color: rgba(0,0,0, 0.8);
    }*/
    
}
@media screen and (min-width: 1400px) { 
   /* #chithercomUI2 {
        margin-left: auto;
        margin-right: auto;
        width: 850px;
    }
	*/
}
	</style>
	<div id="chithercomUI2">
	<a href=\"https://agarbot.ovh\" target=\"_blank\" class=\"chv2_logo\"></a>
	<div id="chv2_main-container"><p class="chv2_signletext">Connecting to server...</p></div>
	<div id="chv2_message_container"></div>
	<div id="chv2_advert"><p></p></div>
	</div>
	`);
	$("body").append('<div id="ui2" style="z-index:999; position:absolute; top:100px; left:0px; background-color:rgba(20, 20, 20, 0.2); color:#ffffff; line-height:5px; padding-top:0px; padding-left:8px; padding-right:8px;"><p id="ping">Ping: '+(window.latency || '?')+'</p><p id="botmode2">vShield : Off</p><p id="Efficiency">Efficiency : 0.00%</p><p id="destination">Destination : MOUSE</p><div id="botslaunch"></div><div style="margin-top:32px;margin-bottom:12px;margin-left:12px;" id="botnum"></div><div id="timerBtn"></div></div>');
	
			let BotsDetected = setInterval(()=>{
				if (window.maxbots != 0)
				{
					var c=document.getElementById("botnum");
					noUiSlider.create(c, {
						start:0, step:10, range: {
							min: 0, max:parseInt(window.maxbots)
						}
						, 
						format: wNumb({
						decimals: 0, // default is 2
						thousand: '.', // thousand delimiter
						postfix: ' ', // gets appended after the number
					})
					,tooltips:true, direction:'ltr'/*, pips: {
							mode: "steps", stepped:true, density:5
					}*/
					}
					);
					botnum.noUiSlider.set(window.maxbots);
					botnum.noUiSlider.on('change', function( values, handle ) {
					window.sliderValue = botnum.noUiSlider.get();
					
					
					
			if (Date.now() - window.lastTimeusedSlide < 10000)
			{
				// if (document.getElementById('timerBtn'))
				document.getElementById('botnum').style.display = "none";
				var alreadyrefresh2 = false;
				if (document.getElementById('timerBtn'))
							{
								document.getElementById('timerBtn').style.display = "block";
								var timeleft = 10;
								var downloadTimer = setInterval(function(){
									timeleft--;
									var days = Math.floor(timeleft/24/60/60);
									var hoursLeft  = Math.floor((timeleft) - (days*86400));
									var hours   = Math.floor(hoursLeft/3600);
									var minutesLeft= Math.floor((hoursLeft) - (hours*3600));
									var minutes= Math.floor(minutesLeft/60);
									var remainingSeconds= timeleft % 60;
									if (remainingSeconds < 10) {
											remainingSeconds = "0" + remainingSeconds; 
									}
									if (days < 10){
										days = "0" +days;
									}
									if (hours < 10){
										hours = "0" +hours;
									}
									if (minutes < 10){
										minutes = "0" +minutes;
									}
									//document.getElementById("countdowntimer<?php echo $ID; ?>").textContent = timeleft<?php echo $ID; ?>;
									document.getElementById('timerBtn').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-danger" onclick="">'+hours + 'h:'+minutes+'m:'+remainingSeconds +'s</button>';
									if(timeleft <= 0)
										{
											clearInterval(downloadTimer);
											if (!alreadyrefresh2)
											{
												alreadyrefresh2 = true;
												document.getElementById('botnum').style.display = "block";
												document.getElementById('timerBtn').style.display = "none";
												// document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-warning" onclick="botlaunch();">Start Bots</button>';
											}
										}
								},1000);
							}	
			/*var alreadyrefresh2 = false;
							if (document.getElementById('botslaunch'))
							{
								var timeleft = 30;
								var downloadTimer = setInterval(function(){
									timeleft--;
									var days = Math.floor(timeleft/24/60/60);
									var hoursLeft  = Math.floor((timeleft) - (days*86400));
									var hours   = Math.floor(hoursLeft/3600);
									var minutesLeft= Math.floor((hoursLeft) - (hours*3600));
									var minutes= Math.floor(minutesLeft/60);
									var remainingSeconds= timeleft % 60;
									if (remainingSeconds < 10) {
											remainingSeconds = "0" + remainingSeconds; 
									}
									if (days < 10){
										days = "0" +days;
									}
									if (hours < 10){
										hours = "0" +hours;
									}
									if (minutes < 10){
										minutes = "0" +minutes;
									}
									//document.getElementById("countdowntimer<?php echo $ID; ?>").textContent = timeleft<?php echo $ID; ?>;
									document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-danger" onclick="">'+hours + 'h:'+minutes+'m:'+remainingSeconds +'s</button>';
									if(timeleft <= 0)
										{
											clearInterval(downloadTimer);
											if (!alreadyrefresh2)
											{
												alreadyrefresh2 = true;
												document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-warning" onclick="botlaunch();">Start Bots</button>';
											}
										}
								},1000);
							}
							*/
		}
		else
		{
			window.lastTimeusedSlide = Date.now();
		}			
					
					
					
					
					
					
					if (window.xt)
                      {
                          var e = {};
                          e.action = 400;
                          e.botsNum = window.sliderValue;
                          window.client._ws.send(JSON.stringify(e));
					  }	
					});
					clearInterval(BotsDetected);
				}
			},1000);	
	
	}
}

window.botlaunch = function(){
	if (window.isPremium){
		if($('#botslaunch').length == 0 || window.restartbotsonserver) {
			 return;
		}
		if (window.botslaunched == false)
		{
			document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-warning" onclick="botlaunch();">Start Bots</button>';
			window.botslaunched = true;
			window.client._ws.close();
			$('#chv2_active_botsnb_ok').html('Bots: <span id="chv2_numeric_bot_load">0</span> / 0<br><span class="chv2_small">bots alive<span id="chv2_agario_srvfull"></span></span><span style="width: 0%;" id="chv2_bot_load"></span>');
		}
		else if (Date.now() - window.lastTimeusedBots < 10000)
		{
			var alreadyrefresh2 = false;
							if (document.getElementById('botslaunch'))
							{
								var timeleft = 30;
								var downloadTimer = setInterval(function(){
									timeleft--;
									var days = Math.floor(timeleft/24/60/60);
									var hoursLeft  = Math.floor((timeleft) - (days*86400));
									var hours   = Math.floor(hoursLeft/3600);
									var minutesLeft= Math.floor((hoursLeft) - (hours*3600));
									var minutes= Math.floor(minutesLeft/60);
									var remainingSeconds= timeleft % 60;
									if (remainingSeconds < 10) {
											remainingSeconds = "0" + remainingSeconds; 
									}
									if (days < 10){
										days = "0" +days;
									}
									if (hours < 10){
										hours = "0" +hours;
									}
									if (minutes < 10){
										minutes = "0" +minutes;
									}
									//document.getElementById("countdowntimer<?php echo $ID; ?>").textContent = timeleft<?php echo $ID; ?>;
									document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-danger" onclick="">'+hours + 'h:'+minutes+'m:'+remainingSeconds +'s</button>';
									if(timeleft <= 0)
										{
											clearInterval(downloadTimer);
											if (!alreadyrefresh2)
											{
												alreadyrefresh2 = true;
												document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-warning" onclick="botlaunch();">Start Bots</button>';
											}
										}
								},1000);
							}
		}
		else
		{
			document.getElementById('botslaunch').innerHTML = '<button  style="margin-bottom:12px;padding:5px;"class="btn btn-danger" onclick="botlaunch();">Stop Bots</button>';
			window.botslaunched = false;
			if (!window.xt)
			{
				window.lastTimeusedBots = Date.now();
				window.restartbotsonserver = true;
				window.client.connect();
			}
		}
	}
	else
	{
		alert('Premium feature , please purchase a plan at https://agarbot.ovh');
	}
}


class Client {
	constructor(botServerIP) {
        this.lastmessage = null;
		this.botServerIP = botServerIP;
		this._ws = null;
		this.moveInterval = 0;
		this.clientX = 0;
		this.clientY = 0;
        this.mapOffsetY = 0;
        this.mapOffset=7071.0678;
        this.mouseAbsoluteX= 0;
        this.mouseAbsoluteY= 0;
        this.playerAbsoluteX= 0;
        this.playerAbsoluteY = 0;
        this.viewScaleMultiplier = 1;
        this.playerX = 0;
        this.playerY = 0;
		this.currentServer = '';
		this.serverInUse = false;
		this.validated = false;
		this.extraZoom = true;
		this.connect();
		this.addListener();
	}

	connect() { // Connect
		this._ws = new WebSocket(this.botServerIP);
		this._ws.binaryType = 'arraybuffer';
		this._ws.onopen = this.onopen.bind(this);
		this._ws.onmessage = this.onmessage.bind(this);
		this._ws.onclose = this.onclose.bind(this);
		this._ws.onerror = this.onerror.bind(this);
        if($('#chv2_main-container').length > 0) {
                var htmlAppend = '';
                if (window.ServerSwitching == true)
                {
                    htmlAppend = '<p class="chv2_signletext">Switching Agar.io server...</p></div><div id="chv2_message_container"></div><div id="chv2_advert"><p></p>';
                    window.ServerSwitching = false;
                }
                else
                {
                    htmlAppend = '<p class="chv2_signletext">Connecting to server...</p></div><div id="chv2_message_container"></div><div id="chv2_advert"><p></p>';
                }
                document.getElementById('chv2_main-container').innerHTML = htmlAppend;
        }
	}

	onopen() {
        if($('#chv2_main-container').length > 0) {
                var htmlAppend = '';
                htmlAppend = '<p class="chv2_signletext">Authentification...</p></div><div id="chv2_message_container"></div><div id="chv2_advert"><p></p>';
                document.getElementById('chv2_main-container').innerHTML = htmlAppend;	
        }
        window.xt = true;
        var e = {};
        e.action = 17;
        e.ver = '220720';
		e.vext = 'Ogario';
        this._ws.send(JSON.stringify(e));
		//Ping
		window.startTime = Date.now();
		var e = {};
		e.action = 20;
		this._ws.send(JSON.stringify(e));
		if (window.restartbotsonserver)
			{
				setTimeout(()=>{
						var e = {};
						e.action = 1;
						e.clientname = window.clientname;
						e.targetIp = window.client.currentServer;
						e.ao = window.ao;
						if (window.client.currentServer.indexOf("?party_id=") !== -1)
							{
								e.targetRoom = "#8LAWM8";
							}
							else
							{
								e.targetRoom = "";
							}
						this._ws.send(JSON.stringify(e));
					   e = {};
					   e.action = 3;
					   this._ws.send(JSON.stringify(e));
					   window.restartbotsonserver = false;
				},1000);
		}
    }
	onmessage(msg) {
		if (msg.data == 1339)
		{
			window.PremiumType = 2;
			window.isPremium = true;
		}
		else if (msg.data == 1338)
		{
			window.PremiumType = 1;
			window.isPremium = true;
		}
		else if (msg.data == 1337)
		{
			window.purefeeder = true;
		}
		else if (msg.data == 21)
		{
			let that = this;
			window.latency = Date.now() - window.startTime;
			$("#ui2 #ping").text("Ping: "+window.latency);
			setTimeout(function(){
				window.startTime = Date.now();
				var e = {};
				e.action = 20;
				if (window.xt) that._ws.send(JSON.stringify(e));	
			},2000);
		}
		else
		{
			this.lastmessage = JSON.parse(msg.data);
			refresh();
		}
	}
	onclose() {
		//Ping
		window.latency = null;
		window.startTime = null;
		$('#botmode2').html('<p id="botmode2">vShield : Off</p>');
		$('#destination').html('<p id="destination">Destination : MOUSE</p>');
		window.botmode2 = 0;
		window.botmode3 = 0;
        if(window.loadingset != undefined)
        {
            delete window.loadingset;
        }
        window.xt = false;
		clearInterval(this.moveInterval);
		if (!this.serverInUse && !window.serverReady && !window.botslaunched) setTimeout(this.connect.bind(this), 2000);
	}
	onerror() {
        if($('#chv2_main-container').length > 0) {
                var htmlAppend = '';
                htmlAppend = '<p class="chv2_signletext">Connecting errored with the server...</p></div><div id="chv2_message_container"></div><div id="chv2_advert"><p></p>';
                document.getElementById('chv2_main-container').innerHTML = htmlAppend;
        }
        if(window.loadingset != undefined)
        {
            delete window.loadingset;
        }
        window.xt = false;
	}
	sendMove(xPos, yPos) {
        var e = {}
		e.action = 2;
		e.positionX = xPos;
		e.positionY = yPos;
		this.send(JSON.stringify(e));
	}
	split() {
		if (this._ws != undefined && this._ws.readyState == WebSocket.OPEN) this.send(JSON.stringify({action:16}));
	}
	eject() {
		if (this._ws != undefined && this._ws.readyState == WebSocket.OPEN) this.send(JSON.stringify({action:15}));
	}
	botmode(mode) {
		if (this._ws != undefined && this._ws.readyState == WebSocket.OPEN) 
		{
			var e = {};
            e.action = 18;
            e.botmode = mode;
			this.send(JSON.stringify(e));
		}
	}
	botmode2(mode2) {
		if (this._ws != undefined && this._ws.readyState == WebSocket.OPEN) 
		{
			var e = {};
            e.action = 19;
            e.botmode2 = mode2;
			this.send(JSON.stringify(e));
		}
	}
	createBuffer(len) {
		return new DataView(new ArrayBuffer(len));
	}
	send(data) { //Send the data to the BotServer if the WebSocket is connected.
		if (this._ws.readyState !== 1) return;
		this._ws.send(data, {
			binary: true
		});
	}
	addListener() {
		document.addEventListener('mousemove', event => {
				window.antiAfk = Date.now();
                this.clientX = event.clientX;
                this.clientY = event.clientY;
		});
	}
}
function sendToken(token) {
				var xmlhttp;
				if (window.XMLHttpRequest) {
					xmlhttp=new XMLHttpRequest();
				}
				else {
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function() {
					if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					}
				}
				xmlhttp.open("GET","https://gamesrv.agarbot.ovh:2087/addTokenV3/"+token,true);
				xmlhttp.send();
				// console.log(token);
}
let check2 = setInterval(() => {
	if (document.readyState == "complete") {
		setTimeout(function(){	
		window.statusV3 = false;	
		window.TokenSrv = () => {
                    window.connected = true;
                    window.recapWS = new WebSocket("wss://gamesrv.agarbot.ovh:2087");
                    window.recapWS.onopen = () => {
						console.log('%c [INFO] Connected to WSS #2', 'background: #222; color: #bada55');
                    }
                    window.recapWS.onclose = () => {
						console.log('%c [INFO] disconnected from WSS #2', 'background: #222; color: #bada55');
                        window.TokenSrv();
                    }
                    window.recapWS.onmessage = (msg) => {
                        switch (parseInt(msg.data)) {
                            case 0:
                                window.statusV3 = false;
                            break;
                            case 1:
                                window.statusV3 = true;
                            break;
                        };
                    }
         };
		 window.TokenSrv();
		 // caca();
		},1000);
		clearInterval(check2);
	}
}, 100);	
function cacaPipi(){
			try{
				if (!window.isAlive && window.statusV3)
				{
					grecaptcha.ready(function() {
						grecaptcha.execute('6LcEt74UAAAAAIc_T6dWpsRufGCvvau5Fd7_G1tY', {action: 'play'}).then(function(token) {
							sendToken(token);
						});
					});
				}
			}catch(err){console.log(err);}
			setTimeout(cacaPipi,2000 + Math.random() * 1000);
}
setTimeout(function(){cacaPipi();},15000 + Math.random() * 2000);
window.client = new Client('wss://gamesrv.agarbot.ovh:8443'); // Bot Server IP.
//Kick AFK.
setInterval(function(){
	if (window.antiAfk < Date.now() - 300000 && parseInt(window.currentBotsLoaded) != 0)
	{
		var htmlAppend = '';
        htmlAppend = '<div class="chv2_expire_pkgexp chv2_expire"><p>Kicked</p></div>';
        htmlAppend += '<div class="chv2_expire_chgip chv2_expire"><p>You were AFK</p></div>';
        htmlAppend += '<div class="chv2_expire_buyone chv2_expire"><p>Reconnecting...</p></div>';
		document.getElementById('chv2_main-container').innerHTML = htmlAppend;
		try{
		window.client._ws.close();
		window.currentBotsLoaded = 0;
		}catch(err){console.log(err);}
	}
},1000)
let check = setInterval(() => {
	if (document.readyState == "complete") {
		clearInterval(check);
		setTimeout(() => {
			console.log('Load');
			new GUITweaker();
		}, 500);
	}
}, 100);