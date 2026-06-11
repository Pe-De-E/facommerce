### toDo's

**Home**

- `useState & useEffect`
- Alle Produkte von `https://fakestoreapi.com/products` fetchen
- Produkte im State speichern und als Grid rendern
- Jede Karte => Link zur Detailseite + "Add to cart" Button

**ProductDetail**

- `useParams` → `id` aus der URL lesen
- Produkt von `https://fakestoreapi.com/products/:id` fetchen
- Produkt anzeigen
- "Go Back"-Button mit `navigate(-1)`

**Cart** _(optional)_

- `CartContext` mit `CartProvider` erstellen
- `addToCart`, `removeFromCart`, `changeQty` im Context bereitstellen
- `CartProvider` in `App.jsx` einbauen
- In jeder Seite über `useCart()` auf den Warenkorb zugreifen
