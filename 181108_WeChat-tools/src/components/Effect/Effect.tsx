import * as React from 'react';
import './Effect.scss';

class Effect extends React.Component {
  render() {
    return (
      <div className="effect">
        <div className="effect__phone">
          {/* 不可视-顶部 */}
          <div className="effect__phone__invisible_top">不可视区</div>
          {/* 可视 */}
          <div className="effect__phone__visible">可视区</div>
          {/* 不可视-底部 */}
          <div className="effect__phone__invisible_bottom">不可视区</div>
        </div>
      </div>
    );
  }
}

export default Effect;
