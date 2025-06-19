$(document).ready(function() {
  $.ajax({
    url: 'https://equipo8servicios.onrender.com/api/promedioArbolesUbicacion',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      // Contar cuántos registros hay por fecha
      const conteoPorFecha = {};
      response.forEach(registro => {
        if (conteoPorFecha[registro.fechaRegistro]) {
          conteoPorFecha[registro.fechaRegistro]++;
        } else {
          conteoPorFecha[registro.fechaRegistro] = 1;
        }
      });

      // Preparar datos para la gráfica
      const labels = Object.keys(conteoPorFecha);
      const data = Object.values(conteoPorFecha);

      // Mostrar mensaje
      let mensaje = '';
      labels.forEach((label, i) => {
        mensaje += `El <strong>${label}</strong> se registró <strong>${data[i]}</strong> vez/veces.<br>`;
      });
      $("#respuestaModa").html(mensaje);

      // Renderizar gráfica
      const ctx = document.getElementById('graficoArboles').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de Registros',
            data: data,
            backgroundColor: [
              'rgba(102, 178, 255, 0.6)',
              'rgba(153, 204, 255, 0.6)',
              'rgba(51, 153, 255, 0.6)',
              'rgba(0, 102, 204, 0.6)',
              'rgba(76, 175, 80, 0.6)',
              'rgba(255, 193, 7, 0.6)',
              'rgba(244, 67, 54, 0.6)',
              'rgba(156, 39, 176, 0.6)',
              'rgba(255, 87, 34, 0.6)',
              'rgba(33, 150, 243, 0.6)'
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
              text: 'Cantidad de Registros por Fecha',
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
