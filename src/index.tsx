import { SubMenu } from './components/Header/Header.js';
import { Router, Route, Link } from "preact-router";
import Winter from './pages/Home/index_winter.js';
import Summer from './pages/Home/index_summer.js';
import './style.css';
import { LocationProvider, hydrate, prerender as ssr } from 'preact-iso';
import UserSettingsForm from './components/userSettings/userSettingsForm.js';

export function App() {
  const userSettings = {
    baselineSetpoint: 74,
    thaSetpoint: 74,
    effectiveSetpoint: 83.5,
    tolerance: 0,
    minSetpoint: 70,
    maxSetpoint: 102,
    offsetSummer: 0,
    offsetWinter: -10,
    deltaTemp: 7,
    lockoutTime: -1,
    cascadeTime: 30
  };

  const handleUpdate = (updatedSettings: any) => {
    console.log('Updated settings:', updatedSettings);
  };

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
      <div className="app-container">
        <div className="form-container">
          <UserSettingsForm {...userSettings} onUpdate={handleUpdate} />
        </div>
      </div>
    </LocationProvider>

  );
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
