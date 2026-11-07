import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { ServicesScroll } from '@/components/home/ServicesScroll';
import { TrainingModes } from '@/components/home/TrainingModes';
import { VideoFeature } from '@/components/home/VideoFeature';
import { CareerFeature } from '@/components/home/CareerFeature';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesScroll />
      <TrainingModes />
      <VideoFeature />
      <CareerFeature />
    </>
  );
}
