/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
let user;
let submitEnabled = false;
const submitButton = document.getElementById("rsvp-attending-submit");

const declineCheckbox = document.getElementById("rsvp-decline-checkbox");
const attendingContainer = document.getElementById("rsvp-attending-container");
const dietaryContainer = document.getElementById("rsvp-dietary-container");
const songContainer = document.getElementById("rsvp-song-container");

const attendingInput = document.getElementById("rsvp-attending");
const dietaryInput = document.getElementById("rsvp-attending-dietary-field");
const songInput = document.getElementById("rsvp-attending-song-field");

function onLoad(newUser) {
  user = newUser;
  const isAttending = user.rsvp !== -1;
  declineCheckbox.checked = !isAttending;
  songInput.value = user.song;
  dietaryInput.value = user.dietary;

  setAttendingFieldsHidden(!isAttending);

  declineCheckbox.addEventListener("change", () => {
    setAttendingFieldsHidden(declineCheckbox.checked);
  });
}

const setAttendingFieldsHidden = (hidden) => {
  if (hidden) {
    attendingContainer.classList.add("hidden");
    dietaryContainer.classList.add("hidden");
    songContainer.classList.add("hidden");
  } else {
    attendingContainer.classList.remove("hidden");
    songContainer.classList.remove("hidden");
    dietaryContainer.classList.remove("hidden");
  }

  updateSubmitState();
};

const updateSubmitState = () => {
  if (declineCheckbox.checked) {
    submitEnabled = true;
  } else {
    submitEnabled = dietaryInput.value && songInput.value;
  }

  // TODO: check attending number filled
  if (submitEnabled) {
    submitButton.className = "rsvp-attending-submit-enabled";
  } else {
    submitButton.className = "rsvp-attending-submit-disabled";
  }
};

const submit = () => {
  let body;

  if (declineCheckbox.checked) {
    body = {
      rsvp: -1,
    };
  } else {
    body = {
      rsvp: attendingInput.selectedIndex,
      song: songInput.value,
      dietary: dietaryInput.value,
    };
  }

  fetch("/guest/rsvp", {
    method: "POST",
    body,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};
