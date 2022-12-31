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
      const data = await fetch(`https://api.dicionario-aberto.net/word/${word}`).then(
        (res) => res.json(),
      );

      const nextMeanings = data
        .flatMap(({ xml }: any) => {
          const temp = document.createElement('div');
          temp.innerHTML = xml;

          return (temp.textContent || temp.innerText).split('\n');
        })
        .filter((string: string) => {
          const meaning = string.trim();

          return (
            meaning &&
            meaning.toLowerCase() !== word.toLowerCase() &&
            !meaning.match('Lat.') &&
            !meaning.startsWith('Fig') &&
            !meaning.startsWith('(') &&
            !meaning.match(/[v|V]\./) &&
            !meaning.match(/^[a-zA-Z]{1,4}\./) &&
            meaning.length > 2
          );
        })
        .map((meaning: string) => {
          const formatted = meaning
            .trim()
            .replaceAll('_', '"')
            .replaceAll('«', '')
            .replaceAll('»', '')
            .replace(/\.$/, ';');

          return formatted[0].toUpperCase() + formatted.substring(1);
        });

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
          errorMessage={'Significado não encontrado'}
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
            <a href="https://api.dicionario-aberto.net/" target="blank">
              https://api.dicionario-aberto.net/
            </a>
          </p>
        </>
      )}
    </Modal>
  );
};
