$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8.onrender.com/api/detallesProyecto', // Cambia la URL según tu API real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
            const ctx = document.getElementById('graficaCuidados').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Veces aplicado',
                        data: data,
                        backgroundColor: '#90CAF9',
                        borderColor: '#1565C0',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de cuidados más aplicados.');
        }
    });
});