$(document).ready(function() {
  $.ajax({
    url: 'https://equipo8servicios.onrender.com/api/arbolesPorProyecto',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      const labels = response.labels;
      const data = response.values;
      let mensaje = '';
      labels.forEach((label, i) => {
        mensaje += `Hay <strong>${data[i]}</strong> árboles de tipo <strong>${label}</strong>.<br>`;
      });
      $("#respuestaModa").html(mensaje);
      const ctx = document.getElementById('graficoArboles').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad',
            data: data,
            backgroundColor: [
              'rgba(102, 178, 255, 0.6)',
              'rgba(153, 204, 255, 0.6)',
              'rgba(51, 153, 255, 0.6)',
              'rgba(0, 102, 204, 0.6)'
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
              text: 'Cantidad de Árboles por Tipo',
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