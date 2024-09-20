import './App.css';
import Row from './Row';
import request from './requests';
import Banner from './Banner';
import Nav from './Nav';
function App() {
  return (
    <div className="App">
      {/* Nav */}

       {/* Banner */}
      <Nav></Nav>
       <Banner/>
      <Row title="Netflix Originals" fetchUrl={request.fetchNetflixOriginals}
       isLargerow/>
      <Row title="Trending Now" fetchUrl={request.fetchTrending}/>
      <Row title="Top Rated" fetchUrl={request.fetchTopRated}/>
      <Row title="Action Movies" fetchUrl={request.fetchActionMovies}/>
      <Row title="Horror Movies" fetchUrl={request.fetchHorrorMovies}/>
      <Row title="Romance Movies" fetchUrl={request.fetchRomanceMovies}/>
      <Row title="Documentary Movies" fetchUrl={request.fetchDocumentaries}/>

    </div>
  );
}

export default App;
