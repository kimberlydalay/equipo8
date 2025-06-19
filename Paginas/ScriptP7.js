document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/equiposProyecto', // Cambia por tu endpoint real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántas plantas hay por categoría
            const conteoCategorias = {};
            response.forEach(planta => {
                const categoria = planta.categoriaNombre;
                if (conteoCategorias[categoria]) {
                    conteoCategorias[categoria]++;
                } else {
                    conteoCategorias[categoria] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoCategorias);
            const data = Object.values(conteoCategorias);

            const ctx = document.getElementById('graficaParticipantes').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Plantas por categoría',
                        data: data,
                        backgroundColor: [
                            '#90CAF9', '#BBDEFB', '#64B5F6', '#42A5F5', '#2196F3',
                            '#1E88E5', '#1565C0', '#81D4FA', '#0288D1', '#29B6F6'
                        ],
                        borderColor: '#FFFFFF',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true, position: 'bottom' },
                        title: { display: true, text: 'Cantidad de plantas por categoría' }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de plantas por categoría.');
        }
    });
});