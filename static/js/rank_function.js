
// async function CPU_rank() {
//   const response = await fetch(`/api/cpu_data`, {
//     method: 'GET',
//     headers: {
//       "Authorization": `Bearer ${localStorage.getItem('token')}`
//     }
//   });
//   const data = await response.json();

//   const chartData = data.map(cpu => ({
//     x: cpu.price,
//     y: parseInt(cpu.score),
//     label: cpu.name
//   }));

//   const ctx = document.getElementById('canvas_dom').getContext('2d');

//   // ✅ 如果有圖表，先銷毀
//   if (currentChart) {
//     currentChart.destroy();
//   }

//   // ✅ 建立新圖表
//   currentChart = new Chart(ctx, {
//     type: 'scatter',
//     data: {
//       datasets: [{
//         label: 'CPU 性能 vs 價格',
//         data: chartData,
//         pointRadius: 6,
//         pointHoverRadius: 8
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         tooltip: {
//           callbacks: {
//             label: function (context) {
//               const label = chartData[context.dataIndex].label;
//               return `${label}：價格 $${context.parsed.x}，分數 ${context.parsed.y}`;
//             }
//           }
//         }
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: '價格 (NTD)'
//           }
//         },
//         y: {
//           title: {
//             display: true,
//             text: '效能分數'
//           }
//         }
//       }
//     }
//   });
// }



// async function GPU_rank() {
//     let filter_but_dom = document.querySelector(".radio_select:checked");

//     let response = await fetch(`/api/gpu_data`, {
//         method: 'GET',
//         headers: {
//             "Authorization": `Bearer ${localStorage.getItem('token')}`
//         }
//     });

//     let data = await response.json();
//     console.log(data);

//     const scatterData = data.map(gpu => ({
//         x: gpu.price,
//         y: parseInt(gpu.score),
//         label: gpu.name,
//         vram: gpu.VRAM
//     }));

//     const ctx = document.getElementById('canvas_dom').getContext('2d');

//     if (gpuChart) {
//         // ✅ 如果圖表已存在，就更新資料
//         currentChart.destroy();
//         gpuChart.data.datasets[0].data = scatterData;
//         gpuChart.update();
//     } else {
//         // ✅ 否則建立新圖表
//         gpuChart = new Chart(ctx, {
//             type: 'scatter',
//             data: {
//                 datasets: [{
//                     label: 'GPU 價格 vs 效能',
//                     data: scatterData,
//                     pointRadius: 6,
//                     pointHoverRadius: 8,
//                 }]
//             },
//             options: {
//                 responsive: true,
//                 plugins: {
//                     tooltip: {
//                         callbacks: {
//                             label: (context) => {
//                                 const gpu = scatterData[context.dataIndex];
//                                 return `${gpu.label}｜${gpu.vram}GB VRAM\n價格：$${gpu.x}｜分數：${gpu.y}`;
//                             }
//                         }
//                     }
//                 },
//                 scales: {
//                     x: {
//                         title: {
//                             display: true,
//                             text: '價格 (NTD)'
//                         }
//                     },
//                     y: {
//                         title: {
//                             display: true,
//                             text: '效能分數'
//                         }
//                     }
//                 }
//             }
//         });
//     }
// }
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



function renderChart(rawData, chartLabel, tooltipFormatter) {
  const ctx = document.getElementById('canvas_dom').getContext('2d');

  // 銷毀舊圖
  if (currentChart) {
    currentChart.destroy();
  }

  // 資料轉換
  const formattedData = rawData.map(item => ({
    x: item.price,
    y: parseInt(item.score),
    label: item.name,
    extra: item.VRAM || item.cores || ""  // GPU VRAM / CPU 核心 整合處理
  }));

  // 建立圖表
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