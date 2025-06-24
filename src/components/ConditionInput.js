import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, hover, motion } from 'framer-motion';
import OutsideClickHandler from 'react-outside-click-handler';

import { HorizontalScrollContainer } from './HorizontalScrollContainer';
import * as Const from '../constant';
import * as Icons from '../components/icons';
import * as Utils from '../utils';

const CustomSelect = ({
  color = '#3B82F6',
  options = [],
  style,
  optionStyle,
  onSelect,
  selected,
}) => {
  const [open, setOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const buttonRef = useRef();
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(item);
    }
    setOpen(false);
  };

  const dropdown = (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.3 }}
            className="radius-5px absolute-pos width-fit-content"
            style={{
              top: dropdownPos.top + 5,
              left: dropdownPos.left,
              backgroundColor: 'white',
              boxShadow: `0px 4px 10px ${color}33`,
              overflow: 'hidden',
              zIndex: 9999,
              transformOrigin: 'top',
              position: 'absolute',
            }}
          >
            {options.map((item, index) => (
              <div
                key={item.value}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => handleSelect(item)}
                className="padding-5px nowrap pointer"
                style={{
                  backgroundColor: hoverIndex === index ? color : 'transparent',
                  color: hoverIndex === index ? 'white' : '#333',
                  ...optionStyle,
                }}
              >
                {item.name === '' ? item.value : item.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </OutsideClickHandler>
  );

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="padding-5px radius-5px nowrap pointer width-fit-content"
        style={{
          backgroundColor: `${color}33`,
          userSelect: 'none',
          ...style,
        }}
      >
        {options.find((item) => item.value == selected)?.name || selected ||
          options[0].name}
      </div>

      {ReactDOM.createPortal(dropdown, document.body)}
    </>
  );
};

export const ConditionInput = ({
  type,
  color,
  options,
  descriptions = [],
  description,
  updateParameterValueInList,
  updateTaskOrSubTaskProps,
  conditions,
  scope_reference,
  logicalOperators,
}) => {
    const [hoverId, setHoverId] = useState(null);
  
  useEffect(() => {
    const compareValue = options.find((param) => param.id === "compare")?.value;

    const matchedDesc = descriptions.find((desc) =>
        desc.conditions.some(
          (cond) => cond.parameter_id === 'compare' && cond.value === compareValue
        )
      );

    const updatedDescription = matchedDesc || {text: description} ;
      const requiredParams = Utils.getParamDefault(options, updatedDescription, compareValue);

    updateTaskOrSubTaskProps(scope_reference, {
      conditionsData: {
        conditions: [
      {
        id: 1,
        values: requiredParams,
      },
    ],
        logicalOperators: logicalOperators,
      },
    });
  }, []);

  // Hàm render input cho từng tham số
  const renderParameterInput = (conditionId, param, index) => {
    const paramConfig = param;

    if (!paramConfig) {
      return null;
    }

    // Nếu là Selection type
    if (paramConfig.type === 'Selection' && paramConfig.constraints?.choices) {
      return (
        <CustomSelect
          key={`${conditionId}-${param.id}-${index}`}
          options={paramConfig.constraints.choices}
          color={color}
          selected={paramConfig.value}
          onSelect={(item) => {
            updateParameterValueInList(param.id, item.value);
            updateConditionValue(conditionId, param.id, item.value, index);
          }}
        />
      );
    }

    // Nếu là Reference type
    if (paramConfig.type === 'Reference' && paramConfig.constraints?.choices) {
      return (
        <CustomSelect
          key={`${conditionId}-${param.id}-${index}`}
          options={paramConfig.constraints.choices}
          color={color}
          selected={paramConfig.value}
          onSelect={(item) => {
            updateParameterValueInList(param.id, item.value);
            updateConditionValue(conditionId, param.id, item.value, index);
          }}
        />
      );
    }

    // Nếu là Integer, Float type
    if (paramConfig.type === 'Integer' || paramConfig.type === 'Float') {
      return (
        <input
          key={`${conditionId}-${param.id}-${index}`}
          type="number"
          value={paramConfig.value}
          onChange={(e) => {
            updateParameterValueInList(param.id, e.target.value);
            updateConditionValue(conditionId, param.id, e.target.value, index);
          }}
          placeholder={`(${paramConfig.name})`}
          style={{
            backgroundColor: `${color}33`,
            border: 'none',
            padding: '5px',
            height: 'fit-content',
            width: '70px',
            borderRadius: '5px',
          }}
        />
      );
    }

    // Fallback for other types
    return (
      <input
        key={`${conditionId}-${param.id}-${index}`}
        type="text"
        value={paramConfig.value}
        onChange={(e) => {
          updateParameterValueInList(param.id, e.target.value);
          updateConditionValue(conditionId, param.id, e.target.value, index);
        }}
        placeholder={`(${paramConfig.name})`}
        style={{
          backgroundColor: `${color}33`,
          border: 'none',
          padding: '5px',
          height: 'fit-content',
          width: '100px',
          borderRadius: '5px',
        }}
      />
    );
  };

  // Thêm điều kiện mới
  const addCondition = () => {
    
    const newId = conditions.length + 1;
    const init = Utils.initConditions(options, description, descriptions);
    const newConditions = [
      ...conditions,
      {
        id: newId,
        values: init,
      },
    ];

    const newLogicalOperators = [...logicalOperators, '&&'];

    //Cập nhật props conditions
    updateTaskOrSubTaskProps(scope_reference, {
      conditionsData: {
        conditions: newConditions,
        logicalOperators: conditions.length > 0 ? newLogicalOperators : [],
      },
    });
  };

  // Xóa điều kiện
  const removeCondition = (id) => {
    if (conditions.length > 1) {
      // setConditions(conditions.filter((c) => c.id !== id));
      if (logicalOperators.length > 0) {
        // setLogicalOperators(logicalOperators.slice(0, -1));
      }
    }
  };

  // Cập nhật giá trị của tham số trong điều kiện
  const updateConditionValue = (conditionId, paramId, newValue, index) => {
  if (paramId === 'compare') {
    const matchedDesc = descriptions.find((desc) =>
      desc.conditions.some(
        (cond) => cond.parameter_id === 'compare' && cond.value === newValue
      )
    );

    const updatedDescription = matchedDesc || { text: description };
    let requiredParams = Utils.getParamDefault(options, updatedDescription, newValue);

    const newConditions = conditions.map((c) =>
      c.id === conditionId
        ? {
            ...c,
            values: requiredParams,
          }
        : c
    );

    updateTaskOrSubTaskProps(scope_reference, {
      conditionsData: {
        conditions: newConditions,
        logicalOperators,
      },
    });
  } else {
    const newConditions = conditions.map((c) =>
      c.id === conditionId
        ? {
            ...c,
            values: c.values.map((item, i) =>
              (item.id == paramId && (i === index || paramId == 'compare'))
                ? { ...item, value: newValue }
                : item
            ),
          }
        : c
    );

    updateTaskOrSubTaskProps(scope_reference, {
      conditionsData: {
        conditions: newConditions,
        logicalOperators,
      },
    });
  }
};

  // Cập nhật toán tử logic
  const updateLogicalOperator = (index, value) => {
    const newOperators = [...logicalOperators];
    newOperators[index] = value;

    //Cập nhật props conditions
    updateTaskOrSubTaskProps(scope_reference, {
      conditionsData: {
        conditions: conditions,
        logicalOperators: newOperators,
      },
    });
  };

  return conditions?.length > 0 ? (
    <HorizontalScrollContainer
      className="condition-input flex-1"
      width="100px"
      height="fit-content"
      showScrollbar={false}
    >
      <div
        className="flex row height-fit-content align-center gap-10px"
        style={{ minWidth: 'max-content' }}
      >
        <div className="flex row height-fit-content gap-10px">
          {conditions.map((condition, index) => {
            return (
              <div
                className="flex row height-fit-content gap-10px align-center"
                key={condition.id}
              >
                <div
                  className="flex row height-fit-content"
                  style={{ gap: '3px' }}
                  onMouseEnter={() => {
                    if (type === 'if' || type === 'while')
                      setHoverId(condition.id);
                  }}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <div
                    className="flex row width-fit-content radius-5px height-fit-content align-center gap-10px"
                    style={{
                      padding:
                        condition.id === hoverId ? '10px 10px' : '10px 0',
                      backgroundColor:
                        condition.id === hoverId ? `${color}19` : 'transparent',
                      border: `1px dashed ${condition.id === hoverId ? `${color}` : 'transparent'}`,
                    }}
                  >
                    {/* <span>(</span> */}

                    {/* Render tất cả các tham số cần thiết */}
                    {condition.values.map((param, index) =>
                      renderParameterInput(condition.id, param, index)
                    )}

                    {/* <span>)</span> */}
                  </div>

                  {condition.id === hoverId && (
                    <div
                      className="height-fit-content flex radius-5px"
                      style={{
                        backgroundColor: color,
                        padding: '4px',
                        opacity: condition.id === hoverId ? '1' : '0',
                      }}
                    >
                      <Icons.MoreVertical height="14px" width="6px" />
                    </div>
                  )}
                </div>

                {/* Toán tử logic giữa các điều kiện */}
                {index < conditions.length - 1 && (
                  <CustomSelect
                    options={[
                      { name: '&&', value: '&&' },
                      { name: '||', value: '||' },
                    ]}
                    color={color}
                    style={{
                      backgroundColor: 'transparent',
                      fontWeight: '900',
                      minWidth: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                    optionStyle={{ textAlign: 'center' }}
                    selected={logicalOperators[index] || '&&'}
                    onSelect={(item) =>
                      updateLogicalOperator(index, item.value)
                    }
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Nút thêm điều kiện */}
        {(type === 'if' || type === 'while') && (
          <div
            className="full-height flex padding-5px radius-5px pointer"
            style={{ backgroundColor: color, aspectRatio: '1 / 1' }}
            onClick={addCondition}
          >
            <img src={Const.ImageSrc.plus} width="16px" height="16px" />
          </div>
        )}
      </div>
    </HorizontalScrollContainer>
  ) : (
    <div className="full-width"></div>
  );
};
