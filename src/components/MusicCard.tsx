import { RefObject, forwardRef, useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type MusicCardProps = {
  inputRef: RefObject<HTMLAudioElement>;
  link: string;
  name: string;
  artist: string;
  id: string;
};

const url = "https://reelo-backend-production.up.railway.app"

const MusicCard = forwardRef<HTMLAudioElement, MusicCardProps>(
  ({ inputRef, artist, name, link, id }) => {
    const [playlist, setPlaylist] = useState<any[]>([]);

    // Function to change the song
    const ChangeSong = () => {
      if (inputRef.current) {
        inputRef.current.src = link;
        inputRef.current.load();
        inputRef.current.play();
      }
    };

    // Fetch playlist data
    const getPlaylist = async () => {
      try {
        const response = await fetch(`${url}/get-playlist`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch playlist");
        const data = await response.json();
        setPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    // Fetch playlist on component mount
    useEffect(() => {
      getPlaylist();
    }, []);
    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const selectedPlaylists = e.currentTarget.querySelector(
        'input[name="playlist"]:checked'
        //@ts-ignore
      )?.value;
      console.log("asdf", selectedPlaylists);
      console.log("link", id);

      if (!selectedPlaylists) {
        alert("Please select at least one playlist.");
        return;
      }

      try {
        const response = await fetch(`${url}/add-song`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: selectedPlaylists,
            id: id,
          }),
        });
        console.log(response);

        if (!response.ok) throw new Error("Failed to add songs to playlist");

        const result = await response.json();
        alert("Songs added to playlist successfully!");
        console.log(result);
      } catch (error) {
        console.error("Error adding songs to playlist:", error);
      }
    };

    return (
      <div className="bg-gray-900 shadow-lg rounded p-3">
        <div className="group relative">
          <img
            className="w-full md:w-72 block rounded"
            src="https://upload.wikimedia.org/wikipedia/en/f/f1/Tycho_-_Epoch.jpg"
            alt=""
          />
          <div className="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button
              onClick={ChangeSong}
              className="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-play-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="p-5">
            <h3 className="text-white text-lg">{name}</h3>
            <p className="text-gray-400">{artist}</p>
          </div>
          <Dialog>
            <DialogTrigger>
              {" "}
              <CiBookmark color="white" size={20} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save songs in:</DialogTitle>
                <DialogDescription>
                  <form onSubmit={handleForm}>
                    {playlist.map((v) => (
                      <div key={v._id}>
                        <input
                          type="radio"
                          id={v._id}
                          name="playlist"
                          value={v.name}
                        />
                        <label htmlFor={v.name}>{v.name}</label>
                        <br />
                      </div>
                    ))}
                    <input
                      type="submit"
                      value="Submit"
                      className="bg-black px-4 py-2 text-white rounded-md"
                    />
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
);

export default MusicCard;
