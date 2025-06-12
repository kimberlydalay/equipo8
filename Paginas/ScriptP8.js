$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:3000/api/promedioArbolesUbicacion',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const promedio = parseFloat(response.promedio);
            const ctx = document.getElementById('graficaArboles').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Promedio'],
                    datasets: [{
                        label: 'Promedio de árboles por ubicación',
                        data: [promedio],
                        backgroundColor: '#90CAF9',
                        borderColor: '#1565C0',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: true, text: 'Promedio de árboles por ubicación' }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
            $('#respuesta').html(`Promedio de árboles por ubicación: <b>${promedio}</b>`);
        },
        error: function() {
            $('#respuesta').text('No se pudo cargar el promedio de árboles por ubicación.');
        }
    });
});