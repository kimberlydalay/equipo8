document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/informesEmpleado', 
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántos cuidados hay por tipo de planta
            const conteoPorTipo = {};
            response.forEach(cuidado => {
                if (conteoPorTipo[cuidado.tipoNombre]) {
                    conteoPorTipo[cuidado.tipoNombre]++;
                } else {
                    conteoPorTipo[cuidado.tipoNombre] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoPorTipo);
            const data = Object.values(conteoPorTipo);

            // Calcular la moda
            let moda = '';
            let max = 0;
            labels.forEach((label, i) => {
                if (data[i] > max) {
                    max = data[i];
                    moda = label;
                }
            });

            // Mostrar mensaje
            let mensaje = '';
            labels.forEach((label, i) => {
                mensaje += `Hay <strong>${data[i]}</strong> cuidados para el tipo de planta <strong>${label}</strong>.<br>`;
            });
            mensaje += `<br><strong>La moda es: ${moda}</strong> (tipo de planta con más cuidados).`;
            $("#respuestaModa").html(mensaje);

            // Renderizar gráfica
            const ctx = document.getElementById('graficoArboles').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad de Cuidados',
                        data: data,
                        backgroundColor: [
                            'rgba(102, 178, 255, 0.6)',
                            'rgba(153, 204, 255, 0.6)',
                            'rgba(51, 153, 255, 0.6)',
                            'rgba(0, 102, 204, 0.6)',
                            'rgba(76, 175, 80, 0.6)',
                            'rgba(255, 193, 7, 0.6)',
                            'rgba(244, 67, 54, 0.6)',
                            'rgba(156, 39, 176, 0.6)',
                            'rgba(255, 87, 34, 0.6)',
                            'rgba(33, 150, 243, 0.6)'
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
                            text: 'Cantidad de Cuidados por Tipo de Planta',
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
            $("#respuestaModa").text("Error al cargar los datos.");
        }
    });
});
