import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export function ConnectToDuo() {
  return (
    <Dialog.Trigger className="w-full py-3 px-4 mt-2 bg-[#ff2aa1]/90 text-white rounded hover:bg-[#d6368f]/90 flex justify-center gap-3">
      <GameController className="w-6 h-6" />
      Conectar
    </Dialog.Trigger>
  );
}
