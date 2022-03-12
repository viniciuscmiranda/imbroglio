import { Infos } from 'components/Infos';
import { Instructions } from 'components/Instructions';
import { Modal } from 'components/Modal';
import { Stats } from 'components/Stats';
import { APP_URL, GAME_NAME } from 'constants';
import { useGame } from 'hooks';
import React from 'react';
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
  const { resetGame, shuffleBench, points, share } = useGame();

  return (
    <Container>
      <div>
        <Button aria-label="Recomeçar" onClick={() => resetGame()}>
          <FiRefreshCw size={iconSize} />
        </Button>

        <Button aria-label="Embaralhar letras" onClick={() => shuffleBench()}>
          <FiShuffle size={iconSize} />
        </Button>

        <Modal
          title="Minhas estatísticas"
          trigger={
            <Button aria-label="Minhas estatísticas">
              <FiAward size={iconSize} />
            </Button>
          }
        >
          <Stats />
        </Modal>

        <Button aria-label="Compartilhar" onClick={() => share()}>
          <FiShare2 size={iconSize} />
        </Button>

        <Points>{points} Pontos</Points>
      </div>

      <div>
        <Modal
          title="Informações"
          trigger={
            <Button aria-label="Informações" variant="secondary">
              <FiInfo size={iconSize} />
            </Button>
          }
        >
          <Infos />
        </Modal>
        <Modal
          title={`Bem-vindo ao ${GAME_NAME}!`}
          trigger={
            <Button aria-label="Como jogar" variant="secondary">
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
