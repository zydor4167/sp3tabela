import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [pracownicy] = useState([
    { id: 1, imie: 'Anna', nazwisko: 'Kowalska', dzial: 'IT', pensja: 7200 },
    { id: 2, imie: 'Piotr', nazwisko: 'Nowak', dzial: 'Sprzedaż', pensja: 5400 },
    { id: 3, imie: 'Maria', nazwisko: 'Wiśniewska', dzial: 'Księgowość', pensja: 6100 },
    { id: 4, imie: 'Jan', nazwisko: 'Kowalczyk', dzial: 'IT', pensja: 8000 },
    { id: 5, imie: 'Katarzyna', nazwisko: 'Zielińska', dzial: 'Sprzedaż', pensja: 5900 },
    { id: 6, imie: 'Tomasz', nazwisko: 'Szymański', dzial: 'IT', pensja: 9100 },
    { id: 7, imie: 'Agnieszka', nazwisko: 'Woźniak', dzial: 'Księgowość', pensja: 6400 },
    { id: 8, imie: 'Michał', nazwisko: 'Kaczmarek', dzial: 'Sprzedaż', pensja: 5200 },
    { id: 9, imie: 'Magdalena', nazwisko: 'Mazur', dzial: 'IT', pensja: 7500 },
    { id: 10, imie: 'Daniel', nazwisko: 'Krawczyk', dzial: 'Księgowość', pensja: 6000 },
    { id: 11, imie: 'Joanna', nazwisko: 'Piotrowska', dzial: 'Sprzedaż', pensja: 5600 },
    { id: 12, imie: 'Łukasz', nazwisko: 'Grabowski', dzial: 'IT', pensja: 8700 }
  ]);

  const [szukanaFraza, setSzukanaFraza] = useState('');
  const [wybranyDzial, setWybranyDzial] = useState('');

  const przefiltrowaniPracownicy = pracownicy.filter((p) => {
    const znormalizowanaFraza = szukanaFraza.trim().toLowerCase();
    const pasujeNazwisko = p.nazwisko.toLowerCase().includes(znormalizowanaFraza);
    const pasujeDzial = wybranyDzial === '' || p.dzial === wybranyDzial;

    return pasujeNazwisko && pasujeDzial;
  });

  const obslozZmianeFrazy = (e) => {
    const nowaFraza = e.target.value;
    setSzukanaFraza(nowaFraza);
    
    const znormalizowana = nowaFraza.trim().toLowerCase();
    const wyn = pracownicy.filter((p) => {
      const pasujeNazwisko = p.nazwisko.toLowerCase().includes(znormalizowana);
      const pasujeDzial = wybranyDzial === '' || p.dzial === wybranyDzial;
      return pasujeNazwisko && pasujeDzial;
    });
    console.log(`Wyniki: ${wyn.length}`);
  };

  const obslozZmianeDzialu = (e) => {
    const nowyDzial = e.target.value;
    setWybranyDzial(nowyDzial);

    const znormalizowana = szukanaFraza.trim().toLowerCase();
    const wyn = pracownicy.filter((p) => {
      const pasujeNazwisko = p.nazwisko.toLowerCase().includes(znormalizowana);
      const pasujeDzial = nowyDzial === '' || p.dzial === nowyDzial;
      return pasujeNazwisko && pasujeDzial;
    });
    console.log(`Wyniki: ${wyn.length}`);
  };

  return (
    <div className="container mt-4">
      <h2>Pracownicy</h2>

      <div className="mb-3">
        <label htmlFor="szukaj" className="form-label">
          Szukaj:
        </label>
        <input
          type="text"
          className="form-control"
          id="szukaj"
          value={szukanaFraza}
          onChange={obslozZmianeFrazy}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="dzial" className="form-label">
          Dział:
        </label>
        <select
          className="form-select"
          id="dzial"
          value={wybranyDzial}
          onChange={obslozZmianeDzialu}
        >
          <option value="">Wszystkie</option>
          <option value="IT">IT</option>
          <option value="Sprzedaż">Sprzedaż</option>
          <option value="Księgowość">Księgowość</option>
        </select>
      </div>

      <p>Liczba pracowników: {przefiltrowaniPracownicy.length}</p>

      {przefiltrowaniPracownicy.length > 0 ? (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">Imię</th>
              <th scope="col">Nazwisko</th>
              <th scope="col">Dział</th>
              <th scope="col">Pensja</th>
            </tr>
          </thead>
          <tbody>
            {przefiltrowaniPracownicy.map((p) => (
              <tr key={p.id}>
                <td>{p.imie}</td>
                <td>{p.nazwisko}</td>
                <td>{p.dzial}</td>
                <td>{p.pensja}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning" role="alert">
          Brak pracowników spełniających kryteria
        </div>
      )}
    </div>
  );
}

export default App;
