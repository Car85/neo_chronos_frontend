import preactLogo from '../../assets/boiler_OFF.svg';
import thermometerIcon from '../../assets/thermomether_chilling.png'; 
import './style.css';
import Stats_ from '../stats/stats';
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
		<div>
			<div class="home">
				<div class="chiller-container">
					<div class="chiller">
						<div class="switch-container">
							<Switch
								checked={state.chiller01}
								onChange={handleChange}
								color="primary"
								name="chiller01"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div className={`chiller-image ${state.chiller01 ? 'active' : ''}`}>
							<img src={preactLogo} alt="Preact logo" height="175" width="175" />
							{state.chiller01 && <img src={thermometerIcon} className="thermometer-icon" alt="Thermometer Icon" />}
						</div>
					</div>
					<div class="chiller">
						<div class="switch-container">
							<Switch
								checked={state.chiller02}
								onChange={handleChange}
								color="primary"
								name="chiller02"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div className={`chiller-image ${state.chiller02 ? 'active' : ''}`}>
							<img src={preactLogo} alt="Preact logo" height="175" width="175" />
							{state.chiller02 && <img src={thermometerIcon} className="thermometer-icon" alt="Thermometer Icon" />}
						</div>
					</div>
					<div class="chiller">
						<div class="switch-container">
							<Switch
								checked={state.chiller03}
								onChange={handleChange}
								color="primary"
								name="chiller03"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div className={`chiller-image ${state.chiller03 ? 'active' : ''}`}>
							<img src={preactLogo} alt="Preact logo" height="175" width="175" />
							{state.chiller03 && <img src={thermometerIcon} className="thermometer-icon" alt="Thermometer Icon" />}
						</div>
					</div>
					<div class="chiller">
						<div class="switch-container">
							<Switch
								checked={state.chiller04}
								onChange={handleChange}
								color="primary"
								name="chiller04"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div className={`chiller-image ${state.chiller04 ? 'active' : ''}`}>
							<img src={preactLogo} alt="Preact logo" height="175" width="175" />
							{state.chiller04 && <img src={thermometerIcon} className="thermometer-icon" alt="Thermometer Icon" />}
						</div>
					</div>
				</div>
			</div>
			<div class="stats-container">
				<section>
					<Stats_ />
				</section>
			</div>
		</div>
	);
}
