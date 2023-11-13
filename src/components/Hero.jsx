import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} `}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        
        <div className="flex flex-row justify-between items-center ">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Tails of the <br className="sm:block hidden" />{" "}
            <span className="text-gradient">AFTERGLOW</span>{" "}
          </h1>
          
        </div>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-sm`}>
        Tails of the Afterglow is a unique collection of 4,266 dope foxes roaming around the grounds of Polygon Blockchain.<br />

Your TAG NFTs will grant you premium member-only benefits, including access to VIP facilities, exclusive discord channels, and early scholarship programs. Owning one of these unique artworks will also give you the chance to have limited edition merchandises and Real Deal Guild badges that are highly reputable in the NFT world.<br />

With their prestige and aesthetic, these TAGs are here to rule the metaverse.
        </p>
        <div className="flex flex-row justify-between items-start pt-3">
        <button className="group relative h-12 w-60 overflow-hidden rounded-lg bg-transparent text-md shadow">
    <div className="absolute inset-0 w-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
    <span className="relative text-white group-hover:text-white">SOLD OUT - View on Opensea</span>
  </button>
          
        </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

       
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
      
      </div>
    </section>
  );
};

export default Hero;