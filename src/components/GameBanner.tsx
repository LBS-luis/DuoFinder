import * as Dialog from "@radix-ui/react-dialog"
import { GetAdsModal } from "./GetAdsModal"

interface GameBannerProps{
    bannerUrl: string
    title: string
    adsCount: Number
    id: string
}

export function GameBanner(props: GameBannerProps) {
    return (  
      <>
      <Dialog.Trigger className='relative rounded-lg overflow-hidden'>
          <img src={props.bannerUrl} alt="" />
          <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
            <strong className='font-bold text-white block'>{props.title}</strong>
            <span className='text-zinc-300 text-sm block mt-1'>{ props.adsCount > 1 ? `${props.adsCount} anúncios`:`${props.adsCount} anúncio`}</span>
          </div>
        </Dialog.Trigger>
        <GetAdsModal title={props.title} id={props.id} adsCount={props.adsCount}/>
        </>
    )
}