/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
function onLoad(user) {
  console.log("onload");
  const checkbox = document.getElementById("rsvp-decline-checkbox");
  const submitError = document.getElementById("rsvp-submit-error");
  const attendingContainer = document.getElementById(
    "rsvp-attending-container"
  );
  const dietaryContainer = document.getElementById("rsvp-dietary-container");
  const songContainer = document.getElementById("rsvp-song-container");

  const song = document.getElementById("rsvp-attending-song-field");
  const submit = document.getElementById("rsvp-attending-submit");

  const attending = user.rsvp !== -1;

  console.log(user.rsvp, attending);

  checkbox.checked = !attending;
  song.value = user.song;

  if (!attending) {
    attendingContainer.classList.add("hidden");
    dietaryContainer.classList.add("hidden");
    songContainer.classList.add("hidden");
    submit.disabled = false;
  }

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      attendingContainer.classList.add("hidden");
      songContainer.classList.add("hidden");
      dietaryContainer.classList.add("hidden");
      submit.disabled = false;
      submitError.innerText = "";
    } else {
      attendingContainer.classList.remove("hidden");
      songContainer.classList.remove("hidden");
      dietaryContainer.classList.remove("hidden");
      submit.disabled = !attending;
    }
  });
}
