document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'https://equipo8servicios.onrender.com/api/informesProyecto', // Cambia por tu endpoint real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            // Contar cuántas veces se aplicó cada tipo de cuidado
            const conteoCuidados = {};
            response.forEach(registro => {
                const nombre = registro.cuidadoNombre;
                if (conteoCuidados[nombre]) {
                    conteoCuidados[nombre]++;
                } else {
                    conteoCuidados[nombre] = 1;
                }
            });

            // Preparar datos para la gráfica
            const labels = Object.keys(conteoCuidados);
            const data = Object.values(conteoCuidados);

            const ctx = document.getElementById('graficaCategorias').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Veces aplicado',
                        data: data,
                        backgroundColor: [
                            '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1565C0',
                            '#81D4FA', '#0288D1', '#29B6F6', '#4FC3F7', '#1E88E5'
                        ],
                        borderColor: '#FFFFFF',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: { display: true, text: 'Cuidados más aplicados' }
                    }
                }
            });
        },
        error: function() {
            $('#respuesta').text('No se pudieron cargar los datos de cuidados por categoría.');
        }
    });
});