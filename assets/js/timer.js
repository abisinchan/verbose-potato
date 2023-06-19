var timeEl = document.querySelector(".time");
var headingEl = document.querySelector("h1");
var secondsLeft = 60;
var originalHeadingText = headingEl.textContent;
var originalHeadingParent = headingEl.parentNode;

function setTime() {
  var timerInterval = setInterval(function() {
    if (!timeEl.contains(headingEl)) {
      originalHeadingParent.appendChild(headingEl);
    }

    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds";

    if (secondsLeft === 0) {
      clearInterval(timerInterval);

      // Clear existing text and append new text
      timeEl.textContent = "";
      var newContent = document.createTextNode("Hey, you got this.");
      timeEl.appendChild(newContent);

      // Remove heading element
      headingEl.remove();

      // Create reset button
      var resetButton = document.createElement("button");
      resetButton.textContent = "Reset";
      resetButton.setAttribute("class", "reset-button");
      resetButton.setAttribute("style", "background-color: #b4dbe7; color: black; font-size: 23px; border: none; border-radius: 45px; padding: 5px 10px; box-shadow: 2px 1px 5px #353636; cursor: pointer;");

      // Append reset button
      timeEl.appendChild(document.createElement("br")); // Add a line break
      timeEl.appendChild(resetButton);

      // Add event listener to reset button
      resetButton.addEventListener("click", resetCountdown);
    }
  }, 1000);
}

function resetCountdown() {
  secondsLeft = 60;
  timeEl.textContent = "";
  
  // Recreate and append the heading element
  headingEl = document.createElement("h1");
  headingEl.textContent = originalHeadingText;
  headingEl.setAttribute("style", "font-size: 40px");
  originalHeadingParent.appendChild(headingEl);

  setTime();
}

setTime();
