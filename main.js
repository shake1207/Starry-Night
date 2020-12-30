var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var starTexture = new THREE.TextureLoader().load("star.png");

var lightness = 0;
var rotSpeed = 0.01;
var stars = [];

function animate() {
  for (let k = 0; k < stars.length; k++) {
    let star = stars[k];

    star.rotation.x += 0.01;
    star.rotation.y += 0.01;
    lightness > 100 ? (lightness = 0) : lightness++;

    star.material.color = new THREE.Color("hsl(255,100%," + lightness + "%)");
  }
  let x = camera.position.x;
  let z = camera.position.z;

  camera.position.x = x * Math.cos(rotSpeed) + z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) - x * Math.sin(rotSpeed);
  camera.lookAt(scene.position);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

var geometry = new THREE.SphereGeometry(1.5, 32, 32);

var planetTexture = new THREE.TextureLoader().load("neptune.png");

planetTexture.wrapS = planetTexture.wrapT = THREE.MirroredRepeatWrapping;
planetTexture.repeat.set(1, 0.3);

var material = new THREE.MeshBasicMaterial({ map: planetTexture });

var planet = new THREE.Mesh(geometry, material);
scene.add(planet);

camera.position.z = 10;

for (let i = 0; i < 200; i++) {
  let geometry = new THREE.PlaneGeometry(0.5, 0.5);
  let material = new THREE.MeshBasicMaterial({ map: starTexture });
  let star = new THREE.Mesh(geometry, material);
  star.position.set(getRandom(), getRandom(), getRandom());
  star.material.side = THREE.DoubleSide;
  stars.push(star);
}

for (let j = 0; j < stars.length; j++) {
  scene.add(stars[j]);
}

function getRandom() {
  var num = Math.floor(Math.random() * 10) + 1;
  num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
  return num;
}
