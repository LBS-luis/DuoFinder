import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { useEffect, useState } from 'react';
import { CreateAdModal } from './components/CreateAdModal';

import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';
import logo from './assets/Logo.svg';
import axios from 'axios';
import env from './env';

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

  useEffect(() => {
    axios(`${url}games`).then((response) => {
      //console.log(data[0])
      setGames(response.data);
    });
  }, []);

  // logo rocket seat <img src={logo} alt="logo" />

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-12">
      <h1 className="text-6xl text-white font-black mt-12">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <Dialog.Root key={game.id}>
              <GameBanner
                key={game.id}
                id={game.id}
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </Dialog.Root>
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  );
}
export default App;
