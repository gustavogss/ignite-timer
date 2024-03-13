import { Play } from 'phosphor-react'
import { useState } from 'react'
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


export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateSubmit(data: any) {
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
