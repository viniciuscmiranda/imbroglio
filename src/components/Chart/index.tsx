import { uniqueId } from 'lodash';
import React, { useMemo } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';

import { Bar, BarContainer, ChartContainer, Container, Placeholder } from './styles';

export type ChartProps = {
  data: { label: string; value: number }[];
};

export const Chart: React.FC<ChartProps> = ({ data }) => {
  const higherValue = useMemo(() => {
    return Math.max(...data.map(({ value }) => value)) || 0;
  }, [data]);

  return (
    <Container>
      <Scrollbars
        autoHide
        style={{ height: '17em' }}
        renderTrackVertical={() => <div style={{ display: 'none' }} />}
        renderThumbVertical={() => <div style={{ display: 'none' }} />}
        renderView={(props) => (
          <div {...props} style={{ ...props.style, overflowY: 'hidden' }} />
        )}
      >
        <ChartContainer>
          {!data.length && <Placeholder>{'Sem dados'}</Placeholder>}

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
