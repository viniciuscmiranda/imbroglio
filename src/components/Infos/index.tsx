import React from 'react';
import { FiGithub } from 'react-icons/fi';
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
            data-gtm="GitHub Vini"
            target="_blank"
            href="https://github.com/viniciuscmiranda"
          >
            <FiGithub />
            Vini
          </SocialButton>

          <SocialButton
            variant="github"
            target="_blank"
            data-gtm="GitHub João Lucas"
            href="https://github.com/joaolucas26"
          >
            <FiGithub />
            João Lucas
          </SocialButton>
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
          data-gtm="Código fonte"
          href="https://github.com/viniciuscmiranda/imbroglio"
        >
          <FiGithub />
          Código fonte
        </SocialButton>

        <SocialButton
          variant="github"
          target="_blank"
          data-gtm="Base de dados"
          href="https://github.com/joaolucas26/imbroglio-data"
        >
          <FiGithub />
          Base de dados
        </SocialButton>

        <SocialButton
          variant="notion"
          target="_blank"
          data-gtm="Roadmap"
          href="https://vini6.notion.site/97d3647c55874152b2e506046a877d2d"
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
        <SocialButton
          variant="termo"
          target="_blank"
          href="https://term.ooo/"
          data-gtm="Termo"
        >
          Termo
        </SocialButton>

        <SocialButton
          variant="letterjumble"
          target="_blank"
          href="https://letterjumble.com/"
          data-gtm="Letter Jumble"
        >
          Letter Jumble
        </SocialButton>
      </SocialContainer>
    </Section>
  );
};
