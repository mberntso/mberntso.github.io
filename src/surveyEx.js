// script for survey logic


// survey vertex content
var vertex1 = ["Tumor Type","Hema","Solid"];
var vertex2 = ["Hema Type","Lymph","Leuk"];
var vertex3 = ["Solid Type","Solid1","Solid2"];

// survey question vertices
// vertices must be placed into survey tree in Depth-First order
var survey = [vertex1, vertex2, vertex3];

var status = 0; // correllated with the index to use for the back button


function begin() {
    document.body.removeChild(document.getElementById("intro"));
    document.body.removeChild(document.getElementById("begin"));
    makeVertex(status);
    
}

function makeVertex(index) {
    makeQuestion(index);
    makeButtons(index);
    status++;
}

function makeQuestion(index) {
    // make question heading
    var para = document.createElement("H3");
    var t = document.createTextNode(survey[index][0]);
    para.appendChild(t);
    para.setAttribute("id", survey[index][0]);
    document.body.appendChild(para);
}

function makeButtons(index) {
    // make buttons for every option in the vertex
    for (i = 1; i < survey[index].length; i++) { 
        var para = document.createElement("BUTTON");
        var t = document.createTextNode(survey[index][i]);
        para.appendChild(t);
        para.setAttribute("id", survey[index][i]);
        para.onclick = function(){decision(index, i);return false;}
        document.body.appendChild(para);
    }
}

function result(index, i) {
    // prints result message
    var para = document.createElement("H2");
    var t = document.createTextNode(survey[index][i]);
    para.appendChild(t);
    para.setAttribute("id", survey[index][i]);
    document.body.appendChild(para);
}


function backButton() {
    // check status
    if (status == 1) {

    }
    // run through math to make parent vertex
    // call replaceVertex(status)

}

function replaceVertex(index) {
    // remove all elements of the current vertex

    for (i = 1; i < survey[index].length; i++) { 
        document.body.removeChild(document.getElementById(survey[index][i]));
    }

    // now replace with vertex by index = status
    makeVertex(status);

}

function decision(index, i) {
    // make question heading
    var para = document.createElement("H3");
    var t = document.createTextNode(index+": "+i);
    para.appendChild(t);
    para.setAttribute("id", survey[index][0]);
    document.body.appendChild(para);

}








