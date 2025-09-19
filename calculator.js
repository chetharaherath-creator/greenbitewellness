// ===== Calorie Calculator (BMR + TDEE) =====
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('calcForm');
  var bmrOut = document.getElementById('bmrOut');
  var tdeeOut = document.getElementById('tdeeOut');
  var resultBox = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var age = parseFloat(document.getElementById('age').value);
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);
    var activity = parseFloat(document.getElementById('activity').value);
    var gender = document.querySelector('input[name="gender"]:checked');

    if (!age || !height || !weight || !activity || !gender) {
      alert("Please fill all fields.");
      return;
    }

    // Mifflin-St Jeor Equation
    var bmr;
    if (gender.value === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    var tdee = bmr * activity;

    bmrOut.textContent = Math.round(bmr) + " kcal/day";
    tdeeOut.textContent = Math.round(tdee) + " kcal/day";
    resultBox.hidden = false;
  });
});
