import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import PropTypes from 'prop-types';
import './wheel.css';
import NumberModal from './NumberModal';

const Wheel = ({ values }) => {
  const chartWheelRef = useRef(null);
  const spinBtnRef = useRef(null);
  const numSegments = values.length;
  const [winner, setWinner] = useState(null); // Estado para armazenar o vencedor
  const [modalOpen, setModalOpen] = useState(false); // Controle do modal

  useEffect(() => {
    const chartWheel = chartWheelRef.current;
    const spinBtn = spinBtnRef.current;

    const colors = [
      '#f44336',
      '#e91e63',
      '#9c27b0',
      '#673ab7',
      '#3f51b5',
      '#2196f3',
      '#03a9f4',
      '#00bcd4',
      '#009688',
      '#4caf50',
      '#8bc34a',
      '#cddc39',
      '#ffeb3b',
    ];

    const spinPointer = {
      id: 'spinPointer',
      afterDatasetsDraw(chart, args, plugins) {
        const {
          ctx,
          chartArea: { top },
        } = chart;
        const xCenter = chart.getDatasetMeta(0).data[0].x;

        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = '#00008B'; // Azul escuro para o ponteiro
        ctx.moveTo(xCenter, top + 30);
        ctx.lineTo(xCenter - 15, top);
        ctx.lineTo(xCenter + 15, top);
        ctx.fill();
      },
    };

    const myChart = new Chart(chartWheel, {
      plugins: [ChartDataLabels, spinPointer],
      type: 'pie',
      data: {
        labels: values,
        datasets: [
          {
            backgroundColor: colors.slice(0, numSegments),
            data: Array.from({ length: numSegments }, () => 16),
          },
        ],
      },
      options: {
        responsive: true,
        animation: { duration: 1 },
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
          datalabels: {
            anchor: 'center',
            align: 'end',
            color: '#000000', // Preto para as legendas
            formatter: (_, context) => {
              const index = context.dataIndex;
              return context.chart.data.labels[index];
            },
            font: {
              size: 14,
              weight: 'bold',
            },
            rotation: (context) => {
              const index = context.dataIndex;
              const meta = context.chart.getDatasetMeta(0);
              const startAngle = (meta.data[index].startAngle / Math.PI) * 180;
              const endAngle = (meta.data[index].endAngle / Math.PI) * 180;
              const centerAngle = (startAngle + endAngle) / 2;

              return centerAngle <= 180 ? centerAngle : centerAngle - 180;
            },
          },
        },
      },
    });

    // Função que simula a rotação
    function rotation() {
      const randomRotation = Math.random() * 333; // Definir um valor de rotação aleatória
      const targetRotation = randomRotation + 360; // A roleta irá girar pelo menos 10 vezes

      let currentRotation = 0;
      const rotateWheel = () => {
        if (currentRotation < targetRotation) {
          currentRotation += 10; // Incrementa a rotação por quadro
          myChart.config.data.datasets[0].rotation = currentRotation;
          myChart.update();
          requestAnimationFrame(rotateWheel); // Continua a rotação até alcançar o valor alvo
        } else {
          // Após a rotação, calcular o vencedor
          setTimeout(() => {
            myChart.getDatasetMeta(0).data.forEach((datapoint, index) => {
              const angle = 180 / Math.PI;
              const netStartAngle = (datapoint.startAngle * angle) % 360;
              const netEndAngle = (datapoint.endAngle * angle) % 360;
              if (270 > netStartAngle && 270 < netEndAngle) {
                setWinner(myChart.config.data.labels[index]);
                setModalOpen(true);
              }
            });
          }, 500); // Pequeno atraso para o cálculo correto do vencedor
        }
      };

      rotateWheel(); // Iniciar a animação
    }

    spinBtn.addEventListener('click', rotation);

    return () => {
      spinBtn.removeEventListener('click', rotation);
      myChart.destroy();
    };
  }, [values, numSegments]);

  return (
    <div className="wrapper">
      <div className="container">
        <canvas ref={chartWheelRef} id="wheel"></canvas>
        <button
          ref={spinBtnRef}
          id="spin-btn"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          rodar
        </button>
      </div>
      <div id="final-value"></div>
      {/* Adicionando o elemento com id 'winner' */}
      {modalOpen && (
        <NumberModal
          meaning={winner}
          onClose={() => setModalOpen(false)} // Fecha o modal ao clicar no botão "Close"
        />
      )}
    </div>
  );
};

Wheel.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Wheel;
