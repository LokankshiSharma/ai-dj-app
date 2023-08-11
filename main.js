var song1 = "";
var song2 = "";
var Status1 = "";
var Status2 = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWscore = 0;
var rightWscore = 0;

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);
}

function preload(){
    song1 = loadSound("AIIYL.mp3");
    song2 = loadSound("Antifragile.mp3");
}

function draw(){
    image (video, 0, 0, 600, 500)
    fill('red');
    stroke('white');
    Status1 = song1.isPlaying();
    Status2= song2.isPlaying();
    if (leftWscore > 0.2){
    circle (leftWristX, leftWristY, 20); 
    song2.stop();
    if (Status1==false){
        song1.play();
        document.getElementById("status").innerHTML='As if its your last by BLACKPINK';
    }
}
    if(rightWscore>0.2){
        console.log('rightwscore');
        circle( rightWristX, rightWristY, 20);
        song1.stop();
        if (Status2==false){
            song2.play();
            document.getElementById("status").innerHTML='Antifragile by LE SSERAFIM';
    }
}
}
function modelLoaded(){
    console.log('PoseNet is initialized')
}

function gotPoses(results){
    if (results.length>0){
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log('Left Wrist X & Y = ' + leftWristX + ',' + leftWristY);
        console.log(' Right Wrist X & Y = ' + rightWristX + ',' + rightWristY);
        leftWscore = results[0].pose.keypoints[9].score;
        rightWscore = results[0].pose.keypoints[10].score;
        console.log('Right Wrist Score: ' + rightWscore + ' Left Wrist Score: ' + leftWscore);
    }
}