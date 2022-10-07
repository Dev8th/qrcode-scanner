var audio = document.getElementById('beep');
    var kamera = document.getElementById('kamera');
    var button = document.getElementById('button');
    var output = document.getElementsByClassName('output')[0];
    var h1 = document.getElementsByTagName('h1')[0];

    document.getElementsByClassName('start')[0].addEventListener('click', main);

    function main() {
        if (kamera.classList.contains("hide")) {
            startscanner();
        } else {
            stopscanner();
        }
    }

    // INISIALISASI   
    let scanner = new Instascan.Scanner({
        video: document.getElementById('kamera'),
        mirror: false
    });

    // START CAMERA
    function startscanner() {

        output.style.display = "none";

        kamera.style.display = "block";
        kamera.classList.add("show");
        kamera.classList.remove("hide");

        button.classList.add("stop");
        button.classList.remove("start");
        button.innerText = "STOP";

        //GET CAMERA
        Instascan.Camera.getCameras().then(function(cameras) {

            active_cam = 0;
            if (window.matchMedia("(max-width: 760px)").matches) {
                active_cam = 1;
            }

            if (cameras.length > 0) {
                scanner.start(cameras[active_cam]);
            } else {
                alert('No cameras found');
            }

        }).catch(function(e) {
            console.error(e);
        });

        // SCANNING
        scanner.addListener('scan', function(c) {

            if (c != "NULL") {

                beep.play();
                h1.innerHTML = c;
                output.style.display = "block";
                stopscanner();

            }

        });
    }

    //STOP CAMERA
    function stopscanner() {
        scanner.stop();
        kamera.style.display = "none";

        button.classList.add("start");
        button.classList.remove("stop");

        kamera.classList.add("hide");
        kamera.classList.remove("show");

        button.innerText = "START";
    }