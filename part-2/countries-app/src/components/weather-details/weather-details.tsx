import React, { FC } from 'react';
import { Weather } from '../../services/weather-service';


interface WeatherDetailsProps {
  weather:Weather | undefined;
}

const WeatherDetails: FC<WeatherDetailsProps> = ({weather}) => {

  if(weather === undefined){
    return(null);
  }

  return(
    <div>
      <h2 className='text-2xl font-semibold mb-4 pb-2 border-b border-gray-200'>Weather in {weather.location.name}</h2>
      <div className='my-2 flex items-center justify-center'>
        <div className='text-6xl text-gray-600'>
          <span className='mr-1'>{weather.current.temp_c}</span>
          <span>°</span>
        </div>
        <div>
          <img className='w-32 h-auto' src={weather.current.condition.icon}/>
        </div>
      </div>
      <p className='text-2xl text-center'>{weather.current.condition.text}</p>
      <div className='grid grid-cols-3 gap-2 mt-2'>
        <div className='bg-blue-50 flex flex-col justify-center items-center p-2 rounded'>
          <svg xmlns="http://www.w3.org/2000/svg"  className='w-8 h-8' fill='currentColor' viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg>
          <p className='mt-1'>
            <span className='mr-1'>{weather.current.wind_kph}</span>
            <span>km/h</span>
          </p>
          <p>Wind</p>
        </div>
        <div className='bg-blue-50 flex flex-col justify-center items-center p-2 rounded'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' fill='currentColor' viewBox="0 0 384 512"><path d="M192 512C86 512 0 426 0 320C0 228.8 130.2 57.7 166.6 11.7C172.6 4.2 181.5 0 191.1 0h1.8c9.6 0 18.5 4.2 24.5 11.7C253.8 57.7 384 228.8 384 320c0 106-86 192-192 192zM96 336c0-8.8-7.2-16-16-16s-16 7.2-16 16c0 61.9 50.1 112 112 112c8.8 0 16-7.2 16-16s-7.2-16-16-16c-44.2 0-80-35.8-80-80z"/></svg>
          <p className='mt-1'>
            <span className='mr-1'>{weather.current.humidity}</span>
            <span>%</span>
          </p>
          <p>Humidity</p>
        </div>
        <div className='bg-blue-50 flex flex-col justify-center items-center p-2 rounded'>
        <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' fill='currentColor' viewBox="0 0 576 512"><path d="M128 112c0-26.5 21.5-48 48-48s48 21.5 48 48V276.5c0 17.3 7.1 31.9 15.3 42.5C249.8 332.6 256 349.5 256 368c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9c8.2-10.6 15.3-25.2 15.3-42.5V112zM176 0C114.1 0 64 50.1 64 112V276.4c0 .1-.1 .3-.2 .6c-.2 .6-.8 1.6-1.7 2.8C43.2 304.2 32 334.8 32 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.2-63.8-30.1-88.1c-.9-1.2-1.5-2.2-1.7-2.8c-.1-.3-.2-.5-.2-.6V112C288 50.1 237.9 0 176 0zm0 416c26.5 0 48-21.5 48-48c0-20.9-13.4-38.7-32-45.3V272c0-8.8-7.2-16-16-16s-16 7.2-16 16v50.7c-18.6 6.6-32 24.4-32 45.3c0 26.5 21.5 48 48 48zm336-64H480V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V352H384c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c6 6 14.1 9.4 22.6 9.4s16.6-3.4 22.6-9.4l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8z"/></svg>
          <p className='mt-1'>
            <span className='mr-1'>{weather.current.pressure_in}</span>
            <span>in</span>
          </p>
          <p>Pressure</p>
        </div>
      </div>
    </div>
  )
}
export default WeatherDetails;
