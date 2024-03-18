import { HandPalm, Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns/differenceInSeconds';

import {
  Container,
  FormContainer,
  CountContainer,
  Sepator,
  StartCountButton,
  StopCountButton,
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

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycle, setCycle] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  const { register, handleSubmit, watch, reset } = useForm<FormData>({
    resolver: zodResolver(schemaFormValidation),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000);
    }
    return () => clearInterval(interval)
  }, [activeCycle])

  function handleCreateSubmit(data: FormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset();
  }

  function handleInterrumpCycle() {
    setActiveCycleId(null);
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`
    }
  }, [minutes, seconds, activeCycle])

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
            disabled={!!activeCycle}
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
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>
        <CountContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Sepator>:</Sepator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountContainer>
        {activeCycle ? (
          <StopCountButton type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountButton>
        ) : (
          <StartCountButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountButton>
        )}

      </form>
    </Container>
  )
}
