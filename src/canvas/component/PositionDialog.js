import { useEffect, useState } from 'react';
import { Color } from 'constant';
import { HorizonLine } from 'components';
import * as Context from '../../context';
import * as api from '../../api';

export const PositionDialog = ({
  positionId,
  positionTypeId,
  positionName,
  isVisible,
  setIsVisible,
}) => {
  const {
    positionTypes,
    openCreatePosition,
    fetchCurrentMapPosition,
    fetchPosition,
  } = Context.useCanvasContext();
  const { showDialog } = Context.useAppContext();

  const actionList = {
    GOTO: {
      buttonText: 'Go to',
      description: 'Send robot to this position',
      buttonColor: Color.BUTTON,
      textColor: Color.WHITE,
      onClick: () => {
        setIsVisible(false);
      },
    },
    MOVE: {
      buttonText: 'Move selected position',
      description: 'Move the position on the map',
      buttonColor: Color.LIGHT_BUTTON,
      textColor: Color.BLACK,
      onClick: () => {
        setIsVisible(false);
      },
    },
    EDIT: {
      buttonText: 'Edit',
      description: "Edit this position's name and parameters",
      buttonColor: Color.LIGHT_BUTTON,
      textColor: Color.BLACK,
      onClick: async () => {
        const position = await fetchPosition(positionId);
        console.log(position);
        openCreatePosition(position, 2);
        setIsVisible(false);
      },
    },
    DELETE: {
      buttonText: 'Delete',
      description: 'Delete this position from map',
      buttonColor: Color.ERROR,
      textColor: Color.WHITE,
      onClick: () => {
        deletePosition();
        setIsVisible(false);
      },
    },
    CANCEL: {
      buttonText: 'Cancel',
      description: 'Close this dialogue',
      buttonColor: Color.LIGHT_BUTTON,
      textColor: Color.BLACK,
      onClick: () => {
        setIsVisible(false);
      },
    },
  };

  const getPositionTypeName = (positionTypeId) => {
    const foundType = positionTypes.find((type) => type.id === positionTypeId);
    return foundType?.name || null;
  };

  const fetchDeletePosition = async () => {
    try {
      const { statusCode } = await api.deletePosition(positionId);

      if (statusCode === api.STATUS_CODE.SUCCESS_DELETE) {
        fetchCurrentMapPosition();
      }
    } catch (error) {
      console.log('Error delete position');
    }
  };

  const deletePosition = () => {
    showDialog({
      title: 'Delete position',
      content: 'You are about to delete the position.',
      onConfirm: async () => {
        fetchDeletePosition();
      },
      onCancel: () => {
        // Không làm gì
      },
    });
  };

  return (
    isVisible && (
      <>
        <div className="overlay"></div>
        <section className="flex col width-40per radius-5px absolute-pos translate-center height-fit-content dialog-zindex">
          <span style={{ fontSize: 'var(--heading3)' }}>
            <strong>{getPositionTypeName(positionTypeId)}:</strong>{' '}
            {positionName}
          </span>
          <div className="flex col gap-10px">
            {[
              actionList.GOTO,
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
                      onClick={() => action.onClick()}
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
