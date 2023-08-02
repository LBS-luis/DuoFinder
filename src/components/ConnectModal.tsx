import * as Dialog from '@radix-ui/react-dialog';
import { useState, FormEvent } from 'react';
import axios, { Axios } from 'axios';
import env from '../env';
import { GameController } from 'phosphor-react';

interface ConnectModal {
  AdId: string;
}

export function ConnectModal({ AdId }: ConnectModal) {
  const url = env.REACT_APP_API_URL;
  const [discordTag, setDiscordTag] = useState<string>('user#0000');
  axios
    .get(`${url}ads/${AdId}/discord`)
    .then((res) => setDiscordTag(res.data.discord));
  
    const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(discordTag)
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Dialog.Portal className='p-6'>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed p-6" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[350px] w-full shadow-lg shadow-black/25 flex flex-col items-center">
        <Dialog.Title className="font-black flex flex-col items-center">
          <GameController className="w-28 h-28 text-emerald-500" />
          <p className="text-white text-3xl mt-4">Let’s play!</p>
          <p className="text-zinc-500 font-light mt-2">
            Agora é só começar a jogar!
          </p>
        </Dialog.Title>
        <div className="flex flex-col mt-10">
          <p className="text-white text-xl font-light">Adicione no Discord</p>
          <div
            className="py-3 px-4 bg-zinc-900 flex justify-center align-middle rounded-md mt-4 cursor-pointer"
            onClick={handleCopy}
          >
            <a className={`${copied ? "text-emerald-500" : "text-zinc-200"}`}>{copied ? 'copiado!' : discordTag}</a>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
