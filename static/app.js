document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', clasificarInsecto);

    function clasificarInsecto(event) {
        event.preventDefault();
        const abdomen = document.getElementById('abdomen').value;
        const antena = document.getElementById('antena').value;

        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `abdomen=${abdomen}&antena=${antena}`,
        })
        .then(response => response.json())
        .then(data => {
            const resultado = document.getElementById('resultado');
            if (data.error) {
                resultado.innerText = 'Error: ' + data.error;
                resultado.className = 'text-red-600 font-semibold mt-4';
            } else {
                resultado.innerText = 'El insecto es un/a ' + data.categoria;
                resultado.className = 'text-green-600 font-semibold mt-4';
            }
        })
        .catch(error => {
            document.getElementById('resultado').innerText = 'Error en la solicitud.';
            console.error('Error:', error);
        });
    }
});
