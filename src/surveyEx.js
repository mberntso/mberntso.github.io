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
var v12 = ["Colorectal: (Minumum 20% tumor) MMR (if not already done) KRAS, BRAF, HRAS, NRAS, PIK3CA.  Notes: If absent marking for MLH-1 send the FFPB to M Health for hypermethylation testing."];
var v13 = ["Lung: (Minumum 20% tumor) BRAF, EGFR, ERBB2, HRAS, JAK2, KRAS, MET, NRAS, PIK3CA; FISH: ALK, ROS1. Initial diagnosis, stage IIIB and IV, non-squamous non-small cell carcinomas.  Send the block of core tissue, resection tumor or fluid cell block to M Health molecular lab.  RET fusion test by FISH is being validated by cytogenetics loab as of April 2016. (RET positive tumor is treated with cabozantinib)"];
var v14 = ["Fairview Case Result","DONE"];
var v15 = ["Dr. Schuster Case Result","DONE"];
var v16 = ["GIST: (Minimum 20% tumor) BRAF, KIT, PDGFRA."];
var v17 = ["Melanoma: (Minimum 20% tumor) BRAF, KIT, HRAS, NRAS, PDGFRA."];
var v18 = ["Glioma: (Minimum 20% tumor) IDH1, IDH2, TP53. New panel as of April 2016.  A separate molecular test for MGMT is in the verification stage as of April 2016. A separate FISH marker for 1p19q from the cytogenetics department can be ordered after seeing the results of the NGS panel."];
var v19 = ["Solid tumor, NOS: (Minimum 20% tumor) BRAF, EGFR, ERBB2, HRAS, IDH!, IDH2, JAK2, KIT, KRAS, MET, NRAS, PDGFRA, PIK3CA, TP53."];
var v20 = ["Acute Type","Myeloid","Lymphoid"];
var v21 = ["Chronic: Myeloproliferative Neoplasm Panel","Complete","Short"];
var v22 = ["Lymphoma: Individual gene MYD88 for MCL (Only 85% positive for MCL)."];
var v23 = ["Thyroid Fairview Case: BRAF, HRAS, KRAS, NRAS, PIK3CA.  FNA samples must be collected in RPMI or DNA/RNA stabilization media. Send separate aspirate in RPMI cell preservative to M Health."];
var v24 = ["Thyroid Dr. Schuster: UPMC panel: Point mutations and indels in the hotspots of genes: AKT1, BRAF, CTNNB1, EIF1AX, GNAS, HRAS, KRAS, PIK3CA, PTEN, RET, TERT, TP53 and TSR and 42 gene fusions involving genes: RET, PPARG, NTRK1, NTRK3, ALK, BRAF, and IGF2BP3. Send the aspirate to UPMC Presbyterian, Dept of Pathology, 200 Lathrap St, Pittsburgh, PA 15213, which is arranged through the M Health central cytology department."];
var v25 = ["Acute Myeloid Panel","Complete","Short"];
var v26 = ["Lymphoid Result","DONE"];
var v27 = ["Complete Myeloproliferative Neoplasm Panel Result","DONE"];
var v28 = ["Short Myeloproliferative Neoplasm Panel Result","DONE"];
var v29 = ["Complete Acute Myeloid Panel Result","DONE"];
var v30 = ["Short Acute Myeloid Panel Result","DONE"];
var v31 = ["Lymphoid: FISH and flow cytometry, no known molecular marker (August 2016)."];
var v32 = ["Complete Myeloproliferative Neoplasm Panel: (blood or bone marrow only) (includes Molecular NS and rt-PCR BCR-ABL1) JAK@, CALR, MPL. BCR-ABL1 major quantitative (p210). BCR-ABL1 minor qualitative (p190)."];
var v33 = ["Short Myeloproliferative Neoplasm Panel: (blood or bone marrow only) (includes Molecular NGS only) JAK2, CALR, MPL."];
var v34 = ["Complete Acute Myeloid Panel: (Minimum 20% blast count required) FLT3, IDH1, IDH2, KIT, KRAS, NRAS, NPM1, PDGFRA, TP53, WT1. CEBPA (Minimum 30% blasts required)."];
var v35 = ["Short Acute Myeloid Panel: (Minimum 20% blast count required) FLT3, NPM1, CEBPA."];

// survey question vertices
// vertices must be placed into survey tree in Depth-First order
var survey = [
  v0 ,v1 ,v2 ,v3 ,v4 ,v5 ,
  v6 ,v7 ,v8 ,v9 ,v10,v11,
  v12,v13,v14,v15,v16,v17,
  v18,v19,v20,v21,v22,v23,
  v24,v25,v26,v27,v28,v29,
  v30,v31,v32,v33,v34,v35];

var status = 0; // serves as the index of the vertex
var parentStatus = [
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,
  0,0,0,0]; // array of the parent vertex for each vertex
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
  if (survey[parentStatus[status]][1] == "DONE" && notBacking) {
    // make result message
    result();

  } else {
    // make vertex
    makeVertex(status);
    // reset backing to false (if notBacking was false)
    notBacking = true;


  }

}

function decision(i) {
  // save status
  oldStatus = status;

  // determine new status
  var offset = 0;
  for (k = 0; k < oldStatus; k++) {
    offset += survey[k].length - 1;
  }
  status = offset + i;

  //set parent
  parentStatus[status] = oldStatus;

  // replace old vertex
  replaceVertex(parentStatus[status]);

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
    status = parentStatus[oldStatus];

    // set backing flag
    notBacking = false;

    // replaceVertex uses global status, so replace the old status
    replaceVertex(oldStatus);

  }

  // else at original question, so do nothing

}
