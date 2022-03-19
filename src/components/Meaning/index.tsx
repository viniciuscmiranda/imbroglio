import { Fallback } from 'components/Fallback';
import { Modal } from 'components/Modal';
import { capitalize, uniqueId } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FiInfo } from 'react-icons/fi';
import { SectionTitle } from 'styles/components';

import { Button, Content } from './styles';

export type MeaningProps = {
  word: string;
};

export const Meaning: React.FC<MeaningProps> = ({ word }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [meanings, setMeanings] = useState<string[]>([]);

  const fetchData = useCallback(async () => {
    if (meanings.length || error) return;
    setLoading(true);

    try {
      const meaningsRes = await fetch(`https://significado.herokuapp.com/${word}`);
      const meaningsData = await meaningsRes.json();
      if (meaningsData.error) throw new Error(meaningsData.error);

      const nextMeanings = meaningsData.map((item: any) => item.meanings || []).flat();

      if (!nextMeanings.length) throw new Error('No data');
      setMeanings(nextMeanings);
    } catch {
      setError(true);
    }

    setLoading(false);
  }, [error, meanings, word]);

  useEffect(() => {
    setMeanings([]);
    setError(false);
  }, [word]);

  return (
    <Modal
      title={capitalize(word)}
      onOpen={fetchData}
      trigger={
        <Button aria-label={`Mostrar significado de ${word}`}>
          <FiInfo size="1.5rem" />
        </Button>
      }
    >
      {(error || loading) && (
        <Fallback
          error={!loading && error}
          css={{ paddingBottom: '2.5em' }}
          errorMessage={'Palavra não encontrada'}
        />
      )}

      {Boolean(meanings.length) && (
        <>
          <SectionTitle>📚 Significados</SectionTitle>
          {meanings?.length && (
            <Content>
              {meanings.map((meaning) => (
                <li key={uniqueId()}>{meaning}</li>
              ))}
            </Content>
          )}

          <p style={{ marginTop: '2rem' }}>
            Fornecido por:
            <br />
            <a href="https://github.com/ThiagoNelsi/dicio-api" target="blank">
              https://github.com/ThiagoNelsi/dicio-api
            </a>
          </p>
        </>
      )}
    </Modal>
  );
};
