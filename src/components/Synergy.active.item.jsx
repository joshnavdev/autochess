import classNames from 'classnames';
import { getThhreshholds } from '../utils/synergy.util';

function SynergyActiveItem({ name, synergy, numberActives, image, onClick }) {
  const [minActive, maxActive] = getThhreshholds(synergy);
  const isActive = numberActives >= minActive;
  const style = classNames('synergy-item-count', {
    grayscale: !isActive,
  });

  const renderIndicators = (minActive, maxActive) => {
    const indicators = [];

    const rows = Math.ceil(maxActive / minActive);

    let currentPoint = 1;

    for (let i = 1; i <= rows; i++) {
      const indicatorsRow = [];
      for (let j = 1; j <= minActive; j++) {
        if (i * j <= maxActive) {
          const isCurrentPointActive = currentPoint <= numberActives;

          const style = classNames('w-full h-[10px] border rounded', {
            // [`border-dota-${name}`]: true,
            // [`bg-dota-${name}`]: isCurrentPointActive,
            [`border-gray-400`]: true,
            [`bg-gray-300`]: isCurrentPointActive,
          });

          currentPoint++;
          indicatorsRow.push(<span key={`${i}${j}`} className={style}></span>);
        }
      }

      indicators.push(<div className="flex gap-1">{indicatorsRow}</div>);
    }

    return <div className={`flex flex-col gap-1 mb-2`}>{indicators.reverse()}</div>;
  };

  return (
    <div className="synergy-item" onClick={onClick}>
      <div>
        <div>{renderIndicators(minActive, maxActive)}</div>
        <div className={style} style={{ backgroundImage: `url(${image})` }}>
          <div>{numberActives}</div>
        </div>
      </div>
      <span className="text-xs">{name}</span>
    </div>
  );
}

export default SynergyActiveItem;
