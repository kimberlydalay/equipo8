document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/cuidadosPorUbicacion', // Cambia por tu endpoint real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántos cuidados hay por ubicación
            const conteoPorUbicacion = {};
            response.forEach(item => {
                const ubicacion = item.ubicacion || 'Sin ubicación';
                if (conteoPorUbicacion[ubicacion]) {
                    conteoPorUbicacion[ubicacion]++;
                } else {
                    conteoPorUbicacion[ubicacion] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoPorUbicacion);
            const data = Object.values(conteoPorUbicacion);

            const ctx = document.getElementById('graficaCuidadosUbicacion').getContext('2d');
            new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad de cuidados aplicados',
                        data: data,
                        backgroundColor: 'rgba(144, 202, 249, 0.5)',
                        borderColor: '#1565C0',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'bottom' },
                        title: { display: true, text: 'Cuidados aplicados por ubicación' }
                    },
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de cuidados por ubicación.');
        }
    });
});