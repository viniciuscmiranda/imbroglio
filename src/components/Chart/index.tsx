import { uniqueId } from 'lodash';
import moment from 'moment';
import React, { useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { Bar, BarContainer, ChartContainer, Container } from './styles';

export type ChartProps = {
  data: { label: string; value: number }[];
};

export const Chart: React.FC<ChartProps> = () => {
  const data: ChartProps['data'] = Array.from({ length: 30 })
    .map(() => ({
      label: moment(new Date(Math.random() * new Date().getTime())).format('DD/MM'),
      value: Math.round(Math.random() * 100),
    }))
    .sort((a, b) => new Date(b.label).getTime() - new Date(a.label).getTime());

  const higherValue = useMemo(() => {
    return Math.max(...data.map(({ value }) => value));
  }, [data]);

  return (
    <Container>
      <Scrollbars autoHide autoHeight>
        <ChartContainer>
          {data.map(({ value, label }) => (
            <BarContainer key={uniqueId()}>
              <Bar
                green={value >= higherValue * 0.8}
                css={{ height: `${(100 / higherValue) * value}%` }}
              >
                <span>
                  <b>{value}</b>
                </span>
              </Bar>

              <span>{label}</span>
            </BarContainer>
          ))}
        </ChartContainer>
      </Scrollbars>
    </Container>
  );
};
