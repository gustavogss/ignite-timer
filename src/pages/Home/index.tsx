import { Play } from 'phosphor-react'
import {
  Container,
  FormContainer,
  CountContainer,
  Sepator,
  StartButton,
} from './styles'

export function Home() {
  return (
    <Container>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input type="text" id="task" />
          <label htmlFor="minutesAmount">durante</label>
          <input type="text" id="minutesAmount" />
          <span>minutos.</span>
        </FormContainer>
        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Sepator>:</Sepator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <StartButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </Container>
  )
}
