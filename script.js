window.addEventListener("DOMContentLoaded", function () {

  // Get the form elements
  var form = document.getElementById("form");

//add event listener for form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  calculateDoses();
});

//declare a global array to store messages
  var messages = [];
//declare a global variable to store the result of calculation
  var result = 0;

  function calculateDoses(){

      //clearing calculated value and warning for every new calculation
      document.getElementById("testosteroneDose").innerHTML = "";
      document.getElementById("desiccatedThyroidDose").innerHTML = "";
      var appendcontent = document.getElementById("appendWarning");
      appendcontent.innerHTML = "";


      //calculate Dessicated Thyroide Dose
      var freeT3 = document.getElementById("freeT3").value;

      if(freeT3>=1 && freeT3<=3)
      {
          document.getElementById("desiccatedThyroidDose").innerHTML = "1 gr Orally";
      }
      if(freeT3>3 || freeT3<1)
      {
          document.getElementById("desiccatedThyroidDose").innerHTML = "0 gr Orally";
      }



      var flag = 0;
      //check if testorene is zero case1;
      if(isZeroTestorene1()===true) {
          flag = 1;
          let val = "0 mg pellets";
          // add val to the id="testosteroneDose"
          document.getElementById("testosteroneDose").innerHTML = val;

          let msg = "No Testosterone when Testosterone level is greater than 650 and the patient is not currently on Testosterone";

          // append a red color paragraph with msg to the div id= "testosteroneDoseBlock"
          let para = document.createElement("p");
          para.style.color = "black";
          para.style.fontStyle = "bold";
          para.innerHTML = msg;
          document.getElementById("appendWarning").appendChild(para);

      }

      //check if testorene is zero case2;
      if(isZeroTestorene2()===true)
      {
          flag = 1;
          let val = "0 mg pellets";
          let msg = "No dose due to Prostate Cancer within 2 years.";
          document.getElementById("testosteroneDose").innerHTML = val;

          var para = document.createElement("p");
          para.style.color = "black";
          para.style.fontStyle = "bold";
          para.innerHTML = msg;
          document.getElementById("appendWarning").appendChild(para);
      }

      //calculate testosterone dose if its not zero;
      if(flag ===0)
      {
          calculateTestosteroneDose();

          document.getElementById("testosteroneDose").innerHTML = "<br>"+
              "Conservative: " + result * 0.50 +"mg pellets<br>"
              + " Median: " + result * 0.75 + "mg pellets<br>"
              + " Aggresive: " + result + " mg pellets";

          if(messages.length>0)
          {
              for(let i=0; i<messages.length; i++)
              {
                  var para = document.createElement("p");
                  para.style.color = "black";
                  para.style.fontStyle = "bold";
                  para.innerHTML = messages[i];
                  document.getElementById("appendWarning").appendChild(para);
              }
          }

      }
  }

  //calculate testosterone dose if its zero case1;
  function isZeroTestorene1()
  {
      var totalTestosterone = document.getElementById("totalTestosterone").value;

      if(document.getElementById("currentlyTestosterone").checked === false)
      {
          if(totalTestosterone>650) {
              return true;
          }
      }
  }

  //calculate testosterone dose if its zero case2;
  function isZeroTestorene2()
  {

      var prostateCancerFree = document.getElementById("yearsCancerFree").value;

      if(document.getElementById("prostateCancer").checked === true ||  prostateCancerFree === "Under")
      {
          return true;
      }

  }

  //calculate testosterone dose if its not zero;
  function calculateTestosteroneDose()
  {

      result = 0;
      messages = [];
      let weight = document.getElementById("patientWeight").value;
      let ActivityLevel = document.getElementById("activityLevel").value;
      let ActivityHigh = 0;
      if(ActivityLevel === "High") {
          ActivityHigh = 1;
      }
      let currentlyAdd = document.getElementById("currentlyADD").checked;
      let chronicPain = document.getElementById("chronicPain").checked;

      if(currentlyAdd === false && chronicPain === false && ActivityHigh === 0) {


          if(weight>=0 && weight<=100)
          {
              result = Math.max(result, 0);
          }
          if(weight>100 && weight<=140)
          {
              result = Math.max(result, 1400);
          }
          if(weight>140 && weight<=160)
          {
              result = Math.max(result, 1800);
          }
          if(weight>160 && weight<=190)
          {
              result = Math.max(result, 2000);
          }
          if(weight>190 && weight<=200)
          {
              result = Math.max(result, 2200);
          }
          if(weight>200 && weight<=225)
          {
              result = Math.max(result, 2400);
          }
          if(weight>225)
          {
              result = Math.max(result, 2600);
          }

      }

      //if activity level is high
      if(ActivityHigh===1)
      {
          messages.push("Testosterone dose increased due to: higher Activity Level");

          if(weight>=0 && weight<=100)
          {
              result = Math.max(result , 0);
          }
          if(weight>100 && weight<=140)
          {
              result = Math.max(result , 1800);
          }
          if(weight>140 && weight<=160)
          {
              result = Math.max(result , 2000);
          }
          if(weight>160 && weight<=190)
          {
              result = Math.max(result , 2200);

          }
          if(weight>190 && weight<=200)
          {
              result = Math.max(result , 2400);
          }
          if(weight>200 && weight<=225)
          {
              result = Math.max(result , 2600);
          }
          if(weight>225)
          {
              result = Math.max(result , 2600);
          }
      }

      //if taking ADD meds
      if(currentlyAdd === true)
      {
          messages.push("Testosterone dose increased due to: currently taking ADD meds (Adderall, Concerta, Vyvanse, etc)");
          if(weight>=0 && weight<=100)
          {
              result = Math.max(result , 0);
          }
          if(weight>100 && weight<=140)
          {
              result = Math.max(result , 1600);
          }
          if(weight>140 && weight<=160)
          {
              result = Math.max(result , 2000);
          }
          if(weight>160 && weight<=190)
          {
              result = Math.max(result , 2200);
          }
          if(weight>190 && weight<=200)
          {
              result = Math.max(result , 2400);
          }
          if(weight>200 && weight<=225)
          {
              result = Math.max(result , 2600);
          }
          if(weight>225)
          {
              result = Math.max(result , 2600);
          }
      }

      //if chronic pain patient
      if(chronicPain === true)
      {
          messages.push("Testosterone dose increased due to: chronic pain patient.");
          if(weight>=0 && weight<=100)
          {
              result = Math.max(result , 0);
          }
          if(weight>100 && weight<=140)
          {
              result = Math.max(result , 1600);
          }
          if(weight>140 && weight<=160)
          {
              result = Math.max(result , 2000);
          }
          if(weight>160 && weight<=190)
          {
              result = Math.max(result , 2200);
          }
          if(weight>190 && weight<=200)
          {
              result = Math.max(result , 2400);
          }
          if(weight>200 && weight<=225)
          {
              result = Math.max(result , 2600);
          }
          if(weight>225)
          {
              result = Math.max(result , 2600);
          }
      }


  }

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("calculate");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    if (form.checkValidity()) {
      calculateDoses();
      modal.style.display = "block";
    }
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
