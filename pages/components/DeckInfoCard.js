import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useRouter } from 'next/router';


function DeckInfoCard({ name = "default deck", desc = "Description of a deck. Feature will be added later", id = "NULL", owner }) {

  const router = useRouter();

  const delete_deck = async (owner, id) => {
    try {
      await fetch('/api/deleteDeck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: owner, id: id }),
      });

      router.reload();
    } catch (error) {
      console.log("error: ", error);
    }
  }


  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{desc} </p>
        <Link href={"/deckbuild/" + id}>Edit deck</Link>
        <button onClick={() => delete_deck(owner, id)} style={{ background: "none", border: "none", textDecoration: "underline", color: "red" }}>Delete</button>
      </div>
    </div>
  );
}

export default DeckInfoCard;