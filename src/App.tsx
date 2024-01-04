import { CreateAdBanner } from './components/CreateAdBanner'
import { GameBanner } from './components/GameBanner'
import { useEffect, useState } from 'react'
import { CreateAdModal } from './components/CreateAdModal'

import * as Dialog from '@radix-ui/react-dialog'

import './styles/main.css'
import axios from 'axios'
import env from './env'
import logo from '/logo.svg'
import minLogo from '/min-logo.svg'
import CaretLeft from '/left-arrow.svg'
import { ConnectToDuo } from './components/ConnectToDuo'
import { ConnectModal } from './components/ConnectModal'

function App() {
  interface Game {
    id: string
    title: string
    bannerUrl: string
    _count: {
      ads: number
    }
  }
  const url = env.REACT_APP_API_URL
  const [games, setGames] = useState<Game[]>([])
  const [currentGame, setCurrentGame] = useState<Game | null>(null)

  useEffect(() => {
    axios(`${url}games`).then((response) => {
      //console.log(data[0])
      setGames(response.data)
    })
  }, [])

  const HomePage = () => {
    return (
      <>
        <h1 className=" text-4xl md:text-6xl text-white font-black mt-2 md:mt-10">
          Seu{` `}
          <span className="text-transparent bg-nlw-gradient bg-clip-text">
            duo{` `}
          </span>
          está aqui.
        </h1>

        <div
          className={`flex md:h-[25rem] items-center overflow-x-auto mt-3 md:mt-16 md:overflow-y-auto`}
        >
          {games.map((game) => (
            <div key={game.id} className="flex-shrink-0 mx-2">
              <GameBanner
                game={game}
                setCurrentGame={setCurrentGame}
                imgStyles="h-[18rem] md:h-full"
              />
            </div>
          ))}
        </div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal games={games} />
        </Dialog.Root>
      </>
    )
  }

  const DuoPicker = () => {
    return (
      <>
        <div className="flex md:flex-row flex-col w-full box-border mt-8 md:mt-10">
          <div className="h-[180px] overflow-hidden md:w-[280px] flex justify-center md:h-[380px] md:mt-6">
            <img
              src={currentGame?.bannerUrl}
              className="rounded-xl w-[280px] h-[380px]"
              alt="Game Banner"
            />
          </div>
          <div className="ml-4">
            <div className=" flex flex-col w-fit ml-4 md:ml-0 self-start mt-6">
              <h2 className="text-3xl text-white font-black">
                {currentGame?.title}
              </h2>
              <p className="text-zinc-300 text-base">
                Conecte-se e comece a jogar!
              </p>
            </div>

            <div className="flex flex-row mt-4 box-border px-4 md:px-0 w-full md:max-w-[760px] max-h-[650px] overflow-y-auto">
              <div className=" flex flex-row gap-3 md:flex-wrap">
                <DuoCard />
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const DuoCard = () => {
    interface IAd {
      id: string
      name: string
      weekDays: Array<number>
      useVoiceChannel: boolean
      yearsPlaying: number
      hourStart: string
      hourEnd: string
    }

    const [currentGameAds, setCurrentGameAds] = useState<Array<IAd>>([])
    useEffect(() => {
      if (currentGame)
        axios(`${url}game/${currentGame.id}/ads`).then((res) =>
          setCurrentGameAds(res.data),
        )
    }, [currentGame])
    return (
      <>
        {currentGameAds.length > 0 &&
          currentGameAds.map((Ad, index) => (
            <div
              key={index}
              className="rounded-md w-60 h-[304px] bg-[#2A2634] flex flex-col items-start p-5 gap-2"
            >
              <div className="w-fit h-fit text-left">
                <h4 className="text-zinc-400 text-sm">Nickname</h4>
                <p className="text-zinc-200 text-base font-medium">{Ad.name}</p>
              </div>
              <div className="w-fit h-fit text-left">
                <h4 className="text-zinc-400 text-sm">Tempo de jogo</h4>
                <p className="text-zinc-200 text-base font-medium">{`${Ad.yearsPlaying} anos`}</p>
              </div>
              <div className="w-fit h-fit text-left">
                <h4 className="text-zinc-400 text-sm">Disponibilidade</h4>
                <p className="text-zinc-200 text-base font-medium">{`${Ad.weekDays.length} dias | ${Ad.hourStart} - ${Ad.hourEnd}`}</p>
              </div>
              <div className="w-fit h-fit text-left">
                <h4 className="text-zinc-400 text-sm">Chamada de áudio?</h4>
                <p
                  className={`${
                    Ad.useVoiceChannel === true
                      ? 'text-emerald-400'
                      : 'text-red-400'
                  } text-base font-medium`}
                >{`${Ad.useVoiceChannel === true ? 'Sim' : 'Não'}`}</p>
              </div>
              <Dialog.Root>
                <ConnectToDuo />
                <ConnectModal AdId={Ad.id} />
              </Dialog.Root>
            </div>
          ))}
      </>
    )
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center mt-2">
      {currentGame === null ? (
        <>
          <img
            src={logo}
            className="w-24 md:w-32 cursor-pointer hover:scale-95 transition"
          />
          <HomePage />
        </>
      ) : (
        <>
          <div className="w-full flex flex-row items-center">
            <img
              src={CaretLeft}
              className="md:opacity-0 text-white text-[3rem] ml-4 mr-[-3rem] cursor-pointer"
              onClick={() => setCurrentGame(null)}
            />
            <img
              src={minLogo}
              className="mx-auto w-12 md:w-20 transition cursor-pointer"
              onClick={() => setCurrentGame(null)}
            />
          </div>
          <DuoPicker />
        </>
      )}
    </div>
  )
}
export default App
