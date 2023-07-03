import React from 'react';
import classnames from 'classnames';

export const Hero = (props) => {
  const { name, image, selected, hero, selectHero } = props;

  const styles = classnames('flex gap-2 bg-gray-900 rounded-lg', {
    'hover:bg-opacity-50': !selected,
    selected,
  });

  const getHeroProps = () => {
    const props = [];
    Object.keys(hero).map((prop) => {
      if (hero[prop] === true) {
        const style = classnames(
          `text-dota-${prop} border-dota-${prop} text-xs font-bold mr-1 px-1 py-1 border rounded text-gray-500 border-gray-500`
        );
        props.push(
          <span key={`${name}-${prop}`} className={style}>
            {prop}
          </span>
        );
      }
      return prop;
    });
    return props;
  };

  return (
    <a href="#" className={styles} onClick={(e) => selectHero(name)}>
      <div
        className="bg-no-repeat bg-cover w-28 h-20 bg-center rounded-s-xl"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className={`grid grid-rows-2 cost-${hero.cost} w-full`}>
        <div className="flex justify-between w-full mt-1">
          <h5 className="text-sm font-bold">{name}</h5>
          <h5 className="text-xs font-bold mr-3">${hero.cost}</h5>
        </div>
        <div>{getHeroProps()}</div>
      </div>
    </a>
  );

  // return (
  //   <div className={styles} onClick={(e) => selectHero(name)}>
  //     <div className="hero-icon" style={{ backgroundImage: `url(${image})` }} />
  //     <div className="hero-body">
  //       <strong className={`cost-${hero.cost}`}>
  //         {name}
  //         <span>${hero.cost}</span>
  //       </strong>
  //       {getHeroProps()}
  //     </div>
  //   </div>
  // );
};
