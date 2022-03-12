import dragLetter from 'assets/images/drag-letter.png';
import wordCompleted from 'assets/images/word-completed.png';
import React from 'react';
import { FiAward, FiRefreshCw, FiShare2, FiShuffle } from 'react-icons/fi';
import { Section, SectionTitle } from 'styles/components';

import { Container, Image, List } from './styles';

export const Instructions: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>🔡 Como jogar</SectionTitle>

        <List>
          <li>Segure e arraste as letras da bancada para as linhas</li>
          <Image>
            <img src={dragLetter} alt="Arrastando letra" />
          </Image>
          <li>Forme até 3 palavras usando as letras disponíveis</li>
          <li>Quanto maiores as palavras formadas, mais pontos você ganha</li>
          <Image>
            <img src={wordCompleted} alt="Palavra formada" />
          </Image>
          <li>Volte todos os dias para um novo desafio</li>
          <li>E não se esqueça de compartilhar!</li>
        </List>
      </Section>

      <Section>
        <SectionTitle>💣 Ações</SectionTitle>
        <List>
          <li>
            <FiRefreshCw /> Devolver letras para a bancada
          </li>
          <li>
            <FiShuffle /> Embaralhar letras da bancada
          </li>
          <li>
            <FiAward /> Minhas estatísticas
          </li>
          <li>
            <FiShare2 /> Compartilhar!
          </li>
        </List>
      </Section>
    </Container>
  );
};
