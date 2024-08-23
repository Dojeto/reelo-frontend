
import { RefObject, forwardRef, useState } from "react";
import { Slider } from "./ui/slider";
import { IoPlayCircleSharp, IoPlaySkipBackSharp, IoPlaySkipForward, IoPauseCircle } from "react-icons/io5";

type SongInfo = {
    currentTime: number,
    duration: number,
}

type PlayerProps = {
    inputRef: RefObject<HTMLAudioElement>;
    songInfo: SongInfo
    setSongInfo: React.Dispatch<React.SetStateAction<SongInfo>>
}

const Player = forwardRef<HTMLAudioElement, PlayerProps>(({ inputRef, songInfo, setSongInfo }) => {
    const [isPlaying, setPlaying] = useState(false)
    const dragHandler = (e: [number]) => {
        if (inputRef.current) {
            console.log(e)
            inputRef.current.currentTime = e[0];
            setSongInfo({ ...songInfo, currentTime: e[0] })
        }
    };
    function formatTime(seconds: number | undefined) {
        if (!seconds) {
            return "0:00"
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return (
        <div className=" flex flex-col justify-center items-center w-full gap-y-1 p-2">
            <div className=" flex w-3/6">
                <span>{formatTime(inputRef.current?.currentTime)}</span>
                <Slider className=" m-2 border h-2" value={[songInfo.currentTime]} onValueChange={dragHandler} defaultValue={[0]} max={songInfo.duration} step={1} />
                <span>{formatTime(inputRef.current?.duration)}</span>
            </div>
            <div className=" flex gap-x-5">
                <IoPlaySkipBackSharp color="white" size={35} />
                {
                    isPlaying ? <IoPauseCircle color="white" size={35} onClick={
                        () => {
                            inputRef.current?.pause()
                            setPlaying(false)
                        }} /> : <IoPlayCircleSharp onClick={
                            () => {
                                // console.log(inputRef.current?.currentTime)
                                inputRef.current?.play()
                                setPlaying(true)
                            }
                        } color="white" size={35} />
                }

                <IoPlaySkipForward color="white" size={35} />
            </div>
        </div>
    )
})

export default Player
