import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import moment from 'moment-timezone';
import { DatePickerForm } from './DatePickerPropose';

export function ProposeButton() {
  const timezones = moment.tz.names().map((tz) => {
    const offset = moment.tz(tz).format('Z');
    return {
      city: tz,
      gmt: `GMT ${offset}`,
    };
  });

  const times: string[] = [];
  for (let i = 0; i <= 30 * 22.5 * 2; i += 30) {
    times.push(moment().startOf('day').add(i, 'minute').format('HH:mm'));
  }

  const [slots, setSlots] = useState<
    { date?: Date; startTime?: string; endTime?: string }[]
  >([{}]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('');

  const addSlot = () => {
    setSlots([]);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((val, i) => i !== index));
  };

  const setSlotsValue = (
    value: { date?: Date; startTime?: string; endTime?: string },
    index: number
  ) => {
    const valueToUpdate = slots.at(index);
    setSlots(slots.splice(index, 1, { ...valueToUpdate, ...value }));
    console.log(slots);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSlots([{}]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#3dd7a1] text-black rounded-lg p-6"
          variant="outline">
          Propose new session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Propose Session</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4 py-4">
          <div className="flex flex-col gap-y-4 ">
            <Label htmlFor="timezone">Timezone</Label>
            <Select onValueChange={(value) => setSelectedTimezone(value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Please select timezone by city" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone, index) => (
                  <SelectItem key={index} value={timezone.city}>
                    {`${timezone.city} (${timezone.gmt})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-center">
            Each meeting slot is allocated a duration of 1.5 hours
          </p>

          {slots.map((slot, index) => (
            <div key={index} className="flex flex-col gap-y-4 py-4">
              <div className="flex flex-col gap-4">
                <Label className="flex justify-between items-center">
                  Add a date
                  {index !== 0 && (
                    <Button onClick={() => removeSlot(index)} className="w-fit">
                      Remove
                    </Button>
                  )}
                </Label>
                <DatePickerForm
                  setDate={(date) => {
                    setSlotsValue({ date }, index);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-4">
                  <Select onValueChange={() => {}}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Start Time" />
                    </SelectTrigger>
                    <SelectContent>
                      {times.map((val, idx) => (
                        <SelectItem key={idx} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-4">
                  <Input placeholder="End Time" readOnly value={slot.endTime} />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addSlot}>Add another slot</Button>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
