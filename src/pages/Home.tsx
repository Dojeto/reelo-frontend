import React from "react";
import { useRef, useState, useEffect } from "react";
import PlayingCard from "@/components/PlayingCard";
import Player from "@/components/Player";
import Navbar from "@/components/Navbar";
import MusicCard from "@/components/MusicCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const url = "https://reelo-backend-production.up.railway.app/";

const Home: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [songInfo, setSongInfo] = useState({
        currentTime: localStorage.getItem("songs") ? JSON.parse(localStorage.getItem("songs") as string).current : 0,
        duration: 0,
    });

  const [user, setUser] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [songs, setSongs] = useState([]);
  const [newplaylist, setNewPlaylist] = useState("");

  const getUser = async () => {
    const response = await fetch(`${url}/is-verified`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    if(response.status != 200){
        return
    }
    const data = await response.json();
    setUser(data);
  };

  const getPlaylist = async () => {
    const response = await fetch(`${url}/get-playlist`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    setPlaylist(data);
  };

  const getSongs = async () => {
    const response = await fetch(`${url}/songs`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    setSongs(data);
  };

  const AddPlayList = async () => {
    if (newplaylist == "") {
      return;
    }
    await fetch(`${url}/create-playlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ name: newplaylist }),
    });
    location.href = "/";
  };
  const SelectPlaylist = async (v: string) => {
    console.log(v);
    const response = await fetch(`${url}/playlist-songs`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ name: v }),
    });
    const data = await response.json();
    setSongs(data[0].songs);
  };
  useEffect(() => {
    getUser();
    getSongs();
    getPlaylist();
  }, []);

  const timeMetaDataHandler =(e: React.ChangeEvent<any>) => {
    const duration = e.target.duration;
    setSongInfo({
      currentTime: localStorage.getItem("songs") ? JSON.parse(localStorage.getItem("songs") as string).current : 0,
      duration,
    });
    if (audioRef.current) {
        const savedSong = localStorage.getItem("songs");
        if (savedSong) {
            const { current } = JSON.parse(savedSong);
            audioRef.current.currentTime = current; // Set the currentTime
        }
    }
  };

  const timeUpdateHandler = (e: React.ChangeEvent<any>) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    localStorage.setItem("songs",JSON.stringify({
        current:e.target.currentTime,
        src: audioRef.current?.src
    }))
    setSongInfo({
      currentTime: current,
      duration,
    });
  };
  return (
    <div className=" bg-gray-900 ">
      <Navbar login={user ? false : true} />
      <div className=" flex h-screen ">
        <div className=" text-white w-1/4 bg-black bg-opacity-30 pt-20">
          {user ? (
            <>
              <h1 className=" pt-7 text-center font-bold text-lg">
                Your PlayList
              </h1>
              {playlist.map((v) => {
                return (
                  <div
                    onClick={() => {
                      SelectPlaylist(v["name"]);
                    }}
                    className=" p-2 mt-8 w-full cursor-pointer bg-white bg-opacity-15 h-10 flex items-center"
                  >
                    {v["name"]}
                  </div>
                );
              })}
            </>
          ) : (
            <h2 className=" m-3 font-bold">Please Login For PlayList</h2>
          )}
          <Dialog>
            <DialogTrigger className=" mt-4 ml-20" asChild>
              <Button variant="destructive">Create PlayList</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Playlist</DialogTitle>
                <DialogDescription>Write your playlist name</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Playlist Name
                  </Label>
                  <Input
                    onChange={(e) => {
                      setNewPlaylist(e.target.value);
                    }}
                    id="name"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button onClick={AddPlayList} type="submit">
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <section className=" mt-24 grid grid-cols-1 sm:grid-cols-5 gap-4 max-h-screen overflow-y-scroll w-fit no-scrollbar">
          {songs.map((v) => {
            return (
              <div>
                <MusicCard
                  inputRef={audioRef}
                  link={v["link"]}
                  name={v["name"]}
                  artist={v["artist"]}
                  id={v["_id"]}
                />
              </div>
            );
          })}
        </section>
      </div>
      <audio
        ref={audioRef}
        onLoadedMetadata={timeMetaDataHandler}
        onTimeUpdate={timeUpdateHandler}
        src="https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/race2.ogg"
      ></audio>
      <div className=" flex fixed bottom-0 left-0 w-full bg-black bg-opacity-80 p-1 text-white">
        <PlayingCard />
        <Player
          songInfo={songInfo}
          setSongInfo={setSongInfo}
          inputRef={audioRef}
        />
      </div>
    </div>
  );
};

export default Home;
