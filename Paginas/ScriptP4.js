$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8.onrender.com/api/actividadesEmpleado',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
            const todosCero = data.every(valor => valor === 0);

            if (todosCero) {
                $('#respuesta').text('No hay registros de cuidado para mostrar.');
                return;
            }

            const ctx = document.getElementById('graficaPastel').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Registros de cuidado',
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
                        title: { display: false }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de registros de cuidado.');
        }
    });
});