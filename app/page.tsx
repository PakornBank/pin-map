import Image from "next/image";
import styles from "./page.module.css";
import MapComponent from "./ui/MapComponent";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "absolute" }}>
      <MapComponent></MapComponent>
    </div>
  );
}
