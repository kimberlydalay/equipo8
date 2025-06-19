$(document).ready(function() {
  $.ajax({
    url: 'https://equipo8servicios.onrender.com/api/arbolesPorProyecto',
    method: 'GET',
    dataType: 'json',
    success: function(response) {
      const conteoPorTipo = {};
      response.forEach(planta => {
        if (conteoPorTipo[planta.tipoNombre]) {
          conteoPorTipo[planta.tipoNombre]++;
        } else {
          conteoPorTipo[planta.tipoNombre] = 1;
        }
      });

      const labels = Object.keys(conteoPorTipo);
      const data = Object.values(conteoPorTipo);

      let mensaje = '';
      labels.forEach((label, i) => {
        mensaje += `Hay <strong>${data[i]}</strong> plantas de tipo <strong>${label}</strong>.<br>`;
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
              text: 'Cantidad de Plantas por Tipo',
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