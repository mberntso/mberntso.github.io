// script for survey logic


// survey vertex content
var vertex1 = ["Tumor Type","Hema","Solid"];
var vertex2 = ["Hema Type","Lymph","Leuk"];
var vertex3 = ["Solid Type","Solid1","Solid2"];

// survey question vertices
// vertices must be placed into survey tree in Depth-First order
var survey = [vertex1, vertex2, vertex3];


function begin() {
    document.body.removeChild(document.getElementById("intro"));
    document.body.removeChild(document.getElementById("begin"));
    makeVertex(0);
    
}

function makeVertex(index) {
    makeQuestion(index);
    makeButtons(index);
    
}

function makeQuestion(index) {
    var para = document.createElement("H3");
    var t = document.createTextNode(survey[index][0]);
    para.appendChild(t);
    para.setAttribute("id", survey[index][0]);
    document.body.appendChild(para);
}

function makeButtons(index) {
    var para = document.createElement("BUTTON");
    var t = document.createTextNode(survey[index][1]);
    para.appendChild(t);
    para.setAttribute("onClick", "decision()")
    document.body.appendChild(para);
}

