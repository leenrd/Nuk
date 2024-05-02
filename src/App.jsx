import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

function App() {
  const [bombRadius, setBomb] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [loc, setLoc] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLoc((prev) => {
              prev.lat = position.coords.latitude;
              prev.lng = position.coords.longitude;
              return prev;
            });
            setLoading(false);
            console.log(loc);
          },
          (error) => {
            setError(error.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, [loc]);

  const handleBomb = () => {
    switch (bombRadius) {
      case "ab":
        setBomb(10000);
        console.log(bombRadius);
        break;
      case "tb":
        setBomb(100000);
        break;
      case "nb":
        setBomb(5000);
        break;
      case "db":
        setBomb(1000);
        break;
      case "tnb":
        setBomb(10000);
        break;
      case "snb":
        setBomb(100000);
        break;
      case "erw":
        setBomb(10000);
        break;
      case "sb":
        setBomb(10000);
        break;
      default:
        setBomb(10000);
    }
  };

  const icon = new Icon({
    iconUrl: "nuclear-bomb.png",
    iconSize: [38, 38],
  });

  const handleChange = (e) => {
    setBomb(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="my-12 flex items-center justify-center flex-col">
      <header className=" flex flex-col items-center justify-center">
        <h1 className="leading-3 text-lg my-14 font-semibold">
          🤯 Nuclear Casualty and Radius Simulator (Are you safe?)
        </h1>
        <div className="flex gap-3">
          <select
            name="select"
            className="min-w-[30rem] rounded-md border bg-slate-50 border-slate-200 py-2 px-6"
            onChange={handleChange}
          >
            <option value="ab">Atomic Bomb (A-Bomb)</option>
            <option value="tb">Thermonuclear Bomb (H-Bomb)</option>
            <option value="nb">Neutron Bomb</option>
            <option value="db">Dirty Bomb (RDD)</option>
            <option value="tnb">Tactical Nuclear Bomb</option>
            <option value="snb">Strategic Nuclear Bomb</option>
            <option value="erw">Enhanced Radiation Weapon (ERW)</option>
            <option value="sb">Salted Bomb</option>
          </select>
          <button
            type="submit"
            className="bg-black text-white font-bold rounded-md py-2 px-6"
            onClick={handleBomb}
          >
            Nuke
          </button>
        </div>
        {error && <p className="text-red-500 font-semibold">{error}</p>}
      </header>
      <section>
        {loading ? (
          <p className="my-16 font-semibold">
            Loading... Please accept the browser location permission...
          </p>
        ) : (
          <MapContainer
            center={loc}
            zoom={13}
            // scrollWheelZoom={false}
            className="h-[30rem] w-[80rem] rounded-md border border-slate-200 my-8"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!bombRadius ? null : (
              <Circle
                center={loc}
                pathOptions={{ color: "red" }}
                radius={bombRadius}
              />
            )}
            <Marker position={loc} icon={icon}>
              <Popup>Yup. You&apos;re dead</Popup>
            </Marker>
          </MapContainer>
        )}
      </section>
    </div>
  );
}

export default App;