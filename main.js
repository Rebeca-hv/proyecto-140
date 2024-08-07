song = "";

manoIzquierdaX = 0;
manoIzquierdaY = 0;

manoDerechaX = 0;
manoDerechaY = 0;

puntajeManoDerecha = 0;
puntajeManoIzquierda = 0;

function preload(){
    song = loadSound("sowk.mp3");
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
        console.log(results);

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
    fill("#FF0000");
    stroke("#FF0000");

    if(puntajeManoDerecha > 0.2){
        circle(manoDerechaX,manoDerechaY,20);

    if(manoDerechaY > 0 && manoDerechaY <= 100){
            document.getElementById("speed").innerHTML = "Velocidad = 0.5x";
            song.rate(0.5);
    }
    else if(manoDerechaY > 100 && manoDerechaY <= 200){
            document.getElementById("speed").innerHTML = "Velocidad = 1x";
            song.rate(1);
    }
    else if(manoDerechaY > 200 && manoDerechaY <= 300){
        document.getElementById("speed").innerHTML = "Velocidad = 1.5x";
        song.rate(1.5);
    }
    else if(manoDerechaY > 300 && manoDerechaY <= 400){
        document.getElementById("speed").innerHTML = "Velocidad = 2x";
        song.rate(2);

    }
    else if(manoDerechaY > 400){
        document.getElementById("speed").innerHTML = "Velocidad = 2.5x";
        song.rate(2.5);
    }
    }
    if(puntajeManoIzquierda < 0.2){
        circle(manoIzquierdaX,manoIzquierdaY,20);
        InNumberLeftWrist = Number(manoIzquierdaY);
        new_leftWrist =floor(InNumberLeftWrist *2);
        volume = new_leftWrist/500;
        document.getElementById("volume").innerHTML = "Volumen = "+ volume;
        song.setVolume(volume);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}