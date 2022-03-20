/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Chart } from 'components/Chart';
import { ModalPage } from 'components/ModalPage';
import { GAME_NAME } from 'constants';
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
  FiShare2,
  FiStar,
} from 'react-icons/fi';
import { SectionTitle, ShareButton } from 'styles/components';
import { Stats as StatsType } from 'types';
import { normalize } from 'utils';

import {
  ActionButton,
  Card,
  CardsContainer,
  Container,
  Header,
  HeaderMessageTitle,
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
  todayStats?: StatsType;
};

type CardType = {
  title: string;
  value: string | number;
  Icon: IconType;
  page?: React.ReactElement;
};

export const Stats: React.FC = () => {
  const { stats, storedWords, share } = useGame();

  const [data, setData] = useState<StatDataType | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    const allWords = Object.values(storedWords)?.flat();
    const allPoints = stats.map(({ points }) => points);
    const groupedWords = allWords
      .sort((a, b) => Number(normalize(b) > normalize(a)) * -1)
      .reduce((acc, curr) => {
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
      averagePoints: stats.length ? (totalPoints / stats.length).toFixed(1) : '',
      recordPoints: allPoints.length ? Math.max(...allPoints) : 0,
      pointsByDay: stats.map(({ points, date }) => ({ points, date })),
      uniqueWords: Object.keys(groupedWords).length,
      stats: stats.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
      todayStats: stats.find(({ date }) => moment(date).isSame(moment(), 'day')),
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
        <Header>
          <div>
            <HeaderMessageTitle>
              {data?.todayStats ? 'Você venceu!' : 'Já descobriu as palavras de hoje?'}
            </HeaderMessageTitle>

            <p>
              Seu novo {GAME_NAME} começa em <Timer />
            </p>
          </div>

          <div>
            <ShareButton
              onClick={() => share()}
              css={{
                background: 'none',
                border: 'none',
                padding: '0',
                height: 'auto',
              }}
            >
              <FiShare2 />
              Compartilhar
            </ShareButton>
          </div>
        </Header>

        <CardsContainer>
          {cards.map(({ title, value, page, Icon }) => {
            const hasPage = Boolean(page && value);

            if (hasPage)
              return (
                <ModalPage
                  title={title}
                  trigger={
                    <Card
                      data-gtm={`Estatísticas: ${title}`}
                      key={uniqueId()}
                      as="button"
                      hasPage
                    >
                      <StatContainer>
                        <IconContainer>
                          <Icon size="2em" />
                        </IconContainer>
                        <InfoContainer>
                          <p>{title}</p>
                          <span>{value || '-'}</span>
                        </InfoContainer>
                      </StatContainer>

                      <ActionButton>
                        <FiChevronRight size="1.25em" />
                      </ActionButton>
                    </Card>
                  }
                >
                  {page}
                </ModalPage>
              );

            return (
              <Card key={uniqueId()}>
                <StatContainer>
                  <IconContainer>
                    <Icon size="2em" />
                  </IconContainer>
                  <InfoContainer>
                    <p>{title}</p>
                    <span>{value || '-'}</span>
                  </InfoContainer>
                </StatContainer>
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
      <Scrollbars autoHide style={{ height: '100%' }}>
        <table tabIndex={0}>
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
                  <strong>{moment(stat.date).format('DD/MM/YY')}</strong>
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
      <Scrollbars autoHide style={{ height: '100%' }}>
        <table tabIndex={0}>
          <thead>
            <tr>
              <th>Palavra</th>
              <th>Vezes</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedWords)
              .sort((a, b) => b[1] - a[1])
              .map(([word, amount]) => (
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

const Timer: React.FC = () => {
  const [timer, setTimer] = useState<moment.Moment | null>(null);

  useEffect(() => {
    const nextPuzzleTime = moment().add(1, 'day').set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    const timeDiff = moment(nextPuzzleTime).diff(moment());
    const nextTimer = moment.utc(timeDiff);

    setTimeout(() => setTimer(nextTimer), 500);
  }, [timer]);

  return <strong>{timer?.format('HH:mm:ss')}</strong>;
};
