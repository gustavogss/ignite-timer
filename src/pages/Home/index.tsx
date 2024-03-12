import { Play } from 'phosphor-react'
import { Container, FormContainer, CountContainer, Sepator } from './styles'

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

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </Container>
  )
}
