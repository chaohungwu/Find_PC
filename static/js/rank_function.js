let currentChart = null;
let cpuChart = null;
let gpuChart = null;


async function CPU_rank() {
  const res = await fetch("/api/cpu_data", {
    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
  });
  const data = await res.json();

  renderChart(data, "CPU 性能 vs 價格", item => `${item.label}｜${item.extra} 核心｜$${item.x}｜分數 ${item.y}`);
}

async function GPU_rank() {
  const res = await fetch("/api/gpu_data", {
    headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` }
  });
  const data = await res.json();

  renderChart(data, "GPU 性能 vs 價格", item => `${item.label}｜${item.extra}GB VRAM｜$${item.x}｜分數 ${item.y}`);
}

















async function renderChart(rawData, chartLabel, tooltipFormatter) {
  let ctx = document.getElementById('canvas_dom').getContext('2d');

  // 資料轉換
  const formattedData = rawData.map(item => ({
    x: item.price,
    y: parseInt(item.score),
    label: item.name,
    extra: item.VRAM || item.cores || ""
  }));

  // 若圖表已存在，直接更新資料
  if (currentChart) {
    currentChart.data.datasets[0].label = chartLabel;
    currentChart.data.datasets[0].data = formattedData;
    currentChart.update();
    return;
  }

  // 第一次建立圖表
  currentChart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: chartLabel,
        data: formattedData,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (ctx) => tooltipFormatter(formattedData[ctx.dataIndex])
          }
        }
      },
      scales: {
        x: { title: { display: true, text: '價格 (NTD)' } },
        y: { title: { display: true, text: '效能分數' } }
      }
    }
  });
}