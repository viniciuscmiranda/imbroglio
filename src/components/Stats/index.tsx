import { Chart } from 'components/Chart';
import { ModalPage } from 'components/ModalPage';
import { useGame } from 'hooks';
import { uniqueId } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IconType } from 'react-icons';
import {
  FiAward,
  FiBook,
  FiChevronRight,
  FiDivideCircle,
  FiMaximize2,
  FiPlusCircle,
  FiStar,
} from 'react-icons/fi';
import { SectionTitle } from 'styles/components';
import { Stats as StatsType } from 'types';

import {
  ActionButton,
  Card,
  CardsContainer,
  Container,
  IconContainer,
  InfoContainer,
  StatContainer,
  TableContainer,
} from './styles';

type StatDataType = {
  stats: StatsType[];
  totalPoints: number;
  playedGames: number;
  totalWords: number;
  largestWord: string;
  averagePoints: string;
  recordPoints: number;
  pointsByDay: { points: number; date: string }[];
  uniqueWords: number;
  allPoints: number[];
  allWords: string[];
  groupedWords: { [key: string]: number };
};

type CardType = {
  title: string;
  value: string | number;
  Icon: IconType;
  page?: React.ReactElement;
};

export const Stats: React.FC = () => {
  const { stats, storedWords } = useGame();

  const [data, setData] = useState<StatDataType | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const allWords = Object.values(storedWords)?.flat();
    const allPoints = stats.map(({ points }) => points);
    const groupedWords = allWords.sort().reduce((acc, curr) => {
      const x: { [key: string]: number } = { ...acc };

      if (x[curr]) x[curr] = x[curr] + 1;
      else x[curr] = 1;

      return x;
    }, {});

    const totalPoints = allPoints.reduce((acc, curr) => acc + curr, 0);

    const nextData: StatDataType = {
      playedGames: stats.length,
      totalWords: allWords.length,
      largestWord: allWords.sort((a, b) => b.length - a.length)[0],
      averagePoints: (totalPoints / stats.length).toFixed(1),
      recordPoints: Math.max(...allPoints),
      pointsByDay: stats.map(({ points, date }) => ({ points, date })),
      uniqueWords: Object.keys(groupedWords).length,
      stats: stats.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
      totalPoints,
      allWords,
      allPoints,
      groupedWords,
    };

    setData(nextData);
  }, [storedWords, stats]);

  useEffect(() => {
    if (!data) return;

    const nextCards = [
      {
        title: 'Vitórias',
        value: data.playedGames,
        Icon: FiAward,
        page: <VictoryPage {...data} />,
      },

      {
        title: 'Palavras formadas',
        value: data.totalWords,
        Icon: FiBook,
        page: <WordsPage {...data} />,
      },

      {
        title: 'Maior palavra',
        value: data.largestWord,
        Icon: FiMaximize2,
      },

      {
        title: 'Record de pontos',
        value: data.recordPoints,
        Icon: FiStar,
      },

      {
        title: 'Média de pontos',
        value: data.averagePoints,
        Icon: FiDivideCircle,
      },

      {
        title: 'Total de pontos',
        value: data.totalPoints,
        Icon: FiPlusCircle,
      },
    ];

    setCards(nextCards);
  }, [data]);

  return (
    <>
      <Container>
        <CardsContainer>
          {cards.map(({ title, value, page, Icon }) => {
            const hasPage = Boolean(page);

            return (
              <Card key={uniqueId()} hasPage={hasPage}>
                <StatContainer>
                  <IconContainer>
                    <Icon size="2em" />
                  </IconContainer>
                  <InfoContainer>
                    <p>{title}</p>
                    <span>{value}</span>
                  </InfoContainer>
                </StatContainer>

                {hasPage && (
                  <ModalPage
                    title={title}
                    trigger={
                      <ActionButton>
                        <FiChevronRight size="1.25em" />
                      </ActionButton>
                    }
                  >
                    {page}
                  </ModalPage>
                )}
              </Card>
            );
          })}
        </CardsContainer>

        <div>
          <SectionTitle>📅 Pontos por dia</SectionTitle>
          <Chart
            data={stats.map(({ date, points }) => ({
              label: moment(date).format('DD/MM/YY'),
              value: points,
            }))}
          />
        </div>
      </Container>
    </>
  );
};

const VictoryPage: React.FC<StatDataType> = ({ stats }) => {
  return (
    <TableContainer>
      <Scrollbars autoHide style={{ height: '32rem' }}>
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Pontos</th>
              <th>Palavras</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={uniqueId()}>
                <td>
                  <strong>{moment(stat.date).format('DD/MM/YYYY')}</strong>
                </td>
                <td>{stat.points}</td>
                <td>{stat.words.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollbars>
    </TableContainer>
  );
};

const WordsPage: React.FC<StatDataType> = ({ groupedWords }) => {
  return (
    <TableContainer>
      <Scrollbars autoHide style={{ height: '32rem' }}>
        <table>
          <thead>
            <tr>
              <th>Palavra</th>
              <th>Repetições</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedWords).map(([word, amount]) => (
              <tr key={uniqueId()}>
                <td>
                  <strong>{word}</strong>
                </td>
                <td>{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Scrollbars>
    </TableContainer>
  );
};
