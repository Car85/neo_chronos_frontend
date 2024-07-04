import { SubMenu } from './components/Header/Header.js';
import { Router, Route, Link } from "preact-router";
import Winter from './pages/Home/index_winter.js';
import Summer from './pages/Home/index_summer.js'; 
import './style.css';
import { LocationProvider, hydrate, prerender as ssr } from 'preact-iso';

export function App() {
  return (
    <LocationProvider>
      <div id="menu_ham">
        <SubMenu label="SEASON" labelColor='#c77211' labelClass="submenu-label" parentOpen={true}>
          <Link href="/winter" class="submenu-link">
            Winter
          </Link>
          <Link href="/summer" class="submenu-link">
            Summer
          </Link>
        </SubMenu>
      </div>
      <main>
        <Router>
          <Route path="/winter" component={Winter} />
          <Route path="/summer" component={Summer} />
          <Route default component={Winter} />
        </Router>
      </main>
    </LocationProvider>
  );
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
