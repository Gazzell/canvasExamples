const finalCanvas = document.getElementById('canvas');
const finalCtx = finalCanvas.getContext('2d');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const image = new Image();
image.crossOrigin = "anonymous";
let width, height;

image.src = "./chicho-terremoto-tres-puntos-colega.png";
image.onload = function(e) {
    width = image.width;
    height = image.height;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0);
    //finalCtx.drawImage(canvas, 0, 0);
    processPixelData();
};

function getMidColor(x, y, data) {
    let basePos = (y*width + x) * 10 * 4;
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    for(let i = 0; i< 40; i+=4){
        for(let j = 0; j< 40; j+=4){
            const pos = basePos + i * width + j;
            r += data[pos];
            g += data[pos+1];
            b += data[pos+2];
            a += data[pos+3];
        }
    }
    r = Math.round(r * 0.01);
    g = Math.round(g * 0.01);
    b = Math.round(b * 0.01);
    a = Math.round(a * 0.01);
    return { r, g, b, a };
}

function processPixelData () {
    const data = ctx.getImageData(0, 0, width, height);
    for (let x = 0; x < 49; x++){
        for(let y = 0; y < 45; y++){
            let color = getMidColor(x, y, data.data);
            console.log(`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`)
            finalCtx.fillStyle = `rgba( ${color.r}, ${color.g}, ${color.b}, ${color.a} )`;

            finalCtx.beginPath();
            finalCtx.arc(x*10 + 5, y*10 + 5, 4, 0, 2*Math.PI, false);
            finalCtx.closePath();
            finalCtx.fill();
        }
    }
}