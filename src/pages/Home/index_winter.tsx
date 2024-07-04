import preactLogo from '../../assets/chiller_OFF.svg';
import './style.css';
import Stats_ from '../stats/stats';

export default function Summer() {
	return (
	<html>
		<body>

			<div class="home">
				<div>
					<a href="https://preactjs.com" target="_blank">
						<img src={preactLogo} alt="Preact logo" height="560" width="560" />
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



