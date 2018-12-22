var Typer={
	text: null,
	accessCountimer:null,
	index:0, // current cursor position
	speed:2, // speed of the Typer
	file:"", //file, must be setted
	accessCount:0, //times alt is pressed for Access Granted
	deniedCount:0, //times caps is pressed for Access Denied
	init: function(){// inizialize Hacker Typer
		//accessCountimer=setInterval(function(){Typer.updLstChr();},500); // inizialize timer for blinking cursor
		$.get(Typer.file,function(data){// get the text file
			Typer.text=data;// save the textfile in Typer.text
			Typer.text = Typer.text.slice(0, Typer.text.length-1);
                        console.log(Typer.text);
		});
	},

	content:function(){
		return $("#console").html();// get console content
	},

	write:function(str){// append to console content
		$("#console").append(str);
		return false;
	},

	makeAccess:function(){//create Access Granted popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.accessCount=0; //reset count
		var ddiv=$("<div id='gran'>").html(""); // create new blank div and id "gran"
		ddiv.addClass("accessGranted"); // add class to the div
		ddiv.html("<h1>ACCESS GRANTED</h1>"); // set content of div
		$(document.body).prepend(ddiv); // prepend div to body
		return false;
	},
	makeDenied:function(){//create Access Denied popUp      FIXME: popup is on top of the page and doesn't show is the page is scrolled
		Typer.hidepop(); // hide all popups
		Typer.deniedCount=0; //reset count
		var ddiv=$("<div id='deni'>").html(""); // create new blank div and id "deni"
		ddiv.addClass("accessDenied");// add class to the div
		ddiv.html("<h1>ACCESS DENIED</h1>");// set content of div
		$(document.body).prepend(ddiv);// prepend div to body
		return false;
	},

	hidepop:function(){// remove all existing popups
		$("#deni").remove();
		$("#gran").remove();
	},

	addText:function(key){//Main function to add the code
		if(key.keyCode==18){// key 18 = alt key
			Typer.accessCount++; //increase counter
			if(Typer.accessCount>=3){// if it's presed 3 times
				Typer.makeAccess(); // make access popup
			}
		}else if(key.keyCode==20){// key 20 = caps lock
			Typer.deniedCount++; // increase counter
			if(Typer.deniedCount>=3){ // if it's pressed 3 times
				Typer.makeDenied(); // make denied popup
			}
		}else if(key.keyCode==27){ // key 27 = esc key
			Typer.hidepop(); // hide all popups
		}else if(Typer.text){ // otherway if text is loaded
			var cont=Typer.content(); // get the console content
			if(cont.substring(cont.length-1,cont.length)=="|") // if the last char is the blinking cursor
				$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it before adding the text
			if(key.keyCode!=8){ // if key is not backspace
				Typer.index+=Typer.speed;	// add to the index the speed
			}else{
				if(Typer.index>0) // else if index is not less than 0
					Typer.index-=Typer.speed;//	remove speed for deleting text
			}
			var text=Typer.text.substring(0,Typer.index)// parse the text for stripping html enities
			var rtn= new RegExp("\n", "g"); // newline regex

			$("#console").html(text.replace(rtn,"<br/>"));// replace newline chars with br, tabs with 4 space and blanks with an html blank
			window.scrollBy(0,1); // 50 original scroll to make sure bottom is always visible
		}
		if ( key.preventDefault && key.keyCode != 122 ) { // prevent F11(fullscreen) from being blocked
			key.preventDefault();
		};
		if(key.keyCode != 122){ // otherway prevent keys default behavior
			key.returnValue = false;
		}
	},
       // var cur = 0;
	updLstChr:function(){ // blinking cursor - removed for now
		var cont=this.content(); // get console
		if(cont.substring(cont.length-1,cont.length)=="|") { // if last char is the cursor
                        console.log("here");
			$("#console").html($("#console").html().substring(0,cont.length-1)); // remove it
                       // cur = 1;
                }
		/*else if (cur == 0){
                        console.log("here2");
			this.write("|"); // else write it
                }*/
	}
}

function replaceUrls(text) {
	var http = text.indexOf("http://");
	var space = text.indexOf(".me ", http);
	if (space != -1) {
		var url = text.slice(http, space-1);
		return text.replace(url, "<a href=\""  + url + "\">" + url + "</a>");
	} else {
	return text
}
}
Typer.speed=1;
Typer.file="rishab.js";
Typer.init();

var timer = setInterval("t();", 20);
function t() {

	Typer.addText({"keyCode": 123748});
	if (Typer.index > Typer.text.length) {
                Typer.updLstChr();
		clearInterval(timer);
                t2();
	}
}

function t2() {

      var input = document.createElement("input");
      var newline = document.createElement("br");
      input.type = "text";
      input.className = "d";
      input.id = "input";

      input.addEventListener("keydown", function(event) {
              if(event.keyCode == 13) {
                    var val = input.value;
                    val = val.toLowerCase();
                    if (val.substring(val.length-1, val.length) == "?")
                       val = val.slice(0, val.length-1);
                    var split = val.split(" ");

                    var done = 0;
                    for (var i = 0; i < questions.length; i++) {

                        for (var j = 0; j < questions[i].length; j++) {
                            var check = 0;
                            for (var k = 0; k <  questions[i][j].length; k++) {
                                 if (split.indexOf(questions[i][j][k]) == -1) {
                                     check = 1;
                                     break;
                                 }
                             }
                             if (check == 0) {
                                console.log(answers[i]);
                                //var curText = "<span id=a>Clementine</span>:<span id=b>~</span><span id=c>$</span>"
                                var curText = " " + answers[i];
                                Typer.text += "<br/> <br/> <span id = \"c\">" + input.value + "</span>";
                                Typer.speed = 100;
                                t();
                                Typer.text += "<br/>" + curText;
                                //console.log(Typer.text);
                                Typer.speed = 2;
                                //Typer.addText({"keyCode": 123748});

                                document.getElementById("input").value = "> ";

                                timer = setInterval("t();", 30);
                                done = 1;
                                break;
                             }
                         }
                        if (done == 1)
                           break;
                     }

                     if (done == 0) {
                                var curText = "Sorry, I do not know the answer to that. Hopefully, you can find an answer in his Resume: rishab.me/resume";
                                Typer.text += "<br/> <br/> <span id = \"c\">" + input.value + "</span>";
                                Typer.speed = 50;
                                t();
                                Typer.text += "<br/>" + curText;
                                //console.log(Typer.text);
                                Typer.speed = 2;
                                //Typer.addText({"keyCode": 123748});

                                document.getElementById("input").value = "> ";

                                timer = setInterval("t();", 30);
                     }
              }
      });

      //input.value = "> ";
      document.body.appendChild(newline);
      document.body.appendChild(input);
      document.getElementById("input").focus();
      document.getElementById("input").value = "> ";

}
