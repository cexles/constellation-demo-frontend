'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { useClickAway } from 'react-use';
import clsx from 'clsx';

import { Button, TextInput } from '@shared/ui';
import ArrowLeftIcon from '@public/icons/arrow-left.svg';
import CalendarIcon from '@public/icons/calendar.svg';

import styles from './DateRangePicker.module.scss';

export default function DateRangePicker({
  placeholder,
  dateFrom,
  dateTo,
  disabled = false,
  size = 'm',
  positionX = 'center',
  positionY = 'down',
  setDateFrom,
  setDateTo,
}: {
  placeholder: string;
  dateFrom: number;
  dateTo: number;
  disabled?: boolean;
  size?: 's' | 'm' | 'l';
  positionX?: 'left' | 'right' | 'center';
  positionY?: 'up' | 'down';
  setDateFrom: (date: number) => void;
  setDateTo: (date: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const click = useRef(0);
  const [isOpen, setOpen] = useState(false);
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [from, setFrom] = useState(+moment(dateFrom).startOf('date'));
  const [to, setTo] = useState(+moment(dateTo).startOf('date'));
  const [output, setOutput] = useState('');
  const [currMonthStart, setCurrMonthStart] = useState(0);
  const [currMonthEnd, setCurrMonthEnd] = useState(0);
  const [currMonthStartDay, setCurrMonthStartDay] = useState(0);
  const [prevMonthStart, setPrevMonthStart] = useState(0);
  const [prevMonthEnd, setPrevMonthEnd] = useState(0);
  const [prevMonthStartDay, setPrevMonthStartDay] = useState(0);

  const calculateState = (month: number) => {
    const monthStart = moment(month).startOf('month');
    const monthEnd = moment(month).endOf('month');

    setCurrMonthStart(+monthStart);
    setCurrMonthEnd(+monthEnd - 86400000 + 1);
    setCurrMonthStartDay(monthStart.day() || 7);
    setPrevMonthEnd(+monthStart - 86400000);
    setPrevMonthStart(+monthStart.subtract(1, 'month'));
    setPrevMonthStartDay(monthStart.day() || 7);
  };

  const prevMonth = () => {
    calculateState(prevMonthStart);
  };

  const nextMonth = () => {
    calculateState(currMonthEnd + 86400000);
  };

  const open = () => {
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    click.current = 0;
  };

  const handleTextInputChange = (input: string) => {
    setOutput(input);

    const result = [from, to];
    const parts = input.split(' - ');
    const inputFrom = +moment(parts[0], 'DD/MM/YYYY');
    const inputTo = +moment(parts[1], 'DD/MM/YYYY');

    if (!Number.isNaN(inputFrom)) {
      if (inputFrom > to) {
        result[0] = result[1];
        result[1] = inputFrom;
      } else {
        result[0] = inputFrom;
      }
    }

    if (!Number.isNaN(inputTo)) {
      if (inputTo < from) {
        result[1] = result[0];
        result[0] = inputTo;
      } else {
        result[1] = inputTo;
      }
    }

    setFrom(result[0]);
    setTo(result[1]);
  };

  const handleDayClick = (date: number) => {
    if (click.current % 2 === 0) {
      if (date > to) {
        setFrom(to);
        setTo(date);
      } else {
        setFrom(date);

        click.current += 1;
      }
    } else if (date < from) {
      setTo(from);
      setFrom(date);
    } else {
      setTo(date);

      click.current += 1;
    }

    if (date > currMonthEnd) {
      nextMonth();
    } else if (date < prevMonthStart) {
      prevMonth();
    }
  };

  const pick = () => {
    setDateFrom(from);
    setDateTo(to);
    close();
  };

  useEffect(() => {
    setOutput(`${moment(dateFrom).format('DD/MM/YYYY')} - ${moment(dateTo).format('DD/MM/YYYY')}`);
  }, [isOpen, dateFrom, dateTo]);

  useEffect(() => {
    if (isOpen) {
      calculateState(to);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useClickAway(containerRef, close);

  return (
    <div ref={containerRef} className={clsx(styles.container, styles[`container_${positionX}`])}>
      <TextInput
        placeholder={placeholder}
        value={output}
        size={size}
        disabled={disabled}
        element={
          <Image
            src={CalendarIcon}
            className={styles.calendarImage}
            alt="Calendar"
            draggable="false"
          />
        }
        mask="99/99/9999 - 99/99/9999"
        onChange={handleTextInputChange}
        onEnterPress={pick}
        onFocus={open}
        onBlur={close}
      />

      {isOpen && (
        <div className={clsx(styles.picker, styles[`picker_${positionY}`])}>
          <div className={styles.months}>
            <Image src={ArrowLeftIcon} alt="Prev" draggable="false" onClick={prevMonth} />

            <div>{moment(prevMonthStart).format('MMMM YYYY')}</div>
            <div>{moment(currMonthStart).format('MMMM YYYY')}</div>

            <Image src={ArrowLeftIcon} alt="Next" draggable="false" onClick={nextMonth} />
          </div>

          <div className={styles.calendar}>
            <div className={styles.month}>
              <div className={styles.weekdays}>
                {weekdays.map((weekday) => (
                  <div key={weekday} className={styles.weekday}>
                    {weekday}
                  </div>
                ))}
              </div>

              <div className={styles.days}>
                {Array<number>(42)
                  .fill(prevMonthStart + 86400000 * (1 - prevMonthStartDay))
                  .map((first, i) => first + i * 86400000)
                  .map((date) => (
                    <div
                      key={date}
                      className={clsx(
                        styles.day,
                        from < date && date < to && styles.day_range,
                        (date === from || date === to) && styles.day_selected,
                        (prevMonthStart > date || date > prevMonthEnd) && styles.day_out,
                      )}
                      onClick={() => handleDayClick(date)}
                    >
                      {moment(date).date()}
                    </div>
                  ))}
              </div>
            </div>

            <div className={styles.month}>
              <div className={styles.weekdays}>
                {weekdays.map((weekday) => (
                  <div key={weekday} className={styles.weekday}>
                    {weekday}
                  </div>
                ))}
              </div>

              <div className={styles.days}>
                {Array<number>(42)
                  .fill(currMonthStart + 86400000 * (1 - currMonthStartDay))
                  .map((first, i) => first + i * 86400000)
                  .map((date) => (
                    <div
                      key={date}
                      className={clsx(
                        styles.day,
                        from < date && date < to && styles.day_range,
                        (date === from || date === to) && styles.day_selected,
                        (currMonthStart > date || date > currMonthEnd) && styles.day_out,
                      )}
                      onClick={() => handleDayClick(date)}
                    >
                      {moment(date).date()}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="contained" onClick={pick}>
              Select
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
