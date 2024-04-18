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
<div className="card" style={{ width: "18rem", backgroundColor: "#f5f5dc", border: "1px solid #deb887", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.2)", marginBottom: "20px", marginRight: '20px', alignContent:'center'}}>
      <div className="card-body">
        <h5 className="card-title" style={{ color: "#8b4513", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>{name}</h5>
        <p className="card-text" style={{ color: "#8b4513", fontStyle: "italic", marginBottom: "1rem" }}>{desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link href={"/deckbuild/" + id} style={{ textDecoration: "none", color: "#8b4513", fontWeight: "bold" }}>Edit deck</Link>
          <button onClick={() => delete_deck(owner, id)} style={{ background: "none", border: "none", textDecoration: "underline", color: "red", cursor: "pointer" }}>Delete</button>
        </div>
      </div>
    </div>
    
  );
}

export default DeckInfoCard;
