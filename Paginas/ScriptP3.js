$(document).ready(function() {
  $.ajax({
    url: 'https://equipo8servicios.onrender.com/api/promedioArbolesUbicacion',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      if (!Array.isArray(data)) {
        $('#respuesta').text('La respuesta de la API no es válida.');
        return;
      }

      // Contar cuántos árboles hay por ubicación (usando idPlanta como ubicación)
      const conteoPorUbicacion = {};
      data.forEach(registro => {
        const ubicacion = registro.idPlanta; // Cambia esto si tienes un campo de ubicación real
        if (conteoPorUbicacion[ubicacion]) {
          conteoPorUbicacion[ubicacion]++;
        } else {
          conteoPorUbicacion[ubicacion] = 1;
        }
      });

      // Preparar datos para la gráfica
      const labels = Object.keys(conteoPorUbicacion);
      const values = Object.values(conteoPorUbicacion);

      // Mostrar mensaje
      let mensaje = '';
      labels.forEach((label, i) => {
        mensaje += `Ubicación <strong>${label}</strong>: <strong>${values[i]}</strong> árbol(es)<br>`;
      });
      $('#respuesta').html(mensaje);

      // Renderizar gráfica
      const ctx = document.getElementById('graficoPlantas').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cantidad de árboles por ubicación',
            data: values,
            backgroundColor: 'rgba(51, 153, 255, 0.6)',
            borderColor: 'rgba(28, 78, 128, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Cantidad de árboles por ubicación' }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    },
    error: function() {
      $('#respuesta').text('No se pudieron cargar los datos de registros.');
    }
  });
});
