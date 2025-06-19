$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/actividadesEmpleado',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Obtener nombres de ubicaciones y cantidad de árboles
            const labels = response.map(item => item.nombre);
            const data = response.map(item => Number(item.cantidadArboles));
            const todosCero = data.every(valor => valor === 0);

            if (todosCero) {
                $('#respuesta').text('No hay registros de árboles para mostrar.');
                return;
            }

            const ctx = document.getElementById('graficaPastel').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Cantidad de árboles',
                        data: data,
                        backgroundColor: [
                            '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5',
                            '#1565C0', '#81D4FA', '#0288D1', '#29B6F6', '#4FC3F7'
                        ],
                        borderColor: '#FFFFFF',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'bottom' },
                        title: { display: true, text: 'Cantidad de árboles por ubicación' }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de árboles por ubicación.');
        }
    });
});