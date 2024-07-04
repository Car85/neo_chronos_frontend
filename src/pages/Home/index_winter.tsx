import preactLogo from '../../assets/boiler_OFF.svg';
import './style.css';
import Stats_ from '../stats/stats';

export default function Winter() {
	return (
	<html>
		<body>

			<div class="home">
				<div>
					<a href="https://preactjs.com" target="_blank">
						<img src={preactLogo} alt="Preact logo" height="250" width="250" />
						<img src={preactLogo} alt="Preact logo" height="250" width="250" />
						<img src={preactLogo} alt="Preact logo" height="250" width="250" />
						<img src={preactLogo} alt="Preact logo" height="250" width="250" />


						

					</a>
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



