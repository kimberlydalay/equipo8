$(document).ready(function() {
  // Llamada AJAX al endpoint real de la API
  $.ajax({
    url: 'http://localhost:3000/api/promedioArbolesUbicacion', // URL real de la gráfica
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log(data); // { promedio: "130.5000" }
      if (!data.promedio) {
        $('#respuesta').text('La respuesta de la API no es válida.');
        return;
      }
      // Mostrar el promedio en el HTML
      $('#respuesta').html(`Promedio de plantas por ubicación: <b>${data.promedio}</b>`);

      // Graficar el promedio como una sola barra
      const ctx = document.getElementById('graficoPlantas').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Promedio'],
          datasets: [{
            label: 'Promedio de plantas por ubicación',
            data: [parseFloat(data.promedio)],
            backgroundColor: 'rgba(51, 153, 255, 0.6)',
            borderColor: 'rgba(28, 78, 128, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Promedio de plantas por ubicación' }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    },
    error: function() {
      $('#respuesta').text('No se pudieron cargar los datos de plantas por ubicación.');
    }
  });
});
