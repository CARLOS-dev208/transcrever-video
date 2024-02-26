import {loadingMessage, starLoading, stopLoading} from "./loading.js";
import {getVideoId, loadVideo} from "./youtube-api.js";
import axios from "axios";

// const form = document.querySelector('#form');
//
// form.addEventListener('submit', async (ev) => {
//     ev.preventDefault();
//     try {
//         starLoading();
//         const formData = new FormData(form);
//         const url = formData.get('url');
//         await loadVideo(url);
//         loadingMessage('Conectando com o backend')
//         await axios.get(`http://localhost:3333/audio?v=${getVideoId(url)}`)
//     } catch (error) {
//         console.log("[SUBMIT_ERROR]", error)
//     } finally {
//         stopLoading()
//     }
// })

const uploadForm = document.querySelector('#uploadForm');

uploadForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let fileInput = document.getElementById('videoFile');
    let file = fileInput.files[0];
    if (file) {
        let formData = new FormData();
        formData.append('video', file);
        starLoading();
        loadingMessage('Convertendo vídeo e transcrevendo.')
        axios.post('http://localhost:3333/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                document.getElementById('status').innerText = 'Vídeo enviado com sucesso!';
                stopLoading()
            })
            .catch(error => {
                console.error('Erro:', error);
                document.getElementById('status').innerText = 'Erro ao enviar o vídeo. Tente novamente.';
                stopLoading()
            });
    } else {
        document.getElementById('status').innerText = 'Por favor, selecione um vídeo para enviar.';
    }
})
