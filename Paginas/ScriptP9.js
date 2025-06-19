$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/plantasConMuchosCuidados', // Cambia por tu endpoint real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántos cuidados tiene cada planta (por nombre)
            const conteoPorPlanta = {};
            response.forEach(item => {
                const nombre = item.nombre || `Planta ${item.idPlanta}`;
                if (conteoPorPlanta[nombre]) {
                    conteoPorPlanta[nombre]++;
                } else {
                    conteoPorPlanta[nombre] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoPorPlanta);
            const data = Object.values(conteoPorPlanta);

            const ctx = document.getElementById('graficaCuidadosPlantas').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad de cuidados registrados',
                        data: data,
                        backgroundColor: '#90CAF9',
                        borderColor: '#1565C0',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'bottom' },
                        title: { display: true, text: 'Cuidados registrados por planta' }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de cuidados por planta.');
        }
    });
});