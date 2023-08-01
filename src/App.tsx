import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/CreateAdModal';

import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';
import axios from 'axios';
import env from './env';
import logo from '/logo.svg';
import { ConnectToDuo } from './components/ConnectToDuo';

function App() {
  interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    };
  }
  const url = env.REACT_APP_API_URL;
  const [games, setGames] = useState<Game[]>([]);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);

  useEffect(() => {
    axios(`${url}games`).then((response) => {
      //console.log(data[0])
      setGames(response.data);
    });
  }, []);

  const HomePage = () => {
    return (
      <>
        <h1 className="text-6xl text-white font-black mt-10">
          Seu{` `}
          <span className="text-transparent bg-nlw-gradient bg-clip-text">
            duo{` `}
          </span>
          está aqui.
        </h1>

        <div className="grid grid-cols-6 gap-6 mt-16">
          {games.map((game) => {
            return (
              <GameBanner
                key={game.id}
                game={game}
                setCurrentGame={setCurrentGame}
              />
            );
          })}
        </div>

        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal games={games} />
        </Dialog.Root>
      </>
    );
  };

  const DuoPicker = () => {
    return (
      <div className="flex flex-row mt-10 w-full space-x-10">
        <img
          src={currentGame?.bannerUrl}
          className="max-w-xs rounded-md object-fill"
        />
        <div className="w-full space-y-4">
          <div className="space-y-0 w-fit">
            <h2 className="text-3xl text-white font-black">
              {currentGame?.title}
            </h2>
            <p className="text-zinc-500 text-base">
              Conecte-se e comece a jogar!
            </p>
          </div>
          <div className="max-w-5xl flex flex-row overflow-hidden gap-3">
            <DuoCard />
          </div>
        </div>
      </div>
    );
  };

  const DuoCard = () => {
    interface IAd {
      id: string;
      name: string;
      weekDays: Array<number>;
      useVoiceChannel: boolean;
      yearsPlaying: number;
      hourStart: string;
      hourEnd: string;
    }
    const [currentGameAds, setCurrentGameAds] = useState<Array<IAd>>([]);
    useEffect(() => {
      if (currentGame)
        axios(`${url}game/${currentGame.id}/ads`).then((res) =>
          setCurrentGameAds(res.data)
        );
    }, [currentGame]);
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
              </Dialog.Root>
            </div>
          ))}
      </>
    );
  };

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-12">
      <img
        src={logo}
        className="w-32 cursor-pointer hover:scale-95 transition"
        onClick={() => setCurrentGame(null)}
      />
      {currentGame === null ? <HomePage /> : <DuoPicker />}
    </div>
  );
}
export default App;
