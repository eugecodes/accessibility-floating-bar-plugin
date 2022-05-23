import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faA, faUniversalAccess, faItalic, faFont, faTextHeight, faEarListen } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';

function AccessibilityModal ({}): JSX.Element {
    const [contrast, setContrast] = useState(0);
    const [fontsize, setFontSize] = useState(0);
    const [fontfamily, setFontFamily] = useState(0);
    const [lineheight, setLineHeight] = useState(0);

    // In initial loading
    let page_elements = ['div', 'section', 'ul', 'li', 'nav', 'button', 'body'];
    let text = ['a', 'p', 'small', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    let buttons = ['a', 'button'];
    let all = page_elements.concat(text);
    let how_much_increment = 5; // Configured value, it's not recommended to change it
    let accessible_fonts = ['Tahoma', 'Calibri', 'Helvetica', 'Arial', 'Verdana', 'Times New Roman', 'inherit'];
    let constrast_combinations = [
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
        },
        {
            'background-color': 'initial',
            'color': 'initial'
        }
    ]

    const changeColors = () => {
        setContrast(contrast+1)
        page_elements.map(item => {
            if (contrast < constrast_combinations.length){
                $(item).css(constrast_combinations[contrast])
            }
            if (contrast == constrast_combinations.length){
                setContrast(0)
            }
        })
    }

    const changeFontSize = (action) => {
        if (action == 'increment') {
            setFontSize(fontsize+1)
        }else if (fontsize > 0){
            setFontSize(fontsize-1)
        }
        text.map(item => {
            let current_fontsize = $(item).css('font-size');
            if (current_fontsize) { current_fontsize = current_fontsize.split("px")[0]; }
            if (action == 'increment') { current_fontsize = (parseInt(current_fontsize) + how_much_increment) 
            } else { current_fontsize = (parseInt(current_fontsize) - how_much_increment) }
            $(item).css('font-size',  current_fontsize + 'px');
        })
    }

    const changeFontFamily = () => {
        setFontFamily(fontfamily+1);
        console.log(fontfamily)
        text.map(item => {
            if (fontfamily < accessible_fonts.length){
                $(item).css('font-family', accessible_fonts[fontfamily])
            }
            if (fontfamily == accessible_fonts.length){
                setFontFamily(0)
            }
        })
    }

    const changeLineHeight = () => {
        setLineHeight(lineheight+1);
        text.map(item => {
            let current_lineheight = $(item).css('line-height');
            if (current_lineheight == 'normal') {
                current_lineheight = $(item).css('font-size');
            }
            if (lineheight < how_much_increment){
                $(item).css('line-height', (parseInt(current_lineheight) + how_much_increment) + 'px')
            }
            if (lineheight == how_much_increment){
                $(item).css('line-height', 'normal');
                setLineHeight(0)
            }
        })
    }

    const readmeText = (whattoread) => {
        console.log('Readme! ' + whattoread)
        if ('speechSynthesis' in window) {
            console.log('Speech Synthesis supported')
    
            let msg = new SpeechSynthesisUtterance();
            msg.text = whattoread;
            window.speechSynthesis.speak(msg);
    
        } else {
            console.log("Sorry, your browser doesn't support text to speech!");
        }
    }

    const readmePage = () => {
        readmeText(document.body.innerText)
    }

    const beep = () => {
        var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
        snd.play();
    }

    const runSpeechRecognition = (output_name, action_name) => {
        readmeText(action_name)
        var output = document.getElementById(output_name);
        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.onstart = function() {
            beep();
        }
        
        recognition.onspeechend = function() {
            beep();
            recognition.stop();
        }
      
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            output.value = transcript;
        }

        recognition.start();
    }

    useEffect(() => {
        const handleDocumentMouseUp = event => {
          if (event.button !== 2) {
            let whattoread = window.getSelection().toString();
            setTimeout(() => readmeText(whattoread), 20);
          }
        };
      
        document.addEventListener('mouseup', handleDocumentMouseUp);
        return () => {
          document.removeEventListener('mouseup', handleDocumentMouseUp);
        };
    }, []);

    return(
        <>
            <div style={{ paddingTop: '10%', position: 'fixed', zIndex: '100'}}>
                <Card style={{ maxWidth: '5rem' }}>
                        <Card.Body>
                            <Row>
                                <Button variant="dark"><FontAwesomeIcon icon={faUniversalAccess}  style={{ fontSize: '2rem', padding: '0px !important' }} /></Button>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" onClick={changeColors}><FontAwesomeIcon icon={faPalette} /></Button>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" onClick={() => changeFontSize('increment')}><FontAwesomeIcon icon={faA} />+</Button>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" onClick={() => changeFontSize('decrement')}><FontAwesomeIcon icon={faA} />-</Button>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" onClick={changeFontFamily}><FontAwesomeIcon icon={faItalic} /><FontAwesomeIcon icon={faFont} /></Button>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" onClick={changeLineHeight}><FontAwesomeIcon icon={faTextHeight} /></Button>
                            </Row>
                            <Row>
                                <Button variant="outline-primary" onClick={readmePage}><FontAwesomeIcon icon={faEarListen} /></Button>
                            </Row>
                        </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default AccessibilityModal;