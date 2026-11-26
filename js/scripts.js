let stream = null;

function iniciarCamara(){
  const video = document.getElementById('video');
  video.style.display = 'block';
  navigator.mediaDevices.getUserMedia({video:true})
  .then(s=>{
    stream = s;
    video.srcObject = s;
  })
  .catch(()=>alert("No se pudo activar la cámara, usa 'Elegir archivo'"));
}

function tomarFoto(){
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const foto = document.getElementById('foto-preview');
  if(!stream){alert("Primero activa la cámara");return}
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video,0,0);
  foto.src = canvas.toDataURL('image/png');
  // apagar camara
  stream.getTracks().forEach(t=>t.stop());
  video.style.display='none';
}

function cargarArchivo(e){
  const foto = document.getElementById('foto-preview');
  const file = e.target.files[0];
  if(file){
    foto.src = URL.createObjectURL(file);
  }
}

// Formulario de reseñas
document.getElementById('form-reseña').addEventListener('submit', function(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const grado = document.getElementById('grado').value;
  const cali = document.getElementById('calificacion').value;
  const com = document.getElementById('comentario').value;
  const foto = document.getElementById('foto-preview').src;

  const muro = document.getElementById('muro');
  const div = document.createElement('div');
  div.className = 'reseña-ejemplo';
  div.innerHTML = `<b>${nombre} (${grado})</b> - ${'⭐'.repeat(cali)} - <i>"${com}"</i><br><img src="${foto}" style="width:100px;border-radius:8px;margin-top:5px">`;
  muro.prepend(div);
  
  alert("¡Reseña guardada! Ya está en el muro 💚");
  this.reset();
});