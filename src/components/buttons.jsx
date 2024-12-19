import React, { useState } from 'react'
import { spinner } from '../constants/spinner';
import classNames from 'classnames';

function Button(props) {
  const {onClick = ()=>{}, children, className} = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async ()=>{
      if(isLoading){
          return;
      }
      setIsLoading(true);
      await onClick();
      setIsLoading(false)
  }

  return <div className={classNames(`${isLoading ? 'cursor-wait': 'cursor-pointer'} px-2 bg-primary-700 text-white border border-primary-700 hover:bg-white hover:text-primary-700 transition-colors rounded-full my-2 py-2 text-center flex justify-center items-center`, className)} onClick={handleClick}>{isLoading ? spinner : children}</div>
}

export default Button