myChart()


async function getData() {
    const xs = [];
    const ys = [];

    const response = await fetch('csv/zonal.csv');
    const data = await response.text();
    
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const rows = row.split(',')
        const year = rows[0];
        const temp = rows[1];
        xs.push(year);
        ys.push(parseFloat(temp) + 14);
        console.log(year, temp);
    })

    return {xs, ys};
}


async function myChart() {
    const data = await getData();
    const ctx = document.getElementById('chart');
    const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in ºC',
            data: data.ys,
            backgroundColor: 'rgba(119, 141, 169, .5)',
            borderColor: 'rgba(2, 48, 71, .8)',
            borderWidth: 1,
            pointBorderWidth: 1
        }]
    },
    options: {
        fill: true,
        scales: {
        y: {
            beginAtZero: false,
            ticks: {
                callback: function(value, index, ticks) {
                    return `${value}ºC`
                }
            }
        }
        }
    }
    });
}