$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8.onrender.com/api/plantasConMuchosCuidados', // Cambia la URL según tu API real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
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
                        title: { display: false }
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