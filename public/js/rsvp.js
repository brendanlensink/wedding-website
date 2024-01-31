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
  this.user = newUser;
  const isAttending = this.user.rsvp !== -1;
  declineCheckbox.checked = !isAttending;

  if (this.user.rsvp >= 1) {
    attendingInput.value = this.user.rsvp;
  } else {
    attendingInput.value = "";
  }

  songInput.value = this.user.song;
  dietaryInput.value = this.user.dietary;

  setAttendingFieldsHidden(!isAttending);

  declineCheckbox.addEventListener("change", () => {
    setAttendingFieldsHidden(declineCheckbox.checked);
  });
}

const setAttendingFieldsHidden = (hidden) => {
  if (hidden) {
    dietaryContainer.classList.add("hidden");
    songContainer.classList.add("hidden");

    attendingInput.value = "";
  } else {
    songContainer.classList.remove("hidden");
    dietaryContainer.classList.remove("hidden");
  }

  updateSubmitState();
};

const updateSubmitAttendingState = () => {
  if (declineCheckbox.checked) {
    declineCheckbox.checked = false;
    setAttendingFieldsHidden(false);
  }
  updateSubmitState();
};

const updateSubmitState = () => {
  if (declineCheckbox.checked) {
    submitEnabled = true;
  } else {
    submitEnabled = attendingInput.value;
  }

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
      rsvp: Number(attendingInput.value),
      song: songInput.value,
      dietary: dietaryInput.value,
    };
  }

  console.log(body);

  fetch("/guest/rsvp", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => (window.location = response.url));
};
