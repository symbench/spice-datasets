function createBarChart(data, labels) {
    const layout = {
        title: labels.title,
        xaxis: {title: labels.x},
        yaxis: {title: labels.y},
    };
    const div = document.createElement('div');
    const id = labels.title + Date.now();
    div.setAttribute('id', id);
    document.body.appendChild(div);
    Plotly.newPlot(id, data, layout);
}

function createDatasetVisualizations(dataset) {
    delete dataset.componentCounts['0'];  // remove empty files
    createBarChart([{
        x: Object.keys(dataset.componentCounts),
        y: Object.values(dataset.componentCounts),
        type: 'bar',
    }], {
        title: 'Component Count Distribution',
        x: '# of Components',
        y: 'Count',
    });

    createBarChart([
        {
            x: Object.keys(dataset.componentTypeCounts),
            y: Object.values(dataset.componentTypeCounts),
            type: 'bar'
        }
    ], {
        title: 'Dataset Component Counts',
        x: 'Component Type',
        y: 'Frequency',
    });


    // TODO: maybe add a switcher?
    Object.keys(dataset.componentTypesByNetlist).sort().forEach(componentType => {
        const counts = dataset.componentTypesByNetlist[componentType];
        createBarChart([
            {
                x: Object.keys(counts),
                y: Object.values(counts),
                type: 'bar'
            }
        ], {
            title: `Usage of ${componentType} per Netlist`,
            x: `# of ${componentType} Components in Netlist`,
            y: '# of Netlists',
        });
    });
}

createDatasetVisualizations(dataset);
