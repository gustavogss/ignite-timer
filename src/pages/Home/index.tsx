import { Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form';

import {
  Container,
  FormContainer,
  CountContainer,
  Sepator,
  StartButton,
  TaskInput,
  MinutesAmountInput,
} from './styles'

const schemaFormValidation = zod.object({
  task: zod.string().min(1, 'Irforme a tarefa').max(255),
  minutesAmount: zod.number()
    .min(5, 'O ciclo tem que ser no mínimo de 5 minutos')
    .max(60, 'O ciclo tem que ser no máximo de 60 minutos'),
})

type FormData = zod.infer<typeof schemaFormValidation>

export function Home() {
  const { register, handleSubmit, watch } = useForm<FormData>({
    resolver: zodResolver(schemaFormValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateSubmit(data: FormData) {
    console.log(data);
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <Container>
      <form action="" onSubmit={handleSubmit(handleCreateSubmit)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para seu projeto"
            list='task-sugestion'
            {...register('task')}
          />
          <datalist id='task-sugestion'>
            <option value="Projeto1" />
            <option value="Projeto2" />
            <option value="Projeto3" />
            <option value="Projeto4" />
            <option value="Projeto5" />
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountContainer>
          <span>0</span>
          <span>0</span>
          <Sepator>:</Sepator>
          <span>0</span>
          <span>0</span>
        </CountContainer>

        <StartButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </Container>
  )
}
