document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'http://localhost:3000/api/informesProyecto', // Cambia la URL según tu API real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
            const ctx = document.getElementById('graficaCategorias').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Número de plantas',
                        data: data,
                        backgroundColor: ['#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1565C0'],
                        borderColor: '#FFFFFF',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de plantas por categoría.');
        }
    });
});