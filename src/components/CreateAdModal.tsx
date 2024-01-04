import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'
import { Input } from './Form/Input'
import { useState, FormEvent } from 'react'
import axios from 'axios'
import env from '../env'

interface CreateAdModalProps {
  games: {
    id: string
    title: string
    bannerUrl: string
    _count: {
      ads: number
    }
  }[]
}

export function CreateAdModal(props: CreateAdModalProps) {
  const url = env.REACT_APP_API_URL
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    const ad = { ...data, weekDays, useVoiceChannel }

    try {
      axios.post(`${url}game/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel,
      })

      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      
        <Dialog.Content className="absolute bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[600px] w-full shadow-lg shadow-black/25">
          <Dialog.Title className="text-3xl text-white font-black">
            Publique Um anúncio
          </Dialog.Title>

          <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="game" className="font-semibold ">
                Qual o game?
              </label>
              <select
                id="game"
                name="game"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                defaultValue=""
              >
                <option disabled value="">
                  Selecione o game que desejar jogar
                </option>

                {props.games.map((game) => {
                  return (
                    <option key={game.id} value={game.id}>
                      {game.title}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nickname</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Qual seu Nickname dentro do jogo?"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                <Input
                  id="yearsPlaying"
                  name="yearsPlaying"
                  type="number"
                  placeholder="Tudo bem ser zero"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="discord">Qual seu discord?</label>
                <Input
                  id="discord"
                  name="discord"
                  type="text"
                  placeholder="Usuário#0000"
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col gap2">
                <label htmlFor="weekDays">Quando costuma jogar?</label>
                <div>
                  <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-2"
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item
                      value="0"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Domingo"
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Sengunda"
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Terça"
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Quarta"
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Quinta"
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Sexta"
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6"
                      className={`w-8 h-8 rounded ${
                        weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                      }`}
                      title="Sabado"
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root>
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="hourStart">Qual horário do dia?</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="time"
                    id="hourStart"
                    name="hourStart"
                    placeholder="De"
                  />
                  <Input
                    type="time"
                    id="hourEnd"
                    name="hourEnd"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>
            <label className="mt-2 flex gap-2 text-sm items-center">
              <Checkbox.Root
                checked={useVoiceChannel}
                onCheckedChange={(Checked) => {
                  Checked === true
                    ? setUseVoiceChannel(true)
                    : setUseVoiceChannel(false)
                }}
                className="w-6 h-6 p-1 rounded bg-zinc-900"
              >
                <Checkbox.Indicator className="">
                  <Check className="w-4 h-4 text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>
            <footer className="mt-4 flex justify-end gap-4">
              <Dialog.Close className="mt-4 bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                Cancelar
              </Dialog.Close>
              <button
                type="submit"
                className="bg-[#ff2aa1]/90 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-[#d6368f] mt-4"
              >
                Encontrar duo
                <GameController className="w-6 h-6" />
              </button>
            </footer>
          </form>
        </Dialog.Content>      
    </Dialog.Portal>
  )
}
