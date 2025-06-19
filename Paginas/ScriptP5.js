$(document).ready(function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/detallesProyecto',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántas veces se aplicó cada cuidado (por descripción)
            const conteoCuidados = {};
            response.forEach(registro => {
                const desc = registro.descripcion;
                if (conteoCuidados[desc]) {
                    conteoCuidados[desc]++;
                } else {
                    conteoCuidados[desc] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoCuidados);
            const data = Object.values(conteoCuidados);

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
                        title: { display: true, text: 'Cuidados más aplicados' }
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