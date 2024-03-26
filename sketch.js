let font;
let gbuff;
let cvn;

function preload() {
  font = loadFont("Nexa-Heavy.ttf");
}

const buffSize = { x: 300, y: 150 };
const canvasSize = { x: 800, y: 400 };
let MAXSHAPES = 10;
const textHeight = 30;
let phrase = "Naive Baffle";
/**
 * @type {HTMLInputElement}
 */
let inputText;
/**
 * @type {HTMLInputElement}
 */
let checkAntialias;
/**
* @type {HTMLInputElement}
*/
let shapesDensitySlider;
let redoFlag = true;
let phraseWidth = 0;
let shapesFactor = 1.3;

function setup() {
  cnv = createCanvas(canvasSize.x, canvasSize.y);
  gbuff = createGraphics(buffSize.x, buffSize.y);
  gbuff.ellipseMode(CENTER);
  gbuff.noStroke();
  gbuff.textAlign(CENTER, CENTER);
  gbuff.textFont(font);

  noLoop();
  smooth();
  imageMode(CENTER);
  checkAntialias = document.getElementById("checkAntialias");
  checkAntialias.checked = true;
  checkAntialias.addEventListener("change", (e) => {
    checkAntialias.checked ? smooth() : noSmooth();
    draw();
  });

  inputText = document.getElementById("inputText");
  inputText.value = phrase;
  phraseWidth = gbuff.textWidth(phrase);
  MAXSHAPES = phrase.length ** shapesFactor
  inputText.addEventListener("input", (e) => {
    phrase = inputText.value;
    phraseWidth = textWidth(phrase);
    MAXSHAPES = phrase.length ** shapesFactor
    draw();
  });


  shapesDensitySlider = document.getElementById("shapesDensitySlider");
  shapesDensitySlider.value = 30;
  shapesDensitySlider.addEventListener('change', () => {
    shapesFactor = shapesDensitySlider.value / 100 + 1.0;
    MAXSHAPES = phrase.length ** shapesFactor
    draw()
  })


}

function draw() {
  gbuff.background(255);
  gbuff.textFont(font);
  gbuff.textSize(textHeight);
  gbuff.fill(0);
  gbuff.text(phrase, gbuff.width / 2, gbuff.height / 2);

  for (let index = 0; index < MAXSHAPES; index++) {
    gbuff.fill(random([0, 255]));
    gbuff.ellipse(randomGaussian(gbuff.width / 2, phraseWidth / 1.5), randomGaussian(gbuff.height / 2, textHeight / 8) + textHeight / 4, randomGaussian(5, 5), randomGaussian(5, 5));
  }

  image(gbuff, width / 2, height / 2, canvasSize.x, canvasSize.y);
}
