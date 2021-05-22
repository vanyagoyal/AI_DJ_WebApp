song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

score_leftWrist = 0;
score_rightWrist = 0;


function preload(){
    song = loadSound('Song.mp3');
}

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    pose_net = ml5.poseNet(webcam , modelloaded);
    pose_net.on('pose' , gotResult);
}

function draw(){
    image(webcam , 0 , 0 , 600 , 500);
    fill('#0ec229');
    stroke('#27f591');

    if(score_rightWrist > 0.02)
    {
        circle(rightWristX , rightWristY , 20);

        if(rightWristY > 0 && rightWristY <= 100 )
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }

        if(rightWristY > 100 && rightWristY <= 200 )
        {
            document.getElementById("speed").innerHTML = "Speed = 1.0x";
            song.rate(1.0);
        }

        if(rightWristY > 200 && rightWristY <= 300 )
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }

        if(rightWristY > 300 && rightWristY <= 400 )
        {
            document.getElementById("speed").innerHTML = "Speed = 2.0x";
            song.rate(2.0);
        }

        if(rightWristY > 400 && rightWristY <= 500 )
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }

    if(score_leftWrist > 0.02)
    {
    circle(leftWristX , leftWristY , 20);
    leftWrist_no = Number(leftWristY);
    left_round = floor(leftWrist_no);
    volume = left_round / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function play1(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause1(){
    song.pause();
}

function stop1(){
    song.stop();
}

function modelloaded(){
    console.log("Model is Loaded!");
}

function gotResult(results){
    if (results.length > 0){
        console.log(results);
        //Console the leftWrist X and Y by getting the values from the poseNet.
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        
        console.log("LeftWrist X = "+ leftWristX + "Left Wrist Y = " + leftWristY);

        //Console the rightWrist X and Y by getting the values from the poseNet.
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Right Wrist X = "+ rightWristX + "Right Wrist Y = " + rightWristY);

        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Score :-" + score_leftWrist);

        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score :-" + score_rightWrist);
    }
}