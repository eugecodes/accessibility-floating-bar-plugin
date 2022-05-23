// In initial loading
var page_elements = ['div', 'section', 'ul', 'li', 'nav', 'button', 'body'];
var text = ['a', 'p', 'small', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
var buttons = ['a', 'button'];

// Generic

// Get me selected text and read it
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}
var whattoread = "", counting = 0;

document.onmouseup = document.onkeyup = function() {
    whattoread = getSelectionText();
    console.log(whattoread);
    setTimeout(readmeText(whattoread), 20);
};

/* Record answer */
function runSpeechRecognition(output_name, action_name) {
    readmeText(action_name)
    // get output div reference
    var output = document.getElementById(output_name);
    // get action element reference
    //var action = document.getElementById(action_name);
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        beep();
        console.log("listening, please speak...");
    };
    
    recognition.onspeechend = function() {
        beep();
        console.log("listening, stopped...");
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;
        readmeText('What you said is ...'+transcript);
        output.value = transcript;
    };
  
     // start recognition
     recognition.start();
}

// Read aloud the text
function readmeText(whattoread) {
    console.log('Readme! ' + whattoread)
    if ('speechSynthesis' in window) {
        // Speech Synthesis supported 🎉
        console.log('Speech Synthesis supported')

        var msg = new SpeechSynthesisUtterance();
        msg.text = whattoread;
        window.speechSynthesis.speak(msg);

    } else {
        // Speech Synthesis Not Supported 😣
        alert("Sorry, your browser doesn't support text to speech!");
    }
}

// Functions
function accessibility(kindof) {
    var count = 1, mycookie = getCookie(kindof.toString());
    if (parseInt(mycookie)) { count = parseInt(mycookie) + 1 }
    console.log(kindof + ' ' + count)


    if (count >= 3) {
        setCookie(kindof.toString(), 0, 1)
        console.log('disabling the option')
    } else {
        console.log('Increment count in cookie ' + count)
        setCookie(kindof.toString(), count, 1)
    }

    // Execute accessibility setting
    if (kindof == 'blind') {
        // read current page
        console.log('blind')
        mypagetext = document.body.innerText
        console.log(mypagetext)
        readmeText(mypagetext)
    }
    
    if (kindof == 'font') {

        var f = ['Montserrat','Open Sans','Noto Sans']

        for (i = 0; i < text.length; i++) {
            console.log("'" + f[(count - 1)] + "', sans-serif !important")
            $(text[i]).css('font-family', f[(count - 1)]);
        }
    }
    
    if (kindof == 'contrast') {
        var c = [
            {
                'background-color': 'black',
                'color': 'yellow'
            },
            {
                'background-color': 'darkblue',
                'color': 'white'
            },
            {
                'background-color': 'white',
                'color': 'initial'
            }
        ]
        var final = page_elements.concat(text);
        for (i = 0; i < final.length; i++) {
            $(final[i]).css(c[(count - 1)])
        }
    }

    if (kindof == 'reset') {
        window.location.reload()
    }
    // Hide Bar
    document.getElementById('accessibilityBar').style.display = 'none'
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function apply_accessibility() {
    return ''
}
function decrement(otype, howmuch) {
    var final = text;
    for (i = 0; i < final.length; i++) {
        var current_fontsize = $(final[i]).css(otype);
        if (current_fontsize) {
            current_fontsize = current_fontsize.split("px")[0];
        }
        $(final[i]).css(otype, (parseInt(current_fontsize) - howmuch) + 'px');
    }
}
function increment(otype, howmuch) {
    var final = text;
    for (i = 0; i < final.length; i++) {
        var current_fontsize = $(final[i]).css(otype);
        if (current_fontsize) {
            current_fontsize = current_fontsize.split("px")[0];
        }
        $(final[i]).css(otype, (parseInt(current_fontsize) + howmuch) + 'px');
    }
}

window.addEventListener("load", (event) => {
    // apply accessibility settings
    
});

function readAloudAndRecord(showup) {
    return ''
}
function showMicrophone(showup) {
    return ''
}
function showReadme(showup) {
    var divs = document.getElementsByClassName("readaloud");
    if (showup == 1) {
        //divsToShow is an array
        showRecursive(divs)
    } else {
        //divsToHide is an array
        hideRecursive(divs)
    }

}
function showReadLine(showup) {
    return ''
}
function resetSettings() {
    document.cookie = ""
    showReadme(0)
    showMicrophone(0)
    readAloudAndRecord(0)
    showReadLine(0)
}
// Globals
var accessibility_globals = {
    contrast: ['white', 'black'],
    fontsize_increment: [2, 4, 8],
    font_change: ['bold', 'mayus', 'Nue'],
    increment_spacing: [20, 40, 60]
    /*
    blind: readAloudAndRecord(1),
    show_mic: showMicrophone(1),
    only_readme: showReadme(1),
    read_line: showReadLine(1),
    reset_settings: resetSettings()
    */
}

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}
