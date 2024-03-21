let judul;
let nama;
let tombol;
let hello;
let objek;
let jalan = false;
let gravForce;
let windForce;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  tombol = createButton('Jalankan/Pause')
  tombol.position(30,110)
  
  objekPos = createVector(width/15,height/2.5);
  objekVel = createVector(0,0);
  objekAcc = createVector(0,0);
  objekMass = 10;
  objek = new Mover(objekPos, objekVel, objekAcc, objekMass);
  
  gravForce = createVector(0, objek.mass*0.1);
  windForce = createVector(0.5, 0);
}


function draw() {
  background(220);
  nama = createElement('h2', 'Nazwa Wulan Dini, 122160020')
  nama.position(30, 50)
  judul = createElement('h2', 'Simulasi Hk Newton')
  judul.position(30, 15)
  objek.display();
  
  var Cd = 0.0001;
  var diam1 = (2*objek.mass);
  var A1 = PI*diam1/2;
  var frictionForce = objek.velocity.copy();
  frictionForce.normalize()
  frictionForce.mult(-1* (frictionForce.mag()**2) *A1*Cd)

  
  objek.applyForce(gravForce);
  objek.applyForce(windForce);
  objek.applyForce(frictionForce);
  
  
  
  tombol.mousePressed(run);
  
  if (jalan){
    objek.update();
  }
  
}

function sayHello() {
  hello = createElement('h2', 'Selamat datang ' + nama.value())
  hello.position(30, 150)
}

function run(){
  // objek.update();
  if (jalan){
    jalan = false;
  }
  else{
    jalan = true
  }
}

class Mover {
  constructor(loc, vel, acc, m){
    this.location = loc;
    this.mass = m;
    this.velocity = vel;
    this.acceleration = acc;
  }
  update(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
  }
  display(){
    noStroke();
    fill('orange')
    ellipse(this.location.x+10, this.location.y-30, 10/2*this.mass, 10/2*this.mass);
    fill('white')
    ellipse(this.location.x, this.location.y-35, 3/2*this.mass, 3/2*this.mass);
    ellipse(this.location.x+20, this.location.y-35, 3/2*this.mass, 3/2*this.mass);
    fill('black')
    ellipse(this.location.x, this.location.y-35, 1*this.mass, 1*this.mass);
    ellipse(this.location.x+20, this.location.y-35, 1*this.mass, 1*this.mass);
    ellipse(this.location.x+10, this.location.y-20, 1*this.mass, 3/2*this.mass);
  }  
  
  applyForce(force){
    force.div(this.mass)
    this.acceleration.add(force);
  }
}