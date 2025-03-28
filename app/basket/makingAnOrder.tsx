'use client';

import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

enum PaymentMethod {
  cash = 'Наличными при получении',
  card = 'Картой при получении',
  online = 'Онлайн оплата',
}

interface Order {
  name: string;
  phone: string;
  street: string;
  house: string;
  flat: string;
  additionally: string;
  paymentMethod: PaymentMethod;
  numberOfPersons: number;
  sticks: number;
  changeAmount: string;
  comment: string;
  promoCode: string;
}

export default function Order() {
  const [personCount, setPersonCount] = useState(1);
  const [sticksCount, setSticksCount] = useState(0);
  const [isChangeNeeded, setIsChangeNeeded] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Order>({
    mode: 'onBlur',
    defaultValues: {
      paymentMethod: PaymentMethod.cash,
      numberOfPersons: 1,
      sticks: 1,
      changeAmount: '',
      comment: '',
      promoCode: '',
    },
  });

  const paymentMethodValue = watch('paymentMethod');

  function request(data: Order) {
    console.log(data);
  }

  const decreasePersonCount = () => {
    setPersonCount(Math.max(1, personCount - 1));
  };

  const increasePersonCount = () => {
    if (personCount < 10) {
      setPersonCount(personCount + 1);
    }
  };

  const decreaseSticksCount = () => {
    setSticksCount(Math.max(1, sticksCount - 1));
  };

  const increaseSticksCount = () => {
    if (sticksCount < 10) {
      setSticksCount(sticksCount + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(request)} className="flex flex-col gap-4 mt-4">
      {/* Контактные данные */}
      <article className="bg-accent rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-4">Контактные данные</h2>
        <label className="flex gap-4">
          <input
            type="text"
            placeholder="Ваше имя"
            className={cn(
              'h-8 px-2 py-5 bg-white w-[100%] rounded',
              errors?.name && 'border-2 border-red-600 rounded',
            )}
            {...register('name', {
              required: true,
            })}
          />
          <input
            type="phone"
            placeholder="Телефон"
            className={cn(
              'h-8 px-2 py-5 bg-white w-[100%] rounded',
              errors?.phone && 'border-2 border-red-600 rounded',
            )}
            {...register('phone', {
              required: true,
              pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            })}
          />
        </label>
      </article>
      {/* Параметры доставки */}
      <article className="bg-accent rounded-2xl p-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Параметры доставки</h2>
        <label className="flex gap-4">
          <input
            type="text"
            placeholder="Улица"
            className={cn(
              'h-8 px-2 py-5 bg-white w-[100%] rounded',
              errors?.street && 'border-2 border-red-600 rounded',
            )}
            {...register('street', {
              required: true,
            })}
          />
          <input
            type="text"
            placeholder="Дом"
            className={cn(
              'h-8 px-2 py-5 bg-white w-[100%] rounded',
              errors?.house && 'border-2 border-red-600 rounded',
            )}
            {...register('house', {
              required: true,
            })}
          />
        </label>
        <label className="flex gap-4">
          <input
            type="text"
            placeholder="Квартира"
            className={cn(
              'h-8 px-2 py-5 bg-white w-[100%] rounded',
              errors?.flat && 'border-2 border-red-600 rounded',
            )}
            {...register('flat', {
              required: true,
            })}
          />
          <input
            type="text"
            placeholder="Подъезд/этаж/домофон"
            className={cn(
              'h-8 px-2 py-5 bg-white w-[100%] rounded',
              errors?.additionally && 'border-2 border-red-600 rounded',
            )}
            {...register('additionally', {
              required: true,
            })}
          />
        </label>
      </article>
      {/* Параметры оплаты */}
      <fieldset className="bg-accent p-8 text-[14px] rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Параметры оплаты</h2>
        <div className="flex flex-wrap gap-4">
          <label className="flex gap-4 items-center">
            <input
              type="radio"
              className="cursor-pointer"
              value={PaymentMethod.cash}
              {...register('paymentMethod', {
                required: true,
              })}
            />
            Наличными при получении
          </label>
          <label className="flex gap-4 items-center">
            <input
              type="radio"
              className="cursor-pointer"
              value={PaymentMethod.card}
              {...register('paymentMethod', {
                required: true,
              })}
            />
            Картой при получении
          </label>
          <label className="flex gap-4 items-center">
            <input
              type="radio"
              className="cursor-pointer"
              value={PaymentMethod.online}
              {...register('paymentMethod', {
                required: true,
              })}
            />
            Онлайн оплата
          </label>
        </div>
        {paymentMethodValue === PaymentMethod.cash && (
          <div className="mt-4 flex sm:flex-row flex-col sm:items-center gap-4">
            <div className="flex gap-2 items-center">
              <label htmlFor="changeAmount">Подготовить сдачу с</label>
              <input
                type="number"
                id="changeAmount"
                className="h-8 px-2 py-1 bg-white w-32 rounded"
                {...register('changeAmount')}
              />
            </div>
            <label className="items-center gap-2 flex">
              <input
                type="checkbox"
                className="cursor-pointer"
                onChange={() => setIsChangeNeeded(!isChangeNeeded)}
              />
              Без сдачи
            </label>
          </div>
        )}
      </fieldset>
      {/* Последний шаг */}
      <fieldset className="bg-accent p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Последний шаг</h2>
        <hr className="mb-4" />
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2 mb-4 w-[100%] justify-between sm:w-max sm:justify-between">
            <span>Количество персон</span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decreasePersonCount}
                className="px-3 py-1 rounded-l cursor-pointer bg-primary text-white"
              >
                -
              </button>
              <span className="px-4">{personCount}</span>
              <button
                type="button"
                onClick={increasePersonCount}
                className="px-3 py-1 rounded-r cursor-pointer bg-primary text-white"
              >
                +
              </button>
              <input
                type="hidden"
                {...register('numberOfPersons')}
                value={personCount}
              />
            </div>
          </div>
          <div className="flex items-center mb-4 gap-2 w-[100%] justify-between sm:w-max sm:justify-between">
            <span>Учебные палочки</span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={decreaseSticksCount}
                className="px-3 py-1 bg-primary text-white rounded-l cursor-pointer"
              >
                -
              </button>
              <span className="px-4">{sticksCount}</span>
              <button
                type="button"
                onClick={increaseSticksCount}
                className="px-3 py-1 bg-gray-200 bg-primary text-white rounded-r cursor-pointer"
              >
                +
              </button>
              <input
                type="hidden"
                {...register('sticks')}
                value={sticksCount}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Комментарий к заказу"
            className="w-full h-24 p-2 bg-white rounded resize-none"
            {...register('comment')}
          />
        </div>
      </fieldset>
    </form>
  );
}
