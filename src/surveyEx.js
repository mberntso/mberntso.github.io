// script for survey logic


// survey vertex content
var v1 = ["Tumor Type", "Hema", "Solid"];
var v2 = ["Hema Type", "Lymph", "Leuk"];
var v3 = ["Solid Type", "Solid1", "Solid2"];

// survey question vertices
// vertices must be placed into survey tree in Depth-First order
var survey = [v1, v2, v3];

var status = 0; // serves as the index of the vertex
var parentStatus = 0; // used for the back button


function begin() {
  document.body.removeChild(document.getElementById("intro"));
  document.body.removeChild(document.getElementById("begin"));
  makeVertex();

}

function makeVertex() {
  makeQuestion();
  makeButtons();

}

function makeQuestion() {
  // make question heading
  var para = document.createElement("H3");
  var t = document.createTextNode(survey[status][0]);
  para.appendChild(t);
  para.setAttribute("id", survey[status][0]);
  document.body.appendChild(para);

}

function makeButtons() {
  // make buttons for every option in the vertex
  for (i = 1; i < survey[status].length; i++) {
    var para = document.createElement("BUTTON");
    var t = document.createTextNode(survey[status][i]);
    para.appendChild(t);
    para.setAttribute("id", survey[status][i]);
    para.onclick = (function(i) {
      return function() {
        decision(i);
      };
    })(i);
    document.body.appendChild(para);

  }

}

function replaceVertex(index) {
  // remove all elements of the current vertex
  for (i = 0; i < survey[index].length; i++) {
    document.body.removeChild(document.getElementById(survey[index][i]));

  }

  // check if the survey is at the result
  if (survey[parentStatus][1] == "DONE") {
    // make result message
    result();

  } else {
    // make vertex
    makeVertex(status);

  }

}

function decision(i) {
  // save status
  parentStatus = status;

  // determine new status
  var offset = 0;
  for (k = 0; k < parentStatus; k++) {
    offset += survey[k].length - 1;
  }
  status = offset + i;

  // replace old vertex
  replaceVertex(parentStatus);

}

function result() {
  // prints result message using updated status
  // status should be a vertex with only one entry: the message
  var para = document.createElement("H2");
  var t = document.createTextNode(survey[status][0]);
  para.appendChild(t);
  para.setAttribute("id", survey[status][0]);
  document.body.appendChild(para);

}

function backButton() {
  // check status
  if (status != 0) {

    // set statuses
    oldStatus = status;
    status = parentStatus;

    // replaceVertex uses global status, so replace the old status
    replaceVertex(oldStatus)

  }

  // else at original question, so do nothing

}
