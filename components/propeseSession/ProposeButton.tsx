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

  const [additionalSlots, setAdditionalSlots] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState();

  const addSlot = () => {
    setAdditionalSlots([...additionalSlots, additionalSlots.length]);
  };

  const removeSlot = (index: number) => {
    setAdditionalSlots(additionalSlots.filter((val, i) => i !== index));
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setAdditionalSlots([]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="bg-[#3dd7a1] text-black rounded-lg p-6"
          variant="outline"
        >
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
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder="Please select timezone by city" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((timezone) => (
                  <SelectItem value={timezone.city}>
                    {' '}
                    {`${timezone.city} (${timezone.gmt})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="date">Add a date</Label>
            <DatePickerForm />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-4">
              <Input id="startTime" placeholder="start time" value="" />
            </div>
            <div className="flex flex-col gap-4">
              <Input id="endTime" placeholder="end time" readOnly value="" />
            </div>
          </div>
          <p className="text-sm text-center">
            Each meeting slot is allocated a duration of 1.5 hours
          </p>
          {additionalSlots.map((slot, index) => (
            <div key={slot} className="flex flex-col gap-y-4 py-4">
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor={`date-${slot}`}
                  className="flex justify-between items-center"
                >
                  Add a date
                  <Button onClick={() => removeSlot(index)} className="w-fit">
                    Remove
                  </Button>
                </Label>
                <DatePickerForm />
              </div>
              <div className="flex">
                <div className="flex flex-col gap-4">
                  <Input
                    id={`startTime-${slot}`}
                    placeholder="start time"
                    value=""
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    id={`endTime-${slot}`}
                    placeholder="end time"
                    value=""
                  />
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
