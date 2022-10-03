/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function onLoad(user) {
  const checkbox = document.getElementById("rsvp-decline-checkbox");
  const submitError = document.getElementById("rsvp-submit-error");
  const attendingContainer = document.getElementById(
    "rsvp-attending-container"
  );
  const songContainer = document.getElementById("rsvp-song-container");
  const song = document.getElementById("rsvp-attending-song-field");
  const attending = document.getElementById("rsvp-attending-attending");
  const submit = document.getElementById("rsvp-attending-submit");

  if (user.rsvp === -1) {
    attendingContainer.classList.add("hidden");
    songContainer.classList.add("hidden");
    submit.disabled = false;
    checkbox.checked = true;
  } else {
    submit.disabled = !attending.value;
    attending.value = user.rsvp;
    song.value = user.song;
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      attendingContainer.classList.add("hidden");
      songContainer.classList.add("hidden");
      submit.disabled = false;
      submitError.innerText = "";
    } else {
      attendingContainer.classList.remove("hidden");
      songContainer.classList.remove("hidden");
      submit.disabled = !attending.value;
    }
  });

  attending.addEventListener("input", () => {
    if (attending.value) {
      if (Number(attending.value) > Number(user.invites)) {
        submit.disabled = true;
        submitError.innerText = "too many";
      } else {
        submit.disabled = false;
        submitError.innerText = "";
      }
    } else {
      submit.disabled = true;
      submitError.innerText = "no attending";
    }
  });
}
