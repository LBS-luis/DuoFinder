interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface GameBannerProps {  
  game: Game;
  setCurrentGame: (Game: Game | null) => void;
}

export function GameBanner(props: GameBannerProps) {
  const handleSetGame = () => props.setCurrentGame(props.game)

  return (
    <>
      <div className="relative rounded-lg overflow-hidden cursor-pointer" onClick={handleSetGame}>
        <img src={props.game.bannerUrl} alt="" />
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
          <strong className="font-bold text-white block">{props.game.title}</strong>
          <span className="text-zinc-300 text-sm block mt-1">
            {props.game._count.ads > 1
              ? `${props.game._count.ads} anúncios`
              : `${props.game._count.ads} anúncio`}
          </span>
        </div>
      </div>
    </>
  );
}
