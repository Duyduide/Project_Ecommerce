import React, { memo } from 'react'
import clsx from 'clsx'

const InputForm = ({label, disabled, register, error, id, validate, type='text', placeHolder, fullWith, defaultValue}) => {
  return (
    <div className='flex flex-col h-[78px] gap-2'>
        {label && <label htmlFor={id}>{label}</label>}
        <input
            type={type}
            id={id}
            {...register(id, validate)}
            disabled={disabled}
            placeholder={placeHolder}
            className={clsx('form-input my-auto', fullWith && 'w-full')}
            defaultValue={defaultValue}
        />
        {error[id] && <small className='text-xs text-red-500'>{error[id]?.message}</small>}
    </div>
  )
}

export default memo(InputForm)