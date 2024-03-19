'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// // Creating Workout Class
// class Workout {
//   // public interface
//   date = new Date();
//   // creating a unique id of the workouts, using time
//   id = (Date.now() + '').slice(-10); // automatically added to the Running and Cyclying class

//   constructor(coords, distance, duration) {
//     this.coords = coords; // [latitude, longitude]
//     this.distance = distance; // in km
//     this.duration = duration; // in min
//   }

//   // creating setDescription method that will create description for the workout
//   setDescription() {
//     // prettier-ignore
//     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
//       months[this.date.getMonth()]
//     } ${this.date.getDate()}`;
//   }
// }

// // Creating Child classes of Workout
// class Running extends Workout {
//   // Public field
//   type = 'running';

//   constructor(coords, distance, duration, cadence) {
//     //calling the properties of parent class
//     super(coords, distance, duration);
//     // creating its own property
//     this.cadence = cadence; // in steps/min

//     // constructor automatically invoked these methods
//     this.calcPace();
//     // inherating method from the parent class
//     this.setDescription();
//   }

//   calcPace() {
//     this.pace = this.distance / this.duration;
//     return this.pace;
//   }
// }

// class Cycling extends Workout {
//   // Public field
//   type = 'cycling';

//   constructor(coords, distance, duration, elevation) {
//     // calling the properties of parent class
//     super(coords, distance, duration);
//     // creating its own property
//     this.elevation = elevation;

//     // constructor automatically invoked these methods
//     this.calcSpeed();
//     // inherating method from the parent class
//     this.setDescription();
//   }

//   calcSpeed() {
//     this.speed = this.distance / (this.duration / 60);
//     return this.speed;
//   }
// }

// // Creating class App where all our website functionality works
// class App {
//   // public fields
//   map;
//   mapEvent; // stores the event of the map
//   workouts = []; // empty workouts array that stores the workout

//   constructor() {
//     // passing the getPosition fn helps us to automatically invoke the fn
//     this.getPosition();
//     this.getLocalStorage();

//     // eventListeners
//     form.addEventListener('submit', this.newWorkout.bind(this));
//     inputType.addEventListener('change', this.toogleInputType.bind(this));
//     containerWorkouts.addEventListener('click', this.moveToPopup.bind(this));
//   }

//   // function that locates the our position from the browser
//   getPosition() {
//     // checks if the location is allowed or not
//     if (navigator.geolocation) {
//       // tries to get the current position of our browser if allowed
//       navigator.geolocation.getCurrentPosition(
//         // callback function that takes position as a parameter to locate us
//         this.loadMap.bind(this)
//         /*binding this keyword to this function because it is callBack function as it doesn't access this keyword and the value will always be undefined*/
//       );
//     }
//   }
//   // function that takes position as a parameter and loads the leaflet map
//   loadMap(position) {
//     // destructuring latitude and longitude from the Geolocation Position object
//     const { latitude, longitude } = position.coords;
//     // storing the latitude and longitude inside a coordinates array so it will be easier to use
//     const coords = [latitude, longitude];

//     // displaying map from the leaflet library
//     this.map = L.map('map').setView(coords, /*zoom*/ 13);
//     // defining how our map should look like
//     L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       attribution: `&copy;<a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`,
//     }).addTo(this.map);

//     L.marker(coords).addTo(this.map).bindPopup('Home').openPopup();
//     // adding click event on map, so that we can add a new workout
//     // here we use 'on' instead of 'addEventListener', as leaflet map have its own eventlistner method ie. 'on'
//     this.map.on('click', this.showForm.bind(this));
//     /*binding this callback function so that we can assign mapEvent = events of map*/

//     // rendering workout marker and list
//     this.workouts.forEach(work => {
//       this.renderWorkout(work);
//       this.renderWorkoutMarker(work);
//     });
//   }
//   showForm(mapE) {
//     // creating mapEvent variable
//     this.mapEvent = mapE;
//     // removing hidden class inside the form element, to show the form
//     form.classList.remove('hidden');
//     //focus method focus to an element (if it can be focused), here it focus on the inputDistance element
//     inputDistance.focus();
//   }

//   // method to hide the form
//   hideForm() {
//     // clear input fields
//     inputDistance.value =
//       inputCadence.value =
//       inputDuration.value =
//       inputElevation.value =
//         '';
//     form.style.display = 'none';
//     //adding class hidden to the form element
//     form.classList.add('hidden');
//     // set the display of the form back to grid after 1s
//     setTimeout(() => (form.style.display = 'grid'), 1000);
//   }

//   // Creating workout a marker
//   renderWorkoutMarker(workout) {
//     console.log(workout);
//     // creates the marker with the given coordinates ie [lat,lng]
//     L.marker(workout.coords)
//       .addTo(this.map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 150,
//           minWidth: 50,
//           autoClose: false,
//           closeOnClick: false,
//           className: `${workout.type}-popup`,
//         })
//       )
//       .setPopupContent(
//         `${workout.type === 'running' ? '🏃' : '🚴‍♂️'} ${workout.description}`
//       )
//       .openPopup();
//   }

//   // toggling input fields
//   toogleInputType() {
//     inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   }

//   //Creating new workout object
//   newWorkout(e) {
//     e.preventDefault();
//     //helper functions
//     const validInputs = (...inputs) =>
//       inputs.every(input => Number.isFinite(input));
//     const allPositive = (...inputs) => inputs.every(inp => inp > 0);
//     // get data from the form
//     const type = inputType.value;
//     const distance = +inputDistance.value;
//     const duration = +inputDuration.value;
//     // get lat and lng form the map, destructuring mapEvent
//     const { lat, lng } = this.mapEvent.latlng;
//     const coords = [lat, lng];
//     // initilizing workout with let, so we can access it outside block statement
//     let workout;

//     // checking the type running
//     if (type === 'running') {
//       const cadence = +inputCadence.value;
//       /* '+' operator in front of string will convert it into number*/
//       // checking if data is valid
//       console.log(coords, type, distance, duration, cadence);

//       // returning error ahead, this method is called gaurd clause
//       if (
//         /* Instead of manually typing the condition like this, we can use helper function
//         !Number.isFinite(distance) ||
//         !Number.isFinite(duration) ||
//         !Number.isFinite(cadence)
//         */
//         !validInputs(distance, duration, cadence) ||
//         !allPositive(distance, duration, cadence)
//       )
//         return alert('Inputs must have a positive number');
//       // creating new workout according its type
//       workout = new Running(coords, distance, cadence, duration);
//       console.log(workout);
//     }
//     // checking the type running
//     if (type === 'cycling') {
//       const elevation = +inputElevation.value;
//       // check if data is valid
//       if (
//         !validInputs(distance, duration, elevation) ||
//         !allPositive(distance, duration)
//       )
//         return alert(`Inputs must have a positive number`);
//       //creting new workout
//       workout = new Cycling(coords, distance, duration, elevation);
//       console.log(workout);
//     }

//     //rendering workout marker
//     this.renderWorkoutMarker(workout);

//     // rendering workout in the list
//     this.renderWorkout(workout);

//     // hiding the form
//     this.hideForm();

//     // adding workout to the workout object
//     this.workouts.push(workout);
//     console.log(this.workouts);

//     // storing the workouts inside a local storage
//     // localStorage.setItem('workouts', JSON.stringify(this.workouts));
//   }

//   // Creating a workout list
//   renderWorkout(workout) {
//     let html = `
//     <li class="workout workout--${workout.type}" data-id="${workout.id}">
//     <span class="workout__title">
//     <h2 class="workout__title">${workout.description}</h2>
//     <div class="edit--workout">📝</div>
//     <div class="delete--workout">🗑️</div>
//     </span>
//     <div class="workout__details">
//       <span class="workout__icon">${workout.type === 'running' ? '🏃' : '🚴‍♂️'}
//       </span>
//       <span class="workout__value">${workout.distance}</span>
//       <span class="workout__unit">km</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">⌚</span>
//       <span class="workout__value">${workout.duration}</span>
//       <span class="workout__unit">min</span>
//     </div>
//     `;

//     if (workout.type === 'running') {
//       html += `
//       <div class="workout__details">
//         <span class="workout__icon">⚡️</span>
//         <span class="workout__value">${workout.pace.toFixed(1)}</span>
//         <span class="workout__unit">min/km</span>
//       </div>
//       <div class="workout__details">
//         <span class="workout__icon">🦶🏼</span>
//         <span class="workout__value">${workout.cadence}</span>
//         <span class="workout__unit">spm</span>
//       </div></li>`;
//       form.insertAdjacentHTML('afterend', html);
//     }
//     if (workout.type === 'cycling') {
//       html += `
//     <div class="workout__details">
//       <span class="workout__icon">⚡️</span>
//       <span class="workout__value">${workout.speed.toFixed(1)}</span>
//       <span class="workout__unit">km/h</span>
//     </div>
//     <div class="workout__details">
//       <span class="workout__icon">⛰</span>
//       <span class="workout__value">${workout.elevation}</span>
//       <span class="workout__unit">m</span>
//     </div>
//     </li>`;
//       form.insertAdjacentHTML('afterend', html);
//     }
//   }

//   // Creating a method to move our marker/popup when clicked on the workout list
//   moveToPopup(e) {
//     // we have to get workout element we want to move to
//     const workoutEl = e.target.closest('.workout');
//     // gaurd clause, or returning error first
//     if (!workoutEl) return;

//     // finding the workout by its id
//     // prettier-ignore
//     const workout = this.workouts.find(work=> work.id === workoutEl.dataset.id)
//     //prettier-ignore
//     this.map.setView(workout.coords, 13, /*options*/{
//       animate: true,
//       pan:{
//         duration: 2, // in sec
//       }
//     })
//   }

//   // method to get the local storage data and display it in the website
//   getLocalStorage() {
//     // creating a variable to get workout data, to get data form the local storage we have to first parse the JSON as the data are stored in string
//     const data = JSON.parse(localStorage.getItem('workouts'));
//     /*JSON.parse(): Converts a JavaScript Object Notation (JSON) string into an object.*/
//     // checking data availability
//     if (!data) return;

//     // assining workouts array to the data we get from the local storage
//     this.workouts = data;

//     // // rendering each workout list and its marker
//     // this.workouts.forEach(work => {
//     //   this.renderWorkout(work);
//     //   this.renderWorkoutMarker(work); // Output: Cannot read properties of undefined (reading 'addLayer')
//     //   /** as renderWorkoutMarker is only executed from the getting the position of the map or is bound to the loadMap() fn.
//     //    * So, it is not possible to execute this fn inside getLocalStorage.
//     //    * Solution: its solution is simply call each workout list inside the loadMap method above ^*/
//     // });
//   }
// }

// // making an app object which make our website alive
// const app = new App(); // this is important like calling the function after it made to execute the function
// // it also acts like that but differently

// TODO: Working without class
let workout, map, mapEvent;
let workouts = [];
let markers = [];

if (navigator.geolocation)
  // getting geolocation of our device using browser
  navigator.geolocation.getCurrentPosition(
    // callback function
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;

      //Array of coords
      const coords = [latitude, longitude];

      // displaying map using leaflet library
      map = L.map('map', {
        center: coords,
        zoom: 13,
        // trackResize: true,
        keyboardPanDelta: 80,
        tapHold: true,
      }).flyTo(coords);
      // console.log(map);
      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords).addTo(map).bindPopup('Home').openPopup();

      getLocalStorage(map);
      // Map event orr click
      function onMapClick(mapE) {
        mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
      }

      // on map click it shows form and give us access to modify form content and marker
      map.on('click', onMapClick);
      workouts.forEach(work => {
        createWorkouts(work);
        createWorkoutMarker(work);
      });
      if (!workouts) {
        deleteAllEl.style.display = 'none';
      }
    }
  );

// event listener to change inputType value
inputType.addEventListener('change', function () {
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
});

//////////////////////
//  Workouts list
function createWorkouts(work) {
  let html = `
  <li class="workout workout--${work.type}" data-id="${work.id}">
  <div class="workout__title">
    <h2 class="workout__title">${work.description}</h2>
    <span class="edit--workout">📝</span>
    <span class="delete--workout">🗑️</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">${work.type === 'running' ? '🏃' : '🚴‍♂️'}
    </span>
    <span class="workout__value">${work.distance}</span>
    <span class="workout__unit">km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⌚</span>
    <span class="workout__value">${work.duration}</span>
    <span class="workout__unit">min</span>
  </div>
  `;
  if (work.type === 'running') {
    html += ` 
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">10</span>
        <span class="workout__unit">min/km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">🦶🏼</span>
        <span class="workout__value">${work.cadence}</span>
        <span class="workout__unit">spm</span>
      </div></li>`;
    form.insertAdjacentHTML('afterend', html);
  }
  if (work.type === 'cycling') {
    html += `      
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">20</span>
    <span class="workout__unit">km/h</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">${work.elevation}</span>
    <span class="workout__unit">m</span>
  </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }
}

// Form contents
function formContent(e) {
  // Validate Inputs
  // console.log(e);
  const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp));
  const allPositive = (...inputs) => inputs.every(inp => inp > 0);

  e.preventDefault();

  // getData from form
  const type = inputType.value;
  const distance = +inputDistance.value;
  const duration = +inputDuration.value;
  // console.log(type, distance, duration);

  const date = new Date();
  const id = (Date.now() + '').slice(-10);

  const { lat, lng } = mapEvent.latlng;
  const coords = [lat, lng];

  if (type === 'running') {
    const cadence = +inputCadence.value;
    if (
      !validInputs(distance, duration, cadence) ||
      !allPositive(distance, duration, cadence)
    ) {
      return alert('Inputs have to be positive numbers');
    }
    // prettier-ignore
    workout = new Object({ coords, type, distance, duration, cadence,id });
  }

  if (type === 'cycling') {
    const elevation = +inputElevation.value;
    if (!validInputs(distance, duration) || !allPositive(distance, duration)) {
      return alert('Inputs have to be positive numbers');
    }
    // prettier-ignore
    workout = new Object({ coords, type, distance, duration, elevation,id });
  }
  // Clear input fields
  inputCadence.value =
    inputDistance.value =
    inputDuration.value =
    inputElevation.value =
      '';
  form.classList.add('hidden');

  // prettier-ignore
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let description = `${workout.type[0].toUpperCase()}${workout.type.slice(
    1
  )} on ${months[date.getMonth()]} ${date.getDate()}`;

  if (workout.type === 'running') {
    workout.description = description;
  }
  if (workout.type === 'cycling') {
    workout.description = description;
  }
  //render Workout marker
  createWorkoutMarker(workout);

  workouts.push(workout);
  // console.log(workouts);

  createWorkouts(workout);
  console.log(workout);
  localStorage.setItem('workouts', JSON.stringify(workouts));
}

function createWorkoutMarker(workout) {
  const { coords, type, description } = workout;
  const layer = L.marker(coords)
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        // add border left
        className: `${type}-popup`,
      })
    )
    .setPopupContent(
      `${
        workout.type === 'running' ? `🏃 ${description}` : `🚴‍♂️ ${description}`
      }`
    )
    .openPopup();

  // push the marker inside of markers array
  markers.push(layer);
  console.log(markers);
}

form.addEventListener('submit', formContent);

function moveToMarker(e) {
  const workoutEl = e.target.closest('.workout');
  if (!workoutEl) return;
  const workout = workouts.find(work => work.id === workoutEl.dataset.id);

  map.setView(workout.coords, 13, {
    animate: {
      duration: 2,
    },
  });
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem('workouts'));
  if (!data) return;
  workouts = data;
}

function deleteWorkout(deleteBtn) {
  const workoutEl = deleteBtn.closest('.workout');
  if (!deleteBtn || !workoutEl) return;
  const workoutId = workoutEl.dataset.id;

  const workout = workouts.find(work => work.id === workoutId);
  if (!workout) return;
  workoutEl.remove();

  // Get the index in the workout array for markers array
  let index;

  const updatedWorkouts = workouts.filter((workout, i) => {
    index = i;
    return workout.id !== workoutId;
  });
  console.log(updatedWorkouts);
  // setting the workouts to updated workouts
  workouts = updatedWorkouts;

  // delete workout form  Local Storage
  localStorage.removeItem('workouts');
  localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));

  // remove marker from the map
  markers[index].remove();

  // remove marker from the array
  markers.splice(index);

  localStorage.setItem('workouts', JSON.stringify(workouts));
}

function editWorkout(editEl) {
  if (!editEl) return;

  const workoutEl = editEl.closest('.workout');
  const id = workoutEl.dataset.id;
  console.log(id);

  const workout = workouts.find(work => work.id === id);
  if (!workout) return;

  inputType.value = workout.type;
  inputDistance.value = workout.distance;
  inputDuration.value = workout.duration;
  if (workout.type === 'running') {
    inputCadence.value = workout.cadence;
  }
  if (workout.type === 'cycling') {
    inputElevation.value = workout.elevation;
    inputCadence.closest('.form__row').classList.add('form__row--hidden');
    inputElevation.closest('.form__row').classList.remove('form__row--hidden');
  }
  form.classList.remove('hidden');

  if (workout.id === id) {
  }
}

function deleteAllWorkout(deleteAll) {
  if (!deleteAll) return;
  // remove all workouts elements from the UI
  const workoutElements = document.querySelectorAll('.workout');
  workoutElements.forEach(workEl => workEl.remove());

  localStorage.removeItem('workouts');
  location.reload();

}

containerWorkouts.addEventListener('click', function (e) {
  const editEl = e.target.closest('.edit--workout');
  const deleteBtn = e.target.closest('.delete--workout');
  const deleteAllEl = e.target.closest('.delete-all');
  if (editEl) {
    editWorkout(editEl);
  } else if (deleteBtn) {
    deleteWorkout(deleteBtn);
  } else if (deleteAllEl) {
    deleteAllWorkout(deleteAllEl);
  } else {
    moveToMarker(e);
  }
});
