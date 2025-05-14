import { useEffect, useState } from 'react';
import { Color } from 'constant';
import { HorizonLine } from 'components';
import * as Context from '../../context';
import * as api from '../../api';
import * as Utils from '../utils';

export const PositionDialog = ({
  positionId,
  positionTypeId,
  positionName,
  isVisible,
}) => {
  const { actionList, positionTypes } = Context.useCanvasContext();

  return (
    isVisible && (
      <>
        <div className="overlay"></div>
        <section className="flex col width-40per radius-5px absolute-pos translate-center height-fit-content dialog-zindex">
          <span style={{ fontSize: 'var(--heading3)' }}>
            <strong>
              {Utils.getPositionTypeName(positionTypes, positionTypeId)}:
            </strong>{' '}
            {positionName}
          </span>
          <div className="flex col gap-10px">
            {[
              actionList.GOTO,
              actionList.CREATE_PATH,
              actionList.MOVE,
              actionList.EDIT,
              actionList.DELETE,
              actionList.CANCEL,
            ].map((action) => {
              return (
                <>
                  <HorizonLine
                    width="100%"
                    height="0.5px"
                    color={Color.DARKGRAY}
                    isVisible={true}
                  />
                  <div className="flex row gap-frame align-center">
                    <button
                      className="button width-40per"
                      style={{
                        backgroundColor: action.buttonColor,
                        color: action.textColor,
                        borderColor: action.buttonColor,
                      }}
                      onClick={() => action.onClick(positionId)}
                    >
                      {action.buttonText.toUpperCase()}
                    </button>
                    <div>{action.description}</div>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </>
    )
  );
};
