import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

function DeckInfoCard( {name = "default deck", desc = "Description of a deck. Feature will be added later", id = "NULL"}) {
  return (
    <div className="card" style={{width: "18rem"}}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{desc} </p>
        <Link href={"/deckbuild/" + id}>Edit deck</Link>
      </div>
    </div>
  );
}

export default DeckInfoCard;