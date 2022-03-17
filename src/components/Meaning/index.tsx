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
      const res = await fetch(`https://significado.herokuapp.com/${word}`);
      const resData = await res.json();
      if (resData.error) throw new Error(resData.error);

      setMeanings(resData.map((item: any) => item.meanings || []).flat());
    } catch (err) {
      setError(true);
    }

    setLoading(false);
  }, [error, meanings, word]);

  useEffect(() => {
    setMeanings([]);
  }, [word]);

  return (
    <Modal
      title={capitalize(word)}
      onOpen={fetchData}
      trigger={
        <Button>
          <FiInfo size="1.5rem" />
        </Button>
      }
    >
      {(error || loading) && (
        <Fallback
          error={!loading && error}
          css={{ paddingBottom: '4.5rem' }}
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
