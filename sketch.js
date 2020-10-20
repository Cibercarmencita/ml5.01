// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html // https://youtu.be/OIo-DIOkNVg

let video;
let poseNet;
let pose;
let skeleton;
let img,img01;


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', damePoses);
  img = createImage(640,480);
  img01 = loadImage('01.png');
  }

function damePoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet listo!');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    noStroke();
    fill(random(0,255), 0,random(0,255));
    image(img01, pose.nose.x-30,pose.nose.y-10,d,d);
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(random(0,255), 0,random(0,255));
      ellipse(x,y,16,16);
    }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(5);
      stroke(random(0,255), 0,random(0,255));
      line(a.position.x, a.position.y,b.position.x,b.position.y);       }
  }
}

function mousePressed(){
  save(img, 'imagen.jpg');
}
