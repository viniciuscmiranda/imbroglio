import React from 'react';
import { FiGithub, FiTwitch, FiTwitter } from 'react-icons/fi';
import { SiNotion } from 'react-icons/si';
import { Section, SectionTitle } from 'styles/components';

import { Container, Social, SocialButton, SocialContainer } from './styles';

export const Infos: React.FC = () => {
  return (
    <Container>
      <SocialSection />
      <FilesSection />
      <InspirationsSection />
    </Container>
  );
};

const SocialSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>🚀 Criadores</SectionTitle>

      <Social>
        <SocialContainer>
          <SocialButton
            variant="github"
            target="_blank"
            href="https://github.com/viniciuscmiranda"
          >
            <FiGithub />
            {/* viniciuscmiranda */}
            Vini
          </SocialButton>

          <SocialButton
            variant="twitter"
            target="_blank"
            href="https://twitter.com/_seis66"
          >
            <FiTwitter />
            {/* _seis66 */}
            Vini
          </SocialButton>
        </SocialContainer>

        <SocialContainer>
          <SocialButton
            variant="github"
            target="_blank"
            href="https://github.com/joaolucas26"
          >
            <FiGithub />
            {/* joaolucas26 */}
            Jão
          </SocialButton>

          <SocialButton
            variant="twitter"
            target="_blank"
            href="https://twitter.com/JaozinBaterista"
          >
            <FiTwitter />
            {/* JaozinBaterista */}
            Jão
          </SocialButton>

          {/* <SocialButton
            variant="twitch"
            target="_blank"
            href="https://www.twitch.tv/jaozinbaterista"
          >
            <FiTwitch />
            jaozinbaterista
          </SocialButton> */}
        </SocialContainer>
      </Social>
    </Section>
  );
};

const FilesSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>📁 Arquivos</SectionTitle>

      <SocialContainer>
        <SocialButton
          variant="github"
          target="_blank"
          href="https://github.com/viniciuscmiranda/imbroglio"
        >
          <FiGithub />
          Código fonte
        </SocialButton>

        <SocialButton
          variant="github"
          target="_blank"
          href="https://github.com/joaolucas26/imbroglio-data"
        >
          <FiGithub />
          Base de dados
        </SocialButton>

        <SocialButton
          variant="notion"
          target="_blank"
          href="https://www.notion.so/vini6/Imbr-glio-97d3647c55874152b2e506046a877d2d"
        >
          <SiNotion />
          Roadmap
        </SocialButton>
      </SocialContainer>
    </Section>
  );
};

const InspirationsSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>🧡 Inspirações</SectionTitle>

      <SocialContainer>
        <SocialButton variant="termo" target="_blank" href="https://term.ooo/">
          Termo
        </SocialButton>

        <SocialButton
          variant="letterjumble"
          target="_blank"
          href="https://letterjumble.com/"
        >
          Letter Jumble
        </SocialButton>
      </SocialContainer>
    </Section>
  );
};
