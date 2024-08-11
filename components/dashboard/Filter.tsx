import DateSelector from './DatePicker';
import SliderButton from './SliderButton';

function Filter() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between ">
        <p>Filters</p>
        <button className="text-green-400">Reset</button>
      </div>
      <p className="text-xs font-light">Date</p>
      <DateSelector />
      <p className="text-xs font-light">Time</p>
      <SliderButton />
    </div>
  );
}

export default Filter;
