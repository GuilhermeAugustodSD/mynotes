import { Container, Links, Content } from './styles'

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { Tag } from '../../components/Tag';
import { ButtonText } from '../../components/ButtonText';

export function Details() {
  return (
    <Container>
      <Header/>


      <main>
        <Content>
          <ButtonText title="Excluir Nota"></ButtonText>

          <h1>Introdução ao React</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sequi cumque quis maiores, dolor similique. Obcaecati, ratione! Modi incidunt magnam odit optio doloribus nemo laborum. Amet nostrum labore blanditiis corrupti. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sequi cumque quis maiores, dolor similique. Obcaecati, ratione! Modi incidunt magnam odit optio doloribus nemo laborum. Amet nostrum labore blanditiis corrupti.
          </p>

          <Section title="Links Úteis">
            <Links>
              <li><a href="https://www.gdantasit.com">https://www.gdantasit.com</a></li>
              <li><a href="https://www.gdantasit.com">https://www.gdantasit.com</a></li>
            </Links>
          </Section>

          <Section title="Marcadores">
            <Tag title="NodeJS"/>
            <Tag title="Express"/>
          </Section>

          <Button 
            name="Voltar"
          />
        </Content>
      </main>
    </Container>
  )
}