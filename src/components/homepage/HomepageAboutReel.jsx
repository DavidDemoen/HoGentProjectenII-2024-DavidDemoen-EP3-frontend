import { HomepageAboutReelItem } from "./HomepageAboutReelItem";

export function HomepageAboutReel() {
  return (
    <>
      <div className="homepage-aboutreel-container">
        <HomepageAboutReelItem title="Join the community" description="Apply now to join the interconnected community of suppliers and their clients" imageName="JoinCommunity" navigateURL="join"/>
        <HomepageAboutReelItem title="Your business. Our world. Together." description="We provide sustainable solutions, for your business and our environment" imageName="OurEcology" navigateURL="about/ecology"/>
      </div>
    </>
  );
}
