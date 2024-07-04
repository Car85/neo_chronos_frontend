import preactLogo from '../../assets/chiller_OFF.svg';
import thermometerIcon from '../../assets/thermomether_boiler.png'; 
import './style.css';
import Stats_ from '../stats/stats';
import { Switch } from '@material-ui/core';
import { ChangeEvent, useState } from 'preact/compat';


export default function Summer() {
    const [state, setState] = useState({
		boiler01: false,
	});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
	<html>
		<body>

			<div class="home">
            <div class="boiler">
						<div class="switch-container-boiler">
							<Switch
								checked={state.boiler01}
								onChange={handleChange}
								color="primary"
								name="chiller01"
								inputProps={{ 'aria-label': 'primary checkbox' }}
							/>
						</div>
						<div className={`boiler-image ${state.boiler01 ? 'active' : ''}`}>
							<img src={preactLogo} alt="Preact logo" height="225" width="225" />
							{state.boiler01 && <img src={thermometerIcon} className="thermometer-icon" alt="Thermometer Icon" />}
						</div>
					</div>
				<div>
					<section>
						<Stats_ />
					</section>
				</div>
			</div>

			</body>
		
		</html>
			
			);
	
}



function setState(arg0: any) {
    throw new Error('Function not implemented.');
}

