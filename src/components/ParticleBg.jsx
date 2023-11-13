
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import particlesConfig from './particlesConfig/config';

const ParticleBg = () => {

    async function loadParticles(main){
        await loadFull(main)
    }
  return (
    <Particles
        id='tsparticles'
        init={loadParticles}
        options={particlesConfig}
    >

    </Particles>
  )
}

export default ParticleBg