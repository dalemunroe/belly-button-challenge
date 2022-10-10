
// Call the data into the inital loaded dashboard
function initDashboard() {
  const selector = d3.select("#selDataset");

  // Populate the selector with "Test Subject ID"
  d3.json("samples.json").then((data) => {
    console.log(data);
    const idVal = data.names;
    idVal.forEach((sample) => {
      selector.append("option")
      .text(sample)
      .property("value", sample);
      });
    let initialSample = idVal[0];
    metadata(initialSample);
    console.log(initialSample);
    dashboardCharts(initialSample);
  });
}



// New_sample variable 
function optionChanged(selectedSample) {
  metadata(selectedSample);
  console.log(selectedSample);
  dashboardCharts(selectedSample);
}




// Demographic Info Panel
function metadata(PatientId) {
  d3.json("samples.json").then((data) => {
    // Set data as constant variables
    const metadata = data.metadata;
    const selection_result = metadata.filter(
      (sampleobj) => sampleobj.id == PatientId);
    const result = selection_result[0];
    const PANEL = d3.select("#sample-metadata");
    // Clear existing data
    PANEL.html("");
    //Add key value pair to the panel
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}; ${value}`);
    });


    // Gauge (This is inside the Demographic function because it utilizes the metadata.)
    // Code Here

  });
}

// Initialize the page with a default plot.
function dashboardCharts(PatientId) {
  d3.json("samples.json").then((data) => {
    let plotData = data.samples;
    let subject = plotData.filter(
      (sampleobject) => sampleobject.id == PatientId
    )[0];

    console.log(subject);
    let id = subject.otu_ids;
    let label = subject.otu_labels;
    let value = subject.sample_values;

    const plotConfig = {
        responsive: true, // Enable Responsive Chart to Window Size
        // scrollZoom: true, // Mousewheel or two-finger scroll zooms the plot
        displaylogo: false, // Hide the Plotly Logo on the Modebar
        modeBarButtonsToRemove: [
          "zoom2d",
          "pan2d",
          "select2d",
          "lasso2d",
          "zoomIn2d",
          "zoomOut2d",
          "autoScale2d",
          "resetScale2d",
          "hoverClosestCartesian",
          "hoverCompareCartesian",
          "toggleSpikelines",
        ],
        // displayModeBar: false, // Never Display the Modebar
      };


    // Horizontal Bar Char
    var trace1 = {
      x: value.slice(0, 10).reverse(),
      y: id
        .slice(0, 10)
        .map((otuID) => `OTU ${otuID}`)
        .reverse(),
      text: label.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
    };

    var data = [trace1];

    var layout = {
      title: "Top 10 Cultures Found in Patient",
      xaxis: { autorange: true },
      yaxis: { autorange: true },
      margin: { t: 70, l: 100 },
      height: 380,
      hovermode: "closest",
      hoverlabel: { bgcolor: "lightgrey" },
    };

    Plotly.newPlot("bar", data, layout, plotConfig);

    // Bubble Chart
    var trace1 = {
      x: id,
      y: value,
      text: label,
      mode: "markers",
      marker: {
        color: id,
        size: value,
        colorscale: "Rainbow",
      },
    };

    var data = [trace1];

    var layout = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "x unified",
      width: window.width,
      };


    Plotly.newPlot("bubble", data, layout, plotConfig);
  });
}


// Initialize the dashboard
initDashboard();