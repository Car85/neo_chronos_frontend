import preactLogo from '../../assets/chiller_OFF.svg';
import thermometerIcon from '../../assets/thermomether_chilling.png';
import './style.css';
import Stats_ from '../../components/graphics/stats/stats';
import summertime from '../../assets/summertime.png';
import { Switch } from '@material-ui/core';
import { useState } from 'preact/hooks';
import { ChangeEvent } from 'preact/compat';

export default function Winter() {
    const [state, setState] = useState({
        chiller01: false,
        chiller02: false,
        chiller03: false,
        chiller04: false,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div className="winter-page">
            <div className="summer_img">
                <img  height="70px" width="70px" src={summertime} alt="Summertime" />
            </div>
            <div className="home">
                <div className="chiller-container">
                    {['chiller01', 'chiller02', 'chiller03', 'chiller04'].map((chiller) => (
                        <div className="chiller" key={chiller}>
                            <div className="switch-container">
                                <Switch
                                    checked={state[chiller]}
                                    onChange={handleChange}
                                    color="primary"
                                    name={chiller}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </div>
                            <div className={`chiller-image ${state[chiller] ? 'active' : ''}`}>
                                <img src={preactLogo} alt="Preact logo" />
                                {state[chiller] && <img src={thermometerIcon} className="thermometer-icon" alt="Thermometer Icon" />}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="stats-container">
                    <section className="graph_container">
                        <Stats_ />
                    </section>
                </div>
            </div>
        </div>
    );
}
