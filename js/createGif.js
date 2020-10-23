// Variables
const h1 = document.querySelector('h1');
const h3 = document.querySelector('h3');
const video = document.querySelector('.video');
const clock = document.querySelector('.clock');
const btnStart = document.querySelector('.btn-start button');
const btnRecordFinish = document.querySelector('button');
//const btnFinish = document.querySelector('.btn-finish');
const stepOne = document.querySelector('.one');
const stepTwo = document.querySelector('.two');
const stepThree = document.querySelector('.three');
const prevOverlay = document.querySelector('.prev-overlay');
const downloadVideo = document.querySelector('.download-video');
const link = document.querySelector('.link');

let record = 0; //grabacion
let recorder; // grabador
let recording = false; //grabando

/* -------------------------
    OBTENGO VIDEO
--------------------------*/


function getStreamAndRecord() {

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {

            h1.innerHTML = "";
            h3.innerHTML = "";
            video.style.display = "block";
            btnStart.style.display = "block";
            //btnRecord.style.display = 'block';
            btnStart.textContent = "Grabar";
            btnStart.classList.add('btn-record');
            video.srcObject = stream;
            video.play();
            record = 1;

            btnStart.addEventListener('click', () => {

                if (record == 1) {

                    recording = !recording;
                    stepOne.style.backgroundColor = "#572EE5";
                    stepOne.style.color = "white";
                    stepTwo.style.backgroundColor = "#572EE5";
                    stepTwo.style.color = "white";
                    btnStart.innerHTML = "Finalizar";


                    if (recording === true) {
                        this.disabled = true;
                        recorder = RecordRTC(stream, {
                            type: 'gif',
                            frameRate: 1,
                            quality: 10,
                            width: 360,
                            hidden: 240,
                            onGifRecordingStarted: function () {
                                console.log('Comenzo a Grabar')
                            },
                        });

                        recorder.startRecording();
                        transcurrido()

                        recorder.camera = stream;

                    } else {
                        this.disabled = true;
                        recorder.stopRecording(detenerGrabacion);
                        recording = false;
                        record = 2;

                        console.log('Termino de Grabar')
                    }

                }

            });


        });
}

/* -------------------------
    DETENER GRABACION
--------------------------*/


function detenerGrabacion() {

    recorder.camera.stop();

    let form = new FormData();
    form.append("file", recorder.getBlob(), 'creado.gif');
    clock.innerHTML = "REPETIR CAPTURA";
    btnStart.innerHTML = "Subir";
    video.style.display = "none";
    prev.style.display = "block";


    btnStart.addEventListener('click', () => {
        if (record == 2) {
            subirGif(form)
            console.log('Subiendo Gif');

            prevOverlay.style.display = "block";
            prevOverlay.style.backgroundImage = "url('/img/loader.svg')";
            prevOverlay.style.backgroundRepeat = "no-repeat";
            prevOverlay.style.backgroundSize = "22px";
            prevOverlay.style.backgroundPosition = "50% 40%";

        }
    })

    objectURL = URL.createObjectURL(recorder.getBlob());
    prev.src = objectURL;
    prev.classList.remove('hide');

    recorder.destroy();
    recorder = null;

}

/* -------------------------
    INICIO PROCESO
--------------------------*/

btnStart.addEventListener('click', () => {

    if (record == 0) {

        btnStart.style.display = "none";
        stepOne.style.backgroundColor = "#572EE5";
        stepOne.style.color = "white";
        h1.innerHTML = "¿Nos das acceso a tu cámara?";
        h3.innerHTML = "El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.";
        getStreamAndRecord();


    }


});


/* -------------------------
    REPETIR PROCESO
--------------------------*/

clock.addEventListener('click', () => {

    location.reload();
    getStreamAndRecord()


})

/* -------------------------
    TIEMPO TRANSCURRIDO
--------------------------*/

function transcurrido() {
    let seconds = 0;
    let minutes = 0;
    let timer = setInterval(() => {
        if (recorder) {
            if (seconds < 60) {
                if (seconds <= 9) {
                    seconds = '0' + seconds;
                }
                clock.innerHTML = `00:00:0${minutes}:${seconds}`;
                seconds++;
            } else {
                minutes++;
                seconds = 0;
            }
        }
        else {
            clearInterval(timer)
        }
    }, 1000);
}

/* -------------------------
    SUBO GIF
--------------------------*/

function subirGif(gif) {

    stepTwo.style.backgroundColor = "#572EE5";
    stepTwo.style.color = "white";
    stepThree.style.backgroundColor = "#572EE5";
    stepThree.style.color = "white";
    btnStart.innerHTML = "Subiendo Gif";


    fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, {
        method: 'POST',
        body: gif,
    }).then(res => {
        console.log(res.status)
        if (res.status != 200) { }
        return res.json();

    }).then(data => {

        const gifId = data.data.id;

        console.log("id del gif: ", gifId);
        btnStart.innerHTML = "Subido !!";
        prevOverlay.style.backgroundImage = "url('/img/check.svg')";
        prevOverlay.innerHTML = "GIFO subido con éxito";
        clock.innerHTML = "CREAR NUEVO";
        guardarGif(gifId);
        console.log("Guardo el Gif en localStorage");
    })
        .catch(error => {
            console.error('Error al subir el Gif:', error)
        });
}

/* -------------------------
    GUARDO LOCALSTORAGE
--------------------------*/


async function guardarGif(id) {

    let url = 'https://api.giphy.com/v1/gifs/' + id + `?api_key=${apiKey}`;

    let gifCreado = await getGif(url);

    arrayMisGifs = [];


    if (localStorage.getItem("misGifos") !== null) {

        arrayMisGifs = JSON.parse(localStorage.getItem("misGifos"));

    }

    arrayGif = {
        'id': id,
        'title': gifCreado.data.title,
        'user': gifCreado.data.username,
        'url': gifCreado.data.images.original.url
    };

    arrayMisGifs.push(arrayGif);

    localStorage.setItem("misGifos", JSON.stringify(arrayMisGifs));

    /* -------------------------
    AGREGO BOTONES DESCARGA Y URL
    --------------------------*/

    const url_gif = gifCreado.data.images.original.url;

    link.style.opacity = 1;
    link.setAttribute("url_gif", url_gif);
    downloadVideo.setAttribute("url_gif", url_gif);
    downloadVideo.setAttribute("titulo_gif", "gif");
    downloadVideo.style.opacity = 1;
    downloadVideo.style.zIndex = 2;
    downloadVideo.style.zIndex = 2;
    downloadVideo.style.top = "25%";
    downloadVideo.style.zIndex = 2;
    downloadVideo.style.left = "60%";

    console.log("Proceso Terminado");

}


/* -------------------------
    ACCIONES EN BOTONES
--------------------------*/

downloadVideo.addEventListener("click", downloadGif);


link.addEventListener('click', (e) => {

    let url_gif = e.target.attributes.getNamedItem('url_gif').value;
    let aux = document.createElement("input");
    aux.value = url_gif;
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("Link del Gif Copiado al Portapapeles");

});