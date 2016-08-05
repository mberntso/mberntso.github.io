// script for survey logic


// survey vertex content
var v0  = ["Tumor Type","Solid","Hematologic"];
var v1  = ["Solid Type","Colorectal","Lung","Thyroid","GIST","Melanoma","Glioma","Solid Tumor, NOS"];
var v2  = ["Hematoligc Type","Leukemia","Lymphoma"];
var v3  = ["Colorectal Result","DONE"];
var v4  = ["Lung Result","DONE"];
var v5  = ["Thyroid Type","Fairview Case","Dr. Schuster Case"];
var v6  = ["GIST Result","DONE"];
var v7  = ["Melanoma Result","DONE"];
var v8  = ["Glioma","DONE"];
var v9  = ["Solid Tumor, NOS Result","DONE"];
var v10 = ["Leukemia Type","Acute","Chronic"];
var v11 = ["Lymphoma Result","DONE"];
var v12 = ["Colorectal text"];
var v13 = ["Lung text"];
var v14 = ["Fairview Case Result","DONE"];
var v15 = ["Dr. Schuster Case Result","DONE"];
var v16 = ["GIST text"];
var v17 = ["Melanoma text"];
var v18 = ["Glioma text"];
var v19 = ["Solid tumor, NOS text"];
var v20 = ["Acute Type","Myeloid","Lymphoid"];
var v21 = ["Chronic: Myeloproliferative Neoplasm Panel","Complete","Short"];
var v22 = ["Lymphoma text"];
var v23 = ["Fairview case result text"];
var v24 = ["Dr. Schuster text"];
var v25 = ["Acute Myeloid Panel","Complete","Short"];
var v26 = ["Complete Myeloproliferative Neoplasm Panel Result","DONE"];
var v27 = ["Short Myeloproliferative Neoplasm Panel Result","DONE"];
var v28 = ["Complete Acute Myeloid Panel Result","DONE"];
var v29 = ["Short Acute Myeloid Panel Result","DONE"];
var v30 = ["Complete Myeloproliferative Neoplasm Panel Result text"];
var v31 = ["Short Myeloproliferative Neoplasm Panel Result text"];
var v32 = ["Complete Acute Myeloid Panel Result text"];
var v33 = ["Short Acute Myeloid Panel Result text"];

// survey question vertices
// vertices must be placed into survey tree in Depth-First order
var survey = [
  v0 ,v1 ,v2 ,v3 ,v4 ,v5 ,
  v6 ,v7 ,v8 ,v9 ,v10,v11,
  v12,v13,v14,v15,v16,v17,
  v18,v19,v20,v21,v22,v23,
  v24,v25,v26,v27,v28,v29,
  v30,v31,v32,v33];

var status = 0; // serves as the index of the vertex
var parentStatus = 0; // used for the back button
var notBacking = true;  // used for the back button


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
  var para = document.createElement("H2");
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
    para.setAttribute("class", "button");
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
  // and not coming from the back button
  if (survey[parentStatus][1] == "DONE" && notBacking) {
    // make result message
    result();

  } else {
    // make vertex
    makeVertex(status);
    // reset backing to false (if backing was true)
    notBacking = true;


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
  var para = document.createElement("H1");
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

    // set backing flag
    notBacking = false;

    // replaceVertex uses global status, so replace the old status
    replaceVertex(oldStatus)

  }

  // else at original question, so do nothing

}
