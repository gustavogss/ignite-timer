import { Container, HistoryList, Status } from './styles'

export function History() {
  return (
    <Container>
      <h1>Meu Histórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Ínicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa</td>
              <td>05 minutos</td>
              <td>começou hoje</td>
              <td><Status statusColor='yellow'>Andamento</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>02 minutos</td>
              <td>há 1 semana</td>
              <td><Status statusColor='red'>Interrompido</Status></td>
            </tr>
            <tr>
              <td>Tarefa</td>
              <td>20 minutos</td>
              <td>há 1 mês</td>
              <td><Status statusColor='green'>Concluído</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </Container>
  )
}
