import { MagnifyingGlassPlus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
    return (
        <div className='pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8'>
        <div className='bg-[#2a2634] px-8 py-6 flex justify-between items-center flex-col space-y-3 md:flex-row'>
          <div>
            <strong className='text-2xl text-white font-black'>Não encontrou seu duo?</strong><br/>
            <span className='text-zinc-400'>Publique um anúncio para encontrar novos players</span>
          </div>

          <Dialog.Trigger className='py-3 px-4 bg-[#ff2aa1]/90 text-white rounded hover:bg-[#d6368f]/90 flex items-center gap-3'>
            <MagnifyingGlassPlus size={24}/>
              Públicar anúncio
          </Dialog.Trigger>

        </div>
      </div>
    )
}