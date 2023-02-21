import React from 'react';
import { Row, Col, ButtonGroup, Button } from 'rsuite';
import BarChart from './BarChart';
import PieChart from './PieChart';

const barChartData = [
  {
    name: 'Alegría',
    data: [
      11, 8, 9, 10, 3, 11, 11, 11, 12, 13, 2, 12, 5, 8, 22, 6, 8, 6, 4, 1, 8, 24, 29, 51, 40, 47,
      23, 26, 50, 26, 22, 27, 46, 47, 81, 46, 40
    ]
  },
  {
    name: 'Tristeza',
    data: [
      7, 5, 4, 3, 3, 11, 4, 7, 5, 12, 12, 15, 13, 12, 6, 7, 7, 1, 5, 5, 2, 12, 4, 6, 18, 3, 5, 2,
      13, 15, 20, 47, 18, 15, 11, 10, 9
    ]
  },
  {
    name: 'Sorpresa',
    data: [
      4, 9, 11, 7, 8, 3, 6, 5, 5, 4, 6, 4, 11, 10, 3, 6, 7, 5, 2, 8, 4, 9, 9, 2, 6, 7, 5, 1, 8, 3,
      12, 3, 4, 9, 7, 11, 10
    ]
  }
];

const Dashboard = () => {
  return (
    <>
      <Row gutter={30}>
        <Col xs={16}>
          <BarChart
            title="Instancias de estados anímicos"
            actions={
              <ButtonGroup>
                <Button active>Día</Button>
                <Button>Semana</Button>
                <Button>Mes</Button>
              </ButtonGroup>
            }
            data={barChartData}
            type="bar"
            labels={[
              '2022-01-20',
              '2022-01-21',
              '2022-01-22',
              '2022-01-23',
              '2022-01-24',
              '2022-01-25',
              '2022-01-26',
              '2022-01-27',
              '2022-01-28',
              '2022-01-29',
              '2022-01-30',
              '2022-02-01',
              '2022-02-02',
              '2022-02-03',
              '2022-02-04',
              '2022-02-05',
              '2022-02-06',
              '2022-02-07',
              '2022-02-08',
              '2022-02-09',
              '2022-02-10',
              '2022-02-11',
              '2022-02-12',
              '2022-02-13',
              '2022-02-14',
              '2022-02-15',
              '2022-02-16',
              '2022-02-17',
              '2022-02-18',
              '2022-02-19',
              '2022-02-20',
              '2022-02-21',
              '2022-02-22',
              '2022-02-23',
              '2022-02-24',
              '2022-02-25',
              '2022-02-26'
            ]}
          />
        </Col>
        <Col xs={8}>
          <PieChart
            title="Situaciones registradas"
            data={[23, 21, 40, 32]}
            type="pie"
            labels={['TV', 'Visita familiares', 'Paseo', 'Actividades con compañeros']}
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
