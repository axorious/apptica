import React, { useRef, useEffect, useState, useMemo } from 'react';
import Chart from 'chart.js/auto';
import '../style/App.scss';

const CHART_COLORS = [
  '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
  '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395',
];

const SUBCATEGORY_NAMES = {
  1: 'Top Free',
  2: 'Top Paid',
  3: 'Top Grossing',
  4: 'Top Free',
  5: 'Top Paid',
  6: 'Top Grossing',
  7: 'Top Free',
  8: 'Top Paid',
  9: 'Trending',
};

const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
};

const prepareChartData = (rawData, selectedCategories, categoriesList) => {
  if (!rawData || typeof rawData !== 'object') return null;
  
  const dates = new Set();
  Object.values(rawData).forEach(subcategories => {
    Object.values(subcategories).forEach(dateData => {
      Object.keys(dateData).forEach(date => dates.add(date));
    });
  });

  const sortedLabels = Array.from(dates).sort();
  const datasets = [];

  Object.entries(rawData).forEach(([categoryId, subcategories], categoryIndex) => {
    const numericCategoryId = Number(categoryId);
    
    if (selectedCategories?.length && !selectedCategories.includes(numericCategoryId)) {
      return;
    }

    const category = categoriesList.find(c => c.id === numericCategoryId);
    const categoryName = category?.name || "Unknown Category";

    Object.entries(subcategories).forEach(([subcategoryId, dateData], subcategoryIndex) => {
  const subcategoryName = SUBCATEGORY_NAMES[subcategoryId] || subcategoryId;
  const colorIndex = (categoryIndex * 3 + subcategoryIndex) % CHART_COLORS.length;

  const positions = sortedLabels.map(date =>
    dateData[date] !== undefined ? dateData[date] : null
  );

  const label = `${categoryName} / ${subcategoryName}`;

  datasets.push({
    label,
    data: positions,
    borderColor: CHART_COLORS[colorIndex],
    backgroundColor: CHART_COLORS[colorIndex],
    fill: false,
    tension: 0.2,
  });
});
  });

  return { labels: sortedLabels, datasets };
};

const ChartLegend = ({ datasets, visibleLines, onToggleLine }) => (
  <div className="chart-legend">
    {datasets.map((dataset) => (
      <label key={dataset.label} className="chart-legend-item">
        <input
          type="checkbox"
          checked={visibleLines[dataset.label] !== false}
          onChange={() => onToggleLine(dataset.label)}
        />
        <span
          className="chart-legend-color"
          style={{ backgroundColor: dataset.borderColor }}
        />
        {dataset.label}
      </label>
    ))}
  </div>
);

const TopHistoryChart = ({ data, selectedCategories, categoriesList }) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  const [visibleLines, setVisibleLines] = useState({});

  const chartData = useMemo(
    () => prepareChartData(data, selectedCategories, categoriesList) || { labels: [], datasets: [] },
    [data, selectedCategories, categoriesList]
  );

  useEffect(() => {
    if (!data || !chartData.labels.length || !canvasRef.current) return;

    const filteredDatasets = chartData.datasets.filter(
      ({ label }) => visibleLines[label] !== false
    );

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: { labels: chartData.labels, datasets: filteredDatasets },
      options: CHART_OPTIONS,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
    // eslint-disable-next-line
  }, [data, chartData.labels, visibleLines]);

  const handleToggleLine = (label) => {
    setVisibleLines(prev => ({ ...prev, [label]: !prev[label] }));
  };

  if (!data || typeof data !== 'object') {
    return <div>No data available</div>;
  }
  if (!chartData.datasets.length) {
    return <div style={{ textAlign: 'center', color: '#888' }}>
      No data for the selected country or category
    </div>;
  }

  return (
    <>
      <div className='top-history-canvas-container'>
        <canvas 
          ref={canvasRef} 
          style={{ maxWidth: '100%', height: '300px', padding: '30px' }} 
          aria-label="Top chart history"
        />
      </div>
      <ChartLegend 
        datasets={chartData.datasets}
        visibleLines={visibleLines}
        onToggleLine={handleToggleLine}
      />
    </>
  );
};

export default TopHistoryChart;