import { useEffect, useState } from 'react'
import './App.css'
import Start from './pages/Start';
import Activities from './pages/Activities';
import ActSessions from './pages/ActSessions';
import Menu from './Menu';

function App() {

  const[page, setPage] = useState<string>("");

//UseEffekt för att skapa URL (eftyersom det är en SPA-app) så att vi t.ex kan kopiera och dela länkar,
// få historik mm:
  useEffect(() => {
//Mutable variabel för att lagra URL:
    let pageUrl = page;
//Om den är tom så tar vi den från url-fältet:
    if(!pageUrl) {
      const queryParams = new URLSearchParams(window.location.search);
      const getUrl = queryParams.get("page");

      if (getUrl) {
        pageUrl = getUrl;
        setPage(getUrl);
        } else {
        pageUrl = "start"
      }
    }

    window.history.pushState(
      null, "", "?page=" + pageUrl
    );
//Denna useEffekt lyssnar på state:t page, dvs vilken sida som är laddad:
  }, [page])

  //App.tsx renderar en rubrik och vår meny:
  return (
    <>
      <h1>Time Tracker</h1>
      {/* Vi skickar in props:en setPage så vi kan använda den i Menu-komponenten: */}
      <Menu setPage={setPage} />
      {/* <div>
        <h2>Page: {page}</h2>
      </div> */}

      {
        {
          "start": <Start />,
          "activities": <Activities />,
          "actSessions": <ActSessions />
          // "admin": <Admin />
        } [page] || <Start /> //Default-värde för säkerhets skull
      }

    </>
  );
}

export default App
