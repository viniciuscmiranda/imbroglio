import { Infos } from 'components/Infos';
import { Instructions } from 'components/Instructions';
import { Modal } from 'components/Modal';
import { Stats } from 'components/Stats';
import { GAME_NAME } from 'constants';
import { useGame } from 'hooks';
import React from 'react';
import { FiAward, FiHelpCircle, FiInfo, FiRefreshCw, FiShuffle } from 'react-icons/fi';
import { Button } from 'styles/components';

import { Container } from './styles';

const iconSize = '1.35rem';

export const Actions: React.FC = () => {
  const { resetGame, shuffleBench, rows, letters } = useGame();

  return (
    <Container>
      <div>
        <Button
          aria-label="Recomeçar"
          disabled={!rows.flat().length}
          onClick={() => resetGame()}
        >
          <FiRefreshCw size={iconSize} />
        </Button>

        <Button
          aria-label="Embaralhar letras"
          disabled={!letters.length}
          onClick={() => shuffleBench()}
        >
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
