import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [guns, setGuns] = useState([]);
  const [nades, setNades] = useState([]);
  const [selectedNades, setSelectedNades] = useState([]);
  const [side, setSide] = useState("TR");
  const [primaryWeapon, setPrimaryWeapon] = useState([]);
  const [secondaryWeapon, setSecondaryWeapon] = useState("Primary weapon");

  const getGuns = () => {
    axios.get("/api/guns").then((res) => {
      setGuns(res.data);
    });
  };

  const getNades = () => {
    axios.get("/api/grenades").then((res) => {
      setNades(res.data);
    });
  };

  const findNade = (nade) => {
    const nadeSelected = selectedNades.find(
      (selectedNade) => selectedNade["name"] === nade.name
    );
    if (nadeSelected) return true;

    return false;
  };

  useEffect(() => {
    getGuns();
    getNades();
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <div className="flex items-end gap-2 mb-6">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Player name"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Side</span>
            </label>
            <select
              onChange={(e) => {
                setSide(e.target.value);
              }}
              value={side}
              className={
                side == "TR"
                  ? "select select-bordered border-warning"
                  : "select select-bordered border-primary"
              }
            >
              <option value="TR">TR</option>
              <option value="CT">CT</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Guns & Nades</span>
              </label>
              <select
                onChange={(e) => {
                  setPrimaryWeapon(e.target.value);
                }}
                value={primaryWeapon.name}
                className={`select select-bordered ${
                  side == "TR" ? "border-warning" : "border-primary"
                }`}
              >
                {guns
                  .filter(
                    (gun) =>
                      gun.type == "primary" &&
                      (gun.side == side || gun.side == "BOTH")
                  )
                  .map((gun) => {
                    return (
                      <option value={gun} key={gun.name}>
                        {gun.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <select
                onChange={(e) => {
                  setSecondaryWeapon(e.target.value);
                }}
                value={secondaryWeapon.name}
                className={`select select-bordered ${
                  side == "TR" ? "border-warning" : "border-primary"
                }`}
              >
                {guns
                  .filter(
                    (gun) =>
                      gun.type == "secondary" &&
                      (gun.side == side || gun.side == "BOTH")
                  )
                  .map((gun) => {
                    return (
                      <option value={gun} key={gun.name}>
                        {gun.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="dropdown dropdown-right dropdown-end">
              <label
                tabIndex="0"
                className={`btn bg-gray-900 border-secondary justify-start normal-case w-full`}
              >
                Select your nades
              </label>
              <ul
                tabIndex="0"
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ml-2"
              >
                {nades
                  .filter((nade) => nade.side == side || nade.side == "BOTH")
                  .map((nade) => {
                    return (
                      <div key={nade.name} className="form-control">
                        <label className="label cursor-pointer">
                          <span className="label-text">{nade.name}</span>
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (
                                e.target.checked &&
                                selectedNades.length < 4
                              ) {
                                setSelectedNades((oldArray) => [
                                  ...oldArray,
                                  nade,
                                ]);
                              } else {
                                setSelectedNades(
                                  selectedNades.filter(
                                    (nadeS) => nadeS.name !== nade.name
                                  )
                                );
                              }
                            }}
                            checked={findNade(nade)}
                            className="checkbox"
                          />
                        </label>
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">CURRENT MONEY</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="overflow-x-auto max-w-4xl w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Guns</th>
                <th>Kills</th>
                <th>Last money</th>
                <th>Loss</th>
                <th>Next money</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <div className="font-semibold">Hart Hagerty</div>
                </th>
                <td>
                  <div className="inline-flex w-max">
                    <img
                      src="/csgo/weapon_glock.svg"
                      className="h-4 weapon-TR-mask"
                    ></img>
                    <img
                      src="/csgo/weapon_ak47.svg"
                      className="h-6 weapon-TR-mask"
                    ></img>
                  </div>
                  <div className="flex gap-1">
                    <img
                      className="h-4 weapon-mask"
                      src="/csgo/weapon_hegrenade.svg"
                    ></img>
                    <img
                      className="h-4 weapon-mask"
                      src="/csgo/weapon_molotov.svg"
                    ></img>
                    <img
                      className="h-4 weapon-mask"
                      src="/csgo/weapon_smokegrenade.svg"
                    ></img>
                    <img
                      className="h-4 weapon-mask"
                      src="/csgo/weapon_flashbang.svg"
                    ></img>
                    <img
                      className="ml-auto h-4 weapon-mask"
                      src="/csgo/item_assaultsuit.svg"
                    ></img>
                  </div>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">3 KILLS</button>
                </td>
                <td>
                  <div className="font-semibold">$4000</div>
                </td>
                <td>
                  <div className="font-bold text-accent">2</div>
                  <div className="stat-desc">+ $1900</div>
                </td>
                <td>
                  <div className="font-semibold text-green-500">$4000</div>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Name</th>
                <th>Guns</th>
                <th>Kills</th>
                <th>Last money</th>
                <th>Loss</th>
                <th>Next money</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
