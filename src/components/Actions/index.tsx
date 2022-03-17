import { Infos } from 'components/Infos';
import { Instructions } from 'components/Instructions';
import { Modal } from 'components/Modal';
import { Stats } from 'components/Stats';
import { GAME_NAME } from 'constants';
import { useGame } from 'hooks';
import React, { useEffect, useState } from 'react';
import {
  FiAward,
  FiHelpCircle,
  FiInfo,
  FiRefreshCw,
  FiShare2,
  FiShuffle,
} from 'react-icons/fi';
import { Button } from 'styles/components';

import { Container, Points } from './styles';

const iconSize = '1.35rem';

export const Actions: React.FC = () => {
  const { resetGame, shuffleBench, points, stats, victory, share } = useGame();
  const [showStats, setShowStats] = useState(false);

  useEffect(() => setShowStats(victory), [victory]);

  return (
    <Container>
      <div>
        <Button
          data-gtm="Embaralhar letras"
          aria-label="Embaralhar letras"
          title="Embaralhar letras"
          onClick={() => shuffleBench()}
        >
          <FiShuffle size={iconSize} />
        </Button>

        <Button aria-label="Recomeçar" title="Recomeçar" onClick={() => resetGame()}>
          <FiRefreshCw size={iconSize} />
        </Button>

        <Modal
          title="Minhas estatísticas"
          open={showStats}
          onClose={() => setShowStats(false)}
          onOpen={() => setShowStats(true)}
          trigger={
            <Button data-gtm="Minhas estatísticas" aria-label="Minhas estatísticas">
              <FiAward size={iconSize} />
            </Button>
          }
        >
          <Stats />
        </Modal>

        <Points data-gtm="Compartilhar" aria-label="Compartilhar" onClick={() => share()}>
          <FiShare2 size={iconSize} />
          {points} pontos
        </Points>
      </div>

      <div>
        <Modal
          title="Informações"
          trigger={
            <Button
              data-gtm="Informações"
              aria-label="Informações"
              title="Informações"
              variant="secondary"
            >
              <FiInfo size={iconSize} />
            </Button>
          }
        >
          <Infos />
        </Modal>
        <Modal
          title={`Bem-vindo ao ${GAME_NAME}!`}
          startOpen={!stats.length}
          trigger={
            <Button
              data-gtm="Como jogar"
              aria-label="Como jogar"
              title="Como jogar"
              variant="secondary"
            >
              <FiHelpCircle size={iconSize} />
            </Button>
          }
        >
          <Instructions />
        </Modal>
      </div>
    </Container>
  );
};
