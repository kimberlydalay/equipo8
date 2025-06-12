document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'https://equipo8.onrender.com/api/informesEmpleado',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
            const ctx = document.getElementById('grafica').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Número de cuidados',
                        data: data,
                        backgroundColor: [
                            'rgba(102, 178, 255, 0.6)',
                            'rgba(153, 204, 255, 0.6)',
                            'rgba(51, 153, 255, 0.6)',
                            'rgba(0, 102, 204, 0.6)',
                            'rgba(100, 181, 246, 0.6)'
                        ],
                        borderColor: '#1c4e80',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Cuidados según el tipo de planta',
                            font: {
                                size: 18
                            }
                        },
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de cuidados por empleado.');
        }
    });
});
