import { Slider } from '@/components/ui/slider';

function SliderButton() {

  return (
    <div>
      <Slider
        className=""
        defaultValue={[5, 25]}
        max={24}
        step={0.25}
        minStepsBetweenThumbs={0.25}
      />
    </div>
  );
}

export default SliderButton;
