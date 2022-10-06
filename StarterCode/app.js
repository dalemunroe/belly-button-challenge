function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var samplenames = data.names;

    samplenames.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    });
    var firstsample = samplenames[0];
    metadata(firstsample);
    //charts(firstsample);
  });
}
init();

function optionChanged(newsample) {
  metadata(newsample);
  //charts(newsample);
}

function metadata(sample) {
  d3.json("samples.json").then((data) => {
    console.log(data);
    var demoinfo = data.metadata;
    console.log(demoinfo);
    var demoarray = demoinfo.filter((sampleobj) => sampleobj.id == sample);
    var result = demoarray[0];
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}; ${value}`);
    });
  });
}

//function charts () {};
