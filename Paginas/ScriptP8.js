$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/promedioArbolesUbicacion',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántas plantas hay por ubicación (usando 'ubicacion', 'direccion' o similar)
            const conteoPorUbicacion = {};
            response.forEach(planta => {
                // Usa el campo de ubicación que tengas disponible
                const ubicacion = planta.ubicacion || planta.direccion || `Ubicación ${planta.idPlanta || planta.idRegistro}`;
                if (conteoPorUbicacion[ubicacion]) {
                    conteoPorUbicacion[ubicacion]++;
                } else {
                    conteoPorUbicacion[ubicacion] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoPorUbicacion);
            const data = Object.values(conteoPorUbicacion);

            // Calcular el promedio de plantas por ubicación
            const suma = data.reduce((acc, val) => acc + val, 0);
            const promedio = data.length > 0 ? (suma / data.length) : 0;

            // Graficar cantidad de plantas por ubicación
            const ctx = document.getElementById('graficaArboles').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad de plantas por ubicación',
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
                        title: { display: true, text: 'Cantidad de plantas por ubicación' }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });

            // Mostrar el promedio como mensaje
            $('#respuesta').html(`Promedio de plantas por ubicación: <b>${promedio.toFixed(2)}</b>`);
        },
        error: function() {
            $('#respuesta').text('No se pudo cargar la información de plantas por ubicación.');
        }
    });
});