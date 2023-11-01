document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById('form');
  const tbody = document.getElementById('t-body');
  let editMode = false;

  // Mostrar datos en la tabla
  displayData();
  
  // Evento para crear un nuevo registro o actualizar un registro existente
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const title = document.getElementById('title').value;
    const sipnosis = document.getElementById('sypnosis').value;
    const poster = document.getElementById('poster').value;
    const genre = document.getElementById('genre').value;
    const director = document.getElementById('director').value;
    const cast = document.getElementById('cast').value;

    if (title !== "" && sipnosis !== "" && poster !== "" && genre !== "" && director !== "" && cast !== ""){
      
      if (editMode == true) {

        // Actualizar registro
        updateData(title, sipnosis, poster, genre, director, cast);
        
      } else {

        // Nuevo registro
        newData(title, sipnosis, poster, genre, director, cast);

      }

    } else {
      alert('Todos los campos son requeridos')
    }
  });

  // Evento para editar registro o eliminar registro
  tbody.addEventListener('click', function (e) {
    // Boton de editar
    if (e.target && e.target.classList.contains('edit')) {
      const idRow = e.target.getAttribute('data-rowid');
      
      // Editar el registro
      editData(idRow);

      // Boton d eliminar
    } else if (e.target && e.target.classList.contains('delete')) {
      const idRow = e.target.getAttribute('data-rowid');

      // Eliminar el registro
      deleteData(idRow);
      
    };
  });


  // Funcion para mostrar los datos en la tabla
  function displayData() {

    tbody.innerHTML = '';

    const storedData = JSON.parse(localStorage.getItem('data'));
    let idRowCount = 1;
    
    // Mostrar datos en la tabla
    if (storedData) {
      storedData.forEach((data) => {
        const newRow = document.createElement('tr');
          const idRow = `row-${idRowCount}`; // Identificador unico
          newRow.setAttribute('id', idRow);
          newRow.innerHTML = `
            <td>${data.title}</td>
            <td>${data.sipnosis}</td>
            <td>${data.poster}</td>
            <td>${data.genre}</td>
            <td>${data.director}</td>
            <td>${data.cast}</td>
            <td>
            <button class='btn-accion edit' data-rowid="${idRow}"><ion-icon name="create-outline"></ion-icon></button>
            <button class='btn-accion delete' data-rowid="${idRow}"><ion-icon name="trash-outline"></ion-icon></button>
            </td>
          `
          // Agregar registros a la tabla
          tbody.appendChild(newRow);
          idRowCount++;
      });
    }
  }

  // Funcion para agregar un registro nuevo
  function newData(title, sipnosis, poster, genre, director, cast) {
    // Obtener los registros del local storage
    let newdata = JSON.parse(localStorage.getItem('data')) || [];

    // Agregar nuevo registro al local storage
    newdata.push({
      title,
      sipnosis,
      poster,
      genre,
      director,
      cast
    });

    localStorage.setItem('data', JSON.stringify(newdata));

    // Limpiar campos del formulario
    form.reset();

    displayData();
  }

  // Funcion para editar un registro de la tabla
  function editData(idRow) {
    const editRow = document.getElementById(idRow);

    if (editRow) {

      // Agregar clase editing a las filas
      editRow.classList.add('editing');

      // Obtener datos de la tabla
      const cells = editRow.querySelectorAll('td');
      const title = cells[0].textContent;
      const sipnosis = cells[1].textContent;
      const poster = cells[2].textContent;
      const genre = cells[3].textContent;
      const director = cells[4].textContent;
      const cast = cells[5].textContent;

      // llenar formulario con los datos de la tabla
      document.getElementById('title').value = title;
      document.getElementById('sypnosis').value = sipnosis;
      document.getElementById('poster').value = poster;
      document.getElementById('genre').value = genre;
      document.getElementById('director').value = director;
      document.getElementById('cast').value = cast;

      // Cambiar al modo editar
      editMode = true;
      console.log(`Modo editar: ${editMode}`);

      // Cambiar texto del boton del formulario
      const formButton = document.getElementById('submit-btn');
      formButton.textContent = 'Actualizar';

    }
    console.log(`Editar fila con ID: ${idRow}`);
  }

  // Funcion para actualizar un registro
  function updateData(title, sipnosis, poster, genre, director, cast) {
    const editRow = document.querySelector('tr.editing');
    const idRow = editRow.getAttribute('id');

    // Actualizar los valores en el local storage
    const storedData = JSON.parse(localStorage.getItem('data'));
    // Obtenemos el numero entero del identificador unico de la fila
    const rowIndex = parseInt(idRow.split('-')[1]) - 1;
    console.log(rowIndex);

    storedData[rowIndex] = {
      title,
      sipnosis,
      poster,
      genre,
      director,
      cast
    }
    
    localStorage.setItem('data', JSON.stringify(storedData));
    console.log(storedData);

    // Limpiar formulario
    form.reset();

    // Cambiar el texto del boton
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = 'Enviar';

    // Eliminar la clase editing de las filas
    editRow.classList.remove('editing');

    editMode = false;
    console.log(`Modo editar: ${editMode}`);

    displayData();
  }

  // Funcion para eliminar un registro
  function deleteData(idRow) {
    const deleteRow = document.getElementById(idRow);
    const storedData = JSON.parse(localStorage.getItem('data'));

    if (deleteRow) {

      // Eliminar registro de el local storage
      if (storedData) {
        const updatedData = storedData.filter((data, index) => `row-${index+1}` !== idRow);
        localStorage.setItem('data', JSON.stringify(updatedData));

      }
    }
    console.log(`Eliminar fila con ID: ${idRow}`);

    displayData();
  }
});






