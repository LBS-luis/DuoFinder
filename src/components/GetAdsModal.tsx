import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { useEffect, useState } from "react";
import env from '../env';


interface GetAdsModalProps{
    title: string
    adsCount: Number
    id: string
}

interface Ads {    
    id: string,
    name: string,
    weekDays: Array<string>,
    useVoiceChannel: boolean,
    yearsPlaying: number,
    hourStart: string,
    hourEnd: string
} []



export function GetAdsModal (props: GetAdsModalProps) {
    const [ads, setAds] = useState<Ads[]>([])
    const url = env.REACT_APP_API_URL
    
    useEffect(() => {
      axios(`${url}game/${props.id}/ads`)
      .then(response => {
        setAds(response.data)
      })
    },[])

    return (
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/10 inset-0 fixed'/>
          <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-3xl text-white font-black'><p><a className='text-transparent bg-nlw-gradient bg-clip-text'>Duos</a> para<br/>{`${props.title}`}</p></Dialog.Title>
          <div className="w-full text-right text-zinc-400">{`${props.adsCount} anúncios`}</div>
          <div className="mt-8">
          {
            ads.map(ad =>{
                return(
                    <div className="mt-2 w-fit p-2 border-2 border-solid border-zinc-400 rounded-md float-left mx-1" key={ad.id}>
                        <p>
                            {`Duo: ${ad.name} xp: ${ad.yearsPlaying}y`}
                        </p>
                    </div>
                )
            })
          }
          </div>

          </Dialog.Content>
        </Dialog.Portal>
    )
}