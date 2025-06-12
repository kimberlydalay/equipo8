document.addEventListener("DOMContentLoaded", function () {
    $.ajax({
        url: 'http://localhost:3000/api//equiposProyecto', // Cambia la URL según tu API real
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            const labels = response.labels;
            const data = response.values;
            const ctx = document.getElementById('graficaParticipantes').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Participantes',
                        data: data,
                        backgroundColor: ['#90CAF9', '#BBDEFB'],
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
            $('#respuesta').text('No se pudieron cargar los datos de participantes.');
        }
    });
});