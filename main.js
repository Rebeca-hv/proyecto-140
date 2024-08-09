song1 = "";
song2 = "";

song1_status = "";
song2_status = "";

manoIzquierdaX = 0;
manoIzquierdaY = 0;

manoDerechaX = 0;
manoDerechaY = 0;

puntajeManoDerecha = 0;
puntajeManoIzquierda = 0;

function preload(){
    song1 = loadSound("sowk.mp3");
    song2 = loadSound("lt.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
} 

function modelLoaded(){
    console.log("Posenet está inicializado");
}

function gotPoses(results){
    if(results.length > 0){
        //console.log(results);

        puntajeManoDerecha = results[0].pose.keypoints[10].score;
        puntajeManoIzquierda = results[0].pose.keypoints[9].score;
        console.log("puntaje derecha: "+ puntajeManoDerecha + "puntaje izquierda: "+ puntajeManoIzquierda);

        manoDerechaX = results[0].pose.rightWrist.x;
        manoDerechaY = results[0].pose.rightWrist.y;
        console.log("mano derecha en X: "+ manoDerechaX + "Mano derecha en Y: "+ manoDerechaY);

        manoIzquierdaX = results[0].pose.leftWrist.x;
        manoIzquierdaY = results[0].pose.leftWrist.y;
        console.log("mano izquierda en X: "+ manoIzquierdaX + "Mano izquierda en Y: "+ manoIzquierdaY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(puntajeManoDerecha > 0.2){
        circle(manoDerechaX,manoDerechaY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Reproduciendo cancion 1"
        }
    }
    if(puntajeManoIzquierda > 0.2){
        circle(manoIzquierdaX,manoIzquierdaY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Reproduciendo cancion 2"
        }
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}