import { useEffect, useState } from 'react';

export default function Deckbuild() {
    const [query, setQuery] = useState('');
    const jwt = require("jsonwebtoken");

    const search = async (e) => {
        e.preventDefault();
        
        await fetch(`https://api.scryfall.com/cards/search?q="${query}"`)
        .then((res)=> res.json())
        .then((obj)=>{
            obj.data.forEach((element)=>{
                console.log(element.image_uris.normal);
                console.log(element.name);
                
            });
        });
    }

    return (
        <>
            <div className="input-group">
                <form class="form-inline my-2 my-lg-0" onSubmit={search}>
                    <input id="search_bar" class="form-control mr-sm-2" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}  />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </>
    );
}
