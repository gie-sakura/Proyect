var VarColgar = document.getElementById('BColgar');
var Clave ="";
var Clave2="";
var flag=0;
var baseurl = "http://localhost:8001/";

$('#clave').hide();
            // grab the room from the URL
			if(Clave!=""){
            var room = location.search && location.search.split('?')[1];
			alert("Lugar contraseña");
			}
			
            // create our webrtc connection
            var webrtc = new SimpleWebRTC({
                // the id/element dom element that will hold "our" video
                localVideoEl: 'localVideo',
                // the id/element dom element that will hold remote videos
                remoteVideosEl: '',
                // immediately ask for camera access
                autoRequestMedia: true,
                debug: false,
                detectSpeakingEvents: true,
                autoAdjustMic: false
            });
		//	VarLlamar.disabled=true;
		
            // when it's ready, join if we got a room from the URL
            webrtc.on('readyToCall', function () {
                // you can name it anything
				if(Clave!=""){					
					if (room) webrtc.joinRoom(room);
					else{
						Clave2= prompt("Introduzca la contraseña");
						if(Clave==Clave2){
							if (room) webrtc.joinRoom(room);
						}else{
							alert("Contraseña Incorrecta");
							location.reload();
						}
					
					}
					
				
					
				
				}
                
				
			});

            function showVolume(el, volume) {
                if (!el) return;
                if (volume < -45) { // vary between -45 and -20
                    el.style.height = '0px';
                } else if (volume > -20) {
                    el.style.height = '100%';
                } else {
                    el.style.height = '' + Math.floor((volume + 100) * 100 / 25 - 220) + '%';
                }
            }
            webrtc.on('channelMessage', function (peer, label, data) {
                if (data.type == 'volume') {
                    showVolume(document.getElementById('volume_' + peer.id), data.volume);
                }
            });
            webrtc.on('videoAdded', function (video, peer) {
                console.log('video added', peer);
                var remotes = document.getElementById('remotes');
                if (remotes) {
                    var d = document.createElement('div');
                    d.className = 'videoContainer';
                    d.id = 'container_' + webrtc.getDomId(peer);
                    d.appendChild(video);
                    var vol = document.createElement('div');
                    vol.id = 'volume_' + peer.id;
                    vol.className = 'volume_bar';
                    video.onclick = function () {
                        video.style.width = video.videoWidth + 'px';
                        video.style.height = video.videoHeight + 'px';
                    };
                    d.appendChild(vol);
                    remotes.appendChild(d);
                }
            });
            webrtc.on('videoRemoved', function (video, peer) {
                console.log('video removed ', peer);
                var remotes = document.getElementById('remotes');
                var el = document.getElementById('container_' + webrtc.getDomId(peer));
                if (remotes && el) {
                    remotes.removeChild(el);
                }
            });
            webrtc.on('volumeChange', function (volume, treshold) {
                //console.log('own volume', volume);
                showVolume(document.getElementById('localVolume'), volume);
            });

            // Since we use this twice we put it here
            function setRoom(name) {
                $('#createRoom').remove();
                $('h1').text(name);
                $('#subTitle').text('Link to join: ' + location.href);
                $('body').addClass('active');
                $('#clave').show();

            var NameSala =name;
            var Enlace = location.href;
            
            }

           if (room) {
                setRoom(room);
            } else {
                $('#createRoom').submit(function () {
                    var val = $('#sessionInput').val().toLowerCase().replace(/\s/g, '-').replace(/[^A-Za-z0-9_\-]/g, '');
                    console.log(val);
                   $.ajax({
            method: "POST",//metodo|verbo con el que procesamos la peticion
            url: baseurl + "register",//url a la que hacemos la petición
            data: $(this).serialize(),//datos del formulario
            success: function(data){    
                //si se crea el registro   
                if(data === "creado")
                {
                    console.log("envio de POST");

                }
                //si ya existe
                else
                {

                }
            },
            error: function(jqXHR, exception){
                console.log(error);
            }
        });


                    webrtc.createRoom(val, function (err, name) {
                        console.log(' create room cb', arguments);
                        $('#clave').show();
                        var newUrl = location.pathname + '?' + name;
                        if (!err) {
                            history.replaceState({foo: 'bar'}, null, newUrl);
                            setRoom(name);
                        } else {
                            console.log(err);
                        }   
                    });
                    return false;



                });
            }

            var button = $('#screenShareButton'),
                setButton = function (bool) {
                    button.text(bool ? 'share screen' : 'stop sharing');
                };
            webrtc.on('localScreenStopped', function () {
                setButton(true);
            });

            setButton(true);

            button.click(function () {
                if (webrtc.getLocalScreen()) {
                    webrtc.stopScreenShare();
                    setButton(true);
                } else {
                    webrtc.shareScreen(function (err) {
                        if (err) {
                            setButton(true);
                        } else {
                            setButton(false);
                        }
                    });
                    
                }
            });


// Generar Contraseña

function PonerClave(){
	Clave = prompt("Introduzca la contraseña");
	}

function showModal(title,message)
{
    $("h2.title-modal").text(title);
    $("p.messageModal").text(message);
    $("#myModal").modal('show');
}
			
// Tabla Sesiones
