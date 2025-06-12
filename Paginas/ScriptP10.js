document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'https://equipo8.onrender.com/api/cuidadosPorUbicacion',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
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
                        title: { display: false }
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